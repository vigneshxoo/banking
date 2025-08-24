import React from 'react';
import CountUp from "react-countup";

export const UserDetails = () => {
    return (
        <div className="w-full  bg-">
            {/* Header */}
            <div data-aos="fade-right" className="mt-20 md:mt-40 text-4xl md:text-5xl bg-[#6C4BD4] w-72 md:w-80 font-poppins font-bold text-white p-5 rounded-br-full">
                <span className="pl-5">About us</span>
            </div>

            {/* Metrics Row */}
            <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                {/* Business Partner */}
                <div className="flex items-end">
                    <span className="text-5xl md:text-6xl font-bold text-[#F65147]">
                        <CountUp start={1000} end={1500} duration={2.75} separator="" />
                        K
                    </span>
                    <span className="ml-4 text-base md:text-xl font-medium text-white">Business Partner</span>
                </div>

                {/* Divider */}
                <div className="hidden md:block h-12 w-px bg-gray-700 mx-8" aria-hidden="true"></div>

                {/* Active Customer */}
                <div className="flex items-end">
                    <span className="text-5xl md:text-6xl font-medium text-[#089EFF]">2M</span>
                    <span className="ml-4 text-base md:text-xl font-medium text-white">Active Customer</span>
                </div>
            </div>

            {/* Content Section */}
            <div className="mt-14 flex flex-col md:flex-row items-center justify-center gap-10 px-6 md:px-16">
                {/* Text */}
                <div data-aos="fade-right"
                    data-aos-offset="300"
                    data-aos-easing="ease-in-sine"
                    className="max-w-3xl text-center md:text-left">
                    <h1 className="text-3xl md:text-5xl text-white font-bold font-poppins tracking-wide leading-snug">
                        Empowering Financial <br className="hidden md:block" /> Freedom
                    </h1>
                    <p className="text-white font-poppins mt-5 leading-relaxed text-sm md:text-base">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit. Ut et massa mi.
                        Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
                        mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.
                    </p>
                </div>
                {/* Image */}
                <img data-aos="fade-left"
                    data-aos-offset="300"
                    data-aos-easing="ease-in-sine"
                    className="w-full  sm:w-2/3 md:w-[35%] h-auto object-contain"
                    src="https://envato.bdevs.net/finwise/wp-content/uploads/2023/10/banner-05.png"
                    alt="Financial Freedom"
                />
            </div>
        </div>
    );
};
