const stakeAddress = "0xD80b3E1992f8D619E13B82F9a71d706ced9d0874";
const ybcAddress = "0x0FDeDdA0b61Eb0Bce9B8000FD18331E8bf508338";

// Very important, the ABI is only the ARRAY from the json file from the artifacts in the back end. Got caught up with that for longer than I care to admit lol
const stakingAbi = require("./stakingAbi.json");
const ybcAbi = require("./ybcAbi.json");

module.exports = {
    stakingAbi,
    ybcAbi,
    stakeAddress,
    ybcAddress,
}