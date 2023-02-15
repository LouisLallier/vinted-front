import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import Cookies from "js-cookie";

const CheckoutForm = ({ title, price }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = Cookies.get("user-id");
    try {
      setIsLoading(true);
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: userId,
      });

      const stripeToken = stripeResponse.token.id;
      console.log(stripeToken);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/payment`,
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
        {completed ? (
          <p>Paiement effectué</p>
        ) : (
          <button
            className="rounded-md border border-[#2cb1ba] bg-[#2cb1ba] p-4 text-white hover:bg-white hover:text-[#2cb1ba]"
            disabled={isLoading}
            type="submit"
          >
            {" "}
            Payer
          </button>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
