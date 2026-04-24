import { redirect } from "next/navigation";

export default function RootPage() {
  // Since this is purely a web app backend entrance, we redirect to login immediately.
  // The marketing site lives on Squarespace.
  redirect("/login");
}
