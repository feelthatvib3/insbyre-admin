import type { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import { supabase } from 'shared/api/supabase';

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getSession() {
      const {
        data: { session }
      } = await supabase.auth.getSession();
      setSession(session);
      setIsLoading(false);
    }

    getSession();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { session, isSessionLoading: isLoading };
}
