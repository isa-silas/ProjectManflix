import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from 'axios';


export default function MoviesValidation(){

    const [formMov, setFormMov] = useState({
        name: "",
        categoryFK:1
    });

    function handleForm(event) {
        const { name, value } = event.target;
        setFormMov((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    // function to do the POST at django
    function handleSubmit(event){
        const { name, categoryFK } = formMov
        event.preventDefault();
        axios.post("http://127.0.0.1:8000/movies/",[{
                    name:name,
                    categoryFK:categoryFK
                }]).then (res => console.log(res))
                .catch(err =>console.err(error));
        
    };

    return (
        <>
            <div className="field">
                <span className="p-float-label">
                    <label htmlFor="in">Title*</label>
                    <InputText
                        id="name"
                        name="name"
                        value={formMov.name}
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