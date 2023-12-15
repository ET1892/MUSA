import React, { ReactNode} from 'react';

type ProtectedRouteProps = {
  children: ReactNode;
};
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    return <>{children}</>;
};

export default ProtectedRoute;
