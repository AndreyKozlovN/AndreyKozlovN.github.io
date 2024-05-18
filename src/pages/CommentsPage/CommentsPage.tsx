import { CommentsList } from "src/modules";
import styles from "./CommentsPage.module.css";
import CommentsListContext from "src/contexts/CommentsListContext";
import { useState } from "react";

export const CommentsPage = () => {

    const [likedPosts, setLikedPosts] = useState<number>(0);

        return (
            <div className={styles.wrapper}>
            <div className={styles.content}>
                <CommentsListContext.Provider value={{ likedPosts, setLikedPosts }}>
                    <CommentsList />
                </CommentsListContext.Provider>
            </div>
        </div>
    )
}