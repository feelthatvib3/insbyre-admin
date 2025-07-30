import { GithubAuthButton } from 'features/auth';

import { withPublicOnlyGuard } from 'shared/lib/with-public-only-guard';

function Page() {
  return (
    <main className="bg-background flex min-h-dvh flex-col items-center justify-center p-6 md:p-10">
      <div className="space-y-2">
        <h1 className="font-display text-2xl">Привет, логинимся?</h1>
        <GithubAuthButton />
      </div>
    </main>
  );
}
const LoginPage = withPublicOnlyGuard(Page);

export { LoginPage };
