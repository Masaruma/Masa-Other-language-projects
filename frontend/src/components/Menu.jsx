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
  // myId ログインできたら取得
  const myId = { id: 5, username: "masa" };
  const [posts, setPosts] = useState([]);
  // !個別ツイート用
  const [selected, setSelected] = useState(null);
  console.log("selected: ", selected);

  const getPost = async () => {
    const getPost = await axios.get("http://localhost:8080/posts").then((res) =>
      res.data.map((post) => ({
        ...post,
        createdAt: moment(post.createdAt).fromNow(),
        imgURL: `https://picsum.photos/id/${Math.floor(
          Math.random() * 250
        )}/90`,
      }))
    );
    setPosts(getPost);
    console.log("getPost: ", getPost);
  };

  useEffect(() => {
    // ここでgetPostする
    getPost();
  }, []);

  return (
    <>
      <Box w="100%" display="flex" justifyContent="space-around">
        <Box w="20%" top={0}>
          <Left setSelected={setSelected} getPost={getPost} myId={myId}></Left>
        </Box>
        {/* 個別 tweet切り替え処理 */}
        <Box w="45%">
          {selected ? (
            <Selected
              posts={posts}
              selected={selected}
              setSelected={setSelected}
              getPost={getPost}
            ></Selected>
          ) : (
            <>
              <Box border="1px">
                <Center height="50px">
                  <div>おすすめ</div>
                  <Divider orientation="vertical" />
                  <div>フォロー中</div>
                </Center>
              </Box>
              <Posting getPost={getPost} myId={myId}></Posting>
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
        <Box w="30%">
          <Right></Right>
        </Box>
      </Box>
    </>
  );
};

export default Menu;
