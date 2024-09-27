import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import * as anchor from '@coral-xyz/anchor';
import { PublicKey, Transaction } from '@solana/web3.js';
import { createTransferInstruction } from '@solana/spl-token';
import { Keypair } from '@solana/web3.js';
import type { Program } from '@coral-xyz/anchor';
import { DubAMMConfig } from './config';

const wSOL_ADDRESS = new PublicKey("So11111111111111111111111111111111111111112");

export type BondingCurveConfigs = {
    ammId: PublicKey;
    amm: PublicKey;
    ammAuthority: PublicKey;
    mint: PublicKey; // generated
    mintBase: PublicKey; // generated
    feeVault: PublicKey;
    feeVaultTokenAccount: PublicKey;
    pool: PublicKey;
    poolAuthority: PublicKey;
    poolLockAuthority: PublicKey;
    poolTokenAccount: PublicKey;
    poolLockBaseAccount: PublicKey;
    poolBaseAccount: PublicKey;
    poolTokenLockAccount: PublicKey;
};

export const getBondingCurveAccounts = ({
    ammConfig,
    programId,
    tokenMint,
    customWSOLAddress
  } : {
    ammConfig: DubAMMConfig,
    programId: PublicKey,
    tokenMint: PublicKey,
    customWSOLAddress?: PublicKey,
  }): BondingCurveConfigs => {
        const ammId = ammConfig.ammId;
        const wSOLaddress = customWSOLAddress ? customWSOLAddress : wSOL_ADDRESS;
        const ammKey = PublicKey.findProgramAddressSync([ammId.toBuffer()], programId)[0];
        const ammAuthority = PublicKey.findProgramAddressSync(
            [
              ammKey.toBuffer(), 
              Buffer.from('authority')
            ], programId)[0];

        const mintTokenKey = tokenMint; 
  
      const poolKey = PublicKey.findProgramAddressSync(
          [
            ammKey.toBuffer(),
            wSOLaddress.toBuffer(), 
            mintTokenKey.toBuffer(),
          ],
          programId
        )[0];
  
      const poolAuthority = PublicKey.findProgramAddressSync(
        [
          ammKey.toBuffer(),
          wSOLaddress.toBuffer(), 
          mintTokenKey.toBuffer(),
          Buffer.from('authority')
        ],
        programId
      )[0];
  
      const feeVault = ammConfig.feeVault;
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
        programId
      )[0];
  
      const poolTokenAccount = getAssociatedTokenAddressSync(mintTokenKey, poolAuthority, true);
      const poolwSOLAccount = getAssociatedTokenAddressSync(wSOLaddress, poolAuthority, true);
      const poolTokenLockAccount = getAssociatedTokenAddressSync(mintTokenKey, poolLockAuthority, true);
      const poolTokenLockWSOLAccount= getAssociatedTokenAddressSync(wSOLaddress, poolLockAuthority, true);

      /** Vesting and Merkle Distribution */
      return {
          ammId,
          feeVault,
          feeVaultTokenAccount,
          amm: ammKey,
          ammAuthority,
          mintBase: wSOLaddress,
          mint: mintTokenKey,
          pool: poolKey,
          poolAuthority,
          poolTokenAccount,
          poolLockAuthority,
          poolBaseAccount: poolwSOLAccount,
          poolTokenLockAccount,
          poolLockBaseAccount: poolTokenLockWSOLAccount,
      }
  }
  