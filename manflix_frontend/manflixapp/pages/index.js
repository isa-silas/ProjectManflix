import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Form from '../components/Form'
import { Button } from "primereact/button";
import {useState} from "react";
import Menu from '../components/Menu'


export default function Home({data_sig,data_movies,done}) {
  const [numForm,setNumForm] = useState(1) 
  const [actionOpt,setActionOpt] = useState(0)
  
  return (
    <>
    <div className={styles.topHeader}>
      {/* <img src="img/logo_manflix.png"/> */}
      <Button
      className="p-button-danger p-button-text"
      label = "List of Movies"
      onClick={()=>setActionOpt(1)}
      />
      <Button
      className="p-button-danger p-button-text"
      label = "Registrations"
      onClick={()=>setActionOpt(2)}
      />
      <Button
      className="p-button-danger p-button-text"
      label = "Delete"
      onClick={()=>setActionOpt(3)}
      />
    </div>
      <div>
        <Menu data_sig={data_sig} data_movies={data_movies} done={done} opt = {actionOpt}/>
      </div>
    </>
  )
}

// function connecting next and django
export async function getStaticProps(){

  const response_sig = await fetch("http://127.0.0.1:8000/signature/")
  const data_sig = await response_sig.json()
  
  const response_users = await fetch("http://127.0.0.1:8000/users/")
  const data_users = await response_users.json()
  
  const response_movies = await fetch("http://127.0.0.1:8000/movies/")
  const data_movies = await response_movies.json()
  
  const response_category = await fetch("http://127.0.0.1:8000/category/")
  const data_cat = await response_category.json()


  return{
      props:{
          data_sig: data_sig,
          data_users: data_users,
          data_movies: data_movies,
          data_cat: data_cat,
          done: true,
      }
  }

}



