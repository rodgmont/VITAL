/**
 * VITAL v2.0 - Dynamic Navbar Component
 * 
 * Navegación que se adapta al rol del usuario
 */

import { authService } from '../services/auth.service.js';
import { navigationService } from '../services/navigation.service.js';

class DynamicNavbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // Sync with navigation service
    this.currentMode = navigationService.getCurrentMode();
    // Track menu state
    this.menuOpen = false;
    // Unsubscribe functions
    this.unsubscribers = [];
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.setupNavigationListeners();

    // Re-render when hash changes
    window.addEventListener('hashchange', () => this.render());
  }

  disconnectedCallback() {
    // Clean up listeners
    this.unsubscribers.forEach(unsub => unsub());
    this.unsubscribers = [];
  }

  setupNavigationListeners() {
    // Listen to mode changes
    const unsubMode = navigationService.on('modeChanged', (mode) => {
      this.currentMode = mode;
      this.render();
      this.setupEventListeners();
    });

    // Listen to route changes
    const unsubRoute = navigationService.on('routeChanged', () => {
      this.render();
      this.setupEventListeners();
    });

    this.unsubscribers.push(unsubMode, unsubRoute);
  }

  switchMode(mode) {
    // Keep menu state when switching modes
    const wasOpen = this.menuOpen;
    
    // Update mode through navigation service
    navigationService.setMode(mode);
    this.currentMode = mode;
    
    // Render will be triggered by navigation service event
    // But we need to restore menu state
    if (wasOpen) {
      setTimeout(() => {
        const navLinks = this.shadowRoot.querySelector('.nav-links');
        const menuToggle = this.shadowRoot.querySelector('.menu-toggle');
        if (navLinks && menuToggle) {
          navLinks.classList.add('active');
          menuToggle.classList.add('active');
          this.menuOpen = true;
        }
      }, 0);
    }
  }

  setupEventListeners() {
    const menuToggle = this.shadowRoot.querySelector('.menu-toggle');
    const navLinks = this.shadowRoot.querySelector('.nav-links');

    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        // Update menu state
        this.menuOpen = navLinks.classList.contains('active');
      });
    }

    // Close menu when clicking on a link
    const links = this.shadowRoot.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks?.classList.remove('active');
        menuToggle?.classList.remove('active');
        // Update menu state
        this.menuOpen = false;
      });
    });

    // Context Menu Logic
    const logo = this.shadowRoot.querySelector('.logo');
    const contextMenu = this.shadowRoot.querySelector('.context-menu');
    const contextOptions = this.shadowRoot.querySelectorAll('.context-option');

    if (logo && contextMenu) {
      // Show context menu on right click
      logo.addEventListener('contextmenu', (e) => {
        e.preventDefault(); // Prevent default browser context menu
        
        // Position menu near the cursor
        const x = e.clientX;
        const y = e.clientY;
        
        contextMenu.style.left = `${x}px`;
        contextMenu.style.top = `${y}px`;
        contextMenu.classList.add('visible');
      });

      // Hide menu on click outside
      document.addEventListener('click', () => {
        contextMenu.classList.remove('visible');
      });

      // Also hide on scroll
      window.addEventListener('scroll', () => {
        contextMenu.classList.remove('visible');
      });
    }

    // Handle context menu option clicks
    if (contextOptions) {
      contextOptions.forEach(opt => {
        opt.addEventListener('click', (e) => {
          e.stopPropagation(); // Prevent document click from firing immediately (though menu should close anyway)
          const mode = opt.dataset.mode;
          this.switchMode(mode);
          contextMenu.classList.remove('visible');
        });
      });
    }
  }

  getMenuItems() {
    // Get modules from navigation service
    const modules = navigationService.getModulesByMode(this.currentMode);
    
    // Transform to format expected by render
    return modules.map(module => ({
      label: module.label,
      href: `#${module.path}`,
      icon: module.icon
    }));
  }

  render() {
    const menuItems = this.getMenuItems();
    const currentHash = window.location.hash || '#/';
    // Sync current mode with navigation service
    this.currentMode = navigationService.getCurrentMode();

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: sticky;
          top: 0;
          z-index: 100;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        nav {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }

        .nav-container {
          max-width: 1600px;
          margin: 0 auto;
          padding: 0.75rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
          gap: 1rem;
        }

        .left-section {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding-right: 1.5rem;
          border-right: 1px solid rgba(0,0,0,0.08);
          margin-right: 0.5rem;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          color: #1AB8B8;
          font-family: 'Outfit', sans-serif;
          font-size: 1.4rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          transition: opacity 0.2s;
          cursor: context-menu;
        }

        .logo:hover {
          opacity: 0.8;
        }

        /* Context Menu Styles */
        .context-menu {
          position: fixed;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          padding: 0.5rem;
          min-width: 200px;
          opacity: 0;
          visibility: hidden;
          transform: scale(0.95);
          transition: all 0.2s ease;
          z-index: 1000;
          border: 1px solid rgba(0,0,0,0.05);
        }

        .context-menu.visible {
          opacity: 1;
          visibility: visible;
          transform: scale(1);
        }

        .context-header {
          padding: 0.5rem 1rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: #9CA3AF;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid #F3F4F6;
          margin-bottom: 0.5rem;
        }

        .context-option {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.75rem 1rem;
          border: none;
          background: none;
          text-align: left;
          cursor: pointer;
          border-radius: 8px;
          color: #374151;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .context-option:hover {
          background: #F3F4F6;
          color: #1AB8B8;
        }

        .context-option.active {
          background: #E0F2F1;
          color: #00695C;
        }

        /* Navigation Links */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          list-style: none;
          margin: 0;
          padding: 0;
          flex: 1;
          justify-content: flex-end;
          overflow: visible;
        }

        .nav-link {
          text-decoration: none;
          color: #4B5563;
          font-weight: 500;
          font-size: 0.85rem;
          transition: all 0.2s ease;
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          white-space: nowrap;
          border: 1px solid transparent;
        }

        .nav-link:hover {
          background: #F3F4F6;
          color: #111827;
        }

        .nav-link.active {
          background: #E0F2F1;
          color: #0F766E;
          font-weight: 600;
          border-color: rgba(26, 184, 184, 0.1);
        }

        .nav-link span:first-child {
          font-size: 1.1em;
          line-height: 1;
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
          width: 24px;
          height: 2px;
          background: #374151;
          border-radius: 2px;
          transition: all 0.3s;
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

        @media (max-width: 1200px) {
          .menu-toggle {
            display: flex;
          }

          .nav-links {
            position: fixed;
            top: 64px;
            left: 0;
            right: 0;
            bottom: 0;
            flex-direction: column;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(16px);
            padding: 2rem;
            gap: 0.5rem;
            transform: translateY(20px);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border-top: 1px solid rgba(0, 0, 0, 0.05);
            overflow-y: auto;
            height: calc(100vh - 64px);
            justify-content: flex-start;
            display: none;
          }

          .nav-links.active {
            display: flex;
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
          }

          .nav-link {
            font-size: 1rem;
            padding: 1rem;
            width: 100%;
            border-radius: 12px;
          }
          
          .nav-link:hover {
            background: #F9FAFB;
            transform: translateX(4px);
          }
        }

        @media (max-width: 768px) {
          .nav-container {
            padding: 0.75rem 1rem;
          }
          
          .left-section {
            border-right: none;
            gap: 1rem;
          }

          .logo {
            font-size: 1.2rem;
          }
        }
      </style>

      <nav>
        <div class="nav-container">
          <div class="left-section">
            <a href="#/" class="logo" title="Right click to switch mode">
              <span>💙 VITAL</span>
            </a>
          </div>

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
          </ul>

          <button class="menu-toggle" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <!-- Hidden Context Menu for Demo Mode Switching -->
      <div class="context-menu">
        <div class="context-header">Demo Switcher</div>
        <button class="context-option ${this.currentMode === 'user' ? 'active' : ''}" data-mode="user">
          <span>👤</span> VITAL Persona
        </button>
        <button class="context-option ${this.currentMode === 'business' ? 'active' : ''}" data-mode="business">
          <span>🏢</span> VITAL Asistent
        </button>
      </div>
    `;

    this.setupEventListeners();
  }
}

customElements.define('dynamic-navbar', DynamicNavbar);