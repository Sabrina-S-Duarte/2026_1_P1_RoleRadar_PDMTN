import React, { Component } from 'react'

export default class Loading extends Component {
  render() {
    return (
      <div className="flex flex-column align-items-center justify-content-center p-3">
        <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
        <p>{this.props.mensagem}</p>
      </div>
    )
  }
}

Loading.defaultProps = {
  mensagem: 'Carregando...'
}
