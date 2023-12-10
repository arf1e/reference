import _ from 'lodash';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useToaster from '../hooks/useToaster';

type Props = {
  children: React.ReactNode;
  needsAdminRights?: boolean;
  accessDeniedMessage?: string;
};

export default function AuthGate({
  children,
  needsAdminRights = false,
  accessDeniedMessage,
}: Props) {
  const { user, isLoading } = useAuth();
  const { showErrorMessage } = useToaster();

  if (isLoading) return <></>;

  const accessAllowed = needsAdminRights
    ? _.get(user, 'role', 'USER') === 'ADMIN'
    : Boolean(user);

  if (!accessAllowed && accessDeniedMessage) {
    showErrorMessage(accessDeniedMessage);
  }

  return <>{accessAllowed ? children : <Navigate to="/auth" replace />}</>;
}
