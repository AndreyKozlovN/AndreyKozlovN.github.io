import styles from "./index.module.css";

export const CommentsList = () => {
    return (
        <section className={styles.wrapper}>

            <div className={styles.header}>
                <p className={styles.text}>267 комментариев</p>

                <div>
                    <p className={styles.text}>
                        {`<3 8 632`}
                    </p>
                </div>
            </div>
            
            <div className={styles.commentsList}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique dolorem cumque repudiandae, iure doloremque architecto ipsum labore adipisci id quam fuga distinctio vitae illum nihil facilis temporibus magnam ducimus vero!
            </div>

            <div className={styles.buttonWrapper}>
                
                <button>Загрузить еще</button>
            </div>

        </section>
    )
}