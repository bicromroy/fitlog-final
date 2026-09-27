"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";

export default function MyPlanPage() {
    const { plan, saved, removeFromPlan, removeFromSaved } = usePlan();
    const [tab, setTab] = useState<"plan" | "saved">("plan");
    const [sortBy, setSortBy] = useState("calories");
    const [toast, setToast] = useState<string | null>(null);

    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };
    const getTime = (ex: any) => { const val = ex.duration ?? 0; return typeof val === 'number' ? val : parseInt(String(val)) || 0; };
    const getCal = (ex: any) => { const v = ex.calories ?? 0; const n = typeof v === 'number' ? v : parseInt(String(v)) || 0; return n > 0 ? n : getTime(ex) * 12 || 120; };
    const getRating = (ex: any) => Number(ex.rating ?? 0);
    const currentList = tab === "plan" ? plan : saved;

    const sortedList = useMemo(() => {
        const copy = [...(currentList || [])];
        if (sortBy === "duration") copy.sort((a, b) => getTime(b) - getTime(a));
        if (sortBy === "calories") copy.sort((a, b) => getCal(b) - getCal(a));
        if (sortBy === "rating") copy.sort((a, b) => getRating(b) - getRating(a));
        return copy;
    }, [currentList, sortBy]);

    const totalTime = (currentList || []).reduce((s: number, e: any) => s + getTime(e), 0);
    const totalCal = (currentList || []).reduce((s: number, e: any) => s + getCal(e), 0);

    const handleRemove = (id: any, name: string) => {
        if (tab === "plan") removeFromPlan(id); else removeFromSaved(id);
        showToast(`Removed ${name}`);
    };

    return (
        <div className="min-h-screen bg-[#0E0E12] text-white flex justify-center relative">
            {toast && (
                <div className="fixed top-6 right-6 bg-[#1A1A23] border border-[#ccff00]/40 text-white text-[12px] font-bold px-5 py-3 rounded-full z-[999] flex items-center gap-2">
                    <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px]">✕</span>
                    {toast}
                </div>
            )}
            <div className="w-full max-w-[900px] px-6 py-6">
                <h1 className="text-[22px] font-black uppercase">MY PLAN</h1>
                <div className="bg-[#15151D] border border-white/[0.06] rounded-[16px] grid grid-cols-3 mt-6 py-5">
                    <div className="px-6 border-r border-white/[0.06]"><p className="text-[10px] text-[#6B6B7A]">Exercises</p><p className="text-[28px] font-black text-[#ccff00] mt-1">{currentList.length}</p></div>
                    <div className="px-6 border-r border-white/[0.06]"><p className="text-[10px] text-[#6B6B7A]">Minutes</p><p className="text-[28px] font-black mt-1">{totalTime}</p></div>
                    <div className="px-6"><p className="text-[10px] text-[#6B6B7A]">Calories</p><p className="text-[28px] font-black mt-1">{totalCal}</p></div>
                </div>
                <div className="flex justify-between items-center mt-6">
                    <div className="bg-[#1A1A23] rounded-full p-1 flex gap-1">
                        <button onClick={() => setTab("plan")} className={`text-[11px] font-bold px-4 py-1.5 rounded-full ${tab === "plan" ? "bg-[#2A2A36] text-white" : "text-[#6B6B7A]"}`}>Today&apos;s Plan</button>
                        <button onClick={() => setTab("saved")} className={`text-[11px] font-bold px-4 py-1.5 rounded-full ${tab === "saved" ? "bg-[#2A2A36] text-white" : "text-[#6B6B7A]"}`}>Saved</button>
                    </div>
                    <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="bg-[#1A1A23] border border-white/[0.06] rounded-full px-4 py-1.5 text-[11px] text-white outline-none"><option value="duration">Duration</option><option value="calories">Calories</option><option value="rating">Rating</option></select>
                </div>
                <div className="space-y-3 mt-4">
                    {sortedList.map((w: any) => (
                        <div key={w.id} className="bg-[#1A1A23] border border-white/[0.06] rounded-[14px] p-3 flex items-center justify-between">
                            <div className="flex items-center gap-3"><img src={w.image} alt={w.name} className="w-[72px] h-[48px] rounded-lg object-cover" /><div><p className="text-[11px] font-black uppercase">{w.name}</p><p className="text-[10px] text-[#6B6B7A]">{w.equipment} · {getTime(w)} min · {getCal(w)} kcal</p></div></div>
                            <div className="flex items-center gap-2"><Link href={`/workouts/${w.id}`} className="text-[10px] border border-white/10 rounded-full px-3 py-1.5">View Details</Link><button onClick={() => handleRemove(w.id, w.name)} className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[10px]">✕</button></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}