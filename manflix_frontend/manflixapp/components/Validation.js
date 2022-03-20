import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import axios from 'axios';



export default function Validation({ data, done}) {
    // console.log('data :>> ', data);
    // console.log('done :>> ', done);

    const [formUser, setFormUser] = useState({
        name: data[0].name,
        idUser: "",
        email: "",
        phone: "",
        active: false
    });

    function handleForm(event) {
        const { name, value } = event.target;
        setFormUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    function handleCheck(event) {
        const { checkbox, value } = event.target;
        setFormUser((prevState) => ({
            ...prevState,
            [checkbox]: value,
        }));
    }

    function handleSubmit(event){
        const { name,idUser,email,phone,active} = formUser
        event.preventDefault();
        axios.post("http://127.0.0.1:8000/users/",{
                    name:name,
                    idUser:idUser,
                    email: email,
                    phone: phone,
                    active: active
                }).then (res => console.log(res))
                .catch(err =>console.err(error));
        
        // switch(requestType){
        //     case 'post':
        //         axios.post("http://127.0.0.1:8000/users/",{
        //             name:name,
        //             idUser:idUser,
        //             email: email,
        //             phone: phone,
        //             active: active
        //         }).then (res => console.log(res))
        //         .catch(err =>console.err(error));
            
        //     case 'put':
        //         axios.put(`http://127.0.0.1:8000/users/${articleID}`,{
        //             name:name,
        //             idUser:idUser,
        //             email: email,
        //             phone: phone,
        //             active: active
        //         }).then (res => console.log(res))
        //         .catch(err =>console.err(error));
            
        // }
        
    };

    return (
        <>
            <div className="field">
                <span className="p-float-label">
                    <label htmlFor="in">Name*</label>
                    <InputText
                        id="name"
                        name="name"
                        value={formUser.name}
                        onChange={handleForm}
                        autoFocus
                    />
                </span>
            </div>

            <div className="field">
                <span className="p-float-label">
                    <label htmlFor="in">User ID*</label>
                    <InputText
                        id="idUser"
                        name="idUser"
                        value={formUser.idUser}
                        onChange={handleForm}
                        autoFocus
                    />
                </span>
            </div>

            {/* email field */}
            <div className="field">
                <span className="p-float-label p-input-icon-right">
                    <label htmlFor="email">Email*</label>
                    <InputText
                        id="email"
                        name="email"
                        value={formUser.email}
                        onChange={handleForm}
                    />
                </span>
            </div>

            {/* phone field */}
            <div className="field">
                <span className="p-float-label">
                    <label htmlFor="phone">Phone*</label>
                    <InputText
                        id="phone"
                        name="phone"
                        value={formUser.phone}
                        onChange={handleForm}
                    />
                </span>
            </div>


            <div className="field">
                <span className="p-float-label">
                    <label htmlFor="active">Active</label>
                    <Checkbox
                        id="active"
                        name="active"
                        value={formUser.active}
                        onClick={handleCheck}
                    />
                </span>
            </div>

            <Button
                type="submit"
                label=""
                className="mt-2 btnSbmt"
                onClick={(event)=>handleSubmit(event)}
            ></Button>

            {/* <script src="./post.js"></script> */}
        </>
    );

}





