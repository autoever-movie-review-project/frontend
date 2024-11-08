import LoginPage from 'pages/login/LoginPage';
import RegisterPage from 'pages/register/RegisterPage';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      element: (
        <>
          {/* 여기에 헤더를 넣어주세요 */}
          <Outlet />
        </>
      ),
      children: [
        {
          path: '/',
          element: <></> /* 메인페이지를 넣어주세요 */,
        },
        {
          path: '/login',
          element: <LoginPage />,
        },
        {
          path: '/register',
          element: <RegisterPage />,
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
