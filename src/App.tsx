import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import remarkGfm from 'remark-gfm'
import { HashRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom'
import ChatInterface from './components/ChatInterface.tsx'

type MarkdownComponentProps = { children: ReactNode }

type Letter = {
  id: string
  year: number
  title: string
  summary: string
  description?: string 
  downloadUrl: string
  onlineUrl: string
}

// Función para generar las cartas basada en los archivos existentes
function generateLettersFromFiles(): Letter[] {
  const letters: Letter[] = []
  
  // Años desde 1977 hasta 2024
  for (let year = 1977; year <= 2024; year++) {
    letters.push({
      id: `letter-${year}`,
      year: year,
      title: `Carta a los Accionistas ${year}`,
      summary: `Carta anual de Warren Buffett a los accionistas de Berkshire Hathaway del año ${year}.`,
      downloadUrl: `/api/download/${year}`, 
      onlineUrl: `/buffet-letters-demo/letters/es/${year}.md`
    })
  }
  
  return letters
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: '500',
        borderRadius: '6px',
        border: active ? 'none' : '1px solid #d1fae5',
        background: active ? '#2563eb' : 'white',
        color: active ? 'white' : '#064e3b',
        cursor: 'pointer'
      }}
      onMouseOver={(e) => {
        if (!active) e.currentTarget.style.background = '#ecfdf5'
      }}
      onMouseOut={(e) => {
        if (!active) e.currentTarget.style.background = 'white'
      }}
    >
      {children}
    </button>
  )
}

// Componente mejorado para renderizar markdown con estilos inline
export function EnhancedMarkdownRenderer({ markdown }: { markdown: string }) {
  const [ReactMarkdown, setRM] = useState<any>(null)

  useEffect(() => {
    import('react-markdown').then(mod => {
      setRM(() => mod.default)
    })
  }, [])

  if (!ReactMarkdown) {
    return (
      <div style={{ whiteSpace: 'pre-wrap', color: '#065f46', lineHeight: '1.6' }}>
        {markdown}
      </div>
    )
  }

  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }: MarkdownComponentProps) => (
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              margin: '1.5rem 0 1rem 0',
              color: '#064e3b'
            }}>{children}</h1>
          ),
          h2: ({ children }: MarkdownComponentProps) => (
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              margin: '1.25rem 0 0.75rem 0',
              color: '#064e3b'
            }}>{children}</h2>
          ),
          h3: ({ children }: MarkdownComponentProps) => (
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              margin: '1rem 0 0.5rem 0',
              color: '#064e3b'
            }}>{children}</h3>
          ),
          p: ({ children }: MarkdownComponentProps) => (
            <p style={{
              marginBottom: '1rem',
              lineHeight: '1.6',
              color: '#065f46'
            }}>{children}</p>
          ),
          ul: ({ children }: MarkdownComponentProps) => (
            <ul style={{
              marginBottom: '1rem',
              paddingLeft: '1.5rem',
              color: '#065f46'
            }}>{children}</ul>
          ),
          ol: ({ children }: MarkdownComponentProps) => (
            <ol style={{
              marginBottom: '1rem',
              paddingLeft: '1.5rem',
              color: '#065f46'
            }}>{children}</ol>
          ),
          li: ({ children }: MarkdownComponentProps) => (
            <li style={{
              marginBottom: '0.25rem',
              color: '#065f46'
            }}>{children}</li>
          ),
          strong: ({ children }: MarkdownComponentProps) => (
            <strong style={{
              fontWeight: '600',
              color: '#064e3b'
            }}>{children}</strong>
          ),
          em: ({ children }: MarkdownComponentProps) => (
            <em style={{
              fontStyle: 'italic',
              color: '#065f46'
            }}>{children}</em>
          ),
          blockquote: ({ children }: MarkdownComponentProps) => (
            <blockquote style={{
              borderLeft: '4px solid #a7f3d0',
              paddingLeft: '1rem',
              margin: '1rem 0',
              fontStyle: 'italic',
              color: '#047857'
            }}>{children}</blockquote>
          ),
          table: ({ children }: MarkdownComponentProps) => (
            <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
              <table style={{
                minWidth: '100%',
                borderCollapse: 'collapse',
                border: '1px solid #a7f3d0'
              }}>{children}</table>
            </div>
          ),
          th: ({ children }: MarkdownComponentProps) => (
            <th style={{
              border: '1px solid #a7f3d0',
              padding: '8px 16px',
              background: '#ecfdf5',
              fontWeight: '600',
              color: '#064e3b',
              textAlign: 'left'
            }}>{children}</th>
          ),
          td: ({ children }: MarkdownComponentProps) => (
            <td style={{
              border: '1px solid #a7f3d0',
              padding: '8px 16px',
              color: '#065f46'
            }}>{children}</td>
          ),
          a: ({ href, children }: { href?: string; children: ReactNode }) => (
            <a href={href} style={{
              color: '#2563eb',
              textDecoration: 'underline'
            }}>{children}</a>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}

