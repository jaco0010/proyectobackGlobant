import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function FormularioReserva() {

    let nombre = "Formulario de reserva"

    const navigate = useNavigate()

    const [datosFormulario, setDatosFormulario] = useState({
        date: "",
        time: ""
    })

    const [errores, setErrores] = useState({})

    function manejarCambios(evento) {
        let nombreCaja = evento.target.name
        let valorCaja = evento.target.value

        let nuevosDatosFormulario = {
            ...datosFormulario,
            [nombreCaja]: valorCaja
        }

        setDatosFormulario(nuevosDatosFormulario)

        setErrores({
            ...errores,
            [nombreCaja]: validarCampo(nombreCaja, valorCaja)
        })
    }

    function validarCampo(nombreCaja, valorCaja) {

        if (nombreCaja == "date") {
            if (valorCaja.trim() == "") {
                return "elige una fecha"
            }
        }

        if (nombreCaja == "time") {
            if (valorCaja.trim() == "") {
                return "elige un horario"
            }
        }

        return ""
    }

    function manejarEnvio(evento) {
        evento.preventDefault()

        let erroresDate = validarCampo("date", datosFormulario.date)
        let erroresTime = validarCampo("time", datosFormulario.time)

        setErrores({
            date: erroresDate,
            time: erroresTime
        })

        if (erroresDate || erroresTime) {
            return
        }

        fetch("http://localhost:8080/api/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                date: datosFormulario.date,
                time: datosFormulario.time
            })
        })
            .then(res => {
                if (res.ok) {
                    alert("reserva registrada con exito!")
                    navigate("/")
                } else {
                    alert("no se pudo registrar la reserva")
                }
            })
            .catch(() => alert("no se pudo conectar con el servidor"))
    }

    return (
        <div className="form-page">
            <div className="form-card">
                <h1>{nombre}</h1>

                <form onSubmit={manejarEnvio}>

                    <div className="form-field">
                        <label htmlFor="date">Fecha y hora</label>
                        <input
                            type="datetime-local"
                            id="date"
                            name="date"
                            value={datosFormulario.date}
                            onChange={manejarCambios}
                        />
                        {errores.date && <p className="field-error">{errores.date}</p>}
                    </div>

                    <div className="form-field">
                        <label htmlFor="time">Horario</label>
                        <select
                            id="time"
                            name="time"
                            value={datosFormulario.time}
                            onChange={manejarCambios}
                        >
                            <option value="">Selecciona un horario</option>
                            <option value="HOUR_6">6:00 am</option>
                            <option value="HOUR_7">7:00 am</option>
                        </select>
                        {errores.time && <p className="field-error">{errores.time}</p>}
                    </div>

                    <button className="btn-brand">Enviar</button>

                </form>
            </div>
        </div>
    )
}
