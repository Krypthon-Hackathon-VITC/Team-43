import {
  useContract,
  useContractRead as useContractReadTW,
} from "@thirdweb-dev/react";

export default function useContractRead(
  functionName: "getAllVideos" | "getUserProfile" | "getVideo" | "getChannel",
  value?: any
) {
  const { contract } = useContract(process.env.CONTRACT_ADDRESS);

  return value
    ? useContractReadTW(contract, functionName, value)
    : useContractReadTW(contract, functionName);
}
