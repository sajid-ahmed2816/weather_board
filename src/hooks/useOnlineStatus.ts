import { useEffect, useState } from "react";

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(
    () => navigator.onLine,
  );

  useEffect(() => {
    function handleOnline() {
      console.log("Browser detected: ONLINE");
      setIsOnline(true);
    }

    function handleOffline() {
      console.log("Browser detected: OFFLINE");
      setIsOnline(false);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}