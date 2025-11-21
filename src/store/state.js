/**
 * VITAL - Global State Management
 * 
 * Sistema simple de estado global con suscripciones
 */

class State {
    constructor() {
        this.state = {
            user: {
                id: 'VITAL-2025-1234',
                name: 'Juan Pérez',
                email: 'juan.perez@example.com',
                memberSince: '2025-11-01'
            },
            healthProfile: {
                weight: 72,
                height: 175,
                bmi: 23.5,
                bloodType: 'O+',
                conditions: ['Pre-hipertensión'],
                allergies: []
            },
            indicators: {
                bloodPressureSystolic: 120,
                bloodPressureDiastolic: 80,
                heartRate: 72,
                steps: 6500,
                sleep: 6.5,
                hydration: 1.5,
                stress: 45,
                weight: 72,
                calories: 1850
            },
            goals: {
                steps: 10000,
                sleep: 8,
                hydration: 2.5,
                calories: 2200
            },
            alerts: [],
            recommendations: [],
            settings: {
                notifications: {
                    healthAlerts: true,
                    measurementReminders: true,
                    weeklyRecommendations: false,
                    email: true
                },
                privacy: {
                    shareWithPromoters: true,
                    useLocation: true
                }
            }
        };

        this.subscribers = [];
    }

    /**
     * Obtiene el estado completo o una parte específica
     * @param {string} key - Clave del estado (opcional)
     * @returns {any} Estado completo o valor específico
     */
    get(key = null) {
        if (key) {
            return this.getNestedProperty(this.state, key);
        }
        return { ...this.state };
    }

    /**
     * Actualiza el estado
     * @param {string} key - Clave del estado a actualizar
     * @param {any} value - Nuevo valor
     */
    set(key, value) {
        this.setNestedProperty(this.state, key, value);
        this.notify(key, value);
    }

    /**
     * Actualiza múltiples valores del estado
     * @param {Object} updates - Objeto con las actualizaciones
     */
    update(updates) {
        Object.keys(updates).forEach(key => {
            this.set(key, updates[key]);
        });
    }

    /**
     * Suscribe un callback a cambios en el estado
     * @param {Function} callback - Función a ejecutar cuando cambia el estado
     * @returns {Function} Función para desuscribirse
     */
    subscribe(callback) {
        this.subscribers.push(callback);

        // Return unsubscribe function
        return () => {
            const index = this.subscribers.indexOf(callback);
            if (index > -1) {
                this.subscribers.splice(index, 1);
            }
        };
    }

    /**
     * Notifica a los suscriptores sobre cambios
     * @param {string} key - Clave que cambió
     * @param {any} value - Nuevo valor
     */
    notify(key, value) {
        this.subscribers.forEach(callback => {
            callback(key, value, this.state);
        });
    }

    /**
     * Obtiene una propiedad anidada usando dot notation
     * @param {Object} obj - Objeto
     * @param {string} path - Path (ej: 'user.name')
     * @returns {any} Valor de la propiedad
     */
    getNestedProperty(obj, path) {
        return path.split('.').reduce((current, prop) => current?.[prop], obj);
    }

    /**
     * Establece una propiedad anidada usando dot notation
     * @param {Object} obj - Objeto
     * @param {string} path - Path (ej: 'user.name')
     * @param {any} value - Nuevo valor
     */
    setNestedProperty(obj, path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((current, key) => {
            if (!(key in current)) {
                current[key] = {};
            }
            return current[key];
        }, obj);
        target[lastKey] = value;
    }

    /**
     * Persiste el estado en localStorage
     */
    persist() {
        try {
            localStorage.setItem('vital_state', JSON.stringify(this.state));
        } catch (e) {
            console.error('Error persisting state:', e);
        }
    }

    /**
     * Carga el estado desde localStorage
     */
    load() {
        try {
            const saved = localStorage.getItem('vital_state');
            if (saved) {
                this.state = { ...this.state, ...JSON.parse(saved) };
                this.notify('', this.state);
            }
        } catch (e) {
            console.error('Error loading state:', e);
        }
    }
}

// Export singleton instance
export const state = new State();

// Load state on init
state.load();
