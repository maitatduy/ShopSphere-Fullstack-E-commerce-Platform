import type { CategoryBlock } from "../data/homepageData";

type CategoryShowcaseProps = {
    title: string;
    items: CategoryBlock[];
};

export function CategoryShowcase({ title, items }: CategoryShowcaseProps) {
    return (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#8f8f8f]">
                        Shop by style
                    </p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-[-0.07em] text-[#171717]">
                        {title}
                    </h2>
                </div>
                <button className="rounded-full border border-[#ebebeb] bg-white px-4 py-2 text-sm font-medium text-[#171717] transition hover:border-[#171717]">
                    Browse all
                </button>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {items.map((item) => (
                    <article
                        key={item.id}
                        className="group overflow-hidden rounded-3xl border border-[#ebebeb] bg-white"
                    >
                        <div className="overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-92 w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="space-y-2 p-5">
                            <p className="text-[10px] uppercase tracking-[0.16em] text-[#8f8f8f]">
                                {item.subtitle}
                            </p>
                            <h3 className="text-[1.75rem] font-medium tracking-[-0.06em] text-[#171717]">
                                {item.title}
                            </h3>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
