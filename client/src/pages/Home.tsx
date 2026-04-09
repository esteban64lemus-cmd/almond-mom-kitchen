import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { images } from "@/lib/images";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { ChefHat, Leaf, Sparkles, Video, BookOpen, Search } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Home() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  const { data: recipes = [], isLoading } = trpc.recipes.list.useQuery({
    category: selectedCategory,
    limit: 6,
  });

  const categories = [
    { id: "gluten-free", label: "Gluten-Free", icon: Leaf },
    { id: "dairy-free", label: "Dairy-Free", icon: Sparkles },
    { id: "no-preservatives", label: "No Preservatives", icon: ChefHat },
    { id: "vegan", label: "Vegan", icon: Leaf },
    { id: "quick-easy", label: "Quick & Easy", icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <img src={images.logo} alt="Almond Mom Kitchen" className="h-10 w-10" />
            <h1 className="text-2xl font-bold text-primary">Almond Mom Kitchen</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => setLocation("/recipes")}>
              Recipes
            </Button>
            <Button variant="ghost" onClick={() => setLocation("/videos")}>
              Videos
            </Button>
            <Button variant="ghost" onClick={() => setLocation("/about")}>
              About
            </Button>
            {user ? (
              <>
                <Button variant="ghost" onClick={() => setLocation("/submit-recipe")}>
                  Submit Recipe
                </Button>
                {user.role === "admin" && (
                  <Button variant="outline" onClick={() => setLocation("/admin")}>
                    Admin
                  </Button>
                )}
              </>
            ) : (
              <Button onClick={() => (window.location.href = getLoginUrl())}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <img
          src={images.heroImage}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container h-full flex flex-col justify-center items-start">
          <div className="max-w-2xl">
            <p className="text-white/80 text-lg mb-4 font-body">Welcome to</p>
            <h1 className="text-6xl md:text-7xl text-white mb-6 font-display">
              Almond Mom Kitchen
            </h1>
            <p className="text-white/90 text-xl mb-8 font-body max-w-xl">
              Clean eating, pure living. Gluten-free, no GMOs, no preservatives — just real food that nourishes.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
              Explore Recipes
            </Button>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="bg-card border-b border-border py-8">
        <div className="container">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search recipes by ingredient..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === undefined ? "default" : "outline"}
              onClick={() => setSelectedCategory(undefined)}
              size="sm"
            >
              All Recipes
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat.id)}
                size="sm"
                className="gap-2"
              >
                <cat.icon className="h-4 w-4" />
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-16">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-4xl font-display mb-2">Featured Recipes</h2>
            <p className="text-muted-foreground text-lg">
              Discover our latest healthy, delicious creations
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted h-64 rounded-lg mb-4" />
                  <div className="bg-muted h-6 rounded w-3/4 mb-2" />
                  <div className="bg-muted h-4 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : recipes && recipes.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map((recipe: any) => (
                <Card
                  key={recipe.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => setLocation(`/recipe/${recipe.slug}`)}
                >
                  {recipe.imageUrl && (
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={recipe.imageUrl}
                        alt={recipe.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        {recipe.category.replace(/[-]/g, " ")}
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-display mb-2">{recipe.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {recipe.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {recipe.prepTime && (
                        <span>⏱ {recipe.prepTime} min</span>
                      )}
                      {recipe.cookTime && (
                        <span>🔥 {recipe.cookTime} min</span>
                      )}
                      {recipe.servings && (
                        <span>👥 {recipe.servings} servings</span>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No recipes found</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Sections */}
      <section className="bg-primary/5 py-16 border-t border-border">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-display mb-2">Cookbook</h3>
              <p className="text-muted-foreground mb-4">
                Get our complete collection of healthy recipes in one beautiful book
              </p>
              <Button variant="outline">Coming Soon</Button>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-display mb-2">Video Tutorials</h3>
              <p className="text-muted-foreground mb-4">
                Watch step-by-step videos for every recipe
              </p>
              <Button variant="outline" onClick={() => setLocation("/videos")}>
                Watch Now
              </Button>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-display mb-2">Newsletter</h3>
              <p className="text-muted-foreground mb-4">
                Get new recipes delivered to your inbox daily
              </p>
              <Button variant="outline">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-display font-semibold mb-4">Almond Mom Kitchen</h4>
              <p className="text-sm text-muted-foreground">
                Clean eating, pure living. No GMOs, no preservatives, just real food.
              </p>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-4">Recipes</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Gluten-Free</a></li>
                <li><a href="#" className="hover:text-foreground">Dairy-Free</a></li>
                <li><a href="#" className="hover:text-foreground">Vegan</a></li>
                <li><a href="#" className="hover:text-foreground">Quick & Easy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
                <li><a href="#" className="hover:text-foreground">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-4">Follow</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Instagram</a></li>
                <li><a href="#" className="hover:text-foreground">Pinterest</a></li>
                <li><a href="#" className="hover:text-foreground">YouTube</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 Almond Mom Kitchen. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
