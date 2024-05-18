import { LikeCounterProps } from "./LikeCounter.props";

import { ReactComponent as HeartIcon } from "../../assets/heart.svg";

import styles from "./LikeCounter.module.css";

function formatNumberWithSpaces(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export const LikeCounter = ({ count, status, toggleLike } : LikeCounterProps ) => {

    return (
        <div className={styles.wrapper}>
            <HeartIcon 
                className={status === "liked" ? styles.liked : status === "default" ? styles.default : undefined}
                onClick={toggleLike}
            />

            <p className={styles.text}>{formatNumberWithSpaces(count)}</p>
        </div>
    )
}