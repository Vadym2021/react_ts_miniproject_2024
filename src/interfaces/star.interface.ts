import React from "react";

export interface RatingProps {
    className?: string;
    count: number;
    value: number;
    color?: string;
    hoverColor?: string;
    activeColor?: string;
    size?: number;
    edit?: boolean;
    isHalf?: boolean;
    onChange?: (value: number) => void;
    emptyIcon?: React.ReactElement;
    halfIcon?: React.ReactElement;
    fullIcon?: React.ReactElement;
}

export interface IconProps {
    size?: number;
    color?: string;
}