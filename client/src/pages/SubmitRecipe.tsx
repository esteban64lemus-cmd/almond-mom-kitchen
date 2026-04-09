import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useState } from "react";
import { toast } from "sonner";

export default function SubmitRecipe() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitMutation = trpc.drafts.submit.useMutation();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    category: "gluten-free",
    prepTime: "",
    cookTime: "",
    servings: "",
    yield: "",
    difficulty: "easy",
    tags: "",
    imageUrl: "",
    videoUrl: "",
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <h1 className="text-2xl font-display mb-4">Sign In Required</h1>
          <p className="text-muted-foreground mb-6">
            You need to be signed in to submit recipes.
          </p>
          <Button onClick={() => setLocation("/")} className="w-full">
            Go Home
          </Button>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitMutation.mutateAsync({
        title: formData.title,
        description: formData.description,
        ingredients: formData.ingredients,
        instructions: formData.instructions,
        category: formData.category as any,
        prepTime: formData.prepTime ? parseInt(formData.prepTime) : undefined,
        cookTime: formData.cookTime ? parseInt(formData.cookTime) : undefined,
        servings: formData.servings ? parseInt(formData.servings) : undefined,
        yield: formData.yield,
        difficulty: formData.difficulty as any,
        tags: formData.tags,
        imageUrl: formData.imageUrl,
        videoUrl: formData.videoUrl,
      });

      toast.success("Recipe submitted! Our team will review it soon.");
      setFormData({
        title: "",
        description: "",
        ingredients: "",
        instructions: "",
        category: "gluten-free",
        prepTime: "",
        cookTime: "",
        servings: "",
        yield: "",
        difficulty: "easy",
        tags: "",
        imageUrl: "",
        videoUrl: "",
      });
      setLocation("/");
    } catch (error) {
      toast.error("Failed to submit recipe. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-2xl">
        <div className="mb-8">
          <h1 className="text-4xl font-display mb-2">Submit a Recipe</h1>
          <p className="text-muted-foreground text-lg">
            Share your healthy recipe with our community. Our team will review and publish it.
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">Recipe Title *</label>
              <Input
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Almond Flour Banana Bread"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of your recipe..."
                rows={3}
              />
            </div>

            {/* Category & Difficulty */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gluten-free">Gluten-Free</SelectItem>
                    <SelectItem value="dairy-free">Dairy-Free</SelectItem>
                    <SelectItem value="no-preservatives">No Preservatives</SelectItem>
                    <SelectItem value="no-gmo">No GMO</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="quick-easy">Quick & Easy</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Difficulty</label>
                <Select value={formData.difficulty} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <label className="block text-sm font-medium mb-2">Ingredients *</label>
              <Textarea
                required
                value={formData.ingredients}
                onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                placeholder="List each ingredient on a new line. e.g. 2 cups almond flour, 3 ripe bananas, 1 tsp vanilla extract"
                rows={6}
              />
            </div>

            {/* Instructions */}
            <div>
              <label className="block text-sm font-medium mb-2">Instructions *</label>
              <Textarea
                required
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                placeholder="Step-by-step instructions. e.g. 1. Preheat oven to 350°F, 2. Mix dry ingredients, 3. Combine wet ingredients"
                rows={6}
              />
            </div>

            {/* Timing & Servings */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Prep Time (minutes)</label>
                <Input
                  type="number"
                  value={formData.prepTime}
                  onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
                  placeholder="15"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Cook Time (minutes)</label>
                <Input
                  type="number"
                  value={formData.cookTime}
                  onChange={(e) => setFormData({ ...formData, cookTime: e.target.value })}
                  placeholder="30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Servings</label>
                <Input
                  type="number"
                  value={formData.servings}
                  onChange={(e) => setFormData({ ...formData, servings: e.target.value })}
                  placeholder="4"
                />
              </div>
            </div>

            {/* Yield & Tags */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Yield (e.g., 12 cookies)</label>
                <Input
                  value={formData.yield}
                  onChange={(e) => setFormData({ ...formData, yield: e.target.value })}
                  placeholder="e.g., 12 cookies"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                <Input
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="e.g., breakfast, dessert, quick"
                />
              </div>
            </div>

            {/* Image & Video URLs */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <Input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Video URL (YouTube, etc.)</label>
                <Input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                {isSubmitting ? "Submitting..." : "Submit Recipe"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setLocation("/")}
              >
                Cancel
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              * Required fields. Your recipe will be reviewed by our team before publishing.
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}
