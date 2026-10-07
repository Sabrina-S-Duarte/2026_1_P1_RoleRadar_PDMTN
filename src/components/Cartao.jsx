const Cartao = (props) => {
  return (
    <div className="border-1 border-round surface-border mb-3">
      <div className="text-sm text-500 px-3 py-2 border-bottom-1 surface-border">
        {props.cabecalho}
      </div>
      <div className="p-3">
        {props.children}
      </div>
    </div>
  )
}

export default Cartao
