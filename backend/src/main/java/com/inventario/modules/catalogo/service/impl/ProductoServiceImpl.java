package com.inventario.modules.catalogo.service.impl;

import com.inventario.core.exception.BadRequestException;
import com.inventario.core.exception.ResourceNotFoundException;
import com.inventario.modules.catalogo.dto.ProductoRequestDto;
import com.inventario.modules.catalogo.dto.ProductoVarianteDto;
import com.inventario.modules.catalogo.model.*;
import com.inventario.modules.catalogo.repository.*;
import com.inventario.modules.catalogo.service.ProductoService;
import com.inventario.modules.inventario.model.MovimientoStock;
import com.inventario.modules.inventario.model.TipoMovimiento;
import com.inventario.modules.inventario.repository.MovimientoStockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;
    private final ProductoVarianteRepository varianteRepository;
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
        return productoRepository.findDistinctByVariantesModeloIdModelo(idModelo);
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
        } while (varianteRepository.existsBySku(code));
        return code;
    }

    @Override
    @Transactional
    public Producto create(ProductoRequestDto request) {
        Categoria categoria = categoriaRepository.findById(request.getIdCategoria())
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada"));

        Material material = null;
        if (request.getIdMaterial() != null) {
            material = materialRepository.findById(request.getIdMaterial())
                    .orElseThrow(() -> new ResourceNotFoundException("Material no encontrado"));
        }

        Propietario propietario = null;
        if (request.getIdPropietario() != null) {
            propietario = propietarioRepository.findById(request.getIdPropietario())
                    .orElseThrow(() -> new ResourceNotFoundException("Propietario no encontrado"));
        }

        Producto producto = Producto.builder()
                .nombre(request.getNombre().trim())
                .descripcion(request.getDescripcion())
                .precioCompra(request.getPrecioCompra() != null ? request.getPrecioCompra() : java.math.BigDecimal.ZERO)
                .precioMayoreo(request.getPrecioMayoreo())
                .precioUnitario(request.getPrecioUnitario())
                .categoria(categoria)
                .material(material)
                .propietario(propietario)
                .activo(request.getActivo() != null ? request.getActivo() : true)
                .variantes(new ArrayList<>())
                .imagenes(new ArrayList<>())
                .build();

        if (request.getImagenesUrls() != null) {
            int orden = 0;
            for (String url : request.getImagenesUrls()) {
                if (url != null && !url.trim().isEmpty()) {
                    ImagenProducto img = ImagenProducto.builder()
                            .producto(producto)
                            .url(url.trim())
                            .orden(orden)
                            .esPrincipal(orden == 0)
                            .build();
                    producto.getImagenes().add(img);
                    orden++;
                }
            }
        }

        if (request.getVariantes() != null) {
            for (ProductoVarianteDto vDto : request.getVariantes()) {
                Modelo modelo = modeloRepository.findById(vDto.getIdModelo())
                        .orElseThrow(() -> new ResourceNotFoundException("Modelo no encontrado"));
                Color color = colorRepository.findById(vDto.getIdColor())
                        .orElseThrow(() -> new ResourceNotFoundException("Color no encontrado"));

                String sku = vDto.getSku();
                if (sku == null || sku.trim().isEmpty()) {
                    sku = generateUniqueSku();
                } else if (varianteRepository.existsBySku(sku.toUpperCase().trim())) {
                    throw new BadRequestException("Ya existe una variante con el SKU: " + sku);
                }

                ProductoVariante variante = ProductoVariante.builder()
                        .producto(producto)
                        .modelo(modelo)
                        .color(color)
                        .sku(sku.toUpperCase().trim())
                        .stockActual(vDto.getStockActual() != null ? vDto.getStockActual() : 0)
                        .stockMinimo(vDto.getStockMinimo() != null ? vDto.getStockMinimo() : 5)
                        .activo(vDto.getActivo() != null ? vDto.getActivo() : true)
                        .build();

                producto.getVariantes().add(variante);
            }
        }

        Producto saved = productoRepository.save(producto);

        // Generar movimientos de stock inicial
        for (ProductoVariante v : saved.getVariantes()) {
            if (v.getStockActual() > 0) {
                MovimientoStock movimiento = MovimientoStock.builder()
                        .variante(v)
                        .tipo(TipoMovimiento.ENTRADA)
                        .cantidad(v.getStockActual())
                        .stockAntes(0)
                        .stockDespues(v.getStockActual())
                        .motivo("Registro inicial de producto variante")
                        .build();
                movimientoStockRepository.save(movimiento);
            }
        }

        return saved;
    }

    @Override
    @Transactional
    public Producto update(Long id, ProductoRequestDto request) {
        Producto producto = findById(id);

        Categoria categoria = categoriaRepository.findById(request.getIdCategoria())
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada"));

        Material material = null;
        if (request.getIdMaterial() != null) {
            material = materialRepository.findById(request.getIdMaterial())
                    .orElseThrow(() -> new ResourceNotFoundException("Material no encontrado"));
        }

        Propietario propietario = null;
        if (request.getIdPropietario() != null) {
            propietario = propietarioRepository.findById(request.getIdPropietario())
                    .orElseThrow(() -> new ResourceNotFoundException("Propietario no encontrado"));
        }

        producto.setNombre(request.getNombre().trim());
        producto.setDescripcion(request.getDescripcion());
        producto.setPrecioCompra(request.getPrecioCompra() != null ? request.getPrecioCompra() : producto.getPrecioCompra());
        producto.setPrecioMayoreo(request.getPrecioMayoreo());
        producto.setPrecioUnitario(request.getPrecioUnitario());
        producto.setCategoria(categoria);
        producto.setMaterial(material);
        producto.setPropietario(propietario);
        if (request.getActivo() != null) {
            producto.setActivo(request.getActivo());
        }

        // Actualizar imágenes simples (recreando lista)
        producto.getImagenes().clear();
        if (request.getImagenesUrls() != null) {
            int orden = 0;
            for (String url : request.getImagenesUrls()) {
                if (url != null && !url.trim().isEmpty()) {
                    ImagenProducto img = ImagenProducto.builder()
                            .producto(producto)
                            .url(url.trim())
                            .orden(orden)
                            .esPrincipal(orden == 0)
                            .build();
                    producto.getImagenes().add(img);
                    orden++;
                }
            }
        }

        // TODO: Update logic for variants (syncing existing, creating new, disabling old)
        // For simplicity in this iteration, we keep existing variants and add new ones if idVariante is null
        
        return productoRepository.save(producto);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Producto producto = findById(id);
        producto.setActivo(false);
        for(ProductoVariante v : producto.getVariantes()) {
            v.setActivo(false);
        }
        productoRepository.save(producto);
    }
}
