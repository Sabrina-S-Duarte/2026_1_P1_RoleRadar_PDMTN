import Creditos from './Creditos'
import Cartao from './Cartao'

const App = () => {
  const estiloSubtitulo = { textAlign: 'center', color: '#555', marginTop: 0, fontFamily: 'serif' }
  const obterAno = () => new Date().getFullYear()

return (
    <div className="app">
      <h1 className="titulo">
        <i className="pi pi-map-marker"></i> RolêRadar
      </h1>
      <p style={estiloSubtitulo}>Descubra o que existe perto de você</p>
      <Creditos />
      <Cartao cabecalho="Teste">
        <p>Conteúdo do cartão</p>
      </Cartao>
      <footer className="rodape">RolêRadar © {obterAno()}</footer>
    </div>
  )
}

export default App
