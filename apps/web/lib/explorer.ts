/**
 * Derives Stellar block explorer URLs based on the configured network or explorer override.
 */

export function getExplorerBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_EXPLORER_URL) {
    return process.env.NEXT_PUBLIC_EXPLORER_URL.replace(/\/+$/, "");
  }
  const network = (process.env.NEXT_PUBLIC_STELLAR_NETWORK || "testnet").toLowerCase();
  const segment = network === "mainnet" || network === "public" ? "public" : "testnet";
  return `https://stellar.expert/explorer/${segment}`;
}

export function explorerTxUrl(txHash: string): string {
  return `${getExplorerBaseUrl()}/tx/${txHash}`;
}

export function explorerContractUrl(contractId: string): string {
  return `${getExplorerBaseUrl()}/contract/${contractId}`;
}
