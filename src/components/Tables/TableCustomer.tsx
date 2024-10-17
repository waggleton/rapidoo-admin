"use client";

import { BRAND } from "@/types/brand";
import Image from "next/image";
import Link from "next/link";

const brandData: BRAND[] = [
  {
    ProviderName: "Mark Raymond Martirez",
    Email: "marky.boy.martirez@gmail.com",
    VehicleCount: 1,
    SignupDate: "16th October, 2024",
    Mobile: "(+63) 9926487128",
    WalletBalance: 0.00,
    status: 1,
  },
  {
    ProviderName: "Mark Raymond Martirez",
    Email: "marky.boy.martirez@gmail.com",
    VehicleCount: 1,
    SignupDate: "16th October, 2024",
    Mobile: "(+63) 9926487128",
    WalletBalance: 0.00,
    status: 1,
  },
  {
    ProviderName: "Mark Raymond Martirez",
    Email: "marky.boy.martirez@gmail.com",
    VehicleCount: 1,
    SignupDate: "16th October, 2024",
    Mobile: "(+63) 9926487128",
    WalletBalance: 0.00,
    status: 1,
  },
  {
    ProviderName: "Mark Raymond Martirez",
    Email: "marky.boy.martirez@gmail.com",
    VehicleCount: 1,
    SignupDate: "16th October, 2024",
    Mobile: "(+63) 9926487128",
    WalletBalance: 0.00,
    status: 1,
  },
  {
    ProviderName: "Mark Raymond Martirez",
    Email: "marky.boy.martirez@gmail.com",
    VehicleCount: 1,
    SignupDate: "16th October, 2024",
    Mobile: "(+63) 9926487128",
    WalletBalance: 0.00,
    status: 1,
  },
  {
    ProviderName: "Mark Raymond Martirez",
    Email: "marky.boy.martirez@gmail.com",
    VehicleCount: 1,
    SignupDate: "16th October, 2024",
    Mobile: "(+63) 9926487128",
    WalletBalance: 0.00,
    status: 1,
  },
];

let DocumentCount = 11;
let DocumentMaxCount=11;

