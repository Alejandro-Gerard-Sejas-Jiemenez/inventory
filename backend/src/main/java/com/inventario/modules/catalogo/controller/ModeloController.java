package com.inventario.modules.catalogo.controller;

import com.inventario.modules.catalogo.model.Modelo;
import com.inventario.modules.catalogo.service.ModeloService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/modelos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ModeloController {

    private final ModeloService modeloService;

    @GetMapping
    public ResponseEntity<List<Modelo>> getAll() {
        return ResponseEntity.ok(modeloService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Modelo> getById(@PathVariable Long id) {
        return ResponseEntity.ok(modeloService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Modelo> create(@Valid @RequestBody Modelo modelo) {
        return new ResponseEntity<>(modeloService.create(modelo), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Modelo> update(@PathVariable Long id, @Valid @RequestBody Modelo modelo) {
        return ResponseEntity.ok(modeloService.update(id, modelo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        modeloService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
