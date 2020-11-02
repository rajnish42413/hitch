import React from 'react';
import '../styles/price.less';

interface IProps {
  withoutDiscount?: Number;
  amount: Number;
  currency?: 'INR' | 'USD';
}
export default function Price({ currency = 'INR', withoutDiscount, amount }: IProps) {
  return (
    <div className="style-4">
      {withoutDiscount && (
        <del>
          <span className="amount">
            {currency} {withoutDiscount}
          </span>
        </del>
      )}
      <ins>
        <span className="amount">
          {currency} {amount}
        </span>
      </ins>
    </div>
  );
}
