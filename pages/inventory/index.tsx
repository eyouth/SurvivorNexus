import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import React, { useState, useEffect, useCallback, SetStateAction } from "react";
import { survivors } from "@/data";
import { isNullOrEmpty, randomDate } from "@/helpers";
import { format } from "date-fns";

const inter = Inter({ subsets: ["latin"] });

export default function Inventory() {
  const [survivorsList, setSurvivorsList] = useState<Survivor[]>(survivors);
  const [survivorCount, setSurvivorCount] = useState<number>(0);
  const [inventoriesCount, setinventoriesCount] = useState<number>(0);

  useEffect(() => {
    setSurvivorCount(survivorsList.length)
    if (survivorsList.length > 0) {
      const totalQuantities: number = survivorsList.reduce((accumulator, survivor) => {        
        let totalQuantity = accumulator;
        survivor.inventory?.forEach(item => {
          const qty = item.quantity || 0;
          totalQuantity += qty; // Accumulate quantity.
        });
        return totalQuantity; // Return the updated totalQuantity.
      }, 0);
      setinventoriesCount(totalQuantities)
    }
  }, [survivorsList])

  return (
    <main className={`flex min-h-screen flex-col ${inter.className}`}>
      <Header />
      <section className="w-full min-h-screen px-[120px] py-[60px]">
        <section className="flex items-center justify-between">
          <section className="flex flex-col gap-[5px]">
            <h2 className="text-[24px] leading-[28px] font-semibold">List of Survivors Inventories</h2>
            <h3 className="flex items-center gap-3">
              <span className="text-[#5F5F61]">You have {inventoriesCount} inventories logged</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM9 4C9 3.44772 8.55228 3 8 3C7.44772 3 7 3.44772 7 4C7 4.55228 7.44772 5 8 5C8.55229 5 9 4.55228 9 4ZM9 7.5C9 6.94772 8.55228 6.5 8 6.5C7.44772 6.5 7 6.94772 7 7.5L7 11.5C7 12.0523 7.44772 12.5 8 12.5C8.55229 12.5 9 12.0523 9 11.5V7.5Z" fill="#5F5F61"/>
              </svg>
            </h3>
          </section>
        </section>
        <section className="mt-[27px] flex gap-[34px] justify-evenly">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-[#f6f6f6]">
                <th scope="col" className="text-[12px] font-medium leadng-[18px] text-[#A1A0A3] text-left py-2 pl-5">Name</th>
                <th scope="col" className="text-[12px] font-medium leadng-[18px] text-[#A1A0A3] py-2 px-6">Inventories</th>
                <th scope="col" className="text-[12px] font-medium leadng-[18px] text-[#A1A0A3] py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {!isNullOrEmpty(survivorsList) && 
                survivorsList.map(survivor => {
                  const {name, inventory} = survivor;
                  const inventories = inventory?.map(item => `${item.quantity} ${item.itemid}`).join(', ');

                  return (
                    <tr key={name} className="bg-white border-b border-gray-200">
                      <th scope="row" className="flex px-6 py-4 items-center gap-3">
                        <figure className="p-3 rounded-full bg-[#F1F1F1]">
                          <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.8119 4.15929C12.8119 6.45641 10.9133 8.31858 8.57125 8.31858C6.22923 8.31858 4.33065 6.45641 4.33065 4.15929C4.33065 1.86218 6.22923 0 8.57125 0C10.9133 0 12.8119 1.86218 12.8119 4.15929Z" fill="#A1A0A3"/>
                            <path d="M17.1429 13.8053V16.4602C16.1296 18.4988 12.676 20 8.57125 20C4.46652 20 1.01292 18.4988 0 16.4602V13.8053C0 11.8503 2.52632 9.73451 8.30075 9.73451C14.0752 9.73451 17.1429 11.8503 17.1429 13.8053Z" fill="#A1A0A3"/>
                          </svg>
                        </figure>
                        {name}
                      </th>
                      <td className="px-6 py-4">
                        {inventories}
                      </td>
                      <td className="px-6 py-4 text-center">
                      <button type="button" className="border px-4 py-2 rounded-lg" onClick={(e) => alert('Request Item')}>Request Item</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
            <tfoot>
              <tr className="bg-white border-b border-gray-200">
                  <th scope="col" colSpan={2} className="font-normal text-gray-500 py-3 text-left pl-5">Showing <span className="font-medium text-gray-800">1</span> to <span className="font-medium text-gray-800">5</span> of <span className="font-medium text-gray-800">{survivorCount}</span> Results</th>
                  <th scope="col" className="pr-5 py-3">
                    <div className="flex gap-3 justify-end">
                      <button className="border py-2 px-3 rounded-lg font-normal">Previous</button>
                      <button className="border py-2 px-3 rounded-lg font-normal">Next</button>
                    </div>
                  </th>
                </tr>
              </tfoot>
          </table>
        </section>
      </section>
    </main>
  );
}