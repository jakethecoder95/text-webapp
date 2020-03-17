import "./Message.scss";
import React from "react";
import { connect } from "react-redux";

const Message = ({ message, group }) => {
  const isOutboundMessage = message.type === "outbound-api";
  const directionCSSClass = isOutboundMessage
    ? "outbound-bubble"
    : "inbound-bubble";
  const contact = group.people.find(person =>
    message.number ? person.number === message.number.replace("+", "") : false
  );
  const renderSubtext = () =>
    isOutboundMessage ? (
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
        {contact && contact.name !== "Unknown" ? contact.name : message.number}
      </>
    );
  return (
    <li className="single-message">
      <div className={directionCSSClass}>
        <p className="message-bubble_body">{message.body}</p>
        <p className="message-bubble_subtext">{renderSubtext()}</p>
      </div>
    </li>
  );
};

const mapStateToProps = ({ group }) => ({
  group: group.activeGroup
});

export default connect(mapStateToProps)(Message);
