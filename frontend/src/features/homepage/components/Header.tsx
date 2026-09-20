import { useState } from "react";
import { FiHeart, FiMenu, FiSearch, FiShoppingBag, FiUser, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const navItems = [
    { label: "Shop", href: "/products" },
    { label: "Men", href: "/products" },
    { label: "Women", href: "/products" },
    { label: "Kids", href: "/products" },
];

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header data-homepage-animate className="sticky top-0 z-50 border-b border-[#ebebeb] bg-[#fafafa]/90 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3 md:gap-8">
                        <a href="/" className="text-[1.4rem] font-semibold tracking-[-0.08em] text-[#171717] sm:text-[1.7rem]">
                            ShopSphere
                        </a>

                        <nav className="hidden items-center gap-1 md:flex">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="rounded-full px-3 py-2 text-[0.95rem] font-medium text-[#4d4d4d] transition hover:bg-[#f2f2f2] hover:text-[#171717]"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div className="flex items-center justify-end gap-2 sm:gap-3">
                        <label className="hidden max-w-[18rem] flex-1 items-center gap-2 rounded-full border border-[#ebebeb] bg-white px-4 py-2 text-sm text-[#8f8f8f] shadow-[0_1px_1px_rgba(23,23,23,0.02)] md:flex">
                            <FiSearch className="text-base" />
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full border-none bg-transparent text-[#171717] placeholder:text-[#8f8f8f] focus:outline-none"
                            />
                        </label>

                        <div className="hidden items-center gap-2 md:flex">
                            <ActionButton label="Wishlist" icon={<FiHeart />} className="hidden lg:inline-flex" />
                            <ActionButton label="Account" icon={<FiUser />} className="hidden lg:inline-flex" />
                            <Link to="/cart" aria-label="Cart">
                                <ActionButton label="Cart" icon={<FiShoppingBag />} compact />
                            </Link>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ebebeb] bg-white text-[#171717] md:hidden"
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {isMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
                        </button>
                    </div>
                </div>

                {isMenuOpen ? (
                    <div className="mt-3 border-t border-[#ebebeb] pt-3 md:hidden">
                        <nav className="flex flex-col gap-1">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="rounded-2xl px-3 py-3 text-base font-medium text-[#171717] transition hover:bg-[#f2f2f2]"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>

                        <div className="mt-4 grid grid-cols-3 gap-2">
                            <ActionButton label="Wishlist" icon={<FiHeart />} fullWidth />
                            <ActionButton label="Account" icon={<FiUser />} fullWidth />
                            <Link to="/cart" className="w-full" aria-label="Cart">
                                <ActionButton label="Cart" icon={<FiShoppingBag />} compact fullWidth />
                            </Link>
                        </div>
                    </div>
                ) : null}
            </div>
        </header>
    );
}

type ActionButtonProps = {
    label: string;
    icon: React.ReactNode;
    compact?: boolean;
    className?: string;
    fullWidth?: boolean;
};

function ActionButton({
    label,
    icon,
    compact = false,
    className = "",
    fullWidth = false,
}: ActionButtonProps) {
    return (
        <button
            type="button"
            className={[
                "inline-flex items-center justify-center gap-2 rounded-full border border-[#ebebeb] bg-white text-[#171717] transition hover:border-[#171717]",
                compact ? "h-11 w-11 p-0" : "px-3 py-2 text-sm font-medium",
                fullWidth ? "w-full" : "",
                className,
            ].join(" ")}
            aria-label={label}
        >
            <span className="text-base">{icon}</span>
            {!compact && <span>{label}</span>}
        </button>
    );
}
