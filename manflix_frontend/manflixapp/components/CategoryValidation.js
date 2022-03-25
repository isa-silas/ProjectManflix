import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import axios from 'axios';

export default function CategoryValidation({method}){
    const [allCats,setAllCats] = useState([])
    const [selectedCat,setSelectedCat] = useState();
    const [formCat, setFormCat] = useState({
        name: "",
    });

    useEffect(async ()=>{
        const response = await fetch(`http://127.0.0.1:8000/category/`)
        const data = await response.json()
        console.log(data)
        setAllCats(data);

      },[]
      )

    function handleForm(event) {
        const { name, value } = event.target;
        setFormCat((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    // function to do the POST at django
    function handleSubmit(event){
        const { name } = formCat
        event.preventDefault();
        axios.post("http://127.0.0.1:8000/category/",[{
                    name:name,
                }]).then (res => console.log(res))
                .catch(err =>console.err(error));
        window.alert("Registered")
    };

    function handleSubmitDel(event){
        event.preventDefault();
        axios.delete(`http://127.0.0.1:8000/category/${selectedCat.id}`)
        .then (res => console.log(res))
        .catch(err =>console.err(error));
        window.alert("Deleted")
    };

    if (method===1){

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
    }else if (method === 2){
        return(
            <>
                <div>
                    <h1>Categories</h1>
                </div>
                <div className="field">
                    <span className="p-float-label">
                        <label htmlFor="users">users</label>
                        <Dropdown
                        id = "categories"
                        name = "categories"
                        optionLabel="name"
                        options={allCats}
                        value = {selectedCat}
                        onChange={(e)=>setSelectedCat(e.value)}
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