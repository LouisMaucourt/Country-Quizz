import { createBrowserRouter } from "react-router-dom";
import App from '@/App'
import { Flags } from "@/pages/Flags";
import { Population } from "@/pages/Population";
import { MainLayout } from "@/components/layout/MainLayout";
import { QuizzLayout } from "@/components/layout/QuizzLayout";

export const router = createBrowserRouter([
    {
        element: <MainLayout />,  
        children: [
            { path: "/", element: <App /> },
        ],
    },
    {
        element: <QuizzLayout />,
        children: [
            { path: "/flags", element: <Flags /> },
            { path: "/population", element: <Population /> },
        ],
    },
]);
