import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Form from '../components/Form'
import { Button } from "primereact/button";
import {useState} from "react";


export default function Home({data,done}) {
  const [numForm,setNumForm] = useState(1) 
  

  return (
    <>
      <div className={styles.main}>
        <div className={styles.header}>
          <Button
          label="Users"
          onClick={()=>setNumForm(1)}
          />
          <Button
          label="Signature"
          onClick={()=>setNumForm(2)}
          />
          <Button
          label="Movies"
          onClick={()=>setNumForm(3)}
          />
          <Button
          label="Category"
          onClick={()=>setNumForm(4)}
          />
        </div>
        <Form data={data} done={done} page={numForm}></Form>
      </div>
    </>
  )
}

// function connecting next and django
export async function getStaticProps(){

  const response = await fetch("http://127.0.0.1:8000/users/")
  const data = await response.json()

  return{
      props:{
          data: data,
          done: true,
      }
  }

}



