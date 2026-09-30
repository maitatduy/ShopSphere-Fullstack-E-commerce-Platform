import type { ReactNode } from "react";
import { FiBox, FiChevronLeft, FiChevronRight, FiGrid, FiLayers, FiLogOut, FiSettings, FiShoppingBag, FiUsers, FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom";

type AdminSidebarProps = { collapsed: boolean; mobileOpen: boolean; onToggle: () => void; onCloseMobile: () => void };

const items = [
    { label: "Tổng quan", path: "/admin", icon: <FiGrid /> },
    { label: "Đơn hàng", path: "/admin/orders", icon: <FiShoppingBag />, badge: "12" },
    { label: "Sản phẩm", path: "/admin/products", icon: <FiBox /> },
    { label: "Danh mục", path: "/admin/categories", icon: <FiLayers /> },
    { label: "Khách hàng", path: "/admin/customers", icon: <FiUsers /> },
];

export function AdminSidebar({ collapsed, mobileOpen, onToggle, onCloseMobile }: AdminSidebarProps) {
    return (
        <aside className={`${mobileOpen ? "translate-x-0" : "-translate-x-full"} ${collapsed ? "lg:w-24" : "lg:w-72"} fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#191b1b] px-5 py-6 text-white transition-all lg:static lg:translate-x-0`}>
            <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} px-2`}>
                <NavLink to="/" className={`font-semibold tracking-[-0.08em] ${collapsed ? "text-xl" : "text-[1.55rem]"}`}>{collapsed ? "S" : "ShopSphere"}</NavLink>
                <button type="button" className="lg:hidden" onClick={onCloseMobile} aria-label="Đóng menu"><FiX className="text-xl" /></button>
            </div>

            <nav className="mt-10 space-y-1">
                {items.map((item) => <SidebarItem key={item.path} {...item} collapsed={collapsed} onClick={onCloseMobile} />)}
            </nav>

            <div className="mt-auto space-y-1">
                <SidebarItem label="Cài đặt" path="/admin/settings" icon={<FiSettings />} collapsed={collapsed} onClick={onCloseMobile} />
                <div className={`mt-6 flex items-center gap-3 border-t border-white/10 px-2 pt-5 ${collapsed ? "justify-center" : ""}`}>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e9a86a] text-sm font-bold text-[#191b1b]">MA</div>
                    {!collapsed ? <><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">Mai Admin</p><p className="truncate text-xs text-[#8d9692]">Quản trị viên</p></div><FiLogOut className="text-[#8d9692]" /></> : null}
                </div>
            </div>

            <button type="button" onClick={onToggle} className="absolute -right-3 top-24 hidden h-7 w-7 items-center justify-center rounded-full border border-[#38403d] bg-[#191b1b] text-[#d8dedb] shadow-md lg:flex" aria-label={collapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}>
                {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
            </button>
        </aside>
    );
}

function SidebarItem({ label, path, icon, collapsed, badge, onClick }: { label: string; path: string; icon: ReactNode; collapsed: boolean; badge?: string; onClick: () => void }) {
    return <NavLink to={path} onClick={onClick} end={path === "/admin"} title={collapsed ? label : undefined} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${collapsed ? "justify-center" : ""} ${isActive ? "bg-[#e9a86a] text-[#191b1b]" : "text-[#aeb8b3] hover:bg-white/10 hover:text-white"}`}>
        <span className="shrink-0 text-lg">{icon}</span>{!collapsed ? <><span className="flex-1">{label}</span>{badge ? <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-[#d8dedb]">{badge}</span> : null}</> : null}
    </NavLink>;
}