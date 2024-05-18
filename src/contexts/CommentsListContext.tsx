import { createContext } from 'react';

interface CommentsListContextValue {
  likedPosts: number;
  setLikedPosts: React.Dispatch<React.SetStateAction<number>>;
}

const CommentsListContext = createContext<CommentsListContextValue | null>(null);

export default CommentsListContext;