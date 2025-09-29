import { handlePdf2 } from "@/actions/pdf"
import { DownloadIcon } from "@chakra-ui/icons"
import {Button} from "@chakra-ui/react"

export default function PdfButton2({ fileName, id}) {
    return (
        <Button colorScheme="red" variant='outline' onClick={() => { handlePdf2(fileName, id) }} leftIcon={<DownloadIcon />}>Pdf</Button>
    )
};
