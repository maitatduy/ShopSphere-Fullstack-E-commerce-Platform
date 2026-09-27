import { CheckoutField } from "./CheckoutField";

export function CheckoutDeliveryForm() {
    return (
        <section
            data-checkout-animate
            className="rounded-4xl border border-[#ebebeb] bg-white p-6 shadow-[0_16px_40px_rgba(23,23,23,0.03)] sm:p-8"
        >
            <h1 className="text-3xl font-medium tracking-[-0.06em] text-[#171717]">
                Thông tin giao hàng
            </h1>

            <div className="mt-8 space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                    <CheckoutField label="Họ" placeholder="Nguyễn" />
                    <CheckoutField label="Tên" placeholder="Văn A" />
                </div>
                <CheckoutField label="Email" placeholder="email@example.com" />
                <CheckoutField label="Số điện thoại" placeholder="0912 345 678" />
                <CheckoutField label="Địa chỉ" placeholder="Số nhà, tên đường" />
                <div className="grid gap-4 sm:grid-cols-2">
                    <CheckoutField label="Thành phố" placeholder="TP. Hồ Chí Minh" />
                    <CheckoutField label="Mã bưu chính" placeholder="70000" />
                </div>
                <CheckoutField label="Quốc gia" placeholder="Việt Nam" />
            </div>
        </section>
    );
}
