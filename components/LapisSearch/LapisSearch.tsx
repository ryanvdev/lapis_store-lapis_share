import React, { useCallback, useState } from 'react';
import InputWrap from './InputWrap';

import './LapisSearch.scss';
import OfferWrap from './OfferWrap';

export interface ILapisSearchProps {}

export default function LapisSearch(props: ILapisSearchProps) {
    const [displayOffer, setDisplayOffer] = useState('');

    // Event handler
    const handlerInputFocus = useCallback(() => {
        setDisplayOffer('display-offer');
    }, []);

    const handlerClickOutSide = useCallback(() => {
        setDisplayOffer('');
    }, []);

    return (
        <div className={`lapis-search ${displayOffer}`}>
            <div className='wrap'>
                <InputWrap onFocus={handlerInputFocus} />
                <OfferWrap />
            </div>
            <div className='cover' onMouseDown={handlerClickOutSide}></div>
        </div>
    );
}
