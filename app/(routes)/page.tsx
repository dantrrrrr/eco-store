import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";
import { Suspense } from "react";

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  console.log("🚀 ~ file: page.tsx:8 ~ HomePage ~ products:", products);
  const billboard = await getBillboard("03b3a194-6d4f-42f4-933e-23403c8e352e");
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Suspense fallback={<div>Loading</div>}>
          <Billboard data={billboard} />
        </Suspense>
        <div className="flex flex-col gap-y-8 px-4  sm:px-6  lg:px-8  ">
          <ProductList title="Featured product" items={products} />
        </div>
      </div>
    </Container>
  );
};
export default HomePage;
