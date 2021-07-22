import React, { useEffect, useState } from 'react'
import { BrowserRouter, useHistory } from 'react-router-dom'
import { ErrorMessage, Formik, Form, Field } from 'formik'
import * as yup from 'yup'

import './register.css'
import axios from 'axios'

const Register = () => {

    const history = useHistory()
    const handleSubmit = (values, { resetForm }) => {
        axios.post("http://localhost:3001/api/v1/usuario/registro", values)
            .then(response => {
                const { data } = response

                if (data) {
                    history.push('/login')
                }
            })
            .catch(err => console.log(err.response.data))
    }

    const validations = yup.object().shape({
        usuario: yup.string().required(),
        email: yup.string().email().required(),
        senha: yup.string().min(8).required()
    })

    return (
        <BrowserRouter>
            <h1>Cadastre-se Aqui!</h1>
            <Formik
                initialValues={{}}
                onSubmit={handleSubmit}
                validationSchema={validations}
            >
                <Form className="Login">
                    <div className="Login-Group">
                        <Field
                            name="usuario"
                            className="Login-Field"
                            autoComplete="off"
                        />
                        <ErrorMessage
                            component="span"
                            name="usuario"
                            className="Login-Error"
                        />
                    </div>
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
                    <button className="Login-btn" type="submit">Salvar</button>
                    <br />
                </Form>
            </Formik>

            <a href="/login">Voltar para login</a>
        </BrowserRouter>
    )
}

export default Register