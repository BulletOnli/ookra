"use client";
import { ChakraProvider } from "@chakra-ui/react";

const App = ({ children }: { children: React.ReactNode }) => {
    return (
        <ChakraProvider>
            <main className="w-full min-h-screen">{children}</main>
        </ChakraProvider>
    );
};

export default App;
