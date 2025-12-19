
import ShopPage from "../../page";
import { use } from "react";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);

    const category = slug.charAt(0).toUpperCase() + slug.slice(1);

    return <ShopPage initialCategory={category} />;
}

