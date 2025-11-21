/**
 * VITAL v2.0 - Medical References View
 * 
 * Vista para gestión del sistema de referencias médicas
 */

import { authService } from '../../services/auth.service.js';

export function renderReferencesView() {

  return `
    <div class="references-container" style="padding: 2rem; max-width: 1400px; margin: 0 auto;">
      <!-- Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <div>
          <h1 style="margin: 0; font-size: 2rem; color: #1a1a1a;">🏥 Sistema de Referencias</h1>
          <p style="margin: 0.5rem 0 0; color: #666;">Gestión de derivaciones a unidades de salud</p>
        </div>
        <app-button variant="primary" onclick="createNewReference()">
          ➕ Nueva Referencia
        </app-button>
      </div>

      <!-- Stats Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
        <kpi-card
          title="Referencias Activas"
          value="127"
          change="+15.3"
          trend="positive"
          icon="📋"
          color="#F59E0B"
        >
          <span slot="footer">En proceso</span>
        </kpi-card>

        <kpi-card
          title="Atendidas Hoy"
          value="34"
          change="+8.2"
          trend="positive"
          icon="✅"
          color="#10B981"
        >
          <span slot="footer">De 45 programadas</span>
        </kpi-card>

        <kpi-card
          title="Pendientes"
          value="18"
          change="-12.5"
          trend="positive"
          icon="⏳"
          color="#3B82F6"
        >
          <span slot="footer">Últimas 24h</span>
        </kpi-card>

        <kpi-card
          title="Tiempo Promedio"
          value="3.2"
          change="-5.8"
          trend="positive"
          icon="⏱️"
          color="#8B5CF6"
        >
          <span slot="footer">Días hasta atención</span>
        </kpi-card>

        <kpi-card
          title="Tasa de Cumplimiento"
          value="89.4%"
          change="+2.1"
          trend="positive"
          icon="📊"
          color="#1AB8B8"
        >
          <span slot="footer">Pacientes asisten</span>
        </kpi-card>
      </div>

      <!-- Filter Tabs -->
      <div style="margin-bottom: 2rem; display: flex; gap: 1rem; border-bottom: 2px solid #E5E7EB;">
        ${renderTab('Todas', 'all', true)}
        ${renderTab('Pendientes', 'pending')}
        ${renderTab('En Proceso', 'inprogress')}
        ${renderTab('Atendidas', 'completed')}
        ${renderTab('Canceladas', 'cancelled')}
      </div>

      <!-- References Table -->
      <div style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 2rem;">
        <advanced-table
          data-items='${JSON.stringify(getMockReferences())}'
          data-columns='${JSON.stringify([
    { key: 'refId', label: 'ID Referencia', sortable: true },
    { key: 'patientName', label: 'Paciente', sortable: true },
    { key: 'reason', label: 'Motivo' },
    { key: 'priority', label: 'Prioridad', type: 'badge' },
    { key: 'healthUnit', label: 'Unidad de Salud' },
    { key: 'referredBy', label: 'Referido Por' },
    { key: 'date', label: 'Fecha', type: 'date', sortable: true },
    { key: 'status', label: 'Estado', type: 'badge' }
  ])}'
          data-page-size="10"
          data-searchable="true"
          data-export="true"
        ></advanced-table>
      </div>

      <!-- Analytics Section -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
        <!-- References by Health Unit -->
        <div style="background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <h3 style="margin: 0 0 1rem; font-size: 1.1rem;">Referencias por Unidad de Salud</h3>
          <multi-series-chart
            data-series='${JSON.stringify([
    { name: 'Enviadas', color: '#3B82F6', data: [45, 52, 48, 60, 55, 68, 62] },
    { name: 'Atendidas', color: '#10B981', data: [38, 46, 42, 54, 48, 62, 56] }
  ])}'
            data-labels='["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]'
            data-height="250"
          ></multi-series-chart>
        </div>

        <!-- References by Priority -->
        <div style="background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <h3 style="margin: 0 0 1rem; font-size: 1.1rem;">Referencias por Prioridad</h3>
          <div style="display: grid; gap: 1rem;">
            ${renderPriorityBar('Alta', 45, '#EF4444')}
            ${renderPriorityBar('Media', 82, '#F59E0B')}
            ${renderPriorityBar('Baja', 127, '#10B981')}
          </div>

          <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #eee;">
            <h4 style="margin: 0 0 1rem; font-size: 0.95rem; color: #666;">Tiempo Promedio de Respuesta</h4>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; text-align: center;">
              <div style="background: #FEE2E2; padding: 1rem; border-radius: 8px;">
                <div style="font-size: 1.5rem; font-weight: 800; color: #EF4444;">1.2d</div>
                <div style="font-size: 0.8rem; color: #991B1B;">Alta</div>
              </div>
              <div style="background: #FEF3C7; padding: 1rem; border-radius: 8px;">
                <div style="font-size: 1.5rem; font-weight: 800; color: #F59E0B;">3.5d</div>
                <div style="font-size: 0.8rem; color: #92400E;">Media</div>
              </div>
              <div style="background: #D1FAE5; padding: 1rem; border-radius: 8px;">
                <div style="font-size: 1.5rem; font-weight: 800; color: #10B981;">7.1d</div>
                <div style="font-size: 0.8rem; color: #065F46;">Baja</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Health Units Performance -->
      <div style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <h2 style="margin: 0 0 1.5rem; font-size: 1.25rem;">🏥 Rendimiento de Unidades de Salud</h2>
        
        <div style="display: grid; gap: 1rem;">
          ${renderHealthUnitRow('Hospital Nacional Rosales', 145, 128, 88.3)}
          ${renderHealthUnitRow('ISSS San Salvador', 98, 92, 93.9)}
          ${renderHealthUnitRow('Hospital San Rafael', 76, 68, 89.5)}
          ${renderHealthUnitRow('UCSF Soyapango', 52, 47, 90.4)}
          ${renderHealthUnitRow('Hospital San Bartolo', 34, 28, 82.4)}
        </div>
      </div>
    </div>

    <script>
      function createNewReference() {
        alert('🏥 Crear Nueva Referencia - Modal se abrirá aquí');
      }

      function switchTab(tab) {
        document.querySelectorAll('.ref-tab').forEach(t => {
          t.style.borderBottom = '2px solid transparent';
          t.style.color = '#666';
        });
        event.target.style.borderBottom = '2px solid #1AB8B8';
        event.target.style.color = '#1AB8B8';
      }
    </script>
  `;
}

