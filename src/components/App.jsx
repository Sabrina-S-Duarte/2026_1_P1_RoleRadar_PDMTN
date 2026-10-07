import React from 'react'
import Creditos from './Creditos'
import Loading from './Loading'

export default class App extends React.Component {

  state = {
    latitude: null,
    longitude: null,
    horarioLocalizacao: null,
    mensagemDeErro: null
  }

  componentDidMount() {
    this.obterLocalizacao()
  }

  obterLocalizacao = () => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          horarioLocalizacao: Date.now(),
          mensagemDeErro: null
        })
      },
      (erro) => {
        console.log(erro)
        this.setState({
          mensagemDeErro: 'Não foi possível obter sua localização. Libere o acesso no navegador e atualize a página.'
        })
      }
    )
  }

  obterAno = () => new Date().getFullYear()

  renderizarConteudo = () => {
    if (this.state.mensagemDeErro)
      return <p>{this.state.mensagemDeErro}</p>
    if (this.state.latitude === null)
      return <Loading mensagem="Aguardando permissão de localização..." />
    return (
      <p>Localização obtida: {this.state.latitude}, {this.state.longitude}</p>
    )
  }

  render() {
    const estiloSubtitulo = { textAlign: 'center', color: '#555', marginTop: 0 }
    return (
      <div className="app">
        <h1 className="titulo">
          <i className="pi pi-map-marker"></i> RolêRadar
        </h1>
        <p style={estiloSubtitulo}>Descubra o que existe perto de você</p>
        <Creditos />
        {this.renderizarConteudo()}
        <footer className="rodape">RolêRadar © {this.obterAno()}</footer>
      </div>
    )
  }
}
