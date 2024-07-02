import NoData from "../../assets/images/no_data.svg";

interface EmptyDataProps {
  title: string;
  action: boolean;
}

const EmptyData: React.FC<EmptyDataProps> = ({ title, action }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center py-5 gap-5">
      <img src={NoData} width={250} alt="no-data" />
      <div className="flex flex-col justify-center items-center text-sm font-[Poppins]">
        <p className="text-white">There {title || "item"} is empty.</p>
        {action && <p className="text-white"> Create {title || "item"} Now.</p>}
      </div>
    </div>
  );
};

export default EmptyData;
