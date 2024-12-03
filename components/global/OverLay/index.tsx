"use client"
import React from 'react';
import css from './index.module.css';

interface IProps {
    onClick: () => void
    style?: any
}

export const OverLay = (props: IProps) => {
    return  <div onClick={props.onClick} style={props.style} className={css.overlay}>
    </div >
}