import Banner from "../components/Banner";
import { useEffect, useState } from "react";
import axios from "axios";
import HomeOffers from "../components/HomeOffers";

const Home = () => {
  const [offers, setOffers] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setOffers(response.data.offers);
        setIsLoading(false);
      } catch (e) {
        console.log(e.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>Loading</span>
  ) : (
    <div>
      <Banner />
      <HomeOffers offers={offers} />
    </div>
  );
};

export default Home;
