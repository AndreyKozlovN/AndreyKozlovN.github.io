import { useContext, useMemo, useState } from "react";

import { Avatar } from "src/UI";
import { LikeCounter } from "src/components";

import CommentsListContext from "src/contexts/CommentsListContext";

import { CommentItemComponentProps } from "./CommentItem.props";

import styles from "./CommentItem.module.css";

function reformatDateString(dateStr: string): string {
    const dateObj = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - dateObj.getTime();
    
    if (diffMs <= 24 * 60 * 60 * 1000) { // 24 часа в миллисекундах
        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        
        if (diffSeconds < 60) {
            return `${diffSeconds} ${declension(diffSeconds, 'секунду', 'секунды', 'секунд')} назад`;
        } else if (diffMinutes < 60) {
            return `${diffMinutes} ${declension(diffMinutes, 'минуту', 'минуты', 'минут')} назад`;
        } else if (diffHours < 24) {
            return `${diffHours} ${declension(diffHours, 'час', 'часа', 'часов')} назад`;
        }
    }
    
    return dateObj.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).replace(/\./g, '/').replace(',', ', ');
}

function declension(count: number, one: string, two: string, five: string): string {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;
    
    if (lastDigit === 1 && lastTwoDigits !== 11) {
        return one;
    } else if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 10 || lastTwoDigits >= 20)) {
        return two;
    } else {
        return five;
    }
}

export const CommentItem = ({ created, likes, text, authorData, parent }: CommentItemComponentProps ) => {
    
    const { likedPosts = 0, setLikedPosts = () => {} } = useContext(CommentsListContext) || {};
    
    const [isLiked, setIsLiked] = useState<boolean>(false);

    const commentLikes = !isLiked ? likes : likes + 1;
    const formattedDate = useMemo(() => reformatDateString(created), [created]);

    const onLikeClick = () => {
        if(!isLiked) {
            setLikedPosts(likedPosts + 1);
            setIsLiked(true);
        } else {
            setLikedPosts(likedPosts - 1);
            setIsLiked(false);
        }
    }

    const { name, avatar } = authorData || { avatar: "", name: "Джедай" };
   
    return (
        <div className={`${styles.wrapper} ${parent ? styles.nested : " "}`} >

            <div className={styles.avatar}>
                { authorData && (
                    <Avatar 
                        src={avatar}
                        alt={name}
                        loading="lazy"
                    />
                )}
            </div>

            <div className={styles.content}>
                <div className={styles.header}>
                    <div className={styles.userInfo}>
                        <p className={styles.title}>{name}</p>
                        <p className={styles.subtitle}>{formattedDate}</p>
                    </div>

                    <div className={styles.likes}>
                        <LikeCounter 
                            count={commentLikes}
                            status={!isLiked ? "default" : "liked"}
                            toggleLike={onLikeClick}
                        />
                    </div>
                </div>

                <div className={styles.comment}>
                    <p className={styles.text}>
                        {text}
                    </p>
                </div>
            </div>

        </div>
    )
}