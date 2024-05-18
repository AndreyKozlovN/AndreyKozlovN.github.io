import { useContext, useEffect, useMemo, useState } from "react";

import { CommentItem, ErrorComponent, LikeCounter } from "src/components";
import { Button, Spinner } from "src/UI";

import getCommentsRequest from "src/api/comments/getCommentsRequest";
import getAuthorsRequest from "src/api/authors/getAuthorsRequest";

import { CommentItemComponentProps, CommentItemProps } from "src/components/CommentItem/CommentItem.props";
import { AuthorDataProps } from "./CommentsList.props";

import CommentsListContext from "src/contexts/CommentsListContext";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import styles from "./CommentsList.module.css";

function getCommentString(count: number): string {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;
  
    if (lastDigit === 1 && lastTwoDigits !== 11) {
        return `${count} комментарий`;
    } else if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 10 || lastTwoDigits >= 20)) {
        return `${count} комментария`;
    } else {
        return `${count} комментариев`;
    }
}

function sortedComments(comments: CommentItemProps[]) {
    const sortByDateComments = comments.sort((a, b) => {
        const dateA = new Date(a.created);
        const dateB = new Date(b.created);
        return dateB.getTime() - dateA.getTime();
    });

    const sortedByParentsCommentsArray = sortByDateComments.filter(item => !item.parent);
    const childrenArray: CommentItemProps[] = [];
    let parentIndex = 0;

    sortByDateComments.forEach((item) => {
        if(item.parent) {
            childrenArray.push(item);
            parentIndex = linearSearch(sortByDateComments, item, (item) => item.id);
        }
    })

    sortedByParentsCommentsArray.splice(parentIndex + 1, 0, ...childrenArray.reverse());
    return sortedByParentsCommentsArray;
}

function linearSearch<T>(arr: T[], findEl: T, idAccessor: (item: T) => string | number): number {
    for (let i = 0; i < arr.length; i++) {
        if (idAccessor(arr[i]) === idAccessor(findEl)) {
            return i;
        }
    }
    return -1;
}

export const CommentsList = () => {
    const { likedPosts = 0} = useContext(CommentsListContext) || {};

    const [totalComments, setTotalComments] = useState<number>(0);
    const [totalLikes, setTotalLikes] = useState<number>(0);

    const {
        data: commentsData,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["comments"],
        queryFn: ({ pageParam }) => getCommentsRequest(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPage.data.length === 0) {
              return undefined;
            }
            return lastPageParam + 1;
        },
        refetchOnWindowFocus: false,
        retry: 1
    })

    const {
        data: authorsData
    } = useQuery<AuthorDataProps[]>({
        queryKey: ["authors"],
        queryFn: () => getAuthorsRequest(),
        refetchOnWindowFocus: false,
        retry: 1
    });

    const calculateTotalLikes = useMemo(() => {
        if (!commentsData) return 0;
        return commentsData.pages.reduce((total, page) => {
            return total + page.data.reduce((likes: number, comment: CommentItemProps) => likes + comment.likes, 0);
        }, 0);
    }, [commentsData]);
    
    useEffect(() => {
        if(!calculateTotalLikes) return;
        setTotalLikes(calculateTotalLikes);
    }, [calculateTotalLikes]);

    useEffect(() => {
        if(!commentsData) return;
        const calculateTotalComments = () => {
            return commentsData.pages.reduce((total, page) => total + page.data.length, 0);
        };

        const total = calculateTotalComments();
        setTotalComments(total);
    }, [commentsData]);

    if (isLoading || !commentsData) return <Spinner />;
    if (isError) return <ErrorComponent />;

    const pages = commentsData.pages;

    return (
        <section className={styles.wrapper}>
            {pages && (
                <>
                    <div className={styles.header}>
                        <p className={styles.text}>{getCommentString(totalComments)}</p>

                        <LikeCounter count={totalLikes + likedPosts} status="disabled" />
                    </div>

                    <div className={styles.commentsList}>
                        {pages.map((page) => (
                            sortedComments(page.data).map((item: CommentItemComponentProps) => {
                                const { id, author } = item;
                                return (
                                    <CommentItem 
                                        key={id}
                                        {...item}
                                        authorData={authorsData && authorsData.find((findedAuthor) => findedAuthor.id === author)}
                                    />
                                )
                            })
                        ))}
                    </div>
        
                    <div className={styles.buttonWrapper}>
                        <Button
                            disable={isFetchingNextPage}
                            text={isFetchingNextPage ? "Загрузка..." : "Загрузить ещё" }
                            onClick={() => hasNextPage && !isFetchingNextPage ? fetchNextPage() : undefined} 
                        />
                    </div>

                </>
            )}
        </section>
    )
}