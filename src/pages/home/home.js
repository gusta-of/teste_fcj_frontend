import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import axios from 'axios'

import './home.css'

const Home = () => {

    const history = useHistory()
    const [usuarios, setUsuarios] = useState([])

    useEffect(() => {

        function loadUsuatios() {
            if (!localStorage.getItem('usuario')) {
                history.push('/login')
            }

            const resp = axios.get('http://localhost:3001/api/v1/usuario/todos')
                .then(resp => {
                    setUsuarios(resp.data.users)
                })
                .catch(err => console.log(err.response.data))
        }

        loadUsuatios()

    })

    return (
        <BrowserRouter>
            <h1>Home</h1>
            <p>Uusários cadastrados na aplicação</p>

            <table className="Table-Home">
                <thead>
                    <tr className="Table-Head">
                        <th>Nome</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((row) => (
                        <tr className="Table-Line">
                            <td className="Table-Value">{row.usuario}</td>
                            <td className="Table-Value">{row.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <br />
            <a href="/login">Sair</a>
        </BrowserRouter>
    )
}

export default Home