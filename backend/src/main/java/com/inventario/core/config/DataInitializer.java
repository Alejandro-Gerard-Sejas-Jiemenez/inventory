package com.inventario.core.config;

import com.inventario.modules.catalogo.dto.ProductoRequestDto;
import com.inventario.modules.catalogo.dto.ProductoVarianteDto;
import com.inventario.modules.catalogo.model.*;
import com.inventario.modules.catalogo.repository.*;
import com.inventario.modules.catalogo.service.ProductoService;
import com.inventario.modules.compras.model.Proveedor;
import com.inventario.modules.compras.repository.ProveedorRepository;
import com.inventario.modules.sistema.model.Configuracion;
import com.inventario.modules.sistema.model.Rol;
import com.inventario.modules.sistema.model.Usuario;
import com.inventario.modules.sistema.repository.ConfiguracionRepository;
import com.inventario.modules.sistema.repository.RolRepository;
import com.inventario.modules.sistema.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final MarcaRepository marcaRepository;
    private final CategoriaRepository categoriaRepository;
    private final ModeloRepository modeloRepository;
    private final ColorRepository colorRepository;
    private final MaterialRepository materialRepository;
    private final ProveedorRepository proveedorRepository;
    private final ProductoRepository productoRepository;
    private final ProductoService productoService;
    private final ConfiguracionRepository configuracionRepository;
    private final org.springframework.jdbc.core.JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) {
        // Migración de esquema en caliente para compatibilidad con la DB remota de Supabase / PostgreSQL
        try {
            jdbcTemplate.execute("ALTER TABLE public.productos ALTER COLUMN sku DROP NOT NULL");
            jdbcTemplate.execute("ALTER TABLE public.productos ALTER COLUMN id_modelo DROP NOT NULL");
            jdbcTemplate.execute("ALTER TABLE public.productos ALTER COLUMN id_color DROP NOT NULL");
            jdbcTemplate.execute("ALTER TABLE public.productos ALTER COLUMN stock_actual DROP NOT NULL");
            jdbcTemplate.execute("ALTER TABLE public.productos ALTER COLUMN stock_minimo DROP NOT NULL");
            log.info("Migración de tabla productos ejecutada exitosamente (columnas obsoletas hechas anulables).");
        } catch (Exception e) {
            log.debug("Aviso migración esquema productos: {}", e.getMessage());
        }

        if (usuarioRepository.count() == 0) {
            log.info("Inicializando datos maestros del sistema...");
            // 0. Roles
            Rol rolAdmin = rolRepository.save(Rol.builder()
                    .nombre("ADMIN")
                    .descripcion("Administrador con acceso total")
                    .build());

            Rol rolVendedor = rolRepository.save(Rol.builder()
                    .nombre("VENDEDOR")
                    .descripcion("Vendedor con acceso limitado a caja y ventas")
                    .build());

            // 1. Usuarios
            Usuario admin = usuarioRepository.save(Usuario.builder()
                    .nombre("Administrador Principal")
                    .email("admin@inventario.com")
                    .password("admin123")
                    .rol(rolAdmin)
                    .activo(true)
                    .build());

            Usuario vendedor = usuarioRepository.save(Usuario.builder()
                    .nombre("Carlos Vendedor")
                    .email("carlos@inventario.com")
                    .password("vendedor123")
                    .rol(rolVendedor)
                    .activo(true)
                    .build());

            // 2. Marcas (Fabricantes / Origen)
            Marca marcaApple = marcaRepository.save(Marca.builder().nombre("Apple").build());
            Marca marcaSamsung = marcaRepository.save(Marca.builder().nombre("Samsung").build());
            Marca marcaDell = marcaRepository.save(Marca.builder().nombre("Dell").build());
            Marca marcaLenovo = marcaRepository.save(Marca.builder().nombre("Lenovo").build());
            Marca marcaSony = marcaRepository.save(Marca.builder().nombre("Sony").build());
            Marca marcaXiaomi = marcaRepository.save(Marca.builder().nombre("Xiaomi").build());

            // 3. Categorías (Multirubro)
            Categoria catLaptops = categoriaRepository.save(Categoria.builder()
                    .nombre("Laptops & Computadoras")
                    .descripcion("Portátiles profesionales, ultrabooks y equipos de escritorio")
                    .build());

            Categoria catSmartphones = categoriaRepository.save(Categoria.builder()
                    .nombre("Smartphones & Celulares")
                    .descripcion("Teléfonos inteligentes y dispositivos móviles de última generación")
                    .build());

            Categoria catAudio = categoriaRepository.save(Categoria.builder()
                    .nombre("Audio & Auriculares")
                    .descripcion("Audífonos bluetooth, parlantes y sistemas de sonido")
                    .build());

            Categoria catAccesorios = categoriaRepository.save(Categoria.builder()
                    .nombre("Accesorios & Fundas")
                    .descripcion("Fundas de protección, protectores y soportes")
                    .build());

            // 4. Modelos asociados a su Marca
            Modelo modMacbook = modeloRepository.save(Modelo.builder()
                    .nombre("MacBook Pro 14 M3")
                    .marca(marcaApple)
                    .descripcion("Portátil profesional con procesador M3")
                    .activo(true)
                    .build());

            Modelo modIphone = modeloRepository.save(Modelo.builder()
                    .nombre("iPhone 15 Pro Max")
                    .marca(marcaApple)
                    .descripcion("Smartphone titanio chip A17 Pro")
                    .activo(true)
                    .build());

            Modelo modXPS = modeloRepository.save(Modelo.builder()
                    .nombre("XPS 15 InfinityEdge")
                    .marca(marcaDell)
                    .descripcion("Portátil para creadores y alto rendimiento")
                    .activo(true)
                    .build());

            Modelo modThinkpad = modeloRepository.save(Modelo.builder()
                    .nombre("ThinkPad X1 Carbon")
                    .marca(marcaLenovo)
                    .descripcion("Ultraligero empresarial de alta resistencia")
                    .activo(true)
                    .build());

            Modelo modGalaxy = modeloRepository.save(Modelo.builder()
                    .nombre("Galaxy S24 Ultra")
                    .marca(marcaSamsung)
                    .descripcion("Smartphone insignia con Galaxy AI")
                    .activo(true)
                    .build());

            // 5. Colores
            Color colGris = colorRepository.save(Color.builder()
                    .nombre("Gris Espacial")
                    .codigoHex("#7D7E80")
                    .activo(true)
                    .build());

            Color colPlata = colorRepository.save(Color.builder()
                    .nombre("Plata Titanio")
                    .codigoHex("#E3E4E5")
                    .activo(true)
                    .build());

            Color colNegro = colorRepository.save(Color.builder()
                    .nombre("Negro Medianoche")
                    .codigoHex("#111827")
                    .activo(true)
                    .build());

            Color colOro = colorRepository.save(Color.builder()
                    .nombre("Oro Caserito")
                    .codigoHex("#F59E0B")
                    .activo(true)
                    .build());

            // 6. Materiales
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

            Material matTitanio = materialRepository.save(Material.builder()
                    .nombre("Titanio Grado 5")
                    .descripcion("Material aeroespacial ultra resistente")
                    .activo(true)
                    .build());

            // 7. Proveedores
            Proveedor provTech = proveedorRepository.save(Proveedor.builder()
                    .nombre("TechDistro Mayorista S.A.")
                    .contacto("Roberto Gómez")
                    .telefono("+591 71234567")
                    .email("ventas@techdistro.com")
                    .direccion("Av. Tecnología 450, Silicon Park")
                    .activo(true)
                    .build());

            Proveedor provGlobal = proveedorRepository.save(Proveedor.builder()
                    .nombre("Global Hardware Imports")
                    .contacto("Mariana Silva")
                    .telefono("+591 78901234")
                    .email("contacto@globalhardware.com")
                    .direccion("Zona Industrial Norte #12")
                    .activo(true)
                    .build());

            // 9. Productos iniciales
            productoService.create(ProductoRequestDto.builder()
                    .nombre("MacBook Pro 14' M3 18GB/512GB")
                    .descripcion("Chip M3 Pro 11-core CPU, 14-core GPU, Pantalla Liquid Retina XDR")
                    .idCategoria(catLaptops.getIdCategoria())
                    .idMaterial(matAluminio.getIdMaterial())
                    .precioCompra(new BigDecimal("1550.00"))
                    .precioMayoreo(new BigDecimal("1850.00"))
                    .precioUnitario(new BigDecimal("1999.00"))
                    .imagenesUrls(List.of("https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80"))
                    .variantes(List.of(
                            ProductoVarianteDto.builder()
                                    .sku("LAP-MB-M3-GRIS")
                                    .idModelo(modMacbook.getIdModelo())
                                    .idColor(colGris.getIdColor())
                                    .stockActual(10)
                                    .stockMinimo(3)
                                    .build()
                    ))
                    .activo(true)
                    .build());

            productoService.create(ProductoRequestDto.builder()
                    .nombre("iPhone 15 Pro Max 256GB")
                    .descripcion("Pantalla Super Retina XDR 6.7', Chip A17 Pro, Cámara 48MP")
                    .idCategoria(catSmartphones.getIdCategoria())
                    .idMaterial(matTitanio.getIdMaterial())
                    .precioCompra(new BigDecimal("1100.00"))
                    .precioMayoreo(new BigDecimal("1320.00"))
                    .precioUnitario(new BigDecimal("1450.00"))
                    .imagenesUrls(List.of("https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=400&q=80"))
                    .variantes(List.of(
                            ProductoVarianteDto.builder()
                                    .sku("CEL-IPHONE15-TIT")
                                    .idModelo(modIphone.getIdModelo())
                                    .idColor(colPlata.getIdColor())
                                    .stockActual(8)
                                    .stockMinimo(2)
                                    .build()
                    ))
                    .activo(true)
                    .build());

            productoService.create(ProductoRequestDto.builder()
                    .nombre("Dell XPS 15 OLED i7 32GB/1TB")
                    .descripcion("Intel Core i7 13700H, GeForce RTX 4060, Pantalla 3.5K OLED Touch")
                    .idCategoria(catLaptops.getIdCategoria())
                    .idMaterial(matAluminio.getIdMaterial())
                    .precioCompra(new BigDecimal("1400.00"))
                    .precioMayoreo(new BigDecimal("1650.00"))
                    .precioUnitario(new BigDecimal("1799.00"))
                    .imagenesUrls(List.of("https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=400&q=80"))
                    .variantes(List.of(
                            ProductoVarianteDto.builder()
                                    .sku("LAP-XPS15-PLATA")
                                    .idModelo(modXPS.getIdModelo())
                                    .idColor(colPlata.getIdColor())
                                    .stockActual(2)
                                    .stockMinimo(4)
                                    .build()
                    ))
                    .activo(true)
                    .build());

            productoService.create(ProductoRequestDto.builder()
                    .nombre("Samsung Galaxy S24 Ultra 512GB")
                    .descripcion("Dynamic AMOLED 2X 120Hz, Snapdragon 8 Gen 3, S-Pen integrado")
                    .idCategoria(catSmartphones.getIdCategoria())
                    .idMaterial(matTitanio.getIdMaterial())
                    .precioCompra(new BigDecimal("1050.00"))
                    .precioMayoreo(new BigDecimal("1250.00"))
                    .precioUnitario(new BigDecimal("1380.00"))
                    .imagenesUrls(List.of("https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=400&q=80"))
                    .variantes(List.of(
                            ProductoVarianteDto.builder()
                                    .sku("CEL-S24-ORO")
                                    .idModelo(modGalaxy.getIdModelo())
                                    .idColor(colOro.getIdColor())
                                    .stockActual(5)
                                    .stockMinimo(2)
                                    .build()
                    ))
                    .activo(true)
                    .build());

            // 10. Configuración general
            configuracionRepository.save(Configuracion.builder()
                    .clave("EMPRESA_NOMBRE")
                    .valor("Los Caseritos")
                    .descripcion("Nombre comercial de la compañía")
                    .build());

            configuracionRepository.save(Configuracion.builder()
                    .clave("MONEDA_SIMBOLO")
                    .valor("Bs.")
                    .descripcion("Símbolo de moneda principal")
                    .build());

            configuracionRepository.save(Configuracion.builder()
                    .clave("IVA_PORCENTAJE")
                    .valor("13.0")
                    .descripcion("Porcentaje de impuesto general a las ventas")
                    .build());

            log.info("Datos maestros inicializados con éxito según diseño lógico.");
        }
    }
}
