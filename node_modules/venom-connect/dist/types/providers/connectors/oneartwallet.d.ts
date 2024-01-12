import { Callbacks } from "../../types";
export declare const oneartWalletName = "OneArt Wallet";
/**
 * oneartProvider: ProviderRpcClient
 */
export declare const checkIsProviderExist: (oneartProvider: any) => Promise<boolean>;
declare const oneartWallet: {
    extension: {
        connector: (OneartProvider: any, options: any, callbacks: Callbacks) => Promise<any>;
        authChecker: (OneartProvider: any, options: any) => Promise<{
            auth: any;
            fallback: any;
        } | undefined>;
        standalone: (OneartProvider: any, options: any) => Promise<any>;
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
export default oneartWallet;
//# sourceMappingURL=oneartwallet.d.ts.map