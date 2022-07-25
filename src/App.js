import React, { useState } from "react";
import "./styles/App.css";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MyModal from "./components/UI/modals/MyModal";
import MyButton from "./components/UI/buttons/MyButton";
import PostFilter from "./components/PostFilter";
import { usePosts } from "./hooks/usePosts";
import axios from "axios";
import PostService from "./API/PostService";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "aaa", body: "ccc" },
    { id: 2, title: "bbb", body: "bbb" },
    { id: 3, title: "ccc", body: "aaa" },
  ]);

  const [filter, setFilter] = useState({ sort: "", query: "" });

  const [modal, setModal] = useState(false);

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const fetchPosts = async () => {
    const posts = PostService.getAll();
    console.log(posts);
  };

  const createPost = (newPost) => {
    if (newPost.title && newPost.body) {
      setPosts([...posts, newPost]);
      setModal(false);
    }
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <MyButton onClick={fetchPosts}>GET POSTS</MyButton>
      <MyButton onClick={() => setModal(true)}>Add post</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <PostList
        posts={sortedAndSearchedPosts}
        title="Post list"
        remove={removePost}
      />
    </div>
  );
}

export default App;
