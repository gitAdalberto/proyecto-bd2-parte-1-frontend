import { handlePdf } from "@/actions/pdf"
import { DownloadIcon } from "@chakra-ui/icons"
import {Button} from "@chakra-ui/react"

export default function PdfButton({ fileName }) {
    return (
        <Button colorScheme="red" variant='outline' onClick={() => { handlePdf(fileName) }} leftIcon={<DownloadIcon />}>Pdf</Button>
    )
};
