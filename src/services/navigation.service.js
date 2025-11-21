/**
 * VITAL v2.0 - Navigation Service
 * 
 * Servicio centralizado para gestión de navegación y módulos.
 * Proporciona métodos para obtener módulos, sincronizar con el router
 * y emitir eventos de cambio de modo/ruta.
 */

import { getModulesByMode, getModuleByPath, getModuleById } from '../config/modules.config.js';

class NavigationService {
  constructor() {
    this.currentMode = localStorage.getItem('vitalMode') || 'user';
    this.currentRoute = window.location.hash.slice(1) || '/';
    this.listeners = {
      modeChanged: [],
      routeChanged: []
    };
  }

  /**
   * Obtiene los módulos disponibles para el modo actual
   * @param {string} mode - 'user' o 'business' (opcional, usa el modo actual si no se especifica)
   * @returns {Array} Array de módulos ordenados
   */
  getModulesByMode(mode = null) {
    const targetMode = mode || this.currentMode;
    return getModulesByMode(targetMode);
  }

  /**
   * Obtiene el módulo activo basado en la ruta actual
   * @returns {Object|null} Módulo activo o null
   */
  getActiveModule() {
    return getModuleByPath(this.currentRoute);
  }

  /**
   * Obtiene un módulo por su ID
   * @param {string} id - ID del módulo
   * @returns {Object|null} Módulo encontrado o null
   */
  getModuleById(id) {
    return getModuleById(id);
  }

  /**
   * Obtiene un módulo por su ruta
   * @param {string} path - Ruta del módulo
   * @returns {Object|null} Módulo encontrado o null
   */
  getModuleByPath(path) {
    return getModuleByPath(path);
  }

  /**
   * Cambia el modo de navegación
   * @param {string} mode - 'user' o 'business'
   */
  setMode(mode) {
    if (mode !== 'user' && mode !== 'business') {
      console.warn(`Invalid mode: ${mode}. Using 'user' as default.`);
      mode = 'user';
    }

    if (this.currentMode !== mode) {
      this.currentMode = mode;
      localStorage.setItem('vitalMode', mode);
      this.emit('modeChanged', mode);
    }
  }

  /**
   * Obtiene el modo actual
   * @returns {string} Modo actual ('user' o 'business')
   */
  getCurrentMode() {
    return this.currentMode;
  }

  /**
   * Actualiza la ruta actual y emite evento
   * @param {string} route - Ruta actual
   */
  setCurrentRoute(route) {
    const normalizedRoute = route || '/';
    if (this.currentRoute !== normalizedRoute) {
      this.currentRoute = normalizedRoute;
      this.emit('routeChanged', normalizedRoute);
    }
  }

  /**
   * Obtiene la ruta actual
   * @returns {string} Ruta actual
   */
  getCurrentRoute() {
    return this.currentRoute;
  }

  /**
   * Sincroniza con el router para actualizar la ruta actual
   * Debe ser llamado cuando cambia el hash de la URL
   */
  syncWithRouter() {
    const hash = window.location.hash.slice(1) || '/';
    this.setCurrentRoute(hash);
  }

  /**
   * Suscribe un listener a un evento
   * @param {string} event - Nombre del evento ('modeChanged' o 'routeChanged')
   * @param {Function} callback - Función callback
   * @returns {Function} Función para desuscribirse
   */
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    
    this.listeners[event].push(callback);
    
    // Retorna función de desuscripción
    return () => {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    };
  }

  /**
   * Emite un evento a todos los listeners
   * @param {string} event - Nombre del evento
   * @param {*} data - Datos a pasar a los listeners
   */
  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in navigation service listener for ${event}:`, error);
        }
      });
    }
  }

  /**
   * Inicializa el servicio y sincroniza con el estado actual
   */
  init() {
    // Sincronizar con el hash actual
    this.syncWithRouter();
    
    // Escuchar cambios de hash
    window.addEventListener('hashchange', () => {
      this.syncWithRouter();
    });
    
    // Cargar modo desde localStorage
    const savedMode = localStorage.getItem('vitalMode');
    if (savedMode && (savedMode === 'user' || savedMode === 'business')) {
      this.currentMode = savedMode;
    }
  }
}

// Export singleton instance
export const navigationService = new NavigationService();

// Inicializar automáticamente
navigationService.init();

