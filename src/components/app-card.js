/**
 * VITAL - App Card Component
 * 
 * Componente de tarjeta reutilizable
 */

class AppCard extends HTMLElement {
    static get observedAttributes() {
        return ['variant', 'hoverable'];
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

    get variant() {
        return this.getAttribute('variant') || 'default';
    }

    get hoverable() {
        return this.hasAttribute('hoverable');
    }

    render() {
        const variant = this.variant;
        const hoverable = this.hoverable;

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .card {
          background: white;
          border-radius: 1.5rem;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .card.hoverable:hover {
          box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
          transform: translateY(-4px);
        }

        .card.primary {
          background: linear-gradient(135deg, hsl(174, 80%, 95%) 0%, white 100%);
          border: 1px solid hsl(174, 75%, 88%);
        }

        .card.secondary {
          background: linear-gradient(135deg, hsl(142, 70%, 95%) 0%, white 100%);
          border: 1px solid hsl(142, 65%, 85%);
        }

        .card.glass {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        ::slotted([slot="header"]) {
          margin-bottom: 1rem;
          font-family: 'Outfit', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #333;
        }

        ::slotted([slot="footer"]) {
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }
      </style>

      <div class="card ${variant} ${hoverable ? 'hoverable' : ''}">
        <slot name="header"></slot>
        <slot></slot>
        <slot name="footer"></slot>
      </div>
    `;
    }
}

customElements.define('app-card', AppCard);
