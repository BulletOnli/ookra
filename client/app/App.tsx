"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";

const App = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient();
    const pathname = usePathname();
    const hideComponents = pathname === "/login" || pathname === "/register";

    return (
        <QueryClientProvider client={queryClient}>
            <NextTopLoader />
            <ChakraProvider>
                <div className="w-full min-h-screen flex flex-col bg-[#F0F2F5] items-center ">
                    {!hideComponents && <Navbar />}
                    {children}
                    {!hideComponents && <Footer />}
                </div>
            </ChakraProvider>
        </QueryClientProvider>
    );
};

export default App;
