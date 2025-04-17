// components/ArticleCard.tsx

interface Article {
  url: string;
  title: string;
  subtitle: string | null;
  content: string;
  source: string;
  political_stance: 'left' | 'center-left' | 'center' | 'center-right' | 'right' | "unknown";
  date: string;
}

export default function ArticleCard({ article }: { article: Article }) {
  const { title, subtitle, content, source, url, political_stance, date } = article;

  type PoliticalStance = 'left' | 'center-left' | 'center' | 'center-right' | 'right' | "unknown";

  const borderColors: Record<PoliticalStance, string> = {
    'left': 'border-red-500 hover:shadow-[0_4px_6px_#ef4444]',
    'center-left': 'border-red-400 hover:shadow-[0_4px_6px_#f87171]',
    'center': 'border-gray-300 hover:shadow-[0_4px_6px_#d1d5db]',
    'center-right': 'border-blue-400 hover:shadow-[0_4px_6px_#60a5fa]',
    'right': 'border-blue-500 hover:shadow-[0_4px_6px_#3b82f6]',
    'unknown': 'border-gray-200 hover:shadow-[0_4px_6px_#e5e7eb]',
  };

  const borderClass = borderColors[political_stance] || 'border-gray-200';

  const displaySubtitle = subtitle || content.slice(0, 120) + (content.length > 120 ? '...' : '');

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-2 inline-block">
      <div
        className={`p-10 rounded-4xl transition-all duration-200 cursor-pointer border ${borderClass}`}
      >
        <h3 className="text-xl font-semibold text-gray-600 mb-4">{title}</h3>
        <p className="text-gray-600 text-sm leading-5 mb-4">{displaySubtitle}</p>
        <p className="text-gray-400 text-xs">{source}</p>
        <p className="text-gray-400 text-xs">{new Date(date).toLocaleDateString()}</p>
      </div>
    </a>
  );
}
