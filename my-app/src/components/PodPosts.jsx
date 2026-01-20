import React, {useEffect, useState} from 'react';
import {doc, getDoc, collection, query, where, getDocs, onSnapshot, orderBy, serverTimestamp} from 'firebase/firestore';
import {useAuth} from "../AuthContext";
import styled from "styled-components";
import {Link} from 'react-router-dom';
import {auth, db} from '../firebase';

const PostsContainer = styled.div`
    width: 100%;
    max-width: 600px;
    margin: 0 auto;

    overflow-x: hidden;
`;

const NewButton = styled(Link)`
    position: fixed;
    bottom: 70px;
    right: 24px;

    width: 56px;
    height: 56px;
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #A3B18A;
    color: #344E41;
    text-decoration: none;

    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
    z-index: 1000;

    
    
    &:hover {
        background-color: #344E41;
        color: #A3B18A;
    }
`;

const Post = styled(Link)`
    display: block;
    text-decoration: none;

    background-color: #A3B18A;
    color: #344E41;
    width: 100%;
    max-width: 600px;
    border-radius: 1.75rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    padding: 14px; 
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: hidden;

    margin: 0 auto 16px;

    text-align: left;
`;

const PodPosts = ({ pod }) => {
    const {user} = useAuth();
    const [posts, setPosts] = useState([]);
    const [authors, setAuthors] = useState({});


    useEffect(() => {
        if (!user) return;

        const postsRef = collection(db, "pods", pod.id, "posts");
        const q = query(postsRef, orderBy("timePosted", "desc"));

        const unsub = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPosts(data);
        });

        return () => unsub();
    }, [pod.id, user]);

    const timeAgo = (timestamp)  => {
        if (!timestamp) return "Just now";
        
        const seconds = Math.floor((Date.now() - timestamp.toDate()) / 1000);
        if (seconds < 60) return "Just now";
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;

        return `${Math.floor(seconds / 86400)}d ago`;
    };


    if (!pod?.id) {
        return <p>Loading pod...</p>;
    }
    
    if (posts.length === 0) {
        return <p>No posts yet.</p>;
    }

    return(
        <>
            <PostsContainer>
                {posts.map(post => (
                    <div key={post.id}>

                        <Post to={`/podposts/${post.id}`}>
                            <div>
                                <small>{post.authorFirstName} {post.authorLastName}</small>
                            </div>
                            <small>{timeAgo(post.timePosted)} </small>
                            <p>{post.message}</p>
                        </Post>
                    </div>
                ))}
            </PostsContainer>
            <NewButton to={`/newpost/${pod.id}`}>
                    +
            </NewButton>
        </>
        
    );
};

export default PodPosts;