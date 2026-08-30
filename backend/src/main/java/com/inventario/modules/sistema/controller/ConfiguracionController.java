package com.inventario.modules.sistema.controller;

import com.inventario.modules.sistema.model.Configuracion;
import com.inventario.modules.sistema.service.ConfiguracionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/configuracion")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ConfiguracionController {

    private final ConfiguracionService configuracionService;

    @GetMapping
    public ResponseEntity<List<Configuracion>> getAll() {
        return ResponseEntity.ok(configuracionService.findAll());
    }

    @GetMapping("/{clave}")
    public ResponseEntity<Configuracion> getByClave(@PathVariable String clave) {
        return ResponseEntity.ok(configuracionService.findByClave(clave));
    }

    @PostMapping
    public ResponseEntity<Configuracion> save(@Valid @RequestBody Configuracion config) {
        return ResponseEntity.ok(configuracionService.save(config));
    }
}
