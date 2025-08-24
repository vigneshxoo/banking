import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeftLong } from "react-icons/fa6";


function AutoPlay() {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: false,
  };

  const loans = [
    {
      title: "Home Loan",
      description: "Affordable rates with flexible repayment options.",
    },
    {
      title: "Personal Loan",
      description: "Quick approval for your urgent needs.",
    },
    {
      title: "Car Loan",
      description: "Drive your dream car with easy EMI plans.",
    },
    {
      title: "Business Loan",
      description: "Empowering your business growth with capital.",
    },
    {
      title: "Education Loan",
      description: "Supporting your academic aspirations globally.",
    },
    {
      title: "Gold Loan",
      description: "Instant loan against your gold assets.",
    },
  ];

  return (
    <div className="slider-container h-20 overflow-hidden  slide">
      <Slider {...settings}>
        {loans.map((loan, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center h-20 text-white p-6 rounded-lg shadow-lg mx-2"
          >
            <h3 className="sm:text-sm xl:text-xl font-bold mb-2">{loan.title}</h3>
            <FaArrowLeftLong />

            {/* <p className="text-sm text-center">{loan.description}</p> */}
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default AutoPlay;
