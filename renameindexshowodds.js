const solanaWeb3 = require('@solana/web3.js');
const Base58 = require("base-58");

var connection = new solanaWeb3.Connection("https://devnet.genesysgo.net/", "confirmed");
var programID = new solanaWeb3.PublicKey("FxQDLqSJ2Y3Hn4vUZHVVMhzaUnvhbbhG1yiFad2uHfFy");

//to round to n decimal places
function round(num, places) {
    var multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
}
//parameters: id1 and id2 of game, 
//homeOrAway is 0 if we are looking to bet on home
//homeOrAway is 1 if we are looking to bet on away

//returns: [[highest odds, stake needed, account], [second highest odds, stake needed, account], [third highest odds, stake needed, account]]
//if there are less than 3 bets available to match, the values will be -1
//https://docs.google.com/document/d/1LNGuQyWjken4jl_mOSTlQy8qI7l1EabmN3BsYgiG3CQ/edit?usp=sharing
async function getOdds(id1, id2, homeOrAway){
  var b58id = Base58.encode(new Uint8Array([id1, id2]));
  var all0s = Base58.encode(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
  var ha = -1;
  if(homeOrAway == 0){
    ha = 2;
  }
  else if(homeOrAway == 1){
    ha = 37;
  }
  var accs = await connection.getProgramAccounts
    (programID, 
      {filters:
       [
        {memcmp: {offset:0, bytes: b58id} }, 
        {memcmp: {offset:ha, bytes: all0s} }
       ]
      }
    );

  var toMatchOdds;
  var toMatchStake;
  var highest = [0, 0, 0];
  var secondHighest = [0, 0, 0];
  var thirdHighest = [0, 0, 0];
  
  for(var x = 0; x < accs.length; x++){
    var oddsNum; 
    var stake = accs[x].account.lamports / 1000000000;
    if(homeOrAway == 0){
      oddsNum = accs[x].account.data[69] + accs[x].account.data[70] / 10 + accs[x].account.data[71] / 100;
    }
    else if(homeOrAway == 1){
      oddsNum = accs[x].account.data[34] + accs[x].account.data[35] / 10 + accs[x].account.data[36] / 100;
    }

    if(oddsNum == 1 || oddsNum == 0){
      continue;
    }
    
    toMatchOdds = 1 / (1 - 1 / oddsNum);
    toMatchOdds = round(toMatchOdds, 2);
    toMatchStake = stake * oddsNum - stake;
    toMatchStake = round(toMatchStake, 9);

    if(toMatchOdds > highest[0]){
      thirdHighest[0] = secondHighest[0];
      thirdHighest[1] = secondHighest[1];
      thirdHighest[2] = secondHighest[2];
      
      secondHighest[0] = highest[0];
      secondHighest[1] = highest[1];
      secondHighest[2] = highest[2];
      
      highest[0] = toMatchOdds;
      highest[1] = toMatchStake;
      highest[2] = accs[x].pubkey.toString();
    }
    else if(toMatchOdds > secondHighest[0]){
      thirdHighest[0] = secondHighest[0];
      thirdHighest[1] = secondHighest[1];
      thirdHighest[2] = secondHighest[2];
      
      secondHighest[0] = toMatchOdds;
      secondHighest[1] = toMatchStake;
      secondHighest[2] = accs[x].pubkey.toString();
    }
    else if(toMatchOdds > thirdHighest[0]){
      thirdHighest[0] = toMatchOdds;
      thirdHighest[1] = toMatchStake;
      thirdHighest[2] = accs[x].pubkey.toString();
    }

  }
  //first get list current odds, address of acc, and #lamports of acc
  //console.log([highest, secondHighest, thirdHighest]);
  return [highest, secondHighest, thirdHighest];
}
/*
async function testing(){
  console.log(await getOdds(0, 1, 0));
  console.log(await getOdds(0, 1, 1));
}

testing();
*/

function formatArray(first, second, third){
  var firstArrString = "[{\"odds\": " + first[0] + ", \"stake\": " + first[1] + ", \"acc\": \"" + first[2] + "\"},";
  var secondArrString = "{\"odds\": " + second[0] + ", \"stake\": " + second[1] + ", \"acc\": \"" + second[2] + "\"},";
  var thirdArrString = "{\"odds\": " + third[0] + ", \"stake\": " + third[1] + ", \"acc\": \"" + third[2] + "\"}]";
  return firstArrString + secondArrString + thirdArrString;
  
}

//avoid cors error: https://stackoverflow.com/questions/44405448/how-to-allow-cors-with-node-js-without-using-express

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
    var id1 = Number(q.id1);
    var id2 = Number(q.id2);
    var ha = Number(q.ha);
    
    if(isNaN(id1) || isNaN(id2) || isNaN(ha) ){
      res.write("Message from Wesley. Invalid input. ");
    }
    else{
      var odds = await getOdds(id1, id2, ha);
      res.write(formatArray(odds[0], odds[1], odds[2]) );
    }
    
    res.end();
    return;
  }

  res.writeHead(405, headers);
  res.end(`${req.method} is not allowed for the request.`);
}).listen(port);
