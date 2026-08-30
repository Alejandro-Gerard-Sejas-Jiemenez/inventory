package com.inventario.modules.sistema.controller;

import com.inventario.modules.sistema.model.Bitacora;
import com.inventario.modules.sistema.service.BitacoraService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/bitacora")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BitacoraController {

    private final BitacoraService bitacoraService;

    @GetMapping
    public ResponseEntity<List<Bitacora>> getAll() {
        return ResponseEntity.ok(bitacoraService.findAll());
    }
}
