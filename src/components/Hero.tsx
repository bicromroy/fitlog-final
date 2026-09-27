import Image from "next/image";

export default function Hero() {
    return (
        <div className="bg-[#1c1c20] rounded-2xl p-10 flex justify-between items-center border border-[#2a2a2e]">
            <div>
                <p className="text-[10px] tracking-[3px] text-[#c6ff00] font-bold">WORKOUT LIBRARY</p>
                <h1 className="text-[28px] font-black mt-3 leading-[1.1]">TRAIN WITH INTENT. LOG<br />EVERY SET.</h1>
                <a href="#library" className="mt-6 inline-block bg-[#c6ff00] text-black text-[10px] font-black px-5 py-2 rounded-full">BROWSE WORKOUTS</a>
            </div>

            <Image
                src="/banner.png"
                alt="hero"
                width={240}
                height={200}
                className="w-[240px] h-[200px] object-contain hidden md:block"
                priority
            />
        </div>
    )
}