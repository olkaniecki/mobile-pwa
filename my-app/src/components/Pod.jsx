import React from "react";
import styled from "styled-components";

const Card = styled.div`
    background-color: #A3B18A;
    color: #344E41;
    width: 100%;
    max-width: 420px;
    border-radius: 0.75rem;
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


const PodName = styled.h3`
    margin: 0 0 8px 0;
    padding: 10px 9px;
`;

const Members = styled.p`
    margin: 0;
    padding: 0;
    color: inherit;
`;

const Pod = ({ pod }) => {
    
    return (
        <Card>
            <PodName>{pod.podName}</PodName>
            <Members>Members: {pod.memberUID?.length || 0}</Members>
        </Card>
    );
};

export default Pod;