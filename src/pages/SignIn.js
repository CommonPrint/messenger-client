import React, { useState } from 'react';
import { useDispatch } from "react-redux"

import { loginUser } from "../slices/users";

import { useNavigate } from 'react-router-dom';

import { Form } from '../components/form/Form'
import { Button } from '../components/Button'


export const SignIn = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialUserState = {
        "username": "",
        "password": "",
        "online": true,
        "lastActive": null
    }

    const [data, setData] = useState(initialUserState);
    const [submitted, setSubmitted] = useState(false); 


    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setData({...data, [name]: value})
    }


    const authorizeUser = (e) => {

        e.preventDefault();

        const {username, password, online, lastActive } = data;

        dispatch(loginUser({username, password, online, lastActive}))    
            .unwrap()
            .then(async (data) => {

                setData({
                    "username": data.username,
                    "password": data.password,
                    "online": true,
                    "lastActive": null
                });

                setSubmitted(true);
                
                localStorage.setItem('authorization', data.token);
                localStorage.setItem('token-life-time', new Date().getTime() + 86400000)
                localStorage.setItem('current-userId', data.id);

                if(localStorage.getItem('current-userId')) {
                    navigate('/');
                }

            })
            .catch(e => {
                console.log(e);
            })

    }//authorizeUser()


    return (
        <>
            {
                submitted ? (
                    <></>
                ) :
                (
                    <Form onSubmit={authorizeUser} className="sign-in column">
                        <input 
                            id="username" 
                            type="text" 
                            name="username"
                            value={data.username || ''}
                            autoComplete='off'
                            placeholder="Enter username" 
                            onChange={handleInputChange}    
                        />
                        <input 
                            id="password" 
                            type="password" 
                            name="password"
                            value={data.password}
                            autoComplete='off' 
                            placeholder="Enter password"
                            onChange={handleInputChange}
                        />
                        <Button className="sign-in__submit">Sign in</Button>
                        <div className="sign-in__raw"></div>
                        <Button 
                            className="sign-in__register" 
                            onClick={() => navigate("/register")}
                        >
                            Sign up
                        </Button>
                    </Form>
                )
            }
        </>
        
    )

}