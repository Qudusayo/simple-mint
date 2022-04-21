import { Button, Typography, Modal } from "antd";
import React from "react";
import {
  useWeb3ExecuteFunction,
  useChain,
  useMoralis,
  useMoralisFile,
} from "react-moralis";

const { Title } = Typography;

export default function QuickStart() {
  const { chainId } = useChain();
  const { signup } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const { saveFile } = useMoralisFile();

  // 0x8b36d5F7e645B0E095Fa1BdA7A59eE61A48E8Ae1 -- mumbai
  // 0x4702f4ed4dae351d61cac557adb3b52e973c1439 -- rinkeby

  let params = {
    functionName: "makeAnEpicNft",
    abi: [
      {
        inputs: [],
        name: "makeAnEpicNft",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    params: {
      _note: 2,
    },
  };

  async function mintANFT() {
    console.log(chainId);

    if (chainId == 0x4) {
      params.contractAddress = "0x4702f4ed4dae351d61cac557adb3b52e973c1439";
    } else if (chainId == 0x13881) {
      params.contractAddress = "0x8b36d5F7e645B0E095Fa1BdA7A59eE61A48E8Ae1";
    } else {
      return Modal.error({
        title: "Invalid Network!",
        content: "Kindly Switch to Mumbai or Rinkeby",
      });
    }

    await contractProcessor.fetch({
      params,
      onSuccess: (tx) =>
        tx.wait().then(() => {
          let secsToGo = 3;
          const modal = Modal.success({
            title: "Success!",
            content: "New NFT successfully Minted",
          });
          setTimeout(() => {
            modal.destroy();
          }, secsToGo * 1000);
        }),
    });
  }

  function emitFile() {
    saveFile("Mage", "https://i.ibb.co/gynNmj3/image.png", {
      onSuccess: (res) => {
        console.log(res);
      },
    });
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", textAlign: "center" }}
    >
      <Title>MINT A NEW NFT</Title>
      <Button onClick={mintANFT}>Mint A New NFT</Button>
      <Button
        onClick={() => signup("qudusayo", "password", "qqudusayo@gmail.com")}
      >
        Sign Up a new user
      </Button>
      <Button onClick={emitFile}>Moralis File</Button>
    </div>
  );
}
