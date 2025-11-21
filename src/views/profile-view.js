/**
 * VITAL - Profile View
 * 
 * Vista del perfil de usuario y configuración
 */

export function renderProfileView() {
    return `
    <div class="profile-view">
      <div class="container py-16">
        <!-- Profile Header -->
        <div class="profile-header">
          <div class="profile-avatar">
            <div class="avatar-circle">JD</div>
          </div>
          <div class="profile-info">
            <h1 class="profile-name">Juan Pérez</h1>
            <p class="profile-email">juan.perez@example.com</p>
            <p class="profile-member-since">Miembro desde Noviembre 2025</p>
          </div>
          <app-button variant="outline">Editar Perfil</app-button>
        </div>

        <!-- Profile Content Grid -->
        <div class="profile-grid">
          <!-- Personal Information -->
          <section class="profile-section">
            <h2 class="section-heading">👤 Información Personal</h2>
            <app-card>
              <div class="info-grid">
                <div class="info-item">
                  <label>Nombre Completo</label>
                  <p>Juan Alberto Pérez García</p>
                </div>
                <div class="info-item">
                  <label>Fecha de Nacimiento</label>
                  <p>15 de Marzo, 1985 (40 años)</p>
                </div>
                <div class="info-item">
                  <label>Género</label>
                  <p>Masculino</p>
                </div>
                <div class="info-item">
                  <label>Teléfono</label>
                  <p>+503 7234-5678</p>
                </div>
                <div class="info-item">
                  <label>Dirección</label>
                  <p>San Salvador, El Salvador</p>
                </div>
                <div class="info-item">
                  <label>ID de Usuario</label>
                  <p>#VITAL-2025-1234</p>
                </div>
              </div>
              <app-button variant="outline" size="sm">Actualizar Información</app-button>
            </app-card>
          </section>

          <!-- Health Profile -->
          <section class="profile-section">
            <h2 class="section-heading">🏥 Perfil de Salud</h2>
            <app-card>
              <div class="info-grid">
                <div class="info-item">
                  <label>Peso</label>
                  <p>72 kg</p>
                </div>
                <div class="info-item">
                  <label>Altura</label>
                  <p>175 cm</p>
                </div>
                <div class="info-item">
                  <label>IMC</label>
                  <p>23.5 (Normal)</p>
                </div>
                <div class="info-item">
                  <label>Tipo de Sangre</label>
                  <p>O+</p>
                </div>
                <div class="info-item">
                  <label>Condiciones Preexistentes</label>
                  <p>Pre-hipertensión</p>
                </div>
                <div class="info-item">
                  <label>Alergias</label>
                  <p>Ninguna</p>
                </div>
              </div>
              <app-button variant="outline" size="sm">Actualizar Datos de Salud</app-button>
            </app-card>
          </section>
        </div>

        <!-- Settings & Preferences -->
        <section class="profile-section full-width">
          <h2 class="section-heading">⚙️ Configuración y Preferencias</h2>
          <div class="settings-grid">
            <app-card>
              <h3 class="settings-title">📱 Notificaciones</h3>
              <div class="settings-options">
                <div class="setting-item">
                  <div class="setting-info">
                    <label>Alertas de Salud</label>
                    <p>Recibir notificaciones de alertas críticas</p>
                  </div>
                  <div class="toggle-switch active"></div>
                </div>
                <div class="setting-item">
                  <div class="setting-info">
                    <label>Recordatorios de Medición</label>
                    <p>Recordatorios para tomar mediciones diarias</p>
                  </div>
                  <div class="toggle-switch active"></div>
                </div>
                <div class="setting-item">
                  <div class="setting-info">
                    <label>Recomendaciones Semanales</label>
                    <p>Recibir resumen semanal de recomendaciones</p>
                  </div>
                  <div class="toggle-switch"></div>
                </div>
                <div class="setting-item">
                  <div class="setting-info">
                    <label>Notificaciones por Email</label>
                    <p>Recibir actualizaciones por correo electrónico</p>
                  </div>
                  <div class="toggle-switch active"></div>
                </div>
              </div>
            </app-card>

            <app-card>
              <h3 class="settings-title">🎯 Metas de Salud</h3>
              <div class="goals-list">
                <div class="goal-item">
                  <label>Meta de Pasos Diarios</label>
                  <input type="number" value="10000" class="goal-input">
                  <span class="goal-unit">pasos</span>
                </div>
                <div class="goal-item">
                  <label>Meta de Sueño</label>
                  <input type="number" value="8" step="0.5" class="goal-input">
                  <span class="goal-unit">horas</span>
                </div>
                <div class="goal-item">
                  <label>Meta de Hidratación</label>
                  <input type="number" value="2.5" step="0.1" class="goal-input">
                  <span class="goal-unit">litros</span>
                </div>
                <div class="goal-item">
                  <label>Meta de Calorías</label>
                  <input type="number" value="2200" class="goal-input">
                  <span class="goal-unit">kcal</span>
                </div>
              </div>
              <app-button variant="primary" size="sm">Guardar Metas</app-button>
            </app-card>

            <app-card>
              <h3 class="settings-title">🔒 Privacidad y Seguridad</h3>
              <div class="settings-options">
                <div class="setting-item">
                  <div class="setting-info">
                    <label>Compartir Datos con Promotores</label>
                    <p>Permitir acceso a tus indicadores de salud</p>
                  </div>
                  <div class="toggle-switch active"></div>
                </div>
                <div class="setting-item">
                  <div class="setting-info">
                    <label>Ubicación para Servicios</label>
                    <p>Usar ubicación para encontrar promotores cercanos</p>
                  </div>
                  <div class="toggle-switch active"></div>
                </div>
              </div>
              <div class="security-actions">
                <app-button variant="outline" size="sm">Cambiar Contraseña</app-button>
                <app-button variant="ghost" size="sm">Descargar Mis Datos</app-button>
              </div>
            </app-card>
          </div>
        </section>

        <!-- Danger Zone -->
        <section class="profile-section full-width">
          <h2 class="section-heading">⚠️ Zona de Peligro</h2>
          <app-card>
            <div class="danger-zone">
              <div>
                <h3 class="danger-title">Cerrar Sesión</h3>
                <p class="danger-description">Salir de tu cuenta en este dispositivo</p>
              </div>
              <app-button variant="outline">Cerrar Sesión</app-button>
            </div>
            <div class="divider"></div>
            <div class="danger-zone">
              <div>
                <h3 class="danger-title danger-text">Eliminar Cuenta</h3>
                <p class="danger-description">
                  Eliminar permanentemente tu cuenta y todos tus datos. Esta acción no se puede deshacer.
                </p>
              </div>
              <app-button variant="ghost">Eliminar Cuenta</app-button>
            </div>
          </app-card>
        </section>
      </div>
    </div>

    <style>
      .profile-view {
        background: #fafafa;
        min-height: 100vh;
      }

      .profile-header {
        display: flex;
        align-items: center;
        gap: 2rem;
        background: white;
        padding: 2rem;
        border-radius: 1.5rem;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        margin-bottom: 3rem;
      }

      .profile-avatar {
        flex-shrink: 0;
      }

      .avatar-circle {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: linear-gradient(135deg, #1AB8B8 0%, #4A9B6B 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-family: 'Outfit', sans-serif;
        font-size: 2.5rem;
        font-weight: 800;
      }

      .profile-info {
        flex: 1;
      }

      .profile-name {
        font-family: 'Outfit', sans-serif;
        font-size: 2rem;
        font-weight: 800;
        color: #1a1a1a;
        margin-bottom: 0.25rem;
      }

      .profile-email {
        font-size: 1rem;
        color: #666;
        margin-bottom: 0.25rem;
      }

      .profile-member-since {
        font-size: 0.9rem;
        color: #999;
      }

      .profile-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
      }

      .profile-section {
        margin-bottom: 2rem;
      }

      .profile-section.full-width {
        grid-column: 1 / -1;
      }

      .section-heading {
        font-family: 'Outfit', sans-serif;
        font-size: 1.75rem;
        font-weight: 700;
        color: #1a1a1a;
        margin-bottom: 1rem;
      }

      .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-bottom: 1.5rem;
      }

      .info-item label {
        display: block;
        font-size: 0.85rem;
        font-weight: 600;
        color: #666;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 0.5rem;
      }

      .info-item p {
        font-size: 1rem;
        color: #1a1a1a;
        font-weight: 500;
      }

      .settings-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 1.5rem;
      }

      .settings-title {
        font-family: 'Outfit', sans-serif;
        font-size: 1.25rem;
        font-weight: 700;
        color: #1a1a1a;
        margin-bottom: 1.5rem;
      }

      .settings-options {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }

      .setting-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 1rem;
        border-bottom: 1px solid #E5E7EB;
      }

      .setting-item:last-child {
        border-bottom: none;
        padding-bottom: 0;
      }

      .setting-info {
        flex: 1;
      }

      .setting-info label {
        display: block;
        font-size: 1rem;
        font-weight: 600;
        color: #1a1a1a;
        margin-bottom: 0.25rem;
      }

      .setting-info p {
        font-size: 0.85rem;
        color: #666;
      }

      .toggle-switch {
        width: 50px;
        height: 28px;
        background: #E5E7EB;
        border-radius: 999px;
        position: relative;
        cursor: pointer;
        transition: background 0.3s ease;
      }

      .toggle-switch::after {
        content: '';
        position: absolute;
        top: 3px;
        left: 3px;
        width: 22px;
        height: 22px;
        background: white;
        border-radius: 50%;
        transition: transform 0.3s ease;
      }

      .toggle-switch.active {
        background: #1AB8B8;
      }

      .toggle-switch.active::after {
        transform: translateX(22px);
      }

      .goals-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 1.5rem;
      }

      .goal-item {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .goal-item label {
        flex: 1;
        font-size: 0.95rem;
        font-weight: 500;
        color: #333;
      }

      .goal-input {
        width: 80px;
        padding: 0.5rem;
        border: 1px solid #E5E7EB;
        border-radius: 0.5rem;
        font-size: 1rem;
        text-align: center;
      }

      .goal-unit {
        font-size: 0.85rem;
        color: #666;
        min-width: 50px;
      }

      .security-actions {
        display: flex;
        gap: 1rem;
        margin-top: 1.5rem;
      }

      .danger-zone {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem 0;
      }

      .danger-title {
        font-family: 'Outfit', sans-serif;
        font-size: 1.1rem;
        font-weight: 700;
        color: #1a1a1a;
        margin-bottom: 0.25rem;
      }

      .danger-title.danger-text {
        color: #DC2626;
      }

      .danger-description {
        font-size: 0.9rem;
        color: #666;
        max-width: 500px;
      }

      .divider {
        height: 1px;
        background: #E5E7EB;
        margin: 0;
      }

      @media (max-width: 768px) {
        .profile-header {
          flex-direction: column;
          text-align: center;
        }

        .profile-grid {
          grid-template-columns: 1fr;
        }

        .info-grid {
          grid-template-columns: 1fr;
        }

        .settings-grid {
          grid-template-columns: 1fr;
        }

        .danger-zone {
          flex-direction: column;
          gap: 1rem;
          text-align: center;
        }
      }
    </style>
  `;
}
