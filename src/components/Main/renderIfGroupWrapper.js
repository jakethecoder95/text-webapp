import { connect } from "react-redux";

import NoGroupPage from "../NoGroupPage/NoGroupPage";

/*
 * This function has access to the redux group and will
 * render the NoGroupPage if the user does not have a
 * group on his/her profile.
 *
 * @prop {Boolean}         hasGroup      True if user has group, false if not
 * @prop {React Component} Page          Page connected with rout
 * @prop {React Component} NoGroupPage   Page will rendered if user has no group
 */
const renderIfGroupWrapper = ({ Page, hasGroup }) => {
  if (!hasGroup) {
    return NoGroupPage;
  }
  return Page;
};

const mapStateToProps = ({ group }) => ({
  hasGroup: group.avtiveGroup
});
export default connect(mapStateToProps)(renderIfGroupWrapper);
