"use client";
import { createContext, useContext, useEffect, useState } from "react";

const PlanContext = createContext<any>(null);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<any[]>([]);
  const [saved, setSaved] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const p = localStorage.getItem("fitlog_plan");
    const s = localStorage.getItem("fitlog_saved");
    if (p) setPlan(JSON.parse(p));
    if (s) setSaved(JSON.parse(s));
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem("fitlog_plan", JSON.stringify(plan));
  }, [plan, mounted]);

  useEffect(() => {
    if (mounted) localStorage.setItem("fitlog_saved", JSON.stringify(saved));
  }, [saved, mounted]);

  const addToPlan = (ex: any) => {
    setPlan((prev) => {
      if (prev.some((e) => String(e.id) === String(ex.id))) return prev;
      if (prev.length >= 5) {
        alert("Cap of five lifts for today!");
        return prev;
      }
      return [...prev, ex];
    });
  };

  const removeFromPlan = (id: any) => {
    setPlan((prev) => prev.filter((e) => String(e.id)!== String(id)));
  };

  const toggleSave = (ex: any) => {
    setSaved((prev) => {
      const exists = prev.some((e) => String(e.id) === String(ex.id));
      if (exists) return prev.filter((e) => String(e.id)!== String(ex.id));
      return [...prev, ex];
    });
  };

  const removeFromSaved = (id: any) => {
    setSaved((prev) => prev.filter((e) => String(e.id)!== String(id)));
  };

  return (
    <PlanContext.Provider value={{ plan, saved, addToPlan, removeFromPlan, toggleSave, removeFromSaved, mounted }}>
      {children}
    </PlanContext.Provider>
  );
}

export const usePlan = () => {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be inside PlanProvider");
  return ctx;
};