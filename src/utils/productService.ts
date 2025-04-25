import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api/products';

export const mapProductData = (product: any) => {
  return {
    ...product,
    image_url: product.imageUrl,
    desc: product.description,
  };
};

export const getProducts = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data.map(mapProductData);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return mapProductData(response.data);
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};