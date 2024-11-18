import ScrollToTop from 'components/common/ScrollToTop';
import LoginPage from 'pages/auth/LoginPage';
import RegisterPage from 'pages/auth/RegisterPage';
import MyPage from 'pages/mypage/MyPage';
import Header from 'components/header/Header';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { GameLobby } from 'pages/game/gameLobby/GameLobby';
import { GameRoom } from 'pages/game/gameRoom/GameRoom';
import Loading from 'components/Loading';

const loadingComp = <Loading />;
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
            path: '/detail/:movieId',
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
            path: '/game',
            element: <GameLobby />,
          },
          {
            path: '/gameroom/:roomId',
            element: <GameRoom />,
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
