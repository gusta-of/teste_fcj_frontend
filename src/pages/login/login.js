import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ErrorMessage, Formik, Form, Field } from 'formik'
import { useHistory } from "react-router-dom";
import * as yup from 'yup'

import './login.css'
import axios from 'axios'



const Login = () => {

    useEffect(() => {

        function clearStorage() {
            localStorage.removeItem('usuario')
        }

        clearStorage()

    })

    const history = useHistory()
    const handleSubmit = values => {
        
        axios.post("http://localhost:3001/api/v1/usuario/login", values)
            .then(response => {
                const { data } = response

                if (data) {
                    localStorage.setItem('usuario', data)
                    history.push('/')
                }
            })
            .catch(err => console.log(err.response.data))
    }

    const validations = yup.object().shape({
        email: yup.string().email().required(),
        senha: yup.string().min(8).required()
    })

    return (
        <BrowserRouter>
            <h1>Login</h1>
            <p>Entre com seu email e senha</p>
            <Formik
                initialValues={{}}
                onSubmit={handleSubmit}
                validationSchema={validations}
            >
                <Form className="Login">
                    <div className="Login-Group">
                        <Field
                            name="email"
                            className="Login-Field"
                            autoComplete="off"
                        />
                        <ErrorMessage
                            component="span"
                            name="email"
                            className="Login-Error"
                        />
                    </div>
                    <div className="Login-Group">
                        <Field
                            name="senha"
                            className="Login-Field"
                            autoComplete="off"
                            type="password"
                        />
                        <ErrorMessage
                            component="span"
                            name="senha"
                            className="Login-Error"
                        />
                    </div>
                    <button className="Login-btn" type="submit">Login</button>
                    <br />
                </Form>
            </Formik>
            <a href="/register">Cadastrar-se</a>
        </BrowserRouter>
    )

}

export default Login