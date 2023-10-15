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

// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SoftInput from "../../../components/SoftInput";
import {useEffect, useRef, useState} from "react";
import {Stomp} from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import ProfileInfoCard from "../../../examples/Cards/InfoCards/ProfileInfoCard";

function Chat({ changeChat }) {

    const  client  = useRef({});
    const [chat, setChat] = useState(""); // 입력된 chat을 받을 변수
    const [chatList, setChatList] = useState([]); // 채팅 기록

    const connect = () => {
        // 소켓 연결
        try {
                client.current = Stomp.over(() => {
                    const sock = new SockJS('/ws');
                    return sock;
                });
                client.current.connect(
                    {},
                    () => {
                        // callback 함수 설정, 대부분 여기에 sub 함수 씀

                        client.current?.subscribe(
                            '/sub/chat/1',
                            (body) => {
                                const json_body = JSON.parse(body.body);
                                setChatList((_chat_list) =>
                                    [..._chat_list, json_body]
                                );
                                console.log("chatList", chatList);
                            },
                            {
                                // 여기에도 유효성 검증을 위한 header 넣어 줄 수 있음
                            }
                        );
                        client.current.activate(); // 클라이언트 활성화
                    }
                );
        }
        catch (e) {
            console.log("제발ㄹㄹㄹㄹㄹ",e);
        }
    };
// 타임아웃 시간을 밀리초로 지정하여 함수 호출
    const disConnect = () => {
        // 연결 끊기
        console.log("disconnect")

        client.current.deactivate();
        changeChat();
    };

    const sendChat = (e) => {
        console.log("sendCHat0");
        if (client.current && client.current.connected) {
            console.log("sendChat")


            client.current.publish({
                destination: "/pub/chat",
                body: JSON.stringify({
                    sender: "sender",
                    content: chat
                }),
            });
            setChat("");
        }
    };

    const handleChatChange = (e) => {

        setChat(e.target.value);
        console.log(chat);
    };

    const handleOnKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendChat(e); // Enter 입력이 되면 클릭 이벤트 실행
        }
    };

    useEffect(() => {
        connect();
        window.addEventListener('beforeunload', (event) => {
                console.log("해제한다아아아아");
                disConnect();
        });

        return () => disConnect();
    }, []);



    return (
        <Card sx={{ height: "100%" }}>
            <SoftBox pt={2} px={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>

                {/*뒤로가기 누르면*/}
                <SoftButton onClick={disConnect}><ArrowBackIcon /></SoftButton>
                <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                    Chat
                </SoftTypography>
                <SoftBox></SoftBox>
            </SoftBox>

            <SoftBox p={2} sx={{ height: '30vh', overflowY: 'scroll' }}>
                {chatList.map((item)=>(
                    // eslint-disable-next-line react/jsx-key
                    <SoftBox sx={{border:1}}>{item.content}</SoftBox>
                ))}
            </SoftBox>
            <SoftBox m={4} pr={1} bottom={5} sx={{display: 'flex'}}>
                <SoftInput
                    placeholder="Type here..."
                    //icon={{ component: "send", direction: "right" }}
                    onChange={handleChatChange}
                    onKeyPress={handleOnKeyPress}
                    value={chat}
                />
                <SoftButton onClick={sendChat} variant="gradient" color="primary" >
                    보내기
                </SoftButton>
            </SoftBox>
        </Card>
    );
}
Chat.propTypes = {
    ChatState: PropTypes.bool.isRequired,
    changeChat: PropTypes.func.isRequired
};

export default Chat;
