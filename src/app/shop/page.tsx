import GroceryUpgrader from "@/components/grocery-upgrader";
import BottomNav from "@/components/bottom-nav";
import { ShopPeel } from "@/components/kitchen/shop-peel";

export default function ShopPage() {
  return (
    <div className="relative min-h-screen bg-cream text-ink">
      <main className="relative z-10 mx-auto w-full max-w-md">
        <ShopPeel />
        <section className="px-5 pt-8 pb-32">
          <h2 className="font-display mb-2 text-lg font-extrabold">Upgrade a pasted list</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            The peel above is your aisle list. Paste a rough list here if you want cleaner swaps.
          </p>
          <GroceryUpgrader />
        </section>
      </main>
      <BottomNav />
    </div>
  );
}
