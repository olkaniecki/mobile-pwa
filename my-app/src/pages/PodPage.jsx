import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {doc, getDoc, collection, query, where, getDocs} from 'firebase/firestore';
import {Routes, Route, Link, useParams} from 'react-router-dom';
import {useAuth} from "../AuthContext";
import {db} from "../firebase";
import styled from 'styled-components';
import NavigationBar from '../components/NavBar';
import PodPosts from '../components/PodPosts';
import PodEvents from '../components/PodEvents';
import PodMembers from '../components/PodMembers';

const PageContainer = styled.div`
  min-height: 100vh;        
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;       
  overflow-x: hidden;
`;


const PodPage = () => {
    const {user} = useAuth();

    const [userData, setUserData] = useState(null);
    const { podId } = useParams();
    const [pod, setPod] = useState(null);
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState("posts");

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            try {
                const userRef = doc(db, "users", user.uid);
                const snap = await getDoc(userRef);

                if(snap.exists()) {
                    setUserData(snap.data());
                } else {
                    console.warn("No user document found");
                } 
            
            const ref = doc(db, "pods", podId);
            const snapPods = await getDoc(ref);
            
            console.log("podId:", podId);
            console.log("Pod snapshot exists:", snapPods.exists());
            console.log("Pod snapshot data:", snapPods.data());

            if(snapPods.exists()) {
                setPod({id: snapPods.id, ...snapPods.data() });
            }
            setLoading(false);
            } catch (err) {
                    console.error("Error fetching pods/users:", err);
                } finally {
                    setLoading(false);   
                }
        }

        fetchData();

    }, [user]);

    if (loading) return <p>Loading...</p>;
    return(
        <PageContainer>
            <h1>{pod?.podName}</h1>
            <h3>{pod?.memberUID?.length || 0} members</h3>
            <div style={{ display: "flex", gap: "1.5rem"}}>
                <button onClick={() => setActive("posts")}>Posts</button>
                <button onClick={() => setActive("events")}>Events</button>
                <button onClick={() => setActive("members")}>Members</button>
            </div>

            <div style={{marginTop: "2rem"}}>
                {active === "posts" && <PodPosts pod={pod}/>}
                {active === "events" && <PodEvents pod={pod}/>}
                {active === "members" && <PodMembers pod={pod}/>}
            </div>
            <NavigationBar/>
        </PageContainer>
    );
}

export default PodPage;