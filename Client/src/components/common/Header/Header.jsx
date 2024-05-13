import React from 'react'
import styles from './Header.module.css'
import GoBackButton from '../GoBackButton/GoBackButton'

function Header() {
  return (
    <div>
    <div className={styles.header}>
        <GoBackButton />
    </div>
    </div>
  )
}

export default Header
