import SidebarWrapper from "@/components/SidebarWrapper";
import ReportPanel from "./ReportPanel";
import { getAvgTime, getLastAccess } from "@/actions/reports";

export default async function page() {

    const lastAccess = await getLastAccess();
    const avgTime = await getAvgTime();
    return <SidebarWrapper><ReportPanel lastAccess={lastAccess} avgTime={avgTime} /></SidebarWrapper>
};
