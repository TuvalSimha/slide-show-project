const checkIfConnected = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return token ? token : null;
};

export default checkIfConnected;
