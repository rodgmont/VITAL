/**
 * VITAL - Status Badge Component
 * 
 * Badge de estado con colores y estilos predefinidos
 */

class StatusBadge extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['status', 'size'];
    }

    get status() {
        return this.getAttribute('status') || 'active';
    }

    get size() {
        return this.getAttribute('size') || 'md';
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        if (this.shadowRoot.innerHTML) {
            this.render();
        }
    }

    getStatusConfig() {
        const configs = {
            active: { color: '#10B981', bg: '#ECFDF5', label: 'Activo', icon: '●' },
            inactive: { color: '#6B7280', bg: '#F3F4F6', label: 'Inactivo', icon: '●' },
            pending: { color: '#F59E0B', bg: '#FEF3C7', label: 'Pendiente', icon: '●' },
            completed: { color: '#3B82F6', bg: '#DBEAFE', label: 'Completado', icon: '✓' },
            cancelled: { color: '#EF4444', bg: '#FEE2E2', label: 'Cancelado', icon: '✕' },
            critical: { color: '#DC2626', bg: '#FEE2E2', label: 'Crítico', icon: '⚠' },
            warning: { color: '#F59E0B', bg: '#FEF3C7', label: 'Advertencia', icon: '⚠' },
            info: { color: '#3B82F6', bg: '#DBEAFE', label: 'Info', icon: 'ℹ' },
            success: { color: '#10B981', bg: '#ECFDF5', label: 'Éxito', icon: '✓' },
            assigned: { color: '#8B5CF6', bg: '#F3E8FF', label: 'Asignado', icon: '●' },
            available: { color: '#10B981', bg: '#ECFDF5', label: 'Disponible', icon: '●' },
            maintenance: { color: '#F59E0B', bg: '#FEF3C7', label: 'Mantenimiento', icon: '🔧' },
            lost: { color: '#EF4444', bg: '#FEE2E2', label: 'Perdido', icon: '●' },
        };

        return configs[this.status] || configs.active;
    }

    getSizeStyles() {
        const sizes = {
            sm: { padding: '0.125rem 0.5rem', fontSize: '0.75rem' },
            md: { padding: '0.25rem 0.75rem', fontSize: '0.875rem' },
            lg: { padding: '0.375rem 1rem', fontSize: '0.95rem' },
        };

        return sizes[this.size] || sizes.md;
    }

    render() {
        const config = this.getStatusConfig();
        const sizeStyle = this.getSizeStyles();

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: ${sizeStyle.padding};
          background: ${config.bg};
          color: ${config.color};
          border-radius: 999px;
          font-size: ${sizeStyle.fontSize};
          font-weight: 600;
          white-space: nowrap;
          border: 1px solid ${config.color}20;
        }

        .icon {
          font-size: 0.8em;
        }
      </style>

      <span class="badge">
        <span class="icon">${config.icon}</span>
        <span>${config.label}</span>
      </span>
    `;
    }
}

customElements.define('status-badge', StatusBadge);
