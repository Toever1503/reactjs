import instance from "./instance.jsx";


//for product
export const createProduct = (product) => {
  const url = "/Product";
  return instance.post(url, product);
};

export const deleteProductById = (id) => {
  const url = "/Product/" + id;
  return instance.delete(url);
};

export const updateProduct = (product) => {
  const url = "/Product/" + product.id;
  return instance.put(url, product);
};


// for user
export const createUser = (User) => {
  const url = "/User";
  return instance.post(url, User);
};

export const getListUser = () => {
  const url = "/User";
  return instance.get(url);
};

export const deleteUserById = (id) => {
  const url = "/User/" + id;
  return instance.delete(url);
};

export const updateUser = (User) => {
  const url = "/User/" + User.id;
  return instance.put(url, User);
};

// for category
export const createCat = (Cat) => {
  const url = "/Cat";
  return instance.post(url, Cat);
};

export const getCatById = (id) => {
  const url = "/Cat/" + id;
  return instance.get(url);
};

export const deleteCatById = (id) => {
  const url = "/Cat/" + id;
  return instance.delete(url);
};

export const updateCat = (Cat) => {
  const url = "/Cat/" + Cat.id;
  return instance.put(url, Cat);
};

// for danhmuc
export const getListDanhMuc = () => {
  const url = "/DanhMuc";
  return instance.get(url);
};