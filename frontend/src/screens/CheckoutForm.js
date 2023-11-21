import React, { useState } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
      return;
    }

    // Aquí puedes enviar paymentMethod.id al servidor para procesar el pago

    setPaymentSuccess(true);
    setError(null);
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="card-element">Tarjeta de crédito o débito</label>
        <CardElement id="card-element" />
      </div>
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={!stripe || processing}>
        {processing ? "Procesando..." : "Pagar"}
      </button>
      {paymentSuccess && <p>Pago exitoso. ¡Gracias!</p>}
    </form>
  );
};

export default CheckoutForm;
