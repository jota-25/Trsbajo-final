document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const navInner = document.querySelector('.nav-inner');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  // cerrar al clicar un link
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // cerrar con Escape o clic fuera
  document.addEventListener('click', (e) => {
    if (!navInner.contains(e.target) && navLinks.classList.contains('open')) {
      toggle.classList.remove('open');
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
});




document.addEventListener("DOMContentLoaded",() => {
  
    const modal= document.getElementById("imgModal");
    const modalImg= document.getElementById("modalImg");
    const cerrar= document.querySelector(".cerrar");

    const tarjetas = document.querySelectorAll(".cert-card");

  tarjetas.forEach(card => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img");
      if (img) {
        modal.style.display = "flex";
        modalImg.src = img.src;
      }
    });
  });

    cerrar.addEventListener("click", () => {

        modal.style.display= "none";
    });

    modal.addEventListener("click",(e) => {

        if(e.target === modal){
            modal.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const skills = document.querySelectorAll(".skill-card");
  const modal = document.getElementById("projectModal");
  const closeBtn = modal.querySelector(".cerrar-proyectos");
  const modalTitle = document.getElementById("modal-title");
  const modalCode = document.getElementById("modal-code");
  const modalGithub = document.getElementById("modal-github");

  const codeSamples = {
    python: `import os
            from datetime import datetime

            # -------------------- UTILIDADES -------------------- #
            def limpiar_pantalla():
                os.system("cls" if os.name == "nt" else "clear")

            def validar_dni(dni):
                return dni.isdigit() and len(dni) == 8

            def validar_nombre(nombre):
                return nombre.replace(" ", "").isalpha()

            def confirmar(mensaje):
                opcion = input(mensaje + " (S/N): ").strip().upper()
                return opcion == "S"

            # -------------------- USUARIOS -------------------- #
            def crear_usuario():
                usuario = input("Nuevo nombre de usuario: ")
                contraseña = input("Nueva contraseña: ")
                with open("usuarios.txt", "a") as archivo:
                    archivo.write(f"{usuario},{contraseña}\n")
                print("Usuario creado con éxito.")

            def login():
                usuario = input("Usuario: ")
                contraseña = input("Contraseña: ")
                try:
                    with open("usuarios.txt", "r") as archivo:
                        for linea in archivo:
                            u, c = linea.strip().split(",")
                            if usuario == u and contraseña == c:
                                print("Inicio de sesión exitoso.")
                                return usuario
                    print("Usuario o contraseña incorrectos.")
                except FileNotFoundError:
                    print("No hay usuarios registrados. Crea uno primero.")
                return None

            # -------------------- TRABAJADORES -------------------- #
            def crear_trabajador():
                nombre = input("Nombre del trabajador: ").strip()
                if not validar_nombre(nombre):
                    print("Nombre inválido. Solo letras y espacios.")
                    return
                dni = input("DNI del trabajador: ").strip()
                if not validar_dni(dni):
                    print("DNI inválido. Debe tener 8 dígitos.")
                    return
                if confirmar("¿Deseas registrar al trabajador?"):
                    with open("trabajadores.txt", "a") as archivo:
                        archivo.write(f"{nombre},{dni}\n")
                    os.makedirs("Trabajadores", exist_ok=True)
                    with open(f"Trabajadores/{nombre}.txt", "w") as f:
                        f.write(f"Nombre: {nombre}\nDNI: {dni}\n\n")
                    print("Trabajador registrado y archivo creado.")

            # -------------------- ACTIVIDADES -------------------- #
            def registrar_actividad():
                nombre = input("Nombre del trabajador: ").strip()
                actividad = input("Descripción de la actividad: ")
                fecha = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                if confirmar("¿Registrar esta actividad?"):
                    with open("actividades.txt", "a") as archivo:
                        archivo.write(f"{nombre},{actividad},{fecha}\n")
                    with open(f"Trabajadores/{nombre}.txt", "a") as f:
                        f.write(f"[ACTIVIDAD] {fecha}: {actividad}\n")
                    print("Actividad registrada.")

            def eliminar_actividad():
                nombre = input("Nombre del trabajador: ").strip()
                actividades = []
                try:
                    with open("actividades.txt", "r") as archivo:
                        actividades = archivo.readlines()
                except FileNotFoundError:
                    print("No hay actividades registradas.")
                    return

                actividades_filtradas = [linea for linea in actividades if linea.startswith(nombre)]
                if not actividades_filtradas:
                    print("No se encontraron actividades para este trabajador.")
                    return

                print("\nActividades encontradas:")
                for i, act in enumerate(actividades_filtradas):
                    print(f"{i + 1}. {act.strip()}")

                try:
                    seleccion = int(input("Seleccione el número de la actividad a eliminar: ")) - 1
                    if 0 <= seleccion < len(actividades_filtradas):
                        actividad_eliminar = actividades_filtradas[seleccion]
                        if confirmar("¿Eliminar esta actividad?"):
                            with open("actividades.txt", "w") as archivo:
                                for linea in actividades:
                                    if linea != actividad_eliminar:
                                        archivo.write(linea)
                            print("Actividad eliminada del archivo general.")
                    else:
                        print("Selección inválida.")
                except ValueError:
                    print("Entrada inválida.")

            # -------------------- ASISTENCIA -------------------- #
            def registrar_asistencia():
                nombre = input("Nombre del trabajador: ").strip()
                tipo = input("¿Entrada o Salida? (E/S): ").strip().upper()
                if tipo not in ("E", "S"):
                    print("Tipo inválido.")
                    return
                fecha = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                if confirmar("¿Registrar esta asistencia?"):
                    with open("asistencias.txt", "a") as archivo:
                        archivo.write(f"{nombre},{tipo},{fecha}\n")
                    with open(f"Trabajadores/{nombre}.txt", "a") as f:
                        f.write(f"[ASISTENCIA] {fecha}: {'Entrada' if tipo == 'E' else 'Salida'}\n")
                    print("Asistencia registrada.")

            # -------------------- CONSULTAS -------------------- #
            def listar_trabajadores():
                print("\n--- Trabajadores Registrados ---")
                try:
                    with open("trabajadores.txt", "r") as archivo:
                        for linea in archivo:
                            print(linea.strip())
                except FileNotFoundError:
                    print("No hay trabajadores registrados.")

            def filtrar_por_nombre_y_fecha(nombre, archivo):
                fecha_filtro = input("Ingrese fecha a filtrar (YYYY-MM-DD) o Enter para omitir: ").strip()
                try:
                    with open(archivo, "r") as f:
                        encontrados = False
                        for linea in f:
                            if nombre in linea:
                                if not fecha_filtro or fecha_filtro in linea:
                                    print(linea.strip())
                                    encontrados = True
                        if not encontrados:
                            print("No se encontraron registros para ese trabajador.")
                except FileNotFoundError:
                    print("No hay registros aún.")

            def exportar_datos(nombre):
                try:
                    with open(f"Trabajadores/{nombre}.txt", "r") as origen, open(f"{nombre}_resumen.txt", "w") as destino:
                        destino.write(origen.read())
                    print(f"Datos exportados a {nombre}_resumen.txt")
                except FileNotFoundError:
                    print("Trabajador no encontrado.")

            # -------------------- ADMINISTRADOR -------------------- #
            def eliminar_trabajador():
                nombre = input("Nombre del trabajador a eliminar: ")
                if confirmar(f"¿Eliminar a {nombre} de todos los registros?"):
                    try:
                        with open("trabajadores.txt", "r") as archivo:
                            lineas = archivo.readlines()
                        with open("trabajadores.txt", "w") as archivo:
                            for linea in lineas:
                                if not linea.startswith(nombre):
                                    archivo.write(linea)
                        os.remove(f"Trabajadores/{nombre}.txt")
                        print("Trabajador eliminado.")
                    except:
                        print("No se pudo eliminar.")

            # -------------------- MENÚS -------------------- #
            def menu(usuario):
                while True:
                    print("\n" + "-"*40)
                    print(" MENÚ PRINCIPAL ".center(40, "-"))
                    print("1. Crear nuevo trabajador")
                    print("2. Registrar actividad")
                    print("3. Registrar entrada/salida")
                    print("4. Listar trabajadores")
                    print("5. Ver actividades por trabajador")
                    print("6. Ver asistencias por trabajador")
                    print("7. Exportar datos de un trabajador")
                    print("8. Eliminar actividad de un trabajador")
                    if usuario == "admin":
                        print("9. Eliminar trabajador")
                    print("0. Salir")
                    opcion = input("Seleccione una opción: ")

                    if opcion == "1":
                        crear_trabajador()
                    elif opcion == "2":
                        registrar_actividad()
                    elif opcion == "3":
                        registrar_asistencia()
                    elif opcion == "4":
                        listar_trabajadores()
                    elif opcion == "5":
                        nombre = input("Nombre del trabajador: ")
                        filtrar_por_nombre_y_fecha(nombre, "actividades.txt")
                    elif opcion == "6":
                        nombre = input("Nombre del trabajador: ")
                        filtrar_por_nombre_y_fecha(nombre, "asistencias.txt")
                    elif opcion == "7":
                        nombre = input("Nombre del trabajador: ")
                        exportar_datos(nombre)
                    elif opcion == "8":
                        eliminar_actividad()
                    elif opcion == "9" and usuario == "admin":
                        eliminar_trabajador()
                    elif opcion == "0":
                        break
                    else:
                        print("Opción inválida.")

            # -------------------- INICIO -------------------- #
            def inicio():
                while True:
                    print("\n" + "-"*40)
                    print(" BIENVENIDO ".center(40, "-"))
                    print("1. Crear nuevo usuario")
                    print("2. Iniciar sesión")
                    print("3. Salir")
                    opcion = input("Seleccione una opción: ")

                    if opcion == "1":
                        crear_usuario()
                    elif opcion == "2":
                        usuario = login()
                        if usuario:
                            menu(usuario)
                    elif opcion == "3":
                        print("Adiós.")
                        break
                    else:
                        print("Opción inválida.")

            if __name__ == "__main__":
                inicio()
        `,
        java: `import java.io.*;
            import java.util.*;
            // este codigo se creo con ayuda de la IA(no todo, pero si una gran parte) pero claro cada parte fue estudiada por mi para comprender todo lo que se creo en esto

            class Paciente {
                String nombre, dni, direccion, telefono;
                int edad;
                HistoriaClinica historia;

                public Paciente(String nombre, String dni, int edad, String direccion, String telefono, String diagnostico, String tratamiento) {
                    this.nombre = nombre;
                    this.dni = dni;
                    this.edad = edad;
                    this.direccion = direccion;
                    this.telefono = telefono;
                    this.historia = new HistoriaClinica(diagnostico, tratamiento);
                }

                public String toFileString() {
                    return nombre + ";" + dni + ";" + edad + ";" + direccion + ";" + telefono + ";" +
                          historia.diagnostico + ";" + historia.tratamiento;
                }

                public void mostrarInfo() {
                    System.out.println("Nombre: " + nombre);
                    System.out.println("DNI: " + dni);
                    System.out.println("Edad: " + edad);
                    System.out.println("Direccion: " + direccion);
                    System.out.println("Telefono: " + telefono);
                    historia.mostrarHistoria();
                }
            }

            class HistoriaClinica {
                String diagnostico, tratamiento;

                public HistoriaClinica(String diagnostico, String tratamiento) {
                    this.diagnostico = diagnostico;
                    this.tratamiento = tratamiento;
                }

                public void registrarHistoria(String diagnostico, String tratamiento) {
                    this.diagnostico = diagnostico;
                    this.tratamiento = tratamiento;
                }

                public void mostrarHistoria() {
                    System.out.println("Diagnóstico: " + diagnostico);
                    System.out.println("Tratamiento: " + tratamiento);
                }
            }

            class Usuario {
                String username, password, rol;

                public Usuario(String username, String password, String rol) {
                    this.username = username;
                    this.password = password;
                    this.rol = rol.toLowerCase();
                }

                public String toFileString() {
                    return username + ";" + password + ";" + rol;
                }
            }

            public class SistemaHospital {
                static ArrayList<Usuario> usuarios = new ArrayList<>();
                static ArrayList<Paciente> pacientes = new ArrayList<>();
                static Scanner sc = new Scanner(System.in);
                static Usuario usuarioActivo = null;
                    // aqui se almacena las credenciales en un texto ya que aun no se aprendio el uso de base de datos 
                static final String ARCHIVO_USUARIOS = "usuarios.txt";
                static final String ARCHIVO_PACIENTES = "pacientes.txt";

                public static void main(String[] args) {
                    cargarUsuarios();
                    cargarPacientes();

                    // Aqui se crea uno por defecto, solo si no hay ninguno registrado (para iniciar con un admin para crear los demas usuarios)
                    if (usuarios.isEmpty()) {
                        usuarios.add(new Usuario("admin", "1234", "administrador"));
                        guardarUsuarios();
                    }

                    while (true) {
                        if (menuInicio()) {
                            menuPrincipal();
                        }
                    }
                }

                // ==== ARCHIVOS ====
                public static void cargarUsuarios() {
                    try (BufferedReader br = new BufferedReader(new FileReader(ARCHIVO_USUARIOS))) {
                        String linea;
                        while ((linea = br.readLine()) != null) {
                            String[] datos = linea.split(";");
                            if (datos.length == 3) {
                                usuarios.add(new Usuario(datos[0], datos[1], datos[2]));
                            }
                        }
                    } catch (IOException e) {
                        System.out.println("No se encontró usuarios.txt, se creará automáticamente.");
                    }
                }

                public static void guardarUsuarios() {
                    try (PrintWriter pw = new PrintWriter(new FileWriter(ARCHIVO_USUARIOS))) {
                        for (Usuario u : usuarios) {
                            pw.println(u.toFileString());
                        }
                    } catch (IOException e) {
                        System.out.println("Error al guardar usuarios.");
                    }
                }

                public static void cargarPacientes() {
                    try (BufferedReader br = new BufferedReader(new FileReader(ARCHIVO_PACIENTES))) {
                        String linea;
                        while ((linea = br.readLine()) != null) {
                            String[] datos = linea.split(";");
                            if (datos.length == 7) {
                                pacientes.add(new Paciente(datos[0], datos[1], Integer.parseInt(datos[2]),
                                        datos[3], datos[4], datos[5], datos[6]));
                            }
                        }
                    } catch (IOException e) {
                        System.out.println("No se encontró pacientes.txt, se creará automáticamente.");
                    }
                }

                public static void guardarPacientes() {
                    try (PrintWriter pw = new PrintWriter(new FileWriter(ARCHIVO_PACIENTES))) {
                        for (Paciente p : pacientes) {
                            pw.println(p.toFileString());
                        }
                    } catch (IOException e) {
                        System.out.println("Error al guardar pacientes.");
                    }
                }

                // ==== SISTEMA ====
                public static boolean menuInicio() {
                    System.out.println("\n=== SISTEMA DE GESTION HOSPITALARIA ===");
                    System.out.println("1. Iniciar Sesión");
                    System.out.println("2. Salir");
                    System.out.print("Seleccione una opción: ");

                    int opcion = sc.nextInt();
                    sc.nextLine();

                    switch (opcion) {
                        case 1:
                            return login();
                        case 2:
                            System.out.println("Saliendo del sistema...");
                            System.exit(0);
                        default:
                            System.out.println("Opción inválida.");
                    }
                    return false;
                }

                public static void registrarUsuario() {
                    System.out.print("Ingrese nombre de usuario: ");
                    String user = sc.nextLine();
                    System.out.print("Ingrese contraseña: ");
                    String pass = sc.nextLine();
                    System.out.print("Rol (administrador/medico/asistente): ");
                    String rol = sc.nextLine();

                    usuarios.add(new Usuario(user, pass, rol));
                    guardarUsuarios();
                    System.out.println(" Usuario registrado con éxito.");
                }

                public static boolean login() {
                    System.out.println("\n=== INICIO DE SESION ===");
                    System.out.print("Usuario: ");
                    String user = sc.nextLine();
                    System.out.print("Contraseña: ");
                    String pass = sc.nextLine();

                    for (Usuario u : usuarios) {
                        if (u.username.equals(user) && u.password.equals(pass)) {
                            usuarioActivo = u;
                            System.out.println("Acceso correcto. Bienvenido " + u.rol.toUpperCase());
                            return true;
                        }
                    }
                    System.out.println(" Credenciales incorrectas. Intente nuevamente.");
                    return false;
                }

                public static void menuPrincipal() {
                    while (true) {
                        System.out.println("\n=== MENU PRINCIPAL (" + usuarioActivo.rol.toUpperCase() + ") ===");
                            // aqui se separa por roles, cada rol tiene un menu diferente
                        if (usuarioActivo.rol.equals("administrador")) {
                            System.out.println("1. Registrar Paciente");
                            System.out.println("2. Consultar Paciente");
                            System.out.println("3. Registrar Historia Clínica");
                            System.out.println("4. Listar Pacientes");
                            System.out.println("5. Registrar Usuario");
                            System.out.println("6. Cerrar Sesión");
                        } else if (usuarioActivo.rol.equals("medico")) {
                            System.out.println("1. Consultar Paciente");
                            System.out.println("2. Registrar Historia Clínica");
                            System.out.println("3. Listar Pacientes");
                            System.out.println("4. Cerrar Sesión");
                        } else if (usuarioActivo.rol.equals("asistente")) {
                            System.out.println("1. Consultar Paciente");
                            System.out.println("2. Listar Pacientes");
                            System.out.println("3. Cerrar Sesión");
                        }

                        System.out.print("Seleccione una opción: ");
                        int opcion = sc.nextInt();
                        sc.nextLine();

                        if (usuarioActivo.rol.equals("administrador")) {
                            switch (opcion) {
                                case 1 -> registrarPaciente();
                                case 2 -> consultarPaciente();
                                case 3 -> registrarHistoria();
                                case 4 -> listarPacientes();
                                case 5 -> registrarUsuario();   
                                case 6 -> { usuarioActivo = null; return; }
                                default -> System.out.println("Opción inválida.");
                            }
                        } else if (usuarioActivo.rol.equals("medico")) {
                            switch (opcion) {
                                case 1 -> consultarPaciente();
                                case 2 -> registrarHistoria();
                                case 3 -> listarPacientes();
                                case 4 -> { usuarioActivo = null; return; }
                                default -> System.out.println("Opción inválida.");
                            }
                        } else if (usuarioActivo.rol.equals("asistente")) {
                            switch (opcion) {
                                case 1 -> consultarPaciente();
                                case 2 -> listarPacientes();
                                case 3 -> { usuarioActivo = null; return; }
                                default -> System.out.println("Opción inválida.");
                            }
                        }
                    }
                }

                public static void registrarPaciente() {
                    System.out.print("Nombre: ");
                    String nombre = sc.nextLine();
                    System.out.print("DNI: ");
                    String dni = sc.nextLine();
                    System.out.print("Edad: ");
                    int edad = sc.nextInt();
                    sc.nextLine();
                    System.out.print("Direccion: ");
                    String direccion = sc.nextLine();
                    System.out.print("Telefono: ");
                    String telefono = sc.nextLine();

                    Paciente p = new Paciente(nombre, dni, edad, direccion, telefono, "No registrado", "No registrado");
                    pacientes.add(p);
                    guardarPacientes();
                    System.out.println(" Paciente registrado con éxito.");
                }

                public static void consultarPaciente() {
                    System.out.print("Ingrese DNI del paciente: ");
                    String dni = sc.nextLine();
                    for (Paciente p : pacientes) {
                        if (p.dni.equals(dni)) {
                            p.mostrarInfo();
                            return;
                        }
                    }
                    System.out.println(" Paciente no encontrado.");
                }

                public static void registrarHistoria() {
                    System.out.print("Ingrese DNI del paciente: ");
                    String dni = sc.nextLine();
                    for (Paciente p : pacientes) {
                        if (p.dni.equals(dni)) {
                            System.out.print("Diagnóstico: ");
                            String diag = sc.nextLine();
                            System.out.print("Tratamiento: ");
                            String trat = sc.nextLine();
                            p.historia.registrarHistoria(diag, trat);
                            guardarPacientes();
                            System.out.println(" Historia clínica actualizada.");
                            return;
                        }
                    }
                    System.out.println(" Paciente no encontrado.");
                }

                public static void listarPacientes() {
                    if (pacientes.isEmpty()) {
                        System.out.println(" No hay pacientes registrados.");
                    } else {
                        for (Paciente p : pacientes) {
                            System.out.println("Paciente: " + p.nombre + " | DNI: " + p.dni);
                        }
                    }
                }
            }`,
        htmlcss: `<!DOCTYPE html>
    <html lang="es">

    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>Tu Nombre — Portafolio</title>
      <link href="https://fonts.googleapis.com/css2?family=Bad+Script&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="css/style.css">
      <meta name="description" content="Portafolio — Curriculum Vitae de [Tu Nombre]">
    </head>

    <body>
      <div class="page-box">
          <!-- NAVBAR -->
      <nav class="navbar" aria-label="Barra de navegación principal">
      <div class="nav-inner">
        <a class="logo" href="index.html">MiPortafolio</a>

        <button id="menu-toggle" class="menu-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="Abrir menú">
          <span class="hamburger" aria-hidden="true"></span>
        </button>

        <ul id="nav-links" class="nav-links" role="menu">
          <li role="none"><a role="menuitem" href="index.html" class="nav-link">Inicio</a></li>
          <li role="none"><a role="menuitem" href="pages/Proyectos.html" class="nav-link">Proyectos</a></li>
          <li role="none"><a role="menuitem" href="pages/contactos.html" class="nav-link">Contacto</a></li>
        </ul>
      </div>
    </nav>
      <main class="container cv-container">
        <aside class="cv-left">

          <img src="img/x.png" alt="Foto de perfil" class="profile-pic">


          <div class="contact-card">
            <h3>Carlos Roque</h3>
            <p class="role">Desarrollador Full Stack</p>
            <p><strong>Email:</strong> jr2697949@gmail.com</p>
            <p><strong>Ubicación:</strong> Lima, Peru</p>
            <p><strong>Telefono:</strong> +51 952835281</p>
            <a class="btn" href="doc/cv.pdf" download>Descargar CV (PDF)</a>
          </div>

          <section class="side-section">
            <h4>Habilidades</h4>
            <ul class="skills-list">
              <li>Python</li>
              <li>Java</li>
              <li>HTML & CSS</li>
              <li>JavaScript</li>
              <li>Firebase</li>
              <li>Git/GitHub</li>
            </ul>
          </section>

        
          <!-- Certificados  -->
          <section class="certificados">
            <h2>Certificados</h2>
            <div class="cert-grid">

              <div class="cert-card">
                <div class="cert-card-inner">
                  <div class="cert-back">
                    <img src="img/q.jpeg" alt="Certificado 1">
                  </div>
                  <div class="cert-front">
                    <p>Descripción del certificado 1</p>
                  </div>
                </div>
              </div>

              <div class="cert-card">
                <div class="cert-card-inner">
                  <div class="cert-back">
                    <img src="img/w.jpeg" alt="Certificado 2">
                  </div>
                  <div class="cert-front">
                    <p>Descripción del certificado 2</p>
                  </div>
                </div>
              </div>
              <div class="cert-card">
                <div class="cert-card-inner">
                  <div class="cert-back">
                    <img src="img/q.jpeg" alt="Certificado 3">
                  </div>
                  <div class="cert-front">
                    <p>Descripción del certificado 1</p>
                  </div>
                </div>
              </div>

              <div class="cert-card">
                <div class="cert-card-inner">
                  <div class="cert-back">
                    <img src="img/w.jpeg" alt="Certificado 4">
                  </div>
                  <div class="cert-front">
                    <p>Descripción del certificado 2</p>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </aside>

        <section class="cv-right">
          <header class="hero">
            <h1>Jose Carlos Roque Mamanin</h1>
            <h2>Desarrollador Full Stack</h2>
            <p class="lead">Profesional proactivo y adaptable, orientado a resultados y con compromiso en aportar soluciones
              efectivas en cada proyecto.</p>
          </header>

          <!-- SOBRE MÍ -->
          <section id="sobre-mi" class="content-section">
            <h3>Sobre mí</h3>
            <p>
              Soy una persona responsable, proactiva y con facilidad para el trabajo en equipo. Tengo interés en el
              aprendizaje continuo y me adapto rápidamente a nuevos entornos. Me destaco por mi compromiso, organización y
              disposición para aportar soluciones efectivas en las tareas que se me asignan.
            </p>
          </section>
          <!-- EDUCACIÓN -->
          <section id="educacion" class="content-section">
            <h3>Educación Superior</h3>
            <p class="small">Ingenieria de Software — SENATI — 202x</p>
          </section>
          <!-- Sección Habilidades ====-->
          <div class="herramientas">
            <h2>HABILIDADES</h2>
            <div class="herramienta">
              <p>Trabajo en equipo y colaboración</p>
              <div class="barra">
                <div class="progreso" style="width: 85%;"></div>
              </div>
            </div>
            <div class="herramienta">
              <p>Responsabilidad y compromiso</p>
              <div class="barra">
                <div class="progreso" style="width: 75%;"></div>
              </div>
            </div>
            <div class="herramienta">
              <p>Adaptabilidad y aprendizaje rápido</p>
              <div class="barra">
                <div class="progreso" style="width: 95%;"></div>
              </div>
            </div>
            <div class="herramienta">
              <p>Comunicación efectiva</p>
              <div class="barra">
                <div class="progreso" style="width: 70%;"></div>
              </div>
            </div>
          </div>

          <!-- Sección Idiomas -->
          <div class="idiomas">
            <h2>IDIOMAS</h2>
            <ul>
              <li>Español <span>Nativo</span></li>
              <li>Inglés <span>Nivel Medio</span></li>
              <li>Alemán <span>Nivel Bajo</span></li>
            </ul>
          </div>

          <!-- EXPERIENCIA -->
          <section id="experiencia" class="content-section">
            <h3>Experiencia</h3>
            <div class="exp-item">
              <h4></h4>
              <p class="small"></p>
              <p>No cuento con experiencia previa, pero tengo una gran disposici6n para aprender y desarrollarme en el area laboral. </p>
            </div>
          <!--Añade más bloques de experiencia solo si se consigue algo :(--> 
          </section>


        </section>
      </main>

      <footer class="site-footer">
        <p>&copy; 2025 — Carlos Roque</p>
        <p>Sígueme: <a href="#">GitHub</a> · <a href="#">LinkedIn</a></p>
      </footer>

      <!--modal-->
        <div id="imgModal" class="modal">
          <span class="cerrar">&times;</span>
          <img class="modal-contenedor" id="modalImg">
        </div>
      
      </div>
    <script src="js/main.js"></script>
    </body>

      
    </html>`,
    js: `document.addEventListener("DOMContentLoaded",() => {
    //alamcenamiento los id a trbaajar dentro de sus variables modal - modalImg
    const modal= document.getElementById("imgModal");
    const modalImg= document.getElementById("modalImg");
    const cerrar= document.querySelector(".cerrar");

    const imagenes=document.querySelectorAll(".flip-card-back img");
    
    imagenes.forEach(img =>{
        img.addEventListener("click", () => {
            modal.style.display= "flex";
            modalImg.src= img.src;
        });

    });

    cerrar.addEventListener("click", () => {

        modal.style.display= "none";
    });

    modal.addEventListener("click",(e) => {

        if(e.target === modal){
            modal.style.display = "none";
        }
    });
});






let nombres="Carlos Roque";
let datos=["Carlos Roque","Senati", "estudiante"];
console.log(nombres);
console.log(datos[2]);

 esto es un comentario    
let edad =prompt("ingrese su edad")
console.log(edad);


 trabajando con finciones 

function mostrarMensaje(){
    alert("Hola mundo");
}

function sumar(){
    let n1= parseInt(prompt("Ingrese tu primer numero"));
    let n2= parseInt(prompt("Ingrese tu segundo numero"));
    alert("EL resultado es: " +(n1 + n2));
}
function cambiarColor(){
    let texto= document.getElementById("texto");
    texto.style.color= "blue";
}
`
  };

  skills.forEach(skill => {
    skill.addEventListener("click", () => {
      const skillType = skill.dataset.skill;
      const githubLink = skill.dataset.github;

      modalTitle.textContent = `Proyecto en ${skillType.toUpperCase()}`;
      modalCode.textContent = codeSamples[skillType] || "Ejemplo no disponible";
      modalGithub.href = githubLink;

      modal.style.display = "flex";
    });
  });

  closeBtn.addEventListener("click", () => modal.style.display = "none");
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") modal.style.display = "none";
  });
});


