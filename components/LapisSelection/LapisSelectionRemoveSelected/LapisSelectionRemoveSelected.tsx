import * as React from 'react';

import './LapisSelectionRemoveSelected.scss';

export interface ILapisSelectionRemoveSelectedProps {
    onClick?:()=>any;
}

export default function LapisSelectionRemoveSelected (props: ILapisSelectionRemoveSelectedProps) {
    return (
        <div className='lapis-selection-remove-selected'>
            <div onClick={props.onClick}>
                remove_done
            </div>
        </div>
    );
}
