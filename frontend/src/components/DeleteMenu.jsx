// axios
import axios from "axios";
// chakra
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
// reactIcon
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineDeleteOutline } from "react-icons/md";

const DeleteMenu = ({ postId, getPost, setSelected }) => {
  const deletePost = async () => {
    await axios.delete(`/api/postTable/${postId}`).then((res) => {
      console.log(res);
    });
    setSelected(null);
    getPost();
  };
  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<BsThreeDotsVertical />}
          variant="ghost"
          colorScheme="gray"
        />
        <MenuList>
          <MenuItem
            icon={<MdOutlineDeleteOutline />}
            command="⌘T"
            onClick={deletePost}
          >
            Delete
          </MenuItem>
          <MenuItem icon={<MdOutlineDeleteOutline />} command="⌘N">
            New Window
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default DeleteMenu;
