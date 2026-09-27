"use client";
import { useEffect, useState } from "react";
import { getWorkouts } from "@/lib/api";
import Link from "next/link";

export default function Page() {
  const [workouts, setWorkouts] = useState<any[]>([]);
  useEffect(() => { getWorkouts().then(setWorkouts).catch(console.error); }, []);

  return (
    <div className="bg-[#0E0E12] min-h-screen">
      <div className="max-w-[1240px] mx-auto px-6 py-6">
        <div className="bg-[#1A1A22] rounded-[20px] border border-white/5 p-10 flex justify-between items-center overflow-hidden">
          <div>
            <p className="text-[#D4FF32] text-[10px] font-black tracking-widest">WORKOUT LIBRARY</p>
            <h1 className="text-white text-[32px] font-black mt-3 leading-none uppercase">TRAIN WITH<br />INTENT. LOG<br />EVERY SET.</h1>
            <button onClick={() => document.getElementById("library")?.scrollIntoView({ behavior: "smooth" })} className="bg-[#D4FF32] text-black text-[11px] font-black px-5 py-2.5 rounded-full mt-5">BROWSE WORKOUTS</button>
          </div>
          <img src="/banner.png" className="w-[400px] object-contain" alt="banner" />
        </div>

        <div id="library" className="mt-10 mb-4">
          <h2 className="text-white text-[13px] font-black tracking-widest">THE LIBRARY</h2>
          <p className="text-[#5A5A6A] text-[11px] mt-1">Twelve lifts covering every major muscle group.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {workouts.map((w: any) => {
            const tags = w.muscles || w.muscleGroups || [w.bodyPart, w.target].filter(Boolean) || ["GENERAL"];
            return (
              <Link key={w.id || w._id} href={`/workouts/${w.id || w._id}`} className="bg-[#16161E] rounded-[14px] overflow-hidden border border-white/5 group">
                <div className="h-[200px] bg-[#1C1C28] overflow-hidden">
                  <img
                    src={w.image || w.gifUrl || w.imageUrl}
                    alt={w.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition"
                    onError={(e: any) => e.target.src = "/banner.png"}
                  />
                </div>
                <div className="p-4">
                  <div className="flex gap-1.5 flex-wrap">
                    {tags.map((t: string, i: number) => (
                      <span key={i} className="bg-[#D4FF32] text-black text-[9px] font-black px-2.5 py-[3px] rounded-full uppercase">{t}</span>
                    ))}
                  </div>
                  <h3 className="text-white text-[12px] font-black mt-3 uppercase">{w.name}</h3>
                  <p className="text-[#6B6B7D] text-[11px] mt-1">{w.equipment || w.bodyPart}</p>
                  <div className="flex gap-3 mt-3 text-[11px] text-[#8A8A9A]">
                    <span>◷ {w.duration || 8} min</span>
                    <span>🔥 {w.calories || 120} kcal</span>
                    <span>☆ {w.rating || 4.8}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}