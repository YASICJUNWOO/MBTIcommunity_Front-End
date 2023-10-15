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
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import axios from "axios";

{/**
 * 로그인 페이지
 */
}

function SignIn() {
    const [rememberMe, setRememberMe] = useState(true);

    const handleSetRememberMe = () => setRememberMe(!rememberMe);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동을 관리합니다.


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        console.log('email:', email);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };


    const handleLogin = (e) => {
        e.preventDefault();
        console.log("로그인 버튼 클릭");
        const userData = {
            email: email,
            password: password,
        };

        const url = `http://localhost:8080/auth/login`
        // 서버로 POST 요청 보내기
        axios
            .post(url, userData)
            .then((response) => {
                // 로그인 성공 시 처리
                // 로그인 성공 후 필요한 작업 수행
                // 페이지 이동 예: 홈 페이지로 이동
                //testpassword
                console.log('로그인 성공:', response.data.accessToken);
                localStorage.setItem('accessToken', response.data.accessToken);
                navigate("/dashboard");
            })
            .catch((error) => {
                // 로그인 실패 시 처리
                alert('로그인 실패')
                console.error('로그인 실패:', error);
                // 로그인 실패 후 필요한 작업 수행
            });
    };

    return (
        <CoverLayout
            title="안녕하세요 MBTI community입니다"
            description="이메일과 비밀번호로 로그인하세요"
            image={curved9}
        >
            <SoftBox component="form" role="form">
                <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Email
                        </SoftTypography>
                    </SoftBox>
                    <SoftInput type="email" placeholder="Email" onChange={handleEmailChange} value={email}/>
                </SoftBox>

                <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Password
                        </SoftTypography>
                    </SoftBox>
                    <SoftInput type="password" placeholder="Password" onChange={handlePasswordChange} value={password}/>
                </SoftBox>

                <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                            mbti
                        </SoftTypography>
                    </SoftBox>


                </SoftBox>

                <SoftBox display="flex" alignItems="center">
                    <Switch checked={rememberMe} onChange={handleSetRememberMe}/>
                    <SoftTypography
                        variant="button"
                        fontWeight="regular"
                        onClick={handleSetRememberMe}
                        sx={{cursor: "pointer", userSelect: "none"}}
                    >
                        &nbsp;&nbsp;Remember me
                    </SoftTypography>
                </SoftBox>
                <SoftBox mt={4} mb={1}>
                    <SoftButton onClick={handleLogin} variant="gradient" color="info" fullWidth>
                        sign in
                    </SoftButton>
                </SoftBox>

                {/*<Box sx={{ minWidth: 120 }}>*/}

                {/*</Box>*/}

                <SoftBox mt={3} textAlign="center">
                    <SoftTypography variant="button" color="text" fontWeight="regular">
                        Don&apos;t have an account?{" "}
                        <SoftTypography
                            component={Link}
                            to="/authentication/sign-up"
                            variant="button"
                            color="info"
                            fontWeight="medium"
                            textGradient
                        >
                            Sign up
                        </SoftTypography>
                    </SoftTypography>
                </SoftBox>
            </SoftBox>
        </CoverLayout>
    );
}

export default SignIn;
