import { Routes, Route } from 'react-router-dom'

import { Navbar } from '../Navbar/Navbar'
import { Home } from '../page/Home/Home'
import { Registro } from '../page/Registro/Registro'
import { FormularioEspacio } from '../page/FormularioEspacio/FormularioEspacio'
import { FormularioReserva } from '../page/FormularioReserva/FormularioReserva'

export function Router() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/espacios" element={<FormularioEspacio />} />
                <Route path="/reservas" element={<FormularioReserva />} />
            </Routes>
        </>
    )
}
