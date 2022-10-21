interface ResultType {
    success: boolean;
    msg?: string;
    data?: any;
}
export declare class TokenList {
    private TOKENS_ELEMENT;
    private JSON_ELEMENT;
    private errorMessage;
    private successData;
    private getVersion;
    private checkVersionLater;
    private checkTokenChanged;
    private handleNotifiction;
    private isValidURL;
    private isListsOver;
    private isNotEmptyString;
    private isPositiveInteger;
    private isTimestamp;
    private hasSpace;
    private tokensElementValidate;
    private tokensValidate;
    private jsonValidate;
    private validateFunc;
    private setTokensDataIntoLocal;
    private getDefaultListSet;
    getTokenListFromUri: (uri: string) => Promise<ResultType>;
    addTokenList: (customTokenUri: string, maxLists?: number, maxTokens?: number) => Promise<ResultType>;
    addDefaultTokenList: () => Promise<ResultType>;
    getTokenListFromLocal: () => ResultType | {
        byUrl: {};
    };
    getUpdateInfo: ({ maxLists }?: {
        maxLists?: number | undefined;
    }) => Promise<ResultType>;
    updateTokenList: (selectedListUrl: string, maxTokens?: number) => Promise<ResultType>;
    deleteTokenList: (uri: string | number) => ResultType;
}
export declare const TokenListProvider: TokenList;
export {};
