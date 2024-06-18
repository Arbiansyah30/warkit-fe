import { useCarousel } from "@hooks/home/useCarousel";
import { Carousel } from "react-responsive-carousel";

const CarouselPromo = () => {
  const { data: products } = useCarousel({ perPage: 3 });
  return (
    <Carousel
      className="w-full h-full"
      autoPlay
      infiniteLoop
      showIndicators={false}
      showStatus={false}
      showThumbs={false}
    >
      {products?.data?.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-center w-full max-h-[100vh] h-full min-h-[250px] bg-gray-100"
        >
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={item.image}
              alt={item.name}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselPromo;
