import { Body, Button, Header, P } from "./components";
import WalletButton from "./components/WalletButton";
import ContributeForm from "./components/ContributeForm";
// import useWeb3Modal from "./hooks/useWeb3Modal";
import { BigNumber, ethers } from "ethers";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { JsonRpcSigner } from "@ethersproject/providers";
import PyramidAbi from "@project/contracts/abis/Pyramid.json";
import addresses from "@project/contracts/addresses";
import ProgressBar from "./components/ProgressBar";

function App() {
  // const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signerRef: MutableRefObject<JsonRpcSigner | undefined> = useRef();

  const [progress, setProgress] = useState(0);
  const [pyramidTotal, setPyramidTotal] = useState(0);
  const [contributed, setContributed] = useState(0);
  const [layer, setLayer] = useState(0);
  const [total, setTotal] = useState(0);
  const [earned, setEarned] = useState(0);
  const [contributionLayer, setContributionLayer] = useState(0);

  // useEffect(() => {
  //   const loadContribution = async () => {
  //     const pyramid = new ethers.Contract(
  //       addresses.testPyramid,
  //       PyramidAbi,
  //       signerRef.current
  //     );
  //     console.log("Interface: ", pyramid.interface);
  //     const address = await signerRef.current?.getAddress();
  //     console.log("Address", address);
  //     if (address) {
  //       const contr = await pyramid.contribution_list(address);
  //       setContributed(contr);
  //     }
  //   };
  //   loadContribution();
  // }, [provider, signerRef.current]);

  useEffect(() => {
    // Load data about pyramid.
  });

  return (
    <div>
      <Header>
        <WalletButton provider={provider} signerRef={signerRef}></WalletButton>
      </Header>
      <Body>
        <ContributeForm
          provider={provider}
          signerRef={signerRef}
        ></ContributeForm>
        {contributed == 0 ? (
          <>
            <p>
              Contribute wei and be payed back double when the next layer fills
              up.
            </p>
            <p>Current Layer:</p>
            <ProgressBar
              width={50}
              widthUnit="%"
              maxValue={Math.pow(2, layer)}
              currentValue={total - Math.pow(2, layer - 1)}
            ></ProgressBar>
          </>
        ) : contributionLayer == layer ? (
          <>
            <p style={{ width: "75%", textAlign: "center" }}>
              You have contributed {contributed} wei and will be payed back{" "}
              {contributed * 2} once this layer fills up.
            </p>
            <ProgressBar
              width={50}
              widthUnit="%"
              maxValue={Math.pow(2, layer)}
              currentValue={Math.pow(2, layer) - progress}
            ></ProgressBar>
          </>
        ) : (
          <>
            <p>
              You contributed {contributed} wei in layer {contributionLayer} and
              have been payed back {contributed * 2} wei!
            </p>
            <ProgressBar
              width={50}
              widthUnit="%"
              maxValue={Math.pow(2, layer)}
              currentValue={total - Math.pow(2, layer - 1)}
            ></ProgressBar>
          </>
        )}
        <p>
          <br></br> <u>Pyramid Stats</u>
          <br></br> Current Layer: {layer}
          <br></br> Current Pyramid Balance: {pyramidTotal} wei
          <br></br> Total Contributed: {total} wei
          <br></br> Rewards Earned: {earned} wei
        </p>
        <Button
          onClick={async () => {
            const pyramid = new ethers.Contract(
              addresses.testPyramid,
              PyramidAbi,
              signerRef.current
            );
            const address = await signerRef.current?.getAddress();
            const [
              balanceTx,
              progressTx,
              layerTx,
              contributionTx,
              totalTx,
              earnedTx,
            ]: [
              BigNumber,
              BigNumber,
              number,
              any,
              BigNumber,
              BigNumber
            ] = await Promise.all([
              pyramid.getBalance(),
              pyramid.viewProgress(),
              pyramid.current_layer(),
              pyramid.contribution_list(address),
              pyramid.total(),
              pyramid.earned(),
            ]);

            setPyramidTotal(balanceTx.toNumber());
            setProgress(progressTx.toNumber());
            setLayer(layerTx);
            setContributed(contributionTx.amount.toNumber());
            setContributionLayer(contributionTx.layer);
            setTotal(totalTx.toNumber());
            setEarned(earnedTx.toNumber());

            console.log(contributionLayer, layer, contributionLayer < layer);
          }}
        >
          🔄 Reload Pyramid State
        </Button>

        <P style={{ bottom: "0px", right: "20px", position: "absolute" }}>
          Using Pyramid at address: {addresses.testPyramid}
        </P>
      </Body>
    </div>
  );
}

export default App;
