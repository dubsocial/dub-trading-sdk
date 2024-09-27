import { Idl } from "@coral-xyz/anchor";

export type BondingCurve = {
  "address": "8PrwREeewaCXs1rmo5NRRseJN7LRBVc9Pujqswg6VX9D",
  "metadata": {
    "name": "bondingCurve",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createAmm",
      "discriminator": [
        242,
        91,
        21,
        170,
        5,
        68,
        125,
        64
      ],
      "accounts": [
        {
          "name": "amm",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "id"
              }
            ]
          }
        },
        {
          "name": "migrator"
        },
        {
          "name": "feeVault"
        },
        {
          "name": "lockMaster"
        },
        {
          "name": "lockConfig",
          "docs": [
            "The lock configuration for the AMM"
          ]
        },
        {
          "name": "admin",
          "docs": [
            "The admin of the AMM"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "The account paying for all rents"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "pubkey"
        },
        {
          "name": "fee",
          "type": "u16"
        },
        {
          "name": "startingSolReserves",
          "type": "u64"
        },
        {
          "name": "startingTokenReserves",
          "type": "u64"
        },
        {
          "name": "bondingCurvePoolReserves",
          "type": "u64"
        },
        {
          "name": "migrationReserves",
          "type": "u64"
        },
        {
          "name": "vestingReserves",
          "type": "u64"
        }
      ]
    },
    {
      "name": "deployBondingMint",
      "discriminator": [
        101,
        213,
        96,
        184,
        83,
        204,
        125,
        195
      ],
      "accounts": [
        {
          "name": "amm",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "amm.id",
                "account": "amm"
              }
            ]
          }
        },
        {
          "name": "ammAuthority",
          "docs": [
            "Read-only AMM authority"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "amm"
              },
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "mintBump"
        },
        {
          "name": "mint",
          "docs": [
            "RANDOM: Read only authority"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "amm"
              },
              {
                "kind": "account",
                "path": "mintBump"
              }
            ]
          }
        },
        {
          "name": "mintBase",
          "docs": [
            "This is the mint of the base token."
          ]
        },
        {
          "name": "pool",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "amm"
              },
              {
                "kind": "account",
                "path": "mintBase"
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ]
          }
        },
        {
          "name": "poolAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "amm"
              },
              {
                "kind": "account",
                "path": "mintBase"
              },
              {
                "kind": "account",
                "path": "mint"
              },
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "payer",
          "docs": [
            "The account paying for all rents"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram",
          "docs": [
            "Solana ecosystem accounts"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "deployBondingPool",
      "discriminator": [
        16,
        161,
        40,
        255,
        153,
        78,
        237,
        57
      ],
      "accounts": [
        {
          "name": "amm",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "amm.id",
                "account": "amm"
              }
            ]
          }
        },
        {
          "name": "pool",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "amm"
              },
              {
                "kind": "arg",
                "path": "mintBase"
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ]
          }
        },
        {
          "name": "ammAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "amm"
              },
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "mint",
          "docs": [
            "Token mint account"
          ],
          "writable": true
        },
        {
          "name": "poolTokenAccount",
          "docs": [
            "Pool token account"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "poolAuthority"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "poolBaseAccount",
          "docs": [
            "Pool base token account"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "poolAuthority"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "arg",
                "path": "mintBase"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "poolLockAuthority",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "poolAuthority"
              },
              {
                "kind": "const",
                "value": [
                  108,
                  111,
                  99,
                  107,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "poolTokenLockAccount",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "poolLockAuthority"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "poolAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "amm"
              },
              {
                "kind": "arg",
                "path": "mintBase"
              },
              {
                "kind": "account",
                "path": "mint"
              },
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "payer",
          "docs": [
            "The account paying for all rents"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "distributor",
          "writable": true
        },
        {
          "name": "vesting",
          "writable": true
        },
        {
          "name": "vestingVault",
          "writable": true
        },
        {
          "name": "lock",
          "writable": true
        },
        {
          "name": "lockVault",
          "writable": true
        },
        {
          "name": "lockMaster"
        },
        {
          "name": "lockConfig"
        },
        {
          "name": "distributorVault",
          "writable": true
        },
        {
          "name": "merkleDistributorProgram",
          "address": "FGWk7eUKeGZEmvmeifggHcyyyksLnQSAkKhvK14HUj3n"
        },
        {
          "name": "vestingProgram",
          "address": "BZAEvqxscdTKjEdXG9mdsbMkcbseVx6syTMp7LycVaDs"
        },
        {
          "name": "lockProgram",
          "address": "8izNed2ZfWjdPVr7gjJ1t7mZ8wtzNWc9z5ojawbRMMSH"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "mintBase",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "migrate",
      "discriminator": [
        155,
        234,
        231,
        146,
        236,
        158,
        162,
        30
      ],
      "accounts": [
        {
          "name": "ammConfig",
          "writable": true
        },
        {
          "name": "ammLpMint",
          "writable": true
        },
        {
          "name": "ammCoinMint",
          "writable": true
        },
        {
          "name": "ammPcMint",
          "writable": true
        },
        {
          "name": "ammCoinVault",
          "writable": true
        },
        {
          "name": "ammPcVault",
          "writable": true
        },
        {
          "name": "ammObservationState",
          "writable": true
        },
        {
          "name": "createPoolFee",
          "writable": true
        },
        {
          "name": "amm",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "amm.id",
                "account": "amm"
              }
            ]
          }
        },
        {
          "name": "ammAuthority"
        },
        {
          "name": "poolAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "amm"
              },
              {
                "kind": "account",
                "path": "ammCoinMint"
              },
              {
                "kind": "account",
                "path": "ammPcMint"
              },
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "poolLockAuthority",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "poolAuthority"
              },
              {
                "kind": "const",
                "value": [
                  108,
                  111,
                  99,
                  107,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "poolLockTokenPc",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "poolLockAuthority"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "ammPcMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "poolState",
          "writable": true
        },
        {
          "name": "poolTokenPc",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "poolAuthority"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "ammPcMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "poolTokenCoin",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "poolAuthority"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "ammCoinMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "userTokenPc",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "payer"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "ammPcMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "userTokenCoin",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "payer"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "ammCoinMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "userTokenLp",
          "writable": true
        },
        {
          "name": "payer",
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "raydiumCpSwap",
          "address": "CPMDWBwJDtYax9qW7AyRuVC19Cc4L4Vcy4n2BHAbHkCW"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "swapExactTokensForTokens",
      "discriminator": [
        249,
        86,
        253,
        50,
        177,
        221,
        73,
        162
      ],
      "accounts": [
        {
          "name": "amm",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "amm.id",
                "account": "amm"
              }
            ]
          },
          "relations": [
            "pool"
          ]
        },
        {
          "name": "feeVaultTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "amm.fee_vault",
                "account": "amm"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mintA"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "pool",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "amm"
              },
              {
                "kind": "account",
                "path": "mintA"
              },
              {
                "kind": "account",
                "path": "mintB"
              }
            ]
          }
        },
        {
          "name": "poolAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "pool.amm",
                "account": "pool"
              },
              {
                "kind": "account",
                "path": "mintA"
              },
              {
                "kind": "account",
                "path": "mintB"
              },
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "trader",
          "writable": true,
          "signer": true
        },
        {
          "name": "mintA",
          "relations": [
            "pool"
          ]
        },
        {
          "name": "mintB"
        },
        {
          "name": "poolAccountA",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "poolAuthority"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mintA"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "poolAccountB",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "poolAuthority"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mintB"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "traderAccountA",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "trader"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mintA"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "traderAccountB",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "trader"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mintB"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "payer",
          "docs": [
            "The account paying for all rents"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram",
          "docs": [
            "Solana ecosystem accounts"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "swapA",
          "type": "bool"
        },
        {
          "name": "inputAmount",
          "type": "u64"
        },
        {
          "name": "minOutputAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateFeeParams",
      "discriminator": [
        223,
        116,
        30,
        197,
        161,
        4,
        201,
        146
      ],
      "accounts": [
        {
          "name": "amm",
          "writable": true
        },
        {
          "name": "admin",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "newFee",
          "type": "u16"
        },
        {
          "name": "newFeeVault",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "updateLaunchParams",
      "discriminator": [
        18,
        176,
        82,
        92,
        217,
        29,
        93,
        148
      ],
      "accounts": [
        {
          "name": "amm",
          "writable": true
        },
        {
          "name": "admin",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "newAmm",
          "type": {
            "defined": {
              "name": "amm"
            }
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "amm",
      "discriminator": [
        143,
        245,
        200,
        17,
        74,
        214,
        196,
        135
      ]
    },
    {
      "name": "lockConfig",
      "discriminator": [
        106,
        47,
        238,
        159,
        124,
        12,
        160,
        192
      ]
    },
    {
      "name": "pool",
      "discriminator": [
        241,
        154,
        109,
        4,
        17,
        177,
        109,
        188
      ]
    }
  ],
  "events": [
    {
      "name": "createEvent",
      "discriminator": [
        27,
        114,
        169,
        77,
        222,
        235,
        99,
        118
      ]
    },
    {
      "name": "tradeEvent",
      "discriminator": [
        189,
        219,
        127,
        211,
        78,
        230,
        97,
        238
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidFee",
      "msg": "Invalid fee value"
    },
    {
      "code": 6001,
      "name": "invalidMint",
      "msg": "Invalid mint for the pool"
    },
    {
      "code": 6002,
      "name": "depositTooSmall",
      "msg": "Depositing too little liquidity"
    },
    {
      "code": 6003,
      "name": "outputTooSmall",
      "msg": "Output is below the minimum expected"
    },
    {
      "code": 6004,
      "name": "invariantViolated",
      "msg": "Invariant does not hold"
    },
    {
      "code": 6005,
      "name": "overflow",
      "msg": "overflow"
    },
    {
      "code": 6006,
      "name": "unauthorized",
      "msg": "unauthorized"
    },
    {
      "code": 6007,
      "name": "tradingPaused",
      "msg": "Trading paused. Try again later."
    },
    {
      "code": 6008,
      "name": "lockAlreadyInitialized",
      "msg": "Lock already initialized"
    },
    {
      "code": 6009,
      "name": "distributorAlreadyInitialized",
      "msg": "Distributor already initialized"
    },
    {
      "code": 6010,
      "name": "poolAlreadyInitialized",
      "msg": "Pool already initialized"
    },
    {
      "code": 6011,
      "name": "slippageExceeded",
      "msg": "Slippage exceeded"
    }
  ],
  "types": [
    {
      "name": "amm",
      "docs": [
        "* Protocol configurations"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "docs": [
              "The primary key of the AMM"
            ],
            "type": "pubkey"
          },
          {
            "name": "admin",
            "docs": [
              "Account that has update authority over the AMM struct,",
              "and is able to pause trading."
            ],
            "type": "pubkey"
          },
          {
            "name": "migrator",
            "docs": [
              "The account that has migration authority over all pools."
            ],
            "type": "pubkey"
          },
          {
            "name": "tradingPaused",
            "docs": [
              "Trading paused"
            ],
            "type": "bool"
          },
          {
            "name": "fee",
            "docs": [
              "The fee taken on each trade."
            ],
            "type": "u16"
          },
          {
            "name": "feeVault",
            "docs": [
              "The vault that accepts the trading fees"
            ],
            "type": "pubkey"
          },
          {
            "name": "lockMaster",
            "docs": [
              "The wallet that approves the unlocking of tokens for marketcap-based milestones."
            ],
            "type": "pubkey"
          },
          {
            "name": "startingSolReserves",
            "docs": [
              "The initial starting liquidity"
            ],
            "type": "u64"
          },
          {
            "name": "startingTokenReserves",
            "type": "u64"
          },
          {
            "name": "bondingCurvePoolReserves",
            "type": "u64"
          },
          {
            "name": "migrationReserves",
            "type": "u64"
          },
          {
            "name": "vestingReserves",
            "type": "u64"
          },
          {
            "name": "lockConfig",
            "type": "pubkey"
          },
          {
            "name": "padding",
            "type": {
              "defined": {
                "name": "bonding_curve::state::Padding",
                "generics": [
                  {
                    "kind": "const",
                    "value": "256"
                  }
                ]
              }
            }
          }
        ]
      }
    },
    {
      "name": "createEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "amm",
            "type": "pubkey"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "baseAmount",
            "type": "u64"
          },
          {
            "name": "quoteAmount",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "lockConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lockMilestones",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "marketcapLockbox"
                  }
                },
                8
              ]
            }
          },
          {
            "name": "numMilestones",
            "type": "u8"
          },
          {
            "name": "padding",
            "type": {
              "defined": {
                "name": "lock::state::Padding",
                "generics": [
                  {
                    "kind": "const",
                    "value": "256"
                  }
                ]
              }
            }
          }
        ]
      }
    },
    {
      "name": "marketcapLockbox",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketcap",
            "type": "u64"
          },
          {
            "name": "identifier",
            "type": {
              "array": [
                "u8",
                8
              ]
            }
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "pool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amm",
            "docs": [
              "Primary key of the AMM"
            ],
            "type": "pubkey"
          },
          {
            "name": "creator",
            "docs": [
              "Creator pubkey"
            ],
            "type": "pubkey"
          },
          {
            "name": "mintA",
            "docs": [
              "Mint of token A"
            ],
            "type": "pubkey"
          },
          {
            "name": "mintB",
            "docs": [
              "Mint of token B"
            ],
            "type": "pubkey"
          },
          {
            "name": "reservesA",
            "docs": [
              "Virtual reserves for token A"
            ],
            "type": "u64"
          },
          {
            "name": "reservesB",
            "docs": [
              "Virtual reserves for token A"
            ],
            "type": "u64"
          },
          {
            "name": "migrateReserveA",
            "type": "u64"
          },
          {
            "name": "migrateReserveB",
            "type": "u64"
          },
          {
            "name": "poolInitialized",
            "type": "bool"
          },
          {
            "name": "distributorInitialized",
            "type": "bool"
          },
          {
            "name": "lockInitialized",
            "type": "bool"
          },
          {
            "name": "padding",
            "type": {
              "defined": {
                "name": "bonding_curve::state::Padding",
                "generics": [
                  {
                    "kind": "const",
                    "value": "256"
                  }
                ]
              }
            }
          }
        ]
      }
    },
    {
      "name": "tradeEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "trader",
            "type": "pubkey"
          },
          {
            "name": "isBuy",
            "type": "bool"
          },
          {
            "name": "baseAmount",
            "type": "u64"
          },
          {
            "name": "quoteAmount",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "virtualSolReserves",
            "type": "u64"
          },
          {
            "name": "virtualTokenReserves",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "bonding_curve::state::Padding",
      "generics": [
        {
          "kind": "const",
          "name": "n",
          "type": "usize"
        }
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "array": [
              "u8",
              {
                "generic": "n"
              }
            ]
          }
        ]
      }
    },
    {
      "name": "lock::state::Padding",
      "generics": [
        {
          "kind": "const",
          "name": "n",
          "type": "usize"
        }
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "array": [
              "u8",
              {
                "generic": "n"
              }
            ]
          }
        ]
      }
    }
  ],
  "constants": [
    {
      "name": "authoritySeed",
      "type": "bytes",
      "value": "[97, 117, 116, 104, 111, 114, 105, 116, 121]"
    },
    {
      "name": "lockAuthoritySeed",
      "type": "bytes",
      "value": "[108, 111, 99, 107, 95, 97, 117, 116, 104, 111, 114, 105, 116, 121]"
    }
  ]
};

