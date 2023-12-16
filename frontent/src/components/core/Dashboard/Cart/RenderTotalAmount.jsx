import React from 'react';
import { useSelector } from 'react-redux';
import IconBtn from '../../../common/IconBtn';

const RenderTotalAmount = () => {
  const { total, cart } = useSelector((state) => state.cart);

  const handleBuyCourse = () => {
    const listings = cart.map((listing) => listing._id);
    console.log("Bought these listing:", listings);
  };

  return (
    <div className="p-4 border-t mt-4">
      <p className="text-lg font-bold mb-2">Total:</p>
      <p className="text-2xl font-bold mb-4">Rs {total}</p>

      <IconBtn
        text="Buy Now"
        onClick={handleBuyCourse}
        customClasses="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

export default RenderTotalAmount;
