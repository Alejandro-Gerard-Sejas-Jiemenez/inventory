package com.inventario.modules.catalogo.service.impl;

import com.inventario.core.exception.BadRequestException;
import com.inventario.core.exception.ResourceNotFoundException;
import com.inventario.modules.catalogo.model.Propietario;
import com.inventario.modules.catalogo.repository.PropietarioRepository;
import com.inventario.modules.catalogo.service.PropietarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PropietarioServiceImpl implements PropietarioService {

    private final PropietarioRepository propietarioRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Propietario> findAll() {
        return propietarioRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Propietario> findAllActivos() {
        return propietarioRepository.findByActivoTrue();
    }

    @Override
    @Transactional(readOnly = true)
    public Propietario findById(Long id) {
        return propietarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Propietario no encontrado con ID: " + id));
    }

    @Override
    @Transactional
    public Propietario save(Propietario propietario) {
        if (propietarioRepository.findByNombreIgnoreCase(propietario.getNombre()).isPresent()) {
            throw new BadRequestException("Ya existe un propietario con el nombre: " + propietario.getNombre());
        }
        propietario.setActivo(true);
        return propietarioRepository.save(propietario);
    }

    @Override
    @Transactional
    public Propietario update(Long id, Propietario propietario) {
        Propietario existente = findById(id);
        
        propietarioRepository.findByNombreIgnoreCase(propietario.getNombre())
                .filter(p -> !p.getIdPropietario().equals(id))
                .ifPresent(p -> {
                    throw new BadRequestException("Ya existe un propietario con el nombre: " + propietario.getNombre());
                });

        existente.setNombre(propietario.getNombre());
        return propietarioRepository.save(existente);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Propietario existente = findById(id);
        existente.setActivo(false);
        propietarioRepository.save(existente);
    }

    @Override
    @Transactional
    public void restaurar(Long id) {
        Propietario existente = findById(id);
        existente.setActivo(true);
        propietarioRepository.save(existente);
    }
}
