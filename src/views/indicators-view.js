/**
 * VITAL - Indicators View
 * 
 * Vista detallada de todos los indicadores de salud
 */

export function renderIndicatorsView() {
    return `
    <div class="indicators-view">
      <div class="container py-16">
        <h1 class="page-title">Mis Indicadores de Salud</h1>
        <p class="page-subtitle">Monitoreo detallado de tus métricas de salud preventiva</p>

        <!-- Filters -->
        <div class="filters-bar">
          <app-button variant="outline" size="sm">Hoy</app-button>
          <app-button variant="primary" size="sm">Esta Semana</app-button>
          <app-button variant="outline" size="sm">Este Mes</app-button>
          <app-button variant="outline" size="sm">Todo</app-button>
        </div>

        <!-- Indicators Sections -->
        <div class="indicators-sections">
          <!-- Cardiovascular -->
          <section class="indicator-section">
            <h2 class="category-title">❤️ Salud Cardiovascular</h2>
            <div class="indicators-grid">
              <app-card>
                <health-indicator 
                  label="Presión Arterial Sistólica" 
                  value="120" 
                  max="140" 
                  unit="mmHg" 
                  status="good">
                </health-indicator>
                <div class="indicator-details">
                  <p>Última medición: Hace 2 horas</p>
                  <p>Tendencia: Estable ➡️</p>
                </div>
              </app-card>

              <app-card>
                <health-indicator 
                  label="Presión Arterial Diastólica" 
                  value="80" 
                  max="90" 
                  unit="mmHg" 
                  status="good">
                </health-indicator>
                <div class="indicator-details">
                  <p>Última medición: Hace 2 horas</p>
                  <p>Tendencia: Estable ➡️</p>
                </div>
              </app-card>

              <app-card>
                <health-indicator 
                  label="Frecuencia Cardíaca en Reposo" 
                  value="72" 
                  max="100" 
                  unit="bpm" 
                  status="good">
                </health-indicator>
                <div class="indicator-details">
                  <p>Última medición: Hace 15 min</p>
                  <p>Tendencia: Descendiendo ↓</p>
                </div>
              </app-card>
            </div>
          </section>

          <!-- Activity & Weight -->
          <section class="indicator-section">
            <h2 class="category-title">🏃 Actividad y Peso</h2>
            <div class="indicators-grid">
              <app-card>
                <health-indicator 
                  label="Pasos Diarios" 
                  value="6500" 
                  max="10000" 
                  unit="pasos" 
                  status="warning">
                </health-indicator>
                <div class="indicator-details">
                  <p>Meta diaria: 10,000 pasos</p>
                  <p>Progreso: 65% completado</p>
                </div>
              </app-card>

              <app-card>
                <health-indicator 
                  label="Peso Corporal" 
                  value="72" 
                  max="80" 
                  unit="kg" 
                  status="good">
                </health-indicator>
                <div class="indicator-details">
                  <p>IMC: 23.5 (Normal)</p>
                  <p>Tendencia: Estable ➡️</p>
                </div>
              </app-card>

              <app-card>
                <health-indicator 
                  label="Calorías Quemadas" 
                  value="1850" 
                  max="2200" 
                  unit="kcal" 
                  status="normal">
                </health-indicator>
                <div class="indicator-details">
                  <p>Meta diaria: 2,200 kcal</p>
                  <p>Progreso: 84% completado</p>
                </div>
              </app-card>
            </div>
          </section>

          <!-- Sleep & Hydration -->
          <section class="indicator-section">
            <h2 class="category-title">😴 Sueño e Hidratación</h2>
            <div class="indicators-grid">
              <app-card>
                <health-indicator 
                  label="Horas de Sueño" 
                  value="6.5" 
                  max="8" 
                  unit="horas" 
                  status="warning">
                </health-indicator>
                <div class="indicator-details">
                  <p>Meta: 7-8 horas</p>
                  <p>Calidad: Moderada ⭐⭐⭐</p>
                </div>
              </app-card>

              <app-card>
                <health-indicator 
                  label="Hidratación" 
                  value="1.5" 
                  max="2.5" 
                  unit="litros" 
                  status="warning">
                </health-indicator>
                <div class="indicator-details">
                  <p>Meta diaria: 2.5 litros</p>
                  <p>Progreso: 60% completado</p>
                </div>
              </app-card>

              <app-card>
                <health-indicator 
                  label="Nivel de Estrés" 
                  value="45" 
                  max="100" 
                  unit="índice" 
                  status="normal">
                </health-indicator>
                <div class="indicator-details">
                  <p>Nivel: Moderado</p>
                  <p>Tendencia: Descendiendo ↓</p>
                </div>
              </app-card>
            </div>
          </section>
        </div>

        <!-- Historical Chart -->
        <section class="section-box">
          <h2 class="section-heading">Historial de Presión Arterial</h2>
          <app-card>
            <div class="chart-container">
              <simple-chart 
                data='[115, 118, 120, 119, 121, 120, 122, 118, 119, 121, 120, 119, 118, 120]' 
                width="800" 
                height="300" 
                color="#1AB8B8">
              </simple-chart>
              <p class="chart-label">Presión Arterial Sistólica - Últimas 2 semanas</p>
            </div>
          </app-card>
        </section>
      </div>
    </div>

    <style>
      .indicators-view {
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

      .indicators-sections {
        display: flex;
        flex-direction: column;
        gap: 3rem;
      }

      .indicator-section {
        background: white;
        border-radius: 1.5rem;
        padding: 2rem;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
      }

      .category-title {
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

      .indicator-details {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid #E5E7EB;
      }

      .indicator-details p {
        font-size: 0.85rem;
        color: #666;
        margin-bottom: 0.5rem;
      }

      .section-box {
        margin-top: 3rem;
      }

      .section-heading {
        font-family: 'Outfit', sans-serif;
        font-size: 1.75rem;
        font-weight: 700;
        color: #1a1a1a;
        margin-bottom: 1.5rem;
      }

      .chart-container {
        padding: 1.5rem;
      }

      .chart-label {
        text-align: center;
        margin-top: 1rem;
        font-size: 0.95rem;
        color: #666;
        font-weight: 500;
      }

      @media (max-width: 768px) {
        .page-title {
          font-size: 2rem;
        }

        .indicators-grid {
          grid-template-columns: 1fr;
        }

        .indicator-section {
          padding: 1.5rem;
        }
      }
    </style>
  `;
}
