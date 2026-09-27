"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";

export default function MyPlan() {
    const { plan, saved, removePlan, removeSaved, markDone } = usePlan();
    const [tab, setTab] = useState<"plan" | "saved">("plan");
    const [sortBy, setSortBy] = useState("Rating");
    const current = tab === "plan" ? plan : saved;

    const sorted = useMemo(() => [...current].sort((a: any, b: any) => {
        if (sortBy === "Duration") return (a.duration || 0) - (b.duration || 0);
        if (sortBy === "Calories") return (a.calories || 0) - (b.calories || 0);
        return (b.rating || 0) - (a.rating || 0);
    }), [current, sortBy]);

    const totalMins = current.reduce((a: any, b: any) => a + (Number(b.duration) || 0), 0);
    const totalCal = current.reduce((a: any, b: any) => a + (Number(b.calories) || 0), 0);

    return (
        <div className="max-w-[1024px] mx-auto px-4 py-8 bg-[#0E0E12] min-h-screen">
            <h1 className="text-white font-black text-[18px] tracking-widest">MY PLAN</h1>
            <div className="mt-6 bg-[#15151E] border border-white/[0.06] rounded-[14px] p-6 grid grid-cols-3 gap-4">
                <div><p className="text-[#6B6B7A] text-[10px]">Exercises</p><p className="text-[#ccff00] font-black text-[28px] mt-1">{current.length}</p></div>
                <div className="border-l border-white/[0.06] pl-6"><p className="text-[#6B6B7A] text-[10px]">Minutes</p><p className="text-white font-black text-[28px] mt-1">{totalMins}</p></div>
                <div className="border-l border-white/[0.06] pl-6"><p className="text-[#6B6B7A] text-[10px]">Calories</p><p className="text-white font-black text-[28px] mt-1">{totalCal}</p></div>
            </div>

            <div className="flex justify-between items-center mt-8">
                <div className="flex gap-2 bg-[#1A1A23] rounded-full p-1 border border-white/[0.06]">
                    <button onClick={() => setTab("plan")} className={`px-6 py-1.5 rounded-full text-[11px] font-black ${tab === "plan" ? "bg-[#2A2A36] text-[#ccff00]" : "text-[#6B6B7A]"}`}>Today's Plan</button>
                    <button onClick={() => setTab("saved")} className={`px-6 py-1.5 rounded-full text-[11px] font-black ${tab === "saved" ? "bg-[#2A2A36] text-[#ccff00]" : "text-[#6B6B7A]"}`}>Saved</button>
                </div>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="bg-[#1A1A23] border border-white/[0.08] text-white text-[10px] font-bold rounded-full px-4 py-1.5"><option>Rating</option><option>Duration</option><option>Calories</option></select>
            </div>

            <div className="mt-6 space-y-3">
                {sorted.map((w: any, i: number) => (
                    <div key={`${w.id || w._id}-${i}`} className="bg-[#15151E] border border-white/[0.06] rounded-[14px] p-3 flex gap-4 items-center">
                        <img src={w.image || w.thumbnail} className="w-[64px] h-[64px] rounded-[10px] object-cover bg-[#0E0E12]" alt="" />
                        <div className="flex-1">
                            <h3 className="text-white text-[12px] font-black uppercase">{w.name || w.title}</h3>
                            <p className="text-[#6B6B7A] text-[10px] mt-1 flex gap-3"><span>🕒 {w.duration} min</span><span>🔥 {w.calories} kcal</span><span>★ {w.rating}</span></p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <Link href={`/workouts/${w.id || w._id}`} className="bg-[#1A1A23] border border-white/[0.08] text-white text-[10px] font-bold px-4 py-1.5 rounded-full">View Details</Link>
                            <button onClick={() => markDone(w)} className="bg-[#ccff00] text-black text-[10px] font-black px-4 py-1.5 rounded-full flex items-center gap-1">
                                <span className="w-3.5 h-3.5 rounded-full bg-black flex items-center justify-center text-[#ccff00] text-[8px]">✓</span> Mark as Done
                            </button>
                            <button onClick={() => tab === "plan" ? removePlan(w.id || w._id) : removeSaved(w.id || w._id)} className="w-7 h-7 rounded-full bg-[#1A1A23] border border-white/10 text-white flex items-center justify-center text-[11px] font-bold hover:bg-white hover:text-black transition">
                                ✕
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}