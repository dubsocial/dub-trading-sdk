import { ComputeBudgetProgram, Connection, PublicKey, Signer, Transaction } from "@solana/web3.js";
import { tradeTransactionBuyTx, tradeTransactionIx, tradeTransactionSellTx } from "../src/trade";
import { readFileSync } from 'fs';
import { Keypair } from '@solana/web3.js';
import { estimateTokensOut, getPoolReserves } from "../src/estimate";
import { TESTNET_AMM_CONFIG } from "../src/config";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { createTokenInstructions, deployBondingTransactions } from "../src/bondingDeploy";

// 
// ADD YOUR KEYPAIR HERE.
// 
const keypair = Keypair.fromSecretKey(
    new Uint8Array(JSON.parse(readFileSync('INSERT_KEYPAIR.json', 'utf8')))
);

const creatorPublicKey = keypair.publicKey;
const SOLANA_NETWORK_URL = "https://api.devnet.solana.com";

(async () => {
    const connection = new Connection(SOLANA_NETWORK_URL);

    const txs = await deployBondingTransactions({
        creator: creatorPublicKey,
        name: "Test",
        symbol: "TEST",
        uri: "https://test.com",
    })

    // Deploy bonding mint
    const deployBondingMintTx = txs[0];
    deployBondingMintTx.feePayer = creatorPublicKey;
    deployBondingMintTx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    deployBondingMintTx.sign(keypair);
    deployBondingMintTx.serialize();

    const deployBondingMintTxId = await connection.sendRawTransaction(deployBondingMintTx.serialize(), {
        skipPreflight: true
    });
    const deployBondingMintTxConfirmation = await connection.confirmTransaction(deployBondingMintTxId, "confirmed");

    console.log(`Deploy Bonding Mint Transaction ID: ${deployBondingMintTxId}`);
    console.log(`Deploy Bonding Mint Transaction Confirmation: ${deployBondingMintTxConfirmation.value.err ? 'Failed' : 'Success'}`);

    // const computeBudgetIx = ComputeBudgetProgram.setComputeUnitLimit({computeUnitLimit: 1000000});

    const increaseComputeUnitPriceIx = ComputeBudgetProgram.setComputeUnitLimit({units: 3000000});
    const deployBondingPoolTx = new Transaction()
        .add(increaseComputeUnitPriceIx)
        .add(txs[1]);

    deployBondingPoolTx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    deployBondingPoolTx.feePayer = creatorPublicKey;
    deployBondingPoolTx.sign(keypair);

    try {
        const txid = await connection.sendRawTransaction(deployBondingPoolTx.serialize(), {
            skipPreflight: true
        });
        const confirmation = await connection.confirmTransaction(txid, "confirmed");

        console.log(`Transaction ID: ${txid}`);
        console.log(`Confirmation status: ${confirmation.value.err ? 'Failed' : 'Success'}`);
    } catch (error) {
        console.error('Transaction failed:', error);
    }
})()
