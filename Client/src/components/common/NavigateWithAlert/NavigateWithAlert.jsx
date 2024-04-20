import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useEffect } from "react";

function NavigateWithAlert({ message, ...rest }) {
  useEffect(() => {
    toast.warning(message);
  }, [message]);
  return <Navigate {...rest} />;
}

NavigateWithAlert.propTypes = {
  message: PropTypes.string.isRequired,
};

export default NavigateWithAlert;
