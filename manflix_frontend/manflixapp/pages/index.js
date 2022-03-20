import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Validation from "../components/Validation"

export default function Home({data,done}) {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.reg_box}>
          <Validation data = {data} done = {done}></Validation>
        </div>
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



