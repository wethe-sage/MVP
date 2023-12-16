import RenderSteps from "./RenderSteps";

export default function AddListing() {
  return (
    <>
      <div className="flex overflow-x-hidden items-start gap-x-6 bg-[#fff] p-3 w-fit">
        <div className="flex flex-1 flex-col">
          <h1 className="mb-14 text-3xl font-medium text-center md:text-left text-richblack-900">
            Create a New Tour Listing
          </h1>
          <div className="flex-1">
            <RenderSteps />
          </div>
        </div>
        {/* Tour Listing Tips */}
        <div className="sticky top-10 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-[#F0F2F6] p-6 xl:block">
          <p className="mb-8 text-lg text-richblack-900">⛰️🏡 Tour Listing Tips</p>
          <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-900">
            <li>Specify the cost of the tour or indicate if it's a free experience.</li>
            <li>Optimal image size for the tour thumbnail is 1024x576 pixels.</li>
            <li>Provide a detailed description of the tour.</li>
            <li>Use the Tour Builder to create and organize your tour itinerary.</li>
            <li>
              Add stops and details in the Tour Builder section to provide a comprehensive tour experience.
            </li>
            <li>
              Axdd recquired information in the Additional Data section to provide a comprehensive tour experience.
            </li>
            <li>
              Information from the Additional Data section will be displayed on the tour's dedicated page.
            </li>
            <li>Make announcements to notify participants of any important updates or changes.</li>
            <li>Send general notes to all booked participants at once.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
