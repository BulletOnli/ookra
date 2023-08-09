"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Footer from "../components/Footer";
import { usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import Navbar from "@/components/Navbar";

const App = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient();
    const pathname = usePathname();
    const hideComponents = pathname === "/login" || pathname === "/register";

    return (
        <QueryClientProvider client={queryClient}>
            <NextTopLoader />
            <ChakraProvider>
                <div className="w-full min-h-screen flex flex-col items-center bg-[#EBEAF3]">
                    {!hideComponents && <Navbar />}
                    {children}
                    <Footer />
                </div>
            </ChakraProvider>
        </QueryClientProvider>
    );
};

export default App;
