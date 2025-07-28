export async function getMe(): Promise<{ login: string }> {
  const res = await fetch('http://localhost:8080/me', {
    credentials: 'include'
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}
