// /components/PaymentButton.js
import { useState } from 'react';

const PaymentButton = () => {
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/payment/createLink', {
        method: 'POST',
      });
      const data = await response.json();
      if (data.url) {
        setPaymentUrl(data.url);
      }
    } catch (error) {
      console.error('Error creating payment link:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      {loading && <p>Generating payment link...</p>}
      {!paymentUrl && (
        <button onClick={handlePayment} className="btn">
          Pay Now
        </button>
      )}
      {paymentUrl && (
        <a href={paymentUrl} target="_blank" rel="noopener noreferrer">
          Complete Payment
        </a>
      )}
    </div>
  );
};

export default PaymentButton;
