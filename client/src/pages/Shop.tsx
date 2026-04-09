import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/images";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { BookOpen, Calendar, Video, Gift } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Shop() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [loadingProduct, setLoadingProduct] = useState<string | null>(null);

  const products = [
    {
      id: "gluten-free-cookbook",
      name: "Gluten-Free Cookbook",
      description: "100+ gluten-free recipes from Almond Mom Kitchen",
      price: "$29.99",
      type: "ebook",
      icon: BookOpen,
      features: ["100+ recipes", "Printable format", "Lifetime access"],
      image: images.recipes.acaiBowl,
    },
    {
      id: "weekly-meal-plan",
      name: "Weekly Meal Plan",
      description: "New meal plans every week with shopping lists",
      price: "$12.99/week",
      type: "subscription",
      icon: Calendar,
      features: ["Weekly plans", "Shopping lists", "Prep guides"],
      image: images.recipes.buddhaBowl,
    },
    {
      id: "monthly-meal-plan",
      name: "Monthly Meal Plan",
      description: "4 weeks of meal plans with recipes and shopping lists",
      price: "$49.99/month",
      type: "subscription",
      icon: Calendar,
      features: ["4 weeks of plans", "Shopping lists", "Video tutorials"],
      image: images.recipes.greenSmoothie,
    },
    {
      id: "baking-course",
      name: "Healthy Baking Masterclass",
      description: "Learn to bake gluten-free, no-preservatives treats",
      price: "$49.99",
      type: "course",
      icon: Video,
      features: ["10+ video lessons", "Downloadable recipes", "Q&A support"],
      image: images.recipes.energyBalls,
    },
    {
      id: "meal-prep-course",
      name: "Meal Prep for Busy Moms",
      description: "Master meal prep with healthy, quick recipes",
      price: "$39.99",
      type: "course",
      icon: Video,
      features: ["8 video lessons", "Meal prep templates", "Time-saving tips"],
      image: images.recipes.zucchiniPasta,
    },
    {
      id: "premium-recipes",
      name: "Premium Recipe Bundle",
      description: "Access to 50+ exclusive premium recipes",
      price: "$14.99",
      type: "ebook",
      icon: Gift,
      features: ["50+ recipes", "Exclusive content", "Regular updates"],
      image: images.heroImage,
    },
  ];

  const handlePurchase = (productId: string) => {
    if (!user) {
      window.location.href = getLoginUrl();
      return;
    }

    setLoadingProduct(productId);
    toast.info("Redirecting to checkout...");
    
    // In a real implementation, this would call your checkout API
    setTimeout(() => {
      setLoadingProduct(null);
      toast.success("Checkout feature coming soon!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setLocation("/")}>
            <img src={images.logo} alt="Almond Mom Kitchen" className="h-10 w-10" />
            <h1 className="text-2xl font-bold text-primary">Almond Mom Kitchen</h1>
          </div>
          <Button variant="ghost" onClick={() => setLocation("/")}>
            ← Back to Recipes
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-secondary to-background">
        <div className="container max-w-3xl text-center">
          <h1 className="text-5xl font-display mb-6">Shop</h1>
          <p className="text-xl text-muted-foreground">
            Cookbooks, meal plans, and video courses to transform your kitchen
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const Icon = product.icon;
              return (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {product.type}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="h-5 w-5 text-primary" />
                      <h3 className="text-xl font-display">{product.name}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                    <ul className="space-y-2 mb-6 flex-grow">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="text-primary">✓</span> {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-2xl font-bold text-primary">{product.price}</span>
                      <Button
                        onClick={() => handlePurchase(product.id)}
                        disabled={loadingProduct === product.id}
                      >
                        {loadingProduct === product.id ? "Loading..." : "Get Now"}
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Affiliate Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container max-w-3xl">
          <h2 className="text-4xl font-display mb-8 text-center">Recommended Products</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "High-Speed Blender",
                description: "Perfect for smoothie bowls and nut butters",
                commission: "Earn 10% commission",
              },
              {
                name: "Gluten-Free Flour Blend",
                description: "Our favorite flour for baking",
                commission: "Earn $5 per sale",
              },
              {
                name: "Meal Prep Containers",
                description: "Organize your weekly meal prep",
                commission: "Earn 8% commission",
              },
              {
                name: "Organic Almond Butter",
                description: "Cold-pressed, no additives",
                commission: "Earn 12% commission",
              },
            ].map((product, idx) => (
              <Card key={idx} className="p-6">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                <p className="text-primary font-medium text-sm">{product.commission}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container text-center text-muted-foreground">
          <p>&copy; 2026 Almond Mom Kitchen. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
