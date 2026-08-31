package com.inventario.modules.sistema.service;

import com.inventario.modules.sistema.dto.LoginRequestDto;
import com.inventario.modules.sistema.model.Usuario;
import java.util.List;

public interface UsuarioService {
    List<Usuario> findAll();
    Usuario findById(Long id);
    Usuario create(Usuario usuario);
    Usuario update(Long id, Usuario usuario);
    void delete(Long id);
    Usuario login(LoginRequestDto request);
}
