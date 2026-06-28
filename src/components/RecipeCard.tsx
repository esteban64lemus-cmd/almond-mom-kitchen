import Link from "next/link";
import { Recipe } from "@/data/recipes";
import { motion } from "framer-motion";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/blog/${recipe.slug}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-neutral-100 transition-all hover:shadow-md"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {recipe.dietaryTags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="bg-white/90 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full text-neutral-800 shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col flex-1 p-5">
          <h3 className="text-xl font-bold text-neutral-900 line-clamp-1 mb-2">
            {recipe.title}
          </h3>
          <p className="text-sm text-neutral-600 line-clamp-2 mb-4 flex-1">
            {recipe.description}
          </p>
          <div className="flex items-center justify-between text-xs font-medium text-neutral-500 pt-4 border-t border-neutral-100">
            <span className="flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              {recipe.prepTime}
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              {recipe.servings} servings
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
