import { Link } from "react-router-dom";

const HomeOffers = ({ offers }) => {
  return (
    <button className="container flex w-[1280px] flex-wrap items-center gap-3">
      {offers.map((offer) => {
        return (
          <Link to={`/offer/${offer._id}`}>
            <div className="h-[470px] w-[230px]">
              <div className="">{offer.product_name}</div>
              <img
                className="h-[360px] w-[230px]"
                src={offer.product_image.url}
                alt="coucou"
              />
            </div>
          </Link>
        );
      })}
    </button>
  );
};
export default HomeOffers;
