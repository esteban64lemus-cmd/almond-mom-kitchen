import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useState } from "react";
import { toast } from "sonner";
import { Check, X, Clock } from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [rejectionReason, setRejectionReason] = useState<Record<number, string>>({});

  const { data: pendingDrafts = [], isLoading, refetch } = trpc.drafts.pending.useQuery();
  const approveMutation = trpc.drafts.approve.useMutation();
  const rejectMutation = trpc.drafts.reject.useMutation();

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <h1 className="text-2xl font-display mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            Only administrators can access this page.
          </p>
          <Button onClick={() => setLocation("/")} className="w-full">
            Go Home
          </Button>
        </Card>
      </div>
    );
  }

  const handleApprove = async (draftId: number) => {
    try {
      await approveMutation.mutateAsync({ draftId });
      toast.success("Recipe approved and published!");
      refetch();
    } catch (error) {
      toast.error("Failed to approve recipe");
      console.error(error);
    }
  };

  const handleReject = async (draftId: number) => {
    const reason = rejectionReason[draftId];
    if (!reason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }

    try {
      await rejectMutation.mutateAsync({ draftId, reason });
      toast.success("Recipe rejected");
      setRejectionReason({ ...rejectionReason, [draftId]: "" });
      refetch();
    } catch (error) {
      toast.error("Failed to reject recipe");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-display mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Review and moderate recipe submissions
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-3xl font-bold">{pendingDrafts.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Published</p>
                <p className="text-3xl font-bold">-</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <X className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-3xl font-bold">-</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Pending Recipes */}
        <div>
          <h2 className="text-2xl font-display mb-6">Pending Recipes</h2>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted h-48 rounded-lg" />
                </div>
              ))}
            </div>
          ) : pendingDrafts.length > 0 ? (
            <div className="space-y-6">
              {pendingDrafts.map((draft) => (
                <Card key={draft.id} className="p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Recipe Info */}
                    <div className="md:col-span-2">
                      <h3 className="text-2xl font-display mb-2">{draft.title}</h3>
                      {draft.description && (
                        <p className="text-muted-foreground mb-4">{draft.description}</p>
                      )}

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <p className="text-sm font-medium">Category</p>
                          <p className="text-muted-foreground">{draft.category.replace("-", " ")}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Difficulty</p>
                          <p className="text-muted-foreground">{draft.difficulty}</p>
                        </div>
                        {draft.prepTime && (
                          <div>
                            <p className="text-sm font-medium">Prep Time</p>
                            <p className="text-muted-foreground">{draft.prepTime} min</p>
                          </div>
                        )}
                        {draft.cookTime && (
                          <div>
                            <p className="text-sm font-medium">Cook Time</p>
                            <p className="text-muted-foreground">{draft.cookTime} min</p>
                          </div>
                        )}
                      </div>

                      {draft.ingredients && (
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">Ingredients Preview</p>
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-3">
                            {draft.ingredients}
                          </p>
                        </div>
                      )}

                      {draft.instructions && (
                        <div>
                          <p className="text-sm font-medium mb-2">Instructions Preview</p>
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-3">
                            {draft.instructions}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="space-y-4">
                      <Button
                        onClick={() => handleApprove(draft.id)}
                        disabled={approveMutation.isPending}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        {approveMutation.isPending ? "Approving..." : "Approve"}
                      </Button>

                      <div>
                        <Textarea
                          placeholder="Rejection reason (required)"
                          value={rejectionReason[draft.id] || ""}
                          onChange={(e) =>
                            setRejectionReason({
                              ...rejectionReason,
                              [draft.id]: e.target.value,
                            })
                          }
                          rows={3}
                          className="text-sm"
                        />
                      </div>

                      <Button
                        onClick={() => handleReject(draft.id)}
                        disabled={rejectMutation.isPending}
                        variant="destructive"
                        className="w-full"
                      >
                        {rejectMutation.isPending ? "Rejecting..." : "Reject"}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground text-lg">
                No pending recipes to review
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
