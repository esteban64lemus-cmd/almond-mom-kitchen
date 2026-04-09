import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/images";
import { useLocation } from "wouter";
import { Heart, Leaf, Sparkles } from "lucide-react";

export default function About() {
  const [, setLocation] = useLocation();

  const values = [
    {
      icon: Leaf,
      title: "Pure Ingredients",
      description: "No GMOs, no preservatives, no artificial flavors. Just real food that nourishes.",
    },
    {
      icon: Heart,
      title: "Health First",
      description: "Every recipe is designed with your family's wellbeing in mind.",
    },
    {
      icon: Sparkles,
      title: "Gluten-Free Living",
      description: "Delicious recipes that prove healthy eating doesn't mean sacrificing taste.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      text: "These recipes changed my family's life! My kids actually ask for seconds now.",
      rating: 5,
    },
    {
      name: "Jennifer L.",
      text: "Finally, gluten-free recipes that don't taste like cardboard. Highly recommend!",
      rating: 5,
    },
    {
      name: "Maria R.",
      text: "The meal plans are a lifesaver for busy moms like me. So easy to follow!",
      rating: 5,
    },
  ];

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

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-secondary to-background">
        <div className="container max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-display mb-6">About Almond Mom</h1>
          <p className="text-xl text-muted-foreground mb-8">
            A journey from struggling with dietary restrictions to creating a thriving community of healthy eaters.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container max-w-3xl">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-4xl font-display mb-6">The Story</h2>
              <p className="text-lg text-muted-foreground mb-4">
                What started as a personal mission to feed my family healthy, delicious food has blossomed into Almond Mom Kitchen. 
                When I discovered that my family needed to go gluten-free and eliminate artificial preservatives, I wasn't willing to 
                sacrifice taste or nutrition.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                I spent months experimenting, testing, and perfecting recipes. My kitchen became a laboratory of flavors, and my family 
                became my taste-testers. What emerged was a collection of recipes that prove healthy eating doesn't mean boring eating.
              </p>
              <p className="text-lg text-muted-foreground">
                Today, I'm thrilled to share these recipes with you. Each one is crafted with love, tested thoroughly, and designed to 
                nourish your body while delighting your taste buds.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img 
                src={images.recipes.almondBanana} 
                alt="Almond Mom in the kitchen" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container max-w-3xl">
          <h2 className="text-4xl font-display mb-12 text-center">Our Philosophy</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <Card key={idx} className="p-6 text-center">
                  <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16">
        <div className="container max-w-3xl">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-12 text-center">
            <h2 className="text-3xl font-display mb-6">Our Mission</h2>
            <p className="text-xl text-muted-foreground mb-6">
              To empower families to live healthier lives through delicious, accessible recipes that celebrate 
              whole foods and eliminate unnecessary additives.
            </p>
            <p className="text-lg text-muted-foreground">
              We believe that eating well should be easy, enjoyable, and something the whole family can embrace together.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-secondary/50">
        <div className="container max-w-3xl">
          <h2 className="text-4xl font-display mb-12 text-center">What People Are Saying</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold">{testimonial.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container max-w-3xl text-center">
          <h2 className="text-4xl font-display mb-6">Ready to Transform Your Kitchen?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of families discovering that healthy eating is delicious.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => setLocation("/")}>
              Explore Recipes
            </Button>
            <Button size="lg" variant="outline" onClick={() => setLocation("/submit-recipe")}>
              Submit Your Recipe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container text-center text-muted-foreground">
          <p>&copy; 2026 Almond Mom Kitchen. All rights reserved.</p>
          <p className="mt-2">Made with ❤️ for families who care about what they eat.</p>
        </div>
      </footer>
    </div>
  );
}
