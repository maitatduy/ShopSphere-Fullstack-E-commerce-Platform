import { CheckoutField } from "./CheckoutField";

export function CheckoutDeliveryForm() {
    return (
        <section
            data-checkout-animate
            className="rounded-4xl border border-[#ebebeb] bg-white p-6 shadow-[0_16px_40px_rgba(23,23,23,0.03)] sm:p-8"
        >
            <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#8f8f8f]">
                    Giao hàng
                </p>
                <h1 className="mt-2 text-3xl font-medium tracking-[-0.06em] text-[#171717]">
                    Thông tin đặt hàng
                </h1>
            </div>

            <div className="mt-8 space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                    <CheckoutField label="Họ" value="Nguyễn" />
                    <CheckoutField label="Tên" value="Olivia" />
                </div>
                <CheckoutField label="Email" value="olivia@email.com" />
                <CheckoutField label="Địa chỉ" value="17 Lê Thị Riêng, Quận 1" />
                <div className="grid gap-4 sm:grid-cols-2">
                    <CheckoutField label="Thành phố" value="TP. Hồ Chí Minh" />
                    <CheckoutField label="Mã bưu chính" value="70000" />
                </div>
                <CheckoutField label="Quốc gia" value="Việt Nam" />
            </div>
        </section>
    );
}
