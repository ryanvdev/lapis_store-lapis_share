import * as React from 'react';
import lapisLog from '../../../../core/lapisLog';

import './LapisSelectionInput.scss';

export interface ILapisSelectionInputProps {
    value?:string;

    onTabPress?:(v: string)=>any;
    onEnterPress?:(v: string)=>any;
    onArrowUpPress?:(v: string)=>any;
    onArrowDownPress?:(v: string)=>any;
    onOtherKeyPress?:(v: string)=>any;
    onFocus?: ()=>any;
    onEmpty?: ()=>any;
}

export interface ILapisSelectionInputRef{
    val: (v?:string)=>string|undefined|void;
    empty: ()=>void;
    focus: (v:boolean)=>void;
}

function LapisSelectionInput (props: ILapisSelectionInputProps, ref: React.RefObject<ILapisSelectionInputRef> & any) {
    const {
        value,
        onFocus,
        onTabPress,
        onEnterPress,
        onArrowUpPress,
        onArrowDownPress,
        onOtherKeyPress,
        onEmpty
    } = props;

    const inputElmntRef = React.useRef<HTMLInputElement>(null);


    // functions
    const inputVal = React.useCallback((val:string|undefined=undefined)=>{
        if(!inputElmntRef.current || inputElmntRef.current === null){
            lapisLog('WARNING', 'Input element in LapisSelectionInput is null or undefined !');
            return;
        }

        if(val===undefined) {
            return inputElmntRef.current.value
        }

        inputElmntRef.current.value = val;

        // dispatch event
        if(val.length === 0){
            if(onEmpty) onEmpty();
        }
    }, [onEmpty]);

    // 
    React.useImperativeHandle(ref, () => ({
        val: (v?:string) => {
            inputVal(v);
        },
        empty: ()=>{
            inputVal('');
        },
        focus: (v:boolean)=>{
            if(!inputElmntRef.current || inputElmntRef.current===null) return;
            if(v){
                inputElmntRef.current.focus();
            }
            else{
                inputElmntRef.current.blur();
            }
        }
    } as ILapisSelectionInputRef));

    // Event handler
    const handlerFocus = React.useCallback(()=>{

        // Dispatch event
        if(onFocus) onFocus();
    }, [onFocus]);

    const handlerKeyUp = React.useCallback((e:React.KeyboardEvent<HTMLInputElement>)=>{
        const inputValue:string = e.currentTarget.value;
        
        switch(e.key){
            case 'Enter': {
                if(onEnterPress) onEnterPress(inputValue);
                return;
            }
            case 'ArrowUp': {
                if(onArrowUpPress) onArrowUpPress(inputValue);
                return;
            }
            case 'ArrowDown': {
                if(onArrowDownPress) onArrowDownPress(inputValue);
                return;
            }
            case 'Tab': {
                if(onTabPress) onTabPress(inputValue);
                return;
            }
            default: {
                if(inputValue.length === 0){
                    if(onEmpty) onEmpty();
                    return;
                }
                if(onOtherKeyPress) onOtherKeyPress(inputValue);
            }
        }
    }, [onEnterPress, onArrowUpPress, onArrowDownPress, onTabPress, onEmpty, onOtherKeyPress]);

    const handlerKeyDown = React.useCallback((e:React.KeyboardEvent<HTMLInputElement>)=>{
        switch(e.key){
            case 'ArrowUp':
            case 'ArrowDown':{
                e.preventDefault();
                break;
            }
        }
    },[]);

    React.useEffect(()=>{
        if(value) {
            inputVal(value);
        }
    },[value, inputVal]);


    return (
        <input
            ref={inputElmntRef}
            type='text'
            onFocus={handlerFocus}
            onKeyUp={handlerKeyUp}
            onKeyDown={handlerKeyDown}
        />
    );
}

export default React.memo(
    React.forwardRef<ILapisSelectionInputRef, ILapisSelectionInputProps>(LapisSelectionInput)
);