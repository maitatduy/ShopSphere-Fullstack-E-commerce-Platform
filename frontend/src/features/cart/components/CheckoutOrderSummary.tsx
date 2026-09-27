import { useCartStore } from "../store/cartStore";
import { SummaryRow } from "./SummaryRow";

export function CheckoutOrderSummary() {
    const { items, subtotal: getSubtotal } = useCartStore();
    const subtotal = getSubtotal();
    const shipping = subtotal > 300 ? 0 : 24;
    const total = subtotal + shipping;

    return (
        <aside
            data-checkout-animate
            className="rounded-4xl border border-[#ebebeb] bg-white p-6 shadow-[0_16px_40px_rgba(23,23,23,0.03)]"
        >
            <h2 className="text-xl font-medium text-[#171717]">Đơn hàng</h2>

            <div className="mt-6 space-y-4">
                {items.map((item) => (
                    <SummaryRow
                        key={item.id}
                        label={item.quantity > 1 ? `${item.name} x${item.quantity}` : item.name}
                        value={`$${(item.price * item.quantity).toFixed(2)}`}
                    />
                ))}
            </div>

            <div className="mt-6 space-y-3 border-t border-[#ebebeb] pt-5 text-sm text-[#4d4d4d]">
                <SummaryRow label="Tạm tính" value={`$${subtotal.toFixed(2)}`} />
                <SummaryRow
                    label="Vận chuyển"
                    value={shipping === 0 ? "Miễn phí" : `$${shipping.toFixed(2)}`}
                />
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[#ebebeb] pt-5">
                <span className="text-lg font-medium text-[#171717]">Tổng cộng</span>
                <span className="text-2xl font-semibold tracking-tighter text-[#171717]">
                    ${total.toFixed(2)}
                </span>
            </div>

            <button
                type="button"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#171717] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#2b2b2b]"
            >
                Xác nhận đơn hàng
            </button>
        </aside>
    );
}
