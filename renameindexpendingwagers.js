var solanaWeb3 = require("@solana/web3.js");
var connection = new solanaWeb3.Connection("https://devnet.genesysgo.net/", "confirmed");
var programID = new solanaWeb3.PublicKey("FxQDLqSJ2Y3Hn4vUZHVVMhzaUnvhbbhG1yiFad2uHfFy");

function arrayEquals(arr1, arr2){
  if(arr1.length != arr2.length){
    return false;
  }
  for(var x = 0; x < arr1.length; x++){
    if(arr1[x] != arr2[x]){
      return false;
    }
  }
  return true;
}

function round(num, places) {
    var multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
}

async function pendingWagers(globalKeyString){
  var globalKey = new solanaWeb3.PublicKey(globalKeyString);
  var all0s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];  
  if(globalKey == null){
    return "Wallet not connected";
  }

  var output = [];
  
  var backBets = await connection.getProgramAccounts
    (programID, 
      {filters:
       [ 
        {memcmp: {offset: 2, bytes: globalKey.toBase58() } }
       ]
      }
    );

  var layBets = await connection.getProgramAccounts
    (programID, 
      {filters:
       [ 
        {memcmp: {offset: 37, bytes: globalKey.toBase58()} }
       ]
      }
    );
  
  for(var x = 0; x < backBets.length; x++){
    var currBet = {};
    currBet.id1 = backBets[x].account.data[0];
    currBet.id2 = backBets[x].account.data[1];
    currBet.ha = "home";
    var amnt = backBets[x].account.lamports / 1000000000;
    var odds = backBets[x].account.data[34] + backBets[x].account.data[35] / 10 + backBets[x].account.data[36];   
    if(odds == 0){
      odds = backBets[x].account.data[69] + backBets[x].account.data[70] / 10 + backBets[x].account.data[71];
      odds = 1 / (1 - 1 / odds);
    }
    if(arrayEquals(backBets[x].account.data.slice(37, 69), all0s)){
      
      currBet.stake = round(amnt, 9);
      currBet.odds = round(odds, 2);
      currBet.isMatched = false;
      
    }
    else{
      currBet.stake = round(amnt / odds, 9);
      currBet.odds = round(odds, 2);
      currBet.isMatched = true;
      //console.log(backBets[x].pubkey.toBase58());
    }
    currBet.pubkey = backBets[x].pubkey.toBase58();
    output.push(currBet);
  }

  for(var x = 0; x < layBets.length; x++){
    var currBet = {};
    
    currBet.id1 = layBets[x].account.data[0];
    currBet.id2 = layBets[x].account.data[1];
    currBet.ha = "away";
    
    var amnt = layBets[x].account.lamports / 1000000000;
    var odds = layBets[x].account.data[69] + layBets[x].account.data[70] / 10 + layBets[x].account.data[71];
    if(odds == 0){
      odds = backBets[x].account.data[34] + backBets[x].account.data[35] / 10 + backBets[x].account.data[36];
      odds = 1 / (1 - 1 / odds);
    }
    if(arrayEquals(layBets[x].account.data.slice(2, 34), all0s)){
      
      currBet.stake = round(amnt, 9);
      currBet.odds = round(odds, 2);
      currBet.isMatched = false;
     
    }
    else{
      currBet.stake = round(amnt / odds, 9);
      currBet.odds = round(odds, 2);
      currBet.isMatched = true;
      //console.log(layBets[x].pubkey.toBase58());
    }
    currBet.pubkey = layBets[x].pubkey.toBase58();
    output.push(currBet);
  }

  return output;
}

const http = require('http');
var url = require("url");
const port = 8080;

http.createServer(async (req, res) => {
  //res.set('Access-Control-Allow-Origin', '*');
  const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
  "Access-Control-Max-Age": 2592000, // 30 days
  /** add other headers too */
};

  if (['GET', 'POST'].indexOf(req.method) > -1) {
    res.writeHead(200, headers);
    var q = url.parse(req.url, true).query;
    var key = q.key;
    
    if(key == null){
      res.write("no key provided");
      return;
    }
    else{
      var stringOutput = await pendingWagers(key);
      res.write(JSON.stringify(stringOutput));
    }
    
    res.end();
    return;
  }

  res.writeHead(405, headers);
  res.end(`${req.method} is not allowed for the request.`);
}).listen(port);
