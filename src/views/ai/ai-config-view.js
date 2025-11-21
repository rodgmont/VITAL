/**
 * VITAL v2.0 - AI Configuration View
 * 
 * Vista para configuración y monitoreo del módulo de IA
 */

import { authService } from '../../services/auth.service.js';

export function renderAIConfigView() {

  return `
    <div class="ai-config-container" style="padding: 2rem; max-width: 1400px; margin: 0 auto;">
      <!-- Header -->
      <div style="margin-bottom: 2rem;">
        <h1 style="margin: 0; font-size: 2rem; color: #1a1a1a;">🤖 Configuración de IA</h1>
        <p style="margin: 0.5rem 0 0; color: #666;">Parámetros de detección y algoritmos de predicción</p>
      </div>

      <!-- AI Status -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
        <kpi-card
          title="Modelo Activo"
          value="v3.2.1"
          change="0"
          trend="neutral"
          icon="🧠"
          color="#4F46E5"
        >
          <span slot="footer">Última actualización: 15/10/2024</span>
        </kpi-card>

        <kpi-card
          title="Precisión"
          value="94.2%"
          change="+2.1"
          trend="positive"
          icon="🎯"
          color="#10B981"
        >
          <span slot="footer">En validación cruzada</span>
        </kpi-card>

        <kpi-card
          title="Alertas Generadas"
          value="1,247"
          change="+18.5"
          trend="positive"
          icon="⚠️"
          color="#F59E0B"
        >
          <span slot="footer">Último mes</span>
        </kpi-card>

        <kpi-card
          title="Tasa de Acierto"
          value="91.8%"
          change="+1.3"
          trend="positive"
          icon="✅"
          color="#1AB8B8"
        >
          <span slot="footer">Confirmadas por médicos</span>
        </kpi-card>
      </div>

      <!-- Configuration Panels -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
        <!-- Risk Detection Parameters -->
        <div style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <h2 style="margin: 0 0 1.5rem; font-size: 1.25rem;">🔍 Parámetros de Detección de Riesgo</h2>
          
          ${renderSliderParameter('Sensibilidad de Alertas', 'sensitivity', 75, 0, 100, '%')}
          ${renderSliderParameter('Umbral de Riesgo Alto', 'highRisk', 80, 0, 100, '%')}
          ${renderSliderParameter('Umbral de Riesgo Medio', 'mediumRisk', 50, 0, 100, '%')}
          ${renderSliderParameter('Ventana Temporal (días)', 'timeWindow', 7, 1, 30, ' días')}
          
          <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #eee;">
            <label style="display: flex; align-items: center; margin-bottom: 1rem; cursor: pointer;">
              <input type="checkbox" checked style="margin-right: 0.75rem; width: 18px; height: 18px;">
              <span>Alertas automáticas a promotores</span>
            </label>
            <label style="display: flex; align-items: center; margin-bottom: 1rem; cursor: pointer;">
              <input type="checkbox" checked style="margin-right: 0.75rem; width: 18px; height: 18px;">
              <span>Notificación SMS para riesgo alto</span>
            </label>
            <label style="display: flex; align-items: center; cursor: pointer;">
              <input type="checkbox" style="margin-right: 0.75rem; width: 18px; height: 18px;">
              <span>Modo de aprendizaje continuo</span>
            </label>
          </div>
        </div>

        <!-- Vital Signs Thresholds -->
        <div style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <h2 style="margin: 0 0 1.5rem; font-size: 1.25rem;">💓 Umbrales de Signos Vitales</h2>
          
          ${renderThresholdInput('Frecuencia Cardíaca Alta', 'hrHigh', 100, 'bpm')}
          ${renderThresholdInput('Frecuencia Cardíaca Baja', 'hrLow', 60, 'bpm')}
          ${renderThresholdInput('Presión Sistólica Alta', 'sysHigh', 140, 'mmHg')}
          ${renderThresholdInput('Presión Diastólica Alta', 'diaHigh', 90, 'mmHg')}
          ${renderThresholdInput('SpO2 Mínimo', 'spo2Low', 95, '%')}
          ${renderThresholdInput('Temperatura Alta', 'tempHigh', 37.5, '°C')}
        </div>
      </div>

      <!-- Model Training -->
      <div style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 2rem;">
        <h2 style="margin: 0 0 1.5rem; font-size: 1.25rem;">🎓 Entrenamiento del Modelo</h2>
        
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
          <div>
            <div style="margin-bottom: 1.5rem;">
              <label style="display: block; font-weight: 600; margin-bottom: 0.5rem;">Dataset</label>
              <select style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem;">
                <option value="full">Dataset Completo (45,892 registros)</option>
                <option value="validated">Solo Validados (32,104 registros)</option>
                <option value="recent">Últimos 6 meses (18,543 registros)</option>
                <option value="custom">Personalizado</option>
              </select>
            </div>

            <div style="margin-bottom: 1.5rem;">
              <label style="display: block; font-weight: 600; margin-bottom: 0.5rem;">Algoritmo</label>
              <select style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem;">
                <option value="rf">Random Forest (actual)</option>
                <option value="xgboost">XGBoost</option>
                <option value="lstm">LSTM Neural Network</option>
                <option value="ensemble">Ensemble Multi-modelo</option>
              </select>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div>
                <label style="display: block; font-weight: 600; margin-bottom: 0.5rem;">Train/Test Split</label>
                <input type="number" value="80" min="50" max="95" style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 8px;">
              </div>
              <div>
                <label style="display: block; font-weight: 600; margin-bottom: 0.5rem;">Épocas</label>
                <input type="number" value="100" min="10" max="1000" style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 8px;">
              </div>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="background: #F0F9FF; border: 2px solid #3B82F6; border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
                <div style="font-size: 0.85rem; color: #1E40AF; font-weight: 600; margin-bottom: 0.25rem;">Último Entrenamiento</div>
                <div style="font-size: 0.9rem; color: #60A5FA;">15 Oct 2024, 03:42 AM</div>
              </div>
              
              <div style="background: #F0FDF4; border: 2px solid #10B981; border-radius: 8px; padding: 1rem;">
                <div style="font-size: 0.85rem; color: #047857; font-weight: 600; margin-bottom: 0.25rem;">Duración</div>
                <div style="font-size: 0.9rem; color: #34D399;">2h 34m</div>
              </div>
            </div>

            <app-button variant="primary" onclick="startTraining()" style="width: 100%;">
              🚀 Iniciar Entrenamiento
            </app-button>
          </div>
        </div>

        <!-- Training Progress (hidden by default) -->
        <div id="trainingProgress" style="display: none; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #eee;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span style="font-weight: 600;">Progreso del Entrenamiento</span>
            <span id="progressPercent">0%</span>
          </div>
          <div style="background: #E5E7EB; border-radius: 999px; height: 12px; overflow: hidden;">
            <div id="progressBar" style="background: linear-gradient(90deg, #1AB8B8, #10B981); height: 100%; width: 0%; transition: width 0.3s;"></div>
          </div>
          <div style="margin-top: 0.5rem; font-size: 0.9rem; color: #666;" id="progressStatus">Iniciando...</div>
        </div>
      </div>

      <!-- Model Performance -->
      <div style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 2rem;">
        <h2 style="margin: 0 0 1.5rem; font-size: 1.25rem;">📊 Rendimiento del Modelo</h2>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
          <div>
            <h3 style="margin: 0 0 1rem; font-size: 1rem; color: #666;">Métricas de Clasificación</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              ${renderMetricBox('Precisión', '94.2%', '#10B981')}
              ${renderMetricBox('Recall', '91.8%', '#3B82F6')}
              ${renderMetricBox('F1-Score', '93.0%', '#8B5CF6')}
              ${renderMetricBox('AUC-ROC', '0.96', '#F59E0B')}
            </div>
          </div>

          <div>
            <h3 style="margin: 0 0 1rem; font-size: 1rem; color: #666;">Matriz de Confusión</h3>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; font-size: 0.85rem;">
              <div></div>
              <div style="text-align: center; font-weight: 600;">Pred: Positivo</div>
              <div style="text-align: center; font-weight: 600;">Pred: Negativo</div>
              
              <div style="font-weight: 600;">Real: Positivo</div>
              <div style="background: #D1FAE5; padding: 1rem; text-align: center; border-radius: 8px; font-weight: 600;">412</div>
              <div style="background: #FEE2E2; padding: 1rem; text-align: center; border-radius: 8px;">36</div>
              
              <div style="font-weight: 600;">Real: Negativo</div>
              <div style="background: #FEE2E2; padding: 1rem; text-align: center; border-radius: 8px;">28</div>
              <div style="background: #D1FAE5; padding: 1rem; text-align: center; border-radius: 8px; font-weight: 600;">524</div>
            </div>
          </div>
        </div>

        <div style="margin-top: 2rem;">
          <h3 style="margin: 0 0 1rem; font-size: 1rem; color: #666;">Curva de Aprendizaje</h3>
          <multi-series-chart
            data-series='${JSON.stringify([
    { name: 'Training Accuracy', color: '#1AB8B8', data: [72, 78, 82, 86, 89, 91, 92, 93, 93.5, 94] },
    { name: 'Validation Accuracy', color: '#4F46E5', data: [70, 76, 80, 84, 87, 88.5, 89, 90, 91, 91.5] }
  ])}'
            data-labels='["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"]'
            data-height="200"
          ></multi-series-chart>
        </div>
      </div>

      <!-- Feature Importance -->
      <div style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <h2 style="margin: 0 0 1.5rem; font-size: 1.25rem;">🎯 Importancia de Variables</h2>
        
        <div style="display: grid; gap: 0.75rem;">
          ${renderFeatureBar('Presión Arterial Sistólica', 95, '#EF4444')}
          ${renderFeatureBar('Edad del Paciente', 88, '#F59E0B')}
          ${renderFeatureBar('Frecuencia Cardíaca', 82, '#10B981')}
          ${renderFeatureBar('Historial Familiar', 76, '#3B82F6')}
          ${renderFeatureBar('IMC', 71, '#8B5CF6')}
          ${renderFeatureBar('Actividad Física', 65, '#1AB8B8')}
          ${renderFeatureBar('Calidad de Sueño', 58, '#6B7280')}
        </div>
      </div>

      <!-- Action Buttons -->
      <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: flex-end;">
        <app-button variant="outline" onclick="resetDefaults()">🔄 Restaurar Valores</app-button>
        <app-button variant="primary" onclick="saveAIConfig()">💾 Guardar Configuración</app-button>
      </div>
    </div>

    <script>
      function startTraining() {
        const progress = document.getElementById('trainingProgress');
        progress.style.display = 'block';
        
        let percent = 0;
        const interval = setInterval(() => {
          percent += Math.random() * 10;
          if (percent >= 100) {
            percent = 100;
            clearInterval(interval);
            document.getElementById('progressStatus').textContent = '✅ Entrenamiento completado';
          }
          
          document.getElementById('progressBar').style.width = percent + '%';
          document.getElementById('progressPercent').textContent = Math.floor(percent) + '%';
        }, 500);
      }

      function saveAIConfig() {
        alert('✅ Configuración guardada exitosamente');
      }

      function resetDefaults() {
        if (confirm('¿Restaurar valores por defecto?')) {
          alert('🔄 Valores restaurados');
        }
      }
    </script>
  `;
}

function renderSliderParameter(label, id, value, min, max, unit) {
  return `
    <div style="margin-bottom: 1.5rem;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
        <label style="font-weight: 600; font-size: 0.95rem;">${label}</label>
        <span style="color: #1AB8B8; font-weight: 700;"><span id="${id}Value">${value}</span>${unit}</span>
      </div>
      <input 
        type="range" 
        id="${id}" 
        min="${min}" 
        max="${max}" 
        value="${value}" 
        oninput="document.getElementById('${id}Value').textContent = this.value"
        style="width: 100%; height: 8px; border-radius: 999px; background: linear-gradient(90deg, #E5E7EB ${(value - min) / (max - min) * 100}%, #E5E7EB 0%); accent-color: #1AB8B8;"
      >
    </div>
  `;
}

function renderThresholdInput(label, id, value, unit) {
  return `
    <div style="margin-bottom: 1.25rem;">
      <label style="display: block; font-weight: 600; font-size: 0.9rem; margin-bottom: 0.5rem;">${label}</label>
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <input 
          type="number" 
          id="${id}" 
          value="${value}" 
          style="flex: 1; padding: 0.75rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem;"
        >
        <span style="color: #666; font-size: 0.9rem; min-width: 50px;">${unit}</span>
      </div>
    </div>
  `;
}

function renderMetricBox(label, value, color) {
  return `
    <div style="background: ${color}15; border: 2px solid ${color}; border-radius: 12px; padding: 1.25rem; text-align: center;">
      <div style="font-size: 0.85rem; color: ${color}; font-weight: 600; margin-bottom: 0.5rem;">${label}</div>
      <div style="font-size: 1.75rem; font-weight: 800; color: ${color};">${value}</div>
    </div>
  `;
}

function renderFeatureBar(label, percentage, color) {
  return `
    <div style="margin-bottom: 0.5rem;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem; font-size: 0.9rem;">
        <span style="font-weight: 500;">${label}</span>
        <span style="color: ${color}; font-weight: 700;">${percentage}%</span>
      </div>
      <div style="background: #E5E7EB; border-radius: 999px; height: 10px; overflow: hidden;">
        <div style="background: ${color}; height: 100%; width: ${percentage}%; border-radius: 999px; transition: width 0.5s;"></div>
      </div>
    </div>
  `;
}
