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
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React base styles
import borders from "assets/theme/base/borders";

// Images
import masterCardLogo from "assets/images/logos/mastercard.png";
import visaLogo from "assets/images/logos/visa.png";
import {Stomp} from '@stomp/stompjs';
import {useRef, useState} from "react";
import * as SockJS from "sockjs-client";

//stomp와 sockjs 패키지로 깔고 임포트!!

function PaymentMethod() {
    const {borderWidth, borderColor} = borders;

    const client = useRef({});
    const [chat, setChat] = useState(""); // 입력된 chat을 받을 변수
    const [chatList, setChatList] = useState([]); // 채팅 기록

    const connect = () => {
        // 소켓 연결
        client.current = Stomp.over(() => {
            const sock = new SockJS('/ws');
            return sock;
        });
        client.current.connect(
            {},
            () => {
                // callback 함수 설정, 대부분 여기에 sub 함수 씀
                client.current.subscribe(
                    '/sub/chat/1',
                    (body)=>{
                        const json_body = JSON.parse(body.body);
                        setChatList((_chat_list) =>
                            [..._chat_list, json_body]
                        );
                    },
                    {
                        // 여기에도 유효성 검증을 위한 header 넣어 줄 수 있음
                    }
                );
            }
        );
    };


    const disConnect = () => {
        // 연결 끊기
        if (client === null) {
            return;
        }
        client.deactivate();
    };

    // 콜백함수 => ChatList 저장하기
    const callback = function (message) {
        if (message.body) {
            let msg = JSON.parse(message.body);
            setChatList((chats) => [...chats, msg]);
        }
    };

    const sendChat = (e) => {
        e.preventDefault();

        client.current.publish({
            destination: "/pub/chat",
            body: JSON.stringify({
                sender: "sender",
                content: "chat"
            }),
        });

        setChat("");
    };


    return (
        <Card id="delete-account">
            <SoftBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
                <SoftTypography variant="h6" fontWeight="medium">
                    Payment Method
                </SoftTypography>

                <SoftButton onClick={connect} variant="gradient" color="dark">
                    <Icon sx={{fontWeight: "bold"}}>add</Icon>
                    &nbsp;add new card
                </SoftButton>
                <SoftButton onClick={sendChat} variant="gradient" color="dark">
                    <Icon sx={{fontWeight: "bold"}}>add</Icon>
                    &nbsp;send new card
                </SoftButton>

            </SoftBox>
            <SoftBox p={2}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <SoftBox
                            border={`${borderWidth[1]} solid ${borderColor}`}
                            borderRadius="lg"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            p={3}
                        >
                            <SoftBox component="img" src={masterCardLogo} alt="master card" width="10%" mr={2}/>

                            <SoftTypography variant="h6" fontWeight="medium">
                                ****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;7852
                            </SoftTypography>

                            <SoftBox ml="auto" lineHeight={0}>
                                <Tooltip title="Edit Card" placement="top">
                                    <Icon sx={{cursor: "pointer"}} fontSize="small">
                                        edit
                                    </Icon>
                                </Tooltip>
                            </SoftBox>
                        </SoftBox>



                    </Grid>
                    <Grid item xs={12} md={6}>
                        <SoftBox
                            border={`${borderWidth[1]} solid ${borderColor}`}
                            borderRadius="lg"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            p={3}
                        >
                            <SoftBox component="img" src={visaLogo} alt="master card" width="10%" mr={2}/>
                            <SoftTypography variant="h6" fontWeight="medium">
                                ****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;5248
                            </SoftTypography>
                            <SoftBox ml="auto" lineHeight={0}>
                                <Tooltip title="Edit Card" placement="top">
                                    <Icon sx={{cursor: "pointer"}} fontSize="small">
                                        edit
                                    </Icon>
                                </Tooltip>
                            </SoftBox>
                        </SoftBox>
                    </Grid>
                </Grid>
            </SoftBox>
        </Card>
    );
}

export default PaymentMethod;
