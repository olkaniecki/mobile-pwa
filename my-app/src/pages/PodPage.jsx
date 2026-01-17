import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {doc, getDoc, collection, query, where, getDocs} from 'firebase/firestore';
import {Routes, Route, Link, useParams} from 'react-router-dom';
import {useAuth} from "../AuthContext";
import {db} from "../firebase";
import styled from 'styled-components';
import NavigationBar from '../components/NavBar';

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
            <NavigationBar/>
        </PageContainer>
    );
}

export default PodPage;