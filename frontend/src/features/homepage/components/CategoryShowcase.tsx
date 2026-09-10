import type { CategoryBlock } from "../data/homepageData";

type CategoryShowcaseProps = {
    title: string;
    items: CategoryBlock[];
};

export function CategoryShowcase({ title, items }: CategoryShowcaseProps) {
    return (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#8f8f8f]">
                        Shop by style
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.07em] text-[#171717] sm:text-3xl">
                        {title}
                    </h2>
                </div>
                <button className="w-fit rounded-full border border-[#ebebeb] bg-white px-4 py-2 text-sm font-medium text-[#171717] transition hover:border-[#171717]">
                    Browse all
                </button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                    <article
                        key={item.id}
                        className="group overflow-hidden rounded-3xl border border-[#ebebeb] bg-white"
                    >
                        <div className="overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-76 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-88 lg:h-96"
                            />
                        </div>
                        <div className="space-y-2 p-5">
                            <p className="text-[10px] uppercase tracking-[0.16em] text-[#8f8f8f]">
                                {item.subtitle}
                            </p>
                            <h3 className="text-[1.5rem] font-medium tracking-[-0.06em] text-[#171717] sm:text-[1.75rem]">
                                {item.title}
                            </h3>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
