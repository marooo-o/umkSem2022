import * as React from "react";
import Header from "../components/header";
import styled from 'styled-components';
import * as Yup from "yup";
import {useFormik} from "formik";
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Column = styled.div`
    flex-direction: column;
`

const Row = styled.div`
    flex-direction: row;
`

const InputDiv = styled.div`
    width: 200px;
    margin: 10px 0px;
`

const ErrorSpan = styled.span`
    display: block;
    color: red;
    font-size: 12px;
`

const LoginPage = () => {

    const navigate = useNavigate();

    const validationSchema = Yup.object({
        id: Yup.string()
            .required('Wpisz poprawny identyfikator'),
        passwordField1: Yup.string()
            .required("Wpisz x znak hasła"),
        passwordField2: Yup.string()
            .required("Wpisz x znak hasła"),
        passwordField3: Yup.string()
            .required("Wpisz x znak hasła"),
        passwordField4: Yup.string()
            .required("Wpisz x znak hasła"),
        passwordField5: Yup.string()
            .required("Wpisz x znak hasła"),
    });

    const formik = useFormik({
        initialValues: {
            id: '',
            passwordField1: '',
            passwordField2: '',
            passwordField3: '',
            passwordField4: '',
            passwordField5: '',
        },
        validationSchema,
        onSubmit: values => {
            navigate("/home")
        },
    });

    return (
    <div>
        <Header title={"Logowanie"} />
        <Container>
            <form onSubmit={formik.handleSubmit}>
                <Column>
                Identyfikator:
                    <label>
                        <input  
                                name="id"
                                value={formik.values.id}
                                onChange={formik.handleChange} 
                        />
                        {formik.touched.id && formik.errors.id ? <ErrorSpan>{formik.errors.id}</ErrorSpan> : ""}
                    </label>
                <Row>
                    Hasło:
                    <InputDiv>
                        <label>
                            x znak:
                            <input
                                name="passwordField1"
                                style={{width: 50}}
                                value={formik.values.passwordField1}
                                onChange={formik.handleChange} 
                            />
                            {formik.touched.passwordField1 && formik.errors.passwordField1 ? <ErrorSpan>{formik.errors.passwordField1}</ErrorSpan> : ""}
                        </label>
                    </InputDiv>
                    <InputDiv>
                        <label>
                            x znak:
                            <input
                                name="passwordField2"
                                style={{width: 50}}
                                value={formik.values.passwordField2}
                                onChange={formik.handleChange} 
                            />
                            {formik.touched.passwordField2 && formik.errors.passwordField2 ? <ErrorSpan>{formik.errors.passwordField2}</ErrorSpan> : ""}
                        </label>
                    </InputDiv>
                    <InputDiv>
                        <label>
                            x znak:
                            <input
                                name="passwordField3"
                                style={{width: 50}}
                                value={formik.values.passwordField3}
                                onChange={formik.handleChange} 
                            />
                            {formik.touched.passwordField3 && formik.errors.passwordField3 ? <ErrorSpan>{formik.errors.passwordField3}</ErrorSpan> : ""}
                        </label>
                    </InputDiv>
                    <InputDiv>
                        <label>
                            x znak:
                            <input
                                name="passwordField4"
                                style={{width: 50}}
                                value={formik.values.passwordField4}
                                onChange={formik.handleChange} 
                            />
                            {formik.touched.passwordField4 && formik.errors.passwordField4 ? <ErrorSpan>{formik.errors.passwordField4}</ErrorSpan> : ""}
                        </label>
                    </InputDiv>
                    <InputDiv>
                        <label>
                            x znak:
                            <input
                                name="passwordField5"
                                style={{width: 50}}
                                value={formik.values.passwordField5}
                                onChange={formik.handleChange} 
                            />
                            {formik.touched.passwordField5 && formik.errors.passwordField5 ? <ErrorSpan>{formik.errors.passwordField5}</ErrorSpan> : ""}
                        </label>
                    </InputDiv>
                </Row>


                <button type='submit'>
                    Zaloguj się
                </button>
                </Column>
            </form>
        </Container>
    </div>
    );
}

export default LoginPage;