import React, {useState} from 'react';
import Header from "../components/header";
import styled from 'styled-components';
import {useFormik} from "formik";
import { useNavigate } from 'react-router-dom';
import {instance} from '../configuration/axiosInstance';
import {setCookie} from '../configuration/cookieExtension'

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
    
    const [unsuccesfullMessage, setUnsuccessfullMessage] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPasswordFields, setShowPasswordFields] = useState(false)
    const [positionsOfCharInPassword, setPositionsOfCharInPassword] = useState([])

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            passwordField1: '',
            passwordField2: '',
            passwordField3: '',
            passwordField4: '',
            passwordField5: '',
        },
        onSubmit: values => {
            setPasswordError("")
                instance.post('/auth/login', {
                    email: values.email,
                    passModels: [
                        {
                            character: values.passwordField1,
                            position: positionsOfCharInPassword[0]
                        },
                        {
                            character: values.passwordField2,
                            position: positionsOfCharInPassword[1]
                        },
                        {
                            character: values.passwordField3,
                            position: positionsOfCharInPassword[2]
                        },
                        {
                            character: values.passwordField4,
                            position: positionsOfCharInPassword[3]
                        },
                        {
                            character: values.passwordField5,
                            position: positionsOfCharInPassword[4]
                        },
                    ]
                }).then( res => { 
                        setCookie("Authorization", "Bearer " + res.data.token)
                        navigate("/home")
                })
                .catch( err => {
                    setPasswordError("Zle haslo")
                })
        },
    });

    const onRedirectToRegister = () => {
        navigate("/register")
    }



    const drawPasswordPositions = (max) => {
        var array = []
        for(var i=0; i<5;){
            let random = Math.floor(Math.random() * (max - 1 + 1)) + 1;
            if(array.indexOf(random) === -1) {
                i++
                array.push(random)
            }
        }
        setPositionsOfCharInPassword(array);

    }

    const checkEmail = () => {

        
        setPositionsOfCharInPassword([])

            instance.get('/auth/passlen', {
                headers: {
                  'email': formik.values.email
                }
              }).then( res => { //succesful login
                setUnsuccessfullMessage("")
                drawPasswordPositions(res.data)
                setShowPasswordFields(true)
            })
            .catch( err => { //unsuccesfull login
                setShowPasswordFields(false)
                
                if(err.response.data == "User does not exist" && err.response.status == 404){
                    setUnsuccessfullMessage('Uzytkownik nie istnieje')
                }
                else if(err.response.data == "User has not confirmed email address" && err.response.status == 400){
                    setUnsuccessfullMessage('Uzytkownik nie ma potwierdzonego adresu email')
                }
                else{
                    setUnsuccessfullMessage("Inny blad")
                }
            })
    }

    return (
    <div>
        <Header title={"Logowanie"} />
        <Container>
            <form onSubmit={formik.handleSubmit}>
                <Column>
                <button onClick={onRedirectToRegister}>
                    Zarejestruj się
                </button>
                <br/><br/><br/>
                Email:
                    <label>
                        <input  
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange} 
                        />
                    </label>
                    <button onClick={checkEmail} type="button">
                        Sprawdz email i losuj znaki
                    </button>
                    <br/>
                    <ErrorSpan>{unsuccesfullMessage}</ErrorSpan>

                    { showPasswordFields ?
                    <div>
                        <InputDiv>
                            <label>
                                {positionsOfCharInPassword[0]} znak:
                                <input
                                    name="passwordField1"
                                    style={{width: 50}}
                                    value={formik.values.passwordField1}
                                    onChange={formik.handleChange} 
                                />
                            </label>
                        </InputDiv>
                        <InputDiv>
                            <label>
                                {positionsOfCharInPassword[1]} znak:
                                <input
                                    name="passwordField2"
                                    style={{width: 50}}
                                    value={formik.values.passwordField2}
                                    onChange={formik.handleChange} 
                                />
                            </label>
                        </InputDiv>
                        <InputDiv>
                            <label>
                                {positionsOfCharInPassword[2]} znak:
                                <input
                                    name="passwordField3"
                                    style={{width: 50}}
                                    value={formik.values.passwordField3}
                                    onChange={formik.handleChange} 
                                />
                            </label>
                        </InputDiv>
                        <InputDiv>
                            <label>
                            {positionsOfCharInPassword[3]} znak:
                                <input
                                    name="passwordField4"
                                    style={{width: 50}}
                                    value={formik.values.passwordField4}
                                    onChange={formik.handleChange} 
                                />
                            </label>
                        </InputDiv>
                        <InputDiv>
                            <label>
                                {positionsOfCharInPassword[4]} znak:
                                <input
                                    name="passwordField5"
                                    style={{width: 50}}
                                    value={formik.values.passwordField5}
                                    onChange={formik.handleChange} 
                                />
                            </label>
                        </InputDiv>
                        <button type='submit'>
                            Zaloguj się
                        </button>
                        <br/>
                        <ErrorSpan>{passwordError}</ErrorSpan>
                    </div>
                    :
                    null
                    }


                </Column>
            </form>

        </Container>
    </div>
    );
}

export default LoginPage;