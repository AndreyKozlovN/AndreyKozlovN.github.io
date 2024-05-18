import React from "react";

import { CommentsPage } from "./pages";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import "./styles/normalize.css";
import "./styles/vars.css";

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <CommentsPage />
        </QueryClientProvider>
    );
}

export default App;
