import { ButtonProps } from "./Button.props";

import styles from "./Button.module.css";

export const Button = ({ text, onClick, disable = false} : ButtonProps) => (
    <button 
        className={`${styles.button} ${disable ? styles.disable : ''}`} 
        onClick={onClick}
    >
        <p className={styles.text}>{text}</p>
    </button>
)