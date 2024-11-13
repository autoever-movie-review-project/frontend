import ScrollToTop from 'components/common/ScrollToTop';
import Header from 'components/header/Header';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

const loadingComp = <div style={{ height: '1000px', backgroundColor: 'red' } as React.CSSProperties}>로딩중</div>;
const Main = lazy(() => import('pages/main/MainPage'));
const Detail = lazy(() => import('pages/detail/DetailPage'));
const Movies = lazy(() => import('pages/movies/MoviesPage'));

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
