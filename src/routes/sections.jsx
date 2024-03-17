/* eslint-disable react/prop-types */
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import { getAccessToken } from 'src/api/auth';
import LandingPage from 'src/pages/landingPage';
import DashboardLayout from 'src/layouts/dashboard';
import { useAuthContext } from 'src/api/authContext';
import LandingPageLayout from 'src/layouts/landingpage/LandingpageLayout';

import PaymentStepper from 'src/sections/payment/paymentStepper';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProjectsPage = lazy(() => import('src/pages/project'));
export const PembayaranPage = lazy(() => import('src/pages/pembayaran'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const RegisterPage = lazy(() => import('src/pages/userRegister'));
export const DetailProgram = lazy(() => import('src/sections/program/detailProgram'));

// ----------------------------------------------------------------------

// Define dashboard routes
const dashboardRoutes = [
  { path: 'Dashboard', element: <AdminRoute component={<IndexPage />} /> },
  { path: 'user', element: <AdminRoute component={<UserPage />} /> },
  { path: 'products', element: <AdminRoute component={<ProjectsPage />} /> },
  { path: 'pembayarans', element: <AdminRoute component={<PembayaranPage />} /> },
  { path: 'blog', element: <AdminRoute component={<BlogPage />} /> },
];

// Define landing page routes
const landingPageRoutes = [
     { path: '/', element: <LandingPage/>},
     { path: 'detail/:id', element: <DetailProgram/>},
     { path: 'donasi', element:  <UserRoute component={<PaymentStepper/>} />},
  // Add more landing page routes as needed
];

export default function Router() {
  const routes = useRoutes([
    // Dashboard layout with dashboard routes as children
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: dashboardRoutes,
    },
    // Landing page with landing page routes as children
    {
      element: (
        <LandingPageLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </LandingPageLayout>
      ),
      children: landingPageRoutes,
    },
    {
      path: 'login',
      element: <PublicRoute component={<LoginPage />} />,
    },
    {
      path: 'register',
      element: <PublicRoute component={<RegisterPage />} />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

function AdminRoute ({component}){
  const {userInfo} = useAuthContext()
  const token = getAccessToken()
  if(!userInfo){
    return <Navigate to="/login" />;
  }
  if(!token){
    return <Navigate to="/login" />;
  }
  if(userInfo.role_id === 2){
    return <Navigate to="/login" />;
  }
  return component
}

function PublicRoute({component}){
  const {userInfo} = useAuthContext()
  if(userInfo){
    return <Navigate to="/" />;
  }
  return component
}
function UserRoute({component}){
  const {userInfo} = useAuthContext()
  const token = getAccessToken()
  if(!userInfo || !token){
    return <Navigate to="/login" />;
  }
  return component
}
