package com.inventario.modules.catalogo.service.impl;

import com.inventario.core.exception.BadRequestException;
import com.inventario.core.exception.ResourceNotFoundException;
import com.inventario.modules.catalogo.model.Material;
import com.inventario.modules.catalogo.repository.MaterialRepository;
import com.inventario.modules.catalogo.repository.ProductoRepository;
import com.inventario.modules.catalogo.service.MaterialService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MaterialServiceImpl implements MaterialService {

    private final MaterialRepository materialRepository;
    private final ProductoRepository productoRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Material> findAll() {
        return materialRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Material findById(Long id) {
        return materialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Material no encontrado con ID: " + id));
    }

    @Override
    @Transactional
    public Material create(Material material) {
        if (materialRepository.existsByNombreIgnoreCase(material.getNombre())) {
            throw new BadRequestException("Ya existe un material con el nombre: " + material.getNombre());
        }
        return materialRepository.save(material);
    }

    @Override
    @Transactional
    public Material update(Long id, Material details) {
        Material material = findById(id);
        material.setNombre(details.getNombre());
        material.setDescripcion(details.getDescripcion());
        if (details.getActivo() != null) {
            material.setActivo(details.getActivo());
        }
        return materialRepository.save(material);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Material material = findById(id);
        if (!productoRepository.findByMaterialIdMaterial(id).isEmpty()) {
            throw new BadRequestException("No se puede eliminar el material porque contiene productos asociados.");
        }
        materialRepository.delete(material);
    }
}
