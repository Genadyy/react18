import React, { useState, useEffect } from "react";
import "./styles/App.css";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MyModal from "./components/UI/modals/MyModal";
import MyButton from "./components/UI/buttons/MyButton";
import PostFilter from "./components/PostFilter";
import { usePosts } from "./hooks/usePosts";
import PostService from "./API/PostService";
import Loader from "./components/UI/loader/Loader";
import {useFetching} from './hooks/useFetching';

function App() {
  const [posts, setPosts] = useState([]);
  
  const [filter, setFilter] = useState({ sort: "", query: "" });

  const [modal, setModal] = useState(false);

  const [fetchPosts, isPostsLoading, postsError] = useFetching(async () => {
    const posts = await PostService.getAll();
    setPosts(posts)
  })

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  
  useEffect(() => {
    fetchPosts();
  }, []);


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
      <MyButton onClick={() => setModal(true)}>Add post</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {postsError && <div style = {{display: 'flex', justifyContent: 'center'}}>The error ocurred: ${postsError} </div>}
      {isPostsLoading
          ? <div className = 'loader__wrapper'><Loader/></div>
          : <PostList
              posts={sortedAndSearchedPosts}
              error = {postsError}
              title="Post list"
              remove={removePost}
            />
      }
    </div>
  );
}

export default App;
