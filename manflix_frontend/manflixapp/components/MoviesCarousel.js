import { Carousel } from "primereact/carousel";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";

export default function MoviesCarousel({ data_movies }) {
  const [allMovies, setAllMovies] = useState([]);

  function movieTemplate(movie) {
    return (
        <div className="product-item">
            <div className="product-item-content">
                <div className="mb-3">
                    <img src={`HTTP://localhost:8000/movies/${movie.id}`} className="product-image" />
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
        autoplayInterval={3000}
        itemTemplate={movieTemplate}
        header={<h5>Carousel header</h5>}
      />
    </div>
  );
}
