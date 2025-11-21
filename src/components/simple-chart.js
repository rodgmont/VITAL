/**
 * VITAL - Simple Chart Component
 * 
 * Componente de gráfico simple usando SVG para mostrar tendencias
 */

class SimpleChart extends HTMLElement {
    static get observedAttributes() {
        return ['data', 'width', 'height', 'color'];
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

    get data() {
        try {
            return JSON.parse(this.getAttribute('data') || '[]');
        } catch {
            return [];
        }
    }

    get width() {
        return parseInt(this.getAttribute('width')) || 300;
    }

    get height() {
        return parseInt(this.getAttribute('height')) || 150;
    }

    get color() {
        return this.getAttribute('color') || '#1AB8B8';
    }

    generatePath() {
        const data = this.data;
        if (!data.length) return '';

        const max = Math.max(...data);
        const min = Math.min(...data);
        const range = max - min || 1;

        const width = this.width;
        const height = this.height;
        const padding = 20;

        const points = data.map((value, index) => {
            const x = padding + (index / (data.length - 1)) * (width - padding * 2);
            const y = height - padding - ((value - min) / range) * (height - padding * 2);
            return `${x},${y}`;
        });

        return `M ${points.join(' L ')}`;
    }

    generateAreaPath() {
        const linePath = this.generatePath();
        if (!linePath) return '';

        const width = this.width;
        const height = this.height;
        const padding = 20;

        return `${linePath} L ${width - padding},${height - padding} L ${padding},${height - padding} Z`;
    }

    render() {
        const linePath = this.generatePath();
        const areaPath = this.generateAreaPath();
        const data = this.data;

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        svg {
          width: 100%;
          height: auto;
          border-radius: 0.5rem;
        }

        .area {
          fill: ${this.color};
          fill-opacity: 0.1;
          animation: fadeIn 0.6s ease-out;
        }

        .line {
          fill: none;
          stroke: ${this.color};
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
          animation: drawLine 1s ease-out;
        }

        .point {
          fill: ${this.color};
          animation: scaleIn 0.4s ease-out;
          animation-fill-mode: both;
        }

        @keyframes drawLine {
          from {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
          }
          to {
            stroke-dasharray: 1000;
            stroke-dashoffset: 0;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        .no-data {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          color: #999;
          text-align: center;
          padding: 2rem;
        }
      </style>

      ${data.length > 0 ? `
        <svg viewBox="0 0 ${this.width} ${this.height}" preserveAspectRatio="xMidYMid meet">
          <!-- Area bajo la línea -->
          <path class="area" d="${areaPath}" />
          
          <!-- Línea principal -->
          <path class="line" d="${linePath}" />
          
          <!-- Puntos de datos -->
          ${data.map((value, index) => {
            const max = Math.max(...data);
            const min = Math.min(...data);
            const range = max - min || 1;
            const padding = 20;
            const x = padding + (index / (data.length - 1)) * (this.width - padding * 2);
            const y = this.height - padding - ((value - min) / range) * (this.height - padding * 2);
            return `<circle class="point" cx="${x}" cy="${y}" r="4" style="animation-delay: ${index * 0.05}s" />`;
        }).join('')}
        </svg>
      ` : `
        <div class="no-data">No hay datos disponibles</div>
      `}
    `;
    }
}

customElements.define('simple-chart', SimpleChart);
