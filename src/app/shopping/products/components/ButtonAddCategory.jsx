import { Button } from "@chakra-ui/react";
import { usePostProductCategory } from "../hooks/useProducts";

export default function ButtonAddCategory({ children, productId, categoryId, onClose }) {
    const mutation = usePostProductCategory(onClose);
    const handlePost = () => {
        mutation.mutate({
            productId: productId,
            categoryId: categoryId
        }
        )
    }
    return (
        <Button
            w='100%'
            colorScheme="green"
            variant='outline'
            onClick={handlePost}
        >
            {children}
        </Button>
    )
};
