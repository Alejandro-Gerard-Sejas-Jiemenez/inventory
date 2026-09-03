package com.inventario.modules.catalogo.service.impl;

import com.inventario.core.exception.BadRequestException;
import com.inventario.core.exception.ResourceNotFoundException;
import com.inventario.modules.catalogo.dto.ProductoRequestDto;
import com.inventario.modules.catalogo.model.*;
import com.inventario.modules.catalogo.repository.*;
import com.inventario.modules.catalogo.service.ProductoService;
import com.inventario.modules.inventario.model.MovimientoStock;
import com.inventario.modules.inventario.model.TipoMovimiento;
import com.inventario.modules.inventario.repository.MovimientoStockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;
    private final CategoriaRepository categoriaRepository;
    private final ModeloRepository modeloRepository;
    private final MaterialRepository materialRepository;
    private final ColorRepository colorRepository;
    private final PropietarioRepository propietarioRepository;
    private final MovimientoStockRepository movimientoStockRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Producto> findAll() {
        return productoRepository.findByActivoTrue();
    }

    @Override
    @Transactional(readOnly = true)
    public Producto findById(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con ID: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<Producto> findByModelo(Long idModelo) {
        return productoRepository.findByModeloIdModelo(idModelo);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Producto> search(String query) {
        if (query == null || query.trim().isEmpty()) {
            return productoRepository.findByActivoTrue();
        }
        return productoRepository.searchByNombreOrSku(query.trim());
    }

    @Override
    @Transactional(readOnly = true)
    public List<Producto> findLowStock() {
        return productoRepository.findProductosConBajoStock();
    }

    private String generateUniqueSku() {
        String code;
        do {
            code = "CAS-" + java.util.UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        } while (productoRepository.existsBySkuIgnoreCase(code));
        return code;
    }

    @Override
    @Transactional
    public Producto create(ProductoRequestDto request) {
        String sku = request.getSku();
        if (sku == null || sku.trim().isEmpty()) {
            sku = generateUniqueSku();
        } else {
            sku = sku.toUpperCase().trim();
            if (productoRepository.existsBySkuIgnoreCase(sku)) {
                throw new BadRequestException("Ya existe un producto con el SKU: " + sku);
            }
        }

        Categoria categoria = null;
        if (request.getIdCategoria() != null) {
            categoria = categoriaRepository.findById(request.getIdCategoria())
                    .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada"));
        }

        Modelo modelo = null;
        if (request.getIdModelo() != null) {
            modelo = modeloRepository.findById(request.getIdModelo())
                    .orElseThrow(() -> new ResourceNotFoundException("Modelo no encontrado"));
        }

        Material material = null;
        if (request.getIdMaterial() != null) {
            material = materialRepository.findById(request.getIdMaterial())
                    .orElseThrow(() -> new ResourceNotFoundException("Material no encontrado"));
        }

        Color color = null;
        if (request.getIdColor() != null) {
            color = colorRepository.findById(request.getIdColor())
                    .orElseThrow(() -> new ResourceNotFoundException("Color no encontrado"));
        }

        Propietario propietario = null;
        if (request.getIdPropietario() != null) {
            propietario = propietarioRepository.findById(request.getIdPropietario())
                    .orElseThrow(() -> new ResourceNotFoundException("Propietario no encontrado"));
        }

        Producto producto = Producto.builder()
                .sku(sku)
                .nombre(request.getNombre().trim())
                .descripcion(request.getDescripcion())
                .imagenUrl(request.getImagenUrl())
                .precioCompra(request.getPrecioCompra() != null ? request.getPrecioCompra() : java.math.BigDecimal.ZERO)
                .precioMayoreo(request.getPrecioMayoreo())
                .precioUnitario(request.getPrecioUnitario())
                .stockActual(request.getStockActual() != null ? request.getStockActual() : 0)
                .stockMinimo(request.getStockMinimo() != null ? request.getStockMinimo() : 5)
                .categoria(categoria)
                .modelo(modelo)
                .material(material)
                .color(color)
                .propietario(propietario)
                .activo(request.getActivo() != null ? request.getActivo() : true)
                .build();

        Producto saved = productoRepository.save(producto);

        if (saved.getStockActual() > 0) {
            MovimientoStock movimiento = MovimientoStock.builder()
                    .producto(saved)
                    .tipo(TipoMovimiento.ENTRADA)
                    .cantidad(saved.getStockActual())
                    .stockAntes(0)
                    .stockDespues(saved.getStockActual())
                    .motivo("Registro inicial de producto")
                    .build();
            movimientoStockRepository.save(movimiento);
        }

        return saved;
    }

    @Override
    @Transactional
    public Producto update(Long id, ProductoRequestDto request) {
        Producto producto = findById(id);

        String sku = request.getSku();
        if (sku == null || sku.trim().isEmpty()) {
            sku = producto.getSku() != null ? producto.getSku() : generateUniqueSku();
        } else {
            sku = sku.toUpperCase().trim();
            if (productoRepository.existsBySkuIgnoreCaseAndIdProductoNot(sku, id)) {
                throw new BadRequestException("Ya existe otro producto con el SKU: " + sku);
            }
        }

        Categoria categoria = null;
        if (request.getIdCategoria() != null) {
            categoria = categoriaRepository.findById(request.getIdCategoria())
                    .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada"));
        }

        Modelo modelo = null;
        if (request.getIdModelo() != null) {
            modelo = modeloRepository.findById(request.getIdModelo())
                    .orElseThrow(() -> new ResourceNotFoundException("Modelo no encontrado"));
        }

        Material material = null;
        if (request.getIdMaterial() != null) {
            material = materialRepository.findById(request.getIdMaterial())
                    .orElseThrow(() -> new ResourceNotFoundException("Material no encontrado"));
        }

        Color color = null;
        if (request.getIdColor() != null) {
            color = colorRepository.findById(request.getIdColor())
                    .orElseThrow(() -> new ResourceNotFoundException("Color no encontrado"));
        }

        Propietario propietario = null;
        if (request.getIdPropietario() != null) {
            propietario = propietarioRepository.findById(request.getIdPropietario())
                    .orElseThrow(() -> new ResourceNotFoundException("Propietario no encontrado"));
        }

        int stockAnterior = producto.getStockActual();
        int stockNuevo = request.getStockActual() != null ? request.getStockActual() : stockAnterior;

        producto.setSku(sku);
        producto.setNombre(request.getNombre().trim());
        producto.setDescripcion(request.getDescripcion());
        producto.setImagenUrl(request.getImagenUrl());
        producto.setPrecioCompra(request.getPrecioCompra() != null ? request.getPrecioCompra() : producto.getPrecioCompra());
        producto.setPrecioMayoreo(request.getPrecioMayoreo());
        producto.setPrecioUnitario(request.getPrecioUnitario());
        producto.setStockActual(stockNuevo);
        producto.setStockMinimo(request.getStockMinimo() != null ? request.getStockMinimo() : 5);
        producto.setCategoria(categoria);
        producto.setModelo(modelo);
        producto.setMaterial(material);
        producto.setColor(color);
        producto.setPropietario(propietario);
        if (request.getActivo() != null) {
            producto.setActivo(request.getActivo());
        }

        Producto updated = productoRepository.save(producto);

        if (stockAnterior != stockNuevo) {
            int diff = Math.abs(stockNuevo - stockAnterior);
            MovimientoStock movimiento = MovimientoStock.builder()
                    .producto(updated)
                    .tipo(TipoMovimiento.AJUSTE)
                    .cantidad(diff)
                    .stockAntes(stockAnterior)
                    .stockDespues(stockNuevo)
                    .motivo("Ajuste manual de stock")
                    .build();
            movimientoStockRepository.save(movimiento);
        }

        return updated;
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Producto producto = findById(id);
        producto.setActivo(false);
        productoRepository.save(producto);
    }
}
