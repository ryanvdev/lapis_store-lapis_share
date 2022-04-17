import * as React from 'react';

import './LapisSelectionTitle.scss';

export interface ILapisSelectionTitleProps {
    value?:string;
}

export default function LapisSelectionTitle (props: ILapisSelectionTitleProps) {
    return (
        <div className='lapis-selection-title'>
            <div>{props.value}</div>
        </div>
    );
}
