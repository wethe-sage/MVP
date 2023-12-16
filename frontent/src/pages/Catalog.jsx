import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/api';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import ListingSlider from '../components/core/Catalog/ListingSlider';
import Listing_Card from '../components/core/Catalog/Listing_Card';

const Catalog = () => {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [active, setActive] = useState(1);
  const [categoryId, setCategoryId] = useState("");
  const [loading, setloading] = useState(true);

  // Fetch all categories
  useEffect(() => {
    setloading(true);
    const getCategories = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      const category_id = res.data.data.filter(
        (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
      )[0]._id;
      setCategoryId(category_id);
    };
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogaPageData(categoryId);
        setloading(false);
        setCatalogPageData(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  return (
    <div className="text-white">
      {loading ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">Loading...</div>
      ) : (
        <>
          {/* Hero Section */}
          <div className="bg-[#F0F2F6] px-4 py-8 md:py-12 lg:py-16">
            <div className="mx-auto max-w-maxContentTab">
              <p className="text-sm text-richblack-900">
                {`Home / Catalog / `}
                <span className="text-[#BCAD3C]">
                  {catalogPageData.data.selectedCategory.name}
                </span>
              </p>
              <p className="text-3xl text-richblack-900">
                {catalogPageData.data.selectedCategory.name}
              </p>
              <p className="max-w-[870px] text-richblack-900">
                {catalogPageData.data.selectedCategory.description}
              </p>
            </div>
          </div>

          {/* Section 1 */}
          <div className="w-full  px-4 py-8 lg:py-12">
            <div className="section_heading text-black text-xl font-bold">Listings to get you started</div>
            <div className="my-4 flex md:flex-row border-b border-b-richblack-600 text-sm">
              <p
                className={`mb-2 md:mb-0 md:mr-4 px-4 py-2 ${
                  active === 1 ? "border-b border-b-yellow-25 text-[#BCAD3C]" : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Popular
              </p>
              <p
                className={`px-4 py-2 ${
                  active === 2 ? "border-b border-b-yellow-25 text-yellow-25" : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
                New
              </p>
            </div>
            <div>
              <ListingSlider Listings={catalogPageData.data.selectedCategory.listings} />
            </div>
          </div>

          {/* Section 2 */}
          <div className=" w-full px-4 py-8 lg:py-12">
            <div className="section_heading text-black text-xl font-bold">
              Top listings in {catalogPageData.data.differentCategory.name}
            </div>
            <div className="py-8">
              <ListingSlider Listings={catalogPageData.data.differentCategory.listings} />
            </div>
          </div>

          {/* Section 3 */}
          <div className="w-full px-4 py-8 lg:py-12">
            <div className="section_heading text-black text-xl font-bold">Top Selling</div>
            <div className="py-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                {catalogPageData.data.topSellingListing
                  .slice(0, 4)
                  .map((listing, i) => (
                    <Listing_Card listing={listing} key={i} Height="h-[400px]" />
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Catalog;
