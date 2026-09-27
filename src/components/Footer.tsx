export default function Footer() {
    return (
        <footer className="w-full bg-[#0A0A0F] border-t border-white/[0.08] mt-16">
            <div className="max-w-[1240px] mx-auto px-6 h-[64px] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <img src="/logo.png" alt="FITLOG" className="w-6 h-6 object-contain" />
                    <span className="text-white font-black text-[14px] tracking-[0.15em]">FITLOG</span>
                </div>
                <p className="text-[#6B6B7E] text-[12px]">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
            </div>
        </footer>
    );
}