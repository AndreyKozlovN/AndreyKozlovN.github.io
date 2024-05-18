import { DetailedHTMLProps, HTMLAttributes } from "react";

import { AuthorDataProps } from "src/modules/CommentsList/CommentsList.props";

export interface CommentItemProps extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'id'> {
    author: number;
    created: string;
    id: number;
    likes: number;
    parent: number;
    text: string;
}

export interface CommentItemComponentProps extends CommentItemProps {
    authorData?: AuthorDataProps;
}