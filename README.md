# VITAL - Plataforma de Salud Preventiva

![VITAL Logo](public/logo.svg)

**VITAL** es una plataforma web de salud preventiva para El Salvador que detecta crisis silenciosas antes de que golpeen. Combina tecnología usable con el trabajo de promotores comunitarios para salvar vidas.

## 🎯 Características Principales

- **Monitoreo Pasivo**: Seguimiento continuo de indicadores de salud 24/7
- **Detección Temprana**: IA local identifica patrones anormales antes de crisis
- **Alertas Inteligentes**: Notificaciones a promotores de salud para acción rápida
- **Recomendaciones Personalizadas**: Consejos preventivos basados en tus indicadores
- **Diseño Wellness Moderno**: Interfaz premium con glassmorphism y animaciones

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 16+ y npm
- Navegador moderno (Chrome, Firefox, Safari, Edge)

### Instalación

```bash
# 1. Clonar o descargar el proyecto
cd VITAL

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en navegador
# La aplicación se abrirá automáticamente en http://localhost:5173
```

### Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo con hot reload

# Producción
npm run build        # Construye la aplicación para producción
npm run preview      # Preview de la build de producción
```

## 📁 Estructura del Proyecto

```
VITAL/
├── public/                 # Archivos estáticos
│   └── logo.svg           # Logo de VITAL
├── src/                   # Código fuente
│   ├── components/        # Web Components nativos
│   │   ├── app-navbar.js        # Navegación principal
│   │   ├── app-card.js          # Tarjeta reutilizable
│   │   ├── app-button.js        # Botón customizado
│   │   ├── health-indicator.js  # Indicador de salud
│   │   ├── alert-card.js        # Tarjeta de alerta
│   │   └── simple-chart.js      # Gráfico SVG
│   ├── views/             # Vistas de la aplicación
│   │   ├── home-view.js         # Página de inicio
│   │   ├── dashboard-view.js    # Panel del usuario
│   │   ├── indicators-view.js   # Indicadores detallados
│   │   ├── recommendations-view.js  # Recomendaciones
│   │   ├── alerts-view.js       # Alertas tempranas
│   │   └── profile-view.js      # Perfil y configuración
│   ├── router/            # Sistema de routing
│   │   └── router.js      # Router SPA con hash navigation
│   ├── store/             # Gestión de estado
│   │   └── state.js       # Estado global con suscripciones
│   ├── styles/            # Estilos CSS
│   │   ├── variables.css  # Variables de diseño
│   │   ├── global.css     # Estilos globales
│   │   └── components.css # Estilos de componentes
│   ├── utils/             # Utilidades
│   │   ├── helpers.js     # Funciones helper
│   │   └── constants.js   # Constantes globales
│   └── main.js            # Punto de entrada
├── docs/                  # Documentación
│   ├── ARCHITECTURE.md    # Arquitectura técnica
│   ├── COMPONENTS.md      # Documentación de componentes
│   ├── MOCKUPS.md         # Mockups textuales
│   ├── FUTURE_ENHANCEMENTS.md  # Mejoras futuras
│   └── BEST_PRACTICES.md  # Buenas prácticas
├── index.html             # HTML principal
├── package.json           # Dependencias y scripts
├── vite.config.js         # Configuración de Vite
└── README.md              # Este archivo
```

## 🏗️ Arquitectura

VITAL está construido con:

- **Vite**: Build tool ultrarrápido
- **JavaScript Vanilla**: Sin frameworks pesados
- **Web Components**: Componentes nativos reutilizables
- **CSS Modular**: Variables CSS y diseño modular
- **Hash Routing**: Navegación SPA simple y efectiva

### Tecnologías Clave

- **Custom Elements API**: Para Web Components nativos
- **Shadow DOM**: Encapsulación de estilos
- **CSS Variables**: Sistema de diseño consistente
- **LocalStorage**: Persistencia de estado
- **SVG**: Gráficos y logo vectoriales

## 📱 Secciones de la Aplicación

### 1. Inicio
Página principal con información sobre VITAL, cómo funciona, estadísticas de impacto y call-to-actions.

### 2. Panel (Dashboard)
Vista general con:
- Estadísticas rápidas de salud
- Indicadores principales
- Gráficos de tendencias
- Alertas recientes
- Acciones rápidas

### 3. Indicadores
Monitoreo detallado de:
- Salud cardiovascular (presión, frecuencia cardíaca)
- Actividad física y peso
- Sueño e hidratación
- Históricos y tendencias

### 4. Recomendaciones
Consejos personalizados en:
- Nutrición
- Ejercicio
- Sueño y bienestar
- Hidratación

### 5. Alertas
Sistema de alertas tempranas con:
- Alertas activas
- Notificaciones recientes
- Historial de alertas resueltas
- Estadísticas de respuesta

### 6. Perfil
Configuración de:
- Información personal
- Perfil de salud
- Notificaciones
- Metas personales
- Privacidad y seguridad

## 🎨 Sistema de Diseño

### Paleta de Colores

- **Primary (Turquesa)**: `#1AB8B8` - Identidad de marca
- **Secondary (Verde)**: `#4A9B6B` - Salud y bienestar
- **Accent (Azul)**: `#3B82F6` - Confianza

### Tipografía

- **Display/Títulos**: Outfit (Google Fonts)
- **Cuerpo**: Inter (Google Fonts)

### Efectos Especiales

- Glassmorphism
- Gradientes suaves
- Animaciones micro-interactivas
- Sombras elevadas

## 🔧 Personalización

### Modificar Colores

Edita `src/styles/variables.css`:

```css
--color-primary-500: hsl(174, 70%, 42%);
--color-secondary-500: hsl(142, 55%, 38%);
```

### Agregar Nuevos Componentes

1. Crear archivo en `src/components/`
2. Usar API de Custom Elements
3. Importar en `src/main.js`

### Agregar Nuevas Vistas

1. Crear archivo en `src/views/`
2. Exportar función que retorna HTML
3. Registrar ruta en `src/main.js`

## 📚 Documentación Adicional

- [**Arquitectura**](docs/ARCHITECTURE.md): Decisiones técnicas y patrones
- [**Componentes**](docs/COMPONENTS.md): API de cada componente
- [**Mockups**](docs/MOCKUPS.md): Descripciones visuales de diseño
- [**Mejoras Futuras**](docs/FUTURE_ENHANCEMENTS.md): Roadmap para v2.0
- [**Buenas Prácticas**](docs/BEST_PRACTICES.md): Guía de desarrollo

## 🚧 Futuras Integraciones

Ver [FUTURE_ENHANCEMENTS.md](docs/FUTURE_ENHANCEMENTS.md) para:

- Integración con API backend
- Base de datos real
- Autenticación y autorización
- PWA features
- Notificaciones push
- Integración con wearables

## 🤝 Contribución

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

MIT License - ver archivo LICENSE para detalles

## 👥 Equipo VITAL

Desarrollado con ❤️ para mejorar la salud preventiva en El Salvador.

---

**¿Tienes preguntas?** Revisa la [documentación completa](docs/) o abre un issue.

**¡Gracias por usar VITAL!** 🏥💚
