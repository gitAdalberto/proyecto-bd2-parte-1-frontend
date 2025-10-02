import SidebarWrapper from "@/components/SidebarWrapper";
import { verifySession } from "../lib/dal";
import { redirect } from "next/navigation";
import { getFilterTransactions, getTransactions } from "@/actions/transactions";
import TransactionPanel from "./TransactionsPanel";
import { handleTitle } from "@/actions/user";

export default async function page() {
  const session = await verifySession();
  if (!session) return null;

  const userRole = session?.role;
  if (userRole !== "admin") redirect("/dashboard");

  

  const response = await getFilterTransactions("mocachin", null, null, null, null, null);
  

  return (
    <SidebarWrapper>
      <TransactionPanel response={response}/>
    </SidebarWrapper>
  );
}
