import { createAssociatedTokenAccountInstruction, getAssociatedTokenAddressSync } from "@solana/spl-token";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { BondingCurve } from "../idl/bonding_curve";
import { Program } from "@coral-xyz/anchor";

export const dubCreateTokenAccountInstruction = (mint: PublicKey, owner: PublicKey, program: Program<BondingCurve>, signerPk: PublicKey): TransactionInstruction => {
    const associatedToken = 
      getAssociatedTokenAddressSync(
        mint,
        owner,
        true
      );
  
    return createAssociatedTokenAccountInstruction(
      signerPk,
      associatedToken,
      owner,
      mint
    );
}