import { useEffect, useState } from "react";
import { categoryService } from "../services/categoryService";
import type { Category } from "../types";

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchCategories = async () => {
            try {
                setLoading(true);
                const data = await categoryService.getCategories({ page: 0, size: 12, sort: "id,asc" });

                if (isMounted) {
                    setCategories(data);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : "Unable to load categories");
                    setCategories([]);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchCategories();

        return () => {
            isMounted = false;
        };
    }, []);

    return { categories, loading, error };
}
