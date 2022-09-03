import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import React, { FC, MutableRefObject, useState } from "react";
import { Button, Input } from "../components";
import PyramidAbi from "@project/contracts/abis/Pyramid.json";
import addresses from "@project/contracts/addresses";

interface ContributeFormProps {
  provider: Web3Provider;
  signerRef: MutableRefObject<JsonRpcSigner | undefined>;
}

const ContributeForm: FC<ContributeFormProps> = ({
  provider,
  signerRef,
}: ContributeFormProps) => {
  const [amount, setAmount] = useState(0);

  const contribute = () => {
    const pyramid = new ethers.Contract(
      addresses.testPyramid,
      PyramidAbi,
      signerRef.current
    );
    console.log(
      `Contributing ${amount} wei to Pyramid at address ${addresses.testPyramid}.`
    );
    pyramid.contribute(amount, { value: amount }).then((transaction: any) => {
      console.log("tx: ", transaction);
    });
  };

  return (
    <div>
      <Input
        placeholder="0 wei"
        onChange={(ev) => setAmount(parseInt(ev.target.value))}
      ></Input>
      <Button onClick={contribute}>Contribute</Button>
    </div>
  );
};

export default ContributeForm;
