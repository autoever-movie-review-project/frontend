import ScrollToTop from 'util/ScrollToTop';
import LoginPage from 'pages/auth/LoginPage';
import RegisterPage from 'pages/auth/RegisterPage';
import MyPage from 'pages/mypage/MyPage';
import Header from 'components/header/Header';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

const loadingComp = <div style={{ height: '1000px', backgroundColor: 'red' } as React.CSSProperties}>로딩중</div>;
const Main = lazy(() => import('pages/main/MainPage'));
const Detail = lazy(() => import('pages/detail/DetailPage'));
const Movies = lazy(() => import('pages/movies/MoviesPage'));
const Preferences = lazy(() => import('pages/preferences/PreferencesPage'));

function App() {
  const router = createBrowserRouter(
    [
      {
        element: (
          <Suspense fallback={loadingComp}>
            <ScrollToTop />
            <Header />
            <Outlet />
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
          {
            path: '/detail/:postId',
            element: (
              <>
                <Detail />
              </>
            ),
          },
          {
            path: '/movies',
            element: (
              <>
                <Movies />
              </>
            ),
          },
          {
            path: '/preferences',
            element: (
              <>
                <Preferences />
              </>
            ),
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
