import { type ComponentProps, type FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { supabase } from 'shared/api/supabase';

export function withPublicOnlyGuard(Component: FC) {
  return function PublicOnlyGuardedComponent(props: ComponentProps<typeof Component>) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isPublic, setIsPublic] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
      async function checkAuth() {
        const { data } = await supabase.auth.getSession();

        if (data.session) {
          navigate('/', { replace: true });
        } else {
          setIsPublic(true);
        }

        setIsLoading(false);
      }

      checkAuth();
    }, [navigate]);

    if (isLoading || !isPublic) return null;

    return <Component {...props} />;
  };
}
