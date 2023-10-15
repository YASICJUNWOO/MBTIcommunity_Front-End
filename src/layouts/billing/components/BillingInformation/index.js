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

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Billing page components
import Bill from "layouts/billing/components/Bill";
import {useEffect, useState} from "react";
import axios from "axios";

function BillingInformation() {

    const [posts, setPost] = useState([]); // 데이터를 저장할 상태

    useEffect(() => {
        // Axios를 사용하여 GET 요청 보내고 데이터 가져오기
        axios.get('/post/list') // API의 엔드포인트 URL을 여기에 입력
            .then((response) => {
                // 응답 데이터를 상태에 저장
                console.log("popular",response.data)
                setPost(response.data);
            })
            .catch((error) => {
                // 오류 처리
                console.error('Error fetching data:', error);
            });
    }, []); // 빈 종속성 배열로 컴포넌트가 처음 렌더링될 때 한 번만 실행

  return (
    <Card id="delete-account">
      <SoftBox pt={3} px={2}>
        <SoftTypography variant="h6" fontWeight="medium">
          Popular Posts
        </SoftTypography>
      </SoftBox>
      <SoftBox pt={1} pb={2} px={2}>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
            {posts.map((post) => (
                // eslint-disable-next-line react/jsx-key
                <Bill
                    title={post.title}
                    username={post.user.username}
                    mbtiType={post.mbtiType}
                    content={post.content}
                />
            ))}

            {/*<Bill
              title="lucas harper"
            username="stone tech zone"
            mbtiType="lucas@stone-tech.com"
            content="FRB1235476"
          />
          <Bill
              title="ethan james"
            username="fiber notion"
            mbtiType="ethan@fiber.com"
            content="FRB1235476"
            noGutter
          />*/}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default BillingInformation;
