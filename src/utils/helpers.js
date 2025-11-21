/**
 * VITAL - Utilities and Helper Functions
 */

/**
 * Formatea una fecha a español
 * @param {Date|string} date - Fecha a formatear
 * @param {Object} options - Opciones de formato
 * @returns {string} Fecha formateada
 */
export function formatDate(date, options = {}) {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...options
    };
    return dateObj.toLocaleDateString('es-ES', defaultOptions);
}

/**
 * Formatea una fecha y hora a español
 * @param {Date|string} date - Fecha a formatear
 * @returns {string} Fecha y hora formateada
 */
export function formatDateTime(date) {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Formatea un número con separadores de miles
 * @param {number} num - Número a formatear
 * @returns {string} Número formateado
 */
export function formatNumber(num) {
    return num.toLocaleString('es-ES');
}

/**
 * Calcula el IMC (Índice de Masa Corporal)
 * @param {number} weight - Peso en kg
 * @param {number} height - Altura en cm
 * @returns {number} IMC calculado
 */
export function calculateBMI(weight, height) {
    const heightInMeters = height / 100;
    return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
}

/**
 * Clasifica el IMC
 * @param {number} bmi - Valor de IMC
 * @returns {string} Clasificación (Bajo peso, Normal, Sobrepeso, Obesidad)
 */
export function classifyBMI(bmi) {
    if (bmi < 18.5) return 'Bajo peso';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Sobrepeso';
    return 'Obesidad';
}

/**
 * Valida si un email es válido
 * @param {string} email - Email a validar
 * @returns {boolean} True si es válido
 */
export function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Genera un color basado en un valor y rangos
 * @param {number} value - Valor actual
 * @param {number} min - Valor mínimo (verde)
 * @param {number} max - Valor máximo (rojo)
 * @returns {string} Color hex
 */
export function getColorForValue(value, min, max) {
    const percentage = (value - min) / (max - min);

    if (percentage < 0.5) {
        // Verde a amarillo
        return `hsl(${142 - percentage * 100}, 70%, 45%)`;
    } else if (percentage < 0.8) {
        // Amarillo a naranja
        return `hsl(${38 - (percentage - 0.5) * 60}, 92%, 50%)`;
    } else {
        // Naranja a rojo
        return `hsl(${0}, 70%, 55%)`;
    }
}

/**
 * Obtiene el status de un indicador según su valor
 * @param {number} value - Valor actual
 * @param {number} target - Valor objetivo
 * @param {number} threshold - Umbral de advertencia (% del objetivo)
 * @returns {string} Status (good, warning, critical)
 */
export function getIndicatorStatus(value, target, threshold = 0.85) {
    const percentage = value / target;

    if (percentage >= threshold && percentage <= 1.2) {
        return 'good';
    } else if (percentage >= threshold * 0.7 && percentage < 1.5) {
        return 'warning';
    } else {
        return 'critical';
    }
}

/**
 * Debounce function - retrasa la ejecución de una función
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} Función debounced
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function - limita la frecuencia de ejecución
 * @param {Function} func - Función a ejecutar
 * @param {number} limit - Límite de tiempo en ms
 * @returns {Function} Función throttled
 */
export function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Genera un ID único
 * @returns {string} ID único
 */
export function generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Trunca un texto a una longitud específica
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} Texto truncado
 */
export function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

/**
 * Obtiene un saludo según la hora del día
 * @returns {string} Saludo personalizado
 */
export function getGreeting() {
    const hour = new Date().getHours();

    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
}

/**
 * Calcula la edad desde una fecha de nacimiento
 * @param {Date|string} birthDate - Fecha de nacimiento
 * @returns {number} Edad en años
 */
export function calculateAge(birthDate) {
    const today = new Date();
    const birth = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return age;
}
