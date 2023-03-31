const URL = 'https://dummyjson.com/products/'


export const fetchListProducts = async () => {
  const response = await fetch(URL+ '?limit=100');
  const {products} = await response.json();
  return products;
};

export const addNewProduct = async (newProduct) => {
  const response = await fetch(URL+ 'add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct)
  });
  const product= await response.json();
  return product;
};

export const deleteItem = async (id) => {
  const response = await fetch(URL+ `${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  const product = await response.json();
  return product;
};

export const updateProduct = async (updatedProduct) => {
  const response = await fetch(URL+ `${updatedProduct.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      brand: updateProduct.brand,
      category: updateProduct.category,
      description: updateProduct.description,
      discountPercentage: updateProduct.discountPercentage,
      id: updateProduct.id,
      images: updateProduct.images,
      photo: updateProduct.photo,
      price: updateProduct.price,
      rating: updateProduct.rating,
      stock: updateProduct.stock,
      thumbnail: updateProduct.thumbnail,
      title: updateProduct.title,
    })
  });
  const product= await response.json();
  return product;
};
 