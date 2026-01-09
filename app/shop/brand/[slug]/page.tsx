
import ShopPage from "../../page";
import { use } from "react";

export default function BrandShop({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);

    const brandName = slug.toLowerCase();
    return <ShopPage initialBrand={brandName} />;
}

