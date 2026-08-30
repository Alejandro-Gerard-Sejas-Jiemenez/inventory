package com.inventario.modules.compras.service.impl;

import com.inventario.core.exception.BadRequestException;
import com.inventario.core.exception.ResourceNotFoundException;
import com.inventario.modules.compras.model.Proveedor;
import com.inventario.modules.compras.repository.CompraRepository;
import com.inventario.modules.compras.repository.ProveedorRepository;
import com.inventario.modules.compras.service.ProveedorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProveedorServiceImpl implements ProveedorService {

    private final ProveedorRepository proveedorRepository;
    private final CompraRepository compraRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Proveedor> findAll() {
        return proveedorRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Proveedor findById(Long id) {
        return proveedorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Proveedor no encontrado con ID: " + id));
    }

    @Override
    @Transactional
    public Proveedor create(Proveedor proveedor) {
        if (proveedorRepository.existsByNombreIgnoreCase(proveedor.getNombre())) {
            throw new BadRequestException("Ya existe un proveedor con el nombre: " + proveedor.getNombre());
        }
        return proveedorRepository.save(proveedor);
    }

    @Override
    @Transactional
    public Proveedor update(Long id, Proveedor details) {
        Proveedor proveedor = findById(id);
        proveedor.setNombre(details.getNombre());
        proveedor.setContacto(details.getContacto());
        proveedor.setTelefono(details.getTelefono());
        proveedor.setEmail(details.getEmail());
        proveedor.setDireccion(details.getDireccion());
        if (details.getActivo() != null) {
            proveedor.setActivo(details.getActivo());
        }
        return proveedorRepository.save(proveedor);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Proveedor proveedor = findById(id);
        if (!compraRepository.findByProveedorIdProveedor(id).isEmpty()) {
            throw new BadRequestException("No se puede eliminar el proveedor porque registra compras asociadas.");
        }
        proveedorRepository.delete(proveedor);
    }
}
