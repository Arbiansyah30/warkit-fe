import { Carousel } from "react-responsive-carousel";

const CarouselPromo = () => {
  const slides = [
    <img
      src="https://media.suara.com/pictures/653x366/2021/06/04/85885-mi-ayam-pedas.jpg"
      alt="Slide 1"
      className="object-cover w-full h-full"
    />,
    <img
      src="https://asset-2.tstatic.net/pontianak/foto/bank/images/Promo-Makanan-Akhir-Tahun-di-Restoran-18-Desember-2023-Banyak-Pilihan-Menu-Makanan-Enak-dan-Hemat.jpg"
      alt="Slide 2"
      className="object-cover w-full h-full"
    />,
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNPXOOVITANhBAfWzW5g1Yd6d3k1EhI2cWsw&s"
      alt="Slide 3"
      className="object-cover w-full h-full"
    />,
  ];
  return (
    <Carousel
      className="w-full h-full"
      autoPlay
      infiniteLoop
      showIndicators={false}
      showStatus={false}
      showThumbs={false}
    >
      {slides.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-center w-full max-h-[100vh] h-full min-h-[250px] bg-gray-100"
        >
          <div className="w-full h-full flex items-center justify-center">
            {item}
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselPromo;
