import styles from "../styles/Home.module.css";
import { Button } from "primereact/button";
import { ListBox } from "primereact/listbox";
import { useState } from "react";
import Form from "./Form";
import Delete from "./Delete";
import MoviesCarousel from "./MoviesCarousel";

export default function Menu({ data_sig, data_movies, done, opt }) {
  const [numForm, setNumForm] = useState(0);
  const [movie, setMovie] = useState();

  if (opt === 0) {
    return (
      <>
        <div className={styles.home}>
            <h1 className={styles.title}>Welcome to Manflix!</h1>
            <h3 className={styles.title}>Don't waste your time looking for movies thaks to our small collection</h3>
        </div>
      </>
    );
  } else if (opt == 2) {
    return (
      <>
        <div className={styles.main}>
          <div className={styles.header}>
            <Button label="Users" onClick={() => setNumForm(1)} />
            <Button label="Signature" onClick={() => setNumForm(2)} />
            <Button label="Movies" onClick={() => setNumForm(3)} />
            <Button label="Category" onClick={() => setNumForm(4)} />
          </div>
          <Form data_sig={data_sig} done={done} page={numForm}></Form>
        </div>
      </>
    );
  } else if (opt == 1) {
    return (
      <>
      <div className={styles.carousel}>
        {/* Another option to show the movies */}
        {/* <div className={styles.listbox_container}>
          <span className="p-listbox">
            <ListBox
              value={movie}
              options={data_movies}
              optionLabel="name"
              onChange={(e) => setMovie(e.value)}
            />
          </span>
        </div> */}
        <MoviesCarousel data_movies={data_movies}></MoviesCarousel>
      </div>

      </>
    );
  } else if (opt == 3) {
    return (
      <>
        <div className={styles.main}>
          <div className={styles.header}>
            <Button label="Users" onClick={() => setNumForm(1)} />
            <Button label="Signature" onClick={() => setNumForm(2)} />
            <Button label="Movies" onClick={() => setNumForm(3)} />
            <Button label="Category" onClick={() => setNumForm(4)} />
          </div>
          <Delete
            data_sig={data_sig}
            data_movies={data_movies}
            done={done}
            page={numForm}
          />
        </div>
      </>
    );
  }
}
