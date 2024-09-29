/**
 * Wraps up all of the configurations for the AMM
 */


import { PublicKey } from "@solana/web3.js";

export const wSOL_ADDRESS = new PublicKey("So11111111111111111111111111111111111111112");
export const PROGRAM_ADDRESS = new PublicKey('5wsTqYnPwsj3QsYrVK9cGtresyfREZXqEGAxGFSb35LK');
export const MERKLE_DISTRIBUTOR_PROGRAM_ADDRESS = new PublicKey('FGWk7eUKeGZEmvmeifggHcyyyksLnQSAkKhvK14HUj3n');
export const VESTING_PROGRAM_ADDRESS = new PublicKey('BZAEvqxscdTKjEdXG9mdsbMkcbseVx6syTMp7LycVaDs');
export const LOCK_PROGRAM_ADDRESS = new PublicKey("8izNed2ZfWjdPVr7gjJ1t7mZ8wtzNWc9z5ojawbRMMSH");

// export const AMM_ADDRESS = new PublicKey("DeptjyS8K9J1xosh1pr1tEVD4sQdScAYkY7QVFM4ZhPW");
// export const AMM_ID = new PublicKey("3k2vhci3hNnFMQ5enwPVwiwQcPLfjLayDjfuAxWDJJzu");
// export const LOCK_CONFIG_BUMP = new PublicKey("DtSFfwNLtFgrwmjTbKB4Gx7fv5ZH7CWAQJ7N4T4BM3W6");
// export const FEE_VAULT = new PublicKey("7qTMKj3DHkCH9CEmizse3NrsLYMkrGjD3X8MwxQEwctY");

// export const TESTNET_AMM_ADDRESS = new PublicKey("DeptjyS8K9J1xosh1pr1tEVD4sQdScAYkY7QVFM4ZhPW");
// export const TESTNET_AMM_ID = new PublicKey("3k2vhci3hNnFMQ5enwPVwiwQcPLfjLayDjfuAxWDJJzu");
// export const TESTNET_LOCK_CONFIG_BUMP = new PublicKey("DtSFfwNLtFgrwmjTbKB4Gx7fv5ZH7CWAQJ7N4T4BM3W6");
// export const TESTNET_FEE_VAULT = new PublicKey("7qTMKj3DHkCH9CEmizse3NrsLYMkrGjD3X8MwxQEwctY");

// export const TESTNET_AMM_ADDRESS = new PublicKey("HKvbWxLyNGTJBDUpMoLXhYdfQYXcGXbtAbNTLmHRysaU");
// export const TESTNET_AMM_ID = new PublicKey("5tHgS2owEkmiNoHJEYt1oasX2VMboMrb4VFjwUHjnh3Z");
// export const TESTNET_LOCK_CONFIG_BUMP = new PublicKey("4fF75FndaWvpUNryp54UNWAJmb2ZWcSd11x7WwmcJhTN");
// export const TESTNET_FEE_VAULT = new PublicKey("eEMd26PoQHVd91zP3L1db85eq3EHUY1YEqpkuAaptiR");

export const TESTNET_AMM_ADDRESS = new PublicKey("9xNv8TSruqW65nhUEAJQe1tZXAFCF3DUDNJ5pzjcT2eA");
export const TESTNET_AMM_ID = new PublicKey("DK1ai2Sz4jG37NGhbpfmb9nbdKkk9uNcE1Swk7htZkXa");
export const TESTNET_LOCK_CONFIG_BUMP = new PublicKey("GgCDbzkSA3Nk15Z7aHzzXzVojT65ap1kAGffjE8mc95c");
export const TESTNET_FEE_VAULT = new PublicKey("CmDuJ2G6V1Rtz8CBVmBWo5tXpUUKwdAai9QKie5hwhZG");