function renderTab(label, value, active = false) {
  return `
    <button 
      class="ref-tab"
      onclick="switchTab('${value}')"
      style="
        background: none;
        border: none;
        padding: 1rem 1.5rem;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        color: ${active ? '#1AB8B8' : '#666'};
        border-bottom: 2px solid ${active ? '#1AB8B8' : 'transparent'};
        transition: all 0.3s;
        margin-bottom: -2px;
      "
    >
      ${label}
    </button>
  `;
}

function renderPriorityBar(label, count, color) {
  const maxCount = 130;
  const percentage = (count / maxCount) * 100;

  return `
    <div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
        <span style="font-weight: 600; color: ${color};">${label}</span>
        <span style="font-weight: 700; color: ${color};">${count}</span>
      </div>
      <div style="background: #E5E7EB; border-radius: 999px; height: 12px; overflow: hidden;">
        <div style="background: ${color}; height: 100%; width: ${percentage}%; border-radius: 999px; transition: width 0.5s;"></div>
      </div>
    </div>
  `;
}

function renderHealthUnitRow(name, total, attended, percentage) {
  return `
    <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 1rem; align-items: center; padding: 1rem; border: 1px solid #E5E7EB; border-radius: 12px; transition: all 0.3s;"
         onmouseover="this.style.background='#F9FAFB'; this.style.borderColor='#1AB8B8'"
         onmouseout="this.style.background='transparent'; this.style.borderColor='#E5E7EB'">
      <div style="font-weight: 600;">${name}</div>
      <div style="text-align: center;">
        <div style="font-size: 0.8rem; color: #666;">Recibidas</div>
        <div style="font-size: 1.25rem; font-weight: 700; color: #1a1a1a;">${total}</div>
      </div>
      <div style="text-align: center;">
        <div style="font-size: 0.8rem; color: #666;">Atendidas</div>
        <div style="font-size: 1.25rem; font-weight: 700; color: #10B981;">${attended}</div>
      </div>
      <div style="text-align: center;">
        <div style="font-size: 0.8rem; color: #666;">Tasa</div>
        <div style="font-size: 1.25rem; font-weight: 700; color: ${percentage >= 90 ? '#10B981' : percentage >= 80 ? '#F59E0B' : '#EF4444'};">
          ${percentage.toFixed(1)}%
        </div>
      </div>
    </div>
  `;
}

function getMockReferences() {
  return [
    {
      refId: 'REF-2024-1247',
      patientName: 'María Hernández',
      reason: 'Hipertensión no controlada',
      priority: 'critical',
      healthUnit: 'Hospital Rosales',
      referredBy: 'Dr. Carlos Méndez',
      date: '2024-11-20',
      status: 'pending'
    },
    {
      refId: 'REF-2024-1246',
      patientName: 'José García',
      reason: 'Sospecha de diabetes',
      priority: 'warning',
      healthUnit: 'ISSS San Salvador',
      referredBy: 'Dra. Ana López',
      date: '2024-11-19',
      status: 'assigned'
    },
    {
      refId: 'REF-2024-1245',
      patientName: 'Carmen Flores',
      reason: 'Control de seguimiento',
      priority: 'info',
      healthUnit: 'UCSF Soyapango',
      referredBy: 'Dr. Pedro Martínez',
      date: '2024-11-18',
      status: 'completed'
    },
    {
      refId: 'REF-2024-1244',
      patientName: 'Roberto Sánchez',
      reason: 'Arritmia cardíaca',
      priority: 'critical',
      healthUnit: 'Hospital San Rafael',
      referredBy: 'Dra. Laura Ramos',
      date: '2024-11-17',
      status: 'assigned'
    },
    {
      refId: 'REF-2024-1243',
      patientName: 'Ana Rodríguez',
      reason: 'Consulta especializada',
      priority: 'warning',
      healthUnit: 'Hospital Rosales',
      referredBy: 'Dr. Carlos Méndez',
      date: '2024-11-16',
      status: 'completed'
    },
    {
      refId: 'REF-2024-1242',
      patientName: 'Luis Morales',
      reason: 'Exámenes de laboratorio',
      priority: 'info',
      healthUnit: 'ISSS San Salvador',
      referredBy: 'Dra. Ana López',
      date: '2024-11-15',
      status: 'completed'
    }
  ];
}
