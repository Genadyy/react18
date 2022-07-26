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
import {getTotalPages, getPagesArray} from './utils/pages';

function App() {
  const [posts, setPosts] = useState([]);
  
  const [filter, setFilter] = useState({ sort: "", query: "" });

  const [modal, setModal] = useState(false);

  const [totalPages, setTotalPages] = useState(0);

  const [limit, setLimit] = useState(10);

  const [page, setPage] = useState(1);

  const [fetchPosts, isPostsLoading, postsError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getTotalPages(totalCount, limit))
    setPosts(response.data);
  });

  const pagesArray = getPagesArray(totalPages);

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

  const switchPage = (n) => {
    setPage(n);
    fetchPosts();
  }

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
          : <div>
              <PostList
                posts={sortedAndSearchedPosts}
                error = {postsError}
                title="Post list"
                remove={removePost}
              />
              <div className = "page_wrapper">
                {pagesArray.map(p => 
                  <div key = {p} className = {page === p? "page page_current": "page"} onClick = {() => switchPage(p)}>{p}</div>
                )}
              </div>
            </div>
      }
    </div>
  );
}

export default App;
