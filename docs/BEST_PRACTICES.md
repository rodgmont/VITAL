# VITAL - Guía de Buenas Prácticas

Esta guía establece las convenciones y mejores prácticas para desarrollar y mantener el proyecto VITAL.

## 📋 Índice

- [Código](#código)
- [Estilo y Formato](#estilo-y-formato)
- [Componentes](#componentes)
- [Vistas](#vistas)
- [Estado y Datos](#estado-y-datos)
- [Performance](#performance)
- [Accesibilidad](#accesibilidad)
- [Seguridad](#seguridad)
- [Git y Colaboración](#git-y-colaboración)

---

## Código

### Principios Generales

✅ **DO:**
- Escribir código autodocumentado con nombres descriptivos
- Mantener funciones pequeñas y enfocadas (< 50 líneas)
- Usar const por defecto, let cuando sea necesario, evitar var
- Comentar el "por qué", no el "qué"
- Seguir el principio DRY (Don't Repeat Yourself)

❌ **DON'T:**
- No usar variables globales innecesarias
- No mezclar lógica de negocio con presentación
- No hardcodear valores (usar constantes)
- No ignorar errores silenciosamente

### Naming Conventions

```javascript
// Variables y funciones: camelCase
const userName = 'Juan';
function calculateBMI() { }

// Constantes: SCREAMING_SNAKE_CASE
const MAX_RETRIES = 3;
const API_BASE_URL = '/api/v1';

// Clases y Componentes: PascalCase
class HealthIndicator extends HTMLElement { }

// Archivos de componentes: kebab-case
// app-navbar.js
// health-indicator.js

// Archivos de vistas: kebab-case-view.js
// home-view.js
// dashboard-view.js

// Booleanos: usar prefijos is/has/can
const isValid = true;
const hasError = false;
const canEdit = true;
```

### Estructura de Archivos

```javascript
/**
 * Comentario de archivo
 * Describe propósito del módulo
 */

// 1. Imports
import { router } from './router.js';
import { formatDate } from './utils/helpers.js';

// 2. Constantes
const DEFAULT_TIMEOUT = 3000;

// 3. Funciones utilitarias privadas
function privateHelper() { }

// 4. Función/Clase principal
export function mainFunction() { }

// 5. Exports
export { router };
```

---

## Estilo y Formato

### JavaScript

```javascript
// ✅ BUENO
function calculateBMI(weight, height) {
  if (!weight || !height) {
    console.error('Invalid parameters');
    return null;
  }
  
  const heightInMeters = height / 100;
  return (weight / (heightInMeters ** 2)).toFixed(1);
}

// ❌ MALO
function calculateBMI(w,h){if(!w||!h)return null;return(w/((h/100)**2)).toFixed(1)}
```

### CSS

```css
/* ✅ BUENO - Organizado y comentado */
.component {
  /* Layout */
  display: flex;
  flex-direction: column;
  
  /* Size */
  width: 100%;
  padding: 1rem;
  
  /* Visual */
  background: white;
  border-radius: 0.5rem;
  
  /* Animation */
  transition: all 0.3s ease;
}

/* ❌ MALO - Desordenado */
.component{background:white;padding:1rem;display:flex;transition:all 0.3s ease;width:100%;border-radius:0.5rem;flex-direction:column;}
```

### Orden de Propiedades CSS

1. Layout (display, position, flex, grid)
2. Size (width, height, padding, margin)
3. Typography (font, text-align, line-height)
4. Visual (color, background, border, shadow)
5. Animation (transition, transform, animation)

---

## Componentes

### Estructura de Web Component

```javascript
/**
 * ComponentName - Descripción breve
 * 
 * @example
 * <component-name attr="value">Content</component-name>
 */
class ComponentName extends HTMLElement {
  // 1. Constructor
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // Inicialización
  }

  // 2. Getters y Setters
  static get observedAttributes() {
    return ['attr1', 'attr2'];
  }

  get attr1() {
    return this.getAttribute('attr1');
  }

  // 3. Lifecycle callbacks
  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  // 4. Event handlers
  attachEventListeners() { }
  removeEventListeners() { }

  // 5. Métodos privados
  privateMethod() { }

  // 6. Render
  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.styles()}</style>
      ${this.template()}
    `;
  }

  // 7. Template y Styles
  template() {
    return `<div>Template HTML</div>`;
  }

  styles() {
    return `/* CSS */`;
  }
}

// 8. Registro
customElements.define('component-name', ComponentName);
```

### Best Practices para Componentes

✅ **DO:**
- Usar Shadow DOM para encapsulación
- Documentar atributos y slots
- Limpiar event listeners en `disconnectedCallback`
- Usar `observedAttributes` para reactividad
- Proporcionar valores por defecto

❌ **DON'T:**
- No modificar atributos desde dentro del componente
- No usar querySelector fuera del shadow root
- No crear side effects en el constructor
- No olvidar cleanup de recursos

---

## Vistas

### Estructura de Vista

```javascript
/**
 * ViewName - Descripción
 * 
 * Vista para mostrar/hacer X
 */
export function renderViewName() {
  return `
    <div class="view-name">
      ${renderHeader()}
      ${renderContent()}
      ${renderFooter()}
    </div>

    <style>
      /* Estilos específicos de la vista */
    </style>
  `;
}

// Funciones helper privadas
function renderHeader() {
  return `<header>...</header>`;
}

function renderContent() {
  return `<main>...</main>`;
}

function renderFooter() {
  return `<footer>...</footer>`;
}
```

### Best Practices para Vistas

✅ **DO:**
- Dividir en funciones helper pequeñas
- Usar template literals para HTML
- Incluir estilos scoped en la vista
- Hacer vistas responsive
- Usar componentes reutilizables

❌ **DON'T:**
- No poner lógica de negocio en vistas
- No acceder directamente a localStorage
- No hardcodear datos (usar state)
- No crear inline styles excesivos

---

## Estado y Datos

### Gestión de Estado

```javascript
// ✅ BUENO - Usar el sistema de estado
import { state } from './store/state.js';

function updateUserName(name) {
  state.set('user.name', name);
}

function getUserName() {
  return state.get('user.name');
}

// Suscribirse a cambios
state.subscribe((key, value) => {
  if (key === 'user.name') {
    updateUI(value);
  }
});

// ❌ MALO - Modificar directamente
let globalUser = {};
function updateUserName(name) {
  globalUser.name = name;
}
```

### Datos Mock

```javascript
// ✅ BUENO - Datos organizados
const MOCK_HEALTH_DATA = {
  bloodPressure: {
    systolic: 120,
    diastolic: 80,
    timestamp: '2025-11-20T10:00:00'
  },
  heartRate: 72,
  // ...
};

// ❌ MALO - Datos dispersos
const bp_sys = 120;
const bp_dia = 80;
const hr = 72;
```

---

## Performance

### Optimizaciones

```javascript
// ✅ BUENO - Debounce para input
import { debounce } from './utils/helpers.js';

const handleSearch = debounce((query) => {
  performSearch(query);
}, 300);

input.addEventListener('input', (e) => {
  handleSearch(e.target.value);
});

// ✅ BUENO - Event delegation
document.getElementById('list').addEventListener('click', (e) => {
  if (e.target.matches('.item-button')) {
    handleItemClick(e.target);
  }
});

// ❌ MALO - Listener en cada elemento
items.forEach(item => {
  item.addEventListener('click', handleClick);
});
```

### Lazy Loading

```javascript
// ✅ BUENO - Cargar componentes bajo demanda
async function loadHeavyComponent() {
  const module = await import('./components/heavy-component.js');
  return module.HeavyComponent;
}
```

---

## Accesibilidad

### Checklist

- [ ] Todos los elementos interactivos son accesibles por teclado
- [ ] Contraste de colores cumple WCAG AA (4.5:1)
- [ ] Imágenes tienen atributo `alt` descriptivo
- [ ] Formularios tienen `label` asociados
- [ ] Focus visible en todos los elementos
- [ ] HTML semántico (header, nav, main, footer)
- [ ] ARIA labels donde sea necesario

```html
<!-- ✅ BUENO -->
<button aria-label="Cerrar modal" class="close-button">
  <span aria-hidden="true">×</span>
</button>

<img src="chart.png" alt="Gráfico de presión arterial mostrando tendencia al alza">

<!-- ❌ MALO -->
<div onclick="close()">×</div>
<img src="chart.png">
```

---

## Seguridad

### Validación

```javascript
// ✅ BUENO - Validar entrada
function sanitizeInput(input) {
  return input.trim().replace(/[<>]/g, '');
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// ❌ MALO - Confiar en entrada del usuario
function saveData(data) {
  localStorage.setItem('data', data); // Sin validar
}
```

### No Exponer Datos Sensibles

```javascript
// ✅ BUENO
const config = {
  apiUrl: process.env.API_URL
};

// ❌ MALO
const API_KEY = 'sk_live_abc123xyz'; // Hardcoded
```

---

## Git y Colaboración

### Commits

```bash
# ✅ BUENO - Commits descriptivos
git commit -m "feat: add blood pressure indicator component"
git commit -m "fix: resolve chart rendering issue on mobile"
git commit -m "docs: update README with installation steps"

# ❌ MALO
git commit -m "changes"
git commit -m "fix"
git commit -m "asdf"
```

### Convención de Commits

```
<type>(<scope>): <subject>

Types:
- feat: Nueva funcionalidad
- fix: Bug fix
- docs: Documentación
- style: Formato (no afecta código)
- refactor: Refactorización
- test: Tests
- chore: Mantenimiento
```

### Branching

```
main
  ├── develop
  │   ├── feature/user-profile
  │   ├── feature/alerts-system
  │   └── bugfix/chart-responsive
  └── hotfix/critical-security-fix
```

---

## Testing (Futuro)

### Estructura de Test

```javascript
// component.test.js
import { describe, it, expect } from 'vitest';
import './app-button.js';

describe('AppButton', () => {
  it('should render correctly', () => {
    const button = document.createElement('app-button');
    document.body.appendChild(button);
    
    expect(button.shadowRoot.querySelector('button')).toBeTruthy();
  });

  it('should emit click event', () => {
    const button = document.createElement('app-button');
    let clicked = false;
    
    button.addEventListener('click', () => clicked = true);
    button.click();
    
    expect(clicked).toBe(true);
  });
});
```

---

## Recursos

- [MDN Web Docs](https://developer.mozilla.org/)
- [Web Components Best Practices](https://web.dev/custom-elements-best-practices/)
- [JavaScript Clean Code](https://github.com/ryanmcdermott/clean-code-javascript)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Recuerda**: La consistencia es clave. Sigue estas prácticas y el código será más mantenible y escalable.
