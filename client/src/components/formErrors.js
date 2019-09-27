import React from "react";
import styled from "styled-components";

export const FormErrors = ({ formErrors }) => (
  <StyledFormErrors>
    {Object.keys(formErrors).map((fieldName, i) => {
      if (formErrors[fieldName].length > 0) {
        return (
          <p key={i}>
            {fieldName} {formErrors[fieldName]}
          </p>
        );
      } else {
        return "";
      }
    })}
  </StyledFormErrors>
);

// Will style later
const StyledFormErrors = styled.div`
  color: red;
`;
