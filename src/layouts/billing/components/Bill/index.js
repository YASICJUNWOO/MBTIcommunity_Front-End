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
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

{/**
 * 글 목록
 * */}
function Bill({ title, username, mbtiType, content, noGutter }) {
  return (
    <SoftBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor="grey-100"
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
    >
      <SoftBox width="100%" display="flex" flexDirection="column">
        <SoftBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <SoftTypography variant="button" fontWeight="medium" textTransform="capitalize">
            {title}
          </SoftTypography>

          <SoftBox
            display="flex"
            alignItems="center"
            mt={{ xs: 2, sm: 0 }}
            ml={{ xs: -1.5, sm: 0 }}
          >
            <SoftBox mr={1}>
              <SoftButton variant="text" color="error">
                <Icon>delete</Icon>&nbsp;delete
              </SoftButton>
            </SoftBox>
            <SoftButton variant="text" color="dark">
              <Icon>edit</Icon>&nbsp;edit
            </SoftButton>
          </SoftBox>
        </SoftBox>
        <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
            username  :&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {username}
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
            mbtiType  :&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium">
              {mbtiType}
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
        <SoftTypography variant="caption" color="text">
          content  :&nbsp;&nbsp;&nbsp;
          <SoftTypography variant="caption" fontWeight="medium">
            {content}
          </SoftTypography>
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

// Setting default values for the props of Bill
Bill.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
Bill.propTypes = {
  title: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  mbtiType: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Bill;
