import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { getPublishedRecipes, getRecipeBySlug, createRecipeDraft, getPendingDrafts, approveDraft, updateRecipeDraft, createNotification, getUserNotifications, markNotificationAsRead, deleteNotification, getUserByOpenId } from "./db";

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
      .mutation(async ({ input, ctx }) => {
        const draft = await createRecipeDraft({
          ...input,
          submittedBy: ctx.user!.id,
          status: "pending",
        });
        
        if (draft) {
          await createNotification({
            userId: ctx.user!.id,
            type: "info",
            title: "Recipe Submitted",
            message: `Your recipe "${input.title}" has been submitted for review.`,
            relatedDraftId: draft.id,
          });
          
          if (process.env.OWNER_OPEN_ID) {
            const adminUser = await getUserByOpenId(process.env.OWNER_OPEN_ID);
            if (adminUser) {
              await createNotification({
                userId: adminUser.id,
                type: "recipe_submitted",
                title: "New Recipe Submission",
                message: `${ctx.user!.name || 'A user'} submitted a new recipe: "${input.title}"`,
                relatedDraftId: draft.id,
              });
            }
          }
        }
        
        return draft;
      }),
    
    pending: protectedProcedure
      .query(async ({ ctx }) => {
        if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
        return getPendingDrafts();
      }),
    
    approve: protectedProcedure
      .input(z.object({ draftId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
        
        const drafts = await getPendingDrafts(50);
        const draft = drafts.find(d => d.id === input.draftId);
        
        const recipe = await approveDraft(input.draftId);
        
        if (recipe && draft) {
          await createNotification({
            userId: draft.submittedBy,
            type: "draft_approved",
            title: "Recipe Approved!",
            message: `Your recipe "${recipe.title}" has been approved and published!`,
            relatedRecipeId: recipe.id,
            actionUrl: `/recipe/${recipe.slug}`,
          });
        }
        
        return recipe;
      }),
    
    reject: protectedProcedure
      .input(z.object({ draftId: z.number(), reason: z.string() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
        const draft = await updateRecipeDraft(input.draftId, { status: "rejected", rejectionReason: input.reason });
        
        if (draft) {
          await createNotification({
            userId: draft.submittedBy,
            type: "draft_rejected",
            title: "Recipe Needs Changes",
            message: `Your recipe submission was not approved. Reason: ${input.reason}`,
            relatedDraftId: draft.id,
          });
        }
        
        return draft;
      }),
  }),

  notifications: router({
    list: protectedProcedure
      .input(z.object({ limit: z.number().default(20) }))
      .query(({ input, ctx }) => getUserNotifications(ctx.user!.id, input.limit)),
    
    markAsRead: protectedProcedure
      .input(z.object({ notificationId: z.number() }))
      .mutation(({ input }) => markNotificationAsRead(input.notificationId)),
    
    delete: protectedProcedure
      .input(z.object({ notificationId: z.number() }))
      .mutation(({ input }) => deleteNotification(input.notificationId)),
  }),
});

export type AppRouter = typeof appRouter;
