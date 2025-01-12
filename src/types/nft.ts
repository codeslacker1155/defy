export interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  designer: string;
  collection?: string;
  attributes: {
    size?: string;
    color?: string;
    material?: string;
    condition?: string;
  };
  owner: string;
  listed: boolean;
}