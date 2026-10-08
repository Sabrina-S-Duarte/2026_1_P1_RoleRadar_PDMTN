import React from 'react'
import Creditos from './Creditos'
import Loading from './Loading'
import Cartao from './Cartao'
import MeuPonto from './MeuPonto'
import geoapifyClient from '../utils/geoapifyClient'
import Busca from './Busca'
import ListaLugares from './ListaLugares'
import MapaRadar from './MapaRadar'

export default class App extends React.Component {

  state = {
    latitude: null,
    longitude: null,
    horarioLocalizacao: null,
    mensagemDeErro: null,
    lugares: null,
    buscando: false,
    erroBusca: null,
    raioBuscado: null
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
      <div className="grid">
        <div className="col-12 md:col-6">
          <Cartao cabecalho="Você está aqui">
            <MeuPonto
              latitude={this.state.latitude}
              longitude={this.state.longitude}
              horarioLocalizacao={this.state.horarioLocalizacao}
              onAtualizar={this.obterLocalizacao} />
          </Cartao>
          <Cartao cabecalho="O que você procura?">
            <Busca onBuscaRealizada={this.onBuscaRealizada} />
          </Cartao>
        </div>
        <div className="col-12 md:col-6">
          {this.renderizarResultado()}
        </div>
      </div>
    )
  }

  render() {
    const estiloSubtitulo = { textAlign: 'center', color: '#555', marginTop: 0}
    return (
      <div className="app">
        <div className="grid">
          <div className="col-12">
            <h1 className="titulo">
              <i className="pi pi-map-marker"></i> RolêRadar
            </h1>
            <p style={estiloSubtitulo}>Descubra o que existe perto de você</p>
            <Creditos />
          </div>
          <div className="col-12">
            {this.renderizarConteudo()}
          </div>
          <div className="col-12">
            <footer className="rodape">RolêRadar © {this.obterAno()}</footer>
          </div>
        </div>
      </div>
    )
  }

  onBuscaRealizada = async (categoria, raio) => {
    const { latitude, longitude } = this.state
    this.setState({ buscando: true, erroBusca: null, raioBuscado: raio })
    try {
      const result = await geoapifyClient.get('/places', {
        params: {
          categories: categoria,
          filter: `circle:${longitude},${latitude},${raio}`,
          bias: `proximity:${longitude},${latitude}`,
          limit: 20
        }
      })
      this.setState({ lugares: result.data.features, buscando: false })
    } catch (erro) {
      console.log(erro)
      this.setState({
        buscando: false,
        erroBusca: 'Não foi possível consultar os lugares. Tente novamente.'
      })
    }
  }

  renderizarResultado = () => {
    if (this.state.buscando)
      return <Loading mensagem="Procurando lugares..." />
    if (this.state.erroBusca)
      return <p>{this.state.erroBusca}</p>
    if (this.state.lugares === null)
      return null
    if (this.state.lugares.length === 0)
      return <p>Nenhum lugar encontrado. Tente aumentar o raio.</p>
    const total = this.state.lugares.length
    const texto = total === 1 ? '1 lugar encontrado' : `${total} lugares encontrados`
    return (
      <div>
        <p className="font-bold">{texto} em até {this.state.raioBuscado} m</p>
        <Cartao cabecalho="Radar">
          <MapaRadar
            latitude={this.state.latitude}
            longitude={this.state.longitude}
            lugares={this.state.lugares} />
        </Cartao>
        <ListaLugares lugares={this.state.lugares} />
      </div>
    )
  }

}
