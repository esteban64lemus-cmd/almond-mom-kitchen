import { redirect } from "next/navigation";

// Sleep/energy logging lives in the quest dashboard now.
export default function LogPage() {
  redirect("/quests");
}
