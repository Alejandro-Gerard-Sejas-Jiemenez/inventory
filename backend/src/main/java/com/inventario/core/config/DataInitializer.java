package com.inventario.core.config;

import com.inventario.modules.catalogo.dto.ProductoRequestDto;
import com.inventario.modules.catalogo.model.Color;
import com.inventario.modules.catalogo.model.Material;
import com.inventario.modules.catalogo.model.Modelo;
import com.inventario.modules.catalogo.repository.ColorRepository;
import com.inventario.modules.catalogo.repository.MaterialRepository;
import com.inventario.modules.catalogo.repository.ModeloRepository;
import com.inventario.modules.catalogo.repository.ProductoRepository;
import com.inventario.modules.catalogo.service.ProductoService;
import com.inventario.modules.compras.model.Proveedor;
import com.inventario.modules.compras.repository.ProveedorRepository;
import com.inventario.modules.sistema.model.Configuracion;
import com.inventario.modules.sistema.model.RolUsuario;
import com.inventario.modules.sistema.model.Usuario;
import com.inventario.modules.sistema.repository.ConfiguracionRepository;
import com.inventario.modules.sistema.repository.UsuarioRepository;
import com.inventario.modules.ventas.model.Cliente;
import com.inventario.modules.ventas.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final ModeloRepository modeloRepository;
    private final ColorRepository colorRepository;
    private final MaterialRepository materialRepository;
    private final ProveedorRepository proveedorRepository;
    private final ClienteRepository clienteRepository;
    private final ProductoRepository productoRepository;
    private final ProductoService productoService;
    private final ConfiguracionRepository configuracionRepository;

    @Override
    public void run(String... args) {
        if (usuarioRepository.count() == 0) {
            log.info("Inicializando datos maestros del sistema...");

            // 1. Usuarios
            Usuario admin = usuarioRepository.save(Usuario.builder()
                    .nombre("Administrador Principal")
                    .email("admin@inventario.com")
                    .password("admin123")
                    .rol(RolUsuario.ADMIN)
                    .activo(true)
                    .build());

            Usuario vendedor = usuarioRepository.save(Usuario.builder()
                    .nombre("Carlos Vendedor")
                    .email("carlos@inventario.com")
                    .password("vendedor123")
                    .rol(RolUsuario.VENDEDOR)
                    .activo(true)
                    .build());

            // 2. Modelos
            Modelo modMacbook = modeloRepository.save(Modelo.builder()
                    .nombre("MacBook Pro 14 M3")
                    .marca("Apple")
                    .descripcion("Portátil profesional con procesador M3")
                    .activo(true)
                    .build());

            Modelo modXPS = modeloRepository.save(Modelo.builder()
                    .nombre("XPS 15 InfinityEdge")
                    .marca("Dell")
                    .descripcion("Portátil para creadores y rendimiento")
                    .activo(true)
                    .build());

            Modelo modThinkpad = modeloRepository.save(Modelo.builder()
                    .nombre("ThinkPad X1 Carbon")
                    .marca("Lenovo")
                    .descripcion("Ultraligero empresarial de alta resistencia")
                    .activo(true)
                    .build());

            // 3. Colores
            Color colGris = colorRepository.save(Color.builder()
                    .nombre("Gris Espacial")
                    .codigoHex("#7D7E80")
                    .activo(true)
                    .build());

            Color colPlata = colorRepository.save(Color.builder()
                    .nombre("Plata Estelar")
                    .codigoHex("#E3E4E5")
                    .activo(true)
                    .build());

            Color colNegro = colorRepository.save(Color.builder()
                    .nombre("Negro Mate")
                    .codigoHex("#1A1A1A")
                    .activo(true)
                    .build());

            // 4. Materiales
            Material matAluminio = materialRepository.save(Material.builder()
                    .nombre("Aluminio Aeroespacial")
                    .descripcion("Aleación ligera de alta disipación térmica")
                    .activo(true)
                    .build());

            Material matCarbono = materialRepository.save(Material.builder()
                    .nombre("Fibra de Carbono")
                    .descripcion("Compuesto ultraligero de máxima durabilidad")
                    .activo(true)
                    .build());

            Material matMagnesio = materialRepository.save(Material.builder()
                    .nombre("Aleación de Magnesio")
                    .descripcion("Carcasa resistente y liviana")
                    .activo(true)
                    .build());

            // 5. Proveedores
            Proveedor provTech = proveedorRepository.save(Proveedor.builder()
                    .nombre("TechDistro Mayorista S.A.")
                    .contacto("Roberto Gómez")
                    .telefono("+1 555-0192")
                    .email("ventas@techdistro.com")
                    .direccion("Av. Tecnología 450, Silicon Park")
                    .activo(true)
                    .build());

            Proveedor provGlobal = proveedorRepository.save(Proveedor.builder()
                    .nombre("Global Hardware Imports")
                    .contacto("Mariana Silva")
                    .telefono("+1 555-0381")
                    .email("contacto@globalhardware.com")
                    .direccion("Zona Industrial Norte #12")
                    .activo(true)
                    .build());

            // 6. Clientes
            clienteRepository.save(Cliente.builder()
                    .nombre("Innovatech Solutions")
                    .telefono("+1 555-7788")
                    .email("compras@innovatech.com")
                    .direccion("Edificio Nexus, Piso 4")
                    .activo(true)
                    .build());

            clienteRepository.save(Cliente.builder()
                    .nombre("Estudio Creativo Pixel")
                    .telefono("+1 555-4422")
                    .email("contacto@pixelestudio.com")
                    .direccion("Calle Los Ilustradores 88")
                    .activo(true)
                    .build());

            // 7. Productos iniciales
            productoService.create(ProductoRequestDto.builder()
                    .sku("LAP-MB-M3-GRIS")
                    .nombre("MacBook Pro 14' M3 18GB/512GB")
                    .descripcion("Chip M3 Pro 11-core CPU, 14-core GPU, Pantalla Liquid Retina XDR")
                    .idModelo(modMacbook.getIdModelo())
                    .idColor(colGris.getIdColor())
                    .idMaterial(matAluminio.getIdMaterial())
                    .stockActual(10)
                    .stockMinimo(3)
                    .precioCompra(new BigDecimal("1550.00"))
                    .precioMayoreo(new BigDecimal("1850.00"))
                    .precioUnitario(new BigDecimal("1999.00"))
                    .activo(true)
                    .build());

            productoService.create(ProductoRequestDto.builder()
                    .sku("LAP-XPS15-PLATA")
                    .nombre("Dell XPS 15 OLED i7 32GB/1TB")
                    .descripcion("Intel Core i7 13700H, GeForce RTX 4060, Pantalla 3.5K OLED Touch")
                    .idModelo(modXPS.getIdModelo())
                    .idColor(colPlata.getIdColor())
                    .idMaterial(matAluminio.getIdMaterial())
                    .stockActual(2) // Stock bajo de prueba
                    .stockMinimo(4)
                    .precioCompra(new BigDecimal("1400.00"))
                    .precioMayoreo(new BigDecimal("1650.00"))
                    .precioUnitario(new BigDecimal("1799.00"))
                    .activo(true)
                    .build());

            productoService.create(ProductoRequestDto.builder()
                    .sku("LAP-THINK-CARB")
                    .nombre("Lenovo ThinkPad X1 Carbon Gen 11")
                    .descripcion("Intel Core i7 vPro, 16GB RAM, 512GB SSD PCIe 4.0")
                    .idModelo(modThinkpad.getIdModelo())
                    .idColor(colNegro.getIdColor())
                    .idMaterial(matCarbono.getIdMaterial())
                    .stockActual(6)
                    .stockMinimo(2)
                    .precioCompra(new BigDecimal("1200.00"))
                    .precioMayoreo(new BigDecimal("1420.00"))
                    .precioUnitario(new BigDecimal("1549.00"))
                    .activo(true)
                    .build());

            // 8. Configuración general
            configuracionRepository.save(Configuracion.builder()
                    .clave("EMPRESA_NOMBRE")
                    .valor("StockMaster Enterprise")
                    .descripcion("Nombre comercial de la compañía")
                    .build());

            configuracionRepository.save(Configuracion.builder()
                    .clave("MONEDA_SIMBOLO")
                    .valor("$")
                    .descripcion("Símbolo de moneda principal")
                    .build());

            configuracionRepository.save(Configuracion.builder()
                    .clave("IVA_PORCENTAJE")
                    .valor("16.0")
                    .descripcion("Porcentaje de impuesto general a las ventas")
                    .build());

            log.info("Datos maestros inicializados con éxito según diseño lógico.");
        }
    }
}
