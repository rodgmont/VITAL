/**
 * VITAL - App Button Component
 * 
 * Componente de botón con variantes y efectos
 */

class AppButton extends HTMLElement {
    static get observedAttributes() {
        return ['variant', 'size', 'disabled', 'loading'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    attributeChangedCallback() {
        this.render();
    }

    setupEventListeners() {
        const button = this.shadowRoot.querySelector('button');
        button.addEventListener('click', (e) => {
            if (!this.disabled && !this.loading) {
                this.createRipple(e);
            }
        });
    }

    createRipple(event) {
        const button = this.shadowRoot.querySelector('button');
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }

    get variant() {
        return this.getAttribute('variant') || 'primary';
    }

    get size() {
        return this.getAttribute('size') || 'md';
    }

    get disabled() {
        return this.hasAttribute('disabled');
    }

    get loading() {
        return this.hasAttribute('loading');
    }

    render() {
        const { variant, size, disabled, loading } = this;

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }

        button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }

        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Sizes */
        button.sm {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }

        button.md {
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
        }

        button.lg {
          padding: 1rem 2rem;
          font-size: 1.125rem;
          border-radius: 16px;
        }

        /* Variants */
        button.primary {
          background: #1AB8B8;
          color: white;
          box-shadow: 0 4px 12px rgba(26, 184, 184, 0.3);
        }

        button.primary:hover:not(:disabled) {
          background: #159a9a;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(26, 184, 184, 0.4);
        }

        button.secondary {
          background: hsl(142, 55%, 38%);
          color: white;
          box-shadow: 0 4px 12px rgba(74, 155, 107, 0.3);
        }

        button.secondary:hover:not(:disabled) {
          background: hsl(142, 60%, 30%);
          transform: translateY(-2px);
        }

        button.outline {
          background: transparent;
          color: #1AB8B8;
          border: 2px solid #1AB8B8;
          box-shadow: none;
        }

        button.outline:hover:not(:disabled) {
          background: #1AB8B8;
          color: white;
        }

        button.ghost {
          background: transparent;
          color: #1AB8B8;
          box-shadow: none;
        }

        button.ghost:hover:not(:disabled) {
          background: hsl(174, 80%, 95%);
        }

        /* Ripple Effect */
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          transform: scale(0);
          animation: ripple-animation 0.6s ease-out;
          pointer-events: none;
        }

        @keyframes ripple-animation {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }

        /* Loading Spinner */
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      </style>

      <button 
        class="${variant} ${size}" 
        ${disabled || loading ? 'disabled' : ''}
      >
        ${loading ? '<span class="spinner"></span>' : ''}
        <slot></slot>
      </button>
    `;
    }
}

customElements.define('app-button', AppButton);