function DocumentCard({ letter }: { letter: Letter }) {
  const navigate = useNavigate()
  
  const handleViewOnline = () => {
    navigate(`/letter/${letter.year}`)
  }

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault()
    // En demo, redirigir al proyecto completo
    window.open('https://github.com/agarnung/buffet-letters', '_blank')
  }

  const displayDescription = letter.description || letter.summary

  return (
    <div style={{
      borderRadius: '8px',
      border: '1px solid #d1fae5',
      background: 'white',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      height: '100%',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#064e3b',
          margin: 0
        }}>{"Carta a los accionistas"}</h3>
        <span style={{
          fontSize: '12px',
          color: '#047857',
          background: '#d1fae5',
          padding: '2px 8px',
          borderRadius: '4px'
        }}>
          {letter.year}
        </span>
      </div>
      
      <div style={{ flex: 1, minHeight: 0 }}>
        <div style={{
          fontSize: '12px',
          color: '#065f46',
          overflowY: 'auto',
          maxHeight: '96px',
          textAlign: 'justify' as const,
          lineHeight: '1.5',
          padding: '0 8px'
        }}>
          {displayDescription}
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '8px', paddingTop: '8px' }}>
        <button 
          onClick={handleDownload}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            borderRadius: '6px',
            background: '#2563eb',
            color: 'white',
            padding: '6px 12px',
            fontSize: '12px',
            flex: 1,
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = '#1d4ed8'}
          onMouseOut={(e) => e.currentTarget.style.background = '#2563eb'}
        >
          Proyecto Completo
        </button>
        <button 
          onClick={handleViewOnline}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            borderRadius: '6px',
            border: '1px solid #d1fae5',
            padding: '6px 12px',
            fontSize: '12px',
            color: '#064e3b',
            flex: 1,
            justifyContent: 'center',
            background: 'white',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = '#ecfdf5'}
          onMouseOut={(e) => e.currentTarget.style.background = 'white'}
        >
          Ver online
        </button>
      </div>
    </div>
  )
}

function HomePage() {
  const [letters, setLetters] = useState<Letter[]>([])
  const [activeTab, setActiveTab] = useState<'chat' | 'docs'>('docs')

  const handleTabChange = (tab: 'chat' | 'docs') => {
    setActiveTab(tab)
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [activeTab])

  useEffect(() => {
    fetch('/buffet-letters-demo/letters/manifest.json')
      .then(r => {
        if (r.ok) return r.json()
        throw new Error('Manifest not found')
      })
      .then((items: any[]) => {
        const mapped: Letter[] = items.map(it => ({
          id: it.id,
          year: it.year,
          title: it.title,
          summary: it.summary || `Carta anual de Warren Buffett a los accionistas de Berkshire Hathaway del año ${it.year}.`,
          description: it.description,
          downloadUrl: `/api/download/${it.year}`,
          onlineUrl: it.path
        }))
        setLetters(mapped)
      })
      .catch(() => {
        const generatedLetters = generateLettersFromFiles()
        setLetters(generatedLetters)
      })
  }, [])

  return (
    <div style={{ background: '#ecfdf5', minHeight: '100vh' }}>
      <header style={{
        borderBottom: '1px solid #d1fae5',
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(8px)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src="/buffet-letters-demo/favicon.svg" 
              alt="Logo" 
              style={{ height: '32px', width: '32px', borderRadius: '4px' }} 
            />
            <h1 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#064e3b',
              margin: 0
            }}>Cartas de Warren Buffett (ES) - DEMO</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a
              href="https://github.com/agarnung/buffet-letters"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '6px',
                background: '#4b5563',
                color: 'white',
                padding: '6px 12px',
                fontSize: '12px',
                textDecoration: 'none',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#374151'}
              onMouseOut={(e) => e.currentTarget.style.background = '#4b5563'}
            >
              <svg style={{ height: '16px', width: '16px' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Proyecto Completo
            </a>

            <a
              href="https://github.com/agarnung/buffet-letters-demo"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '6px',
                background: '#4b5563',
                color: 'white',
                padding: '6px 12px',
                fontSize: '12px',
                textDecoration: 'none',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#374151'}
              onMouseOut={(e) => e.currentTarget.style.background = '#4b5563'}
            >
              <svg style={{ height: '16px', width: '16px' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Proyecto Demo
            </a>
            <a
              href="https://buymeacoffee.com/agarnung"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '6px',
                background: '#f59e0b',
                color: 'white',
                padding: '6px 12px',
                fontSize: '12px',
                textDecoration: 'none',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                fontWeight: '500'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#d97706'}
              onMouseOut={(e) => e.currentTarget.style.background = '#f59e0b'}
            >
              <span style={{ fontSize: '14px' }}>☕</span>
              Invítame a un café
            </a>
          </div>
        </div>
      </header>
      
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '24px 16px'
      }}>
        <div style={{
          background: '#dbeafe',
          border: '1px solid #93c5fd',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ color: '#2563eb', fontSize: '18px' }}>ℹ️</div>
            <div>
              <h3 style={{
                fontWeight: '600',
                color: '#1e3a8a',
                marginBottom: '4px',
                marginTop: 0
              }}>Versión Demo</h3>
              <p style={{
                fontSize: '12px',
                color: '#1e40af',
                margin: 0
              }}>
                Esta es una versión de demostración que muestra las cartas de Warren Buffett. 
                El chat con IA y la descarga de documentos están disponibles en el{' '}
                <a href="https://github.com/agarnung/buffet-letters" style={{
                  fontWeight: '500',
                  textDecoration: 'underline',
                  color: '#1e40af'
                }}>proyecto completo</a>.
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <TabButton active={activeTab === 'docs'} onClick={() => handleTabChange('docs')}>
            Documentos
          </TabButton>
          <TabButton active={activeTab === 'chat'} onClick={() => handleTabChange('chat')}>
            Chat (Demo)
          </TabButton>
        </div>

        {activeTab === 'docs' ? (
          <section style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '8px'
          }}>
            {letters.map((letter) => (
              <DocumentCard key={letter.id} letter={letter} />
            ))}
          </section>
        ) : (
          <ChatInterface />
        )}
      </main>
      
      <footer style={{
        borderTop: '1px solid #d1fae5',
        marginTop: '48px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '16px',
          fontSize: '12px',
          color: '#047857'
        }}>
          © {new Date().getFullYear()} Buffet Letters Demo — by @agarnung | 
          <a href="https://github.com/agarnung/buffet-letters" style={{
            marginLeft: '4px',
            color: '#2563eb',
            textDecoration: 'underline'
          }}>
            Ver proyecto completo
          </a>
        </div>
      </footer>
    </div>
  )
}

