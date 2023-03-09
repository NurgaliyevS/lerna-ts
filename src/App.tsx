import { BrowserRouter, Routes, Route } from "react-router-dom";
import DynamicFormPage from "./DynamicFormPage";
import LoginPage from "./LoginPage";
import { MobxStoreProvider } from "./MobxStoreProvider";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  return (
    <MobxStoreProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DynamicFormPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </MobxStoreProvider>
  );
};

export default App;
