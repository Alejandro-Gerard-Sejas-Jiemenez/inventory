import os
import re

base_dir = "backend/src/main/java/com/inventario/modules/catalogo"
entities = ["Categoria", "Marca", "Color", "Modelo", "Material"]

for entity in entities:
    # 1. Update Repository
    repo_file = f"{base_dir}/repository/{entity}Repository.java"
    if os.path.exists(repo_file):
        with open(repo_file, "r") as f:
            repo_content = f.read()
        if "findByActivoTrue" not in repo_content:
            repo_content = repo_content.replace("}", f"    java.util.List<{entity}> findByActivoTrue();\n}}")
            with open(repo_file, "w") as f:
                f.write(repo_content)

    # 2. Update Service Interface
    service_file = f"{base_dir}/service/{entity}Service.java"
    if os.path.exists(service_file):
        with open(service_file, "r") as f:
            service_content = f.read()
        if "restaurar" not in service_content:
            service_content = service_content.replace("}", f"    void restaurar(Long id);\n}}")
            with open(service_file, "w") as f:
                f.write(service_content)

    # 3. Update Service Impl
    impl_file = f"{base_dir}/service/impl/{entity}ServiceImpl.java"
    if os.path.exists(impl_file):
        with open(impl_file, "r") as f:
            impl_content = f.read()
        
        if "restaurar" not in impl_content:
            repo_name = f"{entity.lower()}Repository"
            
            # replace eliminar logic
            impl_content = re.sub(
                r'public void eliminar\(Long id\) \{.*?(?=^\s*})^\s*}', 
                f'''public void eliminar(Long id) {{
        {entity} obj = obtenerPorId(id);
        obj.setActivo(false);
        {repo_name}.save(obj);
    }}''', 
                impl_content, 
                flags=re.DOTALL | re.MULTILINE
            )
            
            # add restaurar
            impl_content = impl_content.replace("}", f'''
    @Override
    @org.springframework.transaction.annotation.Transactional
    public void restaurar(Long id) {{
        {entity} obj = obtenerPorId(id);
        obj.setActivo(true);
        {repo_name}.save(obj);
    }}
}}''')
            with open(impl_file, "w") as f:
                f.write(impl_content)

    # 4. Update Controller
    ctrl_file = f"{base_dir}/controller/{entity}Controller.java"
    if os.path.exists(ctrl_file):
        with open(ctrl_file, "r") as f:
            ctrl_content = f.read()
        
        if "restaurar" not in ctrl_content:
            ctrl_content = ctrl_content.replace("}", f'''
    @org.springframework.web.bind.annotation.PutMapping("/{{id}}/restaurar")
    public org.springframework.http.ResponseEntity<Void> restaurar(@org.springframework.web.bind.annotation.PathVariable Long id) {{
        {entity.lower()}Service.restaurar(id);
        return org.springframework.http.ResponseEntity.ok().build();
    }}
}}''')
            with open(ctrl_file, "w") as f:
                f.write(ctrl_content)

print("Update complete")
