import banner from "../assets/banner-vinted.jpg";
import tear from "../assets/tear-d431548c90905ad757632e4c3075d9473e38c7c6642721efeae9413afb9387a2.svg";

const Banner = () => {
  return (
    <div className="relative mt-[95p]">
      <img
        className="h-[455px] w-full object-cover"
        src={banner}
        alt="banner"
      />
      <img className="absolute bottom-0 right-0 h-20" src={tear} alt="tear" />
      <div className="absolute left-96 top-[75px] flex h-[270px] w-[410px] flex-col justify-around rounded-md bg-white py-10 px-10">
        <h1 className="text-4xl">Prêt à faire du tri dans vos placards ?</h1>
        <button className="w-1/2 rounded-md border border-[#2CB1BA] bg-[#2CB1BA] py-1.5  text-sm text-sm text-white">
          Commencer à vendre
        </button>
      </div>
    </div>
  );
};
export default Banner;
