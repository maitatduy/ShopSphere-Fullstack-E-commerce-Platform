import { FiCheck } from "react-icons/fi";
import type { ProductListItem } from "../data/productsData";

export function ProductDescription({ product }: { product: ProductListItem }) {
    const details = [
        "Thiết kế có cấu trúc với form dáng thoải mái, dễ mặc.",
        "Vải cao cấp pha trộn giúp thoáng khí và mềm mại.",
        "Phù hợp để mix layer qua nhiều mùa và phong cách hàng ngày.",
    ];

    return (
        <section data-product-detail-animate className="rounded-4xl border border-[#ebebeb] bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-4 border-b border-[#ebebeb] pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#8f8f8f]">
                        Chi tiết sản phẩm
                    </p>
                    <h2 className="mt-2 text-2xl font-medium tracking-tighter text-[#171717]">
                        Thiết kế cho vận động hàng ngày
                    </h2>
                </div>
                <div className="rounded-full border border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm text-[#4d4d4d]">
                    {product.category}
                </div>
            </div>

            <div className="mt-6 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
                <div className="space-y-5">
                    <p className="text-base leading-7 text-[#4d4d4d]">
                        Một món đồ cơ bản tinh tế cho mỗi ngày, được thiết kế với sự tự tin thầm lặng và cấu trúc khéo léo.
                        Tạo ra để trông chỉn chu trong những ngày bận rộn ở thành phố nhưng vẫn thoải mái và dễ chịu cho sinh hoạt thường ngày.
                    </p>
                    <p className="text-base leading-7 text-[#4d4d4d]">
                        Silhouette cân bằng giữa đường nét gọn gàng và sự thoải mái, tạo nên một món đồ linh hoạt có thể mặc layered, sang trọng hoặc đơn giản kết hợp với phần còn lại của tủ quần áo.
                    </p>
                </div>

                <ul className="space-y-3 text-sm text-[#4d4d4d]">
                    {details.map((detail) => (
                        <li key={detail} className="flex items-start gap-3">
                            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#171717] text-[10px] text-white">
                                <FiCheck />
                            </span>
                            <span>{detail}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
