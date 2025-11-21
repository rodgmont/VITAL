/**
 * VITAL v2.0 - Reports and Analytics View
 * 
 * Vista para generación y visualización de reportes personalizados
 */

import { authService } from '../../services/auth.service.js';

export function renderReportsView() {
  const user = authService.getCurrentUser() || { name: 'Usuario Demo', role: 'admin_general' };

  return `
    <div class="reports-container" style="padding: 2rem; max-width: 1400px; margin: 0 auto;">
      <!-- Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <div>
          <h1 style="margin: 0; font-size: 2rem; color: #1a1a1a;">📊 Reportes y Analíticas</h1>
          <p style="margin: 0.5rem 0 0; color: #666;">Genera reportes personalizados y exporta datos</p>
        </div>
        <app-button variant="primary" onclick="generateReport()">
          📄 Generar Reporte
        </app-button>
      </div>

      <!-- Quick Report Templates -->
      <div style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.25rem; margin-bottom: 1rem;">⚡ Plantillas Rápidas</h2>
        <div class="report-templates" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
          ${renderReportTemplate('Resumen Mensual', 'Estadísticas generales del mes', 'monthly', '📅')}
          ${renderReportTemplate('Análisis de Riesgo', 'Pacientes con alto riesgo detectados', 'risk', '⚠️')}
          ${renderReportTemplate('Rendimiento de Promotores', 'Métricas de desempeño del equipo', 'promoters', '👥')}
          ${renderReportTemplate('Uso de Dispositivos', 'Estadísticas de smartbands', 'devices', '⌚')}
          ${renderReportTemplate('Cobertura Geográfica', 'Distribución por municipios', 'geographic', '🗺️')}
          ${renderReportTemplate('Impacto del Programa', 'ROI y métricas de éxito', 'impact', '💰')}
        </div>
      </div>

      <!-- Custom Report Builder -->
      <div style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 2rem;">
        <h2 style="font-size: 1.25rem; margin-bottom: 1.5rem;">🔧 Generador Personalizado</h2>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
          <!-- Left Column -->
          <div>
            <div style="margin-bottom: 1.5rem;">
              <label style="display: block; font-weight: 600; margin-bottom: 0.5rem;">Tipo de Reporte</label>
              <select id="reportType" style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem;">
                <option value="summary">Resumen Ejecutivo</option>
                <option value="detailed">Análisis Detallado</option>
                <option value="trends">Tendencias Temporales</option>
                <option value="comparison">Comparativo</option>
              </select>
            </div>

            <div style="margin-bottom: 1.5rem;">
              <label style="display: block; font-weight: 600; margin-bottom: 0.5rem;">Rango de Fechas</label>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                <input type="date" id="startDate" style="padding: 0.75rem; border: 1px solid #ddd; border-radius: 8px;">
                <input type="date" id="endDate" style="padding: 0.75rem; border: 1px solid #ddd; border-radius: 8px;">
              </div>
            </div>

            <div style="margin-bottom: 1.5rem;">
              <label style="display: block; font-weight: 600; margin-bottom: 0.5rem;">Formato de Exportación</label>
              <div style="display: flex; gap: 0.5rem;">
                <label style="flex: 1; padding: 0.75rem; border: 2px solid #ddd; border-radius: 8px; cursor: pointer; text-align: center; transition: all 0.3s;">
                  <input type="radio" name="format" value="pdf" style="margin-right: 0.5rem;">
                  📄 PDF
                </label>
                <label style="flex: 1; padding: 0.75rem; border: 2px solid #ddd; border-radius: 8px; cursor: pointer; text-align: center; transition: all 0.3s;">
                  <input type="radio" name="format" value="excel" style="margin-right: 0.5rem;">
                  📊 Excel
                </label>
                <label style="flex: 1; padding: 0.75rem; border: 2px solid #ddd; border-radius: 8px; cursor: pointer; text-align: center; transition: all 0.3s;">
                  <input type="radio" name="format" value="csv" checked style="margin-right: 0.5rem;">
                  📋 CSV
                </label>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div>
            <div style="margin-bottom: 1.5rem;">
              <label style="display: block; font-weight: 600; margin-bottom: 0.5rem;">Métricas a Incluir</label>
              <div style="max-height: 200px; overflow-y: auto; border: 1px solid #ddd; border-radius: 8px; padding: 1rem;">
                ${renderCheckboxOption('Pacientes Activos', 'patients', true)}
                ${renderCheckboxOption('Alertas Generadas', 'alerts')}
                ${renderCheckboxOption('Referencias Médicas', 'references')}
                ${renderCheckboxOption('Visitas de Promotores', 'visits')}
                ${renderCheckboxOption('Uso de Dispositivos', 'devices')}
                ${renderCheckboxOption('Detección de Riesgos', 'risks', true)}
                ${renderCheckboxOption('Cobertura Geográfica', 'coverage')}
                ${renderCheckboxOption('Ahorro Estimado', 'savings')}
              </div>
            </div>

            <div>
              <label style="display: block; font-weight: 600; margin-bottom: 0.5rem;">Filtros Adicionales</label>
              <select id="filters" multiple style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 8px; height: 100px;">
                <option value="age">Por Rango de Edad</option>
                <option value="gender">Por Sexo</option>
                <option value="municipality">Por Municipio</option>
                <option value="risk">Por Nivel de Riesgo</option>
                <option value="promoter">Por Promotor</option>
              </select>
            </div>
          </div>
        </div>

        <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #eee; display: flex; gap: 1rem; justify-content: flex-end;">
          <app-button variant="outline" onclick="resetForm()">🔄 Limpiar</app-button>
          <app-button variant="primary" onclick="generateCustomReport()">✨ Generar Reporte</app-button>
        </div>
      </div>

      <!-- Recent Reports -->
      <div style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <h2 style="font-size: 1.25rem; margin: 0;">📚 Reportes Recientes</h2>
          <app-button variant="ghost" size="sm" onclick="viewAllReports()">Ver Todos →</app-button>
        </div>

        <advanced-table
          data-items='${JSON.stringify(getMockReports())}'
          data-columns='${JSON.stringify([
    { key: 'name', label: 'Nombre', sortable: true },
    { key: 'type', label: 'Tipo', type: 'badge' },
    { key: 'date', label: 'Fecha', type: 'date', sortable: true },
    { key: 'size', label: 'Tamaño' },
    { key: 'format', label: 'Formato' },
    { key: 'status', label: 'Estado', type: 'badge' }
  ])}'
          data-page-size="5"
          data-searchable="true"
        ></advanced-table>
      </div>

      <!-- Analytics Dashboard -->
      <div style="margin-top: 2rem;">
        <h2 style="font-size: 1.5rem; margin-bottom: 1.5rem;">📈 Analíticas en Tiempo Real</h2>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
          <kpi-card
            title="Reportes Generados"
            value="247"
            change="+12.5"
            trend="positive"
            icon="📊"
            color="#1AB8B8"
          >
            <span slot="footer">Este mes</span>
          </kpi-card>

          <kpi-card
            title="Exportaciones"
            value="589"
            change="+8.2"
            trend="positive"
            icon="📥"
            color="#4F46E5"
          >
            <span slot="footer">Últimos 30 días</span>
          </kpi-card>

          <kpi-card
            title="Usuarios Activos"
            value="42"
            change="+5.0"
            trend="positive"
            icon="👥"
            color="#10B981"
          >
            <span slot="footer">En reportería</span>
          </kpi-card>
        </div>

        <!-- Charts -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
          <div style="background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <h3 style="margin: 0 0 1rem; font-size: 1.1rem;">Reportes por Tipo</h3>
            <multi-series-chart
              data-series='${JSON.stringify([
    { name: 'Resumen', color: '#1AB8B8', data: [12, 19, 15, 23, 18, 25, 22] },
    { name: 'Detallado', color: '#4F46E5', data: [8, 12, 10, 15, 12, 18, 16] },
    { name: 'Tendencias', color: '#10B981', data: [5, 8, 6, 10, 8, 12, 10] }
  ])}'
              data-labels='["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]'
              data-height="250"
            ></multi-series-chart>
          </div>

          <div style="background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <h3 style="margin: 0 0 1rem; font-size: 1.1rem;">Exportaciones por Formato</h3>
            <multi-series-chart
              data-series='${JSON.stringify([
    { name: 'PDF', color: '#EF4444', data: [45, 52, 48, 60, 55, 68, 62] },
    { name: 'Excel', color: '#10B981', data: [35, 42, 38, 48, 42, 52, 48] },
    { name: 'CSV', color: '#F59E0B', data: [25, 30, 28, 35, 32, 38, 35] }
  ])}'
              data-labels='["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]'
              data-height="250"
            ></multi-series-chart>
          </div>
        </div>
      </div>
    </div>

    <script>
      function generateReport() {
        alert('🚀 Generando reporte... Esta funcionalidad se conectará con el backend.');
      }

      function generateCustomReport() {
        const type = document.getElementById('reportType').value;
        const format = document.querySelector('input[name="format"]:checked').value;
        alert(\`✨ Generando reporte personalizado:\\n- Tipo: \${type}\\n- Formato: \${format}\`);
      }

      function resetForm() {
        document.getElementById('reportType').value = 'summary';
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
      }

      function viewAllReports() {
        alert('📚 Ver todos los reportes - Próximamente');
      }

      // Set default dates
      const today = new Date();
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
      document.getElementById('endDate').valueAsDate = today;
      document.getElementById('startDate').valueAsDate = lastMonth;
    </script>
  `;
}

