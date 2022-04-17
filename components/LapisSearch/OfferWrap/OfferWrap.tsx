import * as React from 'react';
import { Link } from 'react-router-dom';
import './OfferWrap.scss';

export interface IOfferWrapProps {}

export default function OfferWrap(props: IOfferWrapProps) {
    return (
        <div className='offer-wrap'>
            <div className='line'>
                <div></div>
            </div>
            <div className='title'>
                <div>Đề xuất cho bạn</div>
            </div>
            <ul>
                <li>
                    <div>
                        <Link to={'home1'}>Item 1</Link>
                    </div>
                </li>
                <li>
                    <div>
                        <Link to={'home2'}>Item 2</Link>
                    </div>
                </li>
                <li>
                    <div>
                        <Link to={'home3'}>Item 3</Link>
                    </div>
                </li>
            </ul>
        </div>
    );
}
