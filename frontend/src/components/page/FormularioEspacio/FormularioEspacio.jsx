import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function FormularioEspacio() {

    let nombre = "Formulario de espacio"

    const navigate = useNavigate()

    const [datosFormulario, setDatosFormulario] = useState({
        name: "",
        description: "",
        photo: "",
        capacity: ""
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

        if (nombreCaja == "name") {
            if (valorCaja.trim() == "") {
                return "el nombre del espacio es obligatorio"
            }
            if (valorCaja.trim().length > 100) {
                return "maximo 100 caracteres"
            }
        }

        if (nombreCaja == "description") {
            if (valorCaja.trim() == "") {
                return "la descripcion es obligatoria"
            }
            if (valorCaja.trim().length > 200) {
                return "maximo 200 caracteres"
            }
        }

        if (nombreCaja == "photo") {
            if (valorCaja.trim() == "") {
                return "pega el link de una foto"
            }
        }

        if (nombreCaja == "capacity") {
            if (valorCaja.trim() == "") {
                return "la capacidad es obligatoria"
            }
            if (isNaN(valorCaja) || Number(valorCaja) <= 0) {
                return "la capacidad tiene que ser un numero mayor a 0"
            }
        }

        return ""
    }

    function manejarEnvio(evento) {
        evento.preventDefault()

        let erroresName = validarCampo("name", datosFormulario.name)
        let erroresDescription = validarCampo("description", datosFormulario.description)
        let erroresPhoto = validarCampo("photo", datosFormulario.photo)
        let erroresCapacity = validarCampo("capacity", datosFormulario.capacity)

        setErrores({
            name: erroresName,
            description: erroresDescription,
            photo: erroresPhoto,
            capacity: erroresCapacity
        })

        if (erroresName || erroresDescription || erroresPhoto || erroresCapacity) {
            return
        }

        fetch("http://localhost:8080/api/spots", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: datosFormulario.name,
                description: datosFormulario.description,
                photo: datosFormulario.photo,
                capacity: Number(datosFormulario.capacity)
            })
        })
            .then(res => {
                if (res.ok) {
                    alert("espacio registrado con exito!")
                    navigate("/")
                } else {
                    alert("no se pudo registrar el espacio")
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
                        <label htmlFor="name">Nombre del espacio</label>
                        <input
                            type="text"
                            placeholder="Sendero "
                            id="name"
                            name="name"
                            value={datosFormulario.name}
                            onChange={manejarCambios}
                        />
                        {errores.name && <p className="field-error">{errores.name}</p>}
                    </div>

                    <div className="form-field">
                        <label htmlFor="description">Descripcion</label>
                        <textarea
                            placeholder="Descripcion del espacio"
                            id="description"
                            name="description"
                            value={datosFormulario.description}
                            onChange={manejarCambios}
                        />
                        {errores.description && <p className="field-error">{errores.description}</p>}
                    </div>

                    <div className="form-field">
                        <label htmlFor="photo">Foto</label>
                        <input
                            type="text"
                            placeholder="URL de la foto"
                            id="photo"
                            name="photo"
                            value={datosFormulario.photo}
                            onChange={manejarCambios}
                        />
                        {errores.photo && <p className="field-error">{errores.photo}</p>}
                    </div>

                    <div className="form-field">
                        <label htmlFor="capacity">Capacidad</label>
                        <input
                            type="number"
                            placeholder="Capacidad"
                            id="capacity"
                            name="capacity"
                            value={datosFormulario.capacity}
                            onChange={manejarCambios}
                        />
                        {errores.capacity && <p className="field-error">{errores.capacity}</p>}
                    </div>

                    <button className="btn-brand">Enviar</button>

                </form>
            </div>
        </div>
    )
}
