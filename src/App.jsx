import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import Card from "./components/card/card.jsx";
import Navbar from "./components/navbar/navbar.jsx";
import CreatorCard from "./components/creator-card/creatorCard.jsx";
import "./App.css";
import categories from "./constants/categoryConstants.jsx";
import CategoryCard from "./components/category-card/categoryCard.jsx";
import Carousel from "./components/carousel/carousel.jsx";
import categoryIcon from "./assets/filter/filterIcon.svg";
import sortIcon from "./assets/filter/sortbyIcon.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select.jsx";

const CATEGORY_OPTIONS = ["All", "Art", "Audio", "3D", "Gen AI"];
const SORT_OPTIONS = [
  { value: "recently_added", label: "Recently Added" },
  { value: "most_liked", label: "Most Liked" },
  { value: "most_collected", label: "Most Collected" },
];

function App() {
  const [collections, setCollections] = useState([]);
  const [topCollections, setTopCollections] = useState([]);
  const [topBids, setTopBids] = useState([]);
  const [topCreators, setTopCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("recently_added");

  const fetchCollections = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/v1/collections', {
        params: {
          category: selectedCategory === "All" ? undefined : selectedCategory,
          sort: sortBy,
          page: 1,
          limit: 8,
        }
      });
      setCollections(response.data.collections);
    } catch (err) {
      console.error("Error fetching collections:", err);
      setError('Failed to fetch collections: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, sortBy]);

  const fetchTopCollections = useCallback(async () => {
    try {
      const response = await axios.get('/api/v1/collections', {
        params: { page:1, limit: 5, sort: "most_collected" }
      });
      setTopCollections(response.data.collections);
    } catch (err) {
      console.error("Error fetching top collections:", err);
    }
  }, []);

  const fetchTopBids = useCallback(async () => {
    try {
      const response = await axios.get('/api/v1/collections', {
        params: { page:1, limit: 4, sort: "most_liked" }
      });
      setTopBids(response.data.collections);
    } catch (err) {
      console.error("Error fetching top Bids:", err);
    }
  }, []);

  const fetchTopCreators = useCallback(async () => {
    try {
      const response = await axios.get('/api/v1/creators', {
        params: { limit: 5 , sortBy: "most_subscribers"}
      });
      setTopCreators(response.data);
    } catch (err) {
      console.error("Error fetching top creators:", err);
    }
  }, []);

  useEffect(() => {
    Promise.all([fetchCollections(), fetchTopCollections(), fetchTopBids(), fetchTopCreators()]);
  }, [fetchCollections, fetchTopCollections, fetchTopCreators, fetchTopBids]);

  const handleCategoryChange = useCallback((value) => {
    setSelectedCategory(value);
  }, []);

  const handleSortChange = useCallback((value) => {
    setSortBy(value);
  }, []);

  const renderCategories = useMemo(() => (
    categories.map((item) => (
      <CategoryCard
        key={item.id}
        imageURL={item.imageURL}
        name={item.name}
      />
    ))
  ), []);

  const renderTopCreators = useMemo(() => (
    topCreators.map((creator, index) => (
      <CreatorCard
        key={creator.id}
        imageURL={creator.creatorIcon}
        cardNo={index + 1}
        amount={creator.subscriberCount}
        creatorName={creator.name}
        href={`/${creator.name}`}
      />
    ))
  ), [topCreators]);

  const renderTopCollections = useMemo(() => (
    topCollections.map((collection, index) => (
              <CreatorCard
                key={collection._id}
                imageURL={collection.image}
                cardNo={index + 1}
                amount={collection.collectorsCount}
                creatorName={collection.name}
                href={`/${collection.creatorName}/${collection._id}`}
              />
    ))
  ), [topCollections]);

  const renderTopBids = useMemo(() => (
    topBids.map((collection, index) => (
      <Card
        key={collection._id}
        id={collection._id}
        imageURL={collection.image}
        publishedDate={new Date(collection.createdAt).toLocaleDateString()}
        collectors={collection.collectorsCount}
        collectionName={collection.name}
        creatorName={collection.creatorName}
        likes={collection.likesCount}
        showAvatars
      />
    ))
  ), [topBids]);

  const renderCollections = useMemo(() => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (collections.length === 0) return <div>No collections found.</div>;

    return collections.map((collection) => (
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
    ));
  }, [collections, loading, error]);

  return (
    <>
      <Navbar />

      <section className="bg-[#100E1F] lg:p-8">
        <Carousel />
      </section>

      <section className="w-full bg-[#100E1F] py-8 px-2 overflow-auto xl:overflow-hidden">
        <div className="w-fit max-w-[1260px] flex flex-nowrap gap-[10px] mx-auto">
          {renderCategories}
        </div>
      </section>

      <section className="w-full bg-[#100E1F] px-2 py-4 lg:py-20 space-y-4 lg:space-y-6">
        <div className="max-w-[1260px] flex justify-between text-white font-readex-pro mx-auto">
          <div>
            <p className="text-sm text-[#94A3B8]">Top collections</p>
            <h2 className="text-2xl font-semibold leading-7">
              Exclusive drops
            </h2>
          </div>
          <a href="" className="text-sm text-[#A87EFF] my-auto">
            See all
          </a>
        </div>
        <div className="w-full max-w-[1260px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 place-items-between mx-auto">
          {renderTopCollections}
        </div>
      </section>

      <section className="w-full bg-[#151329] px-2 py-4 lg:py-20 space-y-4 lg:space-y-6">
        <div className="max-w-[1260px] flex justify-between text-white font-readex-pro mx-auto">
          <div>
            <p className="text-sm text-[#94A3B8]">New & worthy</p>
            <h2 className="text-2xl font-semibold leading-7">Hot bids</h2>
          </div>
          <a href="" className="text-sm text-[#A87EFF] my-auto">
            See all
          </a>
        </div>
        <div className="w-fit max-w-[1260px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-5 place-items-center mx-auto">
          {renderTopBids}
        </div>
      </section>

      <section className="w-full bg-[#100E1F] px-2 py-4 lg:py-20 space-y-4 lg:space-y-6">
        <div className="max-w-[1260px] flex justify-between text-white font-readex-pro mx-auto">
          <div>
            <p className="text-sm text-[#94A3B8]">Most active</p>
            <h2 className="text-2xl font-semibold leading-7">Top Creators</h2>
          </div>
          <a href="" className="text-sm text-[#A87EFF] my-auto">
            See all
          </a>
        </div>
        <div className="w-full max-w-[1260px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 place-items-between mx-auto">
          {renderTopCreators}
        </div>
      </section>

      <section className="w-full bg-[#151329] px-2 py-4 lg:py-20 space-y-4 lg:space-y-6">
        <div className="max-w-[1260px] flex justify-between text-white font-readex-pro mx-auto">
          <div>
            <p className="text-sm text-[#94A3B8]">Top collections</p>
            <h2 className="text-2xl font-semibold leading-7">Explore</h2>
          </div>
          <div className="my-auto">
            <div className="flex gap-4">
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
          </div>
        </div>
        <div className="w-fit max-w-[1260px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-5 place-items-center mx-auto">
          {renderCollections}
        </div>
      </section>
    </>
  );
}

export default App;
