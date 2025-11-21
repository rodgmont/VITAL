# VITAL - Documentación de Componentes

## Índice

- [app-navbar](#app-navbar)
- [app-card](#app-card)
- [app-button](#app-button)
- [health-indicator](#health-indicator)
- [alert-card](#alert-card)
- [simple-chart](#simple-chart)

---

## app-navbar

Componente de navegación principal con menú responsive.

### Uso

```html
<app-navbar></app-navbar>
```

### Características

- ✅ Navegación sticky (siempre visible)
- ✅ Glassmorphism effect
- ✅ Menu hamburger responsive
- ✅ Active link highlighting
- ✅ Smooth animations

### Estilos

El componente usa Shadow DOM, los estilos están encapsulados.

---

## app-card

Tarjeta reutilizable con múltiples variantes.

### Uso Básico

```html
<app-card>
  Contenido de la tarjeta
</app-card>
```

### Con Slots

```html
<app-card hoverable>
  <div slot="header">Título</div>
  <p>Contenido principal</p>
  <div slot="footer">Pie de tarjeta</div>
</app-card>
```

### Atributos

| Atributo | Tipo | Valores | Default | Descripción |
|----------|------|---------|---------|-------------|
| `variant` | String | `default`, `primary`, `secondary`, `glass` | `default` | Estilo visual |
| `hoverable` | Boolean | - | `false` | Efecto hover elevado |

### Ejemplos

```html
<!-- Card con variante primary -->
<app-card variant="primary">
  Contenido con fondo suave
</app-card>

<!-- Card con efecto glass -->
<app-card variant="glass" hoverable>
  Glassmorphism con hover
</app-card>
```

---

## app-button

Botón customizado con variantes y estados.

### Uso Básico

```html
<app-button>Click Me</app-button>
```

### Atributos

| Atributo | Tipo | Valores | Default | Descripción |
|----------|------|---------|---------|-------------|
| `variant` | String | `primary`, `secondary`, `outline`, `ghost` | `primary` | Estilo visual |
| `size` | String | `sm`, `md`, `lg` | `md` | Tamaño del botón |
| `disabled` | Boolean | - | `false` | Deshabilita el botón |
| `loading` | Boolean | - | `false` | Muestra spinner |

### Ejemplos

```html
<!-- Botón primario grande -->
<app-button variant="primary" size="lg">
  Registrarse
</app-button>

<!-- Botón outline pequeño -->
<app-button variant="outline" size="sm">
  Cancelar
</app-button>

<!-- Botón en loading -->
<app-button loading>
  Guardando...
</app-button>
```

### Características

- ✅ Ripple effect en click
- ✅ Estados disabled y loading
- ✅ Animaciones suaves
- ✅ Sombras elevadas

---

## health-indicator

Indicador visual para métricas de salud.

### Uso

```html
<health-indicator 
  label="Presión Arterial"
  value="120"
  max="140"
  unit="mmHg"
  status="good">
</health-indicator>
```

### Atributos

| Atributo | Tipo | Descripción |
|----------|------|-------------|
| `label` | String | Nombre del indicador |
| `value` | Number | Valor actual |
| `max` | Number | Valor máximo (para barra) |
| `unit` | String | Unidad de medida |
| `status` | String | `good`, `warning`, `critical`, `normal` |

### Status Colors

- `good`: Verde (#4A9B6B)
- `warning`: Amarillo (#F59E0B)
- `critical`: Rojo (#EF4444)
- `normal`: Turquesa (#1AB8B8)

### Características

- ✅ Barra de progreso animada
- ✅ Badge de status
- ✅ Colores según estado
- ✅ Responsive

---

## alert-card

Tarjeta para mostrar alertas y notificaciones.

### Uso

```html
<alert-card 
  severity="warning"
  title="Incremento en Presión"
  timestamp="2025-11-20T18:30:00">
  Descripción de la alerta
</alert-card>
```

### Atributos

| Atributo | Tipo | Valores | Default | Descripción |
|----------|------|---------|---------|-------------|
| `severity` | String | `info`, `warning`, `critical` | `info` | Nivel de severidad |
| `title` | String | - | `'Alerta'` | Título de la alerta |
| `timestamp` | String (ISO) | - | `new Date()` | Fecha/hora |

### Severity Configs

```javascript
{
  info: { color: '#3B82F6', icon: 'ℹ️' },
  warning: { color: '#F59E0B', icon: '⚠️' },
  critical: { color: '#EF4444', icon: '🚨' }
}
```

### Características

- ✅ Formato automático de fecha
- ✅ Iconos según severidad
- ✅ Badge de status
- ✅ Hover animation

---

## simple-chart

Gráfico SVG simple para tendencias.

### Uso

```html
<simple-chart 
  data='[115, 118, 120, 119, 121, 120, 122]'
  width="600"
  height="200"
  color="#1AB8B8">
</simple-chart>
```

### Atributos

| Atributo | Tipo | Default | Descripción |
|----------|------|---------|-------------|
| `data` | Array (JSON string) | `[]` | Puntos de datos |
| `width` | Number | `300` | Ancho en píxeles |
| `height` | Number | `150` | Alto en píxeles |
| `color` | String | `#1AB8B8` | Color de línea |

### Ejemplos

```html
<!-- Gráfico de presión arterial -->
<simple-chart 
  data='[120, 122, 119, 121, 118, 120, 119]'
  width="800"
  height="300"
  color="#1AB8B8">
</simple-chart>

<!-- Gráfico de peso -->
<simple-chart 
  data='[72, 71.8, 72.1, 71.9, 72]'
  width="400"
  height="150"
  color="#4A9B6B">
</simple-chart>
```

### Características

- ✅ SVG responsive
- ✅ Animación de dibujo
- ✅ Área bajo curva
- ✅ Puntos de datos animados
- ✅ Auto-escalado

### Cómo Funciona

1. Recibe array de valores
2. Calcula min/max para escalado
3. Genera puntos SVG
4. Dibuja línea conectando puntos
5. Añade área bajo la línea
6. Anima entrada de elementos

---

## Patrones de Uso Comunes

### Dashboard Card con Indicador

```html
<app-card hoverable>
  <health-indicator 
    label="Pasos Hoy"
    value="6500"
    max="10000"
    unit="pasos"
    status="warning">
  </health-indicator>
</app-card>
```

### Botón de Acción en Card

```html
<app-card>
  <h3 slot="header">Título</h3>
  <p>Contenido de la tarjeta</p>
  <div slot="footer">
    <app-button variant="primary">
      Acción Principal
    </app-button>
  </div>
</app-card>
```

### Grid de Alertas

```html
<div class="alerts-list">
  <alert-card severity="critical" title="Alerta 1">...</alert-card>
  <alert-card severity="warning" title="Alerta 2">...</alert-card>
  <alert-card severity="info" title="Alerta 3">...</alert-card>
</div>
```

---

## Personalización

### Override Styles (No Recomendado)

Los componentes usan Shadow DOM, lo que significa que los estilos están encapsulados. Para modificar estilos:

1. **Editar el componente directamente**: Modificar archivo `.js`
2. **CSS Variables**: Algunos componentes respetan variables CSS (futuro)
3. **Clases wrapper**: Aplicar estilos al contenedor

### Extender Componentes

```javascript
// Crear nuevo componente basado en existente
import './app-button.js';

class SpecialButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <app-button variant="primary" size="lg">
        ${this.textContent}
      </app-button>
    `;
  }
}

customElements.define('special-button', SpecialButton);
```

---

## Convenciones

### Naming

- **Componentes**: `kebab-case` con prefijo `app-` o categoría
- **Atributos**: `lowercase` o `kebab-case`
- **Slots**: nombres descriptivos (`header`, `footer`, `content`)

### Eventos (Futuro)

```javascript
// Componentes pueden emitir eventos custom
this.dispatchEvent(new CustomEvent('value-changed', {
  detail: { value: newValue }
}));
```

### Accesibilidad

Todos los componentes deberían:
- ✅ Tener etiquetas apropiadas
- ✅ Soporte de teclado
- ✅ ARIA attributes donde sea necesario
- ✅ Contraste de colores adecuado
