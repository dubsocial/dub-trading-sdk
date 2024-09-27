import { Connection, PublicKey } from "@solana/web3.js";
import { DubAMMConfig, TESTNET_AMM_CONFIG } from "./config";
import { getAnchorProgram } from "./trade";
import { getBondingCurveAccounts } from "./params";

export async function getPoolReserves (
    mint: PublicKey,
    connection: Connection,
    config: DubAMMConfig = TESTNET_AMM_CONFIG,
): Promise<{
    baseTokenReserve: bigint;
    quoteTokenReserve: bigint;
}> {
    const program = getAnchorProgram();

    const ammAccounts = getBondingCurveAccounts({
        ammConfig: config,
        programId: new PublicKey(program.idl.address),
        tokenMint: mint
    });

    const baseTokenAccountInfo = await connection.getTokenAccountBalance(ammAccounts.poolBaseAccount);
    const quoteTokenAccountInfo = await connection.getTokenAccountBalance(ammAccounts.poolTokenAccount);

    const baseTokenReserve = BigInt(baseTokenAccountInfo.value.amount);
    const quoteTokenReserve = BigInt(quoteTokenAccountInfo.value.amount);
    
    return {
        baseTokenReserve,
        quoteTokenReserve
    }
}

export function estimateTokensOut(
    config: DubAMMConfig,
    swapA: boolean,
    inputAmount: bigint,
    baseTokenReserve: bigint,
    quoteTokenReserve: bigint,
): number {
    const inputPretax = inputAmount;

    const aReserves = config.initialVirtualSolReserves + baseTokenReserve;
    const bReserves = config.initialVirtualTokenReserves - (config.bondingCurvePoolReserves - quoteTokenReserve);

    // If swapA, tax the input
    const tax = (inputPretax * BigInt(config.feeBips)) / BigInt(10000);
    const input = swapA ? inputPretax - tax : inputPretax;
    // Post-tax input used for calculation.
    const output = swapA
        ? (input * bReserves) / (aReserves + input)
        : (input * aReserves) / (bReserves + input);

    // Apply output tax
    // The ordering is chosen to match the Rust code provided in the instructions.
    // The calculation of output_tax is done by multiplying the output with the fee and then dividing by 10000.
    const outputTax = swapA ? BigInt(0) : (output * BigInt(config.feeBips)) / BigInt(10000);
    const taxedOutput = output - outputTax;

    return Number(taxedOutput);
}

