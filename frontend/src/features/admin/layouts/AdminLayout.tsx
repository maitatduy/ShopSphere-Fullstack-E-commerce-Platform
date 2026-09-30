import type { ReactNode } from "react";
import { useState } from "react";
import { AdminHeader } from "../components/AdminHeader";
import { AdminSidebar } from "../components/AdminSidebar";

type AdminLayoutProps = { children: ReactNode; title: string; actionLabel?: string; onAction?: () => void };

export function AdminLayout({ children, title, actionLabel, onAction }: AdminLayoutProps) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return <div className="min-h-screen bg-[#f4f4f0] text-[#171717] lg:flex">
        <AdminSidebar collapsed={collapsed} mobileOpen={mobileOpen} onToggle={() => setCollapsed((value) => !value)} onCloseMobile={() => setMobileOpen(false)} />
        {mobileOpen ? <button type="button" className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Đóng menu" /> : null}
        <main className="min-w-0 flex-1"><AdminHeader title={title} actionLabel={actionLabel} onAction={onAction} onOpenMobile={() => setMobileOpen(true)} />{children}</main>
    </div>;
}