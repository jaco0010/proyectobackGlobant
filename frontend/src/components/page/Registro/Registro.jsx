import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Registro() {

    let nombre = "Formulario de registro"

    const navigate = useNavigate()

    const [datosFormulario, setDatosFormulario] = useState({
        nombres: "",
        correo: "",
        contraseña: "",
        confirmarContraseña: "",
        rol: ""
    })

    const [errores, setErrores] = useState({})

 
    const [verContraseña, setVerContraseña] = useState(false)
    const [verConfirmar, setVerConfirmar] = useState(false)

    function manejarCambios(evento) {

        
        let nombreCaja = evento.target.name

        
        let valorCaja = evento.target.value

     
        let nuevosDatosFormulario = {
            ...datosFormulario,
            [nombreCaja]: valorCaja
        }

        
        setDatosFormulario(nuevosDatosFormulario)

        let nuevosErrores = {
            ...errores,
            [nombreCaja]: validarCampo(nombreCaja, valorCaja, nuevosDatosFormulario)
        }

   
        if (nombreCaja == "contraseña" && nuevosDatosFormulario.confirmarContraseña !== "") {
            nuevosErrores.confirmarContraseña = validarCampo("confirmarContraseña", nuevosDatosFormulario.confirmarContraseña, nuevosDatosFormulario)
        }

        setErrores(nuevosErrores)
    }

    function validarCampo(nombreCaja, valorCaja, datos = datosFormulario) {

        if (nombreCaja == "nombres") {
            if (valorCaja.trim() == "") {
                return "el nombre es obligatorio"
            }
            if (valorCaja.trim().length <= 3) {
                return "el nombre debe tener minimo 4 caracteres"
            }
        }

        if (nombreCaja == "correo") {
            if (valorCaja.trim() == "") {
                return "el correo es obligatorio"
            }
        }

        if (nombreCaja == "contraseña") {
            if (valorCaja.trim() == "") {
                return "la contraseña es obligatoria"
            }
            if (valorCaja.trim().length < 6) {
                return "la contraseña debe tener minimo 6 caracteres"
            }
        }

        if (nombreCaja == "confirmarContraseña") {
            if (valorCaja.trim() == "") {
                return "debes confirmar la contraseña"
            }
            if (valorCaja !== datos.contraseña) {
                return "las contraseñas no coinciden"
            }
        }

        if (nombreCaja == "rol") {
            if (valorCaja.trim() == "") {
                return "debes seleccionar un rol"
            }
        }

        return ""
    }

    function manejarEnvio(evento) {
        evento.preventDefault()

       
        let erroresNombres = validarCampo("nombres", datosFormulario.nombres)
        let erroresCorreo = validarCampo("correo", datosFormulario.correo)
        let erroresContraseña = validarCampo("contraseña", datosFormulario.contraseña)
        let erroresConfirmar = validarCampo("confirmarContraseña", datosFormulario.confirmarContraseña)
        let erroresRol = validarCampo("rol", datosFormulario.rol)

        let nuevosErrores = {
            nombres: erroresNombres,
            correo: erroresCorreo,
            contraseña: erroresContraseña,
            confirmarContraseña: erroresConfirmar,
            rol: erroresRol
        }

        setErrores(nuevosErrores)

        if (erroresNombres || erroresCorreo || erroresContraseña || erroresConfirmar || erroresRol) {
            return
        }

       
        fetch("http://localhost:8080/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                names: datosFormulario.nombres,
                email: datosFormulario.correo,
                role: datosFormulario.rol
            })
        })
            .then(res => {
                if (res.ok) {
                    alert("usuario registrado con exito!")
                    navigate("/")
                } else if (res.status == 409) {
                    alert("ese correo ya esta registrado")
                } else {
                    alert("no se pudo registrar el usuario")
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
                        <label htmlFor="nombres">Nombre completo</label>
                        <input
                            type="text"
                            placeholder="jacobo aleja y jacobo"
                            id="nombres"
                            name="nombres"
                            value={datosFormulario.nombres}
                            onChange={manejarCambios}
                        />
                        {errores.nombres && <p className="field-error">{errores.nombres}</p>}
                    </div>

                    <div className="form-field">
                        <label htmlFor="correo">Correo</label>
                        <input
                            type="email"
                            placeholder="correo@ejemplo.com"
                            id="correo"
                            name="correo"
                            value={datosFormulario.correo}
                            onChange={manejarCambios}
                        />
                        {errores.correo && <p className="field-error">{errores.correo}</p>}
                    </div>

                    <div className="form-field">
                        <label htmlFor="contraseña">Contraseña</label>
                        <div className="password-wrapper">
                            <input
                                type={verContraseña ? "text" : "password"}
                                placeholder="Contraseña"
                                id="contraseña"
                                name="contraseña"
                                value={datosFormulario.contraseña}
                                onChange={manejarCambios}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setVerContraseña(!verContraseña)}
                            >
                                <IconoOjo abierto={verContraseña} />
                            </button>
                        </div>
                        {errores.contraseña && <p className="field-error">{errores.contraseña}</p>}
                    </div>

                    <div className="form-field">
                        <label htmlFor="confirmarContraseña">Confirmar contraseña</label>
                        <div className="password-wrapper">
                            <input
                                type={verConfirmar ? "text" : "password"}
                                placeholder="Repeti la contraseña"
                                id="confirmarContraseña"
                                name="confirmarContraseña"
                                value={datosFormulario.confirmarContraseña}
                                onChange={manejarCambios}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setVerConfirmar(!verConfirmar)}
                            >
                                <IconoOjo abierto={verConfirmar} />
                            </button>
                        </div>
                        {errores.confirmarContraseña && <p className="field-error">{errores.confirmarContraseña}</p>}
                    </div>

                    <div className="form-field">
                        <label htmlFor="rol">Rol</label>
                        <select
                            id="rol"
                            name="rol"
                            value={datosFormulario.rol}
                            onChange={manejarCambios}
                        >
                            <option value="">Selecciona un rol</option>
                            <option value="ADMIN">Administrador</option>
                            <option value="USER">Inquilino</option>
                        </select>
                        {errores.rol && <p className="field-error">{errores.rol}</p>}
                    </div>

                    <button className="btn-brand">Enviar</button>

                </form>
            </div>
        </div>
    )
}

function IconoOjo({ abierto }) {
    if (abierto) {
        return (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        )
    }

    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a19.5 19.5 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a19.5 19.5 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24" />
            <path d="M1 1l22 22" />
        </svg>
    )
}
