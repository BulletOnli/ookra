import {
    IconButton,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useDisclosure,
} from "@chakra-ui/react";
import ProductCard, { ProductType } from "../product/ProductCard";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useParams } from "next/navigation";
import useUserStore from "@/src/utils/stores/userStore";

type ProfileTabsProps = {
    productsData: ProductType[];
};

const ProfileTabs = ({ productsData }: ProfileTabsProps) => {
    const params = useParams();
    const RemoveProductAlertDisclosure = useDisclosure();
    const accountDetails = useUserStore((state) => state.accountDetails);

    return (
        <Tabs isFitted variant="line" w="full">
            <TabList mb={6}>
                <Tab fontWeight="medium">Products</Tab>
                <Tab fontWeight="medium">Others</Tab>
                <Tab fontWeight="medium">Others</Tab>
            </TabList>
            <TabPanels>
                <TabPanel p={0}>
                    <>
                        <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  justify-items-center gap-2 lg:gap-6">
                            {productsData
                                ?.slice(0, 10)
                                .map((product: ProductType) => (
                                    <div className="relative" key={product._id}>
                                        {params.userId ===
                                        accountDetails?._id ? (
                                            <div className=" absolute z-30 -top-2 -left-2 flex items-center gap-2">
                                                <IconButton
                                                    colorScheme="blue"
                                                    aria-label="Search database"
                                                    icon={<BsPencil />}
                                                    size="xs"
                                                    rounded="full"
                                                />
                                                <IconButton
                                                    colorScheme="red"
                                                    aria-label="Search database"
                                                    icon={<BsTrash />}
                                                    size="xs"
                                                    rounded="full"
                                                    onClick={() => {
                                                        RemoveProductAlertDisclosure.onOpen();
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        <ProductCard
                                            productData={product}
                                            RemoveProductAlertDisclosure={
                                                RemoveProductAlertDisclosure
                                            }
                                        />
                                    </div>
                                ))}
                        </div>
                    </>
                </TabPanel>
                <TabPanel>
                    <p>two!</p>
                </TabPanel>
                <TabPanel>
                    <p>three!</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default ProfileTabs;
