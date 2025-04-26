export const styles = {
  root: {
    width: '100vw',
    minWidth: '100vw',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #181c24 0%, #232b39 100%)',
    color: '#f3f6fa',
    fontFamily: 'Inter, Arial, sans-serif',
    padding: 0,
    margin: 0,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  container: {
    background: 'rgba(30,34,44,0.95)',
    borderRadius: 0,
    boxShadow: 'none',
    padding: '40px 32px',
    width: '100vw',
    minWidth: '100vw',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxSizing: 'border-box',
    margin: 0,
  },
  h1: {
    fontWeight: 800,
    fontSize: 28,
    marginBottom: 24,
    letterSpacing: 1,
    color: '#7ee787',
    textShadow: '0 2px 8px #000a',
  },
  button: {
    background: 'linear-gradient(90deg, #7ee787 0%, #1f6feb 100%)',
    color: '#181c24',
    border: 'none',
    borderRadius: 8,
    padding: '12px 18px',
    margin: '8px 6px',
    fontWeight: 700,
    fontSize: 16,
    cursor: 'pointer',
    boxShadow: '0 2px 8px #0006',
    transition: 'background 0.2s, color 0.2s',
  },
  buttonDisabled: {
    background: '#333a',
    color: '#888',
    cursor: 'not-allowed',
  },
  output: {
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    fontFamily: 'Fira Mono, monospace',
    marginTop: 24,
    background: '#181c24',
    color: '#7ee787',
    border: '1px solid #333',
    borderRadius: 8,
    padding: 18,
    width: '100%',
    fontSize: 15,
    boxShadow: '0 2px 8px #0006',
    boxSizing: 'border-box',
  },
  connectBtnWrap: {
    margin: '10px 0',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
};

export const responsiveStyle = `
@media (max-width: 1200px) {
  .sig-container { width: 99vw !important; padding: 20px 8px !important; }
}
@media (max-width: 900px) {
  .sig-container { width: 100vw !important; padding: 12px 2px !important; }
}
@media (max-width: 600px) {
  .sig-container { width: 100vw !important; border-radius: 0 !important; margin-top: 0 !important; padding: 6px 0 !important; }
  .sig-output { font-size: 13px !important; padding: 8px !important; }
}
`; 