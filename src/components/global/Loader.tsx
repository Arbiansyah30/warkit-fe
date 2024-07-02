import { useAtomValue } from "jotai";
import { ClipLoader } from "react-spinners";
import { loadingCircle } from "../../store/loadingBar";
const Loader = () => {
  const loading = useAtomValue(loadingCircle);
  return (
    <div
      className={`w-full h-full flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.6)] z-[999999999] ${
        loading ? "block" : "hidden"
      }`}
    >
      <ClipLoader
        loading={loading}
        cssOverride={{ borderColor: "white" }}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
