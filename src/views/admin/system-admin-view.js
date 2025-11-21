/**
 * VITAL v2.0 - System Administration View
 * 
 * Vista para administración general del sistema
 */

import { authService } from '../../services/auth.service.js';

export function renderSystemAdminView() {

  return `
    <div class="system-admin-container" style="padding: 2rem; max-width: 1400px; margin: 0 auto;">
      <!-- Header -->
      <div style="margin-bottom: 2rem;">
        <h1 style="margin: 0; font-size: 2rem; color: #1a1a1a;">⚙️ Administración del Sistema</h1>
        <p style="margin: 0.5rem 0 0; color: #666;">Configuración, usuarios y mantenimiento</p>
      </div>

      <!-- System Health -->
      <div style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.25rem; margin-bottom: 1rem;">🏥 Estado del Sistema</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
          <kpi-card
            title="Uptime"
            value="99.8%"
            change="+0.2"
            trend="positive"
            icon="⚡"
            color="#10B981"
          >
            <span slot="footer">45 días sin incidentes</span>
          </kpi-card>

          <kpi-card
            title="API Latency"
            value="45ms"
            change="-12.5"
            trend="positive"
            icon="🚀"
            color="#3B82F6"
          >
            <span slot="footer">Promedio p95</span>
          </kpi-card>

          <kpi-card
            title="Storage Used"
            value="67%"
            change="+3.2"
            trend="neutral"
            icon="💾"
            color="#F59E0B"
          >
            <span slot="footer">234 GB de 350 GB</span>
          </kpi-card>

          <kpi-card
            title="Active Sessions"
            value="142"
            change="+8.5"
            trend="positive"
            icon="👥"
            color="#1AB8B8"
          >
            <span slot="footer">Usuarios conectados</span>
          </kpi-card>
        </div>
      </div>

      <!-- User Management -->
      <div style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <h2 style="margin: 0; font-size: 1.25rem;">👥 Gestión de Usuarios</h2>
          <app-button variant="primary" onclick="addNewUser()">➕ Nuevo Usuario</app-button>
        </div>

        <advanced-table
          data-items='${JSON.stringify(getMockUsers())}'
          data-columns='${JSON.stringify([
    { key: 'name', label: 'Nombre', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Rol', type: 'badge' },
    { key: 'lastLogin', label: 'Último Acceso', type: 'date', sortable: true },
    { key: 'status', label: 'Estado', type: 'badge' }
  ])}'
          data-page-size="8"
          data-searchable="true"
        ></advanced-table>
      </div>

      <!-- System Configuration -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
        <!-- General Settings -->
        <div style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <h3 style="margin: 0 0 1.5rem; font-size: 1.1rem;">⚙️ Configuración General</h3>
          
          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; font-weight: 600; margin-bottom: 0.5rem;">Nombre del Sistema</label>
            <input 
              type="text" 
              value="VITAL - Sistema Nacional de Salud Preventiva"
              style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem;"
            >
          </div>

          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; font-weight: 600; margin-bottom: 0.5rem;">URL del Sistema</label>
            <input 
              type="url" 
              value="https://vital.gob.sv"
              style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem;"
            >
          </div>

          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; font-weight: 600; margin-bottom: 0.5rem;">Zona Horaria</label>
            <select style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem;">
              <option value="America/El_Salvador" selected>América/El Salvador (GMT-6)</option>
              <option value="America/Guatemala">América/Guatemala (GMT-6)</option>
              <option value="America/Tegucigalpa">América/Tegucigalpa (GMT-6)</option>
            </select>
          </div>

          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; font-weight: 600; margin-bottom: 0.5rem;">Idioma del Sistema</label>
            <select style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem;">
              <option value="es" selected>Español</option>
              <option value="en">English</option>
            </select>
          </div>

          <label style="display: flex; align-items: center; margin-bottom: 1rem; cursor: pointer;">
            <input type="checkbox" checked style="margin-right: 0.75rem; width: 18px; height: 18px;">
            <span>Mantenimiento programado activo</span>
          </label>

          <label style="display: flex; align-items: center; cursor: pointer;">
            <input type="checkbox" checked style="margin-right: 0.75rem; width: 18px; height: 18px;">
            <span>Notificaciones de sistema habilitadas</span>
          </label>
        </div>

        <!-- Integration Settings -->
        <div style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <h3 style="margin: 0 0 1.5rem; font-size: 1.1rem;">🔌 Integraciones</h3>
          
          ${renderIntegrationCard('Smartbands API', 'Conexión con dispositivos IoT', 'active', '✅')}
          ${renderIntegrationCard('SMS Gateway', 'Envío de alertas por SMS', 'active', '✅')}
          ${renderIntegrationCard('PROSINT', 'Sistema nacional de salud', 'pending', '⏳')}
          ${renderIntegrationCard('Email SMTP', 'Servidor de correos', 'active', '✅')}
          ${renderIntegrationCard('WebSocket Server', 'Datos en tiempo real', 'active', '✅')}
          ${renderIntegrationCard('Backup Storage', 'Almacenamiento cloud', 'inactive', '❌')}
        </div>
      </div>

      <!-- System Logs -->
      <div style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <h2 style="margin: 0; font-size: 1.25rem;">📜 Logs del Sistema</h2>
          <div style="display: flex; gap: 0.5rem;">
            <app-button variant="outline" size="sm" onclick="downloadLogs()">📥 Descargar</app-button>
            <app-button variant="outline" size="sm" onclick="clearLogs()">🗑️ Limpiar</app-button>
          </div>
        </div>

        <div style="background: #1a1a1a; border-radius: 8px; padding: 1.5rem; font-family: 'Courier New', monospace; font-size: 0.85rem; color: #00ff00; max-height: 400px; overflow-y: auto;">
          ${getMockLogs().map(log => `<div style="margin-bottom: 0.5rem;">${log}</div>`).join('')}
        </div>
      </div>

      <!-- Database Management -->
      <div style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 2rem;">
        <h2 style="margin: 0 0 1.5rem; font-size: 1.25rem;">🗄️ Gestión de Base de Datos</h2>
        
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 2rem;">
          <div style="text-align: center; padding: 1.5rem; border: 2px solid #E5E7EB; border-radius: 12px;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">📊</div>
            <div style="font-size: 1.5rem; font-weight: 800; color: #1a1a1a; margin-bottom: 0.25rem;">2.4 GB</div>
            <div style="font-size: 0.9rem; color: #666;">Tamaño de DB</div>
          </div>
          <div style="text-align: center; padding: 1.5rem; border: 2px solid #E5E7EB; border-radius: 12px;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">📝</div>
            <div style="font-size: 1.5rem; font-weight: 800; color: #1a1a1a; margin-bottom: 0.25rem;">87,542</div>
            <div style="font-size: 0.9rem; color: #666;">Total de Registros</div>
          </div>
          <div style="text-align: center; padding: 1.5rem; border: 2px solid #E5E7EB; border-radius: 12px;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔄</div>
            <div style="font-size: 1.5rem; font-weight: 800; color: #1a1a1a; margin-bottom: 0.25rem;">2h ago</div>
            <div style="font-size: 0.9rem; color: #666;">Último Backup</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
          <app-button variant="primary" onclick="createBackup()">💾 Crear Backup</app-button>
          <app-button variant="outline" onclick="restoreBackup()">♻️ Restaurar Backup</app-button>
          <app-button variant="outline" onclick="optimizeDB()">⚡ Optimizar DB</app-button>
          <app-button variant="outline" onclick="vacuumDB()">🗑️ Vacuum DB</app-button>
        </div>
      </div>

      <!-- Action Buttons -->
      <div style="display: flex; gap: 1rem; justify-content: flex-end;">
        <app-button variant="outline" onclick="resetSettings()">🔄 Restaurar Config</app-button>
        <app-button variant="primary" onclick="saveSystemSettings()">💾 Guardar Cambios</app-button>
      </div>
    </div>

    <script>
      function addNewUser() {
        alert('➕ Agregar nuevo usuario - Modal se abrirá aquí');
      }

      function createBackup() {
        if (confirm('¿Crear backup de la base de datos?')) {
          alert('💾 Creando backup...');
        }
      }

      function restoreBackup() {
        if (confirm('⚠️ ¿Restaurar backup? Esta acción sobrescribirá datos actuales.')) {
          alert('♻️ Restaurando backup...');
        }
      }

      function optimizeDB() {
        alert('⚡ Optimizando base de datos...');
      }

      function vacuumDB() {
        alert('🗑️ Ejecutando VACUUM en la base de datos...');
      }

      function downloadLogs() {
        alert('📥 Descargando logs del sistema...');
      }

      function clearLogs() {
        if (confirm('¿Limpiar logs del sistema?')) {
          alert('🗑️ Logs eliminados');
        }
      }

      function saveSystemSettings() {
        alert('✅ Configuración guardada exitosamente');
      }

      function resetSettings() {
        if (confirm('¿Restaurar configuración por defecto?')) {
          alert('🔄 Configuración restaurada');
        }
      }
    </script>
  `;
}

