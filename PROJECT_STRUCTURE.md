# 📁 Estructura Completa del Proyecto VITAL

## Organización de Archivos y Carpetas

```
VITAL/
│
├── 📄 index.html                    # Punto de entrada HTML
├── 📄 package.json                  # Configuración npm y scripts
├── 📄 package-lock.json             # Lock de dependencias
├── 📄 vite.config.js                # Configuración de Vite
├── 📄 .gitignore                    # Archivos ignorados por Git
├── 📄 README.md                     # Documentación principal
│
├── 📁 public/                       # Archivos estáticos públicos
│   └── 📄 logo.svg                  # Logo VITAL
│
├── 📁 src/                          # Código fuente
│   │
│   ├── 📄 main.js                   # Entry point de la aplicación
│   │
│   ├── 📁 components/               # Web Components nativos
│   │   ├── 📄 app-navbar.js         # Navegación principal
│   │   ├── 📄 app-card.js           # Tarjeta reutilizable
│   │   ├── 📄 app-button.js         # Botón customizado
│   │   ├── 📄 health-indicator.js   # Indicador de salud
│   │   ├── 📄 alert-card.js         # Tarjeta de alerta
│   │   └── 📄 simple-chart.js       # Gráfico SVG
│   │
│   ├── 📁 views/                    # Vistas de la aplicación
│   │   ├── 📄 home-view.js          # Página de inicio
│   │   ├── 📄 dashboard-view.js     # Panel de usuario
│   │   ├── 📄 indicators-view.js    # Indicadores detallados
│   │   ├── 📄 recommendations-view.js # Recomendaciones
│   │   ├── 📄 alerts-view.js        # Alertas tempranas
│   │   └── 📄 profile-view.js       # Perfil y configuración
│   │
│   ├── 📁 router/                   # Sistema de routing
│   │   └── 📄 router.js             # Router SPA (hash-based)
│   │
│   ├── 📁 store/                    # Gestión de estado
│   │   └── 📄 state.js              # Estado global con suscripciones
│   │
│   ├── 📁 styles/                   # Estilos CSS
│   │   ├── 📄 variables.css         # Variables de diseño (tokens)
│   │   ├── 📄 global.css            # Estilos globales
│   │   └── 📄 components.css        # Estilos de componentes
│   │
│   └── 📁 utils/                    # Utilidades y helpers
│       ├── 📄 helpers.js            # Funciones helper
│       └── 📄 constants.js          # Constantes globales
│
├── 📁 docs/                         # Documentación completa
│   ├── 📄 README.md                 # Índice de documentación
│   ├── 📄 ARCHITECTURE.md           # Arquitectura técnica
│   ├── 📄 COMPONENTS.md             # Documentación de componentes
│   ├── 📄 MOCKUPS.md                # Diseño visual y mockups
│   ├── 📄 BEST_PRACTICES.md         # Guía de buenas prácticas
│   └── 📄 FUTURE_ENHANCEMENTS.md    # Roadmap y mejoras futuras
│
├── 📁 node_modules/                 # Dependencias (generado)
│
└── 📁 .git/                         # Control de versiones Git
```

## Descripción de Carpetas

### 📁 `/src/components/`
Contiene todos los Web Components nativos reutilizables:
- Cada componente es autocontenido con su lógica y estilos
- Usan Shadow DOM para encapsulación
- Registrados como Custom Elements

### 📁 `/src/views/`
Vistas de página completa:
- Cada vista exporta una función que retorna un string HTML
- Incluyen estilos específicos inline
- Se renderizan dinámicamente en `#main-content`

### 📁 `/src/router/`
Sistema de routing:
- Router SPA basado en hash navigation
- Gestiona transiciones entre vistas
- Actualiza links activos automáticamente

### 📁 `/src/store/`
Gestión de estado global:
- Patrón Observer (Pub/Sub)
- Persistencia en LocalStorage
- Notificación a suscriptores

### 📁 `/src/styles/`
Sistema de diseño modular:
- `variables.css`: Tokens de diseño (colores, espaciado, tipografía)
- `global.css`: Reset, tipografía, utilidades
- `components.css`: Estilos compartidos de componentes

### 📁 `/src/utils/`
Utilidades y helpers:
- `helpers.js`: Funciones reutilizables (formateo, cálculos, validaciones)
- `constants.js`: Constantes globales (thresholds, configuración)

### 📁 `/docs/`
Documentación completa del proyecto:
- Guías técnicas
- Referencias de API
- Diseño y UX
- Buenas prácticas
- Planificación futura

### 📁 `/public/`
Assets estáticos:
- Logo y recursos gráficos
- Servidos directamente sin procesamiento

## Flujo de la Aplicación

```
index.html
    ↓
main.js (inicializa app)
    ↓
┌─────────────────┐
│  Import Router  │
│  Import State   │
│ Import Components│
│  Import Views   │
└─────────────────┘
    ↓
Router registra rutas
    ↓
Usuario navega
    ↓
Router renderiza vista
    ↓
Vista usa componentes
    ↓
Componentes usan estado
```

## Archivos Críticos

| Archivo | Propósito | Importancia |
|---------|-----------|-------------|
| `index.html` | Entry point HTML | ⭐⭐⭐ |
| `src/main.js` | Entry point JS | ⭐⭐⭐ |
| `src/router/router.js` | Navegación | ⭐⭐⭐ |
| `src/store/state.js` | Estado global | ⭐⭐⭐ |
| `src/styles/variables.css` | Design tokens | ⭐⭐ |
| `package.json` | Config npm | ⭐⭐ |
| `vite.config.js` | Config build | ⭐⭐ |

## Convenciones de Nombres

- **Componentes**: `kebab-case.js` (ej: `app-navbar.js`)
- **Vistas**: `kebab-case-view.js` (ej: `home-view.js`)
- **Utilidades**: `camelCase.js` (ej: `helpers.js`)
- **CSS**: `kebab-case.css` (ej: `variables.css`)
- **Carpetas**: `lowercase` (ej: `components`, `views`)

## Tamaño del Proyecto

```
Total de archivos: ~25-30 archivos
Líneas de código: ~5,000 líneas
Build size: ~50KB (minificado)
Dependencies: 1 (Vite - dev only)
```

## Próximos Pasos

Consulta [FUTURE_ENHANCEMENTS.md](docs/FUTURE_ENHANCEMENTS.md) para ver el roadmap completo de:
- Backend integration (v1.5)
- PWA features (v2.0)
- AI/ML capabilities (v3.0)

---

**Última actualización**: Noviembre 2025  
**Versión**: 1.0.0
