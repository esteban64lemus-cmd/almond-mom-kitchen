import GroceryUpgrader from "@/components/grocery-upgrader";
import BottomNav from "@/components/bottom-nav";

export default function ShopPage() {
  return (
    <div className="relative min-h-screen bg-[#FDFCFB] pb-24">
      <div className="pointer-events-none fixed right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-stone-100 opacity-60 blur-[120px]" />
      
      <main className="relative z-10 mx-auto w-full max-w-2xl px-6 pt-12">
        <GroceryUpgrader />
      </main>

      <BottomNav />
    </div>
  );
}
