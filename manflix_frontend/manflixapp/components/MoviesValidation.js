import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import axios from 'axios';


export default function MoviesValidation({method,data_movies}){

    const [formMov, setFormMov] = useState({
        name: "",
        img:"",
    });

    const [allMovies,setAllMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState();

    const[selectedCat,setSelectedCat] = useState();
    const [allCats,setAllCats] = useState([]);
    
    useEffect(async ()=>{
        const response = await fetch(`http://127.0.0.1:8000/movies/`)
        const data = await response.json()
        console.log(data)
        setAllMovies(data);
        
        const response2 = await fetch(`http://127.0.0.1:8000/category/`)
        const data2 = await response2.json()
        console.log(data2)
        setAllCats(data2);

    
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
        const {name,img} = formMov
        const idCat = selectedCat
        console.log(idCat)
        event.preventDefault();
        axios.post("http://127.0.0.1:8000/movies/",[{
                    name:name,
                    img:img,
                    categoryFK:idCat
                }]).then (res => console.log(res))
                .catch(err =>console.err(error));
        window.alert("Registered")
    };

    // function to do the DELETE at django
    function handleSubmitDel(event){
        event.preventDefault();
        console.log(selectedMovie.id)
        axios.delete(`http://127.0.0.1:8000/movies/${selectedMovie.id}`)
        .then (res => console.log(res))
        .catch(err =>console.err(error));
        window.alert("Deleted")
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

                <div className="field">
                    <span className="p-float-label">
                        <label htmlFor="img">Image (internet link)</label>
                        <InputText
                            id="img"
                            name="img"
                            value={formMov.img}
                            onChange={handleForm}
                            autoFocus
                        />
                    </span>
                </div>

                <div className="field">
                    <span className="p-float-label">
                        <label htmlFor="categories">users</label>
                        <Dropdown
                        id = "categories"
                        name = "categories"
                        optionLabel="name"
                        optionValue="id"
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
                    <h1>Movies</h1>
                </div>
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