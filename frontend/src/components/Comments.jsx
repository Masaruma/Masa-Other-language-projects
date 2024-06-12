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
// Postをクリックするとコメントなども表示？
// とりあえず拡大表示
const Comments = ({ comment }) => {
  // クリックすると拡大表示
  return (
    <>
      {/* cgajra */}
      <Card maxW="100%" borderColor="brack" borderWidth="1px">
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />

              <Box>
                <Heading size="sm">{comment.username}</Heading>
                <Box>
                  <Text textAlign="right">{comment.createdAt}</Text>
                </Box>
                {/* <Text>Creator, Chakra UI</Text> */}
              </Box>
            </Flex>
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
              icon={<BsThreeDotsVertical />}
            />
          </Flex>
        </CardHeader>
        <CardBody>
          <Text fontSize="1.2rem">{comment.content}</Text>
        </CardBody>
        <CardFooter
          justify="space-between"
          marginBottom="5px"
          sx={{
            height: "40px",
            "& > button": {
              minW: "80px",
              height: "30px",
              fontSize: "12px",
              padding: "0 8px",
            },
          }}
        >
          <Button flex="1" variant="ghost" leftIcon={<FcLike />}>
            Like {comment.good}
          </Button>
          <Button flex="1" variant="ghost" leftIcon={<ChatIcon />}>
            Comment
          </Button>
          <Button flex="1" variant="ghost" leftIcon={<CiShare1 />}>
            Share
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default Comments;
