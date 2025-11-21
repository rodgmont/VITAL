/**
 * VITAL v2.0 - Modules Configuration
 * 
 * Configuración centralizada de todos los módulos de la aplicación.
 * Esta es la fuente única de verdad para rutas, navegación y metadatos.
 */

/**
 * Configuración de módulos por modo
 * @typedef {Object} ModuleConfig
 * @property {string} id - Identificador único del módulo
 * @property {string} path - Ruta del módulo (ej: '/dashboard')
 * @property {string} label - Etiqueta para mostrar en navegación
 * @property {string} icon - Icono emoji para el módulo
 * @property {number} order - Orden de aparición en el menú
 * @property {Function} renderFn - Función que renderiza la vista (opcional, se importa en main.js)
 */

export const MODULES_CONFIG = {
  // Módulos comunes disponibles en ambos modos
  common: [
    {
      id: 'home',
      path: '/',
      label: 'Inicio',
      icon: '🏠',
      order: 1
    },
    {
      id: 'mobile-demo',
      path: '/mobile-demo',
      label: 'Demo App',
      icon: '📱',
      order: 2
    }
  ],

  // Módulos de VITAL Persona (modo usuario)
  user: [
    {
      id: 'dashboard',
      path: '/dashboard',
      label: 'Mi Panel',
      icon: '📊',
      order: 1
    },
    {
      id: 'indicators',
      path: '/indicators',
      label: 'Indicadores',
      icon: '📈',
      order: 2
    },
    {
      id: 'recommendations',
      path: '/recommendations',
      label: 'Recomendaciones',
      icon: '💡',
      order: 3
    },
    {
      id: 'alerts',
      path: '/alerts',
      label: 'Alertas',
      icon: '🔔',
      order: 4
    },
    {
      id: 'profile',
      path: '/profile',
      label: 'Perfil',
      icon: '👤',
      order: 5
    }
  ],

  // Módulos de VITAL Asistent (modo empresarial)
  business: [
    {
      id: 'admin-dashboard',
      path: '/admin/dashboard',
      label: 'Admin Dashboard',
      icon: '🏢',
      order: 1
    },
    {
      id: 'patients',
      path: '/admin/patients',
      label: 'Pacientes',
      icon: '👥',
      order: 2
    },
    {
      id: 'promoters',
      path: '/admin/promoters',
      label: 'Promotores',
      icon: '👨‍⚕️',
      order: 3
    },
    {
      id: 'devices',
      path: '/admin/devices',
      label: 'Dispositivos',
      icon: '⌚',
      order: 4
    },
    {
      id: 'reports',
      path: '/admin/reports',
      label: 'Reportes',
      icon: '📈',
      order: 5
    },
    {
      id: 'ai',
      path: '/admin/ai',
      label: 'IA',
      icon: '🤖',
      order: 6
    },
    {
      id: 'references',
      path: '/admin/references',
      label: 'Referencias',
      icon: '🏥',
      order: 7
    },
    {
      id: 'system',
      path: '/admin/system',
      label: 'Sistema',
      icon: '⚙️',
      order: 8
    }
  ]
};

/**
 * Obtiene todos los módulos para un modo específico
 * @param {string} mode - 'user' o 'business'
 * @returns {Array<ModuleConfig>} Array de módulos ordenados
 */
export function getModulesByMode(mode) {
  const common = MODULES_CONFIG.common || [];
  const modeModules = MODULES_CONFIG[mode] || [];
  
  // Combinar y ordenar por order
  const allModules = [...common, ...modeModules];
  return allModules.sort((a, b) => a.order - b.order);
}

/**
 * Obtiene un módulo por su ID
 * @param {string} id - ID del módulo
 * @returns {ModuleConfig|null} Módulo encontrado o null
 */
export function getModuleById(id) {
  const allModules = [
    ...MODULES_CONFIG.common,
    ...MODULES_CONFIG.user,
    ...MODULES_CONFIG.business
  ];
  
  return allModules.find(module => module.id === id) || null;
}

/**
 * Obtiene un módulo por su ruta
 * @param {string} path - Ruta del módulo
 * @returns {ModuleConfig|null} Módulo encontrado o null
 */
export function getModuleByPath(path) {
  const allModules = [
    ...MODULES_CONFIG.common,
    ...MODULES_CONFIG.user,
    ...MODULES_CONFIG.business
  ];
  
  return allModules.find(module => module.path === path) || null;
}

