package com.inventario.modules.catalogo.service.impl;

import com.inventario.core.exception.BadRequestException;
import com.inventario.core.exception.ResourceNotFoundException;
import com.inventario.modules.catalogo.model.Modelo;
import com.inventario.modules.catalogo.repository.ModeloRepository;
import com.inventario.modules.catalogo.repository.ProductoRepository;
import com.inventario.modules.catalogo.service.ModeloService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ModeloServiceImpl implements ModeloService {

    private final ModeloRepository modeloRepository;
    private final ProductoRepository productoRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Modelo> findAll() {
        return modeloRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Modelo findById(Long id) {
        return modeloRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Modelo no encontrado con ID: " + id));
    }

    @Override
    @Transactional
    public Modelo create(Modelo modelo) {
        if (modeloRepository.existsByNombreIgnoreCase(modelo.getNombre())) {
            throw new BadRequestException("Ya existe un modelo con el nombre: " + modelo.getNombre());
        }
        return modeloRepository.save(modelo);
    }

    @Override
    @Transactional
    public Modelo update(Long id, Modelo modeloDetails) {
        Modelo modelo = findById(id);
        modelo.setNombre(modeloDetails.getNombre());
        modelo.setMarca(modeloDetails.getMarca());
        modelo.setDescripcion(modeloDetails.getDescripcion());
        if (modeloDetails.getActivo() != null) {
            modelo.setActivo(modeloDetails.getActivo());
        }
        return modeloRepository.save(modelo);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Modelo modelo = findById(id);
        if (!productoRepository.findByModeloIdModelo(id).isEmpty()) {
            throw new BadRequestException("No se puede eliminar el modelo porque contiene productos asociados.");
        }
        modeloRepository.delete(modelo);
    }
}
