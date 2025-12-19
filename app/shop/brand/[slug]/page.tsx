
import ShopPage from "../../page";
import { use } from "react";

export default function BrandShop({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);

    const brandName = slug.charAt(0).toUpperCase() + slug.slice(1);

    return <ShopPage initialBrand={brandName} />;
}

