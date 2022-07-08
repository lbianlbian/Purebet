var globalKey;
var globalProvider;
var solanaWeb3 = require("@solana/web3.js");
var programID = new solanaWeb3.PublicKey(
  "FxQDLqSJ2Y3Hn4vUZHVVMhzaUnvhbbhG1yiFad2uHfFy"
);

var connection = new solanaWeb3.Connection(
  "https://devnet.genesysgo.net/",
  "confirmed"
);

const phantom_connect = function () {
  var provider = () => {
    if ("solana" in window) {
      var provider = window.solana;
      globalProvider = provider;
      if (provider.isPhantom) {
        return provider;
      } else {
        return false;
      }
    }
    window.open("https://phantom.app", "_blank");
  };
  var phantom = provider();
  if (phantom !== false) {
    try {
      var connect_wallet = phantom.connect();
      phantom.on("connect", async () => {
        globalKey = phantom.publicKey;

        var sig = await placeBet();
        sig != 0
          ? (document.querySelector("#trans-hash").innerText =
              "See your confirmation on the Solana Blockchain")
          : (document.querySelector("#trans-hash").innerText = "");
        document
          .getElementById("trans-hash")
          .setAttribute(
            "href",
            "https://explorer.solana.com/tx/" + sig + "?cluster=devnet"
          );
      });
    } catch (err) {
      console.log("Connection Cancelled!");
    }
  }
};
export default phantom_connect;

async function startBet(id1, id2, ha, odds, amnt) {
  amnt *= 1000000000;

  var rentExemptVal = await connection.getMinimumBalanceForRentExemption(72);
  if (amnt < rentExemptVal) {
    return "You are below the minimum bet size.";
  }

  var seed = "a" + Math.random() * 1000000000000;
  console.log(seed);
  var newAcc = await solanaWeb3.PublicKey.createWithSeed(
    globalKey,
    seed,
    programID
  );
  var newAccData = await connection.getAccountInfo(newAcc);
  var counter = 0;
  while (newAccData != null) {
    newAcc = await solanaWeb3.PublicKey.createWithSeed(
      globalKey,
      seed + counter,
      programID
    );
    newAccData = await connection.getAccountInfo(newAcc);
    counter += 1;
  }

  var transaction = new solanaWeb3.Transaction().add(
    solanaWeb3.SystemProgram.createAccountWithSeed({
      fromPubkey: globalKey,
      basePubkey: globalKey,
      seed: seed,
      newAccountPubkey: newAcc,
      lamports: amnt,
      space: 72,
      programId: programID,
    })
  );

  var idArr = new Uint8Array([id1, id2]);
  var keyArr = globalKey.toBytes();

  var oddsOne = Math.floor(odds);
  var oddsTenth = Math.floor((odds - oddsOne) * 10);
  var oddsHundredths = Math.round(100 * (odds - oddsOne - oddsTenth / 10));
  var oddsArr = new Uint8Array([oddsOne, oddsTenth, oddsHundredths, ha]);

  var theData = new Uint8Array([...idArr, ...keyArr, ...oddsArr]);

  const instruction = new solanaWeb3.TransactionInstruction({
    keys: [{ pubkey: newAcc, isSigner: false, isWritable: true }],
    programId: programID,
    data: theData,
  });

  transaction.add(instruction);
  return transaction;
}

async function matchBet(startedBetAccString, amount) {
  amount = amount * 1000000000;
  var startedBetAcc = new solanaWeb3.PublicKey(startedBetAccString);
  var seed = "a" + Math.random() * 1000000000000;
  var newAcc = await solanaWeb3.PublicKey.createWithSeed(
    globalKey,
    seed,
    programID
  );
  var newAccData = await connection.getAccountInfo(newAcc);
  var counter = 0;
  while (newAccData != null) {
    newAcc = await solanaWeb3.PublicKey.createWithSeed(
      globalKey,
      seed + counter,
      programID
    );
    newAccData = await connection.getAccountInfo(newAcc);
    counter += 1;
  }
  var transaction = new solanaWeb3.Transaction().add(
    solanaWeb3.SystemProgram.createAccountWithSeed({
      fromPubkey: globalKey,
      basePubkey: globalKey,
      seed: seed,
      newAccountPubkey: newAcc,
      lamports: amount,
      space: 1,
      programId: programID,
    })
  );
  const instruction = new solanaWeb3.TransactionInstruction({
    keys: [
      { pubkey: startedBetAcc, isSigner: false, isWritable: true },
      { pubkey: newAcc, isSigner: false, isWritable: true },
    ],
    programId: programID,
    data: globalKey.toBytes(),
  });

  transaction.add(instruction);
  return transaction;
}

