import React from "react";
import styled from "styled-components";
import {InboxIcon, CalendarIcon, Square3Stack3DIcon} from '@heroicons/react/24/solid';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const Bar = styled.nav`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    height: 65px;
    background-color: #3A5A40;

    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const NavItem = styled(Link)`

    color: #A3B18A;
    &.active {
        color: #344E41;
    }
`;

const ScheduleIcon = styled(CalendarIcon)`
    width: 26px;
    height: 26px;
`;

const NotifIcon = styled(InboxIcon)`
    width: 26px;
    height: 26px;
`;

const PodIcon = styled(Square3Stack3DIcon)`
    width: 26px;
    height: 26px;
`;

const NavigationBar = () => {

    return (
        <Bar>
            <NavItem to="/schedule">
                <ScheduleIcon />
            </NavItem>

            <NavItem to="/pods">
                <PodIcon />
            </NavItem>

            <NavItem to="/notifications">
                <NotifIcon />
            </NavItem>
        </Bar>
    );

};

export default NavigationBar;