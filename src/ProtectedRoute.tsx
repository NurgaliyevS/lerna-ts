import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useMobxStore } from "./MobxStoreProvider";

interface Props {
  children?: React.ReactNode;
}

const ProtectedRoute = observer(({ children }: Props) => {
  const mobxStore = useMobxStore();

  let location = useLocation();
  const url = new URLSearchParams();
  url.set("redirect", location.pathname + location.search);

  return mobxStore.token ? (
    <>{children}</>
  ) : (
    <Navigate to={{ pathname: "/login", search: url.toString() }} />
  );
});

export default ProtectedRoute;
