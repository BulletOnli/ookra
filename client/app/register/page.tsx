"use client";
import Link from "next/link";

const RegisterPage = () => {
    return (
        <div className="w-full bg-red-200 flex flex-col items-center">
            <div className="w-full flex justify-center p-4 bg-white shadow-custom">
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
            </div>
        </div>
    );
};

export default RegisterPage;
