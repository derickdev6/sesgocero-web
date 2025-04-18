'use client';

import { useEffect, useState } from 'react';
import ClusterItem from '@/components/ClusterItem';
import SearchBar from '@/components/SearchBar';

interface Article {
  url: string;
  political_stance: 'left' | 'center-left' | 'center' | 'center-right' | 'right';
}

interface Cluster {
  _id: string;
  name: string;
  description?: string;
  articles: {
    list: Article[];
    count: number;
  };
}

export default function Home() {
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  useEffect(() => {
    const fetchClusters = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/clusters/latest`);
        const data = await res.json();
        setClusters(data);
      } catch (error) {
        console.error("Error fetching clusters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClusters();
  }, []);

  return (
    <div className="min-h-screen pt-16">
      {/* Landing Section */}
      <section className="h-[20vh] flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold mb-4 text-gray-800">SESGOCERO</h1>
        <p className="text-xl text-gray-500">Sin sesgos, solo datos</p>
      </section>

      {/* Search Section */}
      <div className="py-8 px-4">
        <SearchBar 
          onSearch={handleSearch}
          placeholder="Buscar noticias ..."
        />
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 mx-auto">
        {/* grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 */}

        <div className="col-span-3 lg:col-start-2 xl:col-start-3 p-4 flex flex-col gap-8">
          <h2 className="text-lg font-semibold text-gray-600 mb-4 text-center">
            Ultimas actualizaciones
          </h2>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
            </div>
          ) : (
            clusters.map((cluster) => (
              <ClusterItem
              key={cluster._id}
              clusterId={cluster._id}  
              name={cluster.name}
              count={cluster.articles.count}
              articleList={cluster.articles.list}
              />
            ))
          )}
        </div>

        <div className="hidden lg:block lg:col-span-1 lg:col-start-1 row-start-1 xl:col-span-2 p-4 "></div>

        <div className="hidden lg:block lg:col-span-1 lg:col-start-5 row-start-1 xl:col-span-2 xl:col-start-6 p-4"></div>
      </div>
    </div>
  );
}
