package com.inventario.modules.compras.controller;

import com.inventario.modules.compras.dto.CompraRequestDto;
import com.inventario.modules.compras.model.Compra;
import com.inventario.modules.compras.service.CompraService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/compras")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CompraController {

    private final CompraService compraService;

    @GetMapping
    public ResponseEntity<List<Compra>> getAll() {
        return ResponseEntity.ok(compraService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Compra> getById(@PathVariable Long id) {
        return ResponseEntity.ok(compraService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Compra> registrarCompra(@Valid @RequestBody CompraRequestDto request) {
        return new ResponseEntity<>(compraService.registrarCompra(request), HttpStatus.CREATED);
    }
}
