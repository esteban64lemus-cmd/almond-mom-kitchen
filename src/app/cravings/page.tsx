import CravingsCrusher from "@/components/cravings-crusher";
import BottomNav from "@/components/bottom-nav";

export default function CravingsPage() {
  return (
    <div className="relative min-h-screen bg-[#FDFCFB] pb-24">
      <div className="bg-lime-light pointer-events-none fixed top-[-5%] left-[-10%] h-[50%] w-[50%] rounded-full opacity-40 blur-[150px]" />

      <main className="relative z-10 mx-auto w-full max-w-2xl px-6 pt-12">
        <CravingsCrusher />
      </main>

      <BottomNav />
    </div>
  );
}
