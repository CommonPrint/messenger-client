import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import { createChat } from "../../slices/chats";

import {useNavigate} from 'react-router-dom';

import {Form} from '../form/Form';
import {Button} from '../Button';


export const Chat = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialChatState = {
        "name": "",
        "type": "",
        "userChats": [],
        "messages": []
    }

    const [data, setData] = useState(initialChatState);
    const [submitted, setSubmitted] = useState(false); 


    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setData({...data, [name]: value})
    }


    const saveChat = (e) => {

        e.preventDefault();

        // const {name, creatorId, type, users} = data;
        const {name} = data;

        const creatorId = 35;

        const type = "private";

        const users = [34, 35];

        dispatch(createChat({name, creatorId, type, users}))
            .unwrap()
            .then(data => {

                // setData({
                //     "username": data.username,
                //     "email": data.email,
                //     "password": data.password
                // });

                setSubmitted(true);
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
                        <h4>Chat was created successfully!</h4>
                    </div>
                ) :
                (
                    <Form onSubmit={saveChat} className="form-register column">
                        <input 
                            id="name" 
                            type="text" 
                            name="name"
                            value={data.name || ''}
                            placeholder="Enter chat name" 
                            onChange={handleInputChange}    
                        />
                        <Button text="Create chat" />
                    </Form>
                )
            }
        </>
        
    )

}