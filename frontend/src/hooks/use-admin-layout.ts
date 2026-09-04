"use client";

import { useCallback, useSyncExternalStore } from "react";

const KEY = "adminLayout";

export function getAdminLayout() {
  return (localStorage.getItem(KEY) as "vertical" | "horizontal") ?? "vertical";
}

export function setAdminLayout(next: "vertical" | "horizontal") {
  localStorage.setItem(KEY, next);
  window.dispatchEvent(new Event("admin-layout"));
}

export function useAdminLayout() {
  const subscribe = useCallback((cb: () => void) => {
    window.addEventListener("storage", cb);
    window.addEventListener("admin-layout", cb);
    return () => {
      window.removeEventListener("storage", cb);
      window.removeEventListener("admin-layout", cb);
    };
  }, []);
  return useSyncExternalStore(
    subscribe,
    () => getAdminLayout(),
    () => "vertical" as const
  );
}
