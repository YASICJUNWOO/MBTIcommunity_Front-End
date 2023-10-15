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

import {useState} from "react";

// react-router-dom components
import {Link, useNavigate} from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import mbtiList from "../data/mbtiList";
import axios from "axios";

{/**
 * 회원가입 화면
 */}

function SignUp() {
    const [mbti, setMbti] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동을 관리합니다.

    const handleMbtiChange = (e) => {
        setMbti(e.target.value);
    };
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    //회원가입
  const handleSignUp = (e) => {
    e.preventDefault();
    const userData = {
      username: username,
        email: email,
        password:password,
        mbtiType:mbti,
    };

    const url = `http://localhost:8080/api/signup`

    // 서버로 POST 요청 보내기
    axios
        .post(url, userData
            //{credentials: 'include'}
        )
        .then((response) => {
          // 로그인 성공 시 처리
          // 로그인 성공 후 필요한 작업 수행
          // 페이지 이동 예: 홈 페이지로 이동
            alert(`${username}님 회원가입 성공`)
          navigate("/authentication/sign-in");
        })
        .catch((error) => {
          // 로그인 실패 시 처리
          alert('회원가입 실패')
          // 로그인 실패 후 필요한 작업 수행
        });
  };



  //동의 화면
    const [agreement, setAgremment] = useState(true);

    const handleSetAgremment = () => setAgremment(!agreement);

    return (
        <BasicLayout
            title="Welcome!"
            description="Use these awesome forms to login or create new account in your project for free."
            image={curved6}
        >
            {/**
             * 정보 입력 폼 카드
             */}
            <Card>
                <SoftBox p={3} mb={1} textAlign="center">
                    <SoftTypography variant="h5" fontWeight="medium">
                        Register with
                    </SoftTypography>
                </SoftBox>

                {/**
                 * 소셜 로그인 버튼
                 */}
                <SoftBox mb={2}>
                    <Socials/>
                </SoftBox>
                <Separator/>

                {/**
                 * 정보 입력 폼
                 */}
                <SoftBox pt={2} pb={3} px={3}>
                    <SoftBox component="form" role="form">
                        <SoftBox mb={2}>
                            <SoftInput placeholder="Name" onChange={handleUsernameChange}/>
                        </SoftBox>
                        <SoftBox mb={2}>
                            <SoftInput type="email" placeholder="Email" onChange={handleEmailChange}/>
                        </SoftBox>
                        <SoftBox mb={2}>
                            <SoftInput type="password" placeholder="Password" onChange={handlePasswordChange}/>
                        </SoftBox>

                        {/**
                         * mbti 선택
                         */}
                          <Box>
                              <FormControl sx={{width: 'auto'}}>
                                  <InputLabel id="demo-simple-select-label">
                                      MBTI
                                  </InputLabel>
                                  <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={mbti}
                                      label="mbti"
                                      onChange={handleMbtiChange}
                                      sx={{width: '100%'}}
                                  >

                                      {mbtiList.map(
                                          (mbti) => (<MenuItem value={mbti} key={mbti}>{mbti}</MenuItem>)
                                      )
                                      }
                                  </Select>
                              </FormControl>
                          </Box>
                        
                        {/**
                         * 약관 동의
                         */}
                        <SoftBox display="flex" alignItems="center">
                            <Checkbox checked={agreement} onChange={handleSetAgremment}/>
                            <SoftTypography
                                variant="button"
                                fontWeight="regular"
                                onClick={handleSetAgremment}
                                sx={{cursor: "poiner", userSelect: "none"}}
                            >
                                &nbsp;&nbsp;I agree the&nbsp;
                            </SoftTypography>
                            <SoftTypography
                                component="a"
                                href="#"
                                variant="button"
                                fontWeight="bold"
                                textGradient
                            >
                                Terms and Conditions
                            </SoftTypography>
                        </SoftBox>

                        {/**
                         * 등록 버튼
                         */}
                        <SoftBox mt={4} mb={1}>
                            <SoftButton variant="gradient" color="dark" onClick = {handleSignUp} fullWidth>
                                sign up
                            </SoftButton>
                        </SoftBox>

                        {/**
                         * 로그인 링크
                         */}
                        <SoftBox mt={3} textAlign="center">
                            <SoftTypography variant="button" color="text" fontWeight="regular">
                                Already have an account?&nbsp;
                                <SoftTypography
                                    component={Link}
                                    to="/authentication/sign-in"
                                    variant="button"
                                    color="dark"
                                    fontWeight="bold"
                                    textGradient
                                >
                                    Sign in
                                </SoftTypography>
                            </SoftTypography>
                        </SoftBox>
                    </SoftBox>
                </SoftBox>
            </Card>
        </BasicLayout>
    );
}

export default SignUp;
