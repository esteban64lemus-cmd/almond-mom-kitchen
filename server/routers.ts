import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { getPublishedRecipes, getRecipeBySlug, createRecipeDraft, getPendingDrafts, approveDraft, updateRecipeDraft } from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  recipes: router({
    list: publicProcedure
      .input(z.object({
        category: z.string().optional(),
        limit: z.number().default(20),
        offset: z.number().default(0),
      }))
      .query(({ input }) => getPublishedRecipes(input.category, input.limit, input.offset)),
    
    bySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(({ input }) => getRecipeBySlug(input.slug)),
  }),

  drafts: router({
    submit: protectedProcedure
      .input(z.object({
        title: z.string(),
        description: z.string().optional(),
        ingredients: z.string(),
        instructions: z.string(),
        category: z.enum(["gluten-free", "dairy-free", "no-preservatives", "no-gmo", "vegan", "quick-easy", "other"]),
        prepTime: z.number().optional(),
        cookTime: z.number().optional(),
        servings: z.number().optional(),
        yield: z.string().optional(),
        difficulty: z.enum(["easy", "medium", "hard"]).optional(),
        tags: z.string().optional(),
        imageUrl: z.string().optional(),
        videoUrl: z.string().optional(),
      }))
      .mutation(({ input, ctx }) => 
        createRecipeDraft({
          ...input,
          submittedBy: ctx.user!.id,
          status: "pending",
        })
      ),
    
    pending: protectedProcedure
      .query(async ({ ctx }) => {
        if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
        return getPendingDrafts();
      }),
    
    approve: protectedProcedure
      .input(z.object({ draftId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
        return approveDraft(input.draftId);
      }),
    
    reject: protectedProcedure
      .input(z.object({ draftId: z.number(), reason: z.string() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
        return updateRecipeDraft(input.draftId, { status: "rejected", rejectionReason: input.reason });
      }),
  }),
});

export type AppRouter = typeof appRouter;
