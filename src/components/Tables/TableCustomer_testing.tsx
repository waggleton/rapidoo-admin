import { BRAND } from "@/types/brand";
import Image from "next/image";

const brandData: BRAND[] = [
  {
    logo: "/images/brand/brand-01.svg",
    name: "Google",
    visitors: 3.5,
    revenues: "5,768",
    sales: 590,
    conversion: 4.8,
    test: "test",
  },
  {
    logo: "/images/brand/brand-02.svg",
    name: "Twitter",
    visitors: 2.2,
    revenues: "4,635",
    sales: 467,
    conversion: 4.3,
    test: "test",
  },
  {
    logo: "/images/brand/brand-03.svg",
    name: "Github",
    visitors: 2.1,
    revenues: "4,290",
    sales: 420,
    conversion: 3.7,
    test: "test",
  },
  {
    logo: "/images/brand/brand-04.svg",
    name: "Vimeo",
    visitors: 1.5,
    revenues: "3,580",
    sales: 389,
    conversion: 2.5,
    test: "test",
  },
  {
    logo: "/images/brand/brand-05.svg",
    name: "Facebook",
    visitors: 3.5,
    revenues: "6,768",
    sales: 390,
    conversion: 4.2,
    test: "test",
  },
];

const TableCustomer = () => {
  return (

      <div className="flex flex-col overflow-x-auto">
        

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-12 ${
              key === brandData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="hidden items-center justify-center p-2.5 sm:flex sm:p-5">
              <p className="text-meta-5">[=]</p>
            </div>
            
            <div className="flex items-center gap-3 p-2.5 sm:p-5">
              <p className="hidden text-black dark:text-white sm:block">
                {brand.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 sm:p-5">
              <p className="text-black dark:text-white">{brand.visitors}K</p>
            </div>

            <div className="flex items-center justify-center p-2.5 sm:p-5">
              <p className="text-meta-3">${brand.revenues}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex sm:p-5">
              <p className="text-black dark:text-white">{brand.sales}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex sm:p-5">
              <p className="text-meta-5">{brand.conversion}%</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex sm:p-5">
              <p className="text-meta-5">{brand.test}%</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex sm:p-5">
              <p className="text-meta-5">{brand.test}%</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex sm:p-5">
              <p className="text-meta-5">{brand.test}%</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex sm:p-5">
              <p className="text-meta-5">{brand.test}%</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex sm:p-5">
              <p className="text-meta-5">{brand.test}%</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex sm:p-5">
              <p className="text-meta-5">{brand.test}%</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex sm:p-5">
              <p className="text-meta-5">{brand.test}%</p>
            </div>

          </div>
        ))}
      </div>
  );
};

export default TableCustomer;
