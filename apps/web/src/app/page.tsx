import { Navigation } from "@/components/shared/Navigation";
import { Footer } from "@/components/shared/Footer";
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/home");
}
