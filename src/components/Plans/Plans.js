import React, { useEffect, useState } from "react";
import "./Plans.css";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firbase";

const Plans = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "products"), where("active", "==", true));
      const querySnapshot = await getDocs(q);
      const product = {};

      querySnapshot.foreach(async (doc) => {
        product[doc.id] = doc.data();

        const priceQuery = query(collection(doc.ref, "prices"));

        const priceSnap = await getDocs(priceQuery);

        priceSnap.docs.forEach((priceDoc) => {
          products[doc.id].prices = {
            priceId: priceDoc.id,
            priceData: priceDoc.data(),
          };
        });
      });
      fetchData();
    };
  }, []);
  console.log(products);

  return (
    <div className="plans">
      <div className="plans__subscription">
        <div className="Plans__name">
          <p>Premium Plan</p>
          <span>4k + HDR</span>
        </div>
        <button className="sub__btn">Subscribe</button>
      </div>
      <div className="plans__subscription">
        <div className="Plans__name">
          <p>Standard Plan</p>
          <span>1080p</span>
        </div>
        <button className="sub__btn">Subscribe</button>
      </div>
      <div className="plans__subscription">
        <div className="Plans__name">
          <p>Basic Plan</p>
          <span>720p</span>
        </div>
        <button className="sub__btn">Subscribe</button>
      </div>
    </div>
  );
};

export default Plans;
