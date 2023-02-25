class User {
  constructor({ id, name, email, password, isAdmin = false }) {
    Object.assign(this, { id, name, email, password, isAdmin });
  }
}

export default User;
