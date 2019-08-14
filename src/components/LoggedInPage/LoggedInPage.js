import React, { useState } from "react";

import Nav from "./Nav/Nav";
import Text from "./Text/Text";
import Group from "./Group/Group";
import Settings from "./Settings/Settings";

const LoggedInPage = props => {
  const [active, setActive] = useState("text");

  const renderPage = () => {
    if (active === "text") {
      return <Text setActive={setActive} />;
    }
    if (active === "group") {
      return <Group />;
    }
    if (active === "settings") {
      return <Settings />;
    }
  };

  return (
    <div>
      <Nav active={active} setActive={setActive} />
      {renderPage()}
    </div>
  );
};

export default LoggedInPage;
