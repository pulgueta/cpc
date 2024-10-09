"use client";

import { useEffect, useState } from "react";

export const Request = () => {
  const [request, setRequest] = useState<string>("Loading...");

  useEffect(() => {
    fetch("/api/hello")
      .then((response) => response.json())
      .then((data) => setRequest(data.message));
  }, []);

  return <div>{request}</div>;
};
