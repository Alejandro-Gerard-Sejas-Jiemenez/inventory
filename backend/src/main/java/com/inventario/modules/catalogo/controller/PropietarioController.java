package com.inventario.modules.catalogo.controller;

import com.inventario.modules.catalogo.model.Propietario;
import com.inventario.modules.catalogo.service.PropietarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/propietarios")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PropietarioController {

    private final PropietarioService propietarioService;

    @GetMapping
    public ResponseEntity<List<Propietario>> getAll() {
        return ResponseEntity.ok(propietarioService.findAll());
    }

    @GetMapping("/activos")
    public ResponseEntity<List<Propietario>> getAllActivos() {
        return ResponseEntity.ok(propietarioService.findAllActivos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Propietario> getById(@PathVariable Long id) {
        return ResponseEntity.ok(propietarioService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Propietario> create(@Valid @RequestBody Propietario propietario) {
        return new ResponseEntity<>(propietarioService.save(propietario), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Propietario> update(@PathVariable Long id, @Valid @RequestBody Propietario propietario) {
        return ResponseEntity.ok(propietarioService.update(id, propietario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        propietarioService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/restaurar")
    public ResponseEntity<Void> restaurar(@PathVariable Long id) {
        propietarioService.restaurar(id);
        return ResponseEntity.ok().build();
    }
}
