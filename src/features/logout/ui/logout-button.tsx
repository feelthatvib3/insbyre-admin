import { SignOutIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { supabase } from 'shared/api/supabase';
import { Spinner } from 'shared/ui/spinner';

export function LogoutButton() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function handleOnClick() {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      navigate('/login', { replace: true });
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleOnClick}
      disabled={isLoading}
      className="group flex cursor-pointer items-center justify-center gap-x-2 rounded-xl px-4 py-2 text-red-500 backdrop-blur-sm transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-75"
    >
      {isLoading ? <Spinner /> : <SignOutIcon size={16} weight="bold" />}
      Выйти
    </button>
  );
}
