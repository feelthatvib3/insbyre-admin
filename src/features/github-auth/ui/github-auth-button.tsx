import { GithubLogoIcon, SpinnerIcon } from '@phosphor-icons/react';
import { useState } from 'react';

export function GithubAuthButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleOnClick() {
    setIsLoading(true);
    window.location.href = 'http://localhost:8080/auth';
  }

  return (
    <button
      disabled={isLoading}
      onClick={handleOnClick}
      className="bg-united-nations-blue/5 border-united-nations-blue/25 hover:bg-united-nations-blue/10 text-united-nations-blue hover:border-united-nations-blue/30 flex w-full cursor-pointer items-center justify-center gap-x-2 rounded-xl border px-4 py-2 backdrop-blur-sm transition disabled:cursor-not-allowed disabled:opacity-75"
    >
      {isLoading ? (
        <SpinnerIcon size={16} weight="bold" className="animate-spin" />
      ) : (
        <GithubLogoIcon size={16} weight="fill" />
      )}
      Логинимся
    </button>
  );
}
