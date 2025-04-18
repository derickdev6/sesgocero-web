'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ArticleCard from '@/components/ArticleCard';

interface Article {
  url: string;
  title: string;
  subtitle: string | null;
  content: string;
  source: string;
  political_stance: 'left' | 'center-left' | 'center' | 'center-right' | 'right' | "unknown";
  date: string;
}

interface Cluster {
  _id: string;
  name: string;
  description?: string;
  articles: {
    count: number;
  };
  created_at: string;
  updated_at: string;
}

export default function ClusterDetail() {
  let clusterName = "Cluster";
  
  const params = useParams();
  const id = params?.id as string;
  
  const [cluster, setCluster] = useState<Cluster | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  if (cluster !== null) {
    clusterName = cluster.name.charAt(0).toUpperCase() + cluster.name.slice(1).replace(/_/g, ' ');
  }

  useEffect(() => {
    if (!id) return;

    const fetchClusterData = async () => {
      setLoading(true);
      try {
        const clusterRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/clusters/${id}`);
        const clusterData = await clusterRes.json();
        setCluster(clusterData);

        const articlesRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/articles/search?q=${id}`);
        const articlesData = await articlesRes.json();
        setArticles(articlesData);
      } catch (error) {
        console.error("Error fetching cluster data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClusterData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  if (!cluster) {
    return <div className="min-h-screen pt-16 px-4">Cluster no encontrado</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen pt-16 px-4">
      <section className="mb-8 w-5/6">
        <h1 className="text-4xl font-bold text-gray-800 text-center my-8">{clusterName}</h1>
        <p className="text-sm text-gray-400 text-center mb-4">
          Actualizado: {new Date(cluster.updated_at).toLocaleDateString()}
        </p>
        <p className="text-lg text-gray-500 text-center">{cluster.description}</p>
      </section>

      <section className="w-5/6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {cluster.articles.count} Artículos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.url} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}