'use client';

interface ArticleItemProps {
  title: string;
  description: string;
}

export default function ArticleItem({ title, description }: ArticleItemProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-100">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
