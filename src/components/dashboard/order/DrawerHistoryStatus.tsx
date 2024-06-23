import { useHistory } from "@hooks/admin/useHistory";
import { IoChevronBackOutline } from "react-icons/io5";
import { formatDate } from "../../../libs/helper/FormatTime";

interface IDrawerHistory {
  show: boolean;
  onHide: () => void;
}

const DrawerHistoryStatus: React.FC<IDrawerHistory> = ({ onHide, show }) => {
  const { data: history } = useHistory();
  return (
    <div
      className={`fixed right-0 top-0 bottom-0 w-96 pt-24 bg-gray-800 duration-300 flex flex-col gap-4 shadow-lg shadow-white px-5 ${
        show ? "translate-x-0" : "translate-x-[500px]"
      }`}
    >
      <div className="flex items-center gap-2 cursor-pointer" onClick={onHide}>
        <IoChevronBackOutline className="text-xl text-white" />
        <p className="text-sm text-white">Back</p>
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="text-xl text-white font-semibold">History Status</h1>
        <div className="flex flex-col gap-4">
          {history?.data?.map((item, index) => (
            <div className="flex justify-between items-center">
              <p
                className={`px-4 py-1 rounded text-sm text-white ${
                  item?.status === "PAID" ? "bg-green-500" : "bg-gray-500"
                }`}
              >
                {item.status}
              </p>
              <p key={index} className="text-white">
                {formatDate(item.createdAt)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrawerHistoryStatus;
