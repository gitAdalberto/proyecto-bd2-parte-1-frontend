
import SidebarWrapper from "@/components/SidebarWrapper";
import CategoriesPanel from "./CategoriesPanel";
import { fetchCategories } from "./actions/categories";

export default async function page() {
    const response = await fetchCategories();
    return (
        <SidebarWrapper>
            <CategoriesPanel response={response} />
        </SidebarWrapper>
    )
};
