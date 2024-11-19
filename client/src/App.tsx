import ScrollToTop from 'util/ScrollToTop';
import LoginPage from 'pages/auth/LoginPage';
import RegisterPage from 'pages/auth/RegisterPage';
import MyPage from 'pages/mypage/MyPage';
import Header from 'components/header/Header';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { GameLobby } from 'pages/game/gameLobby/GameLobby';
import { GameRoom } from 'pages/game/gameRoom/GameRoom';
import { Test } from 'Test';
import Loading from 'components/Loading';
import KakaoCallbackPage from 'pages/auth/kakaoCallbackPage';

const loadingComp = <Loading />;
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
            path: '/movies/:movieId',

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
          {
            path: '/preferences',
            element: (
              <>
                <Preferences />
              </>
            ),
          },
          {
            path: '/test',
            element: <Test />,
          },
          {
            path: '/kakao',
            element: <KakaoCallbackPage />,
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
