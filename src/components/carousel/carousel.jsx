import React from "react";
import "../carousel/carouselStyles.css";
import useEmblaCarousel from "embla-carousel-react";
import CarouselSlide from "./carouselSlide";
import leftIcon from "../../assets/carousel/leftIcon.svg";
import rightIcon from "../../assets/carousel/rightIcon.svg";
import graphic from "../../assets/carousel/carouselBgGraphic.svg"

function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  return (
    <div
      ref={emblaRef}
      className="embla relative w-full max-w-[1400px] lg:rounded-2xl py-4 lg:py-14 mx-auto"
    >
      {/* <img src={graphic} alt="" className="hidden lg:block absolute  right-0 opacity-50 blur-sm" /> */}
      {/* Carousel slides container */}
      <div className="embla__container">
        <div className="embla__slide">
          <CarouselSlide />
        </div>
        <div className="embla__slide">
          <CarouselSlide />
        </div>
        <div className="embla__slide">
          <CarouselSlide />
        </div>
      </div>

      {/* next-prev buttons */}
      <div className="w-fit flex gap-4 mx-auto">
        <button
          onClick={() => emblaApi.scrollPrev()}
          className="w-fit lg:absolute lg:left-12 lg:top-1/2 lg:translate-y-[-50%]"
        >
          <img src={leftIcon} alt="" className="lg:w-12" />
        </button>
        <button
          onClick={() => emblaApi.scrollNext()}
          className="w-fit lg:absolute lg:right-12 lg:top-1/2 lg:translate-y-[-50%]"
        >
          <img src={rightIcon} alt="" className="lg:w-12" />
        </button>
      </div>
    </div>
  );
}

export default Carousel;
