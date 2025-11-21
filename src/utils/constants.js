/**
 * VITAL - Constants
 * 
 * Constantes globales de la aplicación
 */

// Health Thresholds
export const HEALTH_THRESHOLDS = {
    bloodPressure: {
        systolic: {
            normal: { min: 90, max: 120 },
            prehypertension: { min: 120, max: 139 },
            hypertension: { min: 140, max: 180 }
        },
        diastolic: {
            normal: { min: 60, max: 80 },
            prehypertension: { min: 80, max: 89 },
            hypertension: { min: 90, max: 120 }
        }
    },
    heartRate: {
        min: 60,
        max: 100,
        optimal: 70
    },
    bmi: {
        underweight: { min: 0, max: 18.5 },
        normal: { min: 18.5, max: 24.9 },
        overweight: { min: 25, max: 29.9 },
        obese: { min: 30, max: 100 }
    }
};

// Default Goals
export const DEFAULT_GOALS = {
    steps: 10000,
    sleep: 8,
    hydration: 2.5,
    calories: 2200,
    exercise: 30 // minutes per day
};

// Alert Severity Levels
export const ALERT_SEVERITY = {
    INFO: 'info',
    WARNING: 'warning',
    CRITICAL: 'critical'
};

// Notification Types
export const NOTIFICATION_TYPES = {
    HEALTH_ALERT: 'health_alert',
    MEASUREMENT_REMINDER: 'measurement_reminder',
    RECOMMENDATION: 'recommendation',
    MILESTONE: 'milestone'
};

// App Configuration
export const APP_CONFIG = {
    name: 'VITAL',
    version: '1.0.0',
    locale: 'es-ES',
    timezone: 'America/El_Salvador'
};

// Storage Keys
export const STORAGE_KEYS = {
    STATE: 'vital_state',
    USER: 'vital_user',
    SETTINGS: 'vital_settings',
    HISTORY: 'vital_history'
};

// API Endpoints (for future integration)
export const API_ENDPOINTS = {
    BASE_URL: '/api/v1',
    AUTH: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        REGISTER: '/auth/register'
    },
    HEALTH: {
        INDICATORS: '/health/indicators',
        ALERTS: '/health/alerts',
        RECOMMENDATIONS: '/health/recommendations'
    },
    USER: {
        PROFILE: '/user/profile',
        SETTINGS: '/user/settings'
    }
};

// Chart Colors
export const CHART_COLORS = {
    primary: '#1AB8B8',
    secondary: '#4A9B6B',
    accent: '#3B82F6',
    warning: '#F59E0B',
    error: '#EF4444',
    success: '#10B981'
};

// Date Formats
export const DATE_FORMATS = {
    FULL: { year: 'numeric', month: 'long', day: 'numeric' },
    SHORT: { year: 'numeric', month: 'short', day: '2-digit' },
    TIME: { hour: '2-digit', minute: '2-digit' },
    DATETIME: { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }
};
