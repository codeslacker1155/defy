import { useState, useEffect, useCallback } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import NFTCard from '../components/NFTCard';
import NFTCardSkeleton from '../components/NFTCardSkeleton';
import { useNFTStore } from '../store/useNFTStore';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

function Marketplace() {
  const { nfts, loading, error, hasMore, fetchNFTs } = useNFTStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10]);
  const [selectedDesigner, setSelectedDesigner] = useState<string>('');
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'newest'>('newest');
  const [showFilters, setShowFilters] = useState(false);

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((filters: any) => {
      fetchNFTs(1, filters);
    }, 300),
    []
  );

  // Handle filter changes
  useEffect(() => {
    const filters = {
      search: searchTerm,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      designer: selectedDesigner,
      sortBy,
    };
    debouncedSearch(filters);
  }, [searchTerm, priceRange, selectedDesigner, sortBy]);

  // Infinite scroll
  const loadMoreRef = useIntersectionObserver(
    useCallback(
      (entry) => {
        if (entry.isIntersecting && !loading && hasMore) {
          const filters = {
            search: searchTerm,
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            designer: selectedDesigner,
            sortBy,
          };
          fetchNFTs(undefined, filters);
        }
      },
      [loading, hasMore, searchTerm, priceRange, selectedDesigner, sortBy]
    )
  );

  return (
    <div className="space-y-6 min-h-screen">
      <div className="sticky top-0 z-10 bg-white pb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold">NFT Marketplace</h1>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search NFTs..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <SlidersHorizontal className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 bg-white p-4 rounded-lg shadow-sm space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Price Range (SOL)</label>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Designer</label>
                <select
                  value={selectedDesigner}
                  onChange={(e) => setSelectedDesigner(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">All Designers</option>
                  {Array.from(new Set(nfts.map(nft => nft.designer))).map(designer => (
                    <option key={designer} value={designer}>{designer}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="newest">Newest First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nfts.map(nft => (
          <NFTCard key={nft.id} nft={nft} />
        ))}
        {loading && Array.from({ length: 3 }).map((_, i) => (
          <NFTCardSkeleton key={`skeleton-${i}`} />
        ))}
      </div>

      {!loading && !error && nfts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No NFTs found matching your criteria</p>
        </div>
      )}

      {hasMore && (
        <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
          {loading && <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />}
        </div>
      )}
    </div>
  );
}

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default Marketplace;