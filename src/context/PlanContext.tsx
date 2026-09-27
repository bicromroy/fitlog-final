"use client";
import { createContext, useContext, useEffect, useState } from "react";

type W = any;
type Toast = { msg: string; type: "add" | "remove" } | null;
type Ctx = {
    plan: W[]; saved: W[];
    addToPlan: (w: W) => void; addToSaved: (w: W) => void;
    togglePlan: (w: W) => void; toggleSaved: (w: W) => void;
    removePlan: (id: string) => void; removeSaved: (id: string) => void;
    markDone: (w: W) => void; mounted: boolean; toast: Toast;
}

const PlanContext = createContext<Ctx | null>(null);

export function PlanProvider({ children }: { children: React.ReactNode }) {
    const [plan, setPlan] = useState<W[]>([]);
    const [saved, setSaved] = useState<W[]>([]);
    const [mounted, setMounted] = useState(false);
    const [toast, setToast] = useState<Toast>(null);

    useEffect(() => {
        setPlan(JSON.parse(localStorage.getItem("fitlog_plan") || "[]"));
        setSaved(JSON.parse(localStorage.getItem("fitlog_saved") || "[]"));
        setMounted(true);
    }, []);
    useEffect(() => { if (mounted) localStorage.setItem("fitlog_plan", JSON.stringify(plan)) }, [plan, mounted]);
    useEffect(() => { if (mounted) localStorage.setItem("fitlog_saved", JSON.stringify(saved)) }, [saved, mounted]);

    const show = (msg: string, type: "add" | "remove") => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 2500);
    }

    const addToPlan = (w: W) => {
        const id = w.id || w._id;
        if (plan.find(x => (x.id || x._id) === id)) { show(`Already in today's plan`, "remove"); return; }
        if (plan.length >= 5) { show(`Plan full (5/5)`, "remove"); return; }
        setPlan(p => [...p, w]);
        show(`Added to today's plan`, "add");
    }
    const addToSaved = (w: W) => {
        const id = w.id || w._id;
        if (saved.find(x => (x.id || x._id) === id)) { show(`Already saved`, "remove"); return; }
        setSaved(p => [...p, w]);
        show(`Saved for later`, "add");
    }
    const togglePlan = (w: W) => { const id = w.id || w._id; plan.find(x => (x.id || x._id) === id) ? removePlan(id) : addToPlan(w); }
    const toggleSaved = (w: W) => { const id = w.id || w._id; saved.find(x => (x.id || x._id) === id) ? removeSaved(id) : addToSaved(w); }
    const removePlan = (id: string) => { setPlan(p => p.filter(x => (x.id || x._id) !== id)); show(`Removed from today's plan`, "remove"); }
    const removeSaved = (id: string) => { setSaved(p => p.filter(x => (x.id || x._id) !== id)); show(`Removed from saved`, "remove"); }
    const markDone = (w: W) => { const id = w.id || w._id; setPlan(p => p.filter(x => (x.id || x._id) !== id)); show(`Completed!`, "add"); }

    return (
        <PlanContext.Provider value={{ plan, saved, addToPlan, addToSaved, togglePlan, toggleSaved, removePlan, removeSaved, markDone, mounted, toast }}>
            {children}
            {toast && (
                <div className={`fixed top-5 right-5 z-[9999] flex items-center gap-2.5 px-5 py-3 rounded-full text-[11px] font-black shadow-2xl
          ${toast.type === "add" ? "bg-[#ccff00] text-black" : "bg-[#ff1a1a] text-white"}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black
            ${toast.type === "add" ? "bg-black text-[#ccff00]" : "bg-white text-[#ff1a1a]"}`}>
                        {toast.type === "add" ? "✓" : toast.msg.includes("Already") ? "!" : "✕"}
                    </span>
                    {toast.msg}
                </div>
            )}
        </PlanContext.Provider>
    );
}
export const usePlan = () => useContext(PlanContext) as Ctx;