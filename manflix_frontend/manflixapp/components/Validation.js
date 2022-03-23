import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import axios from 'axios';



export default function Validation({ data, done,method}) {
    // console.log('data :>> ', data);
    // console.log('done :>> ', done);
    const[allUsers,setAllUsers] = useState([])
    const [selectedUser,setSelectedUser] = useState()
    const [formUser, setFormUser] = useState({
        name: "",
        idUser: "",
        email: "",
        phone: "",
        active: false
    });

    const [selectedSignature,setSelectedSig] = useState();

    useEffect(async ()=>{
        const response = await fetch(`http://127.0.0.1:8000/users/`)
        const data = await response.json()
        console.log(data)
        setAllUsers(data);
    
      },[]
      )

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

    // function to do the POST at django
    function handleSubmit(event){
        const { name,idUser,email,phone,active} = formUser
        event.preventDefault();
        axios.post("http://127.0.0.1:8000/users/",[{
                    name:name,
                    idUser:idUser,
                    email: email,
                    phone: phone,
                    active: active,
                    signatureFK:1
                }]).then (res => console.log(res))
                .catch(err =>console.err(error));
        
    };
    function handleSubmitDel(event){
        event.preventDefault();
        // console.log(selectedUser.id)
        axios.delete(`http://127.0.0.1:8000/users/${selectedUser.id}`)
        .then (res => console.log(res))
        .catch(err =>console.err(error));
        
    };

    if(method ===1){
        return (
            <>
                <div className="form_title">
                    <h2>Users</h2>
                </div>
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
                        <label htmlFor="signature">Signature*</label>
                        <Dropdown
                            id="signature"
                            name="signature"
                            optionLabel = "name"
                            options={data}
                            value={selectedSignature}
                            onChange={(e)=>setSelectedSig(e.value)}
                        />
                    </span>
                </div>
                <div className="field_check">
                    {/* <span className="p-float-label"> */}
                    <label htmlFor="active">Active</label>
                        <Checkbox
                            id="active"
                            name="active"
                            value={formUser.active}
                            onClick={handleCheck}
                        />
                    {/* </span> */}
                </div>
                
    
                <Button
                    type="submit"
                    label="Submit"
                    className="mt-2 btnSbmt"
                    onClick={(event)=>handleSubmit(event)}
                />
    
            <style jsx>{`
                    .field{
                        padding:10%
                    }
                    .field_check{
                        display: flex;
                        flex-direction:row
                    }
                    .field_check label{
                        margin-right:15%;
                        margin-bottom:50%
                    }
    
            `}</style>
    
            </>
        );
    }else if(method ===2){
        return(
            <>
                <div className="field">
                    <span className="p-float-label">
                        <label htmlFor="users">users</label>
                        <Dropdown
                        id = "users"
                        name = "users"
                        optionLabel="name"
                        options={allUsers}
                        value = {selectedUser}
                        onChange={(e)=>setSelectedUser(e.value)}
                        />
                    </span>
                </div>
    
                <Button
                    type="submit"
                    label="Submit"
                    className="mt-2 btnSbmt"
                    onClick={(event)=>handleSubmitDel(event)}
                />
    
                
                <style jsx>{`
                
                    .field{
                        padding:10%
                    }
    
                `}</style>
                </>
        )
    }

}





