const BASE_URL = "http://localhost:5000/users";

export async function registerUser(userData) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to register user");
  }
  return res.json();
}

export async function loginUser(credentials) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return res.json();
}

export async function getUser(userId) {
  const res = await fetch(`${BASE_URL}/${userId}`);
  return res.json();
}

export async function updateUser(userId, userData) {
  const res = await fetch(`${BASE_URL}/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
}
