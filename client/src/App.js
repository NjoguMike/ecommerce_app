import React, { useState, useEffect } from "react";
import ProductsPage from "./Pages/Shop/ProductsPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import AccountProfile from "./Pages/User/AccountProfile";
import ProfileSettings from "./Pages/ProfileSettings";
import Orders from "./Pages/Orders";
import Inbox from "./Pages/Inbox";
import FavoriteProducts from "./components/FavoriteProduct";
import LogIn from "./Pages/Shop/LogIn";
import SignUp from "./Pages/Shop/SignUp";
import CheckoutPage from "./Pages/CheckoutPage";
import ProductDetailsCard from "./components/ProductDetailsCard";

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
    fetch("/items")
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

  useEffect(() => { 
    fetch("/favorites")
      .then((response) => response.json())
      .then((data) => setFavoriteProducts(data));
    }, [])

  useEffect(() => { 
    fetch("/user").then((response) => {
        if (response.ok){
          response.json().then((user) => setUser(user))
        }
      })
  }, [])

  useEffect(() => fetchProductData(), []);

  function setToFavoriteProducts(item) {
    if (favoriteProducts.includes(item.id)) {
      alert(`${item.name} has already been added to favorites`);
    } else {
      fetch("/favorites", {
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
    fetch(`/favorites/${item.id}`, {
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
    const favoriteProductsURL = "/reviews";

    fetch(favoriteProductsURL)
      .then((response) => response.json())
      .then((data) => {
        const parsedReviews = {};
        data.forEach((review) => {
          // const newCommentsForproduct = [...commentsDictionary[review.productID], review]
        });
        // setReviews(data);
      });
  }

  function AddToCart(product){
    useEffect(()=>{
      const newCart = [...cart,product]
      setCart(newCart)
    },[])
  }

  function HandleOrder(order){
    useEffect(()=>{
      const newCart = [...orders,order]
      setOrders(newCart)
    },[])
  }

  const onLogIn = (user) => {
    setMember(user);
  }

  console.log(isMember)
//   <Route
//   path="/"
//   element={<NavBar onSearch={products} userData={user} />}
// >

  return (
    <Routes>
      <Route
        path="/"
        element={<NavBar onSearch={products} user={user} />}
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
        path="/"
        element={
          <ProductsPage
            products={products}
            setToFavorite={setToFavoriteProducts}
            cart={AddToCart}
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
            addCart={AddToCart}
          />}
      />
      </Route>
      <Route path="/login" element={<LogIn onLogIn={onLogIn} />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/account"
        element={<AccountProfile userData={user} itemCount={cart} />}
        >
        <Route path="inbox" element={<Inbox />} />
        <Route path="orders" element={<Orders cart={cart} user={user} setOrder={HandleOrder}/>} />
        <Route
          path="favorites"
          element={
            <FavoriteProducts
              favoriteProducts={favoriteProducts}
              removeFromFavorites={removeFromFavorites}
            />
          }
        />
        <Route path="checkout" element={<CheckoutPage order={orders} cart={cart} user={user} setOrder={HandleOrder}/>} />
        <Route
          path="profile-settings"
          element={<ProfileSettings userData={user} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
