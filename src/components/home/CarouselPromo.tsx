import { useCarousel } from "@hooks/home/useCarousel";
import { Carousel } from "react-responsive-carousel";
import defaultImage from "../../assets/default-image.png";

const CarouselPromo = () => {
  const { data: products } = useCarousel({ perPage: 3 });
  const defautltImageList = [defaultImage];
  return (
    <Carousel
      className="w-full h-full"
      autoPlay
      infiniteLoop
      showIndicators={false}
      showStatus={false}
      showThumbs={false}
    >
      {!products?.data?.length
        ? defautltImageList.map((item) => (
            <div className="flex items-center justify-center w-full max-h-[100vh] h-full min-h-[250px] bg-gray-100">
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={item}
                  alt={"Image"}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          ))
        : products?.data?.map((item, index) => (
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
