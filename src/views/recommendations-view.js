/**
 * VITAL - Recommendations View
 * 
 * Vista de recomendaciones preventivas personalizadas
 */

export function renderRecommendationsView() {
    return `
    <div class="recommendations-view">
      <div class="container py-16">
        <h1 class="page-title">Recomendaciones Preventivas</h1>
        <p class="page-subtitle">Consejos personalizados basados en tus indicadores de salud</p>

        <!-- Recommendation Categories -->
        <div class="recommendations-sections">
          <!-- Nutrition -->
          <section class="rec-category">
            <h2 class="category-title">🥗 Nutrición</h2>
            <div class="recommendations-grid">
              <app-card hoverable>
                <div class="recommendation-card">
                  <div class="rec-priority high">Alta Prioridad</div>
                  <h3 class="rec-title">Reducir consumo de sodio</h3>
                  <p class="rec-description">
                    Tu presión arterial está en el límite superior del rango normal. 
                    Reduce el consumo de sal a menos de 5g/día.
                  </p>
                  <div class="rec-tips">
                    <p><strong>Tips:</strong></p>
                    <ul>
                      <li>Evita alimentos procesados</li>
                      <li>Cocina con hierbas y especias</li>
                      <li>Lee etiquetas nutricionales</li>
                    </ul>
                  </div>
                  <app-button variant="outline" size="sm">Marcar como Completado</app-button>
                </div>
              </app-card>

              <app-card hoverable>
                <div class="recommendation-card">
                  <div class="rec-priority medium">Prioridad Media</div>
                  <h3 class="rec-title">Aumentar consumo de fibra</h3>
                  <p class="rec-description">
                    Incluye más frutas, verduras y granos enteros en tu dieta para mejorar tu salud cardiovascular.
                  </p>
                  <div class="rec-tips">
                    <p><strong>Alimentos recomendados:</strong></p>
                    <ul>
                      <li>Frijoles y lentejas</li>
                      <li>Avena y arroz integral</li>
                      <li>Frutas con cáscara</li>
                    </ul>
                  </div>
                  <app-button variant="outline" size="sm">Marcar como Completado</app-button>
                </div>
              </app-card>
            </div>
          </section>

          <!-- Exercise -->
          <section class="rec-category">
            <h2 class="category-title">🏃 Ejercicio y Actividad</h2>
            <div class="recommendations-grid">
              <app-card hoverable>
                <div class="recommendation-card">
                  <div class="rec-priority high">Alta Prioridad</div>
                  <h3 class="rec-title">Aumentar actividad física diaria</h3>
                  <p class="rec-description">
                    Estás un 35% por debajo de tu meta de pasos. Intenta incrementar gradualmente tu actividad física.
                  </p>
                  <div class="rec-tips">
                    <p><strong>Sugerencias:</strong></p>
                    <ul>
                      <li>Camina 30 minutos después del almuerzo</li>
                      <li>Usa escaleras en lugar de elevador</li>
                      <li>Haz pausas activas cada hora</li>
                    </ul>
                  </div>
                  <app-button variant="outline" size="sm">Crear Recordatorio</app-button>
                </div>
              </app-card>

              <app-card hoverable>
                <div class="recommendation-card">
                  <div class="rec-priority low">Sugerencia</div>
                  <h3 class="rec-title">Ejercicios de estiramiento</h3>
                  <p class="rec-description">
                    Incorpora 10 minutos de estiramiento diario para reducir el estrés y mejorar flexibilidad.
                  </p>
                  <div class="rec-tips">
                    <p><strong>Rutina sugerida:</strong></p>
                    <ul>
                      <li>Estiramientos de cuello y hombros</li>
                      <li>Estiramiento de piernas</li>
                      <li>Ejercicios de respiración profunda</li>
                    </ul>
                  </div>
                  <app-button variant="outline" size="sm">Ver Video Tutorial</app-button>
                </div>
              </app-card>
            </div>
          </section>

          <!-- Sleep & Wellness -->
          <section class="rec-category">
            <h2 class="category-title">😴 Sueño y Bienestar</h2>
            <div class="recommendations-grid">
              <app-card hoverable>
                <div class="recommendation-card">
                  <div class="rec-priority high">Alta Prioridad</div>
                  <h3 class="rec-title">Mejorar calidad del sueño</h3>
                  <p class="rec-description">
                    Estás durmiendo menos de las 7 horas recomendadas. Un buen sueño es crucial para tu salud cardiovascular.
                  </p>
                  <div class="rec-tips">
                    <p><strong>Hábitos recomendados:</strong></p>
                    <ul>
                      <li>Acuéstate y levántate a la misma hora</li>
                      <li>Evita pantallas 1 hora antes de dormir</li>
                      <li>Mantén tu habitación oscura y fresca</li>
                    </ul>
                  </div>
                  <app-button variant="outline" size="sm">Configurar Alarma de Sueño</app-button>
                </div>
              </app-card>

              <app-card hoverable>
                <div class="recommendation-card">
                  <div class="rec-priority medium">Prioridad Media</div>
                  <h3 class="rec-title">Técnicas de manejo de estrés</h3>
                  <p class="rec-description">
                    Tu nivel de estrés está moderado. Practica técnicas de relajación para reducirlo.
                  </p>
                  <div class="rec-tips">
                    <p><strong>Técnicas sugeridas:</strong></p>
                    <ul>
                      <li>Meditación de 10 minutos</li>
                      <li>Ejercicios de respiración 4-7-8</li>
                      <li>Caminata en naturaleza</li>
                    </ul>
                  </div>
                  <app-button variant="outline" size="sm">Iniciar Meditación Guiada</app-button>
                </div>
              </app-card>
            </div>
          </section>

          <!-- Hydration -->
          <section class="rec-category">
            <h2 class="category-title">💧 Hidratación</h2>
            <div class="recommendations-grid">
              <app-card hoverable>
                <div class="recommendation-card">
                  <div class="rec-priority medium">Prioridad Media</div>
                  <h3 class="rec-title">Aumentar consumo de agua</h3>
                  <p class="rec-description">
                    Estás consumiendo solo el 60% de tu meta diaria de hidratación. El agua es esencial para tu presión arterial.
                  </p>
                  <div class="rec-tips">
                    <p><strong>Consejos:</strong></p>
                    <ul>
                      <li>Bebe un vaso al despertar</li>
                      <li>Lleva una botella contigo</li>
                      <li>Establece recordatorios cada 2 horas</li>
                    </ul>
                  </div>
                  <app-button variant="outline" size="sm">Configurar Recordatorios</app-button>
                </div>
              </app-card>
            </div>
          </section>
        </div>
      </div>
    </div>

    <style>
      .recommendations-view {
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
        margin-bottom: 3rem;
      }

      .recommendations-sections {
        display: flex;
        flex-direction: column;
        gap: 3rem;
      }

      .rec-category {
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

      .recommendations-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 1.5rem;
      }

      .recommendation-card {
        padding: 0.5rem;
      }

      .rec-priority {
        display: inline-block;
        padding: 0.35rem 0.85rem;
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 1rem;
      }

      .rec-priority.high {
        background: #FEE2E2;
        color: #DC2626;
      }

      .rec-priority.medium {
        background: #FEF3C7;
        color: #D97706;
      }

      .rec-priority.low {
        background: #DBEAFE;
        color: #2563EB;
      }

      .rec-title {
        font-family: 'Outfit', sans-serif;
        font-size: 1.25rem;
        font-weight: 700;
        color: #1a1a1a;
        margin-bottom: 0.75rem;
      }

      .rec-description {
        font-size: 1rem;
        line-height: 1.6;
        color: #555;
        margin-bottom: 1rem;
      }

      .rec-tips {
        background: #F9FAFB;
        border-left: 3px solid #1AB8B8;
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 1.25rem;
      }

      .rec-tips p {
        font-weight: 600;
        color: #333;
        margin-bottom: 0.5rem;
      }

      .rec-tips ul {
        margin: 0;
        padding-left: 1.25rem;
        list-style-type: disc;
      }

      .rec-tips li {
        color: #555;
        margin-bottom: 0.25rem;
        font-size: 0.95rem;
      }

      @media (max-width: 768px) {
        .page-title {
          font-size: 2rem;
        }

        .recommendations-grid {
          grid-template-columns: 1fr;
        }

        .rec-category {
          padding: 1.5rem;
        }
      }
    </style>
  `;
}
