import getProductData from './api/getProductData.js';
import ProductList from './component/ProductList.js';
import CartList from './component/CartList.js';
// 이 곳에 정답 코드를 작성해주세요.

const $productListGrid = document.getElementById('product-card-grid');
const $openCartBtn = document.getElementById('open-cart-btn');
const $closeCartBtn = document.getElementById('close-cart-btn');
const $shoppingCart = document.getElementById('shopping-cart');
const $backdrop = document.getElementById('backdrop');
const $cartList = document.getElementById('cart-list');
const $paymentBtn = document.getElementById('payment-btn');

let productData = [];

const toggleCart = () => {
  $shoppingCart.classList.toggle('translate-x-full');
  $shoppingCart.classList.toggle('translate-x-0');
  $backdrop.hidden = !$backdrop.hidden;
};

const productList = new ProductList($productListGrid, []);
const fetchProductData = async () => {
  const result = await getProductData();
  productList.setState(result);
  productData = result;
};

const initialCartState = localStorage.getItem('cartState')
  ? JSON.parse(localStorage.getItem('cartState'))
  : [];
const cartList = new CartList($cartList, initialCartState);
const addCartItem = (e) => {
  const clickedProduct = productData.find(
    (product) => product.id == e.target.dataset.productid
  );
  if (!clickedProduct) return;
  cartList.addCartItem(clickedProduct);
  toggleCart();
};

const removeCartItem = (e) => {
  const currentProductId = parseInt(e.target.closest('li').id);
  switch (e.target.className) {
    case 'increase-btn':
      cartList.increaseCartItem(currentProductId);
      break;
    case 'decrease-btn':
      cartList.decreaseCartItem(currentProductId);
      break;
    case 'remove-btn':
      cartList.removeCartItem(currentProductId);
      break;
    default:
      return;
  }
};

const saveToLocalStorage = () => {
  cartList.saveToLocalStorage();
};

fetchProductData();

$openCartBtn.addEventListener('click', toggleCart);
$closeCartBtn.addEventListener('click', toggleCart);
$backdrop.addEventListener('click', toggleCart);
$productListGrid.addEventListener('click', addCartItem);
$cartList.addEventListener('click', removeCartItem);
$paymentBtn.addEventListener('click', saveToLocalStorage);
