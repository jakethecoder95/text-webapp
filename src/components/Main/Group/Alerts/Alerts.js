import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import _ from "lodash";

toast.configure({
  position: "bottom-right"
});

const Alerts = props => {
  if (props.alerts.warning) {
    toast.warn(props.alerts.warning, {
      toastId: "A",
      onClose: () => {
        props.setAlerts(_.omit(props.alerts, "warning"));
      }
    });
  }

  if (props.alerts.success) {
    toast.success(props.alerts.success, {
      toastId: "B",
      onClose: () => {
        props.setAlerts(_.omit(props.alerts, "success"));
      }
    });
  }

  if (props.alerts.error) {
    toast.error(props.alerts.error, {
      toastId: "C",
      onClose: () => {
        props.setAlerts(_.omit(props.alerts, "error"));
      }
    });
  }
  return <ToastContainer autoClose={4000} position="bottom-right" />;
};

export default Alerts;
