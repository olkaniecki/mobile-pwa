import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {doc, getDoc, collection, query, where, getDocs} from 'firebase/firestore';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {auth, db} from '../firebase';
import {useAuth} from "../AuthContext";
import Pod from '../components/Pod';

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



const PodHome = () => {
    const {user} = useAuth();

    const [userData, setUserData] = useState(null);
    const [userPods, setUserPods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchUser = async () => {
            try {
                const userRef = doc(db, "users", user.uid);
                const snap = await getDoc(userRef);

                if(snap.exists()) {
                    setUserData(snap.data());
                } else {
                    console.warn("No user document found");
                }
            } catch (err) {
                console.error("Error fetching user: ", err);n
            } finally {
                setLoading(false);
            }
        };

        const fetchPods = async () => {
            try {
                const q = query(collection(db, "pods"), where("memberUID", "array-contains", user.uid));
                const snap = await getDocs(q);
                const results = snap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setUserPods(results);
            } catch (err) {
                console.error("Error fetching pods:", err);
            } finally {
                setLoading(false);   
            }
        };

        fetchUser();
        fetchPods();
    }, [user]);

    if(loading) return <p>Loading...</p>;

    return(
        <PageContainer>

                <h3>Welcome, {userData?.firstName}</h3>
                <h1>Your Pods</h1>

                {userPods.length === 0 && (<p>You're not in any pods yet.</p>)}

                {userPods.map(pod => (
                    <div key={pod.id}>
                        <Pod key={pod.id} pod={pod}/>
                    </div>
                ))}

        </PageContainer>
    );
};

export default PodHome;