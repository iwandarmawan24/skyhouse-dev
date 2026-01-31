import React, { useState, useEffect } from 'react';
import { Heading, Text } from '@/Components/Frontend/atoms';

const Employee = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const employees = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'Senior Property Consultant',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Real Estate Specialist',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'Customer Relations Manager',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setActiveIndex((prevIndex) => (prevIndex + 1) % employees.length);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, employees.length]);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col !text-center items-center mb-12">
          <Heading as="h2" variant="section" color="skyhouse-ocean" className="mb-4">
            Top <span className="font-bodoni !italic">Sales</span> of the Month
          </Heading>
          <Text size="lg" color="slate" className="max-w-2xl mx-auto">
            Our dedicated professionals are here to help you find your perfect home
          </Text>
        </div>

        <div 
          className="flex gap-4 lg:gap-6 !h-[300px] md:!h-[500px] overflow-hidden max-w-6xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {employees.map((employee, index) => (
            <div
              key={employee.id}
              onClick={() => setActiveIndex(index)}
              className={`relative overflow-hidden rounded-3xl shadow-xl transition-all duration-700 ease-in-out group cursor-pointer ${
                index === activeIndex 
                  ? 'flex-[3] md:flex-[4] lg:flex-[5]' 
                  : 'flex-1 hover:flex-[1.5]'
              }`}
            >
              <img
                src={employee.image}
                alt={employee.name}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className={`absolute bottom-0 left-0 right-0 p-6 lg:p-8 transition-opacity duration-500 ${
                index === activeIndex ? 'opacity-100' : 'opacity-0 lg:opacity-100'
              }`}>
                {index === activeIndex && (
                    <>
                        <Heading as="h3" className="mb-2" color="white">
                        {employee.name}
                        </Heading>
                        <Text size="sm" color="white" className="mb-4 opacity-90">
                        {employee.position}
                        </Text>
                    </>
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
