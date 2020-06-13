import React, { useState } from "react"
import Error from "./Error"
import shortid from "shortid"
import PropTypes from "prop-types"

const Formulario = ({ guardarGasto,guardarCrearGasto }) => {
  const [nombre, guardarNombre] = useState("")
  const [cantidad, guadarCantidad] = useState(0)
  const [error, guardarError] = useState(false)
  
  const agregarGasto = e => {
    e.preventDefault()
    //validar
    if (cantidad < 1 || isNaN(cantidad) || nombre.trim() === "") {
      guardarError(true)
      return
    }
    guardarError(false)
    const gasto = {
      nombre,
      cantidad,
      id: shortid.generate()
    }
    guardarGasto(gasto)
    guardarCrearGasto(true)
    guardarNombre("")
    guadarCantidad(0)
  }
  return (
    <form onSubmit={agregarGasto}>
      <h2> Agregar tus gastos aqui</h2>
      {error ? (
        <Error mensaje="Ambos campos son obligatorios o presuesto incorrecto" />
        ) : null}
      <div className="campo">
        <label>Nombre Gasto</label>
        <input
          type="text"
          className="u-full-width"
          placeholder="Ej. Trasnsporte"
          value={nombre}
          onChange={e => guardarNombre(e.target.value)}
          />
      </div>
      <div className="campo">
        <label>Cantidad Gasto</label>
        <input
          type="number"
          className="u-full-width"
          placeholder="Ej. $300"
          value={parseInt(cantidad,10)}
          onChange={e => guadarCantidad(parseInt(e.target.value,10))}
          
          />
      </div>
      <input
        type="submit"
        className="button-primary u-full-widht"
        value="Agregar Gasto"
      />
    </form>
  )
}
Formulario.prototype={
  guardarGasto: PropTypes.func.isRequired,
  guardarCrearGasto: PropTypes.func.isRequired,
}

export default Formulario
