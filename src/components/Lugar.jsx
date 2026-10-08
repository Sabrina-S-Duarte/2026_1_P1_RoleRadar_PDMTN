import Cartao from './Cartao'

const formatarDistancia = (distancia) => {
  if (distancia < 1000)
    return `a ${Math.round(distancia)} m`
  return `a ${(distancia / 1000).toFixed(1).replace('.', ',')} km`
}

const Lugar = ({ numero, nome, endereco, distancia }) => {
  const estiloNumero = {
    width: 28,
    height: 28,
    flexShrink: 0,
    borderRadius: '50%',
    backgroundColor: '#1565c0',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14
  }
  return (
    <Cartao cabecalho={formatarDistancia(distancia)}>
      <div className="flex align-items-center gap-3">
        <div style={estiloNumero}>{numero}</div>
        <div>
          <div className="font-bold">{nome || 'Sem nome'}</div>
          <div className="text-sm text-500">{endereco}</div>
        </div>
      </div>
    </Cartao>
  )
}

export default Lugar
