import "./Message.scss";
import React from "react";
import { connect } from "react-redux";

const Message = ({ message, group }) => {
  const isOutboundMessage = message.type === "outbound-api";
  const classes = `${isOutboundMessage ? "outbound-bubble" : "inbound-bubble"}`;
  const contact = group.people.find(person =>
    message.number ? person.number === message.number.replace("+", "") : false
  );
  const messageBubbleSubtext = isOutboundMessage ? (
    <>
      {new Date(message.date).toLocaleDateString()} - sent:{" "}
      <span className="text-success">{message.totalSent}</span>, errors:{" "}
      <span className={message.errors ? "text-danger" : ""}>
        {message.errors}
      </span>
    </>
  ) : (
    <>
      {new Date(message.date).toLocaleDateString()} -{" "}
      {contact ? contact.name : message.number}
    </>
  );
  return (
    <li className="message">
      <div className={classes}>
        <p className="message-bubble_body">{message.body}</p>
        <p className="message-bubble_subtext">{messageBubbleSubtext}</p>
      </div>
    </li>
  );
};

const mapStateToProps = ({ group, user }) => ({
  group: group.activeGroup
});

export default connect(mapStateToProps)(Message);
