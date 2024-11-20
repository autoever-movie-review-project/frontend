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
import { AuthGuard } from 'components/AuthGuard';

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
            element: <Main />,
          },
          // 비로그인 유저만 접근 가능한 라우트
          {
            path: '/login',
            element: (
              <AuthGuard requireAuth={false}>
                <LoginPage />
              </AuthGuard>
            ),
          },
          {
            path: '/register',
            element: (
              <AuthGuard requireAuth={false}>
                <RegisterPage />
              </AuthGuard>
            ),
          },
          // 로그인 필요한 라우트
          {
            path: '/mypage',
            element: (
              <AuthGuard requireAuth={true}>
                <MyPage />
              </AuthGuard>
            ),
          },
          {
            path: '/preferences',
            element: (
              <AuthGuard requireAuth={true}>
                <Preferences />
              </AuthGuard>
            ),
          },
          {
            path: '/game',
            element: (
              <AuthGuard requireAuth={true}>
                <GameLobby />
              </AuthGuard>
            ),
          },
          {
            path: '/gameroom/:gameId',
            element: (
              <AuthGuard requireAuth={true}>
                <GameRoom />
              </AuthGuard>
            ),
          },
          // 모든 유저 접근 가능한 라우트
          {
            path: '/movies/:movieId',
            element: (
              <AuthGuard requireAuth={true}>
                <Detail />
              </AuthGuard>
            ),
          },
          {
            path: '/movies',
            element: <Movies />,
          },
          {
            path: '/test',
            element: <Test />,
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
