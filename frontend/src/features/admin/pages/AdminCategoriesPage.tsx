import { useMemo, useState } from "react";
import { FiEdit2, FiLayers, FiMoreHorizontal, FiSearch, FiTrash2, FiX } from "react-icons/fi";
import type { Category } from "../../categories/types";
import { AdminLayout } from "../layouts/AdminLayout";

type CategoryForm = { code: string; name: string; description: string };

const emptyForm: CategoryForm = { code: "", name: "", description: "" };

const initialCategories: Category[] = [
    { id: 1, code: "WOMEN", name: "Thời trang nữ", slug: "thoi-trang-nu", description: "Các sản phẩm thời trang dành cho nữ." },
    { id: 2, code: "MEN", name: "Thời trang nam", slug: "thoi-trang-nam", description: "Trang phục và phụ kiện dành cho nam." },
    { id: 3, code: "ACCESSORIES", name: "Phụ kiện", slug: "phu-kien", description: "Điểm nhấn hoàn thiện cho phong cách hằng ngày." },
    { id: 4, code: "NEW", name: "Hàng mới về", slug: "hang-moi-ve", description: "Những sản phẩm mới nhất trên ShopSphere." },
];

export function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [query, setQuery] = useState("");
    const [form, setForm] = useState<CategoryForm>(emptyForm);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formOpen, setFormOpen] = useState(false);
    const [saving, setSaving] = useState(false);

    const filteredCategories = useMemo(
        () => categories.filter((category) => `${category.name} ${category.slug ?? ""} ${category.description ?? ""}`.toLowerCase().includes(query.toLowerCase())),
        [categories, query],
    );

    const openCreate = () => {
        setEditingId(null);
        setForm(emptyForm);
        setFormOpen(true);
    };

    const openEdit = (category: Category) => {
        setEditingId(String(category.id));
        setForm({ code: String(category.code ?? category.slug ?? ""), name: category.name, description: category.description ?? "" });
        setFormOpen(true);
    };

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSaving(true);
        const payload = { code: form.code.trim(), name: form.name.trim(), description: form.description.trim() };

        if (editingId) {
            setCategories((current) => current.map((category) => String(category.id) === editingId ? { ...category, ...payload, slug: payload.name.toLowerCase().replaceAll(" ", "-") } : category));
        } else {
            setCategories((current) => [...current, { id: Date.now(), ...payload, slug: payload.name.toLowerCase().replaceAll(" ", "-") }]);
        }

        setFormOpen(false);
        setSaving(false);
    };

    const handleDelete = (category: Category) => {
        if (!window.confirm(`Xóa danh mục ${category.name}?`)) return;
        setCategories((current) => current.filter((item) => item.id !== category.id));
    };

    return <AdminLayout title="Danh mục" actionLabel="Thêm danh mục" onAction={openCreate}>
        <div className="mx-auto max-w-375 px-5 py-7 sm:px-8 lg:px-12 lg:py-10">
            <div className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-sm text-[#858b87]">Quản lý cấu trúc cửa hàng</p><h2 className="mt-2 text-3xl font-semibold tracking-[-0.06em]">Tất cả danh mục</h2></div><div className="flex items-center gap-3"><div className="flex items-center gap-2 rounded-full border border-[#deded8] bg-white px-4 py-2.5 text-sm text-[#8a908c]"><FiSearch /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm danh mục" className="w-40 bg-transparent outline-none placeholder:text-[#a6aaa6]" /></div></div></div>

            <div className="overflow-hidden rounded-3xl border border-[#e3e3dc] bg-white"><div className="grid grid-cols-[1.25fr_0.85fr_1.6fr_0.45fr] gap-4 border-b border-[#ecece7] bg-[#fafaf8] px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#9b9f9b] sm:px-7"><span>Tên danh mục</span><span>Mã</span><span>Mô tả</span><span /></div>{filteredCategories.length ? filteredCategories.map((category) => <div key={category.id} className="grid grid-cols-[1.25fr_0.85fr_1.6fr_0.45fr] items-center gap-4 border-b border-[#f0f0eb] px-5 py-5 last:border-0 sm:px-7"><div className="flex min-w-0 items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f7e1d4] text-[#c95a38]"><FiLayers /></span><div className="min-w-0"><p className="truncate font-semibold">{category.name}</p><p className="truncate text-xs text-[#9b9f9b]">{category.slug || "Chưa có slug"}</p></div></div><span className="truncate text-sm text-[#606762]">{String(category.code ?? category.slug ?? "-")}</span><p className="truncate text-sm text-[#858b87]">{category.description || "Chưa có mô tả"}</p><div className="flex items-center justify-end gap-1"><button type="button" onClick={() => openEdit(category)} className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#6c746f] transition hover:bg-[#f4f4f0] hover:text-[#191b1b]" aria-label={`Sửa ${category.name}`}><FiEdit2 /></button><button type="button" onClick={() => handleDelete(category)} className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#b24d2e] transition hover:bg-[#fff0ea]" aria-label={`Xóa ${category.name}`}><FiTrash2 /></button></div></div>) : <div className="px-7 py-16 text-center"><FiMoreHorizontal className="mx-auto text-2xl text-[#b8bdb9]" /><p className="mt-3 text-sm text-[#858b87]">Chưa có danh mục phù hợp.</p></div>}</div>
        </div>
        {formOpen ? <CategoryFormModal form={form} editing={Boolean(editingId)} saving={saving} onChange={setForm} onClose={() => setFormOpen(false)} onSubmit={handleSave} /> : null}
    </AdminLayout>;
}

function CategoryFormModal({ form, editing, saving, onChange, onClose, onSubmit }: { form: CategoryForm; editing: boolean; saving: boolean; onChange: (form: CategoryForm) => void; onClose: () => void; onSubmit: (event: React.FormEvent<HTMLFormElement>) => void }) {
    return <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/35 p-4"><form onSubmit={onSubmit} className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8"><div className="flex items-start justify-between"><div><p className="text-sm text-[#858b87]">{editing ? "Chỉnh sửa" : "Tạo mới"}</p><h2 className="mt-1 text-2xl font-semibold tracking-tighter">{editing ? "Cập nhật danh mục" : "Thêm danh mục"}</h2></div><button type="button" onClick={onClose} className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#f4f4f0]" aria-label="Đóng"><FiX /></button></div><div className="mt-7 space-y-4"><Field label="Mã danh mục"><input required value={form.code} onChange={(event) => onChange({ ...form, code: event.target.value })} placeholder="VD: WOMEN" className="field-input" /></Field><Field label="Tên danh mục"><input required value={form.name} onChange={(event) => onChange({ ...form, name: event.target.value })} placeholder="VD: Thời trang nữ" className="field-input" /></Field><Field label="Mô tả"><textarea required rows={4} value={form.description} onChange={(event) => onChange({ ...form, description: event.target.value })} placeholder="Mô tả ngắn về danh mục" className="field-input resize-none" /></Field></div><div className="mt-7 flex justify-end gap-3"><button type="button" onClick={onClose} className="rounded-full border border-[#deded8] px-5 py-2.5 text-sm font-medium">Hủy</button><button type="submit" disabled={saving} className="rounded-full bg-[#191b1b] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">{saving ? "Đang lưu..." : editing ? "Lưu thay đổi" : "Tạo danh mục"}</button></div></form></div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return <label className="block"><span className="mb-2 block text-sm font-medium text-[#4e5651]">{label}</span>{children}</label>;
}