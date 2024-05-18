import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface LikeCounterProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    count: number;
    status: "disabled" | "liked" | "default";
    toggleLike?: () => void;
}