const TableCustomer = () => {
  return (

      <div className="flex flex-col overflow-x-auto pb-100 ">
        <div className="grid grid-cols-3 rounded-sm bg-gray-3 dark:bg-meta-4 sm:grid-cols-12 grid-row-1">

        <div className="p-2.5 truncate whitespace-normal text-center sm:block sm:p-3">
            <h5 className="text-xs font-medium uppercase sm:text-sm" >
            <input type="checkbox"  className="checkbox checkbox-primary" />
            </h5>
          </div>
          
          <div className= "p-2.5 truncate whitespace-normal sm:p-3">
            <h5 className="text-xs font-medium uppercase sm:text-sm" >
              Provider Name
            </h5>
          </div>
          <div className="p-2.5 truncate whitespace-normal text-center sm:p-3">
            <h5 className="text-xs font-medium uppercase sm:text-sm" >
              Email
            </h5>
          </div>
          <div className="hidden p-2 .5 truncate whitespace-normal text-center sm:block sm:p-3">
            <h5 className="text-xs font-medium uppercase sm:text-sm" >
              Vehicle Count
            </h5>
          </div>
          <div className="hidden p-2 .5 truncate whitespace-normal text-center sm:block sm:p-3">
            <h5 className="text-xs font-medium uppercase sm:text-sm" >
            Signup Date
            </h5>
          </div>
          <div className="hidden p-2 .5 truncate whitespace-normal text-center sm:block sm:p-3">
            <h5 className="text-xs font-medium uppercase sm:text-sm" >
            Mobile
            </h5>
          </div>
          <div className="hidden p-2 .5 truncate whitespace-normal text-center sm:block sm:p-3">
            <h5 className="text-xs font-medium uppercase sm:text-sm" >
            Wallet Balance
            </h5>
          </div>
          <div className="hidden p-3 truncate whitespace-normal text-center sm:block sm:p-3">
            <h5 className="text-xs font-medium uppercase sm:text-sm" >
            View/Edit Document(s)
            </h5>
          </div>
          <div className="hidden p-2 .5 truncate whitespace-normal text-center sm:block sm:p-3">
            <h5 className="text-xs font-medium uppercase sm:text-sm" >
              Manage Services
            </h5>
          </div>
          <div className="hidden p-2 .5 truncate whitespace-normal text-center sm:block sm:p-3">
            <h5 className="text-xs font-medium uppercase sm:text-sm" >
              View/Edit Availability
            </h5>
          </div>
          <div className="hidden p-2 .5 truncate whitespace-normal text-center sm:block sm:p-3">
            <h5 className="text-xs font-medium uppercase sm:text-sm" >
              Status
            </h5>
          </div>
          <div className="hidden p-2 .5 truncate whitespace-normal text-center sm:block sm:p-3">
            <h5 className="text-xs font-medium uppercase sm:text-sm" >
              Action
            </h5>
          </div>

        </div>

        {brandData. map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-12 ${
              key === brandData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="hidden items-center justify-center p-2.5 truncate whitespace-normal sm:flex sm:p-3">
              <p className="text-meta-5 sm:text-sm"><input type="checkbox" className="checkbox checkbox-primary" /></p>
            </div>
            
            <div className="flex items-center gap-3 p-2.5 truncate whitespace-normal sm:p-3">
              <p className="hidden text-black dark:text-white sm:block sm:text-sm">
                {brand.ProviderName}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 break-all whitespace-normal sm:p-3">
              <p className="text-black dark:text-white sm:text-sm">{brand.Email}K</p>
            </div>

            <div className="flex items-center justify-center p-2.5 truncate whitespace-normal sm:p-3">
              <p className="text-meta-3 sm:text-sm">{brand.VehicleCount}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 truncate whitespace-normal sm:flex sm:p-3">
              <p className="text-black dark:text-white sm:text-sm">{brand.SignupDate} </p>
            </div>

            <div className="hidden items-center justify-center p-2.5 truncate whitespace-normal sm:flex sm:p-3">
              <p className="text-meta-5 sm:text-sm">{brand.Mobile}<br/><button className="btn btn-sm">Update Mobile</button></p>
              
            </div>

            <div className="hidden items-center justify-center p-2.5 truncate whitespace-normal sm:flex sm:p-3">
              <p className="text-meta-5 sm:text-sm">P {brand.WalletBalance}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 truncate whitespace-normal sm:flex sm:p-3">
              <p className="text-meta-5">{DocumentCount} of {DocumentMaxCount}<br/>
              <button className="btn btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              </p>
            </div>
            <div className="hidden items-center justify-center p-2.5 truncate whitespace-normal sm:flex sm:p-3">
              <p className="text-meta-5">
                <button className="btn btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              </p>
            </div>
            <div className="hidden items-center justify-center p-2.5 truncate whitespace-normal sm:flex sm:p-3">
              <p className="text-meta-5"><Link href="">Edit Availability</Link></p>
            </div>
            <div className="hidden items-center justify-center p-2.5 truncate whitespace-normal sm:flex sm:p-3">
              <p className="text-meta-5">{brand.status}<br/><Link href="">View History</Link></p>
            </div>
            <div className="hidden items-center justify-center p-2.5 whitespace-normal sm:flex sm:p-3">
            <div className="dropdown dropdown-left">
                <div tabIndex={0} role="button" className="btn m-1">Click</div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                  <li><a onClick={() => brand.status = 1}>1</a></li>
                  <li><a onClick={() => brand.status = 2}>2</a></li>
                  <li><a onClick={() => brand.status = 3} >3</a></li>
                  <li><a onClick={() => brand.status = 4}>Item 4</a></li>
                </ul>
              </div>
            </div>

          </div>
        ))}
      </div>
  );
};

export default TableCustomer;
