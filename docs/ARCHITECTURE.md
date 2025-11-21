# VITAL - Arquitectura Técnica

## Visión General

VITAL es una Single Page Application (SPA) construida con tecnologías web modernas pero manteniendo simplicidad y rendimiento. La arquitectura se basa en Web Components nativos y JavaScript vanilla, evitando el overhead de frameworks pesados.

## Decisiones de Arquitectura

### ¿Por qué JavaScript Vanilla?

1. **Rendimiento**: Sin overhead de frameworks
2. **Simplicidad**: Código directo y fácil de entender
3. **Tamaño**: Build final más pequeño (~50KB vs >500KB de frameworks)
4. **Control**: Control total sobre el código
5. **Escalabilidad**: Fácil migrar a framework si es necesario

### ¿Por qué Web Components?

1. **Estándar Web**: No depende de librerías externas
2. **Encapsulación**: Shadow DOM aísla estilos
3. **Reutilización**: Componentes verdaderamente reutilizables
4. **Interoperabilidad**: Compatible con cualquier framework
5. **Futuro-proof**: Estándar que continuará evolucionando

## Capas de la Aplicación

```
┌─────────────────────────────────────────┐
│         PRESENTATION LAYER              │
│   (Views: home, dashboard, etc.)        │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│        COMPONENT LAYER                  │
│   (Web Components: cards, buttons)      │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│        APPLICATION LAYER                │
│   (Router, State Management)            │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         DATA LAYER                      │
│   (Services, LocalStorage)              │
└─────────────────────────────────────────┘
```

## Patrón de Componentes

### Web Components Anatomy

```javascript
class MyComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>/* Estilos encapsulados */</style>
      <div><!-- HTML del componente --></div>
    `;
  }
}

customElements.define('my-component', MyComponent);
```

### Ciclo de Vida

1. `constructor()`: Inicialización
2. `connectedCallback()`: Cuando se agrega al DOM
3. `disconnectedCallback()`: Cuando se remueve del DOM
4. `attributeChangedCallback()`: Cuando cambian atributos

## Sistema de Routing

### Hash-based Navigation

```javascript
// URL: http://localhost:5173/#/dashboard
window.location.hash // "/dashboard"
```

**Ventajas:**
- No requiere configuración de servidor
- Compatible con todos los servidores estáticos
- Navegación del navegador funciona (back/forward)
- No necesita recarga de página

**Flujo:**
1. Usuario hace clic en link
2. Hash cambia → dispara evento `hashchange`
3. Router encuentra handler para la ruta
4. Handler renderiza vista
5. Vista se inyecta en `#main-content`

## Gestión de Estado

### Patrón Observer (Pub/Sub)

```javascript
// Suscribirse a cambios
state.subscribe((key, value, fullState) => {
  console.log(`${key} changed to:`, value);
});

// Actualizar estado
state.set('user.name', 'Juan');

// Todos los suscriptores son notificados
```

### Persistencia

- **LocalStorage**: Para datos del usuario
- **Auto-save**: Cada cambio se persiste automáticamente
- **Hydration**: Estado se carga al iniciar la app

## Flujo de Datos

```
┌─────────────┐
│    USER     │
│   INTERACTION│
└──────┬──────┘
       │
       ↓
┌─────────────┐
│   EVENT     │
│   HANDLER   │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│   STATE     │
│   UPDATE    │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│  SUBSCRIBERS│
│  NOTIFIED   │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│    UI       │
│  RE-RENDER  │
└─────────────┘
```

## Organización de Archivos

### Convenciones

- **Componentes**: `kebab-case.js` (ej: `app-navbar.js`)
- **Vistas**: `kebab-case-view.js` (ej: `home-view.js`)
- **Utilidades**: `camelCase.js` (ej: `helpers.js`)
- **Constantes**: `SCREAMING_SNAKE_CASE` dentro de archivos

### Imports/Exports

```javascript
// Named exports para múltiples funciones
export function formatDate() { }
export function formatNumber() { }

// Default export para componentes principales
export default class Router { }

// Singleton pattern para servicios
export const router = new Router();
```

## Estrategia de Estilos

### Niveles de Abstracción

1. **Variables CSS** (`variables.css`): Tokens de diseño
2. **Global** (`global.css`): Reset, tipografía, layout
3. **Components** (`components.css`): Estilos compartidos
4. **Shadow DOM**: Estilos específicos de componentes
5. **Inline**: Estilos dinámicos en vistas

### Cascade

```
Variables → Global → Components → Shadow DOM → Inline
```

## Optimizaciones

### Performance

- **Lazy Loading**: Vistas se cargan bajo demanda
- **Event Delegation**: Menos listeners
- **CSS Animations**: GPU-aceleradas
- **Minimal Reflows**: Batch DOM updates

### Bundle Size

- **No Dependencies**: Solo Vite como dev dependency
- **Tree-shaking**: Vite elimina código no usado
- **Minification**: Producción optimizada

## Seguridad

### Consideraciones

- **Sin eval()**: No ejecución de código dinámico
- **XSS Prevention**: Templates escapan HTML
- **CSP Ready**: Compatible con Content Security Policy
- **LocalStorage**: Solo datos no sensibles

## Testing Strategy

### Recomendado para v2.0

```javascript
// Unit Tests
- Vitest/Jest para funciones utilitarias
- Componentes aislados

// Integration Tests
- Testing Library para componentes
- Flujos de usuario

// E2E Tests
- Playwright/Cypress para flujos completos
```

## Deployment

### Build

```bash
npm run build
# Output: dist/
# - index.html
# - assets/
#   - [hash].js
#   - [hash].css
```

### Hosting

Compatible con:
- **Netlify**: Deploy automático
- **Vercel**: Zero-config
- **GitHub Pages**: Gratis y simple
- **Any static host**: Nginx, Apache, etc.

### Configuración de Servidor

No se requiere configuración especial ya que usa hash routing.

## Extensibilidad

### Agregar Nuevo Componente

1. Crear `src/components/new-component.js`
2. Definir clase que extiende `HTMLElement`
3. Registrar con `customElements.define()`
4. Importar en `main.js`
5. Usar en vistas: `<new-component></new-component>`

### Agregar Nueva Vista

1. Crear `src/views/new-view.js`
2. Exportar función que retorna HTML string
3. Registrar ruta en `main.js`: `router.register('/new', renderNewView)`
4. Agregar link en navegación

### Conectar con Backend

Ver [FUTURE_ENHANCEMENTS.md](./FUTURE_ENHANCEMENTS.md) para:
- API integration
- Authentication
- Real-time updates

## Diagramas

### Component Hierarchy

```
app (#app)
  ├── app-navbar
  └── main#main-content
      └── [current-view]
          ├── app-card
          │   ├── health-indicator
          │   └── app-button
          ├── alert-card
          └── simple-chart
```

### State Flow

```
User Action → Event → State.set() 
  → Notify Subscribers → Update UI
  → Persist to LocalStorage
```

## Conclusiones

Esta arquitectura proporciona:

✅ **Simplicidad**: Fácil de entender y mantener
✅ **Performance**: Rápido y ligero
✅ **Escalabilidad**: Fácil de extender
✅ **Modernidad**: Usa estándares web actuales
✅ **Flexibilidad**: Migrable a frameworks si es necesario
