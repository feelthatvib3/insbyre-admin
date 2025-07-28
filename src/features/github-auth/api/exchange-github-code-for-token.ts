export async function exchangeGithubCodeForToken(code: string) {
  const res = await fetch(`${import.meta.env.VITE_WORKER_URL}/auth?code=${code}`, {
    credentials: 'include'
  });

  if (!res.ok) {
    throw new Error('GitHub авторизация не прошла успешно');
  }
}
