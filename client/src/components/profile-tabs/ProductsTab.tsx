import {
    useParams,
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";
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

import useUserStore from "@/src/stores/userStore";
import RemoveProductAlert from "../alerts/RemoveProductAlert";

type ProductTabsProps = {
    productsData: ProductType[];
};

const ProductsTab = ({ productsData }: ProductTabsProps) => {
    const router = useRouter();
    const params = useParams();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const RemoveProductAlertDisclosure = useDisclosure();
    const accountDetails = useUserStore((state) => state.accountDetails);

    const productId = searchParams.get("productId");

    return (
        <>
            <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 justify-items-center gap-2 lg:gap-6">
                {productsData?.map((product: ProductType) => (
                    <div className="relative" key={product._id}>
                        {params.userId === accountDetails?._id &&
                        accountDetails?.role === "Seller" ? (
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
                                        router.push(
                                            `${pathname}?productId=${product._id}`
                                        );
                                        RemoveProductAlertDisclosure.onOpen();
                                    }}
                                />
                            </div>
                        ) : (
                            ""
                        )}
                        <ProductCard productData={product} />
                    </div>
                ))}
            </div>

            {productId && (
                <RemoveProductAlert
                    warningDisclosure={RemoveProductAlertDisclosure}
                    productId={productId}
                />
            )}
        </>
    );
};

export default ProductsTab;
