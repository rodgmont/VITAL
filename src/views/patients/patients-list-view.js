/**
 * VITAL - Patients List View
 * 
 * Vista de lista de pacientes con búsqueda y filtros
 */

import { authService } from '../../services/auth.service.js';

// Mock data de pacientes
const mockPatients = [
  { id: 1, name: 'María García', age: 45, gender: 'F', municipality: 'San Salvador', promoter: 'Juan Pérez', status: 'active', smartband: 'SB-2024-001', lastSync: '2024-11-20' },
  { id: 2, name: 'Carlos López', age: 52, gender: 'M', municipality: 'Santa Ana', promoter: 'Ana Martínez', status: 'active', smartband: 'SB-2024-002', lastSync: '2024-11-21' },
  { id: 3, name: 'Rosa Hernández', age: 38, gender: 'F', municipality: 'San Miguel', promoter: 'Luis Ramírez', status: 'active', smartband: 'SB-2024-003', lastSync: '2024-11-20' },
  { id: 4, name: 'José Martínez', age: 61, gender: 'M', municipality: 'La Libertad', promoter: 'Juan Pérez', status: 'referred', smartband: 'SB-2024-004', lastSync: '2024-11-19' },
  { id: 5, name: 'Ana Rodríguez', age: 47, gender: 'F', municipality: 'Sonsonate', promoter: 'María González', status: 'active', smartband: 'SB-2024-005', lastSync: '2024-11-21' },
  { id: 6, name: 'Pedro Flores', age: 55, gender: 'M', municipality: 'La Paz', promoter: 'Luis Ramírez', status: 'active', smartband: 'SB-2024-006', lastSync: '2024-11-21' },
  { id: 7, name: 'Carmen Díaz', age: 42, gender: 'F', municipality: 'Chalatenango', promoter: 'Ana Martínez', status: 'inactive', smartband: 'SB-2024-007', lastSync: '2024-11-10' },
  { id: 8, name: 'Francisco Gómez', age: 59, gender: 'M', municipality: 'Cuscatlán', promoter: 'Juan Pérez', status: 'active', smartband: 'SB-2024-008', lastSync: '2024-11-21' },
  { id: 9, name: 'Lucía Morales', age: 36, gender: 'F', municipality: 'La Unión', promoter: 'María González', status: 'active', smartband: 'SB-2024-009', lastSync: '2024-11-21' },
  { id: 10, name: 'Roberto Sánchez', age: 48, gender: 'M', municipality: 'Morazán', promoter: 'Luis Ramírez', status: 'referred', smartband: 'SB-2024-010', lastSync: '2024-11-18' },
];

export function renderPatientsListView() {
  const user = authService.getCurrentUser() || { name: 'Usuario Demo', role: 'admin_general' };

  const columns = [
    { key: 'id', label: 'ID', type: 'number' },
    { key: 'name', label: 'Nombre', type: 'text' },
    { key: 'age', label: 'Edad', type: 'number' },
    { key: 'gender', label: 'Sexo', type: 'text' },
    { key: 'municipality', label: 'Municipio', type: 'text' },
    { key: 'promoter', label: 'Promotor', type: 'text' },
    { key: 'status', label: 'Estado', type: 'badge' },
    { key: 'smartband', label: 'Smartband', type: 'text' },
    { key: 'lastSync', label: 'Última Sync', type: 'date' }
  ];

  return `
    <style>
      .patients-list {
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
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
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

      @media (max-width: 768px) {
        .patients-list {
          padding: 1rem;
        }

        .page-title {
          font-size: 2rem;
        }

        .page-header {
          flex-direction: column;
          align-items: stretch;
        }
      }
    </style>

    <div class="patients-list">
      <!-- Header -->
      <div class="page-header">
        <h1 class="page-title">Gestión de Pacientes</h1>
        <div class="header-actions">
          <button class="btn-primary" onclick="alert('Funcionalidad de agregar paciente próximamente')">➕ Agregar Paciente</button>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="stats-grid">
        <div class="stat-card">
          <p class="stat-label">Total Pacientes</p>
          <div class="stat-value">${mockPatients.length}</div>
        </div>
        <div class="stat-card">
          <p class="stat-label">Activos</p>
          <div class="stat-value">${mockPatients.filter(p => p.status === 'active').length}</div>
        </div>
        <div class="stat-card">
          <p class="stat-label">Referidos</p>
          <div class="stat-value">${mockPatients.filter(p => p.status === 'referred').length}</div>
        </div>
        <div class="stat-card">
          <p class="stat-label">Inactivos</p>
          <div class="stat-value">${mockPatients.filter(p => p.status === 'inactive').length}</div>
        </div>
      </div>

      <!-- Patients Table -->
      <advanced-table
        data='${JSON.stringify(mockPatients)}'
        columns='${JSON.stringify(columns)}'
        searchable
        filterable
      ></advanced-table>
    </div>
  `;
}
