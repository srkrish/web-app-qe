import axios from 'axios';
import { InventoryItem } from './types';

interface ApiProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface MappedProduct extends Omit<InventoryItem, 'id'> {
  id: string;
}

const API_BASE_URL = 'http://localhost:5001/api/products';

export const mapProductData = (product: ApiProduct): MappedProduct => {
  return {
    id: String(product.id),
    name: product.name,
    desc: product.description,
    price: product.price,
    image_url: product.imageUrl,
  };
};

export const getProducts = async (): Promise<MappedProduct[]> => {
  try {
    const response = await axios.get<ApiProduct[]>(API_BASE_URL);
    return response.data.map(mapProductData);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id: string): Promise<MappedProduct> => {
  try {
    const response = await axios.get<ApiProduct>(`${API_BASE_URL}/${id}`);
    return mapProductData(response.data);
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};