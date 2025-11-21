/**
 * VITAL - Health Indicator Component
 * 
 * Componente para mostrar indicadores de salud con nivel visual
 */

class HealthIndicator extends HTMLElement {
    static get observedAttributes() {
        return ['label', 'value', 'max', 'unit', 'status'];
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

    get label() {
        return this.getAttribute('label') || 'Indicador';
    }

    get value() {
        return parseFloat(this.getAttribute('value')) || 0;
    }

    get max() {
        return parseFloat(this.getAttribute('max')) || 100;
    }

    get unit() {
        return this.getAttribute('unit') || '';
    }

    get status() {
        return this.getAttribute('status') || 'normal';
    }

    getStatusColor() {
        switch (this.status) {
            case 'good':
                return '#4A9B6B';
            case 'warning':
                return '#F59E0B';
            case 'critical':
                return '#EF4444';
            default:
                return '#1AB8B8';
        }
    }

    getPercentage() {
        return Math.min((this.value / this.max) * 100, 100);
    }

    render() {
        const percentage = this.getPercentage();
        const color = this.getStatusColor();

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .indicator {
          padding: 1.5rem;
        }

        .indicator-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 1rem;
        }

        .indicator-label {
          font-family: 'Outfit', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: #666;
        }

        .indicator-value {
          font-family: 'Outfit', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          color: ${color};
          line-height: 1;
        }

        .indicator-unit {
          font-size: 1rem;
          font-weight: 500;
          color: #999;
          margin-left: 0.25rem;
        }

        .progress-container {
          position: relative;
          width: 100%;
          height: 8px;
          background: #E5E7EB;
          border-radius: 999px;
          overflow: hidden;
        }

        .progress-bar {
          height: 100%;
          background: ${color};
          border-radius: 999px;
          transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          width: ${percentage}%;
        }

        .status-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          font-size: 0.75rem;
          font-weight: 600;
          border-radius: 999px;
          margin-top: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-good {
          background: #D1FAE5;
          color: #047857;
        }

        .status-warning {
          background: #FEF3C7;
          color: #D97706;
        }

        .status-critical {
          background: #FEE2E2;
          color: #DC2626;
        }

        .status-normal {
          background: #CCFBF1;
          color: #0F766E;
        }
      </style>

      <div class="indicator">
        <div class="indicator-header">
          <span class="indicator-label">${this.label}</span>
          <div>
            <span class="indicator-value">${this.value}</span>
            ${this.unit ? `<span class="indicator-unit">${this.unit}</span>` : ''}
          </div>
        </div>

        <div class="progress-container">
          <div class="progress-bar"></div>
        </div>

        <div class="status-badge status-${this.status}">
          ${this.status}
        </div>
      </div>
    `;
    }
}

customElements.define('health-indicator', HealthIndicator);
