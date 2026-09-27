"use client";
import { useEffect, useState, use } from "react";
import { usePlan } from "@/context/PlanContext";
import { getWorkouts } from "@/lib/api";

export default function DetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { addToPlan, toggleSave, saved, plan } = usePlan();
    const [exercise, setExercise] = useState<any>(null);
    const [toast, setToast] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            const result: any = await Promise.resolve(getWorkouts());
            const list = Array.isArray(result) ? result : result?.workouts || result?.data || [];
            const found = list.find((e: any) => String(e.id) === String(id));
            setExercise(found);
        };
        load();
    }, [id]);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2500);
    };

    if (!exercise) return <div className="min-h-screen bg-[#0E0E12] text-white p-10">Loading...</div>;

    const isSaved = saved?.some((e: any) => String(e.id) === String(id));
    const isInPlan = plan?.some((e: any) => String(e.id) === String(id));

    const handleAdd = () => {
        if (isInPlan) {
            showToast("Already added ✓");
            return;
        }
        addToPlan(exercise);
        showToast("✓ Added to today's plan");
    };

    const handleSave = () => {
        if (isSaved) {
            showToast("Already saved ✓");
            return;
        }
        toggleSave(exercise);
        showToast("✓ Saved for later");
    };

    return (
        <div className="min-h-screen bg-[#0E0E12] text-white p-6 md:p-10 flex justify-center relative">
            {toast && (
                <div className="fixed top-6 right-6 bg-[#1A1A23] border border-[#ccff00]/30 text-white text-[12px] font-bold px-5 py-3 rounded-full z-[100]">
                    <span className="w-5 h-5 rounded-full bg-[#ccff00] text-black inline-flex items-center justify-center mr-2 text-[10px]">✓</span>
                    {toast}
                </div>
            )}
            <div className="max-w-[1100px] w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="rounded-[20px] overflow-hidden border border-white/10 bg-[#1A1A23] h-[640px]">
                    <img src={exercise.image} alt={exercise.name} className="w-full h-full object-cover" />
                </div>
                <div className="h-[640px] flex flex-col justify-between">
                    <div>
                        <h1 className="text-[26px] font-black uppercase">{exercise.name}</h1>
                        <p className="text-[12px] text-[#9A9AAF] mt-2">{exercise.description}</p>
                        <div className="flex gap-2 mt-4">
                            <span className="bg-[#ccff00] text-black text-[10px] font-black px-3 py-1 rounded-full">BACK</span>
                            <span className="bg-[#ccff00] text-black text-[10px] font-black px-3 py-1 rounded-full">ARMS</span>
                        </div>
                        <div className="bg-[#15151D] rounded-2xl mt-6 border border-white/[0.06] divide-y divide-white/[0.06] overflow-hidden">
                            <Row label="EQUIPMENT" value={exercise.equipment || "Pull-up Bar"} />
                            <Row label="DURATION" value="15 min" />
                            <Row label="CALORIES" value="180 kcal" />
                            <Row label="RATING" value="4.7" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-[11px] font-black uppercase">INSTRUCTIONS</h3>
                        <ol className="text-[11px] text-[#9A9AAF] mt-3 space-y-1.5 list-decimal ml-4">
                            <li>Lie on the bench with eyes under the bar and feet planted.</li>
                            <li>Unrack with locked elbows and lower the bar to mid-chest.</li>
                            <li>Press up in a slight arc until elbows lock without bouncing.</li>
                            <li>Keep shoulder blades pinched and a natural arch in the back.</li>
                        </ol>
                        <div className="flex gap-3 mt-6">
                            <button onClick={handleAdd} className="bg-[#ccff00] text-black font-black text-[12px] px-6 py-3 rounded-full">
                                {isInPlan ? "Already added ✓" : "Add to today's plan"}
                            </button>
                            <button onClick={handleSave} className="border border-[#ccff00] text-[#ccff00] text-[12px] font-bold px-6 py-3 rounded-full">
                                {isSaved ? "Already saved ✓" : "Save for later"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
function Row({ label, value }: any) {
    return <div className="flex justify-between px-5 py-3.5 text-[11px]"><span className="text-[#6B6B7A] uppercase text-[10px] font-bold">{label}</span><span className="font-bold">{value}</span></div>;
}