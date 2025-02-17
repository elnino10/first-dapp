import { createWalletClient, custom, getContract } from "https://esm.sh/viem";
import { sepolia } from "https://esm.sh/viem/chains";

// create client that connects user's account to Ethereum sepolia
const walletClient = createWalletClient({
  chain: sepolia,
  transport: custom(window.ethereum),
});
//this will make your wallet extension show you a pop-up requesting you to connect your wallet
//accounts will be an array
const accounts = await walletClient.requestAddresses();
//get the first address in the accounts array
const [address] = accounts;
const moodContractAddress = "0x93d728dC50Cf2d11c9B1926dbE495dF71472e1CE";
const moodContractABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_mood",
        type: "string",
      },
    ],
    name: "setMood",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getMood",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const moodContractInstance = getContract({
  address: moodContractAddress,
  abi: moodContractABI,
  client: walletClient,
});

getMood = async function () {
  const mood = await moodContractInstance.read.getMood();
  document.getElementById("showMood").innerText = `Your mood is ${
    mood ? mood : "not set"
  }`;
};

setMood = async function () {
  const mood = document.getElementById("mood").value;
  moodContractInstance.write.setMood([mood], { account: address });
};
