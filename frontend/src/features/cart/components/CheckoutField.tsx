type CheckoutFieldProps = {
    label: string;
    value: string;
};

export function CheckoutField({ label, value }: CheckoutFieldProps) {
    return (
        <label className="block text-sm text-[#4d4d4d]">
            <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.18em] text-[#8f8f8f]">
                {label}
            </span>
            <input
                type="text"
                defaultValue={value}
                className="w-full rounded-2xl border border-[#ebebeb] bg-[#fafafa] px-4 py-3 text-[#171717] focus:border-[#171717] focus:outline-none"
            />
        </label>
    );
}
