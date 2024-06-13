import { useEffect, useState } from "react";
import Post from "./Post";
import Left from "./Left";
import Right from "./Right";
import Posting from "./Posting";
import axios from "axios";
import Selected from "./Selected";

// moment
import moment from "moment";
import "moment-timezone";

// chakra
import { Box, Center, Divider } from "@chakra-ui/react";

const Menu = () => {
  const myId = { id: 5, username: "masa" };
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState(null);

  const getPost = async () => {
    const response = await axios.get("/api/posts");
    const updatedPosts = response.data.map((post) => ({
      ...post,
      createdAt: moment(post.createdAt).fromNow(),
      avater: `/images/${post.userId}.png`,
    }));
    setPosts(updatedPosts);
    console.log(updatedPosts);
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <Box w="100%" display="flex" justifyContent="center">
        <Box w={{ base: "100%", md: "20%" }} top={0}>
          <Left setSelected={setSelected} getPost={getPost} myId={myId} />
        </Box>
        <Box w={{ base: "100%", md: "35%" }}>
          {selected ? (
            <Selected
              posts={posts}
              selected={selected}
              setSelected={setSelected}
              getPost={getPost}
            />
          ) : (
            <>
              <Box border="1px" maxW={{ base: "100%", md: "100%" }}>
                <Center height="50px">
                  <div>おすすめ</div>
                  <Divider orientation="vertical" />
                  <div>フォロー中</div>
                </Center>
              </Box>
              <Posting getPost={getPost} myId={myId} />
              {posts.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  selected={selected}
                  setSelected={setSelected}
                  getPost={getPost}
                  myId={myId}
                />
              ))}
            </>
          )}
        </Box>
        <Box w={{ base: "100%", md: "36%" }}>
          <Right />
        </Box>
      </Box>
    </>
  );
};

export default Menu;
