import * as React from 'react';

import optimizeSearchInput from '../../../core/optimizeSearchInput';
import ILapisSelectionCurrentOption from './ILapisSelectionCurrentOption';
import ILapisSelectionEventData from './ILapisSelectionEventData';
import ILapisSelectionOption from './ILapisSelectionOption';
import LapisSelectionIconContainer from './LapisSelectionIconContainer';
import LapisSelectionInput, { ILapisSelectionInputRef } from './LapisSelectionInput';
import LapisSelectionLabelSelected from './LapisSelectionLabelSelected';
import LapisSelectionOptions from './LapisSelectionOptions';
import LapisSelectionUnderline from './LapisSelectionUnderline';

import './LapisSelection.scss';
import LapisSelectionTitle from './LapisSelectionTitle';
import LapisSelectionRemoveSelected from './LapisSelectionRemoveSelected';

export interface ILapisSelectionProps {
    title?: string;
    options?: ILapisSelectionOption[];
    maxLength?: number;
    selectedValue?: string;
    message?: string;
    
    icon?:string;
    iconColor?:string;
    showIcon?:boolean;

    onSelected?: (e: ILapisSelectionEventData) => any | Promise<any>;
    onBlur?: (e: ILapisSelectionEventData) => any | Promise<any>;
}

function LapisSelection(props: ILapisSelectionProps) {
    const {options, onSelected, selectedValue} = props;

    // states
    const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);
    const [markPosition, setMarkPosition] = React.useState<number>(-1);

    const [selectingClassName, setSelectingClassName] = React.useState<' selecting'| ''>('');
    const [selectedClassName, setSelectedClassName] = React.useState<' selected'| ''>('');
    const [inputEmptyClassName, setInputEmptyClassName] = React.useState<' empty'| ''>('');

    const [currentOptions, setCurrentOptions] = React.useState<ILapisSelectionCurrentOption[]>([]);

    // refs
    // const selectedIndexRef = React.useRef<number>(selectedIndex);
    // selectedIndexRef.current = selectedIndex;

    const lengthOfCurrentOptions = React.useRef<number>(-1);
    lengthOfCurrentOptions.current = currentOptions.length;

    const markPositionRef = React.useRef<number>(-1);
    markPositionRef.current = markPosition;

    const currentOptionsRef = React.useRef<ILapisSelectionCurrentOption[]>(currentOptions);
    currentOptionsRef.current = currentOptions;

    const lapisSelectionInputRef = React.useRef<ILapisSelectionInputRef>(null);

    // const memoLapisSelectionInputValueRef = React.useRef<string>('');

    // memo
    const optionsSorted = React.useMemo<ILapisSelectionCurrentOption[]>(()=>{
        if(!options) return [];
        const tmpOptions:ILapisSelectionCurrentOption[] = [];

        options.forEach((option, index)=>{
            tmpOptions.push({
                ...option,
                index,
            });
        });

        tmpOptions.sort((optionA, optionB)=>{
            if(optionA.label > optionB.label) return 1;
            if(optionA.label < optionB.label) return -1;

            if(optionA.value > optionB.value) return 1;
            if(optionA.value < optionB.value) return -1;

            return 0;
        });

        return tmpOptions;
    }, [options])

    // functions

    const makeLabelSelected = ():string=>{
        if(selectedIndex < 0) return '';
        if(!options) return '';
        if(selectedIndex >= options.length) return '';

        return options[selectedIndex].label;
    }

    const filterOptions = React.useCallback((keyword?: string):void=>{
        const tmpOptions = [...optionsSorted]

        if(!keyword){
            setCurrentOptions(tmpOptions);
            return;
        }

        const standardKeyword = optimizeSearchInput(keyword);

        setCurrentOptions(tmpOptions.filter((option)=>{
            const standardLabel = optimizeSearchInput(option.label);
            return standardLabel.includes(standardKeyword);
        }));

    }, [optionsSorted]);

    const updateSelected = React.useCallback((index: number)=>{
        setSelectedIndex(index);

        let optionSelected:ILapisSelectionOption|undefined = undefined;

        if(index < 0){
            setSelectedClassName('');
        }
        else{
            setSelectedClassName(' selected');
            optionSelected = !options ? undefined : {...options[index]};
        }
        
        // dispatch event
        if(onSelected) onSelected({
            index,
            option: optionSelected
        });

    }, [onSelected, options]);

    const displayOptions = React.useCallback(()=>{
        setSelectingClassName(' selecting');
    }, []);

    const hideOptions = React.useCallback(()=>{
        setSelectingClassName('');
    },[]);

    const updateMarkPosition = React.useCallback((v:number)=>{
        setMarkPosition((currentMarkPosition:number)=>{
            const newMarkPosition = currentMarkPosition + v;
            if(newMarkPosition < -1){
                return -1;
            }
            if(newMarkPosition >= lengthOfCurrentOptions.current){
                return lengthOfCurrentOptions.current - 1;
            }
            if(newMarkPosition >= 0 && newMarkPosition < currentOptionsRef.current.length){
                if(lapisSelectionInputRef.current){
                    lapisSelectionInputRef.current.val(currentOptionsRef.current[newMarkPosition].label);
                }
            }
            return newMarkPosition;
        });
    }, []);

    // Event handler
    const handlerCoverClick = React.useCallback(()=>{
        hideOptions();
    }, [hideOptions]);

    const handlerLapisSelectionInputFocus = React.useCallback(()=>{
        if(lapisSelectionInputRef.current) lapisSelectionInputRef.current.empty();

        setMarkPosition(-1);
        displayOptions();
    }, [displayOptions]);

    const handlerLapisSelectionOptionsSelected = React.useCallback((index:number)=>{
        updateSelected(index);
        hideOptions();

        // dispatch event
    }, [updateSelected, hideOptions]);

    const handlerLapisSelectionInputArrowDownPress = React.useCallback((v:string)=>{
        // if(markPositionRef.current < 0){
        //     memoLapisSelectionInputValueRef.current = v;
        // }
        updateMarkPosition(1);
    }, [updateMarkPosition]);

    const handlerLapisSelectionInputArrowUpPress = React.useCallback((v:string)=>{
        // if(markPositionRef.current === 0){
        //     if(lapisSelectionInputRef.current){
        //         lapisSelectionInputRef.current.val(memoLapisSelectionInputValueRef.current);
        //     }
        // }
        updateMarkPosition(-1);
        
    }, [updateMarkPosition]);

    const handlerLapisSelectionInputEnterPress = React.useCallback((v:string)=>{
        if(markPositionRef.current < 0) return;
        if(markPositionRef.current >= currentOptionsRef.current.length) return;

        // blur input
        if(lapisSelectionInputRef.current && lapisSelectionInputRef.current !== null){
            lapisSelectionInputRef.current.focus(false);
        }
        
        updateSelected(currentOptionsRef.current[markPositionRef.current].index);
        hideOptions();
    }, [updateSelected, hideOptions]);

    const handlerLapisSelectionInputOtherKeyPress = React.useCallback((v:string)=>{
        filterOptions(v);
        setMarkPosition(-1);
        
        if(v.length !== 0) setInputEmptyClassName('');
    }, [filterOptions]);

    const handlerLapisSelectionInputEmpty = React.useCallback(()=>{
        filterOptions();
        setInputEmptyClassName(' empty');
    }, [filterOptions]);

    const handlerLapisSelectionRemoveSelectedClick = React.useCallback(()=>{
        updateSelected(-1);
    }, [updateSelected]);

    React.useEffect(()=>{
        // if selectedValue of props is undefined
        if(!selectedValue){
            setSelectedIndex(-1);
            setSelectedClassName('')
            return;
        }

        // 
        const selectedOption = optionsSorted.find((option) => option.value === selectedValue);

        // if not selected
        if(!selectedOption) {
            setSelectedIndex(-1);
            setSelectedClassName('')
            return;
        }

        // if selected
        const index = selectedOption.index;
        setSelectedIndex(index);
        setSelectedClassName(' selected');
    }, [selectedValue, optionsSorted]);

    return (
        <div className={`lapis-ui lapis-selection${selectedClassName}${selectingClassName}${inputEmptyClassName}`}>
            <div className='cover' onClick={handlerCoverClick}></div>
            <div className='lapis-selection-container'>
                <LapisSelectionTitle value={props.title}/>

                <div className='lapis-input-container'>
                    <LapisSelectionLabelSelected value={makeLabelSelected()}/>

                    <LapisSelectionInput
                        ref={lapisSelectionInputRef}
                        onFocus={handlerLapisSelectionInputFocus}
                        onArrowDownPress={handlerLapisSelectionInputArrowDownPress}
                        onArrowUpPress={handlerLapisSelectionInputArrowUpPress}
                        onEnterPress={handlerLapisSelectionInputEnterPress}
                        onOtherKeyPress={handlerLapisSelectionInputOtherKeyPress}
                        onEmpty={handlerLapisSelectionInputEmpty}
                    />

                    <LapisSelectionRemoveSelected
                        onClick={handlerLapisSelectionRemoveSelectedClick}
                    />

                    {/* Include message which display when icon is hovering*/}
                    <LapisSelectionIconContainer
                        icon={props.icon}
                        iconColor={props.iconColor}
                        showIcon={props.showIcon}
                        message={props.message}
                    />
                </div>

                <LapisSelectionUnderline/>
                
                <LapisSelectionOptions
                    options={currentOptions}
                    markPosition={markPosition}
                    selectedIndex={selectedIndex}
                    onSelected={handlerLapisSelectionOptionsSelected}
                />
            </div>
        </div>
    );
}

export default React.memo(LapisSelection);
