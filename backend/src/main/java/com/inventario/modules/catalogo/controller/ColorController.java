package com.inventario.modules.catalogo.controller;

import com.inventario.modules.catalogo.model.Color;
import com.inventario.modules.catalogo.service.ColorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/colores")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ColorController {

    private final ColorService colorService;

    @GetMapping
    public ResponseEntity<List<Color>> getAll() {
        return ResponseEntity.ok(colorService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Color> getById(@PathVariable Long id) {
        return ResponseEntity.ok(colorService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Color> create(@Valid @RequestBody Color color) {
        return new ResponseEntity<>(colorService.create(color), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Color> update(@PathVariable Long id, @Valid @RequestBody Color color) {
        return ResponseEntity.ok(colorService.update(id, color));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        colorService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/restaurar")
    public ResponseEntity<Void> restaurar(@PathVariable Long id) {
        colorService.restaurar(id);
        return ResponseEntity.ok().build();
    }
}
