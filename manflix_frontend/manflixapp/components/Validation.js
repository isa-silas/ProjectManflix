import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import axios from 'axios';



export default function Validation({ data, done,method}) {
    // console.log('data :>> ', data);
    // console.log('done :>> ', done);
    const[allUsers,setAllUsers] = useState([])
    const [selectedUser,setSelectedUser] = useState([])
    const [formUser, setFormUser] = useState({
        name: "",
        idUser: "",
        email: "",
        phone: "",
    });

    const [selectedSignature,setSelectedSig] = useState();
    const [allSigs,setAllSigs] = useState([]);

    useEffect(async ()=>{
        const response = await fetch(`http://127.0.0.1:8000/users/`)
        const data = await response.json()
        console.log(data)
        setAllUsers(data);

        const response2 = await fetch(`http://127.0.0.1:8000/signature/`)
        const data2 = await response2.json()
        console.log(data2)
        setAllSigs(data2);
    
      },[]
      )

    function handleForm(event) {
        console.log(event)
        const { name, value } = event.target;
        setFormUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    // function to do the POST at django
    function handleSubmit(event){
        const { name,idUser,email,phone} = formUser
        const selectedSig = selectedSignature
        event.preventDefault();
        axios.post("http://127.0.0.1:8000/users/",[{
                    name:name,
                    idUser:idUser,
                    email: email,
                    phone: phone,
                    signatureFK:selectedSig
                }]).then (res => console.log(res))
                .catch(err =>console.err(error));
        window.alert("Registered")
    };
    
    // function to do the DELETE at django
    function handleSubmitDel(event){
        event.preventDefault();
        axios.delete(`http://127.0.0.1:8000/users/${selectedUser.id}`)
        .then (res => console.log(res))
        .catch(err =>console.err(error));
        window.alert("Deleted")
        
    };

    if(method ===1){
        return (
            <>
                <div className="form_title">
                    <h2>User</h2>
                </div>
                <div className="field">
                    <span >
                        <InputText
                            id="name"
                            name="name"
                            placeholder="Name*"
                            value={formUser.name}
                            onChange={handleForm}
                            autoFocus
                        />
                    </span>
                </div>
    
                <div className="field">
                    <span >
                        <InputText
                            id="idUser"
                            name="idUser"
                            placeholder="How we should call you*"
                            value={formUser.idUser}
                            onChange={handleForm}
                            autoFocus
                        />
                    </span>
                </div>
    
                {/* email field */}
                <div className="field">
                    <span>
                        <InputText
                            id="email"
                            name="email"
                            placeholder="Email*"
                            value={formUser.email}
                            onChange={handleForm}
                        />
                    </span>
                </div>
    
                {/* phone field */}
                <div className="field">
                    <span>
                        <InputText
                            id="phone"
                            name="phone"
                            placeholder="Phone*"
                            value={formUser.phone}
                            onChange={handleForm}
                        />
                    </span>
                </div>
    
    
                <div className="field">
                    <span >
                        <Dropdown
                            id="signature"
                            name="signature"
                            placeholder="Signature"
                            optionLabel = "name"
                            optionValue="id"
                            options={allSigs}
                            value={selectedSignature}
                            onChange={(e)=>setSelectedSig(e.value)}
                        />
                    </span>
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
                 <div className="form_title">
                    <h1>Users</h1>
                </div>
                <div className="field">
                    <span >
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
                    label="Delete"
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





