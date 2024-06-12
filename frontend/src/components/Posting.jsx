import React, { useRef } from "react";
// ui
import { ChatIcon } from "@chakra-ui/icons";
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

const Posting = ({ getPost }) => {
  const ref = useRef();

  const posting = async () => {
    // userIdとusernameはログインした時点でフロントに保存。
    if (!ref.current.value) return;
    await axios
      .post(`http://localhost:8080/postTable`, {
        userId: 5,
        createdAt: new Date(),
        content: ref.current.value,
        good: 0,
      })
      .then((res) => {
        console.log("res: ", res);
      });
    console.log(ref.current.value);
    ref.current.value = "";
    getPost();
    // load処理
  };

  return (
    <>
      <Card width="100%" borderColor="brack" borderWidth="1px">
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
          <CardBody>
            {/* ここにツイート */}
            {/* <Input w="100%" h="100px" placeholder="Basic usage" /> */}
            <Textarea
              placeholder="Hou are you?"
              _focusVisible="none"
              border="none"
              ref={ref}
            ></Textarea>
          </CardBody>
        </Flex>
        <Divider orientation="horizontal" color="darkgray" />
        <CardFooter
          justify="space-between"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
          sy="100px"
        >
          <Button flex="1" variant="ghost" leftIcon={<ChatIcon />}>
            Comment
          </Button>
          {/* クリックイベント */}
          <Button colorScheme="blue" onClick={posting}>
            ポストする
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default Posting;
