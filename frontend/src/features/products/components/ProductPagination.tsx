export type ProductPaginationProps = {
    currentPage: number;
    totalPages: number;
    filteredCount: number;
    pageSize: number;
    onPageChange: (page: number) => void;
};

export function ProductPagination({
    currentPage,
    totalPages,
    filteredCount,
    pageSize,
    onPageChange,
}: ProductPaginationProps) {
    const start = Math.min((currentPage - 1) * pageSize + 1, filteredCount);
    const end = Math.min(currentPage * pageSize, filteredCount);

    return (
        <nav className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-[#ebebeb] bg-white p-4 sm:flex-row sm:p-5">
            <p className="text-sm text-[#4d4d4d]">
                Showing {start}-{end} of {filteredCount}
            </p>
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="rounded-full border border-[#ebebeb] bg-white px-3 py-2 text-sm font-medium text-[#171717] transition hover:border-[#171717] disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Prev
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <button
                        key={page}
                        type="button"
                        onClick={() => onPageChange(page)}
                        className={[
                            "h-10 w-10 rounded-full border text-sm font-medium transition",
                            currentPage === page
                                ? "border-[#171717] bg-[#171717] text-white"
                                : "border-[#ebebeb] bg-white text-[#171717] hover:border-[#171717]",
                        ].join(" ")}
                    >
                        {page}
                    </button>
                ))}
                <button
                    type="button"
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="rounded-full border border-[#ebebeb] bg-white px-3 py-2 text-sm font-medium text-[#171717] transition hover:border-[#171717] disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Next
                </button>
            </div>
        </nav>
    );
}
