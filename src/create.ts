import { Keypair, PublicKey } from '@solana/web3.js';
import { DubAMMConfig, LOCK_PROGRAM_ADDRESS, MERKLE_DISTRIBUTOR_PROGRAM_ADDRESS, PROGRAM_ADDRESS, TESTNET_AMM_CONFIG, VESTING_PROGRAM_ADDRESS, wSOL_ADDRESS } from './config';
import * as anchor from '@coral-xyz/anchor';
let getAssociatedTokenAddressSync: any;
(async () => {
  ({ getAssociatedTokenAddressSync } = await import('@solana/spl-token'));
})();

export type BondingCurveConfigs = {
    ammId: PublicKey;
    lockMaster?: PublicKey;
    amm: PublicKey;
    admin?: PublicKey;
    ammAuthority: PublicKey;
    lockConfigBump?: PublicKey;
    mintBump?: PublicKey;
    migrator?: PublicKey;
    lockmaster?: PublicKey;
    mint: PublicKey; // generated
    mintBase: PublicKey; // generated
    feeVault: PublicKey;
    feeVaultTokenAccount: PublicKey;
    pool: PublicKey;
    lockConfig: PublicKey;
    lock: PublicKey;
    lockVault: PublicKey;
    poolAuthority: PublicKey;
    poolLockAuthority: PublicKey;
    poolTokenAccount: PublicKey;
    poolLockBaseAccount: PublicKey;
    poolBaseAccount: PublicKey;
    poolTokenLockAccount: PublicKey;
    distributor: PublicKey;
    distributorVault: PublicKey;
    vesting: PublicKey;
    vestingVault: PublicKey;
};


/** Call to generate addresses for a new token */
export const getBondingCurveConfigs = ({
  dev,
  mint,
  ammConfig = TESTNET_AMM_CONFIG
} : {
  dev: PublicKey,
  mint: PublicKey,
  ammConfig?: DubAMMConfig,
}): BondingCurveConfigs => {
    const lockConfig: PublicKey = PublicKey.findProgramAddressSync(
      [
        Buffer.from('lock_config'), 
        ammConfig.lockConfigBump.toBuffer()
      ],
      LOCK_PROGRAM_ADDRESS
    )[0];

    const wSOLaddress = wSOL_ADDRESS;
    const ammKey = PublicKey.findProgramAddressSync([ammConfig.ammId.toBuffer()], PROGRAM_ADDRESS)[0];
    const ammAuthority = PublicKey.findProgramAddressSync(
        [
          ammKey.toBuffer(), 
          Buffer.from('authority')
        ], PROGRAM_ADDRESS)[0];
        
    // Keypair of the random token
    /* This is a fake WSOL token */
    const mintTokenKey = mint;

    const poolKey = PublicKey.findProgramAddressSync(
        [
          ammKey.toBuffer(),
          wSOLaddress.toBuffer(), 
          mintTokenKey.toBuffer(),
        ],
        PROGRAM_ADDRESS
      )[0];

    const poolAuthority = PublicKey.findProgramAddressSync(
      [
        ammKey.toBuffer(),
        wSOLaddress.toBuffer(), 
        mintTokenKey.toBuffer(),
        Buffer.from('authority')
      ],
      PROGRAM_ADDRESS
    )[0];

    const feeVault = Keypair.generate().publicKey;
    const feeVaultTokenAccount = getAssociatedTokenAddressSync(
      wSOL_ADDRESS, 
      feeVault, 
      true
    );

    const poolLockAuthority = PublicKey.findProgramAddressSync(
      [
        poolAuthority.toBuffer(),
        Buffer.from('lock_authority')
      ],
      PROGRAM_ADDRESS
    )[0];

    const lockKey = PublicKey.findProgramAddressSync(
      [
        Buffer.from('lock'),
        poolLockAuthority.toBuffer(),
        mintTokenKey.toBuffer()
      ],
      LOCK_PROGRAM_ADDRESS
    )[0];

    const lockVault = getAssociatedTokenAddressSync(mintTokenKey, lockKey, true);
    const poolTokenAccount = getAssociatedTokenAddressSync(mintTokenKey, poolAuthority, true);
    const poolwSOLAccount = getAssociatedTokenAddressSync(wSOLaddress, poolAuthority, true);
    const poolTokenLockAccount = getAssociatedTokenAddressSync(mintTokenKey, poolLockAuthority, true);
    const poolTokenLockWSOLAccount= getAssociatedTokenAddressSync(wSOLaddress, poolLockAuthority, true);

    const version = Buffer.from(new Uint8Array(8).fill(0));
    const distributor = PublicKey.findProgramAddressSync(
			[
				Buffer.from("MerkleDistributor"),
				mintTokenKey.toBuffer(),
				version,
			],
			MERKLE_DISTRIBUTOR_PROGRAM_ADDRESS,
		)[0];

    const distributorVault = getAssociatedTokenAddressSync(mintTokenKey, distributor, true);

    const vesting = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("vesting"), dev.toBuffer(), mintTokenKey.toBuffer()],
      VESTING_PROGRAM_ADDRESS,
    )[0];

    const vestingVault = getAssociatedTokenAddressSync(mintTokenKey, vesting, true);

    /** Vesting and Merkle Distribution */
    return {
        ammId: ammConfig.ammId,
        feeVault,
        feeVaultTokenAccount,
        amm: ammKey,
        lockConfig,
        ammAuthority,
        mintBase: wSOLaddress,
        mint: mintTokenKey,
        pool: poolKey,
        lock: lockKey,
        lockVault,
        poolAuthority,
        poolTokenAccount,
        poolLockAuthority,
        poolBaseAccount: poolwSOLAccount,
        poolTokenLockAccount,
        poolLockBaseAccount: poolTokenLockWSOLAccount,
        distributor,
        distributorVault,
        vesting,
        vestingVault,
    }
}