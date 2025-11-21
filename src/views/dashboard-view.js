/**
 * VITAL - Dashboard View
 * 
 * Panel principal del usuario con resumen de indicadores y alertas
 */

export function renderDashboardView() {
    return `
    <div class="dashboard-view">
      <div class="container py-16">
        <!-- Header -->
        <div class="dashboard-header">
          <div>
            <h1 class="page-title">Panel de Salud</h1>
            <p class="page-subtitle">Resumen de tus indicadores de salud preventiva</p>
          </div>
          <app-button variant="primary">
            Registrar Medición
          </app-button>
        </div>

        <!-- Quick Stats -->
        <div class="quick-stats">
          <div class="stat-card good">
            <div class="stat-icon">💚</div>
            <div class="stat-value">85%</div>
            <div class="stat-label">Salud General</div>
          </div>
          <div class="stat-card warning">
            <div class="stat-icon">⚠️</div>
            <div class="stat-value">2</div>
            <div class="stat-label">Alertas Activas</div>
          </div>
          <div class="stat-card normal">
            <div class="stat-icon">📊</div>
            <div class="stat-value">15</div>
            <div class="stat-label">Días Monitoreados</div>
          </div>
          <div class="stat-card good">
            <div class="stat-icon">✅</div>
            <div class="stat-value">7</div>
            <div class="stat-label">Recomendaciones Seguidas</div>
          </div>
        </div>

        <!-- Health Indicators -->
        <section class="section-box">
          <h2 class="section-heading">Indicadores de Salud</h2>
          <div class="indicators-grid">
            <app-card hoverable>
              <health-indicator 
                label="Presión Arterial" 
                value="120" 
                max="140" 
                unit="mmHg" 
                status="good">
              </health-indicator>
            </app-card>

            <app-card hoverable>
              <health-indicator 
                label="Frecuencia Cardíaca" 
                value="72" 
                max="100" 
                unit="bpm" 
                status="good">
              </health-indicator>
            </app-card>

            <app-card hoverable>
              <health-indicator 
                label="Actividad Física" 
                value="6500" 
                max="10000" 
                unit="pasos" 
                status="warning">
              </health-indicator>
            </app-card>

            <app-card hoverable>
              <health-indicator 
                label="Calidad del Sueño" 
                value="6.5" 
                max="8" 
                unit="horas" 
                status="warning">
              </health-indicator>
            </app-card>
          </div>
        </section>

        <!-- Trends Chart -->
        <section class="section-box">
          <h2 class="section-heading">Tendencias Esta Semana</h2>
          <app-card>
            <div class="chart-container">
              <simple-chart 
                data='[115, 118, 120, 119, 121, 120, 122]' 
                width="600" 
                height="200" 
                color="#1AB8B8">
              </simple-chart>
              <p class="chart-label">Presión Arterial (mmHg) - Últimos 7 días</p>
            </div>
          </app-card>
        </section>

        <!-- Recent Alerts -->
        <section class="section-box">
          <h2 class="section-heading">Alertas Recientes</h2>
          <div class="alerts-list">
            <alert-card 
              severity="warning" 
              title="Incremento en Presión Arterial" 
              timestamp="2025-11-20T18:30:00">
              Se detectó un incremento sostenido en tu presión arterial durante las últimas 48 horas. 
              Se recomienda monitoreo cercano.
            </alert-card>

            <alert-card 
              severity="info" 
              title="Baja Actividad Física" 
              timestamp="2025-11-19T14:20:00">
              Has estado por debajo de tu meta de pasos durante 3 días consecutivos. 
              Intenta aumentar tu actividad gradualmente.
            </alert-card>
          </div>
        </section>

        <!-- Quick Actions -->
        <section class="section-box">
          <h2 class="section-heading">Acciones Rápidas</h2>
          <div class="quick-actions">
            <app-card hoverable>
              <div class="action-item">
                <div class="action-icon">📋</div>
                <h3 class="action-title">Ver Recomendaciones</h3>
                <p class="action-desc">Consejos personalizados basados en tus indicadores</p>
                <app-button variant="ghost">Ver →</app-button>
              </div>
            </app-card>

            <app-card hoverable>
              <div class="action-item">
                <div class="action-icon">📅</div>
                <h3 class="action-title">Agendar Cita</h3>
                <p class="action-desc">Conecta con un promotor de salud</p>
                <app-button variant="ghost">Agendar →</app-button>
              </div>
            </app-card>

            <app-card hoverable>
              <div class="action-item">
                <div class="action-icon">📊</div>
                <h3 class="action-title">Historial Completo</h3>
                <p class="action-desc">Revisa todos tus indicadores históricos</p>
                <app-button variant="ghost">Ver Historial →</app-button>
              </div>
            </app-card>
          </div>
        </section>
      </div>
    </div>

    <style>
      .dashboard-view {
        background: linear-gradient(180deg, #fafafa 0%, white 50%);
        min-height: 100vh;
      }

      .dashboard-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 2rem;
        flex-wrap: wrap;
        gap: 1.5rem;
      }

      .page-title {
        font-family: 'Outfit', sans-serif;
        font-size: 2.5rem;
        font-weight: 800;
        color: #1a1a1a;
        margin-bottom: 0.5rem;
      }

      .page-subtitle {
        font-size: 1.1rem;
        color: #666;
      }

      .quick-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-bottom: 3rem;
      }

      .stat-card {
        background: white;
        border-radius: 1rem;
        padding: 1.5rem;
        text-align: center;
        border: 2px solid transparent;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      }

      .stat-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
      }

      .stat-card.good {
        border-color: #4A9B6B;
      }

      .stat-card.warning {
        border-color: #F59E0B;
      }

      .stat-card.normal {
        border-color: #1AB8B8;
      }

      .stat-icon {
        font-size: 2.5rem;
        margin-bottom: 0.75rem;
      }

      .stat-value {
        font-family: 'Outfit', sans-serif;
        font-size: 2.5rem;
        font-weight: 900;
        color: #1a1a1a;
        line-height: 1;
        margin-bottom: 0.5rem;
      }

      .stat-label {
        font-size: 0.9rem;
        color: #666;
        font-weight: 500;
      }

      .section-box {
        margin-bottom: 3rem;
      }

      .section-heading {
        font-family: 'Outfit', sans-serif;
        font-size: 1.75rem;
        font-weight: 700;
        color: #1a1a1a;
        margin-bottom: 1.5rem;
      }

      .indicators-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
      }

      .chart-container {
        padding: 1rem;
      }

      .chart-label {
        text-align: center;
        margin-top: 1rem;
        font-size: 0.9rem;
        color: #666;
        font-weight: 500;
      }

      .alerts-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .quick-actions {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
      }

      .action-item {
        text-align: center;
        padding: 1rem;
      }

      .action-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
      }

      .action-title {
        font-family: 'Outfit', sans-serif;
        font-size: 1.25rem;
        font-weight: 700;
        color: #1a1a1a;
        margin-bottom: 0.5rem;
      }

      .action-desc {
        font-size: 0.95rem;
        color: #666;
        margin-bottom: 1rem;
        line-height: 1.5;
      }

      @media (max-width: 768px) {
        .page-title {
          font-size: 2rem;
        }

        .dashboard-header {
          flex-direction: column;
        }

        .quick-stats {
          grid-template-columns: repeat(2, 1fr);
        }

        .indicators-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
  `;
}
