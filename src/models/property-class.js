class Property {
  constructor({ id, name, price, description, imgUrl }) {
    Object.assign(this, { id, name, price, description, imgUrl });
  }
}
export default Property;
