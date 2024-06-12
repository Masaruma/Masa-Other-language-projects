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
  Text,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";

// react-icons
import { FcLike } from "react-icons/fc";
import { CiShare1 } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
// Postをクリックするとコメントなども表示？
// とりあえず拡大表示
const Post = ({ post, setSelected, getPost, selected }) => {
  // クリックすると拡大表示

  const good = async () => {
    await axios.put(`http://localhost:8080/posts/${post.postId}/good`, {
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
      <Card maxW="100%" borderColor="brack" borderWidth="1px">
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
        {/* <Image objectFit="cover" src={post.imgURL} alt="Chakra UI" p={5} /> */}
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
          <Button flex="1" variant="ghost" leftIcon={<ChatIcon />}>
            Comment {post.commentAmount}
          </Button>
          <Button flex="1" variant="ghost" leftIcon={<CiShare1 />}>
            Share
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default Post;
