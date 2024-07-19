import { useCancelTransaction } from "@hooks/home/useTransactionCreation";
import { useState } from "react";

interface CanceledActionProps {
  id: string;
}

export const CanceledAction: React.FC<CanceledActionProps> = ({ id }) => {
  const [show, setShow] = useState<boolean>(false);
  const toggle = () => setShow((prev) => !prev);
  const mutation = useCancelTransaction();

  const handleCancel = async () => {
    await mutation.mutateAsync(id);
  };
  return (
    <>
      <button
        onClick={toggle}
        className="hover:opacity-70 text-sm text-white px-3 py-1 rounded-md bg-red-500 flex justify-center items-center"
      >
        Cancel
      </button>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Canceled Payment?</h2>
            <p className="text-sm font-medium mb-4">
              If you cancel the payment, you cannot repeat this
            </p>
            <div className="flex justify-end space-x-2">
              <button
                type="reset"
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 duration-300"
                onClick={toggle}
              >
                No
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