function renderIntegrationCard(name, description, status, icon) {
  const statusColors = {
    active: { bg: '#D1FAE5', border: '#10B981', text: '#065F46' },
    pending: { bg: '#FEF3C7', border: '#F59E0B', text: '#92400E' },
    inactive: { bg: '#FEE2E2', border: '#EF4444', text: '#991B1B' }
  };

  const color = statusColors[status];

  return `
    <div style="
      padding: 1rem;
      border: 2px solid ${color.border};
      background: ${color.bg};
      border-radius: 12px;
      margin-bottom: 1rem;
      transition: all 0.3s;
      cursor: pointer;
    "
    onmouseover="this.style.transform='scale(1.02)'"
    onmouseout="this.style.transform='scale(1)'"
    >
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
        <div style="font-weight: 700; color: ${color.text};">${name}</div>
        <div style="font-size: 1.25rem;">${icon}</div>
      </div>
      <div style="font-size: 0.85rem; color: ${color.text};">${description}</div>
    </div>
  `;
}

function getMockUsers() {
  return [
    {
      name: 'Juan Pérez',
      email: 'admin@vital.sv',
      role: 'admin_general',
      lastLogin: '2024-11-21',
      status: 'active'
    },
    {
      name: 'María González',
      email: 'manager@vital.sv',
      role: 'program_manager',
      lastLogin: '2024-11-20',
      status: 'active'
    },
    {
      name: 'Carlos Méndez',
      email: 'promotor@vital.sv',
      role: 'promoter',
      lastLogin: '2024-11-19',
      status: 'active'
    },
    {
      name: 'Ana López',
      email: 'data@vital.sv',
      role: 'data_scientist',
      lastLogin: '2024-11-18',
      status: 'active'
    },
    {
      name: 'Roberto Sánchez',
      email: 'viewer@vital.sv',
      role: 'viewer',
      lastLogin: '2024-11-15',
      status: 'inactive'
    }
  ];
}

function getMockLogs() {
  return [
    '[2024-11-21 01:40:12] INFO: User admin@vital.sv logged in from 192.168.1.105',
    '[2024-11-21 01:38:45] INFO: Database backup completed successfully',
    '[2024-11-21 01:35:22] WARNING: High memory usage detected: 78%',
    '[2024-11-21 01:30:15] INFO: Scheduled report generation started',
    '[2024-11-21 01:25:08] INFO: WebSocket connection established with device SB-8901',
    '[2024-11-21 01:20:33] ERROR: Failed to send SMS alert to +503-7890-1234',
    '[2024-11-21 01:15:47] INFO: AI model prediction completed for patient P-1247',
    '[2024-11-21 01:10:12] INFO: Data sync completed: 234 records updated',
    '[2024-11-21 01:05:28] INFO: Scheduled maintenance task completed',
    '[2024-11-21 01:00:00] INFO: Daily health check passed'
  ];
}
