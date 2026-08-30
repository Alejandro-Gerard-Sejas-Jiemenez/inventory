package com.inventario.modules.sistema.service.impl;

import com.inventario.core.exception.ResourceNotFoundException;
import com.inventario.modules.sistema.model.Configuracion;
import com.inventario.modules.sistema.repository.ConfiguracionRepository;
import com.inventario.modules.sistema.service.ConfiguracionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ConfiguracionServiceImpl implements ConfiguracionService {

    private final ConfiguracionRepository configuracionRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Configuracion> findAll() {
        return configuracionRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Configuracion findByClave(String clave) {
        return configuracionRepository.findByClave(clave)
                .orElseThrow(() -> new ResourceNotFoundException("Configuración no encontrada para la clave: " + clave));
    }

    @Override
    @Transactional
    public Configuracion save(Configuracion config) {
        return configuracionRepository.save(config);
    }
}
