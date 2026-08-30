package com.inventario.modules.catalogo.service.impl;

import com.inventario.core.exception.ResourceNotFoundException;
import com.inventario.modules.catalogo.model.Marca;
import com.inventario.modules.catalogo.repository.MarcaRepository;
import com.inventario.modules.catalogo.service.MarcaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MarcaServiceImpl implements MarcaService {

    private final MarcaRepository marcaRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Marca> listarTodas() {
        return marcaRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Marca obtenerPorId(Long id) {
        return marcaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Marca no encontrada con ID: " + id));
    }

    @Override
    @Transactional
    public Marca guardar(Marca marca) {
        return marcaRepository.save(marca);
    }

    @Override
    @Transactional
    public void eliminar(Long id) {
        if (!marcaRepository.existsById(id)) {
            throw new ResourceNotFoundException("No se puede eliminar. Marca no encontrada con ID: " + id);
        }
        marcaRepository.deleteById(id);
    }
}
