import React from "react";
import PaymentButton from "../components/paymentbuttonutton";
import PaymentButton from "../components/paymentbutton.jsx";

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to My Store</h1>
      <p>Click the button below to complete your payment:</p>
      <PaymentButton />
    </div>
  );
}
