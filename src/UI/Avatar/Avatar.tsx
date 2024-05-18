import { AvatarProps } from "./AvatarProps.props";

import styles from "./Avatar.module.css";

export const Avatar = ({ src, alt, loading = "eager" } : AvatarProps) => (
    <div className={styles.wrapper}>
        <img 
            src={src} 
            alt={alt} 
            className={styles.img} 
            loading={loading}
        />
    </div>
)