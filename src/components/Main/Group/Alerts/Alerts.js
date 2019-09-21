import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import _ from "lodash";

toast.configure({
  position: "bottom-right",
  draggable: false
  //etc you get the idea
});

const Alerts = props => {
  const screenWidth = window.innerWidth;

  const style = {
    width: "700px",
    margin: "1rem auto"
  };

  const renderNumberErrors = () => {
    if (props.alerts.number && screenWidth >= 990) {
      toast.warn(props.alerts.number, {
        toastId: "A",
        onClose: () => {
          props.setAlerts(_.omit(props.alerts, "number"));
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
    return <ToastContainer autoClose={4000} position="bottom-right" />;
  };

  return <div style={style}>{renderNumberErrors()}</div>;
};

export default Alerts;
