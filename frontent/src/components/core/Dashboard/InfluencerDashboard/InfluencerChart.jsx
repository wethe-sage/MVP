import { useState, useMemo } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

export default function InfluencerChart({ listings }) {
  const [currChart, setCurrChart] = useState("users");

  const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  const uniqueLabels = useMemo(() => {
    return listings.map((listing, index) => `${listing.listingName}_${index}`);
  }, [listings]);

  const chartDataUsers = {
    labels: uniqueLabels,
    datasets: [
      {
        data: listings.map((listing) => listing.totalPeopleBooked),
        backgroundColor: generateRandomColors(listings.length),
      },
    ],
  };

  const chartIncomeData = {
    labels: uniqueLabels,
    datasets: [
      {
        data: listings.map((listing) => listing.totalAmountGenerated),
        backgroundColor: generateRandomColors(listings.length),
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-white p-6">
      <p className="text-lg font-bold text-black">Visualize</p>
      
      <div className="font-semibold rounded-2xl bg-[#e2e2e2] w-fit">
        <button
          onClick={() => setCurrChart("users")}
          className={`rounded-2xl p-1 px-3 transition-all duration-200 ${
            currChart === "users"
              ? "bg-[#BCAD3C] rounded-2xl text-[#fff]"
              : "text-[#080808]"
          }`}
        > 
          People
        </button>
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-2xl p-1 px-3 transition-all duration-200 ${
            currChart === "income"
            ? "bg-[#BCAD3C] rounded-2xl text-[#fff]"
            : "text-[#000]"
          }`}
        >
          Income
        </button>
      </div>
      <div className="relative mx-auto aspect-square h-full w-full">
        <Pie data={currChart === "users" ? chartDataUsers : chartIncomeData} options={options} />
      </div>
    </div>
  );
}
