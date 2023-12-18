import React, { useState, useEffect } from "react";
import ProductsPage from "./components/ProductsPage";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import AccountProfile from "./components/AccountProfile";
import ProfileSettings from "./components/ProfileSettings";
import Orders from "./components/Orders";
import Inbox from "./components/Inbox";
import FavoriteProducts from "./components/FavoriteProduct";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import CheckoutPage from "./components/CheckoutPage";
import ProductDetailsCard from "./components/ProductDetailsCard";
import ls from "local-storage"

function App() {

  const [products, setProducts] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isMember, setMember] = useState("");
  const [productsDictionary, setProductsDictionary] = useState({});
  const [commentsDictionary, setCommentsDictionary] = useState({});
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});

  function fetchProductData() {
    fetch("http://127.0.0.1:5555/items")
      .then((response) => response.json())
      .then((data) => {
        const dictionary = {};
        const commentsDict = {};

        data.forEach((product) => {
          dictionary[product.id] = product;
          commentsDict[product.id] = [];
        });

        setProducts(data);
        setProductsDictionary(dictionary);
      });
  }

  function fetchFavs() {
    fetch("http://127.0.0.1:5555/favorites")
      .then((response) => response.json())
      .then((data) => setFavoriteProducts(data));
  }

  useEffect(() => fetchProductData(), []);
  useEffect(() => fetchFavs(), []);

  function setToFavoriteProducts(item) {
    if (favoriteProducts.includes(item.id)) {
      alert(`${item.name} has already been added to favorites`);
    } else {
      fetch("http://127.0.0.1:5555/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_id: user.id,
          item_id: item.id,
        }),
      })
        .then((response) => response.json())
        .then((favs) => setFavoriteProducts(favs));
    }
  }

  function removeFromFavorites(item) {
    fetch(`http://127.0.0.1:5555/favorites/${item.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        const remProducts = favoriteProducts.filter(
          (product) => product.id !== item.id,
        );
        setFavoriteProducts(remProducts);
      });
  }

  function fetchProductReviews() {
    const favoriteProductsURL = "http://127.0.0.1:5555/reviews";

    fetch(favoriteProductsURL)
      .then((response) => response.json())
      .then((data) => {
        const parsedReviews = {};
        console.log({ data })
        data.forEach((review) => {
          // const newCommentsForproduct = [...commentsDictionary[review.productID], review]
        });
        // setReviews(data);
      });
  }

  function addToCart(product){
    useEffect(()=>{
      const newCart = [...cart,product]
      setCart(newCart)
    },[])
  }

  function handleOrder(order){
    useEffect(()=>{
      // console.log(orders)
      const newCart = [...orders,order]
      setOrders(newCart)
    },[])
  }

  const onLogIn = (user) => {
    setMember(user);
    ls.set("user", user)
  }

  const navigate = useNavigate();

  useEffect(() => {
    const localUser = ls.get("user") || {};
    setUser(localUser)
  }, []);


  const checkUser = () => {
    if (user.id) {
      if (document.location.name == "/login") navigate("/products", { replace: true });
    } else {
      if (document.location.name !== "/login") navigate("/login", { replace: true });
    }
  }

  useEffect(() => {
    checkUser();
    console.log("check")
  }, [user.id])

  console.log(cart)

  return (
    <Routes>
      <Route
        path="/"
        element={<NavBar onSearch={products} userData={user} />}
      >
      <Route
        index
        element={
          <ProductsPage
            products={products}
            setToFavorite={setToFavoriteProducts}
          />
        }
      />
      <Route
        path="products"
        element={
          <ProductsPage
            products={products}
            setToFavorite={setToFavoriteProducts}
            cart={addToCart}
          />
        }
      />
      <Route
        path="/products/:productId"
        element={
          <ProductDetailsCard
            products={products}
            commentsDictionary={commentsDictionary}
            setCommentsDictionary={setCommentsDictionary}
            fetchProductReviews={fetchProductReviews}
            addCart={addToCart}
          />}
      />
      </Route>
      <Route path="/login" element={<LogIn onLogIn={onLogIn} />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/account"
        element={<AccountProfile userData={isMember} itemCount={cart} />}
      >
        <Route
          index
          element={<AccountProfile userData={isMember} itemCount={cart} />}
        />
        <Route path="inbox" element={<Inbox />} />
        <Route path="orders" element={<Orders cart={cart} user={user} setOrder={handleOrder}/>} />
        <Route
          path="favorites"
          element={
            <FavoriteProducts
              favoriteProducts={favoriteProducts}
              removeFromFavorites={removeFromFavorites}
            />
          }
        />
        <Route path="checkout" element={<CheckoutPage order={orders} cart={cart} user={user} setOrder={handleOrder}/>} />
        <Route
          path="profile-settings"
          element={<ProfileSettings userData={user} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
