import { useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';

export default function AlertDialogOverlapped(props: { name: string; isOverlapped: boolean}) {
  const {name, isOverlapped} = props;
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef<HTMLDivElement>(null);

  return (
    <>
    <AlertDialog isOpen={isOverlapped} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="semibold">{name}</AlertDialogHeader>
            <AlertDialogBody>이미 장바구니에 등록된 상품입니다.</AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onClose} ml={3}>확인</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
          </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}