import { ENV } from '@/configs';

export async function getSmartsHome() {
  try {
    const response = await fetch(ENV.API_URL + '/smarts-home', {
      next: { revalidate: 1000 },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    return [];
  }
}
