/**
 * VITAL - Login View
 *
 * Vista de inicio de sesión
 */

import { authService } from '../../services/auth.service.js';
import { router } from '../../router/router.js';

export function renderLoginView() {
  // Si ya está autenticado, redirigir según rol
  if (authService.isAuthenticated()) {
    if (authService.isAdmin()) {
      router.navigate('/admin/dashboard');
    } else {
      router.navigate('/dashboard');
    }
    return '';
  }

  // Setup global login handler
  window.handleLogin = async (username, password) => {
    try {
      const user = await authService.login(username, password);
      // Redirect based on role
      if (authService.isAdmin()) {
        router.navigate('/admin/dashboard');
      } else {
        router.navigate('/dashboard');
      }
      // Force page reload to update navbar
      window.location.reload();
    } catch (error) {
      throw error;
    }
  };

  return `
    <style>
      .login-container {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #E0F2F1 0%, #B2DFDB 50%, #80CBC4 100%);
        padding: 2rem;
      }
      .login-card {
        background: white;
        border-radius: 1.5rem;
        padding: 3rem;
        box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        max-width: 450px;
        width: 100%;
      }
      .login-header { text-align: center; margin-bottom: 2.5rem; }
      .login-logo { font-size: 4rem; margin-bottom: 1rem; }
      .login-title { font-family: 'Outfit', sans-serif; font-size: 2rem; font-weight: 900; color: #1F2937; margin: 0 0 0.5rem 0; }
      .login-subtitle { font-size: 1rem; color: #6B7280; margin: 0; }
      .login-form { display: flex; flex-direction: column; gap: 1.5rem; }
      .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
      .form-label { font-weight: 600; color: #374151; font-size: 0.95rem; }
      .form-input { padding: 1rem; border: 2px solid #E5E7EB; border-radius: 0.75rem; font-size: 1rem; transition: all 0.2s; }
      .form-input:focus { outline: none; border-color: #1AB8B8; box-shadow: 0 0 0 4px rgba(26,184,184,0.1); }
      .btn-login { padding: 1rem; background: linear-gradient(135deg, #1AB8B8, #4A9B6B); color: white; border: none; border-radius: 0.75rem; font-size: 1.1rem; font-weight: 700; cursor: pointer; transition: all 0.3s; margin-top: 0.5rem; }
      .btn-login:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(26,184,184,0.3); }
      .btn-login:active { transform: translateY(0); }
      .btn-login:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
      .error-message { background: #FEE2E2; color: #DC2626; padding: 1rem; border-radius: 0.75rem; font-size: 0.95rem; border-left: 4px solid #DC2626; display: none; }
      .error-message.show { display: block; }
      .demo-credentials { margin-top: 2rem; padding: 1.5rem; background: #F9FAFB; border-radius: 0.75rem; border: 1px dashed #D1D5DB; }
      .demo-title { font-weight: 700; color: #374151; margin: 0 0 1rem 0; font-size: 0.95rem; }
      .demo-user { font-size: 0.85rem; color: #6B7280; margin: 0.5rem 0; font-family: 'Courier New', monospace; }
      @media (max-width: 768px) { .login-card { padding: 2rem; } .login-title { font-size: 1.75rem; } }
    </style>
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <div class="login-logo">💙</div>
          <h1 class="login-title">VITAL</h1>
          <p class="login-subtitle">Plataforma de Salud Preventiva</p>
        </div>
        <div class="error-message" id="error-message"></div>
        <form class="login-form" id="login-form">
          <div class="form-group">
            <label class="form-label" for="username">Usuario</label>
            <input type="text" id="username" class="form-input" placeholder="admin o user" required />
          </div>
          <button type="submit" class="btn-login" id="login-btn">Iniciar Sesión</button>
        </form>
        <div class="demo-credentials">
          <p class="demo-title">🔑 Credenciales de Demo:</p>
          <p class="demo-user"><strong>🏢 VITAL Empresarial:</strong> admin / admin</p>
          <p class="demo-user" style="margin-bottom: 0.25rem;">→ 8 módulos administrativos</p>
          <hr style="margin: 1rem 0; border: none; border-top: 1px dashed #D1D5DB;" />
          <p class="demo-user"><strong>👤 VITAL Persona:</strong> user / user</p>
          <p class="demo-user" style="margin-bottom: 0;">→ 6 módulos de usuario</p>
        </div>
      </div>
    </div>
    <script>
      // Setup login form handler
      setTimeout(() => {
        const form = document.getElementById('login-form');
        const errorMessage = document.getElementById('error-message');
        const loginBtn = document.getElementById('login-btn');
        if (form) {
          form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = '';
            errorMessage.classList.remove('show');
            loginBtn.disabled = true;
            loginBtn.textContent = 'Iniciando sesión...';
            try {
              await window.handleLogin(username, password);
            } catch (error) {
              errorMessage.textContent = error.message || 'Error al iniciar sesión';
              errorMessage.classList.add('show');
              loginBtn.disabled = false;
              loginBtn.textContent = 'Iniciar Sesión';
            }
          });
        }
      }, 100);
    </script>
  `;
}
