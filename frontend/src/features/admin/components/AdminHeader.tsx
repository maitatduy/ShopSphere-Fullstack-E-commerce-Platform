import { FiMenu, FiPlus, FiSearch } from "react-icons/fi";

type AdminHeaderProps = { title: string; actionLabel?: string; onAction?: () => void; onOpenMobile: () => void };

export function AdminHeader({ title, actionLabel, onAction, onOpenMobile }: AdminHeaderProps) {
    return <header className="flex min-h-20 items-center justify-between gap-4 border-b border-[#e4e4de] bg-[#f8f8f5] px-5 py-4 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3"><button type="button" className="lg:hidden" onClick={onOpenMobile} aria-label="Mở menu"><FiMenu className="text-xl" /></button><h1 className="text-xl font-semibold tracking-[-0.04em] sm:text-2xl">{title}</h1></div>
        <div className="flex items-center gap-2 sm:gap-4">
            <label className="hidden items-center gap-2 rounded-full border border-[#deded8] bg-white px-4 py-2 text-sm text-[#8a908c] md:flex"><FiSearch /><span className="sr-only">Tìm kiếm</span><input placeholder="Tìm kiếm..." className="w-24 bg-transparent outline-none placeholder:text-[#a6aaa6] lg:w-36" /></label>
            {actionLabel ? <button type="button" onClick={onAction} className="inline-flex items-center gap-2 rounded-full bg-[#191b1b] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3d4441]"><FiPlus /> {actionLabel}</button> : null}
        </div>
    </header>;
}