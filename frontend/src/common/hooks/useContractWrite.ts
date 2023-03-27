import {
  useContract,
  useContractWrite as useContractWriteTW,
} from "@thirdweb-dev/react";
import { toast } from "react-hot-toast";

export default function useContractWrite(
  functionName:
    | "uploadVideo"
    | "updateVideo"
    | "createChannel"
    | "updateChannel"
    | "addSubscribe"
) {
  const { contract } = useContract(process.env.CONTRACT_ADDRESS);
  const { mutateAsync: mutateAsyncTW, isLoading } = useContractWriteTW(
    contract,
    functionName
  );

  const mutateAsync = async (values: any[], successMessage?: string) => {
    try {
      const data = await mutateAsyncTW(values);
      if (successMessage) toast.success(successMessage);
      return data;
    } catch (err) {
      console.log("contract call failure :- ", err);
    }
  };

  return { mutateAsync, isLoading };
}
