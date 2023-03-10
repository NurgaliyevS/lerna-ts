import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DynamicFormPage from './pages/form/DynamicFormPage';
import LoginPage from './pages/login/LoginPage';
import { MobxStoreProvider } from './store/MobxStoreProvider';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <MobxStoreProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <DynamicFormPage />
              </ProtectedRoute>
            }
          />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </MobxStoreProvider>
  );
};

export default App;
