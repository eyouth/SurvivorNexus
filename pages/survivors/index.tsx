import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import React, { useState, useEffect, useCallback, SetStateAction } from "react";
import { survivors } from "@/data";
import { isNullOrEmpty, randomDate } from "@/helpers";
import { format } from "date-fns";
import SurvivorForm from "@/components/forms/SurvivorForm";

const inter = Inter({ subsets: ["latin"] });

export default function Survivors() {
  const [survivorsList, setSurvivorsList] = useState<Survivor[]>(survivors);
  const [survivorCount, setSurvivorCount] = useState<number>(0);
  const [healthySurvivorCount, setHealthySurvivorCount] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    setSurvivorCount(survivorsList.length)
    if(survivorsList.length > 0) {
      const _healthySurvivors = survivorsList.filter(survivor => !survivor.infected);
      setHealthySurvivorCount(_healthySurvivors?.length || 0)
    }
  }, [survivorsList])

  const onClickAddMore = (e: React.MouseEvent<HTMLElement>) => {
    setShowModal(!showModal)
  }

  const props = {
    showModal,
    setShowModal,
    survivorsList,
    setSurvivorsList
  }

  return (
    <main className={`flex min-h-screen flex-col ${inter.className}`}>
      <Header />
      <section className="w-full min-h-screen px-[120px] py-[60px]">
        <SurvivorForm {...props} />
        <section className="flex items-center justify-between">
          <section className="flex flex-col gap-[5px]">
            <h2 className="text-[24px] leading-[28px] font-semibold">List of Survivors</h2>
            <h3 className="flex items-center gap-3">
              <span className="text-[#5F5F61]">You have {healthySurvivorCount} healthy survivors</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM9 4C9 3.44772 8.55228 3 8 3C7.44772 3 7 3.44772 7 4C7 4.55228 7.44772 5 8 5C8.55229 5 9 4.55228 9 4ZM9 7.5C9 6.94772 8.55228 6.5 8 6.5C7.44772 6.5 7 6.94772 7 7.5L7 11.5C7 12.0523 7.44772 12.5 8 12.5C8.55229 12.5 9 12.0523 9 11.5V7.5Z" fill="#5F5F61"/>
              </svg>
            </h3>
          </section>
          <button 
            className="flex gap-3 border border-gray-200 py-[10px] px-[12px] rounded-lg bg-white"
            onClick={(e) => onClickAddMore(e)}>
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M10.0004 20.0999C15.3023 20.0999 19.6004 15.8018 19.6004 10.4999C19.6004 5.19797 15.3023 0.899902 10.0004 0.899902C4.69846 0.899902 0.400391 5.19797 0.400391 10.4999C0.400391 15.8018 4.69846 20.0999 10.0004 20.0999ZM10 4.5C10.6627 4.5 11.2 5.03726 11.2 5.7V8.7C11.2 9.03137 11.4686 9.3 11.8 9.3H14.8C15.4627 9.3 16 9.83726 16 10.5C16 11.1627 15.4627 11.7 14.8 11.7H11.8C11.4686 11.7 11.2 11.9686 11.2 12.3V15.3C11.2 15.9627 10.6627 16.5 10 16.5C9.33726 16.5 8.8 15.9627 8.8 15.3V12.3C8.8 11.9686 8.53137 11.7 8.2 11.7H5.2C4.53726 11.7 4 11.1627 4 10.5C4 9.83726 4.53726 9.3 5.2 9.3H8.2C8.53137 9.3 8.8 9.03137 8.8 8.7V5.7C8.8 5.03726 9.33726 4.5 10 4.5Z" fill="#312244"/>
            </svg>
            Add Survivor
          </button>
        </section>
        <section className="mt-[27px] flex gap-[34px] justify-evenly">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-[#f6f6f6]">
                <th scope="col" className="text-[12px] font-medium leadng-[18px] text-[#A1A0A3] text-left py-2 pl-5">Name</th>
                <th scope="col" className="text-[12px] font-medium leadng-[18px] text-[#A1A0A3] py-2 px-6">Status</th>
                <th scope="col" className="text-[12px] font-medium leadng-[18px] text-[#A1A0A3] py-2">Date Added</th>
              </tr>
            </thead>
            <tbody>
              {!isNullOrEmpty(survivorsList) && 
                survivorsList.map(survivor => {
                  const {name, infected, date_added} = survivor;
                  const statusText = infected ? 'Infected' : 'Healthy';

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
                        <div className="flex justify-center">
                          <div className={`w-[100px] rounded-full px-4 py-1 flex gap-2 items-center justify-center before:z-2 before:rounded-full before:w-2 before:h-2 ${infected ? 'bg-[#FCEAEA] text-[#E73F3F] before:bg-[#E73F3F]' : 'bg-[#E8F6ED] text-[#01A63E] before:bg-[#01A63E]'}`}>
                            <span>{statusText}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {format(new Date(date_added), "yyyy-MM-dd")}
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