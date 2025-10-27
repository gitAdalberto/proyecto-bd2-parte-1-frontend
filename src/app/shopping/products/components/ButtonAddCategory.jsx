import { Button, Flex } from "@chakra-ui/react";
import { usePostProductCategory } from "../hooks/useProducts";
import { AddIcon } from "@chakra-ui/icons";

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
        <Flex direction='row'gap='1em'>
            <Button
                
                colorScheme="green"
                variant='solid'
                onClick={handlePost}
                leftIcon={<AddIcon />}
                iconSpacing={0}
            />
                
            <Button
                w='100%'
            >
                {children}
            </Button>
        </Flex>
    )
};
