import * as React from 'react';

import './LapisSelectionIconContainer.scss';

export interface ILapisSelectionIconContainerProps {
    showIcon?:boolean;
    icon?:string;
    iconColor?:string;
    message?:string
}

export default function LapisSelectionIconContainer (props: ILapisSelectionIconContainerProps) {
    const showIconClassName:string =  props.showIcon ? ' show-icon' : '';
    const iconName:string = props.icon || '';
    const iconStyle:React.CSSProperties|undefined = !props.iconColor ? undefined: { color: props.iconColor };
    const showMessageClassName:string = !props.message ? '': ' show-message';
    const message:string = props.message ||  '';
    
    return (
        <div className={`lapis-selection-icon-container${showIconClassName}`}>

            <div className='icon' style={iconStyle}>
                {iconName}
            </div>

            <div className={`message${showMessageClassName}`}>
                {message}
            </div>

        </div>
    );
}
