import React, { useState, useEffect } from "react";
import axios from "axios";
import calendarIcon from "../../assets/modal/calendar.svg";
import personIcon from "../../assets/modal/person.svg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import Card from "../card/card";

function CollectionModal({ collectionData }) {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCreatorCollections = async (creatorId, page = 1, limit = 20) => {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/collections', {
        params: {
          creatorId,
          page,
          limit,
          sort: "recently_added"
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching creator collections:', error);
      throw error;
    }
  };

  useEffect(() => {
    const loadCreatorCollections = async () => {
      if (!collectionData || !collectionData.creatorId) return;

      setLoading(true);
      setError(null);
      try {
        const data = await fetchCreatorCollections(collectionData.creatorId);
        setCollections(data.collections);
      } catch (error) {
        setError('Failed to load creator collections');
        console.error('Error loading creator collections:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCreatorCollections();
  }, [collectionData]);

  if (!collectionData) {
    return <div className="text-white">Loading collection data...</div>;
  }

  const firstNFT = collectionData.nfts && collectionData.nfts.length > 0 ? collectionData.nfts[0] : null;
  return (
      <section className="w-full max-w-[1260px] text-white bg-[#19162f] mx-auto my-auto">
      <div className="hidden lg:flex flex-col lg:flex-row gap-8">
        {/* Collection image (using first NFT image if available) */}
        {firstNFT && firstNFT.image && (
          <img
            src={firstNFT.image}
            alt={collectionData.name}
            className="hidden object-contain max-h-80 w-full lg:block max-w-[522px]"
          />
        )}

        {/* Right content - Desktop */}
        <div className="w-full space-y-3">
          {/* Collection Category Tag */}
          {firstNFT && firstNFT.category && (
            <div className="w-fit h-[32px] bg-card-tag rounded-lg p-[2px]">
              <div className="w-full h-full bg-black text-white rounded-lg flex justify-center items-center text-[14px] font-semibold px-3">
                {firstNFT.category.toUpperCase()}
              </div>
            </div>
          )}
          {/* Collection Name */}
          <h1 className="text-[40px] font-medium leading-8">{collectionData.name || 'Unnamed Collection'}</h1>
          <div className="flex items-center gap-3">
            {/* Creator name */}
            <div className="flex gap-3">
              {collectionData.creatorProfilePicture && (
                <img
                  src={collectionData.creatorProfilePicture}
                  alt={collectionData.creatorName}
                  className="w-[27px] aspect-square rounded-full"
                />
              )}
              <p className="font-bold">{collectionData.creatorName || 'Unknown Creator'}</p>
            </div>
            {/* Date */}
            {collectionData.createdAt && (
              <div className="flex gap-1">
                <img src={calendarIcon} alt="" />
                <p className="text-[#94A3B8] text-[12px]">{new Date(collectionData.createdAt).toLocaleDateString()}</p>
              </div>
            )}
            {/* Collectors */}
            {collectionData.collectorsCount !== undefined && (
              <div className="flex gap-1">
                <img src={personIcon} alt="" />
                <p className="text-[#94A3B8] text-[12px]">{collectionData.collectorsCount}</p>
              </div>
            )}
          </div>

          {/* About */}
          <div className="w-full border border-[#d0aaff30] rounded-lg space-y-3 p-5">
            <h3 className="font-medium">About</h3>
            <p className="text-[#94A3B8] text-sm leading-8">
              {collectionData.description || 'No description available.'}
            </p>
            {collectionData.createdAt && (
              <p className="text-[#94A3B8] text-[10px] leading-5 mt-3">
                Last updated: {new Date(collectionData.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>

            {/* Metadata */}
            <div className="w-full border border-[#d0aaff30] rounded-lg space-y-3 p-5">
              <h3 className="font-medium">Metadata</h3>
              <p className="text-[#94A3B8] text-sm leading-8">
                Top 20 Thankers will receive a legendary <br />
                Top 500 thankers are gauranteed a Rare.
              </p>
            </div>
          </div>
        </div>

        {/* Right Content - Mobile */}
        <div className="lg:hidden flex flex-col lg:flex-row gap-8 !overflow-y-scroll">
          {/* Right content */}
          <div className="w-full space-y-3">
            <div className="w-full space-y-3 bg-gradient-to-b from-[#211f4c] to-[#7921f6] p-4">
              {/* NFT Name */}
              <h1 className="text-[22px] font-medium leading-8">ALTA</h1>
              <div className="flex items-center gap-3">
                {/* Creator name */}
                <div className="flex gap-3">
              {collectionData.creatorProfilePicture && (
                <img
                  src={collectionData.creatorProfilePicture}
                  alt={collectionData.creatorName}
                  className="w-[27px] aspect-square rounded-full"
                />
              )}
                  <p className="font-bold">Demarco</p>
                </div>
                {/* Date */}
                <div className="flex gap-1">
                  <img src={calendarIcon} alt="" />
                  <p className="text-[#94A3B8] text-[12px]">07/03/20224</p>
                </div>
                {/* People */}
                <div className="flex gap-1">
                  <img src={personIcon} alt="" />
                  <p className="text-[#94A3B8] text-[12px]">1</p>
                </div>
              </div>

              {/* Big NFT image */}
              <img
                src={firstNFT.image}
                alt=""
                className="w-fit h-fit aspect-square"
              />
            </div>

            <div className="space-y-3 px-4">
              {/* About */}
              <div className="w-full border border-[#d0aaff30] rounded-lg space-y-3 p-5">
                <h3 className="font-medium">About</h3>
                <p className="text-[#94A3B8] text-sm leading-8">
                  Top 20 Thankers will receive a legendary <br />
                  80 random thankers will receive a legendary <br />
                  Top 500 thankers are gauranteed a Rare.
                </p>
                <p className="text-[#94A3B8] text-[10px] leading-5 mt-3">
                  Last updated: 05/09/2024
                </p>
              </div>

              {/* Metadata */}
              <div className="w-full border border-[#d0aaff30] rounded-lg space-y-3 p-5">
                <h3 className="font-medium">Metadata</h3>
                <p className="text-[#94A3B8] text-sm leading-8">
                  Top 20 Thankers will receive a legendary <br />
                  Top 500 thankers are gauranteed a Rare.
                </p>
              </div>
            </div>
          </div>
        </div>

      {/* Bottom cards carousel - Desktop */}
      <div className="hidden lg:block mt-10 space-y-10">
        <p>More from {collectionData.creatorName}</p>
        {loading && <p>Loading more collections...</p>}
        {error && <p>Error loading collections: {error}</p>}
        {!loading && !error && collections.length > 0 && (
          <Carousel>
            <CarouselContent className="w-fit">
              {collections.map((item) => (
                <CarouselItem key={item._id} className="basis-1/4 flex justify-center items-center">
                  <Card
                    id={item._id}
                    imageURL={item.image}
                    publishedDate={new Date(item.createdAt).toLocaleDateString()}
                    collectors={item.collectorsCount}
                    collectionName={item.name}
                    creatorName={item.creatorName}
                    likes={item.likesCount}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>

      {/* Bottom cards section - Mobile */}
      <div className="lg:hidden w-fit grid grid-cols-2 md:grid-cols-3 gap-2 place-items-center mt-3 px-4 mx-auto">
        {loading && <p>Loading more collections...</p>}
        {error && <p>Error loading collections: {error}</p>}
        {!loading && !error && collections.map((item) => (
          <Card
            key={item._id}
            id={item._id}
            imageURL={item.image}
            publishedDate={new Date(item.createdAt).toLocaleDateString()}
            collectors={item.collectorsCount}
            collectionName={item.name}
            creatorName={item.creatorName}
            likes={item.likesCount}
          />
        ))}
      </div>
    </section>
  );
}

export default CollectionModal;
