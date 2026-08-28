const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="state-container">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
};

export default Loading;
