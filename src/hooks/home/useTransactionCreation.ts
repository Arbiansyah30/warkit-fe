import { ApiErrorResponse, ApiResponse } from "@core/libs/api/types";
import useDebounce from "@hooks/global/useDebounce";
import { PaymentModel, TransactionModel } from "@model/transaction";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams, useSearchParams } from "react-router-dom";
import { transactionService } from "../../services/transaction";

type PayloadType = "create" | "update";

interface Payload {
  type?: PayloadType;
  data: TransactionModel;
}

interface PaymentCreation {
  id: string;
  type?: PayloadType;
  data: PaymentModel;
}

interface PrintPaymentCreation {
  data: {
    id: string;
  };
}

interface Options {
  page?: number;
  perPage?: number;
  transactionId?: string;
  search?: string;
}

export function useTransaction(options?: Options) {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search')
  const search = useDebounce(searchQuery || '', 500)
  const page = options?.page || searchParams.get("page") || 1;
  const perPage = options?.perPage || searchParams.get("perPage") || 10;
  const status = options?.perPage?.toString().toUpperCase() || searchParams.get("status")?.toUpperCase() || undefined
  const query = useQuery({
    queryKey: ["transactions", { page, perPage, status, search }],
    queryFn: () =>
      transactionService.get({
        queryParams: {
          perPage: perPage ? Number(perPage) : undefined,
          page: page ? Number(page) : undefined,
          status: status as 'PAID' | 'UNPAID' | 'CANCEL',
          search
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
      localStorage.removeItem('cart')
      if (res.data?.redirect_url) {
        window.location.href = res.data?.redirect_url;
        return;
      }
      toast.success(res.message as string);
      window.location.reload();
    },
    onError: (err: ApiErrorResponse<ApiResponse>) =>
      toast.error(err.response?.data.message as string),
  });
  return mutation;
};

export function usePaymentUpdate() {
  const queryClient = useQueryClient();
  const { refetch } = useTransaction();

  const mutation = useMutation({
    mutationFn: async ({ data, type, id }: PaymentCreation) => {
      switch (type) {
        case "update":
          return transactionService.putPayment(data, { path: id });
        default:
          return transactionService.putPayment(data, { path: id });
      }
    },
    onSuccess: (res) => {
      toast.success(res.message as string);
      refetch();
      return queryClient.removeQueries({ queryKey: ["transactions"] });
    },

    onError: (err: ApiErrorResponse<ApiResponse>) => {
      toast.error(err.response?.data.message as string);
    },
  });
  return mutation;
}

export function useTransactionById() {
  const { id } = useParams();
  return useQuery({
    queryKey: ["TransactionById", id],
    queryFn: () => transactionService.getById({ path: id }),
    enabled: !!id,
  });
}

// mutation usePrinter payment with body id
export function usePrintPayment() {
  const mutation = useMutation({
    mutationFn: ({ data }: PrintPaymentCreation) => {
      return transactionService.printPayment(data);
    },
    onSuccess: (res) => {
      toast.success(res.message as string);
    },
    onError: (err: ApiErrorResponse<ApiResponse>) =>
      toast.error(err.response?.data.message as string),
  });
  return mutation;
}

export function useTransactionToday() {
  return useQuery({
    queryKey: ["TransactionToday"],
    queryFn: () => transactionService.today(),
  });
}
export function useTransactionWeek() {
  return useQuery({
    queryKey: ["TransactionWeek"],
    queryFn: () => transactionService.week(),
  });
}

export function useTransactionMonth(month: string) {
  return useQuery({
    queryKey: ["TransactionMonth", month],
    queryFn: () => transactionService.month({ path: month }),
  });
}

export function useCancelTransaction() {
  const { refetch } = useTransaction();
  const mutation = useMutation({
    mutationFn: (id: string) => transactionService.cancel({ transactionId: id }),
    onSuccess: (res) => {
      toast.success(res.message as string);
      refetch()
    },
    onError: (err: ApiErrorResponse<ApiResponse>) =>
      toast.error(err.response?.data.message as string),
  });
  return mutation;
}