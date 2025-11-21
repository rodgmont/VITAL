/**
 * VITAL - Devices Inventory View
 * 
 * Vista de inventario y gestión de smartbands
 */

import { authService } from '../../services/auth.service.js';

// Mock data de dispositivos
const mockDevices = [
  { id: 'SB-2024-001', model: 'SmartBand Pro', status: 'assigned', assignedTo: 'María García', battery: 85, lastSync: '2024-11-21 10:30' },
  { id: 'SB-2024-002', model: 'SmartBand Pro', status: 'assigned', assignedTo: 'Carlos López', battery: 72, lastSync: '2024-11-21 09:15' },
  { id: 'SB-2024-003', model: 'SmartBand Lite', status: 'assigned', assignedTo: 'Rosa Hernández', battery: 45, lastSync: '2024-11-20 18:45' },
  { id: 'SB-2024-004', model: 'SmartBand Pro', status: 'assigned', assignedTo: 'José Martínez', battery: 18, lastSync: '2024-11-19 14:20' },
  { id: 'SB-2024-005', model: 'SmartBand Lite', status: 'available', assignedTo: '-', battery: 100, lastSync: '-' },
  { id: 'SB-2024-006', model: 'SmartBand Pro', status: 'assigned', assignedTo: 'Pedro Flores', battery: 93, lastSync: '2024-11-21 11:00' },
  { id: 'SB-2024-007', model: 'SmartBand Lite', status: 'maintenance', assignedTo: '-', battery: 0, lastSync: '2024-11-05 16:30' },
  { id: 'SB-2024-008', model: 'SmartBand Pro', status: 'assigned', assignedTo: 'Francisco Gómez', battery: 67, lastSync: '2024-11-21 08:45' },
  { id: 'SB-2024-009', model: 'SmartBand Lite', status: 'available', assignedTo: '-', battery: 100, lastSync: '-' },
  { id: 'SB-2024-010', model: 'SmartBand Pro', status: 'lost', assignedTo: 'Roberto Sánchez', battery: 0, lastSync: '2024-11-10 12:00' },
];

export function renderDevicesInventoryView() {
  const user = authService.getCurrentUser() || { name: 'Usuario Demo', role: 'admin_general' };

  const columns = [
    { key: 'id', label: 'ID Dispositivo', type: 'text' },
    { key: 'model', label: 'Modelo', type: 'text' },
    { key: 'status', label: 'Estado', type: 'badge' },
    { key: 'assignedTo', label: 'Asignado a', type: 'text' },
    { key: 'battery', label: 'Batería (%)', type: 'number' },
    { key: 'lastSync', label: 'Última Sync', type: 'text' }
  ];

  const totalDevices = mockDevices.length;
  const assigned = mockDevices.filter(d => d.status === 'assigned').length;
  const available = mockDevices.filter(d => d.status === 'available').length;
  const lowBattery = mockDevices.filter(d => d.battery > 0 && d.battery < 20).length;
  const avgBattery = (mockDevices.filter(d => d.battery > 0).reduce((sum, d) => sum + d.battery, 0) / mockDevices.filter(d => d.battery > 0).length).toFixed(0);

  return `
    <style>
      .devices-inventory {
        padding: 2rem;
        max-width: 1400px;
        margin: 0 auto;
      }

      .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        flex-wrap: wrap;
        gap: 1rem;
      }

      .page-title {
        font-family: 'Outfit', sans-serif;
        font-size: 2.5rem;
        font-weight: 900;
        color: #1F2937;
        margin: 0;
      }

      .header-actions {
        display: flex;
        gap: 1rem;
      }

      .btn-primary {
        padding: 0.75rem 1.5rem;
        background: linear-gradient(135deg, #1AB8B8, #4A9B6B);
        color: white;
        border: none;
        border-radius: 0.75rem;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
      }

      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(26, 184, 184, 0.3);
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
      }

      .stat-card {
        background: white;
        padding: 1.5rem;
        border-radius: 1rem;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
      }

      .stat-card.warning {
        background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
      }

      .stat-value {
        font-size: 2rem;
        font-weight: 900;
        color: #1F2937;
        margin: 0.5rem 0;
      }

      .stat-label {
        font-size: 0.9rem;
        color: #6B7280;
        margin: 0;
      }

      .alerts-section {
        background: white;
        border-radius: 1rem;
        padding: 1.5rem;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        margin-bottom: 2rem;
      }

      .alert-title {
        font-size: 1.1rem;
        font-weight: 700;
        color: #DC2626;
        margin: 0 0 1rem 0;
      }

      .alert-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .alert-item {
        padding: 0.75rem;
        border-left: 3px solid #EF4444;
        background: #FEE2E2;
        border-radius: 0.5rem;
        margin-bottom: 0.75rem;
        font-size: 0.95rem;
      }

      @media (max-width: 768px) {
        .devices-inventory {
          padding: 1rem;
        }

        .page-title {
          font-size: 2rem;
        }
      }
    </style>

    <div class="devices-inventory">
      <!-- Header -->
      <div class="page-header">
        <h1 class="page-title">Inventario de Dispositivos</h1>
        <div class="header-actions">
          <button class="btn-primary" onclick="alert('Funcionalidad próximamente')">➕ Registrar Dispositivo</button>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="stats-grid">
        <div class="stat-card">
          <p class="stat-label">Total Dispositivos</p>
          <div class="stat-value">${totalDevices}</div>
        </div>
        <div class="stat-card">
          <p class="stat-label">Asignados</p>
          <div class="stat-value">${assigned}</div>
        </div>
        <div class="stat-card">
          <p class="stat-label">Disponibles</p>
          <div class="stat-value">${available}</div>
        </div>
        <div class="stat-card ${lowBattery > 0 ? 'warning' : ''}">
          <p class="stat-label">🔋 Batería Baja</p>
          <div class="stat-value">${lowBattery}</div>
        </div>
        <div class="stat-card">
          <p class="stat-label">Batería Promedio</p>
          <div class="stat-value">${avgBattery}%</div>
        </div>
      </div>

      <!-- Alerts -->
      ${lowBattery > 0 ? `
        <div class="alerts-section">
          <h3 class="alert-title">⚠️ Alertas de Batería</h3>
          <ul class="alert-list">
            ${mockDevices
        .filter(d => d.battery > 0 && d.battery < 20)
        .map(d => `<li class="alert-item">Dispositivo ${d.id} (${d.assignedTo}): ${d.battery}% - Requiere recarga urgente</li>`)
        .join('')}
          </ul>
        </div>
      ` : ''}

      <!-- Devices Table -->
      <advanced-table
        data='${JSON.stringify(mockDevices)}'
        columns='${JSON.stringify(columns)}'
        searchable
        filterable
      ></advanced-table>
    </div>
  `;
}
