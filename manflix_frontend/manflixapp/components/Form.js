
import { Button } from 'primereact/button';
import Validation from './Validation'
import SignatureValidation from './SignatureValidation';
import MoviesValidation from './MoviesValidation';
import CategoryValidation from './CategoryValidation';
import styles from "../styles/Home.module.css"


export default function Header({ data, done,page}) {
    console.log(data)

    
        if(page === 1){ 
            return(
                <div className={styles.reg_box}>
                    <Validation data = {data} done={done}></Validation>
                </div>
            )
            
        }else if(page === 2){
            return(
            <div className={styles.reg_box}>
                <SignatureValidation data={data}/>
            </div>                
            )
        }else if(page === 3){
            return(
            <div className={styles.reg_box}>
                <MoviesValidation/>
            </div>                
            )
        }else if(page === 4){
            return(
            <div className={styles.reg_box}>
                <CategoryValidation/>
            </div>                
            )
        }

}