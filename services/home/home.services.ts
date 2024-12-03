import { ENV } from '@/configs';

export async function getProductPopulars() {
  try {
    const response = await fetch(ENV.API_URL + '/popular-products', {
      next: { revalidate: 10 },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return [];
  }
}

export async function getPopularCategories() {
  try {
    const response = await fetch(ENV.API_URL + '/popular-categories', {
      next: { revalidate: 10 },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return [];
  }
}

export async function getCategories() {
  try {
    const response = await fetch(ENV.API_URL + '/categories');

    const data = await response.json();

    return data;
  } catch (error) {
    return [];
  }
}
