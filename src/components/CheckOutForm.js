import { useState } from "react";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckOutForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
    } catch (e) {
      console.log(e.message);
    }
  };

  return <div>coucou salut</div>;
};

export default CheckOutForm;
