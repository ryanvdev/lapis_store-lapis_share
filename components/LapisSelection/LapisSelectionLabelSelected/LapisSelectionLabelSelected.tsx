import * as React from 'react';

import './LapisSelectionLabelSelected.scss';

export interface ILapisSelectionLabelSelectedProps {
    value?: string
}

export default function LapisSelectionLabelSelected (props: ILapisSelectionLabelSelectedProps) {
    return (
        <div className='lapis-selection-label-selected'>
            <div>{props.value}</div>
        </div>
    );
}
