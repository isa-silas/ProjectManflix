
import { Button } from 'primereact/button';
import Validation from './Validation'
import SignatureValidation from './SignatureValidation';
import MoviesValidation from './MoviesValidation';
import CategoryValidation from './CategoryValidation';
import styles from "../styles/Home.module.css"


export default function Delete({ data_sig,data_movies, done,page=0}) {
    console.log(data_movies)
    if(page===0){
        return(
            <div>
                <h1>Choose what you want to delete</h1>
            </div>
        )
    }else if(page===1){
        return(
            <div className={styles.reg_box}>
                <Validation method={2} data_movies={data_movies}/>
            </div>                
            )
    }else if(page===2){
        return(
            <div className={styles.reg_box}>
                <SignatureValidation method={2} data_movies={data_movies}/>
            </div>                
            )
    }else if(page===3){
        return(
            <div className={styles.reg_box}>
                <MoviesValidation method={2} data_movies={data_movies}/>
            </div>                
            )
    }else if(page===4){
        return(
            <div className={styles.reg_box}>
                <CategoryValidation method={2}/>
            </div>                
            )
    }

}