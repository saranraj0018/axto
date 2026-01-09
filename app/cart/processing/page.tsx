"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CommonBanners from "@/components/others/CommonBanners";

const ProcessingPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get("order_id");

    const [status, setStatus] = useState<"PENDING" | "PAID" | "FAILED">("PENDING");

    useEffect(() => {
        if (!orderId) {
            // No order_id, redirect to failure
            router.replace("/failure/payment/page");
            return;
        }

        const interval = setInterval(async () => {
            try {
                const token = localStorage.getItem("auth_token");

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/user/order-status?order_id=${orderId}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await res.json();

                if (data.status === "PAID") {
                    clearInterval(interval);
                    router.replace("/cart/success");
                } else if (data.status === "FAILED") {
                    clearInterval(interval);
                    router.replace("/cart/failure");
                }

            } catch (err) {
                console.error("Error checking order status", err);
            }
        }, 3000);


        return () => clearInterval(interval);
    }, [orderId, router]);

    return (
        <div>
            <CommonBanners />
            <section className="my-10 axto-container">
                <div className="mx-auto md:w-1/2 shadow-lg p-5 rounded-3xl space-y-3 text-center">
                    <img src="/img/success.jpg" alt="Processing" className="w-1/6 mx-auto" />
                    <h2 className="text-3xl font-bold text-center text-primary">
                        We are processing your payment
                    </h2>
                    <p className="text-gray-500">
                        Please wait while we confirm your order.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default ProcessingPage;
