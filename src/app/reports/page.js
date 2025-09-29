import SidebarWrapper from "@/components/SidebarWrapper";
import ReportPanel from "./ReportPanel";
import { getAvgTime, getFilterAccess, getLastAccess } from "@/actions/reports";

export default async function page() {

    const lastAccess = await getLastAccess();
    const avgTime = await getAvgTime();
    const filterAccess = await getFilterAccess(null, null, null, null, null);
    return <SidebarWrapper><ReportPanel lastAccess={lastAccess} avgTime={avgTime} filterAccess={filterAccess}/></SidebarWrapper>
};
