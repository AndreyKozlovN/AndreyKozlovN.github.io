import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface AvatarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    src: string;
    alt: string;
    loading?: "eager" | "lazy";
}