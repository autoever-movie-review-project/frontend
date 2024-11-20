import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { REDIRECT_URI } from '../../api/auth/kakaoApi';
import Loading from 'components/Loading';

function KakaoCallbackPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const code = new URLSearchParams(window.location.search).get('code');

  useEffect(() => {
    if (code) {
      axios.get(`${REDIRECT_URI}?code=${code}`).then((response) => {
        queryClient.setQueryData(['user'], response);
        if (localStorage.getItem('check') && localStorage.getItem('check') === String(response.data.userId))
          navigate('/');
        else navigate('/preferences');
      });
    }
  }, [code]);

  return <Loading />;
}

export default KakaoCallbackPage;
