/**
 * VITAL v2.0 - Dynamic Navbar Component
 * 
 * Navegación que se adapta al rol del usuario
 */

import { authService } from '../services/auth.service.js';

class DynamicNavbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();

    // Re-render when hash changes
    window.addEventListener('hashchange', () => this.render());
  }

  setupEventListeners() {
    const menuToggle = this.shadowRoot.querySelector('.menu-toggle');
    const navLinks = this.shadowRoot.querySelector('.nav-links');

    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
      });
    }

    // Close menu when clicking on a link
    const links = this.shadowRoot.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks?.classList.remove('active');
        menuToggle?.classList.remove('active');
      });
    });

    // Logout button
    const logoutBtn = this.shadowRoot.querySelector('.logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        authService.logout();
      });
    }
  }

  getMenuItems() {
    const user = authService.getCurrentUser();

    if (!user) {
      // Public menu
      return [
        { label: 'Inicio', href: '#/', icon: '🏠' },
        { label: 'Iniciar Sesión', href: '#/login', icon: '🔑', cta: true }
      ];
    }

    // Admin menu
    if (authService.hasPermission('VIEW_ADMIN_DASHBOARD')) {
      return [
        { label: 'Dashboard', href: '#/admin/dashboard', icon: '📊' },
        { label: 'Pacientes', href: '#/admin/patients', icon: '👥' },
        { label: 'Promotores', href: '#/admin/promoters', icon: '👨‍⚕️' },
        { label: 'Dispositivos', href: '#/admin/devices', icon: '⌚' },
        { label: 'Reportes', href: '#/admin/reports', icon: '📈' },
        { label: 'IA', href: '#/admin/ai', icon: '🤖' },
        { label: 'Referencias', href: '#/admin/references', icon: '🏥' },
        { label: 'Sistema', href: '#/admin/system', icon: '⚙️' }
      ];
    }

    // Patient/user menu
    return [
      { label: 'Inicio', href: '#/', icon: '🏠' },
      { label: 'Mi Panel', href: '#/dashboard', icon: '📊' },
      { label: 'Indicadores', href: '#/indicators', icon: '📈' },
      { label: 'Recomendaciones', href: '#/recommendations', icon: '💡' },
      { label: 'Alertas', href: '#/alerts', icon: '🔔' },
      { label: 'Perfil', href: '#/profile', icon: '👤' }
    ];
  }

  render() {
    const user = authService.getCurrentUser();
    const menuItems = this.getMenuItems();
    const currentHash = window.location.hash || '#/';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        nav {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: #1AB8B8;
          font-family: 'Outfit', sans-serif;
          font-size: 1.5rem;
          font-weight: 800;
          transition: transform 0.3s ease;
        }

        .logo:hover {
          transform: scale(1.05);
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: #6B7280;
        }

        .user-role {
          padding: 0.25rem 0.75rem;
          background: #E0F2F1;
          color: #00695C;
          border-radius: 999px;
          font-weight: 600;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          text-decoration: none;
          color: #333;
          font-weight: 500;
          font-size: 0.9rem;
          transition: color 0.3s ease;
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: #1AB8B8;
          transition: width 0.3s ease;
        }

        .nav-link:hover {
          color: #1AB8B8;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-link.active {
          color: #1AB8B8;
          font-weight: 700;
        }

        .nav-link.active::after {
          width: 100%;
        }

        .nav-cta {
          background: #1AB8B8;
          color: white !important;
          padding: 0.65rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(26, 184, 184, 0.3);
        }

        .nav-cta:hover {
          background: #159a9a;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(26, 184, 184, 0.4);
        }

        .nav-cta::after {
          display: none;
        }

        .logout-btn {
          background: #EF4444;
          color: white;
          border: none;
          padding: 0.65rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .logout-btn:hover {
          background: #DC2626;
          transform: translateY(-2px);
        }

        .menu-toggle {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
        }

        .menu-toggle span {
          width: 25px;
          height: 3px;
          background: #333;
          border-radius: 3px;
          transition: all 0.3s ease;
        }

        .menu-toggle.active span:nth-child(1) {
          transform: rotate(45deg) translate(7px, 7px);
        }

        .menu-toggle.active span:nth-child(2) {
          opacity: 0;
        }

        .menu-toggle.active span:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -7px);
        }

        @media (max-width: 960px) {
          .menu-toggle {
            display: flex;
          }

          .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            flex-direction: column;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            padding: 2rem;
            gap: 1.5rem;
            transform: translateY(-100%);
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s ease;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          }

          .nav-links.active {
            transform: translateY(0);
            opacity: 1;
            pointer-events: all;
          }

          .user-info {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      </style>

      <nav>
        <div class="nav-container">
          <a href="#/" class="logo">
            <span>💙 VITAL</span>
            ${user ? `
              <div class="user-info">
                <span>${user.name}</span>
                <span class="user-role">${authService.getRoleName(user.role)}</span>
              </div>
            ` : ''}
          </a>

          <ul class="nav-links">
            ${menuItems.map(item => `
              <li>
                <a 
                  href="${item.href}" 
                  class="nav-link ${item.cta ? 'nav-cta' : ''} ${currentHash === item.href ? 'active' : ''}"
                >
                  <span>${item.icon}</span>
                  <span>${item.label}</span>
                </a>
              </li>
            `).join('')}
            ${user ? '<li><button class="logout-btn">🚪 Salir</button></li>' : ''}
          </ul>

          <button class="menu-toggle" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    `;

    this.setupEventListeners();
  }
}

customElements.define('dynamic-navbar', DynamicNavbar);
