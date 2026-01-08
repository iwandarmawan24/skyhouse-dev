import React from 'react';
import { Text, Heading } from '@/Components/Frontend/atoms';

export default function Services() {
  return (
    <>
      <section className="services-section py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="services-grid grid grid-cols-1 lg:grid-cols-2 gap-6 lg:grid-rows-3">
            {/* Left - Large Services Image */}
            <div className="services-hero relative rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:row-span-3 group cursor-pointer order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=900&fit=crop&q=80"
                alt="Modern Architecture"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12">
                <Heading as="h2" variant="display" color="white" className="tracking-wider font-light">
                  Project Name 
                </Heading>
              </div>
              <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                <Text as="span" size="sm" weight="medium" color="charcoal">Project Category</Text>
              </div>
            </div>

            {/* Architecture Card */}
            <div className="service-card bg-gradient-to-br from-blue-50 to-cyan-100 rounded-3xl p-8 flex flex-col justify-center order-1 lg:order-2">
              <Heading as="h3" variant="card" className="mb-3">About</Heading>
              <Heading as="h3" variant="card" bodoni className="mb-3 italic">Skyhouse Alam Sutera</Heading>
              <div className="block bg-blue-300 h-1 w-16 my-4"></div>
              <Text size="base" color="charcoal">
                From vision to reality, we shape innovative structures that seamlessly merge modern aesthetics with eco-friendly principles, redefining urban landscapes.
              </Text>
            </div>

            {/* Interior Design Card */}
            <div className="service-card relative rounded-3xl overflow-hidden min-h-[250px] group cursor-pointer order-3">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=675&fit=crop&q=80"
                alt="Interior Design"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 right-6 text-right">
                <Heading as="h3" variant="card" color="white" className="mb-2">Interior Design</Heading>
                <Text size="sm" color="white" className="max-w-xs opacity-90">
                  We create interiors that reflect your personality while embracing nature's beauty.
                </Text>
              </div>
            </div>

            {/* Exterior Design Card */}
            <div className="service-card relative rounded-3xl overflow-hidden min-h-[250px] group cursor-pointer order-4">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=675&fit=crop&q=80"
                alt="Exterior Design"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <Heading as="h3" variant="card" color="white" className="mb-2">Exterior Design</Heading>
                <Text size="sm" color="white" className="max-w-xs opacity-90">
                  Contemporary style with environmentally conscious landscaping solutions.
                </Text>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="bg-ocean-blue"
      >
        <div className="architect-section">
          <div className="mb-12">
            <div className="text-center">
              <div className="max-w-3xl mx-auto">
                <Heading 
                  as="h4" 
                  variant="subsection" 
                  color="white"
                  weight="light"
                  align="center"
                >
                  Proudly designed by
                </Heading>
              </div>
            </div>
          </div>
          <div className="logo_wrapper align-center">
            <div className="logo_img-wrapper">
              <img
                src="https://cdn.prod.website-files.com/6507e5069d2b6119052df387/654870859326159aef820b0a_logo%20arkides%20putih%201.webp"
                alt="Arkides"
                className="logo_arsitek"
                loading="lazy"
              />
            </div>
            <div className="logo_img-wrapper is-medium">
              <img
                src="https://cdn.prod.website-files.com/6507e5069d2b6119052df387/654870867a4896c258eb019c_logo%20dhaniesal%20putih%201.webp"
                alt="Dhanie Sal"
                className="logo_arsitek"
                loading="lazy"
              />
            </div>
            <div className="logo_img-wrapper is-medium">
              <img
                src="https://cdn.prod.website-files.com/6507e5069d2b6119052df387/65576fb85f9fd1c3d8de19a5_logo%20rafaelmiranti%201.webp"
                alt="Rafael Miranti"
                className="logo_arsitek"
                loading="lazy"
              />
            </div>
            <div className="logo_img-wrapper is-medium">
              <img
                src="https://cdn.prod.website-files.com/6507e5069d2b6119052df387/675a664cd3e1a57016716c0e_kevintan-logo.png"
                alt="Kevin Tan"
                className="logo_arsitek"
                loading="lazy"
              />
            </div>
            <div className="logo_img-wrapper is-medium">
              <img
                src="https://cdn.prod.website-files.com/6507e5069d2b6119052df387/6548722cdf1bfe388e78f945_logo%20pranala%20putih%201.webp"
                alt="Pranala"
                className="logo_arsitek"
                loading="lazy"
              />
            </div>
            <div className="logo_img-wrapper is-medium">
              <img
                src="https://cdn.prod.website-files.com/6507e5069d2b6119052df387/689969d15baf4cd978419273_logo-spoa.png"
                alt="SPOA"
                className="logo_arsitek"
                loading="lazy"
              />
            </div>
            <div className="logo_img-wrapper is-potrait">
              <img
                src="https://cdn.prod.website-files.com/6507e5069d2b6119052df387/654870861c79cfcab476b42d_logo%20kara%20putih%201.webp"
                alt="KARA"
                className="logo_arsitek"
                loading="lazy"
              />
            </div>
            <div className="logo_img-wrapper is-xsmall">
              <img
                src="https://cdn.prod.website-files.com/6507e5069d2b6119052df387/6548722c29d7c8ad6c497235_logo%20tamara%20wibowo%20putih%201.webp"
                alt="Tamara Wibowo"
                className="logo_arsitek"
                loading="lazy"
              />
            </div>
            <div className="logo_img-wrapper is-potrait">
              <img
                src="https://cdn.prod.website-files.com/6507e5069d2b6119052df387/65487087d4f6279df27533cd_logo%20ruang%20rona%20putih%201.webp"
                alt="Ruang Rona"
                className="logo_arsitek"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
