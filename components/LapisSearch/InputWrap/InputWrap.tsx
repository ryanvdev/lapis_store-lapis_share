import React from 'react';

import './InputWrap.scss';

export interface IInputWrapProps {
    onFocus?: () => void;
    onBlur?: () => void;
    onButtonSearchClick?: () => void;
}

export default function InputWrap(props: IInputWrapProps) {
    return (
        <div className='input-wrap'>
            <input
                type='text'
                autoComplete='off'
                onFocus={props.onFocus}
                onBlur={props.onBlur}
            />
            <button type='button' onClick={props.onButtonSearchClick}></button>
        </div>
    );
}
