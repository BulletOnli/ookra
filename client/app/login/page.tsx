"use client";
import { Button, Divider, FormControl, HStack, Input } from "@chakra-ui/react";
import Link from "next/link";

const LoginPage = () => {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <nav className="absolute top-0 w-full flex justify-center p-4 bg-white shadow-custom">
                <div className="w-[60%] flex items-center justify-between">
                    <Link href="/">
                        <h1 className="text-2xl font-bold tracking-wider">
                            Ookra
                        </h1>
                    </Link>
                    <Link href="#" className="text-sm text-red-500">
                        Need help?
                    </Link>
                </div>
            </nav>

            <div className="w-[60rem] h-[30rem] flex bg-white rounded-xl shadow-custom">
                <div className="w-[50%] h-full bg-gray-400">d</div>
                <div className="w-[50%] h-full flex flex-col items-center justify-center p-4">
                    <p className="text-2xl font-semibold mb-6">Login</p>
                    <FormControl as="form">
                        <HStack mb={4}>
                            <Input type="text" placeholder="First Name" />
                            <Input type="text" placeholder="Last Name" />
                        </HStack>
                        <Input type="text" placeholder="Username" mb={4} />
                        <Input type="password" placeholder="Password" />
                        <Button w="full" mt={4} colorScheme="blue">
                            Login
                        </Button>
                    </FormControl>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
