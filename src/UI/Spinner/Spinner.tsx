import { ReactComponent as LoaderIcon } from "../../assets/spinner.svg";

import styles from "./Spinner.module.css";

export const Spinner = () => {

    return (
        <div className={styles.wrapper}>
            <LoaderIcon />
        </div>
    )
}