export const IDL: BondingCurve = {
  "address": "8PrwREeewaCXs1rmo5NRRseJN7LRBVc9Pujqswg6VX9D",
  "metadata": {
    "name": "bondingCurve",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createAmm",
      "discriminator": [
        242,
        91,
        21,
        170,
        5,
        68,
        125,
        64
      ],
      "accounts": [
        {
          "name": "amm",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "id"
              }
            ]
          }
        },
        {
          "name": "migrator"
        },
        {
          "name": "feeVault"
        },
        {
          "name": "lockMaster"
        },
        {
          "name": "lockConfig",
          "docs": [
            "The lock configuration for the AMM"
          ]
        },
        {
          "name": "admin",
          "docs": [
            "The admin of the AMM"
          ]
        },
        {
          "name": "payer",
          "docs": [
            "The account paying for all rents"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "pubkey"
        },
        {
          "name": "fee",
          "type": "u16"
        },
        {
          "name": "startingSolReserves",
          "type": "u64"
        },
        {
          "name": "startingTokenReserves",
          "type": "u64"
        },
        {
          "name": "bondingCurvePoolReserves",
          "type": "u64"
        },
        {
          "name": "migrationReserves",
          "type": "u64"
        },
        {
          "name": "vestingReserves",
          "type": "u64"
        }
      ]
    },
    {
      "name": "deployBondingMint",
      "discriminator": [
        101,
        213,
        96,
        184,
        83,
        204,
        125,
        195
      ],
      "accounts": [
        {
          "name": "amm",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "amm.id",
                "account": "amm"
              }
            ]
          }
        },
        {
          "name": "ammAuthority",
          "docs": [
            "Read-only AMM authority"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "amm"
              },
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "mintBump"
        },
        {
          "name": "mint",
          "docs": [
            "RANDOM: Read only authority"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "amm"
              },
              {
                "kind": "account",
                "path": "mintBump"
              }
            ]
          }
        },
        {
          "name": "mintBase",
          "docs": [
            "This is the mint of the base token."
          ]
        },
        {
          "name": "pool",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "amm"
              },
              {
                "kind": "account",
                "path": "mintBase"
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ]
          }
        },
        {
          "name": "poolAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "amm"
              },
              {
                "kind": "account",
                "path": "mintBase"
              },
              {
                "kind": "account",
                "path": "mint"
              },
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "payer",
          "docs": [
            "The account paying for all rents"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram",
          "docs": [
            "Solana ecosystem accounts"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "deployBondingPool",
      "discriminator": [
        16,
        161,
        40,
        255,
        153,
        78,
        237,
        57
      ],
      "accounts": [
        {
          "name": "amm",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "amm.id",
                "account": "amm"
              }
            ]
          }
        },
        {
          "name": "pool",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "amm"
              },
              {
                "kind": "arg",
                "path": "mintBase"
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ]
          }
        },
        {
          "name": "ammAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "amm"
              },
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "mint",
          "docs": [
            "Token mint account"
          ],
          "writable": true
        },
        {
          "name": "poolTokenAccount",
          "docs": [
            "Pool token account"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "poolAuthority"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "poolBaseAccount",
          "docs": [
            "Pool base token account"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "poolAuthority"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "arg",
                "path": "mintBase"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "poolLockAuthority",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "poolAuthority"
              },
              {
                "kind": "const",
                "value": [
                  108,
                  111,
                  99,
                  107,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "poolTokenLockAccount",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "poolLockAuthority"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "poolAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "amm"
              },
              {
                "kind": "arg",
                "path": "mintBase"
              },
              {
                "kind": "account",
                "path": "mint"
              },
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "payer",
          "docs": [
            "The account paying for all rents"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "distributor",
          "writable": true
        },
        {
          "name": "vesting",
          "writable": true
        },
        {
          "name": "vestingVault",
          "writable": true
        },
        {
          "name": "lock",
          "writable": true
        },
        {
          "name": "lockVault",
          "writable": true
        },
        {
          "name": "lockMaster"
        },
        {
          "name": "lockConfig"
        },
        {
          "name": "distributorVault",
          "writable": true
        },
        {
          "name": "merkleDistributorProgram",
          "address": "FGWk7eUKeGZEmvmeifggHcyyyksLnQSAkKhvK14HUj3n"
        },
        {
          "name": "vestingProgram",
          "address": "BZAEvqxscdTKjEdXG9mdsbMkcbseVx6syTMp7LycVaDs"
        },
        {
          "name": "lockProgram",
          "address": "8izNed2ZfWjdPVr7gjJ1t7mZ8wtzNWc9z5ojawbRMMSH"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "mintBase",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "migrate",
      "discriminator": [
        155,
        234,
        231,
        146,
        236,
        158,
        162,
        30
      ],
      "accounts": [
        {
          "name": "ammConfig",
          "writable": true
        },
        {
          "name": "ammLpMint",
          "writable": true
        },
        {
          "name": "ammCoinMint",
          "writable": true
        },
        {
          "name": "ammPcMint",
          "writable": true
        },
        {
          "name": "ammCoinVault",
          "writable": true
        },
        {
          "name": "ammPcVault",
          "writable": true
        },
        {
          "name": "ammObservationState",
          "writable": true
        },
        {
          "name": "createPoolFee",
          "writable": true
        },
        {
          "name": "amm",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "amm.id",
                "account": "amm"
              }
            ]
          }
        },
        {
          "name": "ammAuthority"
        },
        {
          "name": "poolAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "amm"
              },
              {
                "kind": "account",
                "path": "ammCoinMint"
              },
              {
                "kind": "account",
                "path": "ammPcMint"
              },
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "poolLockAuthority",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "poolAuthority"
              },
              {
                "kind": "const",
                "value": [
                  108,
                  111,
                  99,
                  107,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "poolLockTokenPc",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "poolLockAuthority"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "ammPcMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "poolState",
          "writable": true
        },
        {
          "name": "poolTokenPc",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "poolAuthority"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "ammPcMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "poolTokenCoin",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "poolAuthority"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "ammCoinMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "userTokenPc",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "payer"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "ammPcMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "userTokenCoin",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "payer"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "ammCoinMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "userTokenLp",
          "writable": true
        },
        {
          "name": "payer",
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "raydiumCpSwap",
          "address": "CPMDWBwJDtYax9qW7AyRuVC19Cc4L4Vcy4n2BHAbHkCW"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "swapExactTokensForTokens",
      "discriminator": [
        249,
        86,
        253,
        50,
        177,
        221,
        73,
        162
      ],
      "accounts": [
        {
          "name": "amm",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "amm.id",
                "account": "amm"
              }
            ]
          },
          "relations": [
            "pool"
          ]
        },
        {
          "name": "feeVaultTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "amm.fee_vault",
                "account": "amm"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mintA"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "pool",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "amm"
              },
              {
                "kind": "account",
                "path": "mintA"
              },
              {
                "kind": "account",
                "path": "mintB"
              }
            ]
          }
        },
        {
          "name": "poolAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "pool.amm",
                "account": "pool"
              },
              {
                "kind": "account",
                "path": "mintA"
              },
              {
                "kind": "account",
                "path": "mintB"
              },
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "trader",
          "writable": true,
          "signer": true
        },
        {
          "name": "mintA",
          "relations": [
            "pool"
          ]
        },
        {
          "name": "mintB"
        },
        {
          "name": "poolAccountA",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "poolAuthority"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mintA"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "poolAccountB",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "poolAuthority"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mintB"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "traderAccountA",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "trader"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mintA"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "traderAccountB",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "trader"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mintB"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "payer",
          "docs": [
            "The account paying for all rents"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram",
          "docs": [
            "Solana ecosystem accounts"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "swapA",
          "type": "bool"
        },
        {
          "name": "inputAmount",
          "type": "u64"
        },
        {
          "name": "minOutputAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateFeeParams",
      "discriminator": [
        223,
        116,
        30,
        197,
        161,
        4,
        201,
        146
      ],
      "accounts": [
        {
          "name": "amm",
          "writable": true
        },
        {
          "name": "admin",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "newFee",
          "type": "u16"
        },
        {
          "name": "newFeeVault",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "updateLaunchParams",
      "discriminator": [
        18,
        176,
        82,
        92,
        217,
        29,
        93,
        148
      ],
      "accounts": [
        {
          "name": "amm",
          "writable": true
        },
        {
          "name": "admin",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "newAmm",
          "type": {
            "defined": {
              "name": "amm"
            }
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "amm",
      "discriminator": [
        143,
        245,
        200,
        17,
        74,
        214,
        196,
        135
      ]
    },
    {
      "name": "lockConfig",
      "discriminator": [
        106,
        47,
        238,
        159,
        124,
        12,
        160,
        192
      ]
    },
    {
      "name": "pool",
      "discriminator": [
        241,
        154,
        109,
        4,
        17,
        177,
        109,
        188
      ]
    }
  ],
  "events": [
    {
      "name": "createEvent",
      "discriminator": [
        27,
        114,
        169,
        77,
        222,
        235,
        99,
        118
      ]
    },
    {
      "name": "tradeEvent",
      "discriminator": [
        189,
        219,
        127,
        211,
        78,
        230,
        97,
        238
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidFee",
      "msg": "Invalid fee value"
    },
    {
      "code": 6001,
      "name": "invalidMint",
      "msg": "Invalid mint for the pool"
    },
    {
      "code": 6002,
      "name": "depositTooSmall",
      "msg": "Depositing too little liquidity"
    },
    {
      "code": 6003,
      "name": "outputTooSmall",
      "msg": "Output is below the minimum expected"
    },
    {
      "code": 6004,
      "name": "invariantViolated",
      "msg": "Invariant does not hold"
    },
    {
      "code": 6005,
      "name": "overflow",
      "msg": "overflow"
    },
    {
      "code": 6006,
      "name": "unauthorized",
      "msg": "unauthorized"
    },
    {
      "code": 6007,
      "name": "tradingPaused",
      "msg": "Trading paused. Try again later."
    },
    {
      "code": 6008,
      "name": "lockAlreadyInitialized",
      "msg": "Lock already initialized"
    },
    {
      "code": 6009,
      "name": "distributorAlreadyInitialized",
      "msg": "Distributor already initialized"
    },
    {
      "code": 6010,
      "name": "poolAlreadyInitialized",
      "msg": "Pool already initialized"
    },
    {
      "code": 6011,
      "name": "slippageExceeded",
      "msg": "Slippage exceeded"
    }
  ],
  "types": [
    {
      "name": "amm",
      "docs": [
        "* Protocol configurations"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "docs": [
              "The primary key of the AMM"
            ],
            "type": "pubkey"
          },
          {
            "name": "admin",
            "docs": [
              "Account that has update authority over the AMM struct,",
              "and is able to pause trading."
            ],
            "type": "pubkey"
          },
          {
            "name": "migrator",
            "docs": [
              "The account that has migration authority over all pools."
            ],
            "type": "pubkey"
          },
          {
            "name": "tradingPaused",
            "docs": [
              "Trading paused"
            ],
            "type": "bool"
          },
          {
            "name": "fee",
            "docs": [
              "The fee taken on each trade."
            ],
            "type": "u16"
          },
          {
            "name": "feeVault",
            "docs": [
              "The vault that accepts the trading fees"
            ],
            "type": "pubkey"
          },
          {
            "name": "lockMaster",
            "docs": [
              "The wallet that approves the unlocking of tokens for marketcap-based milestones."
            ],
            "type": "pubkey"
          },
          {
            "name": "startingSolReserves",
            "docs": [
              "The initial starting liquidity"
            ],
            "type": "u64"
          },
          {
            "name": "startingTokenReserves",
            "type": "u64"
          },
          {
            "name": "bondingCurvePoolReserves",
            "type": "u64"
          },
          {
            "name": "migrationReserves",
            "type": "u64"
          },
          {
            "name": "vestingReserves",
            "type": "u64"
          },
          {
            "name": "lockConfig",
            "type": "pubkey"
          },
          {
            "name": "padding",
            "type": {
              "defined": {
                "name": "bonding_curve::state::Padding",
                "generics": [
                  {
                    "kind": "const",
                    "value": "256"
                  }
                ]
              }
            }
          }
        ]
      }
    },
    {
      "name": "createEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "amm",
            "type": "pubkey"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "baseAmount",
            "type": "u64"
          },
          {
            "name": "quoteAmount",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "lockConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lockMilestones",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "marketcapLockbox"
                  }
                },
                8
              ]
            }
          },
          {
            "name": "numMilestones",
            "type": "u8"
          },
          {
            "name": "padding",
            "type": {
              "defined": {
                "name": "lock::state::Padding",
                "generics": [
                  {
                    "kind": "const",
                    "value": "256"
                  }
                ]
              }
            }
          }
        ]
      }
    },
    {
      "name": "marketcapLockbox",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketcap",
            "type": "u64"
          },
          {
            "name": "identifier",
            "type": {
              "array": [
                "u8",
                8
              ]
            }
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "pool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amm",
            "docs": [
              "Primary key of the AMM"
            ],
            "type": "pubkey"
          },
          {
            "name": "creator",
            "docs": [
              "Creator pubkey"
            ],
            "type": "pubkey"
          },
          {
            "name": "mintA",
            "docs": [
              "Mint of token A"
            ],
            "type": "pubkey"
          },
          {
            "name": "mintB",
            "docs": [
              "Mint of token B"
            ],
            "type": "pubkey"
          },
          {
            "name": "reservesA",
            "docs": [
              "Virtual reserves for token A"
            ],
            "type": "u64"
          },
          {
            "name": "reservesB",
            "docs": [
              "Virtual reserves for token A"
            ],
            "type": "u64"
          },
          {
            "name": "migrateReserveA",
            "type": "u64"
          },
          {
            "name": "migrateReserveB",
            "type": "u64"
          },
          {
            "name": "poolInitialized",
            "type": "bool"
          },
          {
            "name": "distributorInitialized",
            "type": "bool"
          },
          {
            "name": "lockInitialized",
            "type": "bool"
          },
          {
            "name": "padding",
            "type": {
              "defined": {
                "name": "bonding_curve::state::Padding",
                "generics": [
                  {
                    "kind": "const",
                    "value": "256"
                  }
                ]
              }
            }
          }
        ]
      }
    },
    {
      "name": "tradeEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "trader",
            "type": "pubkey"
          },
          {
            "name": "isBuy",
            "type": "bool"
          },
          {
            "name": "baseAmount",
            "type": "u64"
          },
          {
            "name": "quoteAmount",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "virtualSolReserves",
            "type": "u64"
          },
          {
            "name": "virtualTokenReserves",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "bonding_curve::state::Padding",
      "generics": [
        {
          "kind": "const",
          "name": "n",
          "type": "usize"
        }
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "array": [
              "u8",
              {
                "generic": "n"
              }
            ]
          }
        ]
      }
    },
    {
      "name": "lock::state::Padding",
      "generics": [
        {
          "kind": "const",
          "name": "n",
          "type": "usize"
        }
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "array": [
              "u8",
              {
                "generic": "n"
              }
            ]
          }
        ]
      }
    }
  ],
  "constants": [
    {
      "name": "authoritySeed",
      "type": "bytes",
      "value": "[97, 117, 116, 104, 111, 114, 105, 116, 121]"
    },
    {
      "name": "lockAuthoritySeed",
      "type": "bytes",
      "value": "[108, 111, 99, 107, 95, 97, 117, 116, 104, 111, 114, 105, 116, 121]"
    }
  ]
};