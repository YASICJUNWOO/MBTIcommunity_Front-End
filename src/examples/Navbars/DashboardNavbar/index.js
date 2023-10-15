/**
 =========================================================
 * Soft UI Dashboard React - v4.0.1
 =========================================================

 * Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
 * Copyright 2023 Creative Tim (https://www.creative-tim.com)

 Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

import {useEffect, useState} from "react";

// react-router components
import {Link, useLocation} from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";

// Soft UI Dashboard React examples
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
    navbar,
    navbarContainer,
    navbarIconButton,
    navbarMobileMenu,
    navbarRow,
} from "examples/Navbars/DashboardNavbar/styles";

// Soft UI Dashboard React context
import {setMiniSidenav, setOpenConfigurator, setTransparentNavbar, useSoftUIController,} from "context";

// Images
import team2 from "assets/images/team-2.jpg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import axios from "axios";
import SoftButton from "../../../components/SoftButton";

/**
 * 맨 위 헤더
 */
function DashboardNavbar({absolute, light, isMini}) {
    const [navbarType, setNavbarType] = useState();
    const [controller, dispatch] = useSoftUIController();
    const {miniSidenav, transparentNavbar, fixedNavbar, openConfigurator} = controller;
    const [openMenu, setOpenMenu] = useState(false);
    const route = useLocation().pathname.split("/").slice(1);

    let token;


    useEffect(() => {
            token = localStorage.getItem('accessToken');
            // Setting the navbar type
            if (fixedNavbar) {
                setNavbarType("sticky");
            } else {
                setNavbarType("static");
            }

            {/**
             * 토큰 있을 때
             */}
            if (token) {
                axios.get('http://localhost:8080/user',
                    {
                        headers: {
                            'Authorization': ('Bearer ' + token)
                        },
                    }
                )
                    .then((res) => {
                            localStorage.setItem("username", res.data.username);
                        console.log("username", res.data.username);
                        }
                    )
                    .catch((err)=>{
                        console.log("err", err);
                    })
            }

            // A function that sets the transparent state of the navbar.
            function handleTransparentNavbar() {
                setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
            }

            /**
             The event listener that's calling the handleTransparentNavbar function when
             scrolling the window.
             */
            window.addEventListener("scroll", handleTransparentNavbar);

            // Call the handleTransparentNavbar function to set the state with the initial value.
            handleTransparentNavbar();

            // Remove event listener on cleanup
            return () => window.removeEventListener("scroll", handleTransparentNavbar);
        }
        ,
        [dispatch, fixedNavbar]
    )


    const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
    const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
    const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
    const handleCloseMenu = () => setOpenMenu(false);

    {/**
     * 로그아웃 핸들러
     */
    }
    const handleLogOut = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("username");
        window.location.reload();
        alert("로그아웃 되었습니다.");
    }

    {/**
     * 알람
     */
    }
    // Render the notifications menu
    const renderMenu = () => (
        <Menu
            anchorEl={openMenu}
            anchorReference={null}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            open={Boolean(openMenu)}
            onClose={handleCloseMenu}
            sx={{mt: 2}}
        >
            <NotificationItem
                image={<img src={team2} alt="person"/>}
                title={["New message", "from Laur"]}
                date="13 minutes ago"
                onClick={handleCloseMenu}
            />
            <NotificationItem
                image={<img src={logoSpotify} alt="person"/>}
                title={["New album", "by Travis Scott"]}
                date="1 day"
                onClick={handleCloseMenu}
            />
            <NotificationItem
                color="secondary"
                image={
                    <Icon fontSize="small" sx={{color: ({palette: {white}}) => white.main}}>
                        payment
                    </Icon>
                }
                title={["", "Payment successfully completed"]}
                date="2 days"
                onClick={handleCloseMenu}
            />
        </Menu>
    );

    return (
        <AppBar
            position={absolute ? "absolute" : navbarType}
            color="inherit"
            sx={(theme) => navbar(theme, {transparentNavbar, absolute, light})}
        >
            <Toolbar sx={(theme) => navbarContainer(theme)}>
                <SoftBox color="inherit" mb={{xs: 1, md: 0}} sx={(theme) => navbarRow(theme, {isMini})}>
                    <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light}/>
                </SoftBox>

                {isMini ? null : (
                    <SoftBox sx={(theme) => navbarRow(theme, {isMini})}>
                        <SoftBox pr={1}>
                            <SoftInput
                                placeholder="Type here..."
                                icon={{component: "search", direction: "left"}}
                            />
                        </SoftBox>

                        {/**
                         * 로그인 버튼
                         */}
                        <SoftBox color={light ? "white" : "inherit"} sx={{display: 'flex'}}>
                            {
                                localStorage.getItem("username") === null ?
                                    (<Link to="/authentication/sign-in">
                                        <IconButton sx={navbarIconButton} size="small">
                                            <Icon
                                                sx={({palette: {dark, white}}) => ({
                                                    color: light ? white.main : dark.main,
                                                })}
                                            >
                                                account_circle
                                            </Icon>
                                            <SoftTypography
                                                variant="button"
                                                fontWeight="medium"
                                                color={light ? "white" : "dark"}
                                            >
                                                Sign in
                                            </SoftTypography>
                                        </IconButton>
                                    </Link>)
                                    :
                                    (
                                        <SoftBox>
                                            <SoftTypography
                                                variant="button"
                                                fontWeight="medium"
                                                color={light ? "white" : "dark"}
                                            >
                                                {'안녕하세요 ' + localStorage.getItem("username") + ' 님!!!'}
                                            </SoftTypography>
                                            <SoftButton onClick={handleLogOut}>LogOut!</SoftButton>
                                        </SoftBox>
                                    )
                            }
                            <IconButton
                                size="small"
                                color="inherit"
                                sx={navbarMobileMenu}
                                onClick={handleMiniSidenav}
                            >
                                <Icon className={light ? "text-white" : "text-dark"}>
                                    {miniSidenav ? "menu_open" : "menu"}
                                </Icon>
                            </IconButton>
                            <IconButton
                                size="small"
                                color="inherit"
                                sx={navbarIconButton}
                                onClick={handleConfiguratorOpen}
                            >
                                <Icon>settings</Icon>
                            </IconButton>
                            <IconButton
                                size="small"
                                color="inherit"
                                sx={navbarIconButton}
                                aria-controls="notification-menu"
                                aria-haspopup="true"
                                variant="contained"
                                onClick={handleOpenMenu}
                            >
                                <Icon className={light ? "text-white" : "text-dark"}>notifications</Icon>
                            </IconButton>
                            {renderMenu()}
                        </SoftBox>
                    </SoftBox>
                )}
            </Toolbar>
        </AppBar>
    );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
    absolute: false,
    light: false,
    isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
    absolute: PropTypes.bool,
    light: PropTypes.bool,
    isMini: PropTypes.bool,
};

export default DashboardNavbar;
