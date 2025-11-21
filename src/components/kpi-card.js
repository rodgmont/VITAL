/**
 * VITAL - KPI Card Component
 * 
 * Tarjeta de indicador clave de rendimiento con comparativas y tendencias
 */

class KPICard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['title', 'value', 'change', 'change-type', 'icon', 'color'];
    }

    get title() {
        return this.getAttribute('title') || 'KPI';
    }

    get value() {
        return this.getAttribute('value') || '0';
    }

    get change() {
        return this.getAttribute('change') || null;
    }

    get changeType() {
        return this.getAttribute('change-type') || 'neutral'; // positive, negative, neutral
    }

    get icon() {
        return this.getAttribute('icon') || '📊';
    }

    get color() {
        return this.getAttribute('color') || '#1AB8B8';
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        if (this.shadowRoot.innerHTML) {
            this.render();
        }
    }

    getChangeColor() {
        switch (this.changeType) {
            case 'positive':
                return '#10B981';
            case 'negative':
                return '#EF4444';
            default:
                return '#6B7280';
        }
    }

    getChangeIcon() {
        switch (this.changeType) {
            case 'positive':
                return '↑';
            case 'negative':
                return '↓';
            default:
                return '→';
        }
    }

    render() {
        const changeColor = this.getChangeColor();
        const changeIcon = this.getChangeIcon();

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .kpi-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .kpi-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }

        .kpi-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: ${this.color};
        }

        .kpi-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .kpi-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: #6B7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0;
        }

        .kpi-icon {
          font-size: 2rem;
          opacity: 0.8;
        }

        .kpi-value {
          font-family: 'Outfit', sans-serif;
          font-size: 2.5rem;
          font-weight: 900;
          color: #1F2937;
          margin: 0.5rem 0;
          line-height: 1;
        }

        .kpi-change {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-size: 0.875rem;
          font-weight: 600;
          background: ${changeColor}15;
          color: ${changeColor};
        }

        .change-icon {
          font-size: 1rem;
          font-weight: bold;
        }

        .kpi-footer {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #E5E7EB;
          font-size: 0.8rem;
          color: #9CA3AF;
        }

        @media (max-width: 768px) {
          .kpi-value {
            font-size: 2rem;
          }

          .kpi-icon {
            font-size: 1.5rem;
          }
        }
      </style>

      <div class="kpi-card">
        <div class="kpi-header">
          <h3 class="kpi-title">${this.title}</h3>
          <span class="kpi-icon">${this.icon}</span>
        </div>
        
        <div class="kpi-value">${this.value}</div>
        
        ${this.change ? `
          <div class="kpi-change">
            <span class="change-icon">${changeIcon}</span>
            <span>${this.change}</span>
          </div>
        ` : ''}

        <div class="kpi-footer">
          <slot name="footer">Último mes</slot>
        </div>
      </div>
    `;
    }
}

customElements.define('kpi-card', KPICard);
