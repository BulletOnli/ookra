import dynamic from "next/dynamic";
import "./globals.css";
import type { Metadata } from "next";
import App from "./App";

export const metadata: Metadata = {
    title: "Ookra | Online Shopping",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <App>{children}</App>
            </body>
        </html>
    );
}
