import { CommentsList } from "src/modules";
import styles from "./index.module.css";

export const CommentsPage = () => (
    <div className={styles.wrapper}>
        <div className={styles.content}>
            <CommentsList />
        </div>
    </div>
)