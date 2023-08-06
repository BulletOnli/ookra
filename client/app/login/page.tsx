"use client";
import {
    Button,
    Divider,
    FormControl,
    HStack,
    Image,
    Input,
} from "@chakra-ui/react";
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

            <div className="w-[60rem] h-[30rem] flex justify-center rounded-xl bg-white shadow-custom p-6">
                <div className="w-[50%] h-full flex justify-center items-center">
                    <Image src="/illu.svg" w="25rem" />
                </div>

                <div className="w-[50%] h-full flex flex-col items-center justify-center p-6">
                    <p className="text-2xl font-semibold mb-6">
                        Login to your account
                    </p>
                    <FormControl as="form">
                        <Input type="text" placeholder="Username" mb={4} />
                        <Input type="password" placeholder="Password" />
                        <Button w="full" mt={4} colorScheme="blue">
                            Log in
                        </Button>
                    </FormControl>
                    <small className="w-full text-center mt-2">
                        Dont have an account?{" "}
                        <Link
                            href="/register"
                            className="font-semibold text-blue-600 hover:underline"
                        >
                            Register
                        </Link>
                    </small>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
