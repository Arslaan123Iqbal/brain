import React from 'react'
import styles from './Navbar.module.scss'
import Image from 'next/image'
const Navbar = () => {
  return (
    <div className={styles.main}>
     <div className={styles.logo}>
     <Image src={'/jawaplum_logo.png'} height={60} width={60} alt='jawaplum'/>
     <h1>JAWAPLUM</h1>
     </div>
    </div>
  )
}

export default Navbar