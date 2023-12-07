import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

type Props = {
  children: React.ReactNode;
};

export default function AuthGate({ children }: Props) {
  const { user, isLoading } = useAuth();
  console.log('AuthGate', user, isLoading);
  if (isLoading) return <></>;
  return <>{user ? children : <Navigate to="/auth" replace />}</>;
}
