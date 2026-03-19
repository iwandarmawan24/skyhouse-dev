import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ConstructionProgress = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/construction-progress');
        if (response.data.data) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching construction progress:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading || !data) return null;

  return (
    <section className="relative overflow-hidden bg-[#1a3a7a]">
      {/* Yellow top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#f5c518] z-10" />

      <div className="padding-global">
        <div className="container-large">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-[280px] md:min-h-[320px]">
            {/* Left - Text Content */}
            <div className="py-12 md:py-16 pr-8 lg:pr-16">
              <h2 className="text-white font-bold text-2xl md:text-3xl lg:text-4xl uppercase tracking-wide mb-4">
                {data.title}
              </h2>
              {data.description && (
                <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-lg">
                  {data.description}
                </p>
              )}
            </div>

            {/* Right - Tilted Image with Overlay */}
            <div className="relative h-full flex items-center justify-center py-8 lg:py-0">
              <div
                className="relative w-full max-w-xl transform rotate-[-4deg] shadow-2xl rounded-lg overflow-hidden"
              >
                <img
                  src={data.image_url}
                  alt={data.title}
                  className="w-full h-48 md:h-64 lg:h-72 object-cover"
                />
                {/* Overlay band */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#1a3a7a]/80 backdrop-blur-sm px-6 py-4">
                  <h3 className="text-white font-bold text-lg md:text-xl">
                    Sky House Alam Sutera+
                  </h3>
                  <p className="text-[#f5c518] font-semibold text-xs md:text-sm uppercase tracking-wider">
                    Construction Progress
                  </p>
                  <p className="text-white/70 text-xs md:text-sm">
                    nothing can stop us from building your home
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Yellow bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#f5c518] z-10" />
    </section>
  );
};

export default ConstructionProgress;
