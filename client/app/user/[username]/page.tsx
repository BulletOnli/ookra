"use client";
import {
    Avatar,
    Button,
    Divider,
    FormControl,
    FormLabel,
    HStack,
    Input,
    VStack,
} from "@chakra-ui/react";
import { BsCamera } from "react-icons/bs";

const UserPage = () => {
    return (
        <div className="w-full h-[70vh] flex items-center justify-center p-4">
            <div className="w-[40rem] flex flex-col items-center p-4 bg-white rounded-lg">
                <p className="w-full text-lg font-medium">My Profile</p>
                <p className="w-full text-sm text-gray-700 mb-4">
                    Manage and protect your account
                </p>
                <Divider />
                <div className="w-[80%] flex flex-col items-center p-4">
                    <FormControl as="form">
                        <VStack mb={8}>
                            <Avatar name="Bullet" size="xl" position="relative">
                                <BsCamera className="absolute -bottom-2 right-1 text-[2rem] p-2 bg-white shadow-custom rounded-full text-black" />
                            </Avatar>
                        </VStack>

                        <HStack mb={4}>
                            <Input type="text" placeholder="First Name" />
                            <Input type="text" placeholder="Last Name" />
                        </HStack>
                        <Input type="text" placeholder="Username" mb={4} />
                        <Input type="password" placeholder="Password" />
                        <Button w="full" mt={4} colorScheme="blue">
                            Save Changes
                        </Button>
                    </FormControl>
                </div>
            </div>
        </div>
    );
};

export default UserPage;
