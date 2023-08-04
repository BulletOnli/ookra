import { Divider } from "@chakra-ui/react";
import Link from "next/link";

const Footer = () => {
    return (
        <div className="w-full flex flex-col items-center p-6 bg-[#FBFBFB]">
            <div className="w-[70%] grid grid-cols-4 justify-items-center items-center mt-4">
                <div className="w-full flex flex-col items-center gap-2">
                    <p className="font-bold mb-2">CUSTOMER SERVICE</p>

                    <Link href="#" className="text-gray-700 text-sm">
                        Help Center
                    </Link>
                    <Link href="#" className="text-gray-700 text-sm">
                        Payment Methods
                    </Link>
                    <Link href="#" className="text-gray-700 text-sm">
                        Return & Refund
                    </Link>
                    <Link href="#" className="text-gray-700 text-sm">
                        Contact Us
                    </Link>
                </div>
                <div className="w-full flex flex-col items-center gap-2">
                    <p className="font-bold mb-2">FOLLOW US</p>

                    <Link href="#" className="text-gray-700 text-sm">
                        Help Center
                    </Link>
                    <Link href="#" className="text-gray-700 text-sm">
                        Payment Methods
                    </Link>
                    <Link href="#" className="text-gray-700 text-sm">
                        Return & Refund
                    </Link>
                    <Link href="#" className="text-gray-700 text-sm">
                        Contact Us
                    </Link>
                </div>
                <div className="w-full flex flex-col items-center gap-2">
                    <p className="font-bold mb-2">PAYMENT METHODS</p>

                    <Link href="#" className="text-gray-700 text-sm">
                        Gcash
                    </Link>
                    <Link href="#" className="text-gray-700 text-sm">
                        Maya
                    </Link>
                    <Link href="#" className="text-gray-700 text-sm">
                        Credit Card
                    </Link>
                    <Link href="#" className="text-gray-700 text-sm">
                        Debit Card
                    </Link>
                </div>
                <div className="w-full flex flex-col items-center gap-2">
                    <Link href="#" className="font-bold mb-2">
                        ABOUT OOKRA
                    </Link>

                    <Link href="#" className="text-gray-700 text-sm">
                        About Us
                    </Link>
                    <Link href="#" className="text-gray-700 text-sm">
                        Privacy Policy
                    </Link>
                    <Link href="#" className="text-gray-700 text-sm">
                        Media Contact
                    </Link>
                    <Link href="#" className="text-gray-700 text-sm">
                        Flash Deals
                    </Link>
                </div>
            </div>
            <Divider w="70%" my={6} />
            <div className="w-[70%] text-gray-600 flex justify-between">
                <p className="font-semibold text-sm">
                    © 2023 Ooka. All Rights Reserved.
                </p>
                <p className="text-sm">
                    Country & Region: Singapore | Indonesia | Taiwan | Thailand
                    | Malaysia | Vietnam | Philippines | Brazil | México |
                    Colombia | Chile
                </p>
            </div>
        </div>
    );
};

export default Footer;
