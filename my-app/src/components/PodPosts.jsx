import React, {useEffect, useState} from 'react';
import {doc, getDoc, collection, query, where, getDocs, onSnapshot, orderBy} from 'firebase/firestore';
import {useAuth} from "../AuthContext";
import styled from "styled-components";
import {Link} from 'react-router-dom';
import {auth, db} from '../firebase';

const Card = styled(Link)`
    display: block;
    text-decoration: none;


    background-color: #A3B18A;
    color: #344E41;
    width: 100%;
    max-width: 420px;
    border-radius: 1.75rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    padding: 14px; 
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: hidden;

    margin: 0 auto 16px;
    
    &:hover {
        background-color: #344E41;
        color: #A3B18A;
    }
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

    useEffect(() => {
        posts.forEach(post => {
            if (!authors[post.author]) {
                const userRef = doc(db, "users", post.author);
                getDoc(userRef).then(snap => {
                    if (snap.exists()) {
                        setAuthors(prev => ({ ...prev, [post.author]: snap.data() }));
                    }
                });
            }
        });
    }, [posts]); 


    if (!pod?.id) {
        return <p>Loading pod...</p>;
    }
    
    if (posts.length === 0) {
        return <p>No posts yet.</p>;
    }

    return(
        <><div>
            {posts.map(post => (
                <div key={post.id}>
                    <small>by {authors[post.author]?.firstName || "unknown"}</small>
                    <p>{post.message}</p>
                </div>
            ))}
        </div><Card to={`/newpost/${pod.id}`}>
                +
            </Card></>
        
    );
};

export default PodPosts;