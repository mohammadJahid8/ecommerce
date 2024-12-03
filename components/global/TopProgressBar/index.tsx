"use client"
import React from 'react';
import { Next13ProgressBar } from 'next13-progressbar'

const TopProgressBar = () => {
    return (
        <Next13ProgressBar
            height="3px" color="#4382D6" options={{ showSpinner: false }} showOnShallow
        />
    )
}

export default TopProgressBar;