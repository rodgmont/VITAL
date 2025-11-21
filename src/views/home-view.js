/**
 * VITAL - Home View
 * 
 * Página de inicio principal basada en el diseño proporcionado
 */

export function renderHomeView() {
  return `
    <div class="home-view">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <div class="container">
            <div class="hero-text">
              <h1 class="hero-title">
                VITAL: Detectando la<br>
                <span class="highlight">Crisis Silenciosa</span> Antes<br>
                de que Golpee.
              </h1>
              <p class="hero-subtitle">
                Salud proactiva para El Salvador. Tecnología usable +<br>
                promotores comunitarios para salvar vidas.
              </p>
              <app-button variant="primary" size="lg" class="hero-cta">
                Conoce el Modelo
              </app-button>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats Section - "La Realidad: Una Crisis Oculta" -->
      <section class="stats-section section">
        <div class="container">
          <h2 class="section-title text-center">La Realidad: Una Crisis Oculta</h2>
          
          <div class="stats-grid">
            <app-card variant="glass" hoverable>
              <div class="stat-item">
                <div class="stat-icon">❤️</div>
                <div class="stat-content">
                  <div class="stat-number">1.4M</div>
                  <div class="stat-label">con Hipertensión</div>
                  <div class="stat-sublabel">(Muchos sin diagnóstico)</div>
                </div>
              </div>
            </app-card>

            <app-card variant="glass" hoverable>
              <div class="stat-item">
                <div class="stat-icon">⏰</div>
                <div class="stat-content">
                  <div class="stat-number">4 Horas</div>
                  <div class="stat-label">Espera Promedio en</div>
                  <div class="stat-sublabel">Unidades de Salud</div>
                </div>
              </div>
            </app-card>

            <app-card variant="glass" hoverable>
              <div class="stat-item">
                <div class="stat-icon">👥</div>
                <div class="stat-content">
                  <div class="stat-number">50%+</div>
                  <div class="stat-label">Hospitalizaciones en Edad</div>
                  <div class="stat-sublabel">Productiva (30-69 años)</div>
                </div>
              </div>
            </app-card>
          </div>
        </div>
      </section>

      <!-- How It Works Section - "Cómo Funciona" -->
      <section class="how-it-works section bg-gradient-wellness">
        <div class="container">
          <h2 class="section-title text-center text-white">
            Cómo Funciona:<br>
            <span style="font-weight: 600;">Tecnología al Servicio de la Comunidad</span>
          </h2>
          
          <div class="steps-container">
            <div class="step">
              <div class="step-icon">⌚</div>
              <div class="step-number">1</div>
              <h3 class="step-title">Monitoreo Pasivo</h3>
              <p class="step-description">
                Smartband mide ritmos y presión 24/7 sin que el usuario haga nada.
              </p>
            </div>

            <div class="step-arrow">→</div>

            <div class="step">
              <div class="step-icon">🧠</div>
              <div class="step-number">2</div>
              <h3 class="step-title">Análisis IA Local</h3>
              <p class="step-description">
                IA detecta patrones sutiles y tendencias anormales (funciona con señal 2G).
              </p>
            </div>

            <div class="step-arrow">→</div>

            <div class="step">
              <div class="step-icon">📱</div>
              <div class="step-number">3</div>
              <h3 class="step-title">Alerta al Promotor</h3>
              <p class="step-description">
                La alerta NO va al paciente. Se notifica al promotor para visita prioritaria.
              </p>
            </div>

            <div class="step-arrow">→</div>

            <div class="step">
              <div class="step-icon">🏥</div>
              <div class="step-number">4</div>
              <h3 class="step-title">Acción Humana</h3>
              <p class="step-description">
                Visita en <24h para confirmación médica y plan preventivo.
              </p>
            </div>
          </div>

          <div class="tagline">
            No reemplazamos al médico. Usamos datos para guiar la atención humana dónde más se necesita.
          </div>
        </div>
      </section>

      <!-- Mission Section -->
      <section class="mission-section section">
        <div class="container">
          <div class="mission-content">
            <div class="mission-text">
              <h2 class="mission-title">Nuestra Misión</h2>
              <p class="mission-description">
                VITAL transforma la salud preventiva en El Salvador combinando tecnología accesible 
                con el poder del trabajo comunitario. Detectamos crisis silenciosas antes de que se 
                conviertan en emergencias, salvando vidas y reduciendo la carga en el sistema de salud.
              </p>
              <p class="mission-description">
                Creemos que cada persona merece acceso a monitoreo de salud de calidad, sin importar 
                dónde viva o sus recursos económicos.
              </p>
              <app-button variant="outline">
                Conoce Más Sobre VITAL
              </app-button>
            </div>
            <div class="mission-visual">
              <div class="mission-card glass">
                <h3>🎯 Nuestro Impacto</h3>
                <ul class="impact-list">
                  <li>✅ Detección temprana de hipertensión</li>
                  <li>✅ Reducción de hospitalizaciones</li>
                  <li>✅ Acceso equitativo a salud preventiva</li>
                  <li>✅ Empoderamiento comunitario</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section section">
        <div class="container">
          <div class="cta-card">
            <h2 class="cta-title">Comienza a Monitorear Tu Salud Hoy</h2>
            <p class="cta-description">
              Únete a miles de salvadoreños que ya están tomando control de su salud preventiva.
            </p>
            <div class="cta-buttons">
              <app-button variant="primary" size="lg">
                Crear Cuenta
              </app-button>
              <app-button variant="outline" size="lg">
                Ver Demo
              </app-button>
            </div>
          </div>
        </div>
      </section>
    </div>

    <style>
      /* Hero Section */
      .hero {
        position: relative;
        min-height: 600px;
        display: flex;
        align-items: center;
        background: linear-gradient(135deg, rgba(26, 184, 184, 0.05) 0%, rgba(74, 155, 107, 0.05) 100%),
                    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><rect fill="%23f0fdf4" width="1200" height="600"/></svg>');
        background-size: cover;
        background-position: center;
        overflow: hidden;
      }

      .hero::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, 
          hsla(174, 70%, 42%, 0.1) 0%, 
          hsla(142, 55%, 38%, 0.1) 100%);
      }

      .hero-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 30% 50%, 
          rgba(26, 184, 184, 0.15) 0%, 
          transparent 50%);
      }

      .hero-content {
        position: relative;
        z-index: 2;
        width: 100%;
        padding: 4rem 0;
      }

      .hero-text {
        max-width: 800px;
        animation: fadeIn 1s ease-out;
      }

      .hero-title {
        font-family: 'Outfit', sans-serif;
        font-size: 3.5rem;
        font-weight: 900;
        line-height: 1.2;
        color: #1a1a1a;
        margin-bottom: 1.5rem;
      }

      .hero-title .highlight {
        background: linear-gradient(135deg, #1AB8B8 0%, #4A9B6B 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .hero-subtitle {
        font-size: 1.25rem;
        line-height: 1.6;
        color: #555;
        margin-bottom: 2.5rem;
        font-weight: 400;
      }

      .hero-cta {
        margin-top: 1rem;
      }

      /* Stats Section */
      .stats-section {
        background: linear-gradient(180deg, #fafafa 0%, white 100%);
      }

      .section-title {
        font-family: 'Outfit', sans-serif;
        font-size: 2.5rem;
        font-weight: 800;
        color: #1a1a1a;
        margin-bottom: 3rem;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
      }

      .stat-item {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        padding: 1.5rem;
      }

      .stat-icon {
        font-size: 3.5rem;
        flex-shrink: 0;
      }

      .stat-content {
        flex: 1;
      }

      .stat-number {
        font-family: 'Outfit', sans-serif;
        font-size: 2.5rem;
        font-weight: 900;
        color: #1AB8B8;
        line-height: 1;
        margin-bottom: 0.5rem;
      }

      .stat-label {
        font-size: 1rem;
        font-weight: 600;
        color: #333;
        line-height: 1.3;
      }

      .stat-sublabel {
        font-size: 0.875rem;
        color: #666;
        margin-top: 0.25rem;
      }

      /* How It Works Section */
      .how-it-works {
        position: relative;
        overflow: hidden;
      }

      .how-it-works::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, 
          rgba(26, 184, 184, 0.9) 0%, 
          rgba(74, 155, 107, 0.9) 50%,
          rgba(59, 130, 246, 0.9) 100%);
        z-index: 0;
      }

      .how-it-works .container {
        position: relative;
        z-index: 1;
      }

      .steps-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1.5rem;
        margin: 3rem 0;
        flex-wrap: wrap;
      }

      .step {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-radius: 1.5rem;
        padding: 2rem 1.5rem;
        text-align: center;
        flex: 1;
        min-width: 200px;
        max-width: 250px;
        position: relative;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
      }

      .step:hover {
        transform: translateY(-8px);
      }

      .step-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
      }

      .step-number {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: #1AB8B8;
        color: white;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        font-size: 1rem;
      }

      .step-title {
        font-family: 'Outfit', sans-serif;
        font-size: 1.25rem;
        font-weight: 700;
        color: #1a1a1a;
        margin-bottom: 0.75rem;
      }

      .step-description {
        font-size: 0.9rem;
        color: #555;
        line-height: 1.5;
      }

      .step-arrow {
        font-size: 2rem;
        color: white;
        font-weight: 900;
      }

      .tagline {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-radius: 1rem;
        padding: 1.5rem 2rem;
        text-align: center;
        font-size: 1.1rem;
        font-weight: 600;
        color: #1a1a1a;
        margin-top: 3rem;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      }

      /* Mission Section */
      .mission-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        align-items: center;
      }

      .mission-title {
        font-family: 'Outfit', sans-serif;
        font-size: 2.5rem;
        font-weight: 800;
        color: #1a1a1a;
        margin-bottom: 1.5rem;
      }

      .mission-description {
        font-size: 1.1rem;
        line-height: 1.7;
        color: #555;
        margin-bottom: 1.5rem;
      }

      .mission-card {
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(10px);
        border-radius: 1.5rem;
        padding: 2rem;
        border: 1px solid rgba(26, 184, 184, 0.2);
      }

      .mission-card h3 {
        font-family: 'Outfit', sans-serif;
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        color: #1AB8B8;
      }

      .impact-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .impact-list li {
        font-size: 1rem;
        padding: 0.75rem 0;
        color: #333;
        font-weight: 500;
      }

      /* CTA Section */
      .cta-section {
        background: linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%);
      }

      .cta-card {
        text-align: center;
        padding: 4rem 2rem;
      }

      .cta-title {
        font-family: 'Outfit', sans-serif;
        font-size: 2.5rem;
        font-weight: 800;
        color: #1a1a1a;
        margin-bottom: 1rem;
      }

      .cta-description {
        font-size: 1.2rem;
        color: #555;
        margin-bottom: 2.5rem;
      }

      .cta-buttons {
        display: flex;
        gap: 1.5rem;
        justify-content: center;
        flex-wrap: wrap;
      }

      /* Responsive */
      @media (max-width: 768px) {
        .hero-title {
          font-size: 2.5rem;
        }

        .hero-subtitle {
          font-size: 1.1rem;
        }

        .steps-container {
          flex-direction: column;
        }

        .step-arrow {
          transform: rotate(90deg);
        }

        .mission-content {
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        .section-title {
          font-size: 2rem;
        }

        .stat-number {
          font-size: 2rem;
        }
      }
    </style>
  `;
}
