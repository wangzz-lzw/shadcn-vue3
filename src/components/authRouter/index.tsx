import { Navigate, useLocation } from 'react-router-dom';

const AuthRouter = (WrappedComponent: React.ComponentType) => {
    return function AuthComponent(props: any) {
        const location = useLocation();
        const isAuthenticated = checkAuth(); // 替换为实际的认证逻辑

        if (!isAuthenticated) {
            // 未登录时重定向到登录页，并记录当前路径
            return <Navigate to="/login" state={{ from: location }} replace />;
        }

        return <WrappedComponent {...props} />;
    };
};

const checkAuth = () => {
    return true;
};
export default AuthRouter;