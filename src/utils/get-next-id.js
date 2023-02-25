const getNextId = () => {
  let nextId = +localStorage.getItem("nextid") ?? 1;
  if (Number.isNaN(nextId)) {
    nextId = 1;
  }
  return nextId;
};

export default getNextId;
