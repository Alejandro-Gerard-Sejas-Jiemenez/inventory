package com.inventario.modules.ventas.controller;

import com.inventario.modules.ventas.dto.VentaRequestDto;
import com.inventario.modules.ventas.model.Venta;
import com.inventario.modules.ventas.service.VentaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ventas")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class VentaController {

    private final VentaService ventaService;

    @GetMapping
    public ResponseEntity<List<Venta>> getAll() {
        return ResponseEntity.ok(ventaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venta> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ventaService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Venta> registrarVenta(@Valid @RequestBody VentaRequestDto request) {
        return new ResponseEntity<>(ventaService.registrarVenta(request), HttpStatus.CREATED);
    }

    @PostMapping("/{id}/cancelar")
    public ResponseEntity<Void> cancelarVenta(@PathVariable Long id) {
        ventaService.cancelarVenta(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/estado")
    public ResponseEntity<Venta> cambiarEstado(
            @PathVariable Long id,
            @RequestParam com.inventario.modules.ventas.model.EstadoVenta nuevoEstado,
            @RequestParam(required = false) Long idUsuario) {
        return ResponseEntity.ok(ventaService.cambiarEstado(id, nuevoEstado, idUsuario));
    }
}
