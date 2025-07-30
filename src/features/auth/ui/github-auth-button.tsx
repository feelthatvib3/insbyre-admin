import { GithubLogoIcon } from '@phosphor-icons/react';

import { supabase } from 'shared/api/supabase';

export function GithubAuthButton() {
  async function handleOnClick() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github'
    });
    if (error) console.error('OAuth error:', error.message);
  }

  return (
    <button
      onClick={handleOnClick}
      className="bg-united-nations-blue/5 border-united-nations-blue/25 hover:bg-united-nations-blue/10 text-united-nations-blue hover:border-united-nations-blue/30 flex w-full cursor-pointer items-center justify-center gap-x-2 rounded-xl border px-4 py-2 backdrop-blur-sm transition disabled:cursor-not-allowed disabled:opacity-75"
    >
      <GithubLogoIcon size={16} weight="fill" />
      Логинимся
    </button>
  );
}
