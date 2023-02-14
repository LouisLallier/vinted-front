import { Link } from "react-router-dom";

const HomeOffers = ({ offers }) => {
  return (
    <button className="container flex w-[1280px] flex-wrap justify-center gap-3">
      {offers.map((offer) => {
        return (
          <Link to={`/offer/${offer._id}`}>
            <div className="h-[470px] w-[230px]">
              <div className="my-2 flex items-center justify-around">
                {offer.owner.account.avatar && (
                  <img
                    className="h-1/2 w-1/2 rounded-3xl object-cover"
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                    src={offer.owner.account.avatar.secure_url}
                    alt="owner"
                  />
                )}
                <span>{offer.owner.account.username}</span>
              </div>
              <img
                className="h-[360px] w-[230px]"
                src={offer.product_image.url}
                alt="coucou"
              />
              <div className="flex content-center items-center justify-around pt-3">
                <p>{offer.product_price} €</p>
                <div
                  style={{ display: "flex", flexDirection: "column-reverse" }}
                >
                  {offer.product_details.map((detail, index) => {
                    if (detail.TAILLE) {
                      return (
                        <p className="text-xs text-gray-400" key={index}>
                          {detail.TAILLE}
                        </p>
                      );
                    } else if (detail.MARQUE) {
                      return (
                        <p className="border-l text-gray-500" key={index}>
                          {detail.MARQUE}
                        </p>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </button>
  );
};
export default HomeOffers;
