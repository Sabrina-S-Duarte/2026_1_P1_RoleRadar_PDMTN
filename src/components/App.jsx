const App = () => {
  const estiloSubtitulo = { textAlign: 'center', color: '#555', marginTop: 0, fontFamily: 'cursive' }
  const obterAno = () => new Date().getFullYear()

  return (
    <div className="app">
      <h1 className="titulo"><i className="pi pi-map-maker"></i>RolêRadar</h1>
      <p style={estiloSubtitulo}>Descubra o que existe perto de você</p>
      <footer className="rodape">RolêRadar © {obterAno()}</footer>
    </div>
  )
}

export default App
