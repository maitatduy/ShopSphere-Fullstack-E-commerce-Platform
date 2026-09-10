import { FiHeart, FiSearch, FiShoppingBag, FiUser } from "react-icons/fi";

const navItems = ["Shop", "Men", "Women", "Kids"];

export function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-[#ebebeb] bg-[#fafafa]/90 backdrop-blur-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
                <div className="flex items-center gap-8">
                    <a href="/" className="text-[1.7rem] font-semibold tracking-[-0.08em] text-[#171717]">
                        ShopSphere
                    </a>

                    <nav className="hidden items-center gap-1 md:flex">
                        {navItems.map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="rounded-full px-3 py-2 text-[0.95rem] font-medium text-[#4d4d4d] transition hover:bg-[#f2f2f2] hover:text-[#171717]"
                            >
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>

                <div className="flex flex-1 items-center justify-end gap-3">
                    <label className="hidden w-full max-w-[18rem] items-center gap-2 rounded-full border border-[#ebebeb] bg-white px-4 py-2 text-sm text-[#8f8f8f] shadow-[0_1px_1px_rgba(23,23,23,0.02)] sm:flex">
                        <FiSearch className="text-base" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full border-none bg-transparent text-[#171717] placeholder:text-[#8f8f8f] focus:outline-none"
                        />
                    </label>

                    <div className="flex items-center gap-2">
                        <ActionButton label="Wishlist" icon={<FiHeart />} />
                        <ActionButton label="Account" icon={<FiUser />} />
                        <ActionButton label="Cart" icon={<FiShoppingBag />} compact />
                    </div>
                </div>
            </div>
        </header>
    );
}

type ActionButtonProps = {
    label: string;
    icon: React.ReactNode;
    compact?: boolean;
};

function ActionButton({ label, icon, compact = false }: ActionButtonProps) {
    return (
        <button
            type="button"
            className={[
                "inline-flex items-center justify-center gap-2 rounded-full border border-[#ebebeb] bg-white text-[#171717] transition hover:border-[#171717]",
                compact ? "h-11 w-11 p-0" : "px-3 py-2 text-sm font-medium",
            ].join(" ")}
            aria-label={label}
        >
            <span className="text-base">{icon}</span>
            {!compact && <span>{label}</span>}
        </button>
    );
}
