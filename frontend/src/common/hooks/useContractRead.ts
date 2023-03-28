import {
  useContract,
  useContractRead as useContractReadTW,
} from "@thirdweb-dev/react";

export default function useContractRead(
  functionName:
    | "getAllVideos"
    | "getUserProfile"
    | "getVideo"
    | "getChannel"
    | "getManagerProfile"
    | "getAdVideosByAddress"
    | "getAllAdVideos",
  value?: any,
  contractName: "blocktube" | "blocktubeAds" = "blocktube"
) {
  const contractAddress =
    contractName === "blocktube"
      ? process.env.BLOCKTUBE_CONTRACT_ADDRESS
      : process.env.ADS_CONTRACT_ADDRESS;

  const { contract } = useContract(contractAddress);

  return value
    ? useContractReadTW(contract, functionName, value)
    : useContractReadTW(contract, functionName);
}
