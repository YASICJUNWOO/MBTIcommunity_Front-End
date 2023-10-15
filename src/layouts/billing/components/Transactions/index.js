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

// @mui material components
import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Billing page components
import Transaction from "layouts/billing/components/Transaction";
import {useEffect, useState} from "react";
import axios from "axios";
import SoftButton from "../../../../components/SoftButton";
import Menu from "@mui/material/Menu";
import {navbarIconButton} from "../../../../examples/Navbars/DashboardNavbar/styles";
import IconButton from "@mui/material/IconButton";
import SoftInput from "../../../../components/SoftInput";
import PropTypes from "prop-types";

{/**
 * 글 목록 카드
 */
}

function Transactions({type}) {
    const accessToken = localStorage.getItem('accessToken');
    const [posts, setPost] = useState([]); // 데이터를 저장할 상태

    const [openMenu, setOpenMenu] = useState(false);
    const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
    const handleCloseMenu = () => setOpenMenu(false);

    const [title, setTitle] = useState('');
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        console.log('Title:', title);
    };
    const [content, setContent] = useState('');
    const handleContentChange = (e) => {
        setContent(e.target.value);
        console.log('Title:', content);
    };


    {/**
     * 글 게시 버튼 클릭 시
     */
    }
    const handlePost = (e) => {
        e.preventDefault();
        console.log("handlePost 버튼 클릭");
        const PostData = {
            title: title,
            content: content,
        };

        const url = `http://localhost:8080/post/create`
        // 서버로 POST 요청 보내기
        axios
            .post(url, PostData,
                {
                    headers: {Authorization: `Bearer ${accessToken}`,},
                }
            )
            .then((response) => {
                // 로그인 성공 시 처리
                // 로그인 성공 후 필요한 작업 수행
                // 페이지 이동 예: 홈 페이지로 이동
                console.log('로그인 성공:', response.headers);
            })
            .catch((error) => {
                // 로그인 실패 시 처리
                console.error('로그인 실패:', error);
                // 로그인 실패 후 필요한 작업 수행
            });
    }


        useEffect(() => {
            // Axios를 사용하여 GET 요청 보내고 데이터 가져오기
            axios.get(`http://localhost:8080/post/list/${type}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                }
            ) // API의 엔드포인트 URL을 여기에 입력
                .then((response) => {
                    // 응답 데이터를 상태에 저장
                    setPost(response.data);
                    console.log("popular", response.data);
                })
                .catch((error) => {
                    // 오류 처리
                    console.error('Error fetching data:', error);
                });

        }, []); // 빈 종속성 배열로 컴포넌트가 처음 렌더링될 때 한 번만 실행

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
                sx={{mt: 0}}
            >
                <SoftBox pt={2} px={0.5} display="flex" justifyContent="space-between" alignItems="center">
                    {/*<SoftTypography>
                  Post
              </SoftTypography>*/}
                    <SoftButton onClick={handlePost} variant="gradient" size="large">
                        Make a Post!
                    </SoftButton>
                </SoftBox>

                <SoftBox component="form" role="form">
                    <SoftBox mb={1} ml={0.5} mt={1} px={{}}>
                        <SoftInput type="Title" placeholder="제목" onChange={handleTitleChange} value={title}/>
                    </SoftBox>
                    <SoftBox mb={1} ml={0.5}>
                        <SoftInput type="Content" placeholder="글" multiline rows={5} onChange={handleContentChange}
                                   value={content}/>
                    </SoftBox>
                </SoftBox>
            </Menu>
        );

        return (
            <Card sx={{height: "100%"}}>
                <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
                    <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                        Hot Post!🔥
                    </SoftTypography>
                    <SoftBox display="flex" alignItems="flex-start">
                        {/*
          <SoftBox color="text" mr={0.5} lineHeight={0}>
            <Icon color="inherit" fontSize="small">
              date_range
            </Icon>
          </SoftBox>*/}
                        <IconButton
                            size="small"
                            color="inherit"
                            sx={navbarIconButton}
                            aria-controls="notification-menu"
                            aria-haspopup="true"
                            variant="contained"
                            onClick={handleOpenMenu}
                        >
                            <Icon sx={{fontWeight: "bold"}}>add</Icon>
                        </IconButton>
                        {renderMenu()}
                        {/*<SoftTypography variant="button" color="text" fontWeight="regular">
            23 - 30 March 2020
          </SoftTypography>*/}


                    </SoftBox>
                </SoftBox>
                <SoftBox pt={3} pb={2} px={2}>
                    <SoftBox mb={2}>
                        <SoftTypography
                            variant="caption"
                            color="text"
                            fontWeight="bold"
                            textTransform="uppercase"
                        >
                            newest
                        </SoftTypography>

                    </SoftBox>

                    <SoftBox
                        component="ul"
                        display="flex"
                        flexDirection="column"
                        p={0}
                        m={0}
                        sx={{listStyle: "none"}}
                    >
                        {posts.map((post) => (
                            // eslint-disable-next-line react/jsx-key
                            <Transaction
                                id={post.id}
                                color="error"
                                user={post.user}
                                description="27 March 2020, at 12:30 PM"
                                data={post}
                            />
                        ))
                        }
                    </SoftBox>

                    {/*
        <SoftBox mt={1} mb={2}>
          <SoftTypography
            variant="caption"
            color="text"
            fontWeight="bold"
            textTransform="uppercase"
          >
            yesterday
          </SoftTypography>
        </SoftBox>*/}
                    <SoftBox
                        component="ul"
                        display="flex"
                        flexDirection="column"
                        p={0}
                        m={0}
                        sx={{listStyle: "none"}}
                    >
                    </SoftBox>
                </SoftBox>
            </Card>
        );
    }
// Typechecking props of the Transaction
Transactions.propTypes = {

    type: PropTypes.string.isRequired,
};
    export default Transactions;
