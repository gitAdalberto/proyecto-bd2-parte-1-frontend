import SidebarWrapper from "@/components/SidebarWrapper"
import ProductsPanel from "./ProductsPanel"

export default async function page() {
    
    return (
        <SidebarWrapper>
            <ProductsPanel></ProductsPanel>
        </SidebarWrapper>
    )
};
