import CarouselPromo from "../components/CarouselPromo";
import ListProduct from "../components/ListProduct";

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
