/**
 * VITAL - Advanced Table Component
 * 
 * Tabla avanzada con paginación, ordenamiento, filtros y búsqueda
 */

class AdvancedTable extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.sortColumn = null;
        this.sortDirection = 'asc';
        this.searchQuery = '';
        this.filters = {};
    }

    static get observedAttributes() {
        return ['data', 'columns', 'searchable', 'filterable'];
    }

    get data() {
        return JSON.parse(this.getAttribute('data') || '[]');
    }

    get columns() {
        return JSON.parse(this.getAttribute('columns') || '[]');
    }

    get searchable() {
        return this.hasAttribute('searchable');
    }

    get filterable() {
        return this.hasAttribute('filterable');
    }

    connectedCallback() {
        this.render();
        this.attachEventListeners();
    }

    attributeChangedCallback() {
        if (this.shadowRoot.innerHTML) {
            this.render();
            this.attachEventListeners();
        }
    }

    attachEventListeners() {
        // Search
        const searchInput = this.shadowRoot.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase();
                this.currentPage = 1;
                this.render();
            });
        }

        // Sort
        const sortButtons = this.shadowRoot.querySelectorAll('.sort-btn');
        sortButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const column = btn.dataset.column;
                if (this.sortColumn === column) {
                    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
                } else {
                    this.sortColumn = column;
                    this.sortDirection = 'asc';
                }
                this.render();
            });
        });

        // Pagination
        const prevBtn = this.shadowRoot.querySelector('.prev-btn');
        const nextBtn = this.shadowRoot.querySelector('.next-btn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.render();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const totalPages = this.getTotalPages();
                if (this.currentPage < totalPages) {
                    this.currentPage++;
                    this.render();
                }
            });
        }

        // Export
        const exportBtn = this.shadowRoot.querySelector('.export-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportToCSV());
        }
    }

    getFilteredData() {
        let filtered = [...this.data];

        // Search
        if (this.searchQuery) {
            filtered = filtered.filter(row => {
                return this.columns.some(col => {
                    const value = row[col.key];
                    return value && value.toString().toLowerCase().includes(this.searchQuery);
                });
            });
        }

        // Sort
        if (this.sortColumn) {
            filtered.sort((a, b) => {
                const aVal = a[this.sortColumn];
                const bVal = b[this.sortColumn];
                const compare = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
                return this.sortDirection === 'asc' ? compare : -compare;
            });
        }

        return filtered;
    }

    getPaginatedData() {
        const filtered = this.getFilteredData();
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return filtered.slice(start, end);
    }

    getTotalPages() {
        const filtered = this.getFilteredData();
        return Math.ceil(filtered.length / this.itemsPerPage);
    }

    exportToCSV() {
        const data = this.getFilteredData();
        const headers = this.columns.map(col => col.label).join(',');
        const rows = data.map(row => {
            return this.columns.map(col => {
                const value = row[col.key];
                return `"${value}"`;
            }).join(',');
        });

        const csv = [headers, ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'export.csv';
        a.click();
        URL.revokeObjectURL(url);
    }

    render() {
        const paginatedData = this.getPaginatedData();
        const totalPages = this.getTotalPages();
        const filteredData = this.getFilteredData();

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }

        .table-container {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        }

        .table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .search-box {
          flex: 1;
          min-width: 250px;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #E5E7EB;
          border-radius: 0.5rem;
          font-size: 0.95rem;
          transition: all 0.2s;
        }

        .search-input:focus {
          outline: none;
          border-color: #1AB8B8;
          box-shadow: 0 0 0 3px rgba(26, 184, 184, 0.1);
        }

        .table-actions {
          display: flex;
          gap: 0.75rem;
        }

        .export-btn {
          padding: 0.75rem 1.5rem;
          background: #1AB8B8;
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .export-btn:hover {
          background: #158c8c;
          transform: translateY(-2px);
        }

        .table-wrapper {
          overflow-x: auto;
          border-radius: 0.75rem;
          border: 1px solid #E5E7EB;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        thead {
          background: #F9FAFB;
        }

        th {
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          font-size: 0.875rem;
          color: #374151;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }

        .sort-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          cursor: pointer;
          color: inherit;
          font: inherit;
          padding: 0;
        }

        .sort-btn:hover {
          color: #1AB8B8;
        }

        .sort-icon {
          font-size: 0.75rem;
          opacity: 0.5;
        }

        .sort-icon.active {
          opacity: 1;
          color: #1AB8B8;
        }

        tbody tr {
          border-bottom: 1px solid #E5E7EB;
          transition: background 0.2s;
        }

        tbody tr:hover {
          background: #F9FAFB;
        }

        tbody tr:last-child {
          border-bottom: none;
        }

        td {
          padding: 1rem;
          font-size: 0.95rem;
          color: #1F2937;
        }

        .pagination {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #E5E7EB;
        }

        .pagination-info {
          font-size: 0.9rem;
          color: #6B7280;
        }

        .pagination-controls {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .page-btn {
          padding: 0.5rem 1rem;
          border: 1px solid #E5E7EB;
          background: white;
          border-radius: 0.5rem;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .page-btn:hover:not(:disabled) {
          background: #F9FAFB;
          border-color: #1AB8B8;
        }

        .page-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .page-number {
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
          color: #374151;
          font-weight: 600;
        }

        .empty-state {
          text-align: center;
          padding: 3rem 1rem;
          color: #6B7280;
        }

        .empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
          .table-header {
            flex-direction: column;
            align-items: stretch;
          }

          .search-box {
            min-width: 100%;
          }

          .pagination {
            flex-direction: column;
            gap: 1rem;
          }
        }
      </style>

      <div class="table-container">
        ${this.searchable ? `
          <div class="table-header">
            <div class="search-box">
              <input 
                type="text" 
                class="search-input" 
                placeholder="Buscar..." 
                value="${this.searchQuery}"
              />
            </div>
            <div class="table-actions">
              <button class="export-btn">📥 Exportar CSV</button>
            </div>
          </div>
        ` : ''}

        ${paginatedData.length > 0 ? `
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  ${this.columns.map(col => `
                    <th>
                      <button class="sort-btn" data-column="${col.key}">
                        ${col.label}
                        <span class="sort-icon ${this.sortColumn === col.key ? 'active' : ''}">
                          ${this.sortColumn === col.key ? (this.sortDirection === 'asc' ? '▲' : '▼') : '⇅'}
                        </span>
                      </button>
                    </th>
                  `).join('')}
                </tr>
              </thead>
              <tbody>
                ${paginatedData.map(row => `
                  <tr>
                    ${this.columns.map(col => `
                      <td>${this.formatCell(row[col.key], col.type)}</td>
                    `).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="pagination">
            <div class="pagination-info">
              Mostrando ${((this.currentPage - 1) * this.itemsPerPage) + 1} - 
              ${Math.min(this.currentPage * this.itemsPerPage, filteredData.length)} 
              de ${filteredData.length} resultados
            </div>
            <div class="pagination-controls">
              <button class="page-btn prev-btn" ${this.currentPage === 1 ? 'disabled' : ''}>
                ← Anterior
              </button>
              <span class="page-number">
                Página ${this.currentPage} de ${totalPages}
              </span>
              <button class="page-btn next-btn" ${this.currentPage >= totalPages ? 'disabled' : ''}>
                Siguiente →
              </button>
            </div>
          </div>
        ` : `
          <div class="empty-state">
            <div class="empty-icon">📊</div>
            <p>No se encontraron resultados</p>
          </div>
        `}
      </div>
    `;
    }

    formatCell(value, type) {
        if (value === null || value === undefined) return '-';

        switch (type) {
            case 'date':
                return new Date(value).toLocaleDateString('es-ES');
            case 'datetime':
                return new Date(value).toLocaleString('es-ES');
            case 'number':
                return Number(value).toLocaleString('es-ES');
            case 'badge':
                return `<span style="
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 600;
          background: #E0F2F1;
          color: #00695C;
        ">${value}</span>`;
            default:
                return value;
        }
    }
}

customElements.define('advanced-table', AdvancedTable);
