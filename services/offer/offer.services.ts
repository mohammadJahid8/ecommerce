import { ENV } from '@/configs';

export async function getOffers() {
  try {
    const response = await fetch(ENV.API_URL + '/offers');
    const data = await response.json();

    return data;
  } catch (error) {
    return [];
  }
}

export async function getOfferTypes() {
  try {
    const response = await fetch(ENV.API_URL + '/offer_type');
    const data = await response.json();

    return data;
  } catch (error) {
    return [];
  }
}
