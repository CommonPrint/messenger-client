import React, {useState} from 'react';
import { useDispatch } from "react-redux"
import { createUser } from "../slices/users"

import {useNavigate, useSearchParams} from 'react-router-dom';

import {Form} from '../components/form/Form'
import {Button} from '../components/Button'


export const SignUp = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialUserState = {
        "username": "",
        "email": "",
        "password": ""
    }

    const [data, setData] = useState(initialUserState);
    const [submitted, setSubmitted] = useState(false); 


    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setData({...data, [name]: value})
    }


    const saveUser = (e) => {

        e.preventDefault();

        const {username, email, password } = data;

        dispatch(createUser({username, email, password}))
            .unwrap()
            .then(data => {

                setData({
                    "username": data.username,
                    "email": data.email,
                    "password": data.password
                });

                setSubmitted(true);

                navigate("/login");
            })
            .catch(e => {
                console.log(e);
            })

    }//saveUser()


    return (
        <>
            {
                submitted ? (
                    <div>
                        <h4>New user create successfully!</h4>
                    </div>
                ) :
                (
                    <Form onSubmit={saveUser} className="sign-up column">
                        <input 
                            id="username" 
                            type="text" 
                            name="username"
                            value={data.username || ''}
                            placeholder="Enter username" 
                            onChange={handleInputChange}    
                        />
                        <input 
                            id="email" 
                            type="email" 
                            name="email"
                            value={data.email} 
                            placeholder="Enter email" 
                            onChange={handleInputChange}
                        />
                        <input 
                            id="password" 
                            type="password" 
                            name="password"
                            value={data.password} 
                            placeholder="Enter password"
                            onChange={handleInputChange}
                        />
                        <Button className="sign-up__submit">
                            Sign up
                        </Button>
                    
                        <div className="sign-up__raw" />
                        
                        <Button 
                            className="sign-up__login" 
                            onClick={() => navigate("/login")}
                        >
                            Sign in
                        </Button>
                    </Form>
                )
            }
        </>
        
    )

}