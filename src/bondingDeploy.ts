import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Connection, Keypair, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { IDL, BondingCurve } from '../idl/bonding_curve';
import { DubAMMConfig, TESTNET_AMM_CONFIG, wSOL_ADDRESS } from './config';
import { getBondingCurveAccounts } from './params';
import * as anchor from '@coral-xyz/anchor';
import { BondingCurveConfigs, getBondingCurveConfigs } from './create';
import { createAssociatedTokenAccountIdempotentInstruction, createCloseAccountInstruction, createSyncNativeInstruction, getAssociatedTokenAddressSync } from '@solana/spl-token';
import { dubCreateTokenAccountInstruction } from './utils';

// DANGER: DO NOT USE
// Hacky way to get anchor program 
export const getAnchorProgram = ({
    publicKey
}: {
    publicKey?: PublicKey
}) => {
    const connectionInternal = new Connection("https://api.devnet.solana.com");
    const provider = new AnchorProvider(connectionInternal, {
        publicKey: publicKey ? publicKey : new PublicKey("8PrwREeewaCXs1rmo5NRRseJN7LRBVc9Pujqswg6VX9D"),
        signTransaction: () => Promise.resolve() as any,
        signAllTransactions: () => Promise.resolve([]),
    }, { preflightCommitment: 'confirmed' });
    const program = new Program<BondingCurve>(IDL, provider);

    return program;
}

const metaplexProgramId = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

export const createTokenInstructions = async (
    program: anchor.Program<BondingCurve>, 
    deployer: PublicKey, 
    params: BondingCurveConfigs,
    name: string,
    symbol: string,
    uri: string
) => {
    const poolAccounts = {
        ...params,
        lockMaster: params.lockMaster
    };

    const mint = params.mint;
    const [metadataPda, _] = await PublicKey.findProgramAddress(
      [
        Buffer.from('metadata'),
        metaplexProgramId.toBuffer(),
        mint.toBuffer(),
      ],
      metaplexProgramId
    );

    const accounts = {
        ...poolAccounts,
        metadata: metadataPda,
        mplTokenMetadataProgram: metaplexProgramId,
    };

    const deployBondingMintIx = await program
        .methods
        .deployBondingMint(
            name, 
            symbol, 
            uri
        )
        .accounts(accounts as any)
        .instruction();

     const poolTokenAccountInitIx = dubCreateTokenAccountInstruction(params.mint, params.poolAuthority, program, deployer);
     const poolBaseAccountInitIx = dubCreateTokenAccountInstruction(wSOL_ADDRESS, params.poolAuthority, program, deployer);
     const poolLockTokenAccountIx= dubCreateTokenAccountInstruction(params.mint, params.poolLockAuthority, program, deployer);
 
     const deployBondingPoolIx = await program
       .methods
       .deployBondingPool(params.mintBase)
       .accounts({...{
            amm: params.amm,
            ammAuthority: params.ammAuthority,
            mint: params.mint,
            pool: params.pool,
            poolAuthority: params.poolAuthority,
            poolLockAuthority: params.poolLockAuthority,
            poolTokenAccount: params.poolTokenAccount,
            poolBaseAccount: params.poolBaseAccount,
            poolTokenLockAccount: params.poolTokenLockAccount,
            payer: deployer,
            distributor: params.distributor,
            distributorVault: params.distributorVault,
            vesting: params.vesting,
            vestingVault: params.vestingVault,
            lock: params.lock,
            lockVault: params.lockVault,
            lockMaster: params.lockMaster,
            lockConfig: params.lockConfig,
       }} as any)
       .instruction();

    return [[
        deployBondingMintIx, 
        poolTokenAccountInitIx, 
        poolBaseAccountInitIx, 
        poolLockTokenAccountIx, 
    ], [
        deployBondingPoolIx
    ]]
}


// Get the two creation transactions:
// bondingDeployMint & bondingDeployPool
export const deployBondingTransactions = async ({
    creator,
    ammConfig = TESTNET_AMM_CONFIG,
    name,
    symbol,
    uri,
}: {
    creator: PublicKey;
    ammConfig?: DubAMMConfig;
    name: string;
    symbol: string;
    uri: string;
}) => {
    const program = getAnchorProgram({
        publicKey: creator
    });

    const mintTokenBumpKeypair = Keypair.generate();

    const bondingCurveConfigs = getBondingCurveConfigs({
        dev: creator,
        mintBump: mintTokenBumpKeypair.publicKey,
        ammConfig
    })

    const deployInstructions = await createTokenInstructions(
        program, 
        creator, 
        bondingCurveConfigs, 
        name, 
        symbol, 
        uri
    );
        
    let txs = deployInstructions.map((instructionSet) => {
        return new Transaction()
            .add(...instructionSet);
    });
    
    return txs;
}
