const axios = require("axios");
const fs = require("fs");
axios
  .get(
    "http://ddragon.leagueoflegends.com/cdn/13.12.1/data/en_US/champion.json"
  )
  .then((data) => {
    const names = Object.keys(data.data.data);
    const mapped = [];
    names.forEach((n) => {
      let id = data.data.data[n].key;
      mapped.push({
        id: id,
        name: n,
      });
    });

    fs.writeFileSync("compiled.json", JSON.stringify(mapped), "UTF-8");
  });
