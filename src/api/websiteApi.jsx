import instance from "./instance.jsx";

// for product
export const getListProduct = () => {
  const url = "/Product";
  return instance.get(url);
};

export const getProductById = (id) => {
  const url = "/Product/" + id;
  return instance.get(url);
};

export const getUserById = (id) => {
  const url = "/User/" + id;
  return instance.get(url);
};

export const getListCat = () => {
  const url = "/Cat";
  return instance.get(url);
};