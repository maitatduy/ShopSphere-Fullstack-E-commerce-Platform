import { SummaryRow } from "./SummaryRow";

export function CheckoutOrderSummary() {
    return (
        <aside
            data-checkout-animate
            className="rounded-4xl border border-[#ebebeb] bg-white p-6 shadow-[0_16px_40px_rgba(23,23,23,0.03)]"
        >
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#8f8f8f]">
                Order summary
            </p>
            <div className="mt-6 space-y-4">
                <SummaryRow label="Aero Knit Jacket" value="$138.00" />
                <SummaryRow label="Lune Wool Coat x2" value="$392.00" />
                <SummaryRow label="Monarch Overshirt" value="$126.00" />
            </div>

            <div className="mt-6 space-y-3 border-t border-[#ebebeb] pt-5 text-sm text-[#4d4d4d]">
                <SummaryRow label="Subtotal" value="$656.00" />
                <SummaryRow label="Shipping" value="Free" />
                <SummaryRow label="Discount" value="-$65.60" />
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[#ebebeb] pt-5">
                <span className="text-lg font-medium text-[#171717]">Total</span>
                <span className="text-2xl font-semibold tracking-tighter text-[#171717]">
                    $590.40
                </span>
            </div>

            <button
                type="button"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#171717] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#2b2b2b]"
            >
                Confirm order
            </button>
        </aside>
    );
}
