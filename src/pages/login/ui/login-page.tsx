import { GithubAuthButton } from 'features/github-auth';

export function LoginPage() {
  return (
    <div className="bg-background flowers-01 flex min-h-dvh flex-col items-center justify-center p-6 md:p-10">
      <div className="space-y-2">
        <h1 className="font-display text-2xl">Привет, логинимся?</h1>
        <GithubAuthButton />
      </div>
    </div>
  );
}
