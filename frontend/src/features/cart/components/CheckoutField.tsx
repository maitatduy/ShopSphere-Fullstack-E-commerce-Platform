type CheckoutFieldProps = {
    label: string;
    placeholder?: string;
};

export function CheckoutField({ label, placeholder }: CheckoutFieldProps) {
    return (
        <label className="block text-sm text-[#4d4d4d]">
            <span className="mb-2 block text-sm font-medium text-[#4d4d4d]">{label}</span>
            <input
                type="text"
                placeholder={placeholder}
                className="w-full rounded-2xl border border-[#ebebeb] bg-[#fafafa] px-4 py-3 text-[#171717] placeholder:text-[#b0b0b0] focus:border-[#171717] focus:outline-none"
            />
        </label>
    );
}
