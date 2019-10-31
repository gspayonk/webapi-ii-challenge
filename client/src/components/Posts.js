import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fetch from '../components/getPosts';

const Post = ({ posting, text }) => {
    return (
    <>
        <h3>{posting}</h3>
        <p>{text}</p>
    </>
    );
};

export default props => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(props.match.params.id).then(res => setPosts(res.data));
    }, []);

    return (

    <div>
        <Link to = '/'>Authors</Link>
        {posts.map(post => {
            return <Post posted={post.postedBy} text={post.text} />;
        })}
    </div>
    );
};