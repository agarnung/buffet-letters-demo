export default function ChatInterface() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '600px',
      background: 'white',
      borderRadius: '8px',
      border: '1px solid #d1fae5',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(to right, #059669, #047857)',
        padding: '12px 16px',
        borderBottom: '1px solid #d1fae5'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h3 style={{
              fontWeight: 'bold',
              color: 'white',
              fontSize: '18px',
              margin: '0 0 4px 0'
            }}>Consultar a Warren Buffett</h3>
            <p style={{
              fontSize: '12px',
              color: '#d1fae5',
              margin: 0
            }}>Basado en sus cartas a los accionistas (1977-2024)</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              padding: '4px 12px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: '500',
              background: '#fef3c7',
              color: '#92400e'
            }}>
              🔄 Versión Demo
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area - Placeholder */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        background: '#f9fafb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', color: '#047857', padding: '48px 0' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
          <p style={{ 
            fontWeight: '600', 
            fontSize: '18px', 
            marginBottom: '16px',
            marginTop: 0
          }}>Chat con IA - Versión Demo</p>
          <p style={{
            fontSize: '12px',
            marginBottom: '24px',
            color: '#065f46',
            maxWidth: '400px',
            margin: '0 auto 24px auto'
          }}>
            Esta funcionalidad de chat con inteligencia artificial está disponible en la versión completa del proyecto, 
            donde puedes hacer preguntas sobre las cartas y recibir respuestas basadas en el contenido real.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '300px', margin: '0 auto' }}>
            <a 
              href="https://github.com/agarnung/buffet-letters" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'block',
                width: '100%',
                background: '#2563eb',
                color: 'white',
                padding: '12px 16px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '500',
                textAlign: 'center'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#1d4ed8'}
              onMouseOut={(e) => e.currentTarget.style.background = '#2563eb'}
            >
              🚀 Visitar Proyecto Completo
            </a>
            <a 
              href="https://buymeacoffee.com/agarnung/proyecto-abierto-buffet-letters" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'block',
                width: '100%',
                border: '1px solid #d1fae5',
                color: '#064e3b',
                padding: '12px 16px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '500',
                textAlign: 'center',
                background: 'white'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#ecfdf5'}
              onMouseOut={(e) => e.currentTarget.style.background = 'white'}
            >
              📝 Colaborar en el proyecto
            </a>
          </div>

          <div style={{ 
            marginTop: '32px', 
            fontSize: '12px', 
            color: '#047857',
            textAlign: 'left',
            maxWidth: '300px',
            margin: '32px auto 0 auto'
          }}>
            <p style={{ margin: '0 0 8px 0' }}>💡 <strong>En la versión completa:</strong></p>
            <p style={{ margin: '2px 0' }}>• Pregunta sobre inversiones, valor intrínseco, negocios</p>
            <p style={{ margin: '2px 0' }}>• Respuestas basadas en las cartas reales de Buffett</p>
            <p style={{ margin: '2px 0' }}>• Múltiples modelos de IA disponibles</p>
            <p style={{ margin: '2px 0' }}>• Fuentes citadas de las cartas consultadas</p>
          </div>
        </div>
      </div>

      {/* Input Area - Disabled */}
      <div style={{
        borderTop: '1px solid #d1fae5',
        padding: '16px',
        background: 'white'
      }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <textarea
              placeholder="Esta funcionalidad está disponible en el proyecto completo..."
              style={{
                width: '100%',
                border: '1px solid #d1fae5',
                borderRadius: '12px',
                padding: '12px 16px',
                background: '#f3f4f6',
                color: '#6b7280',
                cursor: 'not-allowed',
                resize: 'none',
                fontFamily: 'inherit',
                fontSize: '14px'
              }}
              rows={2}
              disabled
            />
            <div style={{
              fontSize: '12px',
              color: '#6b7280',
              marginTop: '4px'
            }}>
              ⚠️ Chat deshabilitado en versión demo
            </div>
          </div>
          <button
            disabled
            style={{
              background: '#9ca3af',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '12px',
              fontWeight: '500',
              cursor: 'not-allowed',
              border: 'none',
              alignSelf: 'flex-end',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>Enviar</span>
            <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
