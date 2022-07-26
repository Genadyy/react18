import React from 'react';
import PostItem from './PostItem';


const PostList = ({posts, title, remove, error}) => {
    if(error) {
       return <div></div>
    } else if(!posts.length) {
        return (
            <h1 style = {{textAlign: 'center', color: 'red', fontSize: '35px', fontFamily: 'sans-serif'}}>
                Posts are not found
            </h1>
        )
    }

    return (
        <div>
            <h1 className = 'title'>{title}</h1>
            {posts.map((post, index) => (
                <PostItem number = {index + 1} post={post} key={post.id} remove = {remove}/>
            ))}
        </div> 
    )
};


export default PostList; 