import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { Heading, Text } from '@/Components/Frontend/atoms';

const Employee = ({
  title = <>Meet Our <span className="font-bodoni !italic">Team</span></>,
  subtitle = null,
  members = [],
  className = 'bg-white',
}) => {
  const { settings } = usePage().props;
  const resolvedSubtitle = subtitle ?? settings?.sections?.top_sales_subtitle ?? 'Meet our top performing sales consultants, ready to assist you every step of the way.';

  const [activeIndex, setActiveIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const displayMembers = members.slice(0, 3);

  useEffect(() => {
    if (displayMembers.length === 0) return;
    const interval = setInterval(() => {
      if (!isPaused) {
        setActiveIndex((prevIndex) => (prevIndex + 1) % displayMembers.length);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, displayMembers.length]);

  if (displayMembers.length === 0) return null;

  return (
    <section className={`py-16 md:py-24 ${className}`} data-section="top-sales">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col !text-center items-center mb-12">
          <Heading as="h2" variant="section" color="skyhouse-ocean" className="mb-4">
            Top <span className="font-bodoni !italic">Sales</span> of the Month
          </Heading>
          <Text size="lg" color="slate" className="max-w-2xl mx-auto">
            {resolvedSubtitle}
          </Text>
        </div>

        <div
          className="flex gap-4 lg:gap-6 !h-[300px] md:!h-[500px] overflow-hidden max-w-6xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {displayMembers.map((member, index) => (
            <div
              key={member.id || index}
              onClick={() => setActiveIndex(index)}
              className={`relative overflow-hidden rounded-3xl shadow-xl transition-all duration-700 ease-out will-change-[flex-grow] group cursor-pointer ${
                index === activeIndex
                  ? 'flex-[3] md:flex-none aspect-square md:h-full'
                  : 'flex-1 hover:flex-[1.5]'
              }`}
            >
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className={`absolute bottom-0 left-0 right-0 p-6 lg:p-8 transition-all duration-500 ease-out ${
                index === activeIndex
                  ? 'opacity-100 translate-y-0 delay-200'
                  : 'opacity-0 translate-y-2 lg:opacity-100 lg:translate-y-0'
              }`}>
                <Heading as="h3" className="mb-2" color="white">
                  {member.name}
                </Heading>
                {(member.role || member.position) && (
                  <Text size="sm" color="white" className="mb-4 opacity-90">
                    {member.role || member.position}
                  </Text>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Employee;
