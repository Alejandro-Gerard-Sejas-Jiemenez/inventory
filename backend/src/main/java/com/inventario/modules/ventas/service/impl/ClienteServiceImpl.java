package com.inventario.modules.ventas.service.impl;

import com.inventario.core.exception.BadRequestException;
import com.inventario.core.exception.ResourceNotFoundException;
import com.inventario.modules.ventas.model.Cliente;
import com.inventario.modules.ventas.repository.ClienteRepository;
import com.inventario.modules.ventas.repository.VentaRepository;
import com.inventario.modules.ventas.service.ClienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClienteServiceImpl implements ClienteService {

    private final ClienteRepository clienteRepository;
    private final VentaRepository ventaRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Cliente findById(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado con ID: " + id));
    }

    @Override
    @Transactional
    public Cliente create(Cliente cliente) {
        if (cliente.getEmail() != null && !cliente.getEmail().isBlank()) {
            if (clienteRepository.findByEmailIgnoreCase(cliente.getEmail()).isPresent()) {
                throw new BadRequestException("Ya existe un cliente con el email: " + cliente.getEmail());
            }
        }
        return clienteRepository.save(cliente);
    }

    @Override
    @Transactional
    public Cliente update(Long id, Cliente details) {
        Cliente cliente = findById(id);
        cliente.setNombre(details.getNombre());
        cliente.setTelefono(details.getTelefono());
        cliente.setEmail(details.getEmail());
        cliente.setDireccion(details.getDireccion());
        if (details.getActivo() != null) {
            cliente.setActivo(details.getActivo());
        }
        return clienteRepository.save(cliente);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Cliente cliente = findById(id);
        if (!ventaRepository.findByClienteIdCliente(id).isEmpty()) {
            throw new BadRequestException("No se puede eliminar el cliente porque tiene ventas asociadas.");
        }
        clienteRepository.delete(cliente);
    }
}
