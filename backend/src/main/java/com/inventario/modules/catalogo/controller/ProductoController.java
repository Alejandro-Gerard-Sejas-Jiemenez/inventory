package com.inventario.modules.catalogo.controller;

import com.inventario.modules.catalogo.dto.ProductoRequestDto;
import com.inventario.modules.catalogo.model.Producto;
import com.inventario.modules.catalogo.service.ProductoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProductoController {

    private final ProductoService productoService;

    @GetMapping
    public ResponseEntity<List<Producto>> getAll(
            @RequestParam(required = false) Long idModelo,
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "false") boolean lowStock
    ) {
        if (lowStock) {
            return ResponseEntity.ok(productoService.findLowStock());
        }
        if (idModelo != null) {
            return ResponseEntity.ok(productoService.findByModelo(idModelo));
        }
        if (search != null && !search.trim().isEmpty()) {
            return ResponseEntity.ok(productoService.search(search));
        }
        return ResponseEntity.ok(productoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(productoService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Producto> create(@Valid @RequestBody ProductoRequestDto request) {
        return new ResponseEntity<>(productoService.create(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> update(@PathVariable Long id, @Valid @RequestBody ProductoRequestDto request) {
        return ResponseEntity.ok(productoService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
