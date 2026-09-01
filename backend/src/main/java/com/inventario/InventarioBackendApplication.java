package com.inventario;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;

@SpringBootApplication
public class InventarioBackendApplication {

	public static void main(String[] args) {
		// Cargar automáticamente variables de entorno desde el archivo .env si existe
		try {
			// Buscar en la raíz del proyecto o en el directorio actual
			File envFile = new File(".env");
			File parentEnvFile = new File("../.env");
			
			Dotenv dotenv = null;
			if (envFile.exists()) {
				dotenv = Dotenv.configure().ignoreIfMissing().load();
			} else if (parentEnvFile.exists()) {
				dotenv = Dotenv.configure().directory("..").ignoreIfMissing().load();
			}

			if (dotenv != null) {
				dotenv.entries().forEach(entry -> {
					if (System.getProperty(entry.getKey()) == null && System.getenv(entry.getKey()) == null) {
						System.setProperty(entry.getKey(), entry.getValue());
					}
				});
			}
		} catch (Exception e) {
			// Si no existe .env, continúa normalmente con application.properties o variables del sistema
		}

		SpringApplication.run(InventarioBackendApplication.class, args);
	}

}
