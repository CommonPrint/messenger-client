import { useState, useRef } from 'react';

import { updateOnlineUser } from '../slices/users';
import useOutsideClick from "../hooks/useOutsideClick";

import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

import {ListElem} from '../components/ListElem';
import {Button} from '../components/Button';

export const DropDown = () => {
    
    const ref = useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);

    // Закроет выпадающее меню, если кликнуть на что-либо за пределами меню
    useOutsideClick(ref, () => {
        if(dropdownMenuOpen) 
            setDropdownMenuOpen(false)
    })


    const logout = () => {

        const userId = localStorage.getItem("current-userId");

        dispatch(updateOnlineUser(userId, {"online": false, "lastActive": null}))
            .unwrap()
            .then(async (data) => {
                localStorage.removeItem('authorization');
                localStorage.removeItem('token-life-time');
                localStorage.removeItem('current-userId');

                await navigate('/login');
            })
            .catch(e => {
                console.log(e);
            })
        
    }



    return <div className="dropdown" ref={ref}>
                <Button
                    type="button" 
                    className="dropdown-toggle"
                    onClick={() => setDropdownMenuOpen(true)}
                >
                    <span className="visually-hidden">Открыть меню</span>
                </Button>

                <ul className={`dropdown-menu ${dropdownMenuOpen === true ? 'dropdown-menu-open' : ''}`}>
                    {/* <ListElem>New group</ListElem> */}
                    {/* <ListElem>Profile</ListElem> */}

                    <ListElem text="New group"/>
                    <ListElem text="Profile"/>
                    <ListElem text="Log out" onClick={logout}/>
                </ul>
            </div>

}