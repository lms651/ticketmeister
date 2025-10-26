const VENUE_URL = "http://localhost:5000/venues";

// implemented
export async function getAllVenues() {
  const res = await fetch(`${VENUE_URL}`);
  return res.json();
}

export async function getVenueById(venueId) {
  const res = await fetch(`${VENUE_URL}/${venueId}`);
  return res.json();
}
