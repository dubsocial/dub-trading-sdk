import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { IDL, BondingCurve } from '../idl/bonding_curve';
import { DubAMMConfig, TESTNET_AMM_CONFIG, wSOL_ADDRESS } from './config';
import { getBondingCurveAccounts } from './params';
import * as anchor from '@coral-xyz/anchor';
import { createAssociatedTokenAccountIdempotentInstruction, createCloseAccountInstruction, createSyncNativeInstruction, getAssociatedTokenAddressSync } from '@solana/spl-token';

// DANGER: DO NOT USE
// Hacky way to get anchor program 
export const getAnchorProgram = () => {
    const connectionInternal = new Connection("https://api.devnet.solana.com");
    const provider = new AnchorProvider(connectionInternal, {
        publicKey: new PublicKey("8PrwREeewaCXs1rmo5NRRseJN7LRBVc9Pujqswg6VX9D"),
        signTransaction: () => Promise.resolve() as any,
        signAllTransactions: () => Promise.resolve([]),
    }, { preflightCommitment: 'confirmed' });
    const program = new Program<BondingCurve>(IDL, provider);

    return program;
}

/**
 * This function will trade the user's wSOL holdings
 * into the token mint specified by the user.
 * 
 * Note: This function require putting in the exact amount of 
 * traded tokens. For SOL, the precision is 10**9, for other dub tokens,
 * the precision is fixed at 10**6. No other token precisions are supported
 * in dub.
 * 
 * @param input 
 */
export const tradeTransactionIx = async ({
    trader,
    tokenMint,
    tradeAmountRaw,
    ammConfig = TESTNET_AMM_CONFIG,
    minimumAmountOut = 0,
    swapType = "buy",
}: {
    trader: PublicKey;
    tokenMint: PublicKey;
    tradeAmountRaw: number;
    minimumAmountOut: number;
    swapType?: "buy" | "sell";
    ammConfig?: DubAMMConfig
}) => {
    const program = getAnchorProgram();

    const ammAccounts = getBondingCurveAccounts({
        ammConfig,
        programId: new PublicKey(program.idl.address),
        tokenMint: tokenMint
    })

    const traderAccountA = getAssociatedTokenAddressSync(ammAccounts.mintBase, trader, true);
    const traderAccountB = getAssociatedTokenAddressSync(ammAccounts.mint, trader, true);

    const swapAccounts = {
        amm: ammAccounts.amm,
        feeVaultTokenAccount: ammAccounts.feeVaultTokenAccount,
        pool: ammAccounts.pool,
        poolAuthority: ammAccounts.poolAuthority,
        trader: trader,
        mintA: ammAccounts.mintBase,
        mintB: ammAccounts.mint,
        poolAccountA: ammAccounts.poolBaseAccount,
        poolAccountB: ammAccounts.poolTokenAccount,
        traderAccountA: traderAccountA,
        traderAccountB: traderAccountB,
        payer: trader,
    }

    const ix = await program
        .methods
        .swapExactTokensForTokens(swapType === "buy", new anchor.BN(tradeAmountRaw), new anchor.BN(minimumAmountOut))
        .accounts(swapAccounts)
        .instruction();

    return ix;
}

// Please note that a wSOL account must be created
// for the trader before calling this function.

// This function will include the transaction 
// to create a wSOL account for the trader if need be.
export const tradeTransactionBuyTx = async ({
    trader,
    tokenMint,
    tradeAmountRaw,
    minimumAmountOut = 0,
    ammConfig = TESTNET_AMM_CONFIG,
}: {
    trader: PublicKey;
    tokenMint: PublicKey;
    tradeAmountRaw: number;
    minimumAmountOut: number;
    ammConfig?: DubAMMConfig
}) => {
    const tradeIx = await tradeTransactionIx({
        trader,
        tokenMint,
        tradeAmountRaw,
        minimumAmountOut,
        swapType: "buy",
        ammConfig,
    });

    let transaction = new Transaction();

    const wSOLAccount = getAssociatedTokenAddressSync(wSOL_ADDRESS, trader, true);

    const createWsolAccountIx = createAssociatedTokenAccountIdempotentInstruction(
        trader,
        wSOLAccount,
        trader,
        wSOL_ADDRESS
    );

    const tokenAccount = getAssociatedTokenAddressSync(tokenMint, trader, true);
    const createTokenAccountIx = createAssociatedTokenAccountIdempotentInstruction(
        trader,
        tokenAccount,
        trader,
        tokenMint 
    );

    const transferSolIx = SystemProgram.transfer({
        fromPubkey: trader,
        toPubkey: wSOLAccount,
        lamports: tradeAmountRaw,
    });

    const syncWsolAccountIx = createSyncNativeInstruction(wSOLAccount);

    transaction = transaction
        .add(createWsolAccountIx)
        .add(createTokenAccountIx)
        .add(transferSolIx)
        .add(syncWsolAccountIx)
        .add(tradeIx);

    transaction.feePayer = trader;

    return transaction;
}

export const tradeTransactionSellTx = async ({
    trader,
    tokenMint,
    tradeAmountRaw,
    minimumAmountOut = 0,
    ammConfig = TESTNET_AMM_CONFIG,
}: {
    trader: PublicKey;
    tokenMint: PublicKey;
    tradeAmountRaw: number;
    minimumAmountOut: number;
    ammConfig?: DubAMMConfig
}) => {
    const tradeIx = await tradeTransactionIx({
        trader,
        tokenMint,
        tradeAmountRaw,
        minimumAmountOut,
        swapType: "sell",
        ammConfig,
    });

    let transaction = new Transaction();

    const wSOLAccount = getAssociatedTokenAddressSync(wSOL_ADDRESS, trader, true);

    const createWsolAccountIx = createAssociatedTokenAccountIdempotentInstruction(
        trader,
        wSOLAccount,
        trader,
        wSOL_ADDRESS
    );

    const transferSolIx = SystemProgram.transfer({
        fromPubkey: trader,
        toPubkey: wSOLAccount,
        lamports: tradeAmountRaw,
    });

    const syncWsolAccountIx = createSyncNativeInstruction(wSOLAccount);

    const closeWsolAccountIx = createCloseAccountInstruction(
        wSOLAccount,
        trader,
        trader
    );

    transaction = transaction
        .add(createWsolAccountIx)
        .add(transferSolIx)
        .add(syncWsolAccountIx)
        .add(tradeIx)
        .add(closeWsolAccountIx);

    transaction.feePayer = trader;

    return transaction;
}

