'use client';

import SearchBar from '@/components/SearchBar';

export default function Home() {
  const handleSearch = (query: string) => {
    // Here you'll implement the search logic
    console.log('Searching for:', query);
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Landing Section - 20vh height */}
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

      {/* Grid Section with 2-3-2 distribution */}
      <div className="grid grid-cols-7 gap-[20px]">
        {/* Left Section - 2 columns */}
        <div className="col-span-2 bg-gray-200 p-4">
          Left Section
        </div>

        {/* Middle Section - 3 columns */}
        <div className="col-span-3 bg-gray-200 p-4">
          Middle Section
        </div>

        {/* Right Section - 2 columns */}
        <div className="col-span-2 bg-gray-200 p-4">
          Right Section
        </div>
      </div>
    </div>
  );
}
