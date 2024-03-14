import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export default function Report() {
  // Unable to finish teh report page. 
  // Code here for the implementation of the percentage...

  // To calculate the percentage change in the number of survivors added within a 30-day period, you would need to know the following:

  // The initial number of survivors (before the addition).
  // The number of survivors added within the 30-day period.
  // Once you have these numbers, you can use the following formula to calculate the percentage change:

  const numberOfInfected = 1;
  const numberOfSurvivorsAdded = 2;
  const initialNumberOfSurvivors = 5;

  const survivorPercentageChange = (numberOfSurvivorsAdded/initialNumberOfSurvivors) * 100;
  const infectedPercentageChange = (numberOfInfected/initialNumberOfSurvivors) * 100;

  return (
    <main className={`flex min-h-screen flex-col ${inter.className}`}>
      <Header />
      <section className="w-full min-h-screen px-[120px] py-[60px]">
        <section className="flex flex-col gap-[5px]">
          <h2 className="text-[20px] leading-[18px]">Report</h2>
          <h3 className="flex items-center gap-3">
            <span className="text-[#5F5F61]">Your camp has grown <span className={`${survivorPercentageChange > 0 ? 'text-[#52A86E]' : 'text-black'}`}>{survivorPercentageChange > 0 ? `+${survivorPercentageChange}%` : 0}</span> this month</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM9 4C9 3.44772 8.55228 3 8 3C7.44772 3 7 3.44772 7 4C7 4.55228 7.44772 5 8 5C8.55229 5 9 4.55228 9 4ZM9 7.5C9 6.94772 8.55228 6.5 8 6.5C7.44772 6.5 7 6.94772 7 7.5L7 11.5C7 12.0523 7.44772 12.5 8 12.5C8.55229 12.5 9 12.0523 9 11.5V7.5Z" fill="#5F5F61"/>
            </svg>
          </h3>
        </section>
        <section className="mt-[27px] flex gap-[34px] justify-evenly">
          <div className="w-[377px] h-[194px] border border-gray-200 rounded-lg flex flex-col gap-[10px]">
            <section className="p-[16px]">
              <div className="fon-semibold text-[16px] leading-[26px]">Number of Healthy Survivors</div>
              <div className="fon-semibold text-[30px] leading-[40px] flex items-center gap-3 mt-[14px]">{numberOfSurvivorsAdded} <span className={`text-[12px] leading-[18px] h-[24px] rounded-full flex items-center justify-center px-2 ${survivorPercentageChange > 0 ? 'text-[#52A86E] bg-[#b9ffd0]' : 'text-black bg-none'}`}>{survivorPercentageChange > 0 ? `+${survivorPercentageChange}%` : 0}</span></div>
              <div className="fon-semibold text-[12px] leading-[18px]">Last 30 days</div>
            </section>
            <div className="fon-semibold text-[12px] leading-[18px] border-t-gray-200">Download Report</div>
          </div>
          <div className="w-[377px] h-[194px] border border-gray-200 rounded-lg flex flex-col gap-[10px]">
            <section className="p-[16px]">
              <div className="fon-semibold text-[16px] leading-[26px]">Number of Infected Survivors</div>
              <div className="fon-semibold text-[30px] leading-[40px] flex items-center gap-3 mt-[14px]">{numberOfInfected} <span className={`text-[12px] leading-[18px] h-[24px] rounded-full flex items-center justify-center px-2 ${infectedPercentageChange > 0 ? 'text-[#d23437] bg-[#f7d6d7]' : 'text-black bg-none'}`}>{infectedPercentageChange > 0 ? `+${infectedPercentageChange}%` : 0}</span></div>
              <div className="fon-semibold text-[12px] leading-[18px]">Last 30 days</div>
            </section>
            <div className="fon-semibold text-[12px] leading-[18px] border-t-gray-200">Download Report</div>
          </div>
          <div className="w-[377px] h-[194px] border border-gray-200 rounded-lg flex flex-col gap-[10px]">
            <section className="p-[16px]">
              <div className="fon-semibold text-[16px] leading-[26px]">Average Resource Allocation</div>
              <div className="fon-semibold text-[30px] leading-[40px] flex items-center gap-3 mt-[14px]">Food <span className="bg-[#E8F6ED] text-[12px] leading-[18px] h-[24px] flex items-center justify-center rounded-xl px-2">+5%</span></div>
              <div className="fon-semibold text-[12px] leading-[18px]">Last 30 days</div>
            </section>
            <div className="fon-semibold text-[12px] leading-[18px] border-t-gray-200">Download Report</div>
          </div>
        </section>
      </section>
    </main>
  );
}