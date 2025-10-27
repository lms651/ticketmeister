const SIGNUP_URL = `${import.meta.env.VITE_API_URL}/signups`;

export async function createSignUp(signupData) {
  const res = await fetch(`${SIGNUP_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(signupData),
  });
  return res.json();
}

export async function getSignUpsByVenue(venueId) {
  const res = await fetch(`${SIGNUP_URL}/venue/${venueId}`);
  return res.json();
}

export async function getSignUpsByUser(userId) {
  const res = await fetch(`${SIGNUP_URL}/user/${userId}`);
  return res.json();
}
