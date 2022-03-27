import { Carousel } from "primereact/carousel";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import axios from 'axios';

export default function MoviesCarousel({ data_movies }) {
  const [allUsers, setAllUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState([])
  const [favorite, setFavorite] = useState({
    movieFK: 0,
    userFK: 1,
  })
  const [allFavorites, setAllFavorites] = useState([])


  useEffect(async () => {
    const response = await fetch(`http://127.0.0.1:8000/favorite/`)
    const data = await response.json()
    // console.log(data)
    setAllFavorites(data);

    const response2 = await fetch(`http://127.0.0.1:8000/users/`)
    const data2 = await response2.json()
    console.log(data2)
    setAllUsers(data2);
  }, []
  )

  function favMovie() {
    // event.preventDefault();
    console.log("Movie id: ", favorite)
    console.log("User id: ", selectedUser)
    axios.post("http://127.0.0.1:8000/favorite/", [{
      movieFK: favorite,
      userFK: selectedUser,
    }]).then(res => console.log(res))
      .catch(err => console.err(error));
    // window.alert("Registered")
  }

  function movieTemplate(movie) {
    const source = movie.img
    const movieId = movie.id
    return (
      <div className="movie-item">
        <div className="movie-item-content">
          <div className="mb-3">
            <img src={source} />
          </div>
          <div  className="label_movie">
            <h4 className="mb-1">{movie.name}</h4>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>Tell us what your favorite movie is</h3>
      <div className="reg_favorites">
        <div className="drop"> 
        <Dropdown
          id="user"
          name="user"
          placeholder="User"
          optionLabel="name"
          optionValue="id"
          options={allUsers}
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.value)}
        />
        </div>
        <div className="drop">
        <Dropdown
          id="favorite"
          name="favorite"
          placeholder="Movie"
          optionLabel="name"
          optionValue="id"
          options={data_movies}
          value={favorite}
          onChange={(e) => setFavorite(e.value)}
        />
        </div>
        <div>
        <Button
          icon="pi pi-check"
          className="p-button-success p-button-rounded mr-2"
          onClick={favMovie}
        />
        </div>
      </div>
      <Carousel
        value={data_movies}
        numVisible={3}
        numScroll={1}
        // responsiveOptions={this.responsiveOptions}
        className="custom-carousel"
        circular
        autoplayInterval={4500}
        itemTemplate={movieTemplate}
        header={<h3>Our movies</h3>}
      />
    </div>

  );
}
