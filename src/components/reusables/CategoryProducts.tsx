import React from "react";
import IProductCard from "./IProductCard";

const CategoryProducts = (props: any) => {
  return (
    <div className="flex flex-col w-full gap-[48px] mx-auto max-w-[90vw] md:max-w-[650px] pr-3 lg:max-w-[850px] xl:max-w-[1100px] md:ml-auto">
      <div>
        <h2 className="font-[500] text-[30px]">{props.category}</h2>
      </div>

      <div className="flex items-stretch gap-[24px] w-full overflow-x-scroll pb-5 ">
        {Array.from(props, (item, i) => (
          <IProductCard {...item} key={i} />
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
