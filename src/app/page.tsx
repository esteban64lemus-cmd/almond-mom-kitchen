"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  ChevronDown,
  ShoppingBag,
  Refrigerator,
  Zap,
  CheckCircle2
} from "lucide-react";

export default function LandingPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FBF9F6]">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-white/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="font-playfair text-2xl font-bold tracking-tighter text-obsidian">
              ALMOND<span className="text-sage italic">MOM</span>
            </span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#solutions" className="text-sm font-medium text-obsidian/60 hover:text-obsidian transition-colors">Solutions</a>
            <a href="#features" className="text-sm font-medium text-obsidian/60 hover:text-obsidian transition-colors">Features</a>
            <Link 
              href="/login" 
              className="rounded-full bg-obsidian px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-obsidian/10"
            >
              Launch App
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center pt-20">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/hero_organic_kitchen_1777091518808.png"
            alt="Organic Luxury Kitchen"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#FBF9F6]/80 via-[#FBF9F6]/20 to-[#FBF9F6]" />
        </div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        >
          <motion.div variants={itemVariants} className="mb-6 flex justify-center">
            <span className="flex items-center gap-2 rounded-full bg-sage/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-sage border border-sage/20">
              <Sparkles className="h-3 w-3" /> The Rebirth of Clean Eating
            </span>
          </motion.div>
          <motion.h1 
            variants={itemVariants}
            className="mb-6 font-playfair text-6xl font-bold leading-[1.1] text-obsidian md:text-8xl"
          >
            Luxury in every <br />
            <span className="text-sage italic">ingredient.</span>
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-obsidian/70 md:text-xl"
          >
            Almond Mom is the elite AI kitchen companion for the modern, 
            health-conscious family. We transform the complex world of 
            organic nutrition into a seamless, high-end experience.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link 
              href="/login" 
              className="group flex items-center gap-2 rounded-full bg-obsidian px-8 py-4 text-lg font-bold text-white transition-all hover:bg-obsidian/90 hover:shadow-2xl hover:shadow-obsidian/20 active:scale-95"
            >
              Start Your Detox <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a 
              href="#solutions" 
              className="flex items-center gap-2 rounded-full border border-obsidian/10 bg-white/50 px-8 py-4 text-lg font-bold text-obsidian backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl active:scale-95"
            >
              The Vision
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute -bottom-24 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="h-8 w-8 animate-bounce text-obsidian/20" />
          </motion.div>
        </motion.div>
      </section>

      {/* Solutions Grid */}
      <section id="solutions" className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-playfair text-4xl font-bold text-obsidian md:text-5xl">Your Intelligent Pantry.</h2>
            <p className="mx-auto max-w-2xl text-lg text-obsidian/60 italic">
              &quot;We don&apos;t just eat. We curate our vitality.&quot;
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Refrigerator,
                title: "Fridge Rescue",
                desc: "Real-time AI auditing. Snap a photo, and we'll identify every toxic additive while crafting a gourmet, clean-label recipe from your inventory.",
                color: "bg-sage/10 text-sage"
              },
              {
                icon: ShoppingBag,
                title: "Shop Upgrader",
                desc: "Never settle for 'good enough.' Paste your shopping list, and our AI suggests elite, organic, and high-protein alternatives for everything.",
                color: "bg-copper/10 text-copper"
              },
              {
                icon: ShieldCheck,
                title: "Clean Label Verified",
                desc: "Our proprietary database flags hidden gums, seed oils, and artificial sweeteners before they ever touch your kitchen counter.",
                color: "bg-obsidian/5 text-obsidian"
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="group rounded-3xl bg-white p-10 shadow-sm transition-all hover:shadow-2xl hover:shadow-obsidian/5 border border-obsidian/[0.03]"
              >
                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${feature.color}`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-4 font-playfair text-2xl font-bold text-obsidian">{feature.title}</h3>
                <p className="leading-relaxed text-obsidian/60">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-obsidian py-32 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-sage/10 blur-[100px] rounded-full translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/4 h-full bg-copper/5 blur-[80px] rounded-full -translate-x-1/2" />
        
        <div className="mx-auto max-w-5xl px-6 relative z-10">
          <div className="grid items-center gap-16 md:grid-cols-2">
            <div>
              <span className="mb-6 block text-xs font-black uppercase tracking-[0.3em] text-sage">The Manifesto</span>
              <h2 className="mb-8 font-playfair text-4xl font-bold leading-tight md:text-6xl">
                Luxury is <br />
                <span className="text-sage italic">knowing</span> what&apos;s inside.
              </h2>
              <p className="mb-10 text-xl font-light leading-relaxed text-white/70">
                In a world of ultra-processed convenience, Almond Mom returns 
                standard to the home. We believe your kitchen should be your 
                sanctuary, and your food should be your greatest investment.
              </p>
              <ul className="space-y-4">
                {[
                  "Zero Seed Oils Policy",
                  "Elite Protein Optimization",
                  "Transparent Traceability",
                  "Chef-Curated AI Intelligence"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sage/80 font-medium">
                    <CheckCircle2 className="h-5 w-5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-[40px] shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800"
                alt="Clean Label Ingredients"
                fill
                className="object-cover grayscale-[0.2] hover:scale-110 transition-transform duration-1000"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl rounded-[50px] bg-sage/10 p-16 md:p-24 border border-sage/20 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-24 h-24 bg-sage/20 blur-3xl rounded-full -translate-x-12 -translate-y-12" />
          <h2 className="mb-8 font-playfair text-4xl font-bold text-obsidian md:text-6xl">Ready for the Rebirth?</h2>
          <p className="mx-auto mb-12 max-w-xl text-lg text-obsidian/70">
            Join the elite circle of home-makers who refuse to compromise on quality. 
            Access your intelligent kitchen vault today.
          </p>
          <Link 
            href="/login" 
            className="inline-flex items-center gap-3 rounded-full bg-obsidian px-10 py-5 text-xl font-bold text-white shadow-2xl transition-all hover:bg-obsidian/90 hover:-translate-y-1 hover:shadow-obsidian/30 active:translate-y-0"
          >
            Launch the App <Zap className="h-6 w-6 fill-current" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-obsidian/5 py-12 px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
          <span className="font-playfair text-xl font-bold text-obsidian">
            ALMOND<span className="text-sage italic">MOM</span>
          </span>
          <div className="text-sm font-medium text-obsidian/40">
            &copy; 2026 Almond Mom Kitchen. Organic Luxury Living.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-obsidian/60 hover:text-obsidian transition-colors">Instagram</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-obsidian/60 hover:text-obsidian transition-colors">Manifesto</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-obsidian/60 hover:text-obsidian transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
