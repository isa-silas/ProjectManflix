import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import axios from 'axios';


export default function SignatureValidation({data,method}){
    const [allSigs, setAllSigs] = useState([]);
    const [selectedSig, setSelectedSig] = useState();
    
    const [formSig, setFormSig] = useState({
        name: "",
        value:0.0
    });
    
    useEffect(async ()=>{
        const response = await fetch(`http://127.0.0.1:8000/signature/`)
        const data = await response.json()
        console.log(data)
        setAllSigs(data);
      },[]
      )

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
    function handleSubmitDel(event){
        event.preventDefault();
        // console.log(selectedSig.id)
        axios.delete(`http://127.0.0.1:8000/signature/${selectedSig.id}`)
        .then (res => console.log(res))
        .catch(err =>console.err(error));
        window.alert("Deleted")
        
    };

    if(method === 1){
        return (
            <>
                <div className="form_title">
                    <h2>Signature</h2>
                </div>
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
    
                <style jsx>{`
                    .field{
                        padding:10%
                    }
    
                `}</style>
    
                </>
            )
    }else if(method === 2){
        return (
            <>
                <div className="form_title">
                    <h1>Signature</h1>
                </div>
                <div className="field">
                    <span className="p-float-label">
                        <label htmlFor="movies">Movie</label>
                        <Dropdown
                        id = "movies"
                        name = "movies"
                        optionLabel="name"
                        options={allSigs}
                        value = {selectedSig}
                        onChange={(e)=>setSelectedSig(e.value)}
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