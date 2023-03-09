import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useMobxStore } from "./MobxStoreProvider";
import Cookies from "js-cookie";
interface Props {
  children?: React.ReactNode;
}

const ProtectedRoute = observer(({ children }: Props) => {
  const mobxStore = useMobxStore();

  const sessionToken = Cookies.get("session_token");

  let location = useLocation();
  const url = new URLSearchParams();
  url.set("redirect", location.pathname + location.search);

  if (sessionToken) {
    return <>{children}</>;
  }

  if (mobxStore.token) {
    return <>{children}</>;
  }

  if (!sessionToken && !mobxStore.token) {
    return <Navigate to={{ pathname: "/login", search: url.toString() }} />;
  }

  return null;
});

export default ProtectedRoute;
