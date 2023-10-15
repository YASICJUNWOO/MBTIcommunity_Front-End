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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import Menu from "@mui/material/Menu";
import {useEffect, useState} from "react";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import SoftInput from "../../../../components/SoftInput";
import axios from "axios";

{/**
 * 글 목록
 */
}

function Transaction({color, description, user, data, id}) {

    const [openMenu, setOpenMenu] = useState(false);
    const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
    const handleCloseMenu = () => setOpenMenu(false);

    const [likes, setLikes] = useState(0);

    const [replyList, setReplyList] = useState([]);

    useEffect(() => {
        setLikes(data.likes);
        axios.get(`http://localhost:8080/reply/list?postId=${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                }
            }
        )
            .then((response) => {
                console.log(response.data)
                setReplyList(response.data);
            })
            .catch((error) => {

            });

        },[]);


        {/**
         * 좋아요 수 증가
         */
        }
        const addLike = () => {

            axios.post(`http://localhost:8080/post/${id}/like`, {},
                {headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`,}}
            )
                // API의 엔드포인트 URL을 여기에 입력
                .then((response) => {
                    // 응답 데이터를 상태에 저장
                    setLikes(likes + 1);
                })
                .catch((error) => {
                    // 오류 처리
                    console.error('Error fetching data:', error);
                })
            ;
        }


        const [reply, setReply] = useState('');
        const handleReplyChange = (e) => {
            setReply(e.target.value);
        }
        const handleReply = (e) => {
            console.log(id);
            axios.post('http://localhost:8080/reply', {
                    content: reply,
                    postId: id
                }, {headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`,}}
            )
                // API의 엔드포인트 URL을 여기에 입력
                .then((response) => {
                    // 응답 데이터를 상태에 저장
                    setReply('');
                    setReplyList([...replyList, response.data]);
                })
                .catch((error) => {
                    // 오류 처리
                    console.error('Error fetching data:', error);
                })
            ;
        }

        const renderMenu = () => (
            <Menu
                anchorEl={openMenu}
                anchorReference={null}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                anchorPosition={{top: 0, left: 30}}
                open={Boolean(openMenu)}
                onClose={handleCloseMenu}
                sx={{mt: 0}}
            >
                {/**
                 * 제목 영역
                 */}
                <SoftBox justifyContent="space-between" alignItems="center" sx={{border: '1px dashed'}}>
                    <SoftTypography variant="h8" fontWeight="medium">제목</SoftTypography>
                    <SoftTypography variant="h4" fontWeight="medium">{data.title}</SoftTypography>
                </SoftBox>

                {/**
                 * 글 영역
                 */}
                <SoftBox component="form" role="form" sx={{border: '1px dashed'}}>
                    <SoftTypography variant="h8" fontWeight="medium">내용</SoftTypography>
                    <SoftTypography>{data.content}</SoftTypography>
                </SoftBox>

                {/**
                 * 댓글 영역
                 */
                }
                <SoftBox
                    component="ul"
                    display="flex"
                    flexDirection="column"
                    p={0}
                    m={0}
                    sx={{listStyle: "none"}}
                >
                    {replyList.map((reply) => (
                        // 댓글 컴포넌트를 매핑하여 렌더링
                        // eslint-disable-next-line react/jsx-key
                        <SoftTypography
                            color="info"
                            user={reply.user}
                            description="27 March 2020, at 12:30 PM"
                            data={reply}
                        >{reply.username} : {reply.content}</SoftTypography>
                    ))}
                </SoftBox>


                {/**
                 * 댓글 입력
                 */
                }
                <SoftBox mb={1} ml={0.5} mt={1} sx={{display: 'flex'}}>
                    <SoftInput type="Title" placeholder="댓글 입력"
                               onChange={handleReplyChange}
                               value={reply}
                    />
                    <SoftButton
                        onClick={handleReply}
                        variant="gradient" size="large">
                        댓글 작성!
                    </SoftButton>
                </SoftBox>

                {/**
                 * 좋아요
                 */}
                <SoftBox sx={{border: '1px dashed grey'}}>
                    <SoftTypography variant="h8" fontWeight="medium">좋아요</SoftTypography>

                    <SoftBox sx={{display: 'flex'}}>
                        <SoftTypography> {likes}</SoftTypography>
                        <IconButton variant="gradient" color="info" onClick={addLike}>
                            <Icon>favorite</Icon>
                        </IconButton>
                    </SoftBox>

                </SoftBox>

            </Menu>
        );

        return (
            <SoftBox>
                <SoftButton sx={{width: '100%'}} key={name} component="li" py={1} pr={2} mb={1}
                            onClick={handleOpenMenu}>
                    <SoftBox display="flex" justifyContent="space-between" alignItems="center">
                        <SoftBox display="flex" alignItems="center">

                            <SoftBox mr={2}>

                                <SoftTypography variant="button" color={color} fontWeight="medium" textGradient pl={1}
                                                pr={1} sx={{border: '1px dashed'}}>
                                    {data.mbtiType}
                                </SoftTypography>
                                {/*<SoftButton variant="outlined" color={color} size="small" iconOnly circular>
              <Icon sx={{ fontWeight: "bold" }}>{icon}</Icon>
            </SoftButton>*/}
                            </SoftBox>

                            <SoftBox display="flex" flexDirection="column" pl={1} pr={1} sx={{border: '1px dashed'}}>
                                <SoftTypography variant="button" fontWeight="medium" gutterBottom>
                                    글쓴이 : {user.username}
                                </SoftTypography>
                            </SoftBox>

                            <SoftBox display="flex" flexDirection="column" pl={1} pr={1} sx={{border: '1px dashed'}}>
                                <SoftTypography variant="button" fontWeight="medium" gutterBottom>
                                    제목 : {data.title}
                                </SoftTypography>

                            </SoftBox>

                        </SoftBox>
                        <SoftTypography variant="caption" color="text" pl={1} pr={1} sx={{border: '1px dashed'}}>
                            날짜 : {description}
                        </SoftTypography>
                    </SoftBox>
                </SoftButton>
                {renderMenu()}
            </SoftBox>
        );
    }

// Typechecking props of the Transaction
    Transaction.propTypes = {
        color: PropTypes.oneOf([
            "primary",
            "secondary",
            "info",
            "success",
            "warning",
            "error",
            "light",
            "dark",
        ]).isRequired,
        description: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        id: PropTypes.number.isRequired,
    };

    export default Transaction;
