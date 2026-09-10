export function Footer() {
    return (
        <footer className="border-t border-[#ebebeb] bg-[#fafafa]">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] lg:px-8">
                <div>
                    <div className="text-2xl font-semibold tracking-[-0.08em] text-[#171717]">
                        ShopSphere
                    </div>
                    <p className="mt-4 max-w-xs text-sm leading-6 text-[#4d4d4d]">
                        Premium essentials for a sharper everyday wardrobe, built to move with you.
                    </p>
                </div>

                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#171717]">
                        Shop
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm text-[#4d4d4d]">
                        <li>New arrivals</li>
                        <li>Men</li>
                        <li>Women</li>
                        <li>Kids</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#171717]">
                        Company
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm text-[#4d4d4d]">
                        <li>About</li>
                        <li>Journal</li>
                        <li>Careers</li>
                        <li>Support</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#171717]">
                        Follow
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm text-[#4d4d4d]">
                        <li>Instagram</li>
                        <li>Pinterest</li>
                        <li>Facebook</li>
                        <li>Newsletter</li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-[#ebebeb]">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-[#8f8f8f] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                    <span>© 2026 ShopSphere</span>
                    <div className="flex items-center gap-5">
                        <span>Privacy</span>
                        <span>Terms</span>
                        <span>Shipping</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
