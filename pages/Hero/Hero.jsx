import Brain from '@/components/Brain/Brain'
import React from 'react'
import styles from './Hero.module.scss'
import Header from '../../components/Header'
const Hero = () => {
  return (
    <div className={styles.main} >
    <Brain />
    <div className={styles.header}>
      {" "}
      <h1 style={{ color: "white" }}>HERE THOUGHTS</h1>
      <h1 style={{ color: "white" }}>BECOME BRAND</h1>
    </div>
    <Header/>
  </div>
  )
}

export default Hero