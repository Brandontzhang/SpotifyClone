import { useEffect, useState } from 'react';
import { CiPlay1 } from 'react-icons/ci/index';
import { JsxElement } from 'typescript';

type CircleProps = {
    size : number,
    strokeWidth : number,
    progressBarClassName : string
    percentage : number, 
    children : string | JSX.Element | JSX.Element[]
}

export const ProgressPlayButton = (props : CircleProps) => {

    const {size, strokeWidth, progressBarClassName, children} = props;
    const [percentage, setPercentage] = useState(props.percentage);
    const [dash, setDash] = useState(0);


    const viewBox : string = `0 0 ${size} ${size}`;
    const radius : number =  (size - strokeWidth) / 2;

    // Calculations for progress circle
    const circumference = radius * Math.PI * 2;


    useEffect(() => {
        setPercentage(props.percentage);
        setDash((percentage * circumference) / 100);
    }, [props.percentage]);

    return (
        <div>
            <div className='absolute flex justify-center items-center w-[125px] h-[125px]'>
                {children}
            </div>
            <svg className="fill-none stroke-primary" width="125px" height="125px" viewBox={viewBox}>
                <circle 
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={`${strokeWidth}px`}
                />
                <circle
                    className={`transition-all duration-500 ${progressBarClassName}`}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={`${strokeWidth}px`}
                    transform={`rotate(-90 ${size /2} ${size / 2})`}
                    strokeDasharray={`${dash} ${circumference - dash}`}
                    strokeLinecap="round"
                />
            </svg>
        </div>
        
    )

}