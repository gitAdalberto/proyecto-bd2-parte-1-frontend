import SidebarWrapper from "@/components/SidebarWrapper";
import { verifySession } from "../lib/dal";
import { redirect } from "next/navigation";
import { getTransactions } from "@/actions/transactions";
import TransactionPanel from "./TransactionsPanel";
import { handleTitle } from "@/actions/user";

export default async function page() {
  const session = await verifySession();
  if (!session) return null;

  const userRole = session?.role;
  if (userRole !== "admin") redirect("/dashboard");

  //fetch
  let data = null;
  let error = null;

  const response = await getTransactions();
  if (response.success) {
    data = response.data;
  } else {
    error = response.data;
  }

  return (
    <SidebarWrapper>
      <TransactionPanel initialData={data} initialError={error}/>
    </SidebarWrapper>
  );
}
