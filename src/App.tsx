import LoginPage from 'pages/auth/LoginPage';
import RegisterPage from 'pages/auth/RegisterPage';
import MyPage from 'pages/mypage/MyPage';
import Header from 'components/header/Header';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const loadingComp = <div style={{ height: '1000px', backgroundColor: 'red' } as React.CSSProperties}>로딩중</div>;
const Main = lazy(() => import('pages/main/MainPage'));

function App() {
  const router = createBrowserRouter(
    [
      {
        element: (
          <Suspense fallback={loadingComp}>
            <Header />
            <Outlet />
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              draggable
            />
          </Suspense>
        ),
        children: [
          {
            path: '/',
            element: (
              <>
                <Main />
              </>
            ),
          },
          {
            path: '/login',
            element: <LoginPage />,
          },
          {
            path: '/register',
            element: <RegisterPage />,
          },
          {
            path: '/mypage',
            element: <MyPage />,
          },
        ],
      },
    ],
    {
      future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
      },
    }
  );
  return (
    <RouterProvider
      future={{
        v7_startTransition: true,
      }}
      router={router}
    />
  );
}

export default App;
