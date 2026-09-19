"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import {
  Building2,
  Check,
  Globe,
  Image as ImageIcon,
  Layout,
  Moon,
  Palette,
  RotateCcw,
  Save,
  Sparkles,
  Sun,
  Upload,
  MessageSquare,
  Briefcase,
  Plane,
  Zap,
} from "lucide-react";
import { useCrmBranding, DEFAULT_CRM_NAME } from "@/hooks/use-crm-branding";
import { useTheme } from "@/hooks/use-theme";
import { THEMES, ThemeId } from "@/lib/themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const PRESET_LOGOS = [
  { name: "Default Chat", url: "" },
  { name: "Travel & Tours", icon: Plane },
  { name: "Business Briefcase", icon: Briefcase },
  { name: "Lightning Zap", icon: Zap },
];

export default function CrmEditPage() {
  const { crmName, logoUrl, setCrmName, setLogoUrl, resetBranding } = useCrmBranding();
  const { theme, setTheme, mode, setMode } = useTheme();

  const [inputName, setInputName] = useState(crmName);
  const [inputLogo, setInputLogo] = useState(logoUrl || "");

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setCrmName(inputName);
    setLogoUrl(inputLogo.trim() || null);
    toast.success("CRM branding updated successfully!");
  };

  const handleReset = () => {
    resetBranding();
    setInputName(DEFAULT_CRM_NAME);
    setInputLogo("");
    setTheme("cyan");
    setMode("light");
    toast.info("Branding reset to defaults");
  };

  return (
    <div className="container max-w-5xl py-8 space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Palette className="h-6 w-6 text-primary" />
            CRM Edit & Branding
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Customize your CRM title, logo, active color theme, and default layout appearance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleReset} className="gap-1.5">
            <RotateCcw className="h-4 w-4" />
            Reset to Defaults
          </Button>
          <Button size="sm" onClick={() => handleSave()} className="gap-1.5">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Card 1: Branding & Name */}
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              App Title & Branding
            </CardTitle>
            <CardDescription>
              Set the name and logo displayed in the top header and sidebar navigation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="crm-name" className="text-sm font-semibold">
                CRM Name
              </Label>
              <Input
                id="crm-name"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder="e.g. TripoMist WA CRM"
                className="h-10"
              />
              <p className="text-xs text-muted-foreground">
                This name replaces "CRM Template for WhatsApp" in the sidebar.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo-url" className="text-sm font-semibold">
                Logo Image URL (Optional)
              </Label>
              <div className="flex gap-2">
                <Input
                  id="logo-url"
                  value={inputLogo}
                  onChange={(e) => setInputLogo(e.target.value)}
                  placeholder="https://example.com/logo.png"
                  className="h-10 flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Paste a public image link for your company logo, or leave blank for default icon.
              </p>
            </div>

            <div className="pt-2">
              <Label className="text-sm font-semibold block mb-3">Live Header Preview</Label>
              <div className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-card shadow-xs">
                {inputLogo.trim() ? (
                  <img
                    src={inputLogo.trim()}
                    alt="Logo Preview"
                    className="h-9 w-9 rounded-lg object-cover border border-border"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                )}
                <div>
                  <div className="text-sm font-bold text-foreground">
                    {inputName || DEFAULT_CRM_NAME}
                  </div>
                  <div className="text-xs text-muted-foreground">WhatsApp CRM Portal</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Theme & Mode Customization */}
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Theme & Appearance
            </CardTitle>
            <CardDescription>
              Choose your active selection highlight color and light/dark theme preference.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Mode selection */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Appearance Mode</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMode("light")}
                  className={cn(
                    "flex items-center justify-center gap-2 p-3 rounded-xl border transition-all text-sm font-medium",
                    mode === "light"
                      ? "border-primary bg-primary/10 text-primary font-semibold shadow-xs ring-1 ring-primary"
                      : "border-border bg-card text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Sun className="h-4 w-4" />
                  Light Mode (Default)
                </button>
                <button
                  type="button"
                  onClick={() => setMode("dark")}
                  className={cn(
                    "flex items-center justify-center gap-2 p-3 rounded-xl border transition-all text-sm font-medium",
                    mode === "dark"
                      ? "border-primary bg-primary/10 text-primary font-semibold shadow-xs ring-1 ring-primary"
                      : "border-border bg-card text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Moon className="h-4 w-4" />
                  Dark Mode
                </button>
              </div>
            </div>

            {/* Accent Theme Picker */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Active Selection Theme Color</Label>
              <div className="grid grid-cols-2 gap-3">
                {THEMES.map((t) => {
                  const isSelected = theme === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTheme(t.id as ThemeId)}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl border text-left transition-all text-sm",
                        isSelected
                          ? "border-primary bg-primary/10 text-foreground font-semibold shadow-xs ring-1 ring-primary"
                          : "border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      <span
                        className="h-4 w-4 rounded-full shrink-0 shadow-xs border border-white/20"
                        style={{ backgroundColor: t.swatch }}
                      />
                      <span className="flex-1 truncate">{t.name}</span>
                      {isSelected && <Check className="h-4 w-4 text-primary shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Active Pill Preview */}
            <div className="pt-2">
              <Label className="text-sm font-semibold block mb-3">Active Sidebar Pill Preview</Label>
              <div className="p-3.5 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold bg-primary text-primary-foreground shadow-sm">
                  <Layout className="h-4 w-4 shrink-0" />
                  <span className="flex-1">Dashboard (Active)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        <Button variant="outline" onClick={handleReset} className="gap-1.5">
          <RotateCcw className="h-4 w-4" />
          Reset to Defaults
        </Button>
        <Button onClick={() => handleSave()} className="gap-1.5 px-6">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
