export declare enum BatchUpdateType {
    PERCENTAGE = "PERCENTAGE",
    FIXED = "FIXED"
}
export declare class BatchUpdateProductDto {
    type: BatchUpdateType;
    value: number;
    stockAdjustment?: number;
}
