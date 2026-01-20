import Header from "../../components/Header";
import { RiWalletLine, RiMoneyDollarCircleLine, RiBankLine } from "react-icons/ri";
import { BsCashCoin } from "react-icons/bs";

const Wallet = () => {
    
  const walletData = [
    {
      title: "Total Remuneration",
      amount: "12,500.00",
      icon: BsCashCoin,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100"
    },
    {
      title: "Amount Withdrawn",
      amount: "12,500.00",
      icon: RiMoneyDollarCircleLine,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100"
    },
    {
      title: "Other Earnings",
      amount: "12,500.00",
      icon: RiBankLine,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100"
    }
  ];

  return (
    <div className="space-y-6 w-full px-4 sm:px-6 lg:px-8 pb-10">
      <Header title="Wallet" Icon={RiWalletLine} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {walletData.map((item, index) => (
          <div 
            key={index}
            className={`bg-white rounded-3xl p-6 border ${item.border} shadow-lg shadow-gray-100 flex flex-col justify-between h-48 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group`}
          >
             <div className={`absolute top-0 right-0 w-32 h-32 ${item.bg} rounded-full blur-3xl -mr-10 -mt-10 transition-all duration-500 opacity-50 group-hover:opacity-100`}></div>
            
            <div className="relative z-10">
                <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center text-2xl mb-4 shadow-sm`}>
                    <item.icon />
                </div>
                <h3 className="text-slate-500 font-medium text-sm uppercase tracking-wider">{item.title}</h3>
            </div>
            
             <div className="relative z-10">
                <p className={`text-4xl font-bold ${item.color} tracking-tight`}>₹{item.amount}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wallet;