// AMM AUTHORITY ADDRESS BVARBovTBiBkoinrfG59C9dkUVhMkRQy6BvzQBbHzTRQ
// AMM ADDRESS 6aqgi3d7rNHVzGgiXgbmoU47a8KonGK4Mc1iwfLeez4R
// AMM ID E4kuFRpEV3B4ruXv8hQxQ6qRRehUFdPa1F5yTPAL1v6H
// Lock Config Bump 46JcHTJ2tbb86hbYAZibUs8sTpqFNAtthaJ6upMimwwh
// Fee Vault 8gfsaDEA3MvGEJ4FLY5SnDFhhDQFQwY5cQjgxFszo2Ut

export const MAINNET_AMM_ADDRESS = new PublicKey("6aqgi3d7rNHVzGgiXgbmoU47a8KonGK4Mc1iwfLeez4R");
export const MAINNET_AMM_ID = new PublicKey("E4kuFRpEV3B4ruXv8hQxQ6qRRehUFdPa1F5yTPAL1v6H");
export const MAINNET_LOCK_CONFIG_BUMP = new PublicKey("46JcHTJ2tbb86hbYAZibUs8sTpqFNAtthaJ6upMimwwh");
export const MAINNET_FEE_VAULT = new PublicKey("8gfsaDEA3MvGEJ4FLY5SnDFhhDQFQwY5cQjgxFszo2Ut");


export const LOCK_MASTER  = new PublicKey("D5impVGn4SkUypvZwhnUUzFwusFGMm61q979rdJLJ1wt");
export const ADMIN = new PublicKey("D5impVGn4SkUypvZwhnUUzFwusFGMm61q979rdJLJ1wt");
export const MIGRATOR = new PublicKey("D5impVGn4SkUypvZwhnUUzFwusFGMm61q979rdJLJ1wt");

export const TESTNET_INITIAL_VIRTUAL_SOL_RESERVES = BigInt(45 * 10**9);
export const TESTNET_INITIAL_VIRTUAL_TOKEN_RESERVES = BigInt(1_003_000_000 * 10**6);
export const TESTNET_BONDING_CURVE_POOL_RESERVES = BigInt(740_000_000 * 10**6);
export const TESTNET_FEE_BIPS = 100;

export type DubAMMConfig= {
    amm: PublicKey;
    ammId: PublicKey;
    lockConfigBump: PublicKey;
    feeVault: PublicKey;
    feeBips: number;
    initialVirtualSolReserves: bigint;
    initialVirtualTokenReserves: bigint;
    bondingCurvePoolReserves: bigint;
    lockMaster: PublicKey;
    admin: PublicKey;
    migrator: PublicKey;
}

export const TESTNET_AMM_CONFIG: DubAMMConfig = {
    amm: TESTNET_AMM_ADDRESS,
    ammId: TESTNET_AMM_ID,
    lockConfigBump: TESTNET_LOCK_CONFIG_BUMP,
    feeVault: TESTNET_FEE_VAULT,
    feeBips: TESTNET_FEE_BIPS,
    initialVirtualSolReserves: TESTNET_INITIAL_VIRTUAL_SOL_RESERVES,
    initialVirtualTokenReserves: TESTNET_INITIAL_VIRTUAL_TOKEN_RESERVES,
    bondingCurvePoolReserves: TESTNET_BONDING_CURVE_POOL_RESERVES,
    lockMaster: LOCK_MASTER,
    admin: ADMIN,
    migrator: MIGRATOR
}

export const MAINNET_AMM_CONFIG: DubAMMConfig = {
    amm: MAINNET_AMM_ADDRESS,
    ammId: MAINNET_AMM_ID,
    lockConfigBump: MAINNET_LOCK_CONFIG_BUMP,
    feeVault: MAINNET_FEE_VAULT,
    feeBips: TESTNET_FEE_BIPS,
    initialVirtualSolReserves: TESTNET_INITIAL_VIRTUAL_SOL_RESERVES,
    initialVirtualTokenReserves: TESTNET_INITIAL_VIRTUAL_TOKEN_RESERVES,
    bondingCurvePoolReserves: TESTNET_BONDING_CURVE_POOL_RESERVES,
    lockMaster: LOCK_MASTER,
    admin: ADMIN,
    migrator: MIGRATOR
}

export const DEFAULT_AMM_CONFIG: DubAMMConfig = MAINNET_AMM_CONFIG;