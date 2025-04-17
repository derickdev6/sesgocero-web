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

  console.log(clusters);

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
      <div className="grid grid-cols-7 gap-[20px]">
        <div className="col-span-2 p-4"></div>

        <div className="col-span-3 p-4 flex flex-col gap-4">
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

        <div className="col-span-2 p-4"></div>
      </div>
    </div>
  );
}
