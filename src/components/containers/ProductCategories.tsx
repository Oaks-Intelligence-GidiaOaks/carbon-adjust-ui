import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getHomePagePackages } from "@/services/homeOwner";
import ProductCard from "../reusables/ProductCard";
import { ArrowRight, ChevronDown } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  slug: string;
  banner?: string;
}

interface PackageItem {
  reviews: any;
  currency: string;
  _id: string;
  attachments: string[];
  title: string;
  price: string;
  isSoldOut: boolean;
  discount?: number;
}

interface CategoryWithPackages {
  category: Category;
  packages: PackageItem[];
}

const ProductCategories: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  const homePagePackages = useQuery({
    queryKey: ["get-home-packages"],
    queryFn: () => getHomePagePackages(),
  });

  const categoriesWithPackages: CategoryWithPackages[] =
    homePagePackages.isSuccess
      ? homePagePackages.data.data.map((item: CategoryWithPackages) => ({
          category: item.category,
          packages: item.packages,
        }))
      : [];

  const initialCategories = categoriesWithPackages.slice(0, 5);

  return (
    <div className="w-full max-w-6xl mx-auto py-10 container">
      <h2 className="text-center text-2xl font-semibold mb-6">
        Shop By Categories
      </h2>

      {/* Initial Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {initialCategories.map(({ category, packages }) => (
          <div
            key={category._id}
            className="group relative cursor-pointer p-4 bg-white  rounded-lg border border-gray-200 hover:shadow-2xl transition-all transform duration-300 group-hover:scale-105"
          >
            <img
              src={packages[0]?.attachments[0] || "/placeholder-image.png"}
              alt={`Image for ${category.name}`}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-center mt-4 text-sm font-medium text-gray-700 group-hover:text-blue-500">
              {category.name}
            </h3>
          </div>
        ))}
      </div>

      {/* Toggle View All Categories */}
      <div className="text-center mt-14 flex justify-center items-center ">
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center justify-center text-blue-500 hover:underline text-sm font-medium"
        >
          {showAll ? "Hide All Categories" : "View All Categories"}
          <span
            className={`ml-2 transform transition-transform ${
              showAll ? "rotate-180" : "rotate-0"
            }`}
          >
            <ChevronDown />
          </span>
        </button>
      </div>

      {/* Full Category List */}
      {showAll && (
        <div>
          <div className="mt-6 space-y-20">
            {categoriesWithPackages.map(({ category, packages }) => (
              <div key={category._id} className="">
                <div className="lg:flex justify-between items-center mb-10">
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                  <div className="text-right">
                    <a
                      href="#"
                      className="text-[#2DA5F3] flex gap-2 items-center hover:underline text-sm font-semibold"
                    >
                      Browse All Products <ArrowRight className="size-4" />
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch mr-10 gap-x-5 w-full no-scrollbar">
                  {packages.slice(0, 8).map((pkg) => (
                    <ProductCard
                      key={pkg._id}
                      {...pkg}
                      category={{
                        name: category.name,
                        slug: category.slug,
                      }}
                      color={[]} // Default value for color
                      regions={[]} // Default value for regions
                      country="" // Default value for country
                      status="" // Default value for status
                      packageType={""}
                      hasQuestion={false}
                      hasSchedule={false}
                      allowPartPayment={false}
                      currency={pkg.currency}
                      questions={[]}
                      createdAt={""}
                      updatedAt={""}
                      __v={0}
                    />
                  ))}
                </div>

                {/* Optional Banner */}
                {category.banner && (
                  <div className="mt-4">
                    <img
                      src={category.banner}
                      alt={`${category.name} Banner`}
                      className="w-full rounded-md shadow"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCategories;
