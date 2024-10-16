import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Navbar from "/src/components/navbar/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../src/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../src/components/ui/select.jsx";
import collectionsIcon from "../src/assets/filter/collectionsIcon.svg";
import personIcon from "../src/assets/filter/personIcon.svg";
import categoryIcon from "../src/assets/filter/categoryIcon.svg";
import sortIcon from "../src/assets/filter/sortbyIcon.svg";
import Card from "../src/components/card/card";
import { Link } from "react-router-dom";

const CATEGORY_OPTIONS = ["All", "Art", "Audio", "3D", "Gen AI"];
const SORT_OPTIONS = [
  { value: "recently_added", label: "Recently Added" },
  { value: "most_liked", label: "Most Liked" },
  { value: "most_collected", label: "Most Collected" },
];

function Collectibles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");
  const [sortBy, setSortBy] = useState("recently_added");
  const [subscribed, setSubscribed] = useState(false);

  const fetchCollections = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/v1/collections', {
        params: {
          category: selectedCategory === "All" ? undefined : selectedCategory,
          sort: sortBy,
          page: 1,
          limit: 20,
          subscribedOnly: subscribed
        }
      });
      setCollections(response.data.collections);
    } catch (err) {
      console.error("Error fetching collections:", err);
      setError('Failed to fetch collections: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, sortBy, subscribed]);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setSearchParams({ category: value === "All" ? "" : value });
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleTabChange = (value) => {
    setSubscribed(value === "subscribed");
  };

  const renderCollections = () => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (collections.length === 0) return <div>No collections found.</div>;

    return (
      <div className="w-fit max-w-[1260px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-5 place-items-center mx-auto">
        {collections.map((collection) => (
          <Card
            key={collection._id}
            id={collection._id}
            imageURL={collection.image}
            publishedDate={new Date(collection.createdAt).toLocaleDateString()}
            collectors={collection.collectorsCount}
            collectionName={collection.name}
            creatorName={collection.creatorName}
            likes={collection.likesCount}
          />
        ))}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#080114]">
      <Navbar />
      <section className="max-w-[1260px] px-2 py-4 flex justify-between lg:justify-between items-center mx-auto">
        <div className="flex gap-8 items-center">
          <h1 className="text-white text-[22px] font-bold leading-7 font-readex-pro">
            Explore
          </h1>
          <div className="space-x-2">
            <Link to="/creators">
              <button className="bg-[#1a0c38] text-white text-opacity-40 text-sm font-medium px-3 py-2 rounded-[40px] border-2 border-[#363355]">
                <div className="flex gap-2 items-center">
                  <p>Creators</p>
                  <img src={personIcon} alt="" />
                </div>
              </button>
            </Link>
            <Link to="/collections">
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
          <Select onValueChange={handleCategoryChange} value={selectedCategory}>
            <SelectTrigger
              icon={categoryIcon}
              className="border-2 border-[#363355] text-[#9A8FFF] bg-[#1E1B48] rounded-[40px] gap-2"
            >
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-[#1E1B48] font-semibold text-white border-2 border-[#9a8fff] rounded-xl font-readex-pro">
              {CATEGORY_OPTIONS.map((category) => (
                <SelectItem
                  key={category}
                  value={category}
                  className="focus:bg-[#D0AAFF33] focus:text-white py-3"
                >
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={handleSortChange} value={sortBy}>
            <SelectTrigger
              icon={sortIcon}
              className="hidden lg:flex border-2 border-[#363355] text-[#9A8FFF] bg-[#1E1B48] rounded-[40px] gap-2"
            >
              <SelectValue placeholder="Recently Added" />
            </SelectTrigger>
            <SelectContent className="bg-[#1E1B48] font-semibold text-white border-2 border-[#9a8fff] rounded-xl font-readex-pro">
              {SORT_OPTIONS.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="focus:bg-[#D0AAFF33] focus:text-white py-3"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      <section className="max-w-[1260px] bg-[#080114] px-2 py-4 mx-auto">
        <Tabs
          defaultValue="for you"
          className="w-full flex flex-col justify-center items-start"
          onValueChange={(value) => handleTabChange(value)}
        >
          <TabsList>
            <TabsTrigger value="for you">For you</TabsTrigger>
            <TabsTrigger value="subscribed">Subscribed</TabsTrigger>
          </TabsList>
          <TabsContent value="for you" className="mx-auto w-full">
            {renderCollections()}
          </TabsContent>
          <TabsContent value="subscribed" className="mx-auto w-full">
            {renderCollections()}
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}

export default Collectibles;
