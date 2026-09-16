import { CheckoutField } from "./CheckoutField";

export function CheckoutDeliveryForm() {
    return (
        <section
            data-checkout-animate
            className="rounded-4xl border border-[#ebebeb] bg-white p-6 shadow-[0_16px_40px_rgba(23,23,23,0.03)] sm:p-8"
        >
            <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#8f8f8f]">
                    Delivery
                </p>
                <h1 className="mt-2 text-3xl font-medium tracking-[-0.06em] text-[#171717]">
                    Checkout details
                </h1>
            </div>

            <div className="mt-8 space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                    <CheckoutField label="First name" value="Olivia" />
                    <CheckoutField label="Last name" value="Nguyen" />
                </div>
                <CheckoutField label="Email" value="olivia@email.com" />
                <CheckoutField label="Address" value="17 Le Thi Rieng, District 1" />
                <div className="grid gap-4 sm:grid-cols-2">
                    <CheckoutField label="City" value="Ho Chi Minh City" />
                    <CheckoutField label="Postal code" value="70000" />
                </div>
                <CheckoutField label="Country" value="Vietnam" />
            </div>
        </section>
    );
}
