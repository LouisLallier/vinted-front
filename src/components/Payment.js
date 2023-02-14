import { loadStripe } from "@stripe/stripe-js/pure";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);
const Payment = ({ userId }) => {
  const location = useLocation();
  const { title, price } = location.state;

  return (
    <div className="relative h-screen bg-gray-200">
      <div className=" absolute top-24 left-1/3 h-96 w-1/3 bg-white p-10">
        <h2 className="py-3 text-xl font-bold">
          Voici le récapitulatif de votre commande :
        </h2>
        <div className="">
          <p> Article : {title}</p>
          <p> Prix: {price.toFixed(2)}</p>
          <p>Frais de port : {(2.5).toFixed(2)} €</p>
          <p>Frais de protection acheteur : {(0.4).toFixed(2)} €</p>
          <p> Total: {(price + 2.5 + 0.4).toFixed(2)}€</p>
          <p>
            Il ne vous reste plus qu'une étape pour vous offrir{" "}
            <strong>{title} </strong>. vous allez payer{" "}
            <strong>{(price + 2.5 + 0.4).toFixed(2)} €</strong> (frais de
            protection et frais de port inclus)
          </p>
          <Elements stripe={stripePromise}>
            <CheckoutForm title={title} price={price} userId={userId} />
          </Elements>
        </div>
      </div>
    </div>
  );
};
export default Payment;
