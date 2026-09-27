"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getWorkout } from "@/lib/api";
import { usePlan } from "@/context/PlanContext";

export default function DetailsPage() {
    const { id } = useParams();
    const [w, setW] = useState<any>(null);
    const { addToPlan, toggleSaved } = usePlan() as any;

    useEffect(() => {
        if (id) getWorkout(id as string).then(setW);
    }, [id]);

    if (!w) return <div className="bg-[#0E0E12] min-h-screen flex items-center justify-center text-white">Loading...</div>;

    const tags = w.muscles || w.muscleGroups || [w.target, w.bodyPart].filter(Boolean) || ["FULL BODY"];

    return (
        <div className="bg-[#0E0E12] min-h-screen">
            <div className="max-w-[1240px] mx-auto px-6 py-10">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

                    <div className="h-full bg-[#E9E9EB] rounded-[20px] overflow-hidden border border-white/[0.06] flex">
                        <img
                            src={w.image || w.gifUrl || w.imageUrl}
                            alt={w.name}
                            className="w-full h-full object-cover object-center"
                        />
                    </div>

                    <div className="flex flex-col h-full">
                        <div>
                            <h1 className="text-white text-[26px] font-black uppercase tracking-wide leading-none">{w.name}</h1>
                            <p className="text-[#6B6B7D] text-[12px] mt-2 leading-relaxed">
                                {w.description || "A high-output full-body drill that mixes a squat, plank, and jump for conditioning."}
                            </p>

                            <div className="flex gap-2 mt-4">
                                {tags.map((t: string, i: number) => (
                                    <span key={i} className="bg-[#D4FF32] text-black text-[10px] font-black px-3 py-[4px] rounded-full uppercase">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div className="bg-[#15151E] rounded-[16px] border border-white/[0.06] mt-6 overflow-hidden">
                                {[
                                    ["EQUIPMENT", w.equipment || "Bodyweight"],
                                    ["DIFFICULTY", w.difficulty || "Intermediate"],
                                    ["SETS", w.sets || 4],
                                    ["REPS", w.reps || "8-12"],
                                    ["DURATION", `${w.duration || 12} min`],
                                    ["CALORIES", `${w.calories || 180} kcal`],
                                    ["RATING", w.rating || 4.2],
                                ].map(([label, value], idx, arr) => (
                                    <div key={label} className={`flex justify-between items-center px-5 py-[13px] ${idx !== arr.length - 1 ? "border-b border-white/[0.05]" : ""}`}>
                                        <span className="text-[#5A5A6A] text-[10px] font-bold tracking-widest uppercase">{label}</span>
                                        <span className="text-[#D1D1D6] text-[12px] font-medium">{value as string}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6">
                                <h3 className="text-white text-[11px] font-black tracking-widest uppercase">Instructions</h3>
                                <div className="mt-3 space-y-1.5 text-[11px] text-[#8A8A9A] leading-relaxed">
                                    {(w.instructions?.split?.("\n") || [
                                        "Lie on the bench with eyes under the bar and feet planted.",
                                        "Unrack with locked elbows and lower the bar to mid-chest.",
                                        "Press up in a slight arc until elbows lock without bouncing.",
                                        "Keep shoulder blades pinched and a natural arch in the back.",
                                    ]).map((line: string, i: number) => (
                                        <p key={i} className="flex gap-2">
                                            <span>{i + 1}.</span>
                                            <span>{line.replace(/^\d+\.\s*/, "")}</span>
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>


                        <div className="flex gap-3 mt-6">
                            <button onClick={() => addToPlan?.(w)} className="bg-[#D4FF32] text-black text-[12px] font-black px-5 py-3 rounded-full">
                                Add to today's plan
                            </button>
                            <button onClick={() => toggleSaved?.(w)} className="border border-white/15 text-white text-[12px] font-bold px-5 py-3 rounded-full">
                                Save for later
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}