# 🏥 App Clínica - Gestión de Turnos

Aplicación web para la gestión de una clínica.  
Permite el acceso con diferentes roles (Administrador, Médico, Paciente) y muestra contenido según el tipo de usuario.  

[Repositorio del equipo 32 en GitHub](https://github.com/conrado85/equipo-32.git)

[Repositorio del equipo 32 en GitHub  Proyects](https://github.com/users/conrado85/projects/8)


---

## 🚀 Tecnologías utilizadas
- [React](https://react.dev/) + [Vite](https://vitejs.dev/) ⚡
- [React Router DOM](https://reactrouter.com/) → Rutas públicas, privadas y con roles.
- [TailwindCSS](https://tailwindcss.com/) → Estilos rápidos y modernos.
- [DaisyUI](https://daisyui.com/) → Componentes predefinidos sobre TailwindCSS.
- Context API → Manejo de autenticación y roles.

---

## 📂 Funcionalidades principales
- **Rutas públicas**: Inicio, Login, Registro.  
- **Rutas privadas**: protegidas por autenticación.  
- **Roles de usuario**:
  - 🛠 Admin → Dashboard, Usuarios, Reportes.  
  - 👨‍⚕️ Médico → Turnos, Pacientes.  
  - 👩‍🦰 Paciente → Mis Turnos.  

---

## ⚙️ Instalación y ejecución

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/conrado85/equipo-32.git
   cd equipo-32



---

````markdown
# 🧠 Buenas Prácticas de Commits y Pull Requests

Este repositorio define las **buenas prácticas para escribir commits y realizar Pull Requests hacia `develop`**.  
La idea es mantener un historial limpio, comprensible y fácil de mantener 🚀.

---

## 🧩 Guía para Commits

Usamos una convención basada en **Conventional Commits**, lo que facilita la automatización de changelogs, versiones semánticas y revisiones.

### 📜 Estructura del commit

```bash
<tipo>(<alcance opcional>): <descripción breve>

<mensaje opcional más largo>
````

### 💡 Ejemplo

```bash
feat(auth): agrega autenticación con JWT
```

### 🧱 Tipos de commit

| Tipo         | Descripción                                                                                     |
| ------------ | ----------------------------------------------------------------------------------------------- |
| **feat**     | Una nueva característica para el usuario.                                                       |
| **fix**      | Arregla un bug que afecta al usuario.                                                           |
| **perf**     | Cambios que mejoran el rendimiento del sitio.                                                   |
| **build**    | Cambios en el sistema de build, tareas de despliegue o instalación.                             |
| **ci**       | Cambios en la integración continua.                                                             |
| **docs**     | Cambios en la documentación.                                                                    |
| **refactor** | Refactorización del código (renombrar variables, funciones, etc.) sin alterar la funcionalidad. |
| **style**    | Cambios de formato (espacios, tabulaciones, puntos y coma) sin afectar el código ejecutable.    |
| **test**     | Añade o refactoriza tests existentes.                                                           |

### ⚡ Consejos rápidos

* Usa **presente imperativo**: “agrega”, “corrige”, “actualiza” — no “agregado” o “corrigiendo”.
* La **descripción debe ser clara y concisa** (máximo 72 caracteres).
* Evitá commits genéricos como `update code` o `minor fixes`.
* Un commit = una idea o cambio lógico.
* Si necesitás detallar algo, agregalo en el cuerpo del mensaje del commit.

---

## 🔄 Guía para Pull Requests (PR) → `develop`

Queremos que cada PR sea **legible, revisable y fácil de integrar**.

### 📋 Checklist antes de abrir un PR

* [ ] El código compila correctamente.
* [ ] Pasan todos los tests locales.
* [ ] Se siguieron las convenciones de commits.
* [ ] No hay `console.log` innecesarios.
* [ ] Se actualizó la documentación si aplica.

### 🧱 Estructura sugerida del PR

**Título:**

> Debe reflejar el cambio principal.
> Ejemplo: `feat(user): agrega endpoint para registro de usuario`

**Descripción:**

```markdown
### 🧩 Qué hace este PR
Describe brevemente qué cambios introduce.

### 🧪 Cómo probarlo
Instrucciones para probar los cambios localmente.

### 📚 Notas adicionales
Detalles relevantes para el reviewer, dependencias o decisiones técnicas.
```

### ⚖️ Buenas prácticas

* Siempre apunta la rama del PR a **`develop`** (no a `main` directamente).
* Evitá PRs demasiado grandes; si el cambio es grande, dividilo en partes.
* Agregá reviewers relevantes desde el inicio.
* Respondé a los comentarios con respeto y contexto — el objetivo es mejorar el código, no competir 😄.

---

## 🧭 Flujo de trabajo recomendado

1. Crear una rama desde `develop`:

   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feat/login-form
   ```
2. Realizar los cambios y commits siguiendo la convención.
3. Subir la rama y abrir un PR hacia `develop`.
4. Esperar revisión, aplicar sugerencias si es necesario y mergear una vez aprobado.

---

## 🌟 Bonus tip

Usar commits y PRs bien estructurados no es solo formalidad:

> Es **documentación viva del proyecto** y una herramienta poderosa para la colaboración y el mantenimiento futuro.

Tu yo del futuro (y tu equipo) te lo van a agradecer 🫶

---

## 🧰 Recursos útiles

* [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/)
* [Git Docs – Cómo escribir buenos mensajes de commit](https://git-scm.com/book/es/v2/Git-Essentials-Recording-Changes-to-the-Repository)

---

> *"Un buen commit cuenta una historia; un buen PR la completa."* ✨
