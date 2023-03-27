const hre = require("hardhat");
async function main() {

  const NFTIsERC721A = await hre.ethers.getContractFactory("NFTIsERC721A");
  const nFTIsERC721A = await NFTIsERC721A.deploy();

  await nFTIsERC721A.deployed();

  console.log(
    `NFT ERC721A deployed with address ${nFTIsERC721A.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
