import { loadStripe } from '@stripe/stripe-js';
import React from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const CheckoutButton: React.FC = () => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
    });
    const session = await response.json();
    await stripe?.redirectToCheckout({ sessionId: session.id });
  };

  return <button onClick={handleCheckout}>Checkout</button>;
};

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Store</h1>
      <CheckoutButton />
    </div>
  );
};

export default Home; 