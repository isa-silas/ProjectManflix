import { Carousel } from "primereact/carousel";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";

export default function MoviesCarousel({ data_movies }) {
  const [allMovies, setAllMovies] = useState([]);

  function movieTemplate(movie) {
    const source = movie.img 
    console.log(movie)
    return (
        <div className="movie-item">
            <div className="movie-item-content">
                <div className="mb-3">
                    <img src={source} />
                </div>
                <div>
                    <h4 className="mb-1">{movie.name}</h4>
                    <div className="car-buttons mt-5">
                        <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded mr-2" />
                    </div>
                </div>
            </div>
        </div>
    );
}
  
  return (
    <div className="card">
      <Carousel
        value={data_movies}
        numVisible={3}
        numScroll={1}
        // responsiveOptions={this.responsiveOptions}
        className="custom-carousel"
        circular
        autoplayInterval={4500}
        itemTemplate={movieTemplate}
        header={<h5>Carousel header</h5>}
      />
    </div>
  );
}
