/**
 * VITAL - Multi-Series Chart Component
 * 
 * Gráfico avanzado SVG con múltiples series de datos
 */

class MultiSeriesChart extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['series', 'labels', 'width', 'height', 'title'];
    }

    get series() {
        return JSON.parse(this.getAttribute('series') || '[]');
    }

    get labels() {
        return JSON.parse(this.getAttribute('labels') || '[]');
    }

    get width() {
        return Number(this.getAttribute('width')) || 600;
    }

    get height() {
        return Number(this.getAttribute('height')) || 300;
    }

    get title() {
        return this.getAttribute('title') || '';
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        if (this.shadowRoot.innerHTML) {
            this.render();
        }
    }

    getMinMax() {
        const allValues = this.series.flatMap(s => s.data);
        return {
            min: Math.min(...allValues),
            max: Math.max(...allValues)
        };
    }

    generatePath(data, padding = 60) {
        if (data.length === 0) return '';

        const { min, max } = this.getMinMax();
        const range = max - min || 1;

        const chartWidth = this.width - (padding * 2);
        const chartHeight = this.height - (padding * 2);

        const xStep = chartWidth / (data.length - 1);

        const points = data.map((value, index) => {
            const x = padding + (index * xStep);
            const y = padding + chartHeight - ((value - min) / range * chartHeight);
            return `${x},${y}`;
        });

        return `M ${points.join(' L ')}`;
    }

    render() {
        const padding = 60;
        const { min, max } = this.getMinMax();

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }

        .chart-container {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        }

        .chart-title {
          font-family: 'Outfit', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #1F2937;
          margin: 0 0 1.5rem 0;
        }

        .chart-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: #6B7280;
        }

        .legend-color {
          width: 16px;
          height: 16px;
          border-radius: 3px;
        }

        svg {
          width: 100%;
          height: auto;
          display: block;
        }

        .grid-line {
          stroke: #E5E7EB;
          stroke-width: 1;
          stroke-dasharray: 4 4;
        }

        .axis-line {
          stroke: #9CA3AF;
          stroke-width: 2;
        }

        .axis-label {
          font-size: 12px;
          fill: #6B7280;
        }

        .data-line {
          fill: none;
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .data-point {
          fill: white;
          stroke-width: 2;
          cursor: pointer;
          transition: r 0.2s;
        }

        .data-point:hover {
          r: 8;
        }

        .tooltip {
          position: absolute;
          background: rgba(0, 0, 0, 0.9);
          color: white;
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s;
        }

        @media (max-width: 768px) {
          .chart-legend {
            gap: 1rem;
          }

          .legend-item {
            font-size: 0.8rem;
          }
        }
      </style>

      <div class="chart-container">
        ${this.title ? `<h3 class="chart-title">${this.title}</h3>` : ''}
        
        ${this.series.length > 0 ? `
          <div class="chart-legend">
            ${this.series.map(s => `
              <div class="legend-item">
                <div class="legend-color" style="background: ${s.color};"></div>
                <span>${s.name}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <svg 
          viewBox="0 0 ${this.width} ${this.height}" 
          preserveAspectRatio="xMidYMid meet"
        >
          <!-- Grid lines -->
          ${[0, 1, 2, 3, 4].map(i => {
            const y = padding + ((this.height - padding * 2) / 4) * i;
            return `<line class="grid-line" x1="${padding}" y1="${y}" x2="${this.width - padding}" y2="${y}" />`;
        }).join('')}

          <!-- Y axis -->
          <line class="axis-line" x1="${padding}" y1="${padding}" x2="${padding}" y2="${this.height - padding}" />
          
          <!-- X axis -->
          <line class="axis-line" x1="${padding}" y1="${this.height - padding}" x2="${this.width - padding}" y2="${this.height - padding}" />

          <!-- Y axis labels -->
          ${[0, 1, 2, 3, 4].map(i => {
            const value = max - ((max - min) / 4) * i;
            const y = padding + ((this.height - padding * 2) / 4) * i;
            return `<text class="axis-label" x="${padding - 10}" y="${y + 5}" text-anchor="end">${value.toFixed(0)}</text>`;
        }).join('')}

          <!-- X axis labels -->
          ${this.labels.map((label, index) => {
            const x = padding + ((this.width - padding * 2) / (this.labels.length - 1)) * index;
            return `<text class="axis-label" x="${x}" y="${this.height - padding + 25}" text-anchor="middle">${label}</text>`;
        }).join('')}

          <!-- Data lines and points -->
          ${this.series.map(serie => `
            <g>
              <path 
                class="data-line" 
                d="${this.generatePath(serie.data, padding)}" 
                stroke="${serie.color}"
              />
              ${serie.data.map((value, index) => {
            const range = max - min || 1;
            const chartWidth = this.width - (padding * 2);
            const chartHeight = this.height - (padding * 2);
            const xStep = chartWidth / (serie.data.length - 1);
            const x = padding + (index * xStep);
            const y = padding + chartHeight - ((value - min) / range * chartHeight);

            return `
                  <circle 
                    class="data-point" 
                    cx="${x}" 
                    cy="${y}" 
                    r="5" 
                    stroke="${serie.color}"
                  >
                    <title>${serie.name}: ${value}</title>
                  </circle>
                `;
        }).join('')}
            </g>
          `).join('')}
        </svg>
      </div>
    `;
    }
}

customElements.define('multi-series-chart', MultiSeriesChart);
