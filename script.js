async function fetchData() {
  try {
    const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.log('Error fetching data:', error);
  }
}


function calculateDiscountPercentage(price, compareAtPrice) {
  const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
  return Math.round(discount);
}


async function selectCatagory(category) {
  const data = await fetchData();
  const productContainer = document.getElementById('productContainer');
  productContainer.innerHTML = '';
  console.log(data)
const {categories}=data

let mainData=null;
if(category==="Men"){
    mainData=categories[0]
}
else if(category==="Women"){
    mainData=categories[1]
}
else{
    mainData=categories[2]
}

const{category_products}=mainData;
console.log(category_products)
  const categoryData = category_products;
  for (let product of categoryData) {
    const card = document.createElement('div');
    card.classList.add('product-card');

  
    const image = document.createElement('img');
    image.src = product.image;
    image.classList.add("image")

    if (product.badge_text !== null) {
      const badge = document.createElement('div');
      badge.innerText = product.badge_text;
      badge.classList.add("badge");
      card.appendChild(badge);
    }

    const title = document.createElement('h3');
    title.innerText = product.title;
    title.classList.add("title")

    const vendor = document.createElement('li');
    vendor.innerText = ` ${product.vendor}`;

    const price = document.createElement('p');
    price.innerText = `RS${product.price}.00`;
    price.classList.add("price")

    const compareAtPrice = document.createElement('p');
    compareAtPrice.innerText = `${product.compare_at_price}`;
    compareAtPrice.classList.add("compare")

    const discount = document.createElement('p');
    discount.innerText = `${calculateDiscountPercentage(product.price, product.compare_at_price)}% off`;
    discount.classList.add("discount")

    const addToCartBtn = document.createElement('button');
    addToCartBtn.innerText = 'Add to Cart';
    addToCartBtn.classList.add('add-to-cart');

    
    card.appendChild(image);
    
    card.appendChild(title);
    card.appendChild(vendor);
    card.appendChild(price);
    card.appendChild(compareAtPrice);
    card.appendChild(discount);
    card.appendChild(addToCartBtn);

    
    productContainer.appendChild(card);
  };
}

selectCatagory('Men');

