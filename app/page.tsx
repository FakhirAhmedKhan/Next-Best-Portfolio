import { redirect } from "next/navigation";

export default function Page() {
  // canonical root -> /home
  redirect("/home");
}
