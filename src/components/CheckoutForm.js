import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ userId, title, price }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    console.log(price);
    console.log(title);
    console.log(userId);

    event.preventDefault();
    try {
      setIsLoading(true);
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: userId,
      });

      const stripeToken = stripeResponse.token.id;
      console.log(stripeToken);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeToken,
          title: title,
          amount: price,
        }
      );
      console.log(response);
      if (response.data === "succeeded") {
        setIsLoading(false);
        setCompleted(true);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Formulaire de paiement</h1>
        <CardElement />
        <button disabled={isLoading} type="submit">
          Payer
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
