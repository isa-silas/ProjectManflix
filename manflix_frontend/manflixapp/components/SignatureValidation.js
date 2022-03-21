import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from 'axios';


export default function SignatureValidation({data}){

    const [formSig, setFormSig] = useState({
        name: "",
        value:0.0
    });

    function handleForm(event) {
        const { name, value } = event.target;
        setFormSig((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    // function to do the POST at django
    function handleSubmit(event){
        const { name, value } = formSig
        event.preventDefault();
        axios.post("http://127.0.0.1:8000/signature/",[{
                    name:name,
                    value:value
                }]).then (res => console.log(res))
                .catch(err =>console.err(error));
        
    };

    return (
        <>
            <div className="field">
                <span className="p-float-label">
                    <label htmlFor="in">Signature Name*</label>
                    <InputText
                        id="name"
                        name="name"
                        value={formSig.name}
                        onChange={handleForm}
                        autoFocus
                    />
                </span>
            </div>

            <div className="field">
                <span className="p-float-label">
                    <label htmlFor="in">Value(R$)*</label>
                    <InputText
                        id="value"
                        name="value"
                        value={formSig.value}
                        onChange={handleForm}
                        autoFocus
                    />
                </span>
            </div>
            <Button
                type="submit"
                label="Submit"
                className="mt-2 btnSbmt"
                onClick={(event)=>handleSubmit(event)}
            />
            </>
        )

}