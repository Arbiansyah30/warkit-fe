import { usePaymentUpdate } from "@hooks/home/useTransactionCreation";
import { PaymentModel } from "@model/transaction";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { loadingBarAtom } from "../../../store/loadingBar";
import Input from "../../global/Input";

const PaymentCash: React.FC<{ orderId: string }> = ({ orderId }) => {
  const mutation = usePaymentUpdate();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [totalPaid, setTotalPaid] = useState<number | undefined>();
  const [errors, setErrors] = useState<
    Partial<Record<keyof PaymentModel, string>>
  >({});
  const [formatedValue, setFormatedValue] = useState<string>("");

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
    setTotalPaid(undefined);
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
              <div className="flex items-center mb-4 gap-3">
                <p className="text-lg">Rp.</p>

                <div className="w-full">
                  <Input
                    type="text"
                    placeholder="Enter Payment Amount"
                    name="payment"
                    error={errors.totalPaid}
                    value={formatedValue || 0}
                    onChange={(e) => {
                      const numericValue = Number(
                        e.target.value.replace(/\D/g, "")
                      ); // Menghapus semua karakter non-digit
                      const formatted = new Intl.NumberFormat("id-ID").format(
                        numericValue
                      );
                      setFormatedValue(formatted);
                      setTotalPaid(numericValue);
                    }}
                  ></Input>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  disabled={mutation.isPending}
                  className={`px-4 py-2 ${
                    mutation.isPending ? "bg-gray-500" : "bg-green-500"
                  } text-white rounded ${
                    mutation.isPending
                      ? "hover:bg-gray-600"
                      : "hover:bg-green-600"
                  }`}
                >
                  {mutation.isPending ? "Loading..." : "Pay"}
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
