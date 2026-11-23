import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { getExplorerBaseUrl, explorerTxUrl, explorerContractUrl } from "./explorer";

describe("explorer helpers", () => {
  const origEnv = process.env;

  beforeEach(() => {
    process.env = { ...origEnv };
  });

  afterEach(() => {
    process.env = origEnv;
  });

  it("defaults to testnet when env is unset", () => {
    delete process.env.NEXT_PUBLIC_STELLAR_NETWORK;
    delete process.env.NEXT_PUBLIC_EXPLORER_URL;
    expect(getExplorerBaseUrl()).toBe("https://stellar.expert/explorer/testnet");
    expect(explorerTxUrl("abc")).toBe("https://stellar.expert/explorer/testnet/tx/abc");
    expect(explorerContractUrl("C123")).toBe("https://stellar.expert/explorer/testnet/contract/C123");
  });

  it("handles testnet explicitly", () => {
    process.env.NEXT_PUBLIC_STELLAR_NETWORK = "testnet";
    expect(getExplorerBaseUrl()).toBe("https://stellar.expert/explorer/testnet");
  });

  it("handles mainnet and public values", () => {
    process.env.NEXT_PUBLIC_STELLAR_NETWORK = "mainnet";
    expect(getExplorerBaseUrl()).toBe("https://stellar.expert/explorer/public");

    process.env.NEXT_PUBLIC_STELLAR_NETWORK = "public";
    expect(getExplorerBaseUrl()).toBe("https://stellar.expert/explorer/public");
  });

  it("respects NEXT_PUBLIC_EXPLORER_URL override", () => {
    process.env.NEXT_PUBLIC_EXPLORER_URL = "https://custom.explorer.com/";
    expect(getExplorerBaseUrl()).toBe("https://custom.explorer.com");
    expect(explorerTxUrl("xyz")).toBe("https://custom.explorer.com/tx/xyz");
  });
});
