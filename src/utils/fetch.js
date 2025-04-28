export async function fetchAnime(path = '') {
  const baseURL = 'https://api-helidesu-mahwa-production.up.railway.app/api/';
  const fullURL = `${baseURL}${path}`;

  try {
      const response = await fetch(fullURL); // Tidak pakai signal
      if (!response.ok) throw new Error('Failed to fetch');

      const data = await response.json();
      return data;
  } catch (err) {
      console.error('Error fetching anime:', err);
      return null;
  }
}
