import React, { useState, useEffect } from "react";
import "../carousel/carouselStyles.css";
import useEmblaCarousel from "embla-carousel-react";
import CarouselSlide from "./carouselSlide";
import leftIcon from "../../assets/carousel/leftIcon.svg";
import rightIcon from "../../assets/carousel/rightIcon.svg";
import axios from "axios";

function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get('/api/v1/collections', {
          params: {
            category: undefined,
            sort: "recently_added",
            page: 1,
            limit: 4,
            subscribedOnly: false
          }
        });
        setCollections(response.data.collections);
      } catch (err) {
        console.error("Error fetching collections:", err);
      }
    };
    fetchCollections();
  }, []);

  return (
    <div
      ref={emblaRef}
      className="embla relative w-full max-w-[1400px] lg:rounded-2xl py-4 lg:py-14 mx-auto"
    >
      <div className="embla__container">
        {collections && collections.map((collection, index) => (
          <div key={index} className="embla__slide">
            <CarouselSlide
              collectionName={collection.name}
              creatorUserName={collection.creatorName}
              creatorPfp={collection.creatorProfilePicture}
              nftUrl={collection.image}
              publishedDate={collection.createdAt}
              collectorsCount={collection.collectorsCount}
            />
          </div>
        ))}
      </div>
      <div className="w-fit flex gap-4 mx-auto">
        <button
          onClick={() => emblaApi && emblaApi.scrollPrev()}
          className="w-fit lg:absolute lg:left-12 lg:top-1/2 lg:translate-y-[-50%]"
        >
          <img src={leftIcon} alt="" className="lg:w-12" />
        </button>
        <button
          onClick={() => emblaApi && emblaApi.scrollNext()}
          className="w-fit lg:absolute lg:right-12 lg:top-1/2 lg:translate-y-[-50%]"
        >
          <img src={rightIcon} alt="" className="lg:w-12" />
        </button>
      </div>
    </div>
  );
}

export default Carousel;
