import React from 'react';
interface IProps {
  totalSteps: number;
  active: number;
}
export default function CustomStepper(props: IProps) {
  return (
    <div className="steps">
      <ul>
        {[...Array(props.totalSteps)].map((value: number, index: number) => (
          <li className={props.active === index ? 'active' : ''} key={index} />
        ))}
      </ul>
    </div>
  );
}
