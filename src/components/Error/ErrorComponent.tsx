import ErrorGif from "../../assets/error.gif";

import { Button } from "src/UI";

import styles from "./ErrorComponent.module.css";

export const ErrorComponent = () => {

    return (
        <div className={styles.wrapper}>
            <img src={ErrorGif} alt="Error" className={styles.img}/>

            <Button 
                text="Обновить страницу"
                onClick={() => window.location.reload()}
            />
        </div>
    )
}