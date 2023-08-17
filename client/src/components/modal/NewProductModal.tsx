"use client";
import { NewProductType, addNewProduct } from "@/src/api/productsApi";
import useUserStore from "@/src/utils/stores/userStore";
import {
    Avatar,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useToast,
    Flex,
    FormControl,
    Image,
    HStack,
    VStack,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Spacer,
    Textarea,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    FormLabel,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useState } from "react";
import { useForm } from "react-hook-form";

type NewProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const NewProductModal = ({ isOpen, onClose }: NewProductModalProps) => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const [previewImage, setPreviewImage] = useState("");
    const { register, handleSubmit, setValue } = useForm<NewProductType>();

    const accountDetails = useUserStore((state) => state.accountDetails);

    // upload img and display in the ui
    const handleImgUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.[0];
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewImage(reader.result as string);
        };

        if (file) {
            reader.readAsDataURL(file);
            setValue("productImg", file);
        }
    };

    const newProductMutation = useMutation({
        mutationFn: addNewProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products", accountDetails?._id],
            });

            toast({
                title: "New product uploaded!",
                status: "success",
                isClosable: true,
                position: "bottom-left",
                duration: 3000,
            });
            onClose();
            setPreviewImage("");
        },
        onError: (error) => {
            console.log(error);
            toast({
                title: "Oops! Something went wrong.",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 2000,
            });
        },
    });

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                onClose();
                setPreviewImage("");
            }}
            size="3xl"
        >
            <form
                onSubmit={handleSubmit((data) => {
                    const formData = new FormData();
                    formData.set("productName", data.productName);
                    formData.set("description", data.description);
                    formData.set("price", data.price);
                    formData.set("stocks", data.stocks);
                    formData.set("productImg", data.productImg);
                    formData.set("category", data.category);

                    newProductMutation.mutate(formData);
                })}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>New product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="w-full flex justify-center items-center gap-10">
                            <VStack w="45%">
                                <Image
                                    w="full"
                                    h="20rem"
                                    objectFit="cover"
                                    rounded="lg"
                                    src={previewImage}
                                    fallbackSrc="https://via.placeholder.com/400"
                                    alt="Product preview"
                                />
                                <Button size="sm" w="full" colorScheme="blue">
                                    <label
                                        htmlFor="productImg-upload"
                                        className="w-full"
                                    >
                                        Upload Product
                                    </label>
                                    <input
                                        onChange={handleImgUpload}
                                        type="file"
                                        accept="image/*"
                                        id="productImg-upload"
                                        className="hidden"
                                        // required
                                    />
                                </Button>
                            </VStack>

                            <VStack w="55%" spacing={0}>
                                <FormLabel w="full">Product name:</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="Product name"
                                    autoComplete="off"
                                    required
                                    mb={2}
                                    {...register("productName", {
                                        required: true,
                                    })}
                                />
                                <FormLabel w="full">Description:</FormLabel>
                                <Textarea
                                    placeholder="Description"
                                    {...register("description", {
                                        required: true,
                                    })}
                                    required
                                    mb={2}
                                />
                                <HStack w="full" mb={2}>
                                    <VStack spacing={0}>
                                        <FormLabel w="full">Stocks:</FormLabel>
                                        <NumberInput
                                            size="md"
                                            defaultValue={1}
                                            min={1}
                                        >
                                            <NumberInputField
                                                placeholder="Stocks"
                                                {...register("stocks", {
                                                    required: true,
                                                    min: 1,
                                                })}
                                            />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </VStack>

                                    <VStack spacing={0}>
                                        <FormLabel w="full">Price:</FormLabel>
                                        <NumberInput
                                            size="md"
                                            defaultValue={1}
                                            min={1}
                                        >
                                            <NumberInputField
                                                placeholder="Price"
                                                {...register("price", {
                                                    required: true,
                                                    min: 1,
                                                })}
                                            />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </VStack>
                                </HStack>

                                <FormLabel w="full">Product name:</FormLabel>
                                <Select
                                    placeholder="Category"
                                    required
                                    mb={2}
                                    {...register("category", {
                                        required: true,
                                    })}
                                >
                                    <option value="option1">option 1</option>
                                </Select>
                            </VStack>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            // isDisabled={!previewImage}
                            type="submit"
                            colorScheme="blue"
                            isLoading={false}
                            spinnerPlacement="start"
                        >
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    );
};

export default NewProductModal;
