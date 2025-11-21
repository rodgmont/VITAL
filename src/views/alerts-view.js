/**
 * VITAL - Alerts View
 * 
 * Vista de alertas tempranas y notificaciones
 */

export function renderAlertsView() {
    return `
    <div class="alerts-view">
      <div class="container py-16">
        <h1 class="page-title">Alertas Tempranas</h1>
        <p class="page-subtitle">Notificaciones y advertencias basadas en tus indicadores de salud</p>

        <!-- Filters -->
        <div class="filters-bar">
          <app-button variant="primary" size="sm">Todas</app-button>
          <app-button variant="outline" size="sm">Críticas</app-button>
          <app-button variant="outline" size="sm">Advertencias</app-button>
          <app-button variant="outline" size="sm">Info</app-button>
          <app-button variant="outline" size="sm">Resueltas</app-button>
        </div>

        <!-- Active Alerts -->
        <section class="alerts-section">
          <h2 class="section-heading">🚨 Alertas Activas (2)</h2>
          <div class="alerts-list">
            <alert-card 
              severity="warning" 
              title="Incremento en Presión Arterial" 
              timestamp="2025-11-20T18:30:00">
              Se detectó un incremento sostenido en tu presión arterial durante las últimas 48 horas. 
              Tu presión sistólica ha estado entre 125-130 mmHg, cerca del límite superior del rango normal.
              Se recomienda monitoreo cercano y consulta con un promotor de salud.
            </alert-card>

            <alert-card 
              severity="warning" 
              title="Baja Actividad Física Sostenida" 
              timestamp="2025-11-19T14:20:00">
              Has estado por debajo de tu meta de pasos durante 3 días consecutivos (promedio: 6,200 pasos/día).
              La actividad física regular es crucial para mantener una presión arterial saludable.
            </alert-card>
          </div>
        </section>

        <!-- Recent Notifications -->
        <section class="alerts-section">
          <h2 class="section-heading">📢 Notificaciones Recientes</h2>
          <div class="alerts-list">
            <alert-card 
              severity="info" 
              title="Meta de Hidratación Alcanzada" 
              timestamp="2025-11-20T20:15:00">
              ¡Excelente trabajo! Has alcanzado tu meta de hidratación diaria con 2.6 litros consumidos.
            </alert-card>

            <alert-card 
              severity="info" 
              title="Recordatorio: Medición Pendiente" 
              timestamp="2025-11-20T12:00:00">
              Es hora de registrar tu presión arterial. No olvides tomar tu medición del mediodía.
            </alert-card>

            <alert-card 
              severity="info" 
              title="Nueva Recomendación Disponible" 
              timestamp="2025-11-19T10:30:00">
              Basándonos en tus últimos indicadores, hemos generado nuevas recomendaciones personalizadas para ti.
            </alert-card>
          </div>
        </section>

        <!-- Resolved Alerts -->
        <section class="alerts-section">
          <h2 class="section-heading">✅ Alertas Resueltas</h2>
          <div class="alerts-list resolved">
            <alert-card 
              severity="critical" 
              title="Pico de Presión Arterial RESUELTO" 
              timestamp="2025-11-15T16:45:00">
              Se detectó un pico de presión arterial (145/95 mmHg) que requería atención inmediata.
              <br><br>
              <strong>Acción tomada:</strong> Visitado por promotor de salud el 16/11/2025. 
              Se ajustó medicación y se implementó plan de monitoreo intensivo.
              <br><br>
              <strong>Estado actual:</strong> Presión normalizada. Continuando con nuevo plan de tratamiento.
            </alert-card>

            <alert-card 
              severity="warning" 
              title="Patrón de Sueño Irregular RESUELTO" 
              timestamp="2025-11-10T08:00:00">
              Se detectó un patrón de sueño irregular con menos de 6 horas por noche durante una semana.
              <br><br>
              <strong>Acción tomada:</strong> Implementadas recomendaciones de higiene del sueño.
              <br><br>
              <strong>Estado actual:</strong> Patrón de sueño mejorado a 7-8 horas por noche.
            </alert-card>
          </div>
        </section>

        <!-- Alert Statistics -->
        <section class="stats-section">
          <h2 class="section-heading">📊 Estadísticas de Alertas</h2>
          <div class="stats-grid">
            <app-card>
              <div class="stat-box">
                <div class="stat-number">24</div>
                <div class="stat-label">Total de Alertas</div>
                <div class="stat-sublabel">Últimos 30 días</div>
              </div>
            </app-card>

            <app-card>
              <div class="stat-box">
                <div class="stat-number">2</div>
                <div class="stat-label">Alertas Críticas</div>
                <div class="stat-sublabel">Requirieron atención inmediata</div>
              </div>
            </app-card>

            <app-card>
              <div class="stat-box">
                <div class="stat-number">91%</div>
                <div class="stat-label">Tasa de Resolución</div>
                <div class="stat-sublabel">22 de 24 resueltas</div>
              </div>
            </app-card>

            <app-card>
              <div class="stat-box">
                <div class="stat-number">18h</div>
                <div class="stat-label">Tiempo Promedio de Respuesta</div>
                <div class="stat-sublabel">Para alertas críticas</div>
              </div>
            </app-card>
          </div>
        </section>
      </div>
    </div>

    <style>
      .alerts-view {
        background: #fafafa;
        min-height: 100vh;
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
        margin-bottom: 2rem;
      }

      .filters-bar {
        display: flex;
        gap: 1rem;
        margin-bottom: 3rem;
        flex-wrap: wrap;
      }

      .alerts-section {
        margin-bottom: 3rem;
      }

      .section-heading {
        font-family: 'Outfit', sans-serif;
        font-size: 1.75rem;
        font-weight: 700;
        color: #1a1a1a;
        margin-bottom: 1.5rem;
      }

      .alerts-list {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }

      .alerts-list.resolved {
        opacity: 0.75;
      }

      .alerts-list.resolved:hover {
        opacity: 1;
      }

      .stats-section {
        margin-top: 4rem;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }

      .stat-box {
        text-align: center;
        padding: 1.5rem;
      }

      .stat-number {
        font-family: 'Outfit', sans-serif;
        font-size: 3rem;
        font-weight: 900;
        color: #1AB8B8;
        line-height: 1;
        margin-bottom: 0.5rem;
      }

      .stat-label {
        font-size: 1rem;
        font-weight: 600;
        color: #333;
        margin-bottom: 0.25rem;
      }

      .stat-sublabel {
        font-size: 0.85rem;
        color: #666;
      }

      @media (max-width: 768px) {
        .page-title {
          font-size: 2rem;
        }

        .stats-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    </style>
  `;
}
