import React from "react";

import { SpinnerContainer, SpinnerOverlay } from "./withSpinner.styles";

const WithSpinner = (WrappedComponent) => {
  const Spinner = ({ isLoading, ...otherpProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherpProps} />
    );
  };
  return Spinner;
};

export default WithSpinner;
