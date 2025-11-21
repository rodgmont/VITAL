/**
 * VITAL - Alert Card Component
 * 
 * Componente para mostrar alertas tempranas
 */

class AlertCard extends HTMLElement {
    static get observedAttributes() {
        return ['severity', 'title', 'timestamp'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    get severity() {
        return this.getAttribute('severity') || 'info';
    }

    get title() {
        return this.getAttribute('title') || 'Alerta';
    }

    get timestamp() {
        return this.getAttribute('timestamp') || new Date().toISOString();
    }

    getSeverityConfig() {
        const configs = {
            info: {
                color: '#3B82F6',
                bg: '#DBEAFE',
                icon: 'ℹ️'
            },
            warning: {
                color: '#F59E0B',
                bg: '#FEF3C7',
                icon: '⚠️'
            },
            critical: {
                color: '#EF4444',
                bg: '#FEE2E2',
                icon: '🚨'
            }
        };
        return configs[this.severity] || configs.info;
    }

    formatTimestamp() {
        const date = new Date(this.timestamp);
        return date.toLocaleString('es-ES', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    render() {
        const config = this.getSeverityConfig();
        const formattedTime = this.formatTimestamp();

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .alert {
          background: white;
          border-radius: 1rem;
          padding: 1.25rem;
          border-left: 4px solid ${config.color};
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        .alert:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
          transform: translateX(4px);
        }

        .alert-header {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .alert-icon {
          font-size: 1.5rem;
          line-height: 1;
        }

        .alert-content {
          flex: 1;
        }

        .alert-title {
          font-family: 'Outfit', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .alert-message {
          font-size: 0.95rem;
          color: #666;
          line-height: 1.5;
        }

        .alert-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
          padding-top: 0.75rem;
          border-top: 1px solid #E5E7EB;
        }

        .alert-timestamp {
          font-size: 0.8rem;
          color: #999;
          font-style: italic;
        }

        .alert-badge {
          padding: 0.25rem 0.75rem;
          font-size: 0.75rem;
          font-weight: 600;
          border-radius: 999px;
          background: ${config.bg};
          color: ${config.color};
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      </style>

      <div class="alert">
        <div class="alert-header">
          <span class="alert-icon">${config.icon}</span>
          <div class="alert-content">
            <h4 class="alert-title">${this.title}</h4>
            <div class="alert-message">
              <slot></slot>
            </div>
          </div>
        </div>
        <div class="alert-footer">
          <span class="alert-timestamp">${formattedTime}</span>
          <span class="alert-badge">${this.severity}</span>
        </div>
      </div>
    `;
    }
}

customElements.define('alert-card', AlertCard);
