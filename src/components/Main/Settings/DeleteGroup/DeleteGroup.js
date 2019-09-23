import React, { useState } from "react";
import { connect } from "react-redux";

import DeleteGroupModal from "./DeleteGroupModal";
import { INIT_APP } from "../../../../redux/types";

const DeleteGroup = ({ group, initApp }) => {
  const [showModal, setShowModal] = useState(false);

  const style = {
    marginTop: "2rem"
  };

  return (
    <>
      <div style={style}>
        <button
          className="btn btn-outline-danger"
          onClick={() => setShowModal(true)}
        >
          Delete {group.name}
        </button>
        <p className="text-danger">WARNING: This cannot be undone</p>
      </div>
      <DeleteGroupModal
        show={showModal}
        group={group}
        deletedGroup={() => initApp()}
        closeModal={() => setShowModal(false)}
      />
    </>
  );
};

const mapStateToProps = ({ group }) => ({
  group: group.activeGroup
});

const mapDispatchToProps = dispatch => ({
  initApp: () => dispatch({ type: INIT_APP })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteGroup);
