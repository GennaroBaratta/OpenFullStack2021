const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return message.type === "notification" ? (
    <div className="notification">{message.text}</div>
  ) : (
    <div className="error">{message.text}</div>
  );
};
export default Notification;
