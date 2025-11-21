/**
 * VITAL - Promoters List View
 * 
 * Vista de gestión de promotores de salud
 */

import { authService } from '../../services/auth.service.js';

// Mock data de promotores
const mockPromoters = [
  { id: 1, name: 'Juan Pérez', region: 'San Salvador', patients: 28, visits: 142, effectiveness: 94, status: 'active', training: 'Avanzado' },
  { id: 2, name: 'Ana Martínez', region: 'Santa Ana', patients: 32, visits: 156, effectiveness: 91, status: 'active', training: 'Avanzado' },
  { id: 3, name: 'Luis Ramírez', region: 'La Libertad', patients: 25, visits: 128, effectiveness: 96, status: 'active', training: 'Intermedio' },
  { id: 4, name: 'María González', region: 'Sonsonate', patients: 30, visits: 145, effectiveness: 89, status: 'active', training: 'Avanzado' },
  { id: 5, name: 'Carlos Hernández', region: 'San Miguel', patients: 22, visits: 98, effectiveness: 87, status: 'pending', training: 'Básico' },
  { id: 6, name: 'Rosa López', region: 'Chalatenango', patients: 18, visits: 92, effectiveness: 93, status: 'active', training: 'Intermedio' },
];

export function renderPromotersListView() {
  const user = authService.getCurrentUser() || { name: 'Usuario Demo', role: 'admin_general' };

  const columns = [
    { key: 'id', label: 'ID', type: 'number' },
    { key: 'name', label: 'Nombre', type: 'text' },
    { key: 'region', label: 'Región', type: 'text' },
    { key: 'patients', label: 'Pacientes', type: 'number' },
    { key: 'visits', label: 'Visitas', type: 'number' },
    { key: 'effectiveness', label: 'Efectividad (%)', type: 'number' },
    { key: 'training', label: 'Nivel', type: 'text' },
    { key: 'status', label: 'Estado', type: 'badge' }
  ];

  const totalPatients = mockPromoters.reduce((sum, p) => sum + p.patients, 0);
  const totalVisits = mockPromoters.reduce((sum, p) => sum + p.visits, 0);
  const avgEffectiveness = (mockPromoters.reduce((sum, p) => sum + p.effectiveness, 0) / mockPromoters.length).toFixed(1);

  return `
    <style>
      .promoters-list {
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

      .btn-secondary {
        padding: 0.75rem 1.5rem;
        background: white;
        color: #1AB8B8;
        border: 2px solid #1AB8B8;
        border-radius: 0.75rem;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
      }

      .btn-secondary:hover {
        background: #F0FDFA;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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
        .promoters-list {
          padding: 1rem;
        }

        .page-title {
          font-size: 2rem;
        }
      }
    </style>

    <div class="promoters-list">
      <!-- Header -->
      <div class="page-header">
        <h1 class="page-title">Gestión de Promotores</h1>
        <div class="header-actions">
          <button class="btn-secondary" onclick="alert('Funcionalidad próximamente')">📚 Capacitaciones</button>
          <button class="btn-primary" onclick="alert('Funcionalidad próximamente')">➕ Agregar Promotor</button>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="stats-grid">
        <div class="stat-card">
          <p class="stat-label">Total Promotores</p>
          <div class="stat-value">${mockPromoters.length}</div>
        </div>
        <div class="stat-card">
          <p class="stat-label">Activos</p>
          <div class="stat-value">${mockPromoters.filter(p => p.status === 'active').length}</div>
        </div>
        <div class="stat-card">
          <p class="stat-label">Total Pacientes</p>
          <div class="stat-value">${totalPatients}</div>
        </div>
        <div class="stat-card">
          <p class="stat-label">Visitas Realizadas</p>
          <div class="stat-value">${totalVisits}</div>
        </div>
        <div class="stat-card">
          <p class="stat-label">Efectividad Promedio</p>
          <div class="stat-value">${avgEffectiveness}%</div>
        </div>
      </div>

      <!-- Promoters Table -->
      <advanced-table
        data='${JSON.stringify(mockPromoters)}'
        columns='${JSON.stringify(columns)}'
        searchable
        filterable
      ></advanced-table>
    </div>
  `;
}
