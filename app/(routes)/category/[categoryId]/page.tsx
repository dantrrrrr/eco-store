import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import React, { Suspense } from "react";
import Filter from "./components/filter";
import NoResults from "@/components/ui/no-result";
import ProductCard from "@/components/ui/product-card";
import MobileFilter from "./components/mobile-filter";

// export const revalidate = 0;

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    colorId: string;
    sizeId: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });
  // console.log("🚀 ~ file: page.tsx:32 ~ products:", products);
  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(params.categoryId);
  // console.log("🚀 ~ file: page.tsx:33 ~ category:", category);

  return (
    <div className="bg-white">
      <Container>
        <Suspense fallback={<div>Loading</div>}>
          <Billboard data={category.billboard} />
        </Suspense>
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            {/* add mobile filter */}
            <MobileFilter sizes={sizes} colors={colors} />
            <div className="hidden lg:block">
              <Filter name="Sizes" data={sizes} valueKey="sizeId" />
              <Filter name="Colors" data={colors} valueKey="colorId" />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
                {products.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