function renderReportTemplate(title, description, type, icon) {
  return `
    <div style="background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.05); cursor: pointer; transition: all 0.3s; border: 2px solid transparent;" 
         onmouseover="this.style.borderColor='#1AB8B8'; this.style.transform='translateY(-4px)'" 
         onmouseout="this.style.borderColor='transparent'; this.style.transform='translateY(0)'"
         onclick="alert('Generando ${title}...')">
      <div style="font-size: 2rem; margin-bottom: 0.5rem;">${icon}</div>
      <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #1a1a1a;">${title}</h3>
      <p style="margin: 0; font-size: 0.85rem; color: #666; line-height: 1.4;">${description}</p>
    </div>
  `;
}

function renderCheckboxOption(label, value, checked = false) {
  return `
    <label style="display: flex; align-items: center; padding: 0.5rem; cursor: pointer; border-radius: 6px; transition: background 0.2s;"
           onmouseover="this.style.background='#f5f5f5'"
           onmouseout="this.style.background='transparent'">
      <input type="checkbox" value="${value}" ${checked ? 'checked' : ''} style="margin-right: 0.75rem;">
      <span style="font-size: 0.95rem;">${label}</span>
    </label>
  `;
}

function getMockReports() {
  return [
    {
      name: 'Resumen Mensual - Octubre 2024',
      type: 'Resumen',
      date: '2024-10-31',
      size: '2.4 MB',
      format: 'PDF',
      status: 'completed'
    },
    {
      name: 'Análisis de Riesgo - Q3 2024',
      type: 'Detallado',
      date: '2024-09-30',
      size: '5.8 MB',
      format: 'Excel',
      status: 'completed'
    },
    {
      name: 'Rendimiento Promotores - Septiembre',
      type: 'Rendimiento',
      date: '2024-09-28',
      size: '1.2 MB',
      format: 'PDF',
      status: 'completed'
    },
    {
      name: 'Cobertura Geográfica 2024',
      type: 'Geográfico',
      date: '2024-09-15',
      size: '3.1 MB',
      format: 'PDF',
      status: 'completed'
    },
    {
      name: 'Impacto del Programa - Anual',
      type: 'Impacto',
      date: '2024-08-30',
      size: '4.5 MB',
      format: 'Excel',
      status: 'completed'
    }
  ];
}
