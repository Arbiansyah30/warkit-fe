import { ApiErrorResponse, ApiResponse } from "@core/libs/api/types";
import { TransactionModel } from "@model/transaction";
import { useMutation, useQuery } from "@tanstack/react-query";
import { transactionService } from "../../services/transaction";
import { useParams, useSearchParams } from "react-router-dom";

type PayloadType = "create" | "update";

interface Payload {
  type: PayloadType;
  data: TransactionModel;
}

interface Options {
  page?: number;
  perPage?: number;
  transactionId?: string;
  search?: string;
}

export function useTransaction(options?: Options) {
  const [searchParams] = useSearchParams();
  const page = options?.page || searchParams.get("page") || 1;
  const perPage = options?.perPage || searchParams.get("perPage") || 10;
  const query = useQuery({
    queryKey: ["transactions", { page, perPage }],
    queryFn: () =>
      transactionService.get({
        queryParams: {
          perPage: perPage ? Number(perPage) : undefined,
          page: page ? Number(page) : undefined,
        },
      }),
  });
  return query;
}

export const useTransactionCreation = () => {
  const mutation = useMutation({
    mutationFn: ({ data, type }: Payload) => {
      if (type === "create") {
        return transactionService.post(data);
      }
      return transactionService.post(data);
    },
    onSuccess: (res) => {
      if (res.data?.redirect_url) {
        window.location.href = res.data?.redirect_url;
        return;
      }
      alert(res.message);
      window.location.reload();
    },
    onError: (err: ApiErrorResponse<ApiResponse>) =>
      alert(err.response?.data.message),
  });
  return mutation;
};

export function useTransactionById() {
    const { id } = useParams()
    return useQuery({
      queryKey: ["TransactionById", id],
      queryFn: () => transactionService.getById({ path: id }),
      enabled: !!id,
    });
  }