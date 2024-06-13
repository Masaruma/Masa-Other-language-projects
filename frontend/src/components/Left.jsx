// chakra
import {
  Box,
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

// icons
import { FaHome } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";

import { ImHappy } from "react-icons/im";
import { RiSpeakLine } from "react-icons/ri";
import Posting from "./Posting";
const Left = ({ setSelected, getPost }) => {
  // chakra
  const { isOpen, onOpen, onClose } = useDisclosure();
  // homeへ
  const backHome = () => {
    setSelected(null);
  };
  const goSearch = () => {
    setSelected("search");
  };
  return (
    <Box
      display={"flex"}
      flexDirection="column"
      maxW={"400px"}
      ml="auto"
      pos="fixed"
      top={0}
      // right={0}
      sx={{
        "& > *": {
          mr: "auto",
          mt: "5",
          fontSize: "1.5rem",
        },
      }}
    >
      <Button
        flex="1"
        variant="ghost"
        leftIcon={<ImHappy size={55} />}
        onClick={backHome}
      ></Button>
      <Button
        flex="1"
        variant="ghost"
        leftIcon={<FaHome size={43} />}
        onClick={backHome}
      >
        Home
      </Button>
      <Button
        flex="1"
        variant="ghost"
        leftIcon={<IoMdSearch size={43} />}
        onClick={goSearch}
      >
        Search
      </Button>
      <Button
        flex="1"
        p={15}
        rounded={105}
        colorScheme="blue"
        // variant="ghost"
        leftIcon={<RiSpeakLine size={40} />}
        onClick={onOpen}
      >
        ポストする
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          {/* <ModalBody> */}
          <Posting getPost={getPost}></Posting>
          {/* </ModalBody> */}
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Left;
