import { Connection, PublicKey, Signer, Transaction } from "@solana/web3.js";
import { tradeTransactionBuyTx, tradeTransactionIx, tradeTransactionSellTx } from "../src/trade";
import { readFileSync } from 'fs';
import { Keypair } from '@solana/web3.js';
import { estimateTokensOut, getPoolReserves } from "../src/estimate";
import { DEFAULT_AMM_CONFIG } from "../src/config";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";

// 
// ADD YOUR KEYPAIR HERE.
// 
const keypair = Keypair.fromSecretKey(
    new Uint8Array(JSON.parse(readFileSync('/Users/pun/.config/solana/id.json', 'utf8')))
);

const traderPublicKey = keypair.publicKey;
const TOKEN_MINT = new PublicKey("ew8aktApWa3bXeLbsBTPudedn3anrLiKrcoh7HCcJTR");
const SOLANA_NETWORK_URL = "https://api.mainnet-beta.solana.com";

(async () => {

    const inputAmount = 10000;

    const connection = new Connection(SOLANA_NETWORK_URL);
    const { baseTokenReserve, quoteTokenReserve } = await getPoolReserves(TOKEN_MINT, connection);

    const outputAmount = estimateTokensOut(DEFAULT_AMM_CONFIG, true, BigInt(inputAmount), baseTokenReserve, quoteTokenReserve);
    console.log(outputAmount);

    const tx = await tradeTransactionBuyTx({
        trader: traderPublicKey,
        tokenMint: TOKEN_MINT,
        tradeAmountRaw: 10000,
        minimumAmountOut: 0,
    })

    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    tx.feePayer = traderPublicKey;
    tx.sign(keypair);

    const traderTokenAddress = getAssociatedTokenAddressSync(TOKEN_MINT, traderPublicKey, true);
    let initialTokenBalance;
    try {
        initialTokenBalance = await connection.getTokenAccountBalance(traderTokenAddress);
    } catch (error) {
        initialTokenBalance = { value: { amount: "0" } };
    }

    const txid = await connection.sendRawTransaction(tx.serialize());
    const confirmation = await connection.confirmTransaction(txid);
    const finalTokenBalance = await connection.getTokenAccountBalance(traderTokenAddress);
    const tokenBalanceChange = BigInt(finalTokenBalance.value.amount) - BigInt(initialTokenBalance.value.amount);

    console.log(`Transaction ID: ${txid}`);
    console.log(`Confirmation status: ${confirmation.value.err ? 'Failed' : 'Success'}`);
    console.log(`Estimated output amount: ${outputAmount}`);
    console.log(`Actual token balance change: ${tokenBalanceChange}`);
})()
