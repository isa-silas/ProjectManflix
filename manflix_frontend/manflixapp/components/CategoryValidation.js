import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from 'axios';


export default function CategoryValidation(){

    const [formCat, setFormCat] = useState({
        name: "",
    });

    function handleForm(event) {
        const { name, value } = event.target;
        setFormCat((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    // function to do the POST at django
    function handleSubmit(event){
        const { name } = formMov
        event.preventDefault();
        axios.post("http://127.0.0.1:8000/category/",[{
                    name:name,
                }]).then (res => console.log(res))
                .catch(err =>console.err(error));
        
    };

    return (
        <>
            <div className="form_title">
                <h2>Category</h2>
            </div>
            <div className="field">
                <span className="p-float-label">
                    <label htmlFor="in">Name*</label>
                    <InputText
                        id="name"
                        name="name"
                        value={formCat.name}
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

}