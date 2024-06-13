import React, { useRef } from "react";
// ui
// chakra
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Textarea,
} from "@chakra-ui/react";
// axios
import axios from "axios";

const Commenting = ({
  posts,
  getPost,
  getComments,
  selected,
  setSelected,
  postId,
}) => {
  const ref = useRef();
  const commenting = async () => {
    if (!ref.current.value) return;

    await axios.post("/api/comments", {
      postId: selected.postId,
      userId: 5,
      createdAt: new Date(),
      content: ref.current.value,
      good: 0,
    });
    ref.current.value = "";
    await getComments();
    await getPost();
    // 関数アップデート？
    setSelected((prevSelected) => {
      const updatedPosts = posts.find(
        (post) => post.postId === prevSelected.postId
      );
      return updatedPosts || prevSelected;
    });
  };

  return (
    <>
      <Card width="100%" borderColor="black" borderWidth="1px">
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
          <CardBody>
            {/* ここにツイート */}
            {/* <Input w="100%" h="100px" placeholder="Basic usage" /> */}
            <Textarea
              placeholder="なんて返信する？"
              _focusVisible="none"
              border="none"
              ref={ref}
            ></Textarea>
          </CardBody>
        </Flex>
        <Divider orientation="horizontal" color="darkgray" />
        <CardFooter
          //   justify="space-between"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
          sy="100px"
        >
          {/* <Button flex="1" variant="ghost">
            Comment
          </Button> */}
          {/* クリックイベント */}
          <Button colorScheme="blue" onClick={commenting} ml="auto">
            返信
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default Commenting;
