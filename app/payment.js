export default function Payment() {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Complete Your Payment</h1>
        <iframe
          src="https://buy.stripe.com/6oE7t83TqdXO9OgeUU"
          width="100%"
          height="600"
          frameBorder="0"
          allow="payment"
          style={{ border: "none" }}
        ></iframe>
      </div>
    );
  }
  