"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

const BRANDING_NAME_KEY = "wacrm.branding.name";
const BRANDING_LOGO_KEY = "wacrm.branding.logoUrl";

export const DEFAULT_CRM_NAME = "TripoMist WA CRM";

interface CrmBrandingContextValue {
  crmName: string;
  logoUrl: string | null;
  setCrmName: (name: string) => void;
  setLogoUrl: (url: string | null) => void;
  resetBranding: () => void;
}

const CrmBrandingContext = createContext<CrmBrandingContextValue | undefined>(undefined);

export function CrmBrandingProvider({ children }: { children: React.ReactNode }) {
  const [crmName, setCrmNameState] = useState<string>(DEFAULT_CRM_NAME);
  const [logoUrl, setLogoUrlState] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedName = localStorage.getItem(BRANDING_NAME_KEY);
      if (savedName && savedName.trim()) {
        setCrmNameState(savedName.trim());
      }
      const savedLogo = localStorage.getItem(BRANDING_LOGO_KEY);
      if (savedLogo) {
        setLogoUrlState(savedLogo);
      }
    } catch (_e) {
      // Ignore localStorage read errors
    }
  }, []);

  const setCrmName = useCallback((name: string) => {
    const val = name.trim() || DEFAULT_CRM_NAME;
    setCrmNameState(val);
    try {
      localStorage.setItem(BRANDING_NAME_KEY, val);
    } catch (_e) {}
  }, []);

  const setLogoUrl = useCallback((url: string | null) => {
    setLogoUrlState(url);
    try {
      if (url) {
        localStorage.setItem(BRANDING_LOGO_KEY, url);
      } else {
        localStorage.removeItem(BRANDING_LOGO_KEY);
      }
    } catch (_e) {}
  }, []);

  const resetBranding = useCallback(() => {
    setCrmNameState(DEFAULT_CRM_NAME);
    setLogoUrlState(null);
    try {
      localStorage.removeItem(BRANDING_NAME_KEY);
      localStorage.removeItem(BRANDING_LOGO_KEY);
    } catch (_e) {}
  }, []);

  return (
    <CrmBrandingContext.Provider
      value={{
        crmName,
        logoUrl,
        setCrmName,
        setLogoUrl,
        resetBranding,
      }}
    >
      {children}
    </CrmBrandingContext.Provider>
  );
}

export function useCrmBranding() {
  const ctx = useContext(CrmBrandingContext);
  if (!ctx) {
    return {
      crmName: DEFAULT_CRM_NAME,
      logoUrl: null,
      setCrmName: () => {},
      setLogoUrl: () => {},
      resetBranding: () => {},
    };
  }
  return ctx;
}
