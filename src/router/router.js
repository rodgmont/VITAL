/**
 * VITAL - Router
 * 
 * Router SPA simple usando hash navigation
 */

class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = null;
        this.init();
    }

    /**
     * Registra una nueva ruta
     * @param {string} path - Path de la ruta (ej: '/', '/dashboard')
     * @param {Function} handler - Función que renderiza la vista
     */
    register(path, handler) {
        this.routes[path] = handler;
    }

    /**
     * Inicializa el router
     */
    init() {
        // Listen for hash changes
        window.addEventListener('hashchange', () => this.handleRoute());

        // Handle initial load
        window.addEventListener('load', () => this.handleRoute());
    }

    /**
     * Maneja el cambio de ruta
     */
    handleRoute() {
        // Get the current hash (remove #)
        const hash = window.location.hash.slice(1) || '/';

        // Find the matching route
        const handler = this.routes[hash];

        if (handler) {
            this.currentRoute = hash;
            this.renderView(handler);
        } else {
            // 404 - route not found
            this.render404();
        }

        // Update active nav links
        this.updateActiveNavLinks();
    }

    /**
     * Renderiza la vista
     * @param {Function} handler - Función que retorna el HTML
     */
    renderView(handler) {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            // Add fade-out animation
            mainContent.style.opacity = '0';

            setTimeout(() => {
                mainContent.innerHTML = handler();

                // Scroll to top
                window.scrollTo(0, 0);

                // Add fade-in animation
                setTimeout(() => {
                    mainContent.style.opacity = '1';
                }, 50);
            }, 150);
        }
    }

    /**
     * Renderiza página 404
     */
    render404() {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.innerHTML = `
        <div style="text-align: center; padding: 4rem 2rem; min-height: 60vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <h1 style="font-family: 'Outfit', sans-serif; font-size: 6rem; font-weight: 900; color: #1AB8B8; margin-bottom: 1rem;">404</h1>
          <h2 style="font-family: 'Outfit', sans-serif; font-size: 2rem; font-weight: 700; color: #1a1a1a; margin-bottom: 1rem;">Página No Encontrada</h2>
          <p style="font-size: 1.1rem; color: #666; margin-bottom: 2rem;">La página que estás buscando no existe.</p>
          <app-button variant="primary" onclick="window.location.hash='/'">Volver al Inicio</app-button>
        </div>
      `;
        }
    }

    /**
     * Actualiza los links activos en la navegación
     */
    updateActiveNavLinks() {
        // Get all nav links from shadow DOM
        const navbar = document.querySelector('app-navbar');
        if (navbar && navbar.shadowRoot) {
            const links = navbar.shadowRoot.querySelectorAll('.nav-link');
            links.forEach(link => {
                const href = link.getAttribute('href');
                if (href === `#${this.currentRoute}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    }

    /**
     * Navega a una ruta específica
     * @param {string} path - Path de la ruta
     */
    navigate(path) {
        window.location.hash = path;
    }
}

// Export singleton instance
export const router = new Router();
