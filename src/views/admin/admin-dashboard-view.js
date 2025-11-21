/**
 * VITAL - Admin Dashboard View
 * 
 * Dashboard principal para administradores con KPIs y analíticas
 */

import { authService, ROLES } from '../../services/auth.service.js';

export function renderAdminDashboardView() {
  const user = authService.getCurrentUser() || { name: 'Usuario Demo', role: 'admin_general' };

  return `
    <style>
      .admin-dashboard {
        padding: 2rem;
        max-width: 1400px;
        margin: 0 auto;
      }

      .dashboard-header {
        margin-bottom: 2rem;
      }

      .dashboard-title {
        font-family: 'Outfit', sans-serif;
        font-size: 2.5rem;
        font-weight: 900;
        color: #1F2937;
        margin: 0 0 0.5rem 0;
      }

      .dashboard-subtitle {
        font-size: 1.1rem;
        color: #6B7280;
        margin: 0;
      }

      .kpi-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2.5rem;
      }

      .charts-section {
        margin-bottom: 2.5rem;
      }

      .section-title {
        font-family: 'Outfit', sans-serif;
        font-size: 1.5rem;
        font-weight: 700;
        color: #1F2937;
        margin: 0 0 1.5rem 0;
      }

      .charts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
      }

      .map-container {
        background: white;
        border-radius: 1rem;
        padding: 1.5rem;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        margin-bottom: 2.5rem;
      }

      .map-placeholder {
        width: 100%;
        height: 400px;
        background: linear-gradient(135deg, #E0F2F1 0%, #B2DFDB 100%);
        border-radius: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #00695C;
        font-size: 1.2rem;
        font-weight: 600;
      }

      .alerts-section {
        background: white;
        border-radius: 1rem;
        padding: 1.5rem;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
      }

      .alert-item {
        padding: 1rem;
        border-bottom: 1px solid #E5E7EB;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .alert-item:last-child {
        border-bottom: none;
      }

      .alert-content {
        flex: 1;
      }

      .alert-title {
        font-weight: 600;
        color: #1F2937;
        margin: 0 0 0.25rem 0;
      }

      .alert-description {
        font-size: 0.9rem;
        color: #6B7280;
        margin: 0;
      }

      .alert-time {
        font-size: 0.85rem;
        color: #9CA3AF;
        margin-left: 1rem;
      }

      @media (max-width: 768px) {
        .admin-dashboard {
          padding: 1rem;
        }

        .dashboard-title {
          font-size: 2rem;
        }

        .kpi-grid {
          grid-template-columns: 1fr;
        }

        .charts-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>

    <div class="admin-dashboard">
      <!-- Header -->
      <div class="dashboard-header">
        <h1 class="dashboard-title">Dashboard Administrativo</h1>
        <p class="dashboard-subtitle">Bienvenido, ${user.name} • ${authService.getRoleName(user.role)}</p>
      </div>

      <!-- KPIs Grid -->
      <div class="kpi-grid">
        <kpi-card 
          title="Usuarios Activos"
          value="4,247"
          change="+8.5"
          trend="positive"
          icon="👥"
          color="#1AB8B8"
        >
          <span slot="footer">vs mes anterior</span>
        </kpi-card>

        <kpi-card 
          title="Smartbands Desplegados"
          value="2,893"
          change="+12.3"
          trend="positive"
          icon="⌚"
          color="#4A9B6B"
        >
          <span slot="footer">Total en campo</span>
        </kpi-card>

        <kpi-card 
          title="Promotores Activos"
          value="89"
          change="+5"
          trend="positive"
          icon="👨‍⚕️"
          color="#3B82F6"
        >
          <span slot="footer">Capacitados y activos</span>
        </kpi-card>

        <kpi-card 
          title="Casos Detectados"
          value="142"
          change="+23.1"
          trend="positive"
          icon="⚕️"
          color="#F59E0B"
        >
          <span slot="footer">Alto riesgo</span>
        </kpi-card>

        <kpi-card 
          title="Referencias a Unidades"
          value="892"
          change="+15.7"
          trend="positive"
          icon="🏥"
          color="#8B5CF6"
        >
          <span slot="footer">Este mes</span>
        </kpi-card>

        <kpi-card 
          title="Visitas Prevenidas"
          value="12,341"
          change="-18.5"
          trend="positive"
          icon="📉"
          color="#10B981"
        >
          <span slot="footer">A emergencias</span>
        </kpi-card>

        <kpi-card 
          title="Ahorro Estimado"
          value="$2.4M"
          change="+25.3"
          trend="positive"
          icon="💰"
          color="#059669"
        >
          <span slot="footer">Para el sistema de salud</span>
        </kpi-card>

        <kpi-card 
          title="Cobertura Nacional"
          value="68.2%"
          change="+8"
          trend="positive"
          icon="🗺️"
          color="#1AB8B8"
        >
          <span slot="footer">De municipios</span>
        </kpi-card>
      </div>

      <!-- Charts Section -->
      <div class="charts-section">
        <h2 class="section-title">Tendencias y Analíticas</h2>
        <div class="charts-grid">
          <multi-series-chart
            title="Evolución de Casos Detectados"
            series='[
              {
                "name": "Pre-hipertensión",
                "color": "#EF4444",
                "data": [120, 145, 168, 182, 195, 210, 235]
              },
              {
                "name": "Pre-diabetes",
                "color": "#F59E0B",
                "data": [85, 92, 105, 118, 130, 145, 158]
              }
            ]'
            labels='["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"]'
            width="600"
            height="300"
          ></multi-series-chart>

          <multi-series-chart
            title="Uso de Wearables"
            series='[
              {
                "name": "Uso Consistente",
                "color": "#10B981",
                "data": [82, 85, 87, 88, 90, 92, 94]
              },
              {
                "name": "Uso Ocasional",
                "color": "#F59E0B",
                "data": [12, 11, 10, 9, 7, 6, 5]
              }
            ]'
            labels='["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"]'
            width="600"
            height="300"
          ></multi-series-chart>
        </div>
      </div>

      <!-- Map Section -->
      <div class="map-container">
        <h2 class="section-title">Mapa de Calor - Distribución Nacional</h2>
        <div class="map-placeholder">
          🗺️ Mapa Interactivo de El Salvador<br>
          <small style="font-weight: normal; font-size: 0.9rem;">(Integración con Leaflet/Mapbox pendiente)</small>
        </div>
      </div>

      <!-- System Alerts -->
      <div class="alerts-section">
        <h2 class="section-title">Alertas del Sistema</h2>
        
        <div class="alert-item">
          <div class="alert-content">
            <h4 class="alert-title">⚠️ Promotor sin sincronizar</h4>
            <p class="alert-description">El promotor Juan Martínez no ha sincronizado datos en 3 días</p>
          </div>
          <span class="alert-time">Hace 2h</span>
        </div>

        <div class="alert-item">
          <div class="alert-content">
            <h4 class="alert-title">🔋 Batería baja en lote</h4>
            <p class="alert-description">15 smartbands del lote SB-2024-03 tienen batería <20%</p>
          </div>
          <span class="alert-time">Hace 5h</span>
        </div>

        <div class="alert-item">
          <div class="alert-content">
            <h4 class="alert-title">✅ Capacitación completada</h4>
            <p class="alert-description">20 nuevos promotores completaron la capacitación básica</p>
          </div>
          <span class="alert-time">Hace 1d</span>
        </div>

        <div class="alert-item">
          <div class="alert-content">
            <h4 class="alert-title">📊 Reporte mensual disponible</h4>
            <p class="alert-description">El reporte de impacto de junio está listo para revisión</p>
          </div>
          <span class="alert-time">Hace 2d</span>
        </div>
      </div>
    </div>
  `;
}
