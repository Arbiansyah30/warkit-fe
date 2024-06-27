import { usePaymentUpdate } from "@hooks/home/useTransactionCreation";
import React, { useEffect, useState } from "react";
import Input from "../../global/Input";
import { PaymentModel } from "@model/transaction";
import { useAtom } from "jotai";
import { loadingBarAtom } from "../../../store/loadingBar";

const PaymentCash: React.FC<{ orderId: string }> = ({ orderId }) => {
  const mutation = usePaymentUpdate();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [totalPaid, setTotalPaid] = useState("");
  const [errors, setErrors] = useState<
    Partial<Record<keyof PaymentModel, string>>
  >({});

  // global
  const [, setLoadingBar] = useAtom(loadingBarAtom);

  // loading bar
  useEffect(() => {
    setLoadingBar(mutation.isPending);
  }, [mutation.isPending]);

  const validate = () => {
    const newErrors: Partial<Record<keyof PaymentModel, string>> = {};

    let isValid = true;

    if (!totalPaid) {
      newErrors.totalPaid = "Payment is required";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleOpenAlert = () => {
    setIsAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
    setTotalPaid("");
  };

  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    await mutation.mutateAsync({
      id: orderId,
      data: {
        totalPaid: Number(totalPaid),
      },
    });
    handleCloseAlert();
  };

  return (
    <>
      <button
        className="hover:opacity-70 text-sm text-white px-3 py-1 rounded-md bg-blue-500 flex justify-center items-center"
        onClick={handleOpenAlert}
      >
        Confirm
      </button>

      {isAlertOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Enter Payment Value</h2>
            <form onSubmit={handlePayment}>
              <Input
                disabled={mutation.isPending}
                name="payment"
                type="number"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                value={totalPaid}
                onChange={(e) => setTotalPaid(e.target.value)}
                error={errors.totalPaid}
                placeholder="Enter payment amount"
              />
              <div className="flex justify-end space-x-2">
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                  Pay
                </button>
                <button
                  type="reset"
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={handleCloseAlert}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentCash;
