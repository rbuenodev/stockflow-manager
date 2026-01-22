"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "@/api/api";

interface WhitelabelConfig {
  name: string;
  primaryColor: string;
  secondaryColor?: string;
  logoUrl?: string;
}

interface WhitelabelContextType {
  config: WhitelabelConfig | null;
  refreshConfig: () => Promise<void>;
}

const WhitelabelContext = createContext<WhitelabelContextType | undefined>(undefined);

export function WhitelabelProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<WhitelabelConfig | null>(null);

  const fetchConfig = async () => {
    try {
      const res = await api.get("/whitelabel/config");
      setConfig(res.data);
      
      const root = document.documentElement;
      if (res.data.primaryColor) {
        root.style.setProperty('--primary-color', res.data.primaryColor);
      }
      if (res.data.secondaryColor) {
          root.style.setProperty('--secondary-color', res.data.secondaryColor);
      }
      if (res.data.name) {
          document.title = res.data.name;
      }
    } catch (err) {
      console.error("Failed to load whitelabel config", err);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <WhitelabelContext.Provider value={{ config, refreshConfig: fetchConfig }}>
      {children}
    </WhitelabelContext.Provider>
  );
}

export const useWhitelabel = () => {
    const context = useContext(WhitelabelContext);
    if (context === undefined) {
      throw new Error("useWhitelabel must be used within a WhitelabelProvider");
    }
    return context;
};
