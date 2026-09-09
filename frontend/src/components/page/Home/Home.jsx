import { useNavigate } from 'react-router-dom'

export function Home() {

    const navigate = useNavigate()

    return (
        <div>
            <section className="hero">
                <h1>Paseo Globant</h1>
                <p>Elegi que queres registrar</p>
            </section>

            <div className="option-grid">
                <div className="option-card">
                    <div className="badge">U</div>
                    <h3>Usuario</h3>
                    <p>Crea una cuenta nueva para entrar a la plataforma.</p>
                    <button className="btn-brand" onClick={() => navigate('/registro')}>Registrarme</button>
                </div>

                <div className="option-card">
                    <div className="badge">E</div>
                    <h3>Espacio</h3>
                    <p>Publica un nuevo espacio disponible para paseos.</p>
                    <button className="btn-brand" onClick={() => navigate('/espacios')}>Crear espacio</button>
                </div>

                <div className="option-card">
                    <div className="badge">R</div>
                    <h3>Reserva</h3>
                    <p>Agenda una reserva para un horario disponible.</p>
                    <button className="btn-brand" onClick={() => navigate('/reservas')}>Reservar</button>
                </div>
            </div>
        </div>
    )
}
