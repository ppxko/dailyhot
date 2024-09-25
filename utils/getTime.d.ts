interface CurrentDateTime {
    year: string;
    month: string;
    day: string;
    hour: string;
    minute: string;
    second: string;
}
export declare const getTime: (timeInput: string | number) => number | null;
export declare const getCurrentDateTime: (padZero?: boolean) => CurrentDateTime;
export {};
//# sourceMappingURL=getTime.d.ts.map