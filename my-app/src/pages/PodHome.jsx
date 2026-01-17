import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {doc, getDoc, collection, query, where, getDocs} from 'firebase/firestore';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {auth, db} from '../firebase';
import {useAuth} from "../AuthContext";
import Pod from '../components/Pod';
import NavigationBar from '../components/NavBar';
import {Routes, Route} from 'react-router-dom';

const PageContainer = styled.div`
  min-height: 100vh;   
  max-width: 100vw;     
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 20px;
  box-sizing: border-box;   
  overflow-x: hidden;
`;



const PodHome = () => {
    const {user} = useAuth();

    const [userData, setUserData] = useState(null);
    const [userPods, setUserPods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            try {

                console.log("Fetching user:", user.uid);
                console.log("Fetching pods query for user:", user.uid);

                const userRef = doc(db, "users", user.uid);
                const snap = await getDoc(userRef);

                if(snap.exists()) {
                    setUserData(snap.data());
                } else {
                    console.warn("No user document found");
                }

                const q = query(collection(db, "pods"), where("memberUID", "array-contains", user.uid));
                const snapPods = await getDocs(q);
                const results = snapPods.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setUserPods(results);
            } catch (err) {
                console.error("Error fetching pods/users:", err);
            } finally {
                setLoading(false);   
            }
        };

        fetchData();
    }, [user]);

    if(loading) return <p>Loading...</p>;

    return(
        <><PageContainer>

            <h3>Welcome, {userData?.firstName}</h3>
            <h1>Your Pods</h1>

            {userPods.length === 0 && (<p>You're not in any pods yet.</p>)}

            {userPods.map(pod => (
                <div key={pod.id}>
                    <Pod key={pod.id} pod={pod} />
                </div>
            ))}
        </PageContainer><NavigationBar /></>
    );
};

export default PodHome;