import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

const Dashboard = observer(() => {
  const store = useStore();

  useEffect(() => {
    if (!store.isAuthenticated) {
      history.push('/login');
    }
    store.fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {Object.entries(store.data).map(([key, value]) => (
        <div key={key}>
          <label>{key}</label>
          <input type="text" value={value} />
        </div>
      ))}
      <button onClick={store.logout}>Logout</button>
    </div>
  );