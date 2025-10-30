
import { exportTableToPdf } from "@/actions/pdf2"
import { DownloadIcon } from "@chakra-ui/icons"
import {Button} from "@chakra-ui/react"

export default function PdfButton3({ fileName, headers, rows }) {
    return (
        <Button colorScheme="red" variant='solid' onClick={() => { exportTableToPdf(fileName,headers,rows  )}} leftIcon={<DownloadIcon />}>Pdf</Button>
    )
};
