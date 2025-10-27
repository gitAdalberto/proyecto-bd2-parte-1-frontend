import { CheckIcon, EditIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { useState } from 'react';
import { useUpdateMinimunStock } from '../../inventory/hooks/useInventory';

export default function PactchStockButton({id}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [stock, setStock] = useState("");
    const mutation = useUpdateMinimunStock(onClose);

    const handleUpdate = () =>{
        mutation.mutate({
            id: id,
            stock: stock,
        })
    }
  return (
    <>
      <Button onClick={onOpen} colorScheme='cyan' variant='solid'  iconSpacing={0} leftIcon={<EditIcon />}></Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Actualizar Stock Minimo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
                <FormLabel>
                    Stock Minimo
                </FormLabel>
                <Input placeholder='Stock Minimo' onChange={(e)=>setStock(parseInt(e.target.value))}></Input>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant='solid' colorScheme='blue' leftIcon={<CheckIcon />} onClick={handleUpdate} >
                Guardar
            </Button>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
};
