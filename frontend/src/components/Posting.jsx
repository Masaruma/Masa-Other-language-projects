import React, { useRef, useState } from "react";
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
  Image,
  Input,
  Textarea,
} from "@chakra-ui/react";
// axios
import axios from "axios";

const Posting = ({ getPost }) => {
  // 画像アップロード、ファイルオブジェクトの格納
  const [image, setImage] = useState(null);
  const tempFile = (event) => {
    const img = event.target.files[0];
    if (!img) return;
    setImage(img);
    console.log(img);
  };

  const ref = useRef();

  const posting = async () => {
    // userIdとusernameはログインした時点でフロントに保存。
    if (!ref.current.value) return;

    // formdataへの格納
    const data = new FormData();
    data.append("file", image);
    const user = {
      userId: 5,
      createdAt: new Date(),
      content: ref.current.value,
      good: 0,
    };

    data.append(
      "user",
      new Blob([JSON.stringify(user)], { type: "application/json" })
    );
    console.log("data: ", data);

    await axios
      .post("/api/formData", data)
      .then((res) => console.log("res ", res));
    ref.current.value = "";
    setImage(null);

    getPost();
  };

  return (
    <>
      <Card
        maxW={{ base: "100%", md: "100%" }}
        borderColor="brack"
        borderWidth="1px"
      >
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
          <CardBody>
            {/* ここにツイート */}
            <Textarea
              placeholder="いま何しよる？"
              _focusVisible="none"
              fontSize="1.3rem"
              border="none"
              ref={ref}
            ></Textarea>
          </CardBody>
        </Flex>
        {image && (
          <>
            <Button
              // colorScheme="teal"
              size="xs"
              w={"10px"}
              ml="auto"
              onClick={() => {
                setImage(null);
              }}
            >
              ✖︎
            </Button>
            <Image
              objectFit="cover"
              src={URL.createObjectURL(image)}
              alt="Chakra UI"
              p={5}
              py={0}
              border={1}
              borderColor="black"
              borderRadius={50}
              maxWidth="100%"
              maxHeight="300px"
            />
          </>
        )}

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
          {/* <Input type="file" onChange={tempFile} rounded={"50"} /> */}
          <input type="file" onChange={tempFile} />

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
