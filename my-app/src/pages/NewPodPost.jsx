import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {doc, getDoc, collection, query, where, getDocs, addDoc, serverTimestamp} from 'firebase/firestore';
import {Routes, Route, Link, useParams} from 'react-router-dom';
import {useAuth} from "../AuthContext";
import {db} from "../firebase";
import styled from 'styled-components';

const NewPodPost = () => {
    const {user} = useAuth();
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);
    const { podId } = useParams();
    const [pod, setPod] = useState(null);
    const [loading, setLoading] = useState(true);

    // post params
    const [message, setMessage] = useState("");
    const [event, setEvent] = useState(null); // TODO


    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            try {
                const userRef = doc(db, "users", user.uid);
                const snap = await getDoc(userRef);

                if(snap.exists()) {
                    setUserData(snap.data());
                } else {
                    console.warn("No user document found.");
                }

                const ref = doc(db, "pods", podId);
                const snapPods = await getDoc(ref);
                
                if(snapPods.exists()) {
                    setPod({id: snapPods.id, ...snapPods.data() });
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching pods/users: ", err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();

    }, [user]);

    const createPost = async ({ podId, pod, event, message, user}) => {
        if(!podId || !user || !message.trim()) return;

        // fix this when events are implemented
        const members = event === null ? pod.memberUID : [user.uid];

        const postsRef = collection(db, "pods", podId, "posts");
        await addDoc(postsRef, {
            authorFirstName: userData.firstName,
            authorLastName: userData.lastName,
            membersAccessed: members,
            message: message.trim(),
            relevantEvent: "",
            timePosted: serverTimestamp(),
        });
    }

    const handleSubmit = async () => {
        await createPost({podId, pod, event, message, user});
        navigate(-1); // go back to posts
    };

    return(
        <>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What do you want to say to your fellow peas?"
                style={{ width: "100%", minHeight: "120px"}}
            />
            <button onClick={handleSubmit}>Post</button>
        </>
    );
};

export default NewPodPost;