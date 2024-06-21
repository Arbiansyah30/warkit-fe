import { useRef, useState } from "react";
import QRIS from "../../assets/images/qris.png";
import CASH from "../../assets/images/🦆 icon _wallet_.svg";
import Button from "../global/Button";

interface IDrawer {
  onHide: () => void;
  show: boolean;
}

const DrawerMethodPayment: React.FC<IDrawer> = ({ onHide, show = false }) => {
  const drawerRef = useRef(null);

  const handleClickOutside = (e: React.MouseEvent<HTMLElement>) => {
    if (
      drawerRef.current &&
      !(drawerRef.current as HTMLElement).contains(e.target as Node) &&
      show
    ) {
      onHide();
      setSelected("");
    }
  };

  const [selected, setSelected] = useState<string>("");

  return (
    <div
      onClick={handleClickOutside}
      className={
        show
          ? "fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.5)] flex items-center justify-center z-[999]"
          : "fixed top-0 left-0 right-0 bottom-0 opacity-0 hidden items-center justify-center"
      }
    >
      <div
        ref={drawerRef}
        onClick={(e) => e.stopPropagation()}
        className={
          show
            ? "fixed left-0 right-0 bottom-0 h-[50%] bg-white rounded-t-xl flex flex-col justify-center items-center gap-16 duration-300 px-10"
            : "fixed left-0 right-0 bottom-0 h-[50%] translate-y-[-100%] bg-white rounded-t-xl flex-col justify-center items-center gap-16 duration-300 px-10"
        }
      >
        <div className="flex items-center justify-center">
          <div
            onMouseOver={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor =
                "#9fd9ff";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "";
            }}
            onClick={() => setSelected("QRIS")}
            className={
              selected === "QRIS"
                ? "flex flex-col gap-5  justify-center items-center p-5 rounded-xl h-32 w-40 bg-[#9fd9ff]"
                : "flex flex-col gap-5  justify-center items-center p-5 rounded-xl h-32 w-40"
            }
          >
            <img src={QRIS} alt="qris" width={100} />
            <p className="text-black">QRIS</p>
          </div>
          <div
            onMouseOver={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor =
                "#9fd9ff";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "";
            }}
            onClick={() => setSelected("CASH")}
            className={
              selected === "CASH"
                ? "flex flex-col gap-5  justify-center items-center p-5 rounded-xl h-32 w-40 bg-[#9fd9ff]"
                : "flex flex-col gap-5  justify-center items-center p-5 rounded-xl h-32 w-40"
            }
          >
            <img src={CASH} alt="qris" width={70} />
            <p className="text-black">CASH</p>
          </div>
        </div>
        <Button primary={!!selected} disabled={!selected}>
          NEXT
        </Button>
      </div>
    </div>
  );
};

export default DrawerMethodPayment;