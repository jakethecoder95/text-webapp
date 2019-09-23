import React, { useState } from "react";
import { connect } from "react-redux";
import store from "store";

import NewAdminForm from "./NewAdminForm";
import Alerts from "../../../Group/Alerts/Alerts";
import server from "../../../../../api/server";
import { UPDATE_GROUP } from "../../../../../redux/types";

const Admins = ({ group, user, updateGroup }) => {
  const [alerts, setAlerts] = useState({});
  const deleteAdmin = async adminId => {
    if (user._id === adminId) {
      return setAlerts({ error: "Cannot remove yourself from admin list." });
    }
    const authString = `Bearer ${store.get("token")}`;
    try {
      const response = await server.delete("/manage/remove-admin", {
        data: {
          adminId,
          groupId: group._id,
          authString
        }
      });
      updateGroup(response.data.group);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h4>Administrators</h4>
      <div className="admin-list">
        {group.admins.length === 0 && <p>...No Admins</p>}
        {group.admins.map(admin => (
          <div className="admin-list-item" key={admin._id}>
            <p>
              <span
                aria-hidden="true"
                className="x"
                onClick={() => deleteAdmin(admin._id)}
              >
                &times;
              </span>
              {admin.email}
            </p>
          </div>
        ))}
      </div>
      <NewAdminForm />
      <Alerts alerts={alerts} setAlerts={setAlerts} />
    </div>
  );
};

const mapStateToProps = ({ group, user }) => ({
  group: group.activeGroup,
  user
});

const mapDispatchToProps = dispatch => ({
  updateGroup: group => dispatch({ type: UPDATE_GROUP, payload: group })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admins);
