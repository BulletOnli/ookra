"use client";
import { registerUser } from "@/api/userApi";
import { Button, HStack, Image, Input, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";

const Registerpage = () => {
    const router = useRouter();
    const toast = useToast();
    const [registerDetails, setRegisterDetails] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        location: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setRegisterDetails((state) => ({
            ...state,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await registerUser(registerDetails);
            setRegisterDetails({
                firstName: "",
                lastName: "",
                username: "",
                password: "",
                location: "",
            });
            toast({
                title: "Registration Complete",
                status: "success",
                isClosable: true,
                duration: 3000,
                position: "top",
                variant: "top-accent",
            });
            router.push("/");
        } catch (error: any) {
            console.log(error);
            const err =
                error.response.data.error.message || "An error occurred";
            toast({
                title: err,
                status: "error",
                isClosable: true,
                duration: 3000,
                position: "top",
                variant: "top-accent",
            });
        } finally {
            setIsLoading(false);
        }
    };

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
                        Create your account
                    </p>
                    <form onSubmit={handleSubmit}>
                        <HStack mb={4}>
                            <Input
                                type="text"
                                placeholder="First Name"
                                name="firstName"
                                onChange={handleInputChange}
                                required
                            />
                            <Input
                                type="text"
                                placeholder="Last Name"
                                name="lastName"
                                onChange={handleInputChange}
                                required
                            />
                        </HStack>
                        <Input
                            type="text"
                            placeholder="Username"
                            mb={4}
                            name="username"
                            onChange={handleInputChange}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleInputChange}
                            required
                        />
                        <Button
                            w="full"
                            mt={4}
                            colorScheme="blue"
                            type="submit"
                            isLoading={isLoading}
                            spinnerPlacement="start"
                        >
                            Create account
                        </Button>
                    </form>
                    <small className="w-full text-center mt-2">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-blue-600 hover:underline"
                        >
                            Login
                        </Link>
                    </small>
                </div>
            </div>
        </div>
    );
};

export default Registerpage;
