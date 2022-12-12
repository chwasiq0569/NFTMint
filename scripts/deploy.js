async function main() {
  const MyToken = await ethers.getContractFactory("MyToken");

  // Start deployment, returning a promise that resolves to a contract object
  const myToken = await MyToken.deploy();
  console.log("Contract deployed to address:", myToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  // 0x66cc2BB0bfa700202f55D967c95612e5B66b3dD4