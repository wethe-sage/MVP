import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"
import ListingInformationForm from "./ListingInformation/ListingInformationForm"
import ListingBuilderForm from "./ListingBuilder/ListingBuilderForm"
import PublishListing from "./PublishListing"

export default function RenderSteps() {
  const { step } = useSelector((state) => state.listing)

  const steps = [
    {
      id: 1,
      title: "Listing Information",
    },
    {
      id: 2,
      title: "Listing Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ]

  return (
    <>
      <div className="relative mb-2 flex w-[full] justify-center bg-[#fff] ">
        {steps.map((item) => (
          <>
            <div
              className="flex flex-col items-center "
              key={item.id}
            >
              <button
                className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                  step === item.id
                    ? "border-yellow-50 bg-[#BCAD3C] text-white"
                    : "border-richblack-700 bg-white text-richblack-300"
                } ${step > item.id && "bg-[#afa138] text-[#BCAD3C]"}} `}
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-white" />
                ) : (
                  item.id
                )}
              </button>
              
            </div>
            {item.id !== steps.length && (
              <>
                <div
                  className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
                  step > item.id  ? "border-yellow-50" : "border-richblack-500"
                } `}
                ></div>
              </>
            )}
          </>
        ))}
      </div>

      <div className="relative mb-16 flex w-full select-none justify-between">
        {steps.map((item) => (
          <>
            <div
              className="flex min-w-[130px] flex-col items-center gap-y-2"
              key={item.id}
            >
              
              <p
                className={`text-sm ${
                  step >= item.id ? "text-richblack-900" : "text-richblack-500"
                }`}
              >
                {item.title}
              </p>
            </div>
            
          </>
        ))}
      </div>
      {/* Render specific component based on current step */}
      {step === 1 && <ListingInformationForm />}
      {step === 2 && <ListingBuilderForm />}
      {step === 3 && <PublishListing />}
    </>
  ) 
}
