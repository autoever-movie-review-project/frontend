import Header from 'components/header/Header';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

const loadingComp = <div style={{ height: '1000px', backgroundColor: 'red' } as React.CSSProperties}>로딩중</div>;
const Main = lazy(() => import('pages/main/MainPage'));

function App() {
  const router = createBrowserRouter([
    {
      element: (
        <Suspense fallback={loadingComp}>
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
      ],
    },
  ]);
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
