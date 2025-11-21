/**
 * VITAL - App Navbar Component
 * 
 * Navegación principal de la aplicación
 */

class AppNavbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
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
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    render() {
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
          max-width: 1280px;
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

        .logo-text {
          letter-spacing: -0.5px;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          text-decoration: none;
          color: #333;
          font-weight: 500;
          font-size: 0.95rem;
          transition: color 0.3s ease;
          position: relative;
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
        }

        .nav-cta {
          background: #1AB8B8;
          color: white;
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

        /* Responsive */
        @media (max-width: 768px) {
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

          .nav-link {
            font-size: 1.1rem;
            padding: 0.5rem 0;
          }

          .nav-cta {
            display: inline-block;
            text-align: center;
          }
        }
      </style>

      <nav>
        <div class="nav-container">
          <a href="#/" class="logo">
            <span class="logo-text">VITAL</span>
          </a>

          <ul class="nav-links">
            <li><a href="#/" class="nav-link">Inicio</a></li>
            <li><a href="#/dashboard" class="nav-link">Panel</a></li>
            <li><a href="#/indicators" class="nav-link">Indicadores</a></li>
            <li><a href="#/recommendations" class="nav-link">Recomendaciones</a></li>
            <li><a href="#/alerts" class="nav-link">Alertas</a></li>
            <li><a href="#/profile" class="nav-link nav-cta">Mi Perfil</a></li>
          </ul>

          <button class="menu-toggle" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    `;
    }
}

customElements.define('app-navbar', AppNavbar);
