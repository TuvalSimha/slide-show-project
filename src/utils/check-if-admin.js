const checkIfAdmin = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return token?.isAdmin ?? false;
};

export default checkIfAdmin;
