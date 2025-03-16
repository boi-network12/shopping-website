import React, { createContext, useState, useEffect, useCallback, useContext } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../config/config";
import { AuthContext } from "./AuthContext";

export const MatrixContext = createContext();

export const MatrixProvider = ({ children }) => {
  const [dailyMetrics, setDailyMetrics] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const token = localStorage.getItem("token");

  const refreshToken = async () => {
    try {
      const response = await fetch(`${API_URL}/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: localStorage.getItem("refreshToken") }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      localStorage.setItem("token", data.accessToken);
      return data.accessToken;
    } catch (error) {
      console.error("Refresh Token Error:", error);
      toast.error(error.message);
      // Redirect to login or handle error
      return null;
    }
  };

  const fetchDailyMetrics = useCallback(async () => {
    setLoading(true);
    try {
      let currentToken = token;
      const response = await fetch(`${API_URL}/daily-metrics`, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });

      if (response.status === 403) {
        currentToken = await refreshToken();
        if (currentToken) {
          const retryResponse = await fetch(`${API_URL}/daily-metrics`, {
            headers: { Authorization: `Bearer ${currentToken}` },
          });
          const data = await retryResponse.json();
          if (!retryResponse.ok) throw new Error(data.message);
          setDailyMetrics(data);
        }
      } else {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setDailyMetrics(data);
      }
    } catch (error) {
      console.error("Fetch Daily Metrics Error:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchRecentOrders = useCallback(async () => {
    setLoading(true);
    try {
      let currentToken = token;
      const response = await fetch(`${API_URL}/orders/`, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });

      if (response.status === 403) {
        currentToken = await refreshToken();
        if (currentToken) {
          const retryResponse = await fetch(`${API_URL}/orders/`, {
            headers: { Authorization: `Bearer ${currentToken}` },
          });
          const data = await retryResponse.json();
          if (!retryResponse.ok) throw new Error(data.message);
          setRecentOrders(data);
        }
      } else {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setRecentOrders(data);
      }
    } catch (error) {
      console.error("Fetch Recent Orders Error:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchDailyMetrics();
      fetchRecentOrders();
    }
  }, [fetchDailyMetrics, fetchRecentOrders, user]);

  return (
    <MatrixContext.Provider
      value={{
        dailyMetrics,
        recentOrders,
        loading,
        fetchDailyMetrics,
        fetchRecentOrders,
      }}
    >
      {children}
    </MatrixContext.Provider>
  );
};