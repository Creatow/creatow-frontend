import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../src/components/navbar/navbar";
import personIcon from "../src/assets/filter/personIcon.svg";
import categoryIcon from "../src/assets/filter/categoryIcon.svg";
import sortIcon from "../src/assets/filter/sortbyIcon.svg";
import collectionsIcon from "../src/assets/filter/collectionsIcon.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../src/components/ui/select.jsx";
import CreatorCardBig from "../src/components/creator-card-big/CreatorCardBig";
import { Link } from "react-router-dom";

function Creators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("recently_added");

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await axios.get('/api/v1/creators', {
          params: { category: selectedCategory || undefined }
        });
        console.log('API Response:', response.data); // Log the response data
        setCreators(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching creators:', err); // Log any errors
        setError('Failed to fetch creators');
        setLoading(false);
      }
    };

    fetchCreators();
  }, [selectedCategory, sortBy]);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value === "All" ? "" : value);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  console.log('Creators state:', creators); // Log the creators state

  return (
    <main className="min-h-screen bg-[#080114]">
      <Navbar />

      {/* Top heading and buttons */}
      <section className="max-w-[1260px] px-2 py-4 flex justify-between lg:justify-between items-center mx-auto">
        <div className="flex gap-8 items-center">
          <h1 className="text-white text-[22px] font-bold leading-7 font-readex-pro">
            Explore
          </h1>
          <div className="space-x-2">
    <Link to={'/creators'}>
            <button className="bg-[#1a0c38] text-white text-opacity-40 text-sm font-medium px-3 py-2 rounded-[40px] border-2 border-[#363355]">
              <div className="flex gap-2 items-center">
                <p>Creators</p>
                <img src={personIcon} alt="" />
              </div>
            </button>
    </Link>
    <Link to={'/collections'}>
            <button className="bg-[#1a0c38] text-white text-opacity-40 text-sm font-medium px-3 py-2 rounded-[40px] border-2 border-[#363355]">
              <div className="flex gap-2 items-center">
                <p>Collections</p>
                <img src={collectionsIcon} alt="" />
              </div>
            </button>
    </Link>
          </div>
        </div>
        <div className="hidden lg:flex gap-4 font-readex-pro">
          <Select onValueChange={(value) => handleCategoryChange(value)}>
            <SelectTrigger
              icon={categoryIcon}
              className="border-2 border-[#363355] text-[#9A8FFF] bg-[#1E1B48] rounded-[40px] gap-2"
            >
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-[#1E1B48] font-semibold text-white border-2 border-[#9a8fff] rounded-xl font-readex-pro">
              <SelectItem
                value="All"
                className="focus:bg-[#D0AAFF33] focus:text-white py-3"
              >
                All
              </SelectItem>
              <SelectItem
                value="Art"
                className="focus:bg-[#D0AAFF33] focus:text-white py-3"
              >
                Art
              </SelectItem>
              <SelectItem
                value="Audio"
                className="focus:bg-[#D0AAFF33] focus:text-white py-3"
              >
                Audio
              </SelectItem>
              <SelectItem
                value="3D"
                className="focus:bg-[#D0AAFF33] focus:text-white py-3"
              >
                3D
              </SelectItem>
              <SelectItem
                value="Gen AI"
                className="focus:bg-[#D0AAFF33] focus:text-white py-3"
              >
                GenAI
              </SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={handleSortChange}>
            <SelectTrigger
              icon={sortIcon}
              className="hidden lg:flex border-2 border-[#363355] text-[#9A8FFF] bg-[#1E1B48] rounded-[40px] gap-2"
            >
              <SelectValue placeholder="Recently Added" />
            </SelectTrigger>
            <SelectContent className="bg-[#1E1B48] font-semibold text-white border-2 border-[#9a8fff] rounded-xl font-readex-pro">
              <SelectItem
                value="recently_added"
                className="focus:bg-[#D0AAFF33] focus:text-white py-3"
              >
                Recently Added
              </SelectItem>
              <SelectItem
                value="most_liked"
                className="focus:bg-[#D0AAFF33] focus:text-white py-3"
              >
                Most Liked
              </SelectItem>
              <SelectItem
                value="most_collected"
                className="focus:bg-[#D0AAFF33] focus:text-white py-3"
              >
                Most Collected
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

<section className="max-w-[1260px] bg-[#080114] px-2 py-4 mx-auto">
  <div className="w-fit mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 content-center place-items-center">
    {(loading ? placeholderCreators : creators).map((creator) => (
      <CreatorCardBig
        key={creator.id}
        name={creator.name}
        username={creator.username}
        creatorIcon={creator.creatorIcon}
        artwork1={creator.topNfts && creator.topNfts[0] ? creator.topNfts[0].image : null}
        artwork2={creator.topNfts && creator.topNfts[1] ? creator.topNfts[1].image : null}
        artwork3={creator.topNfts && creator.topNfts[2] ? creator.topNfts[2].image : null}
        collectionCount={creator.collectionCount}
        isLoading={loading}
      />
    ))}
  </div>
</section>

      {error && <div className="text-red-500 text-center mt-4">{error}</div>}
    </main>
  );
}

export default Creators;
