import { Link } from 'react-router-dom'

export function Navbar() {
    return (
        <nav className="app-navbar">
            <Link className="brand" to="/">Paseo Globant</Link>
            <div className="links">
                <Link to="/registro">Registro</Link>
                <Link to="/espacios">Espacios</Link>
                <Link to="/reservas">Reservas</Link>
            </div>
        </nav>
    )
}
