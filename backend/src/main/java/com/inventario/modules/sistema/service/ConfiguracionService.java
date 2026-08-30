package com.inventario.modules.sistema.service;


import com.inventario.modules.sistema.model.Configuracion;
import java.util.List;

public interface ConfiguracionService {
    List<Configuracion> findAll();
    Configuracion findByClave(String clave);
    Configuracion save(Configuracion config);
}
