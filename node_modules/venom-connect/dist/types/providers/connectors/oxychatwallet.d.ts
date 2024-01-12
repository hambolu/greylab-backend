import { Callbacks } from "../../types";
export declare const oxychatWalletName = "Oxychat Wallet";
/**
 * oxychatProvider: ProviderRpcClient
 */
export declare const checkIsProviderExist: (oxychatProvider: any) => Promise<boolean>;
declare const oxychatWallet: {
    extension: {
        connector: (OxychatProvider: any, options: any, callbacks: Callbacks) => Promise<any>;
        authChecker: (OxychatProvider: any, options: any) => Promise<{
            auth: any;
            fallback: any;
        } | undefined>;
        standalone: (OxychatProvider: any, options: any) => Promise<any>;
    };
    mobile: {
        connector: () => any;
    };
    ios: {
        connector: () => any;
    };
    android: {
        connector: () => any;
    };
};
export default oxychatWallet;
//# sourceMappingURL=oxychatwallet.d.ts.map