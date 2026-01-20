import React, {useEffect, useState} from 'react';
import {doc, getDoc, collection, query, where, getDocs, onSnapshot, orderBy} from 'firebase/firestore';
import {useAuth} from "../AuthContext";
import styled from "styled-components";
import {Link} from 'react-router-dom';
import {auth, db} from '../firebase';


const Post = ({ post }) => {

};

export default Post;