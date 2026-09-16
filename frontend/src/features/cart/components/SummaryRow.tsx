type SummaryRowProps = {
    label: string;
    value: string;
};

export function SummaryRow({ label, value }: SummaryRowProps) {
    return (
        <div className="flex items-center justify-between gap-3 text-sm">
            <span className="text-[#4d4d4d]">{label}</span>
            <span className="font-medium text-[#171717]">{value}</span>
        </div>
    );
}
