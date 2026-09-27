"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
    const pathname = usePathname();
    const { plan, saved } = usePlan();

    const isHome = pathname === "/";
    const isMyPlan = pathname.startsWith("/my-plan");

    const planCount = plan?.length || 0;
    const savedCount = saved?.length || 0;

    return (
        <nav className="bg-[#0E0E12] border-b border-white/[0.06] sticky top-0 z-50">
            <div className="max-w-[1024px] mx-auto px-4 h-[56px] flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <img src="/logo.png" alt="logo" className="w-[22px] h-[22px] object-contain" />
                    <span className="text-white font-black text-[13px] tracking-[0.12em]">FITLOG</span>
                </Link>

                <div className="bg-[#1A1A23] rounded-full p-1 flex gap-1 border border-white/[0.06]">
                    <Link
                        href="/"
                        className={`text-[11px] font-bold px-5 py-1.5 rounded-full transition ${isHome ? "bg-[#2A2A36] text-[#ccff00]" : "text-[#6B6B7A]"}`}
                    >
                        Workouts
                    </Link>
                    <Link
                        href="/my-plan"
                        className={`text-[11px] font-bold px-5 py-1.5 rounded-full transition ${isMyPlan ? "bg-[#2A2A36] text-[#ccff00]" : "text-[#6B6B7A]"}`}
                    >
                        My Plan
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/my-plan" className="flex items-center gap-2 text-[11px]">
                        <span className="text-[#9A9AAF]">Plan</span>
                        <span className="bg-[#ccff00] text-black font-black w-5 h-5 rounded-full flex items-center justify-center text-[10px]">
                            {planCount}
                        </span>
                    </Link>
                    <Link href="/my-plan" className="flex items-center gap-2 text-[11px]">
                        <span className="text-[#9A9AAF]">Saved</span>
                        <span className="border border-[#ccff00] text-[#ccff00] font-black w-5 h-5 rounded-full flex items-center justify-center text-[10px]">
                            {savedCount}
                        </span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}