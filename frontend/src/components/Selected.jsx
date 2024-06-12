import { useEffect, useState } from "react";
import Post from "./Post";
import Commenting from "./Commenting";
// chakra
import { Box, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
// axios
import axios from "axios";
// moment
import moment from "moment";
import "moment-timezone";
import Comments from "./Comments";

const Selected = ({ selected, setSelected, getPost, posts }) => {
  const [comments, setComments] = useState([]);
  //   !コメントの取得
  const getComments = async () => {
    const getComment = await axios
      .get(`http://localhost:8080/comments/${selected.postId}`)
      .then((res) =>
        res.data.map((post) => ({
          ...post,
          createdAt: moment(post.createdAt).fromNow(),
        }))
      );
    setComments(getComment);
    console.log("getComemnts: ", getComment);
  };

  useEffect(() => {
    getComments();
  }, []);
  return (
    <>
      <Box bg="gray" w="100%" p={4} color="white" rounded={5}>
        <IconButton
          aria-label="Search database"
          icon={<ArrowBackIcon />}
          onClick={() => {
            setSelected(null);
          }}
        />
        戻る
      </Box>
      <Post post={selected} setSelected={setSelected} getPost={getPost} />
      <Commenting
        posts={posts}
        getPost={getPost}
        getComments={getComments}
        selected={selected}
        setSelected={setSelected}
      ></Commenting>
      {comments.map((comment) => (
        <Comments
          key={comment.id}
          comment={comment}
          setSelected={setSelected}
        />
      ))}
    </>
  );
};

export default Selected;
