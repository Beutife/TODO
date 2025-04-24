module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  // No constructor arguments needed now
  await deploy("ToDo", {
    from: deployer,
    log: true,
  });
};

module.exports.tags = ["ToDo"];
