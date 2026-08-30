package com.inventario.modules.inventario.controller;

import com.inventario.modules.inventario.dto.MovimientoStockRequestDto;
import com.inventario.modules.inventario.model.MovimientoStock;
import com.inventario.modules.inventario.service.MovimientoStockService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movimientos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MovimientoStockController {

    private final MovimientoStockService movimientoStockService;

    @GetMapping
    public ResponseEntity<List<MovimientoStock>> getAll(@RequestParam(required = false) Long idProducto) {
        if (idProducto != null) {
            return ResponseEntity.ok(movimientoStockService.findByProducto(idProducto));
        }
        return ResponseEntity.ok(movimientoStockService.findAll());
    }

    @PostMapping
    public ResponseEntity<MovimientoStock> registrar(@Valid @RequestBody MovimientoStockRequestDto request) {
        return new ResponseEntity<>(movimientoStockService.registrarMovimiento(request), HttpStatus.CREATED);
    }
}
