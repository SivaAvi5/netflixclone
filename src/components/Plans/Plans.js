import React, { useEffect, useState } from "react";
import "./Plans.css";
import { addDoc, collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firbase";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const Plans = () => {
  const [products, setProducts] = useState({});
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchSubscription = async () => {
      const q = query(collection(db, "customers", user.uid, "subscriptions"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setSubscription({
          role: data.role,
          productName:data.items[0].price.product.name,
          current_period_end: data.current_period_end.seconds,
          current_period_start: data.current_period_start.seconds,
        });
      });
    };

    fetchSubscription();
  }, [user]);

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, "products"), where("active", "==", true));
      const querySnapshot = await getDocs(q);
      const products = {};

      const productPromises = querySnapshot.docs.map(async (doc) => {
        const productData = doc.data();
        const priceQuery = query(collection(doc.ref, "prices"));
        const priceSnap = await getDocs(priceQuery);

        productData.prices = priceSnap.docs.map((priceDoc) => ({
          priceId: priceDoc.id,
          priceData: priceDoc.data(),
        }));

        products[doc.id] = productData;
      });

      await Promise.all(productPromises);
      setProducts(products);
    };

    fetchProducts();
  }, []);

  console.log('Products:', products);
  console.log('Subscription:', subscription);

  const loadCheckout = async (priceId) => {
    try {
      const docRef = await addDoc(collection(db, "customers", user.uid, "checkout_sessions"), {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

      onSnapshot(docRef, async (snapshot) => {
        const { error, sessionId } = snapshot.data();
        if (error) {
          alert(`An error occurred: ${error.message}`);
        }
        if (sessionId) {
          const stripe = await loadStripe("pk_test_51PQ1HRSHHAPRyv32KjPiAd0j3f6LbcDRFPEFLRVe4SWcs1QJGCeorhcYzNEcBPcBLzzWEeMOulVYY7OScEFjAEBQ00aVtwYiI1");
          stripe.redirectToCheckout({ sessionId });
        }
      });
    } catch (error) {
      console.error("Error creating checkout session: ", error);
      alert(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="plans">
      <br />
      {subscription && (
        <p>
          Renewal Date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        // Check if the current product matches the subscription role
        const isCurrentPackage = (productData.name?.toLowerCase() === subscription?.role?.toLowerCase())||(productData.name?.toLowerCase() === subscription?.productName?.toLowerCase())
        return (
          <div key={productId} className={`plansScreen__plan ${isCurrentPackage && "plansScreen__plan__disabled"}`}>
            <div className="planScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            {productData.prices.map(({ priceId }) => (
              <button key={priceId} onClick={() => !isCurrentPackage && loadCheckout(priceId)}>
                {isCurrentPackage ? "Current Package" : "Subscribe"}
              </button>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Plans;
