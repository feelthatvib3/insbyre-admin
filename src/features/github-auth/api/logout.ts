export async function logout() {
  const res = await fetch('http://localhost:8080/logout', {
    method: 'POST',
    credentials: 'include'
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res;
}
