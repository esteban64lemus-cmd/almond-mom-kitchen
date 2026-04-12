import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { useLocation, useRoute } from "wouter";
import { ChevronLeft, Clock, Users, Flame, Share2 } from "lucide-react";

export default function RecipeDetail() {
  const [isMatch, params] = useRoute("/recipe/:slug");
  const [, setLocation] = useLocation();

  const { data: recipe, isLoading } = trpc.recipes.bySlug.useQuery(
    { slug: params?.slug || "" },
    { enabled: !!params?.slug }
  );

  if (!isMatch) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container max-w-4xl">
          <div className="animate-pulse space-y-8">
            <div className="h-96 bg-muted rounded-lg" />
            <div className="h-8 bg-muted rounded w-3/4" />
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded w-1/2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <h1 className="text-2xl font-display mb-4">Recipe Not Found</h1>
          <p className="text-muted-foreground mb-6">
            This recipe doesn't exist or has been removed.
          </p>
          <Button onClick={() => setLocation("/")} className="w-full">
            Back to Home
          </Button>
        </Card>
      </div>
    );
  }

  const ingredients = typeof recipe.ingredients === "string" 
    ? recipe.ingredients.split("\n").filter(Boolean)
    : [];
  
  const instructions = typeof recipe.instructions === "string"
    ? recipe.instructions.split("\n").filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          Back to Recipes
        </button>

        {/* Hero Image */}
        {recipe.imageUrl && (
          <div className="mb-8 rounded-lg overflow-hidden h-96">
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                {recipe.category.replace("-", " ")}
              </div>
              <h1 className="text-5xl font-display mb-4">{recipe.title}</h1>
              {recipe.description && (
                <p className="text-lg text-muted-foreground max-w-2xl">
                  {recipe.description}
                </p>
              )}
            </div>
            <Button variant="outline" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-6 py-6 border-t border-b border-border">
            {recipe.prepTime && (
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-sm">
                  <span className="font-medium">Prep:</span> {recipe.prepTime} min
                </span>
              </div>
            )}
            {recipe.cookTime && (
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-primary" />
                <span className="text-sm">
                  <span className="font-medium">Cook:</span> {recipe.cookTime} min
                </span>
              </div>
            )}
            {recipe.servings && (
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm">
                  <span className="font-medium">Servings:</span> {recipe.servings}
                </span>
              </div>
            )}
            {recipe.difficulty && (
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  <span className="font-medium">Difficulty:</span> {recipe.difficulty}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Ingredients */}
          <div className="md:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-2xl font-display mb-6">Ingredients</h2>
              <ul className="space-y-3">
                {ingredients.map((ingredient, i) => (
                  <li key={i} className="flex gap-3">
                    <input
                      type="checkbox"
                      className="mt-1 cursor-pointer"
                      id={`ingredient-${i}`}
                    />
                    <label htmlFor={`ingredient-${i}`} className="text-sm cursor-pointer">
                      {ingredient}
                    </label>
                  </li>
                ))}
              </ul>
              {recipe.yield && (
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Yield:</span> {recipe.yield}
                  </p>
                </div>
              )}
            </Card>
          </div>

          {/* Instructions */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-display mb-6">Instructions</h2>
            <div className="space-y-6">
              {instructions.map((instruction, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-medium text-sm">
                      {i + 1}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <p className="text-base leading-relaxed">{instruction}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Video */}
            {recipe.videoUrl && (
              <div className="mt-12 pt-12 border-t border-border">
                <h3 className="text-xl font-display mb-6">Video Tutorial</h3>
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={recipe.videoUrl}
                    title="Recipe Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Nutrition Info */}
            {recipe.nutritionInfo && (
              <div className="mt-12 pt-12 border-t border-border">
                <h3 className="text-xl font-display mb-6">Nutrition Information</h3>
                <Card className="p-6 bg-secondary/50">
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {recipe.nutritionInfo}
                  </p>
                </Card>
              </div>
            )}

            {/* Tags */}
            {recipe.tags && (
              <div className="mt-12 pt-12 border-t border-border">
                <h3 className="text-xl font-display mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.split(",").map((tag, i) => (
                    <span
                      key={i}
                      className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-display mb-3">Love This Recipe?</h3>
          <p className="text-muted-foreground mb-6">
            Share it with friends or subscribe for more healthy recipes.
          </p>
          <div className="flex gap-4 justify-center">
            <Button className="bg-primary hover:bg-primary/90">Subscribe</Button>
            <Button variant="outline">Share</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
