import React from "react";

function PaymentButton() {
  const handlePayment = () => {
    // Replace this with your actual Stripe payment link
    window.location.href = "https://buy.stripe.com/6oE7t83TqdXO9OgeUU";
  };

  return (
    <button
      onClick={handlePayment}
      style={{
        padding: "10px 20px",
        backgroundColor: "#6772E5",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Pay Now
    </button>
  );
}

export default PaymentButton;
