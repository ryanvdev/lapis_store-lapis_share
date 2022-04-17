import * as React from 'react';
import { TLapisReactElements } from '../../../../core/LapisType';
import ILapisSelectionCurrentOption from '../ILapisSelectionCurrentOption';

import './LapisSelectionOptions.scss';

export interface ILapisSelectionOptionsProps {
    maxLength?: number;
    options: ILapisSelectionCurrentOption[];
    selectedIndex: number;
    markPosition: number;
    onSelected?: (index:number)=>any;
}

export default function LapisSelectionOptions (props: ILapisSelectionOptionsProps) {
    const {options, selectedIndex, markPosition, onSelected, maxLength} = props;

    /**
     * check if label  
     * @param label label of option
     * @returns label with length is maxLength - 3 and before is three dot
     */
    const standardLabel = (label:string):string=>{
        if(!maxLength) return label;

        if(label.length < maxLength) return label;

        return `...${label.slice(0, maxLength-3)}`;
    }

    // event

    const handlerOptionClick = React.useCallback((index: number)=>()=>{
        if(onSelected) onSelected(index);
    }, [onSelected]);


    //
    const renderOption = (): TLapisReactElements => {
        if (!options || options.length === 0) return undefined;

        return options.map((option, i) => {
            const selectedClassName = selectedIndex === option.index ? 'selected' : '';
            const markClassName = markPosition === i ? 'mark' : '';

            //
            return (
                <li
                    key={`${i}-${option.value}`}
                    className={`${selectedClassName} ${markClassName}`}
                    >
                    <div
                        onClick={handlerOptionClick(option.index)}
                    >
                        <div>
                            {standardLabel(option.label)}
                        </div>
                    </div>
                </li>
            );
        });
    };


    return (
        <div className='lapis-selection-options'>
            <ul>
                {renderOption()}
            </ul>
        </div>
    );
}
