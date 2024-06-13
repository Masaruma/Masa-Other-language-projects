import DeleteMenu from "./DeleteMenu";
// chakra
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";

// react-icons
import { FcLike } from "react-icons/fc";
import { CiShare1 } from "react-icons/ci";
import axios from "axios";
import Commenting from "./Commenting";
// Postをクリックするとコメントなども表示？
// とりあえず拡大表示
const Post = ({ post, setSelected, getPost, selected }) => {
  // モーダルよう
  const { isOpen, onOpen, onClose } = useDisclosure();

  // クリックすると拡大表示

  const good = async () => {
    await axios.put(`/api/posts/${post.postId}/good`, {
      good: post.good + 1,
    });
    await getPost();
    // 関数アップデート
    setSelected((prevSelected) => {
      if (prevSelected && prevSelected.postId === post.postId) {
        const updatedPost = { ...prevSelected, good: prevSelected.good + 1 };
        return updatedPost;
      }
      return prevSelected;
    });
  };
  return (
    <>
      {/* chakra */}
      <Card maxW="500px" borderColor="brack" borderWidth="1px">
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />

              <Box>
                <Heading size="sm">{post.username}</Heading>
                <Box>
                  <Text textAlign="right">{post.createdAt}</Text>
                </Box>
              </Box>
            </Flex>
            {/* deleteボタン */}
            <DeleteMenu
              postId={post.postId}
              setSelected={setSelected}
              getPost={getPost}
            ></DeleteMenu>
          </Flex>
        </CardHeader>
        <CardBody
          onClick={() => {
            setSelected(post);
          }}
        >
          <Text fontSize="1.2rem">{post.content}</Text>
        </CardBody>
        {post.image && (
          <Image
            objectFit="cover"
            src={post.image}
            alt="Chakra UI"
            p={5}
            borderRadius={50}
            maxWidth="100%"
            maxHeight="300px"
          />
        )}
        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          <Button flex="1" variant="ghost" leftIcon={<FcLike />} onClick={good}>
            Like {post.good}
          </Button>
          <Button
            flex="1"
            variant="ghost"
            leftIcon={<ChatIcon />}
            onClick={onOpen}
          >
            Comment {post.commentAmount}
          </Button>
          <Button flex="1" variant="ghost" leftIcon={<CiShare1 />}>
            Share
          </Button>
        </CardFooter>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          {/* <ModalBody> */}
          <Commenting
            // posts={posts}
            getPost={getPost}
            // getComments={getComments}
            postId={post.postId}
            selected={selected}
            setSelected={setSelected}
          ></Commenting>
          {/* </ModalBody> */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Post;