function LetterView() {
  const { year } = useParams<{ year: string }>()
  const navigate = useNavigate()
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [year]) 

  useEffect(() => {
    if (!year) return
    
    setLoading(true)
    setError('')
    fetch(`/buffet-letters-demo/letters/es/${year}.md`)
      .then(r => {
        if (!r.ok) throw new Error(`Documento no encontrado (${r.status})`)
        return r.text()
      })
      .then(setContent)
      .catch((err) => {
        setError(err.message)
        setContent('# Error cargando documento\n\nEl documento solicitado no está disponible.')
      })
      .finally(() => setLoading(false))
  }, [year])

  const handleBack = () => {
    navigate('/')
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#ecfdf5', 
      padding: '24px 0' 
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px'
      }}>
        <div style={{ marginBottom: '24px' }}>
          <button 
            onClick={handleBack}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontSize: '12px',
              color: '#047857',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              marginBottom: '16px'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = '#064e3b'}
            onMouseOut={(e) => e.currentTarget.style.color = '#047857'}
          >
            ← Volver a todas las cartas
          </button>
        </div>
        
        <div style={{
          maxWidth: '896px',
          margin: '0 auto',
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
          border: '1px solid #d1fae5'
        }}>
          <div style={{
            borderBottom: '1px solid #d1fae5',
            padding: '16px 24px'
          }}>
            <h1 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#064e3b',
              margin: 0
            }}>
              Carta a los Accionistas {year}
            </h1>
          </div>
          
          {loading && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '48px'
            }}>
              <div style={{ color: '#047857' }}>Cargando documento...</div>
            </div>
          )}
          
          {error && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              padding: '16px',
              margin: '16px'
            }}>
              <h2 style={{
                color: '#991b1b',
                fontWeight: '600',
                margin: '0 0 8px 0'
              }}>Error</h2>
              <p style={{ color: '#dc2626', margin: '0 0 8px 0' }}>{error}</p>
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#b91c1c' }}>
                <p>Ruta intentada: /buffet-letters-demo/letters/es/{year}.md</p>
              </div>
            </div>
          )}
          
          {!loading && (
            <div style={{ padding: '24px' }}>
              <EnhancedMarkdownRenderer markdown={content} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Componente principal con Router
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/letter/:year" element={<LetterView />} />
      </Routes>
    </Router>
  )
}
