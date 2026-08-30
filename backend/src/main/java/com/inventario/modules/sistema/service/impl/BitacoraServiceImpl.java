package com.inventario.modules.sistema.service.impl;

import com.inventario.modules.sistema.model.Bitacora;
import com.inventario.modules.sistema.model.Usuario;
import com.inventario.modules.sistema.repository.BitacoraRepository;
import com.inventario.modules.sistema.service.BitacoraService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BitacoraServiceImpl implements BitacoraService {

    private final BitacoraRepository bitacoraRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Bitacora> findAll() {
        return bitacoraRepository.findTop100ByOrderByFechaHoraDesc();
    }

    @Override
    @Transactional
    public Bitacora registrar(Usuario usuario, String accion, String tablaAfectada, Long idRegistro, String detalle, String ip) {
        Bitacora bitacora = Bitacora.builder()
                .usuario(usuario)
                .accion(accion)
                .tablaAfectada(tablaAfectada)
                .idRegistroAfectado(idRegistro)
                .detalle(detalle)
                .ip(ip != null ? ip : "127.0.0.1")
                .build();
        return bitacoraRepository.save(bitacora);
    }
}
