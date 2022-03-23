
import { Button } from 'primereact/button';
import Validation from './Validation'
import SignatureValidation from './SignatureValidation';
import MoviesValidation from './MoviesValidation';
import CategoryValidation from './CategoryValidation';
import styles from "../styles/Home.module.css"


export default function Form({ data_sig, done,page}) {
    console.log(data_sig)

    if(page===0){
        return(
            <div>
                <h1>Choose what you want to register</h1>
            </div>
        )
    }else if(page === 1){ 
            return(
                <div className={styles.reg_box}>
                    <Validation data = {data_sig} method={1} done={done}></Validation>
                </div>
            )
            
        }else if(page === 2){
            return(
            <div className={styles.reg_box}>
                <SignatureValidation method={1} data={data_sig}/>
            </div>                
            )
        }else if(page === 3){
            return(
            <div className={styles.reg_box}>
                <MoviesValidation method={1}/>
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