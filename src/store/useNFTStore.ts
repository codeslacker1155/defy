import create from 'zustand';
import type { NFT } from '../types/nft';

interface NFTStore {
  nfts: NFT[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  currentPage: number;
  fetchNFTs: (page?: number, filters?: NFTFilters) => Promise<void>;
  likeNFT: (id: string) => void;
  purchaseNFT: (id: string) => Promise<void>;
}

interface NFTFilters {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  designer?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'newest';
}

// Mock data for demonstration
const mockNFTs: NFT[] = [
  {
    id: '1',
    name: 'Ethereal Dress Collection',
    description: 'Limited edition digital dress from Paris Fashion Week 2024',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    price: 2.5,
    designer: 'Stella McCartney',
    collection: 'Spring 2024',
    attributes: {
      size: 'M',
      color: 'Iridescent',
      material: 'Digital Silk',
    },
    owner: '0x123...',
    listed: true,
  },
  // ... more mock NFTs
];

const ITEMS_PER_PAGE = 9;

export const useNFTStore = create<NFTStore>((set, get) => ({
  nfts: [],
  loading: false,
  error: null,
  hasMore: true,
  currentPage: 1,

  fetchNFTs: async (page = 1, filters = {}) => {
    try {
      set({ loading: true, error: null });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filter and paginate mock data
      let filteredNFTs = [...mockNFTs];
      
      if (filters.search) {
        filteredNFTs = filteredNFTs.filter(nft => 
          nft.name.toLowerCase().includes(filters.search!.toLowerCase()) ||
          nft.designer.toLowerCase().includes(filters.search!.toLowerCase())
        );
      }
      
      if (filters.minPrice !== undefined) {
        filteredNFTs = filteredNFTs.filter(nft => nft.price >= filters.minPrice!);
      }
      
      if (filters.maxPrice !== undefined) {
        filteredNFTs = filteredNFTs.filter(nft => nft.price <= filters.maxPrice!);
      }
      
      if (filters.designer) {
        filteredNFTs = filteredNFTs.filter(nft => nft.designer === filters.designer);
      }
      
      if (filters.sortBy) {
        filteredNFTs.sort((a, b) => {
          switch (filters.sortBy) {
            case 'price_asc':
              return a.price - b.price;
            case 'price_desc':
              return b.price - a.price;
            default:
              return 0;
          }
        });
      }
      
      const start = (page - 1) * ITEMS_PER_PAGE;
      const paginatedNFTs = filteredNFTs.slice(start, start + ITEMS_PER_PAGE);
      
      set(state => ({
        nfts: page === 1 ? paginatedNFTs : [...state.nfts, ...paginatedNFTs],
        currentPage: page,
        hasMore: start + ITEMS_PER_PAGE < filteredNFTs.length,
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to fetch NFTs', loading: false });
    }
  },

  likeNFT: (id: string) => {
    // Implement like functionality
    console.log('Liked NFT:', id);
  },

  purchaseNFT: async (id: string) => {
    // Implement purchase functionality
    console.log('Purchased NFT:', id);
  },
}));