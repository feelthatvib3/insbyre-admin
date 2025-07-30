import { type ComponentProps, type FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { supabase } from 'shared/api/supabase';

const ALLOWED_UIDS = [
  '9570505e-8522-4da2-a64e-ea47c0c65f08',
  '42d785f3-d320-4cab-94a4-b1e87647b54a'
];

export function withAuthGuard(Component: FC) {
  return function GuardedComponent(props: ComponentProps<typeof Component>) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
      async function checkAuth() {
        const { data } = await supabase.auth.getSession();

        if (data.session && ALLOWED_UIDS.includes(data.session.user.id)) {
          setIsAuthenticated(true);
        } else {
          navigate('/login');
        }

        setIsLoading(false);
      }

      checkAuth();
    }, [navigate]);

    if (isLoading || !isAuthenticated) return null;

    return <Component {...props} />;
  };
}
