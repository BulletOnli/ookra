import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import ProductCard, { ProductType } from "../product/ProductCard";

type ProfileTabsProps = {
    productsData: ProductType[];
};

const ProfileTabs = ({ productsData }: ProfileTabsProps) => {
    return (
        <Tabs isFitted variant="line" w="full">
            <TabList mb={6}>
                <Tab fontWeight="medium">Products</Tab>
                <Tab fontWeight="medium">Others</Tab>
            </TabList>
            <TabPanels>
                <TabPanel p={0}>
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-2 lg:gap-8">
                        {productsData
                            ?.slice(0, 10)
                            .map((product: ProductType) => (
                                <ProductCard
                                    productData={product}
                                    key={product._id}
                                />
                            ))}
                    </div>
                </TabPanel>
                <TabPanel>
                    <p>two!</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default ProfileTabs;