async function partialMatch(id1, id2, odds, ha, originalBetAcc, risk) {
  risk *= 1000000000;

  var rentExemptVal = await connection.getMinimumBalanceForRentExemption(72);
  if (risk < rentExemptVal) {
    return "You are below the minimum bet size.";
  }

  var seed = "a" + Math.random() * 1000000000000;
  var newAcc = await solanaWeb3.PublicKey.createWithSeed(
    globalKey,
    seed,
    programID
  );
  var newAccData = await connection.getAccountInfo(newAcc);
  var counter = 0;
  while (newAccData != null) {
    newAcc = await solanaWeb3.PublicKey.createWithSeed(
      globalKey,
      seed + counter,
      programID
    );
    newAccData = await connection.getAccountInfo(newAcc);
    counter += 1;
  }

  var transaction = new solanaWeb3.Transaction().add(
    solanaWeb3.SystemProgram.createAccountWithSeed({
      fromPubkey: globalKey,
      basePubkey: globalKey,
      seed: seed,
      newAccountPubkey: newAcc,
      lamports: risk,
      space: 72,
      programId: programID,
    })
  );

  //start bet with necessary game id, home or away, globalKey, and odds
  var idArr = new Uint8Array([id1, id2]);
  //could do globalKey.toBuffer()
  var keyArr = globalKey.toBytes();

  var oddsOne = Math.floor(odds);
  var oddsTenth = Math.floor((odds - oddsOne) * 10);
  var oddsHundredths = Math.round(100 * (odds - oddsOne - oddsTenth / 10));
  var oddsArr = new Uint8Array([oddsOne, oddsTenth, oddsHundredths, ha]);

  var theData = new Uint8Array([...idArr, ...keyArr, ...oddsArr]);

  const instruction = new solanaWeb3.TransactionInstruction({
    keys: [{ pubkey: newAcc, isSigner: false, isWritable: true }],
    programId: programID,
    data: theData,
  });

  transaction.add(instruction);

  //send transaction with originalBetAcc, new acc, and instruction of 4
  var originalBetAccPubKey = new solanaWeb3.PublicKey(originalBetAcc);

  const instruction2 = new solanaWeb3.TransactionInstruction({
    keys: [
      { pubkey: originalBetAccPubKey, isSigner: false, isWritable: true },
      { pubkey: newAcc, isSigner: false, isWritable: true },
    ],
    programId: programID,
    data: new Uint8Array([4]),
  });

  transaction.add(instruction2);
  return transaction;
}

async function placeBet() {
  var url = new URL(window.location.href);

  var signal = "match";
  var id1 = parseInt(document.getElementById("id1").innerHTML);
  var id2 = parseInt(document.getElementById("id2").innerHTML);
  console.log(id1);
  console.log(id2);
  var ha = parseInt(document.getElementById("ha").innerHTML);
  var odds = parseFloat(document.getElementById("odds").value);
  var stake = parseFloat(document.getElementById("stake").value);
  var acc = document.getElementById("acc").innerHTML;
  var originalOdds = parseFloat(
    document.getElementById("originalOdds").innerHTML
  );
  var originalStake = parseFloat(
    document.getElementById("originalStake").innerHTML
  );

  if (odds != originalOdds) {
    signal = "start";
  } else if (stake < originalStake) {
    signal = "partial match";
  } else if (stake > originalStake) {
    signal = "overmatch";
  }

  var transaction;
  if (signal == "start") {
    transaction = await startBet(id1, id2, ha, odds, stake);
  } else if (signal == "match") {
    transaction = await matchBet(acc, stake);
  } else if (signal == "partial match") {
    transaction = await partialMatch(id1, id2, odds, ha, acc, stake);
  } else if (signal == "overmatch") {
    var startAmount = stake - originalStake;
    transaction = await matchBet(acc, originalStake);
    transaction.add(await startBet(id1, id2, ha, odds, startAmount));
  }

  if (transaction == "You are below the minimum bet size.") {
    console.log(transaction);
    return;
  }

  transaction.feePayer = globalKey;
  var blockhashObj = await connection.getRecentBlockhash();
  transaction.recentBlockhash = await blockhashObj.blockhash;
  var signed = await globalProvider.signTransaction(transaction);
  var signature = await connection.sendRawTransaction(signed.serialize());
  await connection.confirmTransaction(signature);
  console.log(signature); //need some way of showing this on screen
  return signature;
}
