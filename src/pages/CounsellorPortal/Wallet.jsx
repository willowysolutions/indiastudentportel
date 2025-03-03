import React from "react";
import Header from "../../components/Header";
import { RiWalletLine } from "react-icons/ri";
//imports................................................................................................

const Wallet = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Header title="Wallet" Icon={RiWalletLine} />

      <div className="flex flex-col sm:flex-row mt-6 justify-around">
        <div className="activity-four px-4 sm:px-8 h-36 w-full sm:w-80 rounded-xl shadow-inner-black-25 relative mb-4 sm:mb-0">
          <div className="flex justify-center text-black font-semibold text-[15px] pt-5">
            Total Remuneration
          </div>
          <p className="text-[20px] font-semibold mt-2">12500.00</p>
        </div>

        <div className="activity-one px-4 sm:px-8 h-36 w-full sm:w-80 rounded-xl shadow-inner-black-25 relative mb-4 sm:mb-0">
          <div className="flex justify-center text-black font-semibold text-[15px] pt-5">
            Amount withdrawn
          </div>
          <p className="text-[20px] font-semibold mt-2">12500.00</p>
        </div>

        <div className="activity-two px-4 sm:px-8 h-36 w-full sm:w-80 rounded-xl shadow-inner-black-25 relative">
          <div className="flex justify-center text-black font-semibold text-[15px] pt-5">
            Amount withdrawn
          </div>
          <p className="text-[20px] font-semibold mt-2">12500.00</p>
        </div>
      </div>
      {/* <div className="w-full b-slate-500 justify-end flex px-4 sm:px-20 p-4">
        <div className="b-red-200 flex justify-center mt-40 pr-2">
          <button
            className="flex gap-2 items-center rounded-3xl px-6 py-1 overflow-hidden group bg-[F5F5FA] hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 text-violet-400 text-[.8rem] font-bold shadow-lg shadow-gray-400 transition-all ease-out duration-300"
          >
            Withdraw
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Wallet;
