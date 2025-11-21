/**
 * VITAL v2.0 - Main Entry Point
 * 
 * Inicializa la aplicación empresarial, registra componentes y rutas
 */

import { router } from './router/router.js';
import { state } from './store/state.js';
import { authService, ROLES } from './services/auth.service.js';
import { MODULES_CONFIG } from './config/modules.config.js';

// Import USER views (v1.0) - VITAL PERSONA
import { renderHomeView } from './views/home-view.js';
import { renderDashboardView } from './views/dashboard-view.js';
import { renderIndicatorsView } from './views/indicators-view.js';
import { renderRecommendationsView } from './views/recommendations-view.js';
import { renderAlertsView } from './views/alerts-view.js';
import { renderProfileView } from './views/profile-view.js';

// Import ADMIN views (v2.0) - VITAL EMPRESARIAL
import { renderLoginView } from './views/auth/login-view.js';
import { renderAdminDashboardView } from './views/admin/admin-dashboard-view.js';
import { renderPatientsListView } from './views/patients/patients-list-view.js';
import { renderPromotersListView } from './views/promoters/promoters-list-view.js';
import { renderDevicesInventoryView } from './views/devices/devices-inventory-view.js';
import { renderReportsView } from './views/reports/reports-view.js';
import { renderAIConfigView } from './views/ai/ai-config-view.js';
import { renderReferencesView } from './views/references/references-view.js';
import { renderSystemAdminView } from './views/admin/system-admin-view.js';
import { renderMobileAppDemoView } from './views/mobile-app-demo-view.js';

// Import base components (v1.0)
import './components/dynamic-navbar.js';
import './components/app-card.js';
import './components/app-button.js';
import './components/health-indicator.js';
import './components/alert-card.js';
import './components/simple-chart.js';

// Import advanced components (v2.0)
import './components/advanced-table.js';
import './components/kpi-card.js';
import './components/multi-series-chart.js';
import './components/status-badge.js';

/**
 * Auth guard for ADMIN routes (VITAL Empresarial)
 */
function requireAdmin(renderFn) {
    return () => {
        if (!authService.isAuthenticated()) {
            router.navigate('/login');
            return '<div>Redirigiendo a login...</div>';
        }

        if (!authService.isAdmin()) {
            return '<div style="padding: 2rem; text-align: center;"><h2>⛔ Acceso Denegado</h2><p>Este módulo requiere acceso de VITAL Empresarial</p></div>';
        }

        return renderFn();
    };
}

/**
 * Auth guard for USER routes (VITAL Persona)
 */
function requireUser(renderFn) {
    return () => {
        if (!authService.isAuthenticated()) {
            router.navigate('/login');
            return '<div>Redirigiendo a login...</div>';
        }

        if (!authService.isUser()) {
            return '<div style="padding: 2rem; text-align: center;"><h2>⛔ Acceso Denegado</h2><p>Este módulo requiere acceso de VITAL Persona</p></div>';
        }

        return renderFn();
    };
}

/**
 * Mapeo de IDs de módulos a funciones de renderizado
 * Este mapeo conecta la configuración de módulos con las vistas
 */
const MODULE_RENDER_MAP = {
    // Common modules
    'home': renderHomeView,
    'mobile-demo': renderMobileAppDemoView,
    
    // User modules (VITAL Persona)
    'dashboard': renderDashboardView,
    'indicators': renderIndicatorsView,
    'recommendations': renderRecommendationsView,
    'alerts': renderAlertsView,
    'profile': renderProfileView,
    
    // Business modules (VITAL Asistent)
    'admin-dashboard': renderAdminDashboardView,
    'patients': renderPatientsListView,
    'promoters': renderPromotersListView,
    'devices': renderDevicesInventoryView,
    'reports': renderReportsView,
    'ai': renderAIConfigView,
    'references': renderReferencesView,
    'system': renderSystemAdminView
};

/**
 * Registra todas las rutas desde la configuración centralizada
 */
function registerRoutesFromConfig() {
    // Register public routes (not in modules config)
    router.register('/login', renderLoginView);
    
    // Register all modules from config
    const allModules = [
        ...MODULES_CONFIG.common,
        ...MODULES_CONFIG.user,
        ...MODULES_CONFIG.business
    ];
    
    allModules.forEach(module => {
        const renderFn = MODULE_RENDER_MAP[module.id];
        if (renderFn) {
            router.register(module.path, renderFn);
        } else {
            console.warn(`No render function found for module: ${module.id}`);
        }
    });
}

/**
 * Initialize the application
 */
function initApp() {
    console.log('🚀 Initializing VITAL v2.0 Platform...');

    // Register all routes from centralized config
    registerRoutesFromConfig();

    // Subscribe to state changes for debugging
    state.subscribe((key, value) => {
        console.log(`State changed: ${key}`, value);
        state.persist();
    });

    // Add page transition effects
    const main = document.getElementById('main-content');
    if (main) {
        main.classList.add('fade-in');
    }

    console.log('✅ VITAL v2.0 Platform initialized');
    console.log('🏢 VITAL Empresarial: 8 módulos admin');
    console.log('� VITAL Persona: 6 módulos usuario');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Export for potential external use
export { router, state };
