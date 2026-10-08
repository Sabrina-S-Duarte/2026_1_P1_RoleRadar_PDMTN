// rcc
import React, { Component } from 'react'
import { Button } from '@primereact/ui/button'
import { InputText } from '@primereact/ui/inputtext'

const categorias = [
  { rotulo: 'Cafés', chave: 'catering.cafe' },
  { rotulo: 'Restaurantes', chave: 'catering.restaurant' },
  { rotulo: 'Parques', chave: 'leisure.park' },
  { rotulo: 'Farmácias', chave: 'healthcare.pharmacy' },
  { rotulo: 'Supermercados', chave: 'commercial.supermarket' },
  { rotulo: 'Museus', chave: 'entertainment.museum' }
]

export default class Busca extends Component {

  state = {
    categoria: null,
    raio: '1000',
    erro: null
  }

  onRaioAlterado = (evento) => {
    this.setState({ raio: evento.target.value })
  }

  onFormSubmit = (evento) => {
    evento.preventDefault()
    const { categoria, raio } = this.state
    if (!categoria) {
      this.setState({ erro: 'Escolha uma categoria.' })
      return
    }
    const valor = Number(raio)
    if (!Number.isInteger(valor) || valor < 100 || valor > 5000) {
      this.setState({ erro: 'Informe um raio inteiro entre 100 e 5000 metros.' })
      return
    }
    this.setState({ erro: null })
    this.props.onBuscaRealizada(categoria, valor)
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <div className="flex flex-wrap gap-2 mb-3">
          {
            categorias.map((cat) => (
              <Button
                key={cat.chave}
                type="button"
                variant={this.state.categoria === cat.chave ? undefined : 'outlined'}
                onClick={() => this.setState({ categoria: cat.chave })}>
                {cat.rotulo}
              </Button>
            ))
          }
        </div>
        <InputText
          value={this.state.raio}
          pt-root-onChange={this.onRaioAlterado}
          className="w-full"
          pt-root-placeholder={this.props.dica} />
        <Button type="submit" className="w-full mt-3">
          <i className="pi pi-search"></i> Buscar
        </Button>
        {
          this.state.erro ?
            <p style={{ color: 'red' }}>{this.state.erro}</p>
          :
            null
        }
      </form>
    )
  }
}

Busca.defaultProps = {
  dica: 'Raio em metros (100 a 5000)'
}
