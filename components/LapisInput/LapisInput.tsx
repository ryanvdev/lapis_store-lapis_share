import * as React from 'react';

import './LapisInput.scss';

export interface ILapisInputProps {
    className?: string
    type?: 'number' | 'text' | 'date' | 'datetime-local';
    value?: string;
    message?: string;
    icon?: 'verified' | 'new_releases' | string;
    iconColor?: string;
    showIcon?: boolean;
    title?: string;
    min?: string | number;
    max?: string | number;
    minLength?: number;
    validator?: RegExp;

    onChange?: (v: string) => void;
    onBlur?: (v: string) => void;
    onFocus?: (v: string) => void;
    onEnter?: (v: string) => void;
    onKeydown?: (v: string) => void;
}

export interface ILapisInputRef {
    // if v is undefined then return value else set v is value of inputElmnt
    val: (v?: string) => string | undefined | void;
    focus: () => void;
}

function LapisInput(props: ILapisInputProps, ref: React.RefObject<ILapisInputRef> & any) {
    const [status, setStatus] = React.useState<'' | 'typing'>('');
    const [inputValue, setInputValue] = React.useState<string>('');

    const inputElmntRef = React.useRef<HTMLInputElement>(null);

    const { onChange, onBlur, onEnter, onKeydown, onFocus, validator } = props;

    //
    React.useImperativeHandle(ref, () => ({
        val: (v?: string) => {
            if (!v) return inputValue;
            setInputValue(v);
        },
        focus: () => {
            if (inputElmntRef.current) {
                inputElmntRef.current.focus();
            }
        },
    }));

    // Event handler

    const handlerFocus = React.useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            const v = e.currentTarget.value;
            //
            setStatus('typing');
            //
            if (onFocus) {
                onFocus(v);
            }
            //
        },
        [onFocus],
    );

    const handlerBlur = React.useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            const v = e.currentTarget.value;
            //
            if (v.length === 0) {
                setStatus('');
            }
            // call event
            if (onBlur) {
                onBlur(v);
            }
        },
        [onBlur],
    );

    const handlerChange = (e: React.FormEvent<HTMLInputElement>) => {
        const v: string = e.currentTarget.value;
        //
        if (validator && validator.test(v) === false) {
            return;
        }
        //
        setInputValue(v);
        //
        if (onChange) {
            onChange(v);
        }
    };

    const handlerKeydown = React.useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            const key = e.key;
            if (key === 'Enter' && onEnter) {
                onEnter(e.currentTarget.value);
            }
            //
            if (onKeydown) {
                onKeydown(e.currentTarget.value);
            }
            //
        },
        [onEnter, onKeydown],
    );

    // component dit mount
    React.useEffect(() => {
        if (props.value) {
            setStatus('typing');
            setInputValue(props.value);
        }
    }, [props.value]);

    //
    return (
        <div className={`lapis-ui lapis-input ${props.className || ''} ${status}`}>
            <div className='title'>
                <div>{props.title}</div>
            </div>

            <div className='input-wrap'>
                <input
                    ref={inputElmntRef}
                    type={props.type || 'text'}
                    autoComplete='off'
                    value={inputValue}
                    min={props.min}
                    max={props.max}
                    minLength={props.minLength}
                    onFocus={handlerFocus}
                    onBlur={handlerBlur}
                    onChange={handlerChange}
                    onKeyDown={handlerKeydown}
                />
                <div className={props.showIcon ? 'show-icon' : ''}>
                    <div className='icon' style={{ color: props.iconColor }}>
                        {props.icon}
                    </div>
                    <div className={`message ${props.message && 'show-message'}`}>{props.message}</div>
                </div>
            </div>

            <div className='line'>
                <div />
            </div>
        </div>
    );
}

export default React.memo(React.forwardRef<ILapisInputRef, ILapisInputProps>(LapisInput));
