import { ProviderOptions } from "../../types";
export declare const oxychatDefaultLinks: {
    ios: undefined;
    android: undefined;
    qr: undefined;
    extension: {
        browser: string;
        link: string | null;
    }[];
};
export declare const getOxyQr: (link?: string) => string;
export declare const getOxyIos: (link?: string) => string;
export declare const getOxyAndroid: (link?: string) => string;
export declare const oxychatwallet: ProviderOptions;
//# sourceMappingURL=oxychatwallet.d.ts.map