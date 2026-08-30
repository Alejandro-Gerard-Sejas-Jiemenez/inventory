package com.inventario.modules.sistema.service;


import com.inventario.modules.sistema.model.Bitacora;
import com.inventario.modules.sistema.model.Usuario;
import java.util.List;

public interface BitacoraService {
    List<Bitacora> findAll();
    Bitacora registrar(Usuario usuario, String accion, String tablaAfectada, Long idRegistro, String detalle, String ip);
}
