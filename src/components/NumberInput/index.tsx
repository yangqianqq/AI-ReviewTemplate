import React, { useState, useEffect } from 'react';
import { AtInputNumber } from 'taro-ui';

import './index.scss';

interface indexProps {
    min?: number;
    max?: number;
    step?: number;
    num: number;
    handleClick: (value: number) => void;
    disabled?: boolean;
}
function Index(props: indexProps) {
    const min = props.min || 1;
    const max = props.max || 99;
    const step = props.step || 1;
    const num = props.num || 1;

    return (
        <AtInputNumber
            className="numInput"
            type="number"
            min={min}
            max={max}
            step={step}
            value={num}
            disabledInput
            disabled={props.disabled}
            onChange={val => {
                props.handleClick(val);
            }}
        />
    );
}

export default Index;
