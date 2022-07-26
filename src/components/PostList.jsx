import React from 'react';
import PostItem from './PostItem';
import {TransitionGroup, CSSTransition} from 'react-transition-group';


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
            <TransitionGroup>
                {posts.map((post, index) => (
                    <CSSTransition
                        key = {post.id}
                        classNames = "post"
                        timeout = {1500}
                    >
                         <PostItem number = {index + 1} post={post} remove = {remove}/>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div> 
    )
};


export default PostList; 