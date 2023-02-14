import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useLocation } from "react-router-dom";

const CheckOutForm = ({ userId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const location = useLocation();
  // const { title, price, picture } = location.state;

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: userId,
      });

      const stripeToken = stripeResponse.token.id;

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          stripeToken: stripeToken,
        }
      );
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
      <form style={{ width: "300px" }} onSubmit={handleSubmit}>
        <h1>Formulaire de paiement</h1>
        <CardElement />

        {completed ? (
          <p>Paiement effectué</p>
        ) : (
          <button disabled={isLoading} type="submit">
            Payer
          </button>
        )}
      </form>
    </div>
  );
};

export default CheckOutForm;
