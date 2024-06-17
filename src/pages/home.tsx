import CarouselPromo from "../components/home/CarouselPromo";
import ListProduct from "../components/home/ListProduct";

const Home = () => {
  return (
    <>
      <div className="max-h-screen">
        <CarouselPromo />
        <ListProduct />
      </div>
    </>
  );
};

export default Home;
