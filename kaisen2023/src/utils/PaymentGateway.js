import axios from "axios";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";

export default async function PaymentGateway(amount) {
  const auth = getAuth();
  const { email, displayName } = auth.currentUser;

  const data = await axios({
    method: "post",
    url: "https://kaizen-api.vercel.app/api/paymentgateway",
    data: {
      amount: Number(amount),
      currency: "INR",
      name: displayName,
      email: email,
      contact: "+911234567890",
    },
  });

  const options = {
    key: "rzp_test_OBpc2dgCGqfHXr",
    amount: data.data.amount,
    currency: data.data.currency,
    description: "Kaisen 2023 Event Transaction",
    image: "https://kaizen-api.vercel.app/api/kaizen.png",
    order_id: data.data.id,
    handler: async function (response) {
      await updatePurchase();
      toast.success("Payment Successful");
      console.log(response);
    },
    prefill: {
      name: displayName,
      email: email,
      contact: "+911234567890",
    },
  };

  // DISPLAY RAZORPAY PAYMENT FORM

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();

  // handle payment cancel
  paymentObject.on("payment.cancel", function (response) {
    toast.error("Payment Cancelled");
  });

  // handle payment failure
  paymentObject.on("payment.failed", function (response) {
    toast.error("Payment Failed");
    console.log(response.error);
  });
}

const updatePurchase = async () => {
  const auth = getAuth();
  console.log("updating purchase");
  const userRef = doc(db, "users", auth.currentUser.uid);
  const docSnap = await getDoc(userRef);
  const cart = docSnap.data().cart;

  // put all the cart items in purchased items in firebase

  const purchasedItems = cart.map((item) => {
    return {
      ...item,
      purchased: true,
    };
  });

  // console.log(purchasedItems);
  // update the purchased items in firebase

  await updateDoc(userRef, {
    cart: purchasedItems,
  });

  // navigate to purchased items page
};
