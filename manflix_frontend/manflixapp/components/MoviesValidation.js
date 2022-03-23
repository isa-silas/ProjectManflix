import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import axios from 'axios';


export default function MoviesValidation({method,data_movies}){

    const [formMov, setFormMov] = useState({
        name: "",
        categoryFK:1
    });

    const [allMovies,setAllMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState();

    useEffect(async ()=>{
        const response = await fetch(`http://127.0.0.1:8000/movies/`)
        const data = await response.json()
        console.log(data)
        setAllMovies(data);
    
      },[]
      )
    
    
    function handleForm(event) {
        const { name, value } = event.target;
        setFormMov((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    function handleSubmit(event){
        const { name,categoryFK} = formMov
        event.preventDefault();
        axios.post("http://127.0.0.1:8000/movies/",[{
                    name:name,
                    categoryFK:categoryFK
                }]).then (res => console.log(res))
                .catch(err =>console.err(error));
        
    };

    // function to do the DELETE at django
    function handleSubmitDel(event){
        event.preventDefault();
        console.log(selectedMovie.id)
        axios.delete(`http://127.0.0.1:8000/movies/${selectedMovie.id}`)
        .then (res => console.log(res))
        .catch(err =>console.err(error));
        
    };
    if(method===1){
        return (
            <>
                <div className="form_title">
                    <h2>Movies</h2>
                </div>
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
                <div className="field">
                    <span className="p-float-label">
                        <label htmlFor="movies">Movie</label>
                        <Dropdown
                        id = "movies"
                        name = "movies"
                        optionLabel="name"
                        options={allMovies}
                        value = {selectedMovie}
                        onChange={(e)=>setSelectedMovie(e.value)}
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