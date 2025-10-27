const VENUE_URL = `${import.meta.env.VITE_API_URL}/venues`;

export async function getAllVenues() {
  const res = await fetch(`${VENUE_URL}`);
  return res.json();
}

export async function getVenueById(venueId) {
  const res = await fetch(`${VENUE_URL}/${venueId}`);
  return res.json();
}
