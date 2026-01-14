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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;       
  overflow-x: hidden;
`;

const Notifications = () => {

    return(
        <PageContainer>
            <h1>Your Notifications</h1>
            <NavigationBar/>
        </PageContainer>

    );
};

export default Notifications;