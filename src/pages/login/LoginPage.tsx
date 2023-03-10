import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useMobxStore } from '../../store/MobxStoreProvider';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './LoginPage.css';

const LoginPage = observer(() => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const mobxStore = useMobxStore();

  const navigate = useNavigate();

  const handleLogin = (event: any) => {
    event.preventDefault();

    // Check if the entered credentials are valid
    if (username === 'admin' && password === 'admin') {
      // Store the authorization token in Mobx storage
      mobxStore.updateAuthorized(true);
      mobxStore.updateAuthorizationToken('my_token');
      Cookies.set('session_token', 'my_token', { expires: 1 }); // expires in 1 day
      navigate('/');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type='text'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type='submit'>Log In</button>
      </form>
    </div>
  );
});

export default LoginPage;
