import { useEffect, useState } from 'react';
import useAuth from './useAuth';

export default function useOwnership(ownerId: string) {
  const { isLoading, user } = useAuth();
  const [ownership, setOwnership] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setOwnership(false);
      return;
    }

    if (user?._id === ownerId) {
      setOwnership(true);
      return;
    }

    setOwnership(false);
  }, [isLoading, user, ownerId]);

  return ownership;
}
