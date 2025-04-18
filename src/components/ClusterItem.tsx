'use client';

import { useRouter } from 'next/navigation'; // En Next.js 13+ con app router

interface Article {
  url: string;
  political_stance: 'left' | 'center-left' | 'center' | 'center-right' | 'right';
}

interface ClusterItemProps {
  clusterId: string;
  name: string;
  count: number;
  articleList: Article[];
}

export default function ClusterItem({ clusterId, name, count, articleList }: ClusterItemProps) {
  const router = useRouter();

  // Normalize name
  name = name.charAt(0).toUpperCase() + name.slice(1).replace(/_/g, ' ');
  type PoliticalStance = 'left' | 'center-left' | 'center' | 'center-right' | 'right';

  const stanceColors: Record<PoliticalStance, string> = {
    'left': 'bg-red-500',
    'center-left': 'bg-red-400',
    'center': 'bg-gray-100',
    'center-right': 'bg-blue-400',
    'right': 'bg-blue-500',
  };
  
  const stanceCounts: Record<PoliticalStance, number> = {
    'left': 0,
    'center-left': 0,
    'center': 0,
    'center-right': 0,
    'right': 0,
  };
  
  articleList.forEach((article) => {
    if (stanceCounts.hasOwnProperty(article.political_stance)) {
      stanceCounts[article.political_stance]++;
    }
  });
  
  // Función para manejar el clic y navegar a la página de detalle
  const handleClick = () => {
    router.push(`/clusters/${clusterId}`);
  };

  return (
    <div 
      className="flex flex-row items-center bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:border-gray-300 transition-border duration-200 p-2"
      onClick={handleClick}
    >
      <div className="p-4 flex-9">
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <p className="text-xs text-gray-600">{count} artículos</p>
      </div>
      <div className="p-4 flex-1">
        <div className="flex flex-row items-stretch bg-gray-100 rounded-full w-16 h-16 overflow-hidden">
          {Object.entries(stanceCounts).map(([stance, count]) => (
            <div
              key={stance}
              style={{ flex: count }}
              className={stanceColors[stance as keyof typeof stanceColors]}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}