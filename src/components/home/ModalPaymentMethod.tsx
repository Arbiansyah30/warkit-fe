import QRIS from "../../assets/images/qris.png";
import CASH from "../../assets/images/🦆 icon _wallet_.svg";

const ModalPaymentMethod = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.5)] flex items-center justify-center">
      <div className="w-[80%] h-[300px] bg-white rounded-xl flex justify-center items-center gap-5">
        <div className="flex flex-col justify-center gap-5">
          <img src={QRIS} alt="qris" width={100} />
          <p className="">QRIS</p>
        </div>
        <div className="flex flex-col justify-center gap-5">
          <img src={CASH} alt="qris" width={70} />
          <p>CASH</p>
        </div>
      </div>
    </div>
  );
};

export default ModalPaymentMethod;
