// npm install --save request request-promise cheerio puppeteer

const rp = require("request-promise");
const url = "https://www.oddsshark.com/ufc/odds";
const cheerio = require("cheerio");
const BetOddsTable = require("./server/db/BetOddsTable");

// fighters array top row

let fighters = [];

rp(url)
  .then(function(html) {
    const $ = cheerio.load(html);

    // parent class of fighter name
    $("div.op-matchup-team.op-matchup-text.op-team-top").each(
      (index, currentDiv) => {
        const fighter = {
          name: JSON.parse(currentDiv.attribs["data-op-name"]).full_name,

          OPENING: JSON.parse(
            $("div.op-item.op-spread.border-bottom.op-opening")[index].attribs[
              "data-op-moneyline"
            ]
          ).fullgame,

          // BOVADA --> can't scrape

          BETONLINE: JSON.parse(
            $("div.op-item.op-spread.border-bottom.op-betonline")[index]
              .attribs["data-op-moneyline"]
          ).fullgame,

          INTERTOPS: JSON.parse(
            $("div.op-item.op-spread.border-bottom.op-intertops")[index]
              .attribs["data-op-moneyline"]
          ).fullgame,

          SPORTSBETTING: JSON.parse(
            $("div.op-item.op-spread.border-bottom.op-sportsbetting")[index]
              .attribs["data-op-moneyline"]
          ).fullgame,

          GTBETS: JSON.parse(
            $("div.op-item.op-spread.border-bottom.op-gtbets")[index].attribs[
              "data-op-moneyline"
            ]
          ).fullgame,

          "5DIMES": JSON.parse(
            $("div.op-item.op-spread.border-bottom.op-5dimes")[index].attribs[
              "data-op-moneyline"
            ]
          ).fullgame,

          SPORTBET: JSON.parse(
            $("div.op-item.op-spread.border-bottom.op-sportbet")[index].attribs[
              "data-op-moneyline"
            ]
          ).fullgame
        };
        fighters.push(fighter);
      }
    );
    console.log("fighters array A-side run 1:", fighters);
  })
  .then(async function() {
    try {
      await Promise.all(
        fighters.map(fighter => {
          // returning promise instance of table where you are creating row
          return BetOddsTable.create(fighter);
        })
      );
      console.log("done seeding");
    } catch (err) {
      console.log(err);
    }
  })
  .catch(function(error) {
    // handle error
    console.log(error);
  });

// const seedFighters = async () => {
//   try {
//     await Promise.all(
//       fighters.map(fighter => {
//         // returning promise instance of table where you are creating row
//         return BetOddsTable.create(fighter);
//       })
//     );
//     console.log("done seeding");
//   } catch (err) {
//     console.log(err);
//   }
// };

// seedFighters();
