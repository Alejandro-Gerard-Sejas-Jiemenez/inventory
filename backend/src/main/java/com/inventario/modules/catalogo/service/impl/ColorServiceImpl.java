package com.inventario.modules.catalogo.service.impl;

import com.inventario.core.exception.BadRequestException;
import com.inventario.core.exception.ResourceNotFoundException;
import com.inventario.modules.catalogo.model.Color;
import com.inventario.modules.catalogo.repository.ColorRepository;
import com.inventario.modules.catalogo.repository.ProductoRepository;
import com.inventario.modules.catalogo.service.ColorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ColorServiceImpl implements ColorService {

    private final ColorRepository colorRepository;
    private final ProductoRepository productoRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Color> findAll() {
        return colorRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Color findById(Long id) {
        return colorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Color no encontrado con ID: " + id));
    }

    @Override
    @Transactional
    public Color create(Color color) {
        if (colorRepository.existsByNombreIgnoreCase(color.getNombre())) {
            throw new BadRequestException("Ya existe un color con el nombre: " + color.getNombre());
        }
        return colorRepository.save(color);
    }

    @Override
    @Transactional
    public Color update(Long id, Color colorDetails) {
        Color color = findById(id);
        color.setNombre(colorDetails.getNombre());
        color.setCodigoHex(colorDetails.getCodigoHex());
        if (colorDetails.getActivo() != null) {
            color.setActivo(colorDetails.getActivo());
        }
        return colorRepository.save(color);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Color color = findById(id);
        color.setActivo(false);
        colorRepository.save(color);
    }

    @Override
    @Transactional
    public void restaurar(Long id) {
        Color color = findById(id);
        color.setActivo(true);
        colorRepository.save(color);
    }
}
