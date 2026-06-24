import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Awards = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/awards');
        if (response.data.data) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching awards:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading || !data || !data.image_url) return null;

  return (
    <section className="w-full overflow-hidden"  data-section="awards">
      <img
        src={data.image_url}
        alt="Awards"
        style={{ maxHeight: '380px' }}
        className="w-full h-full object-cover object-center block"
      />
    </section>
  );
};

export default Awards;
