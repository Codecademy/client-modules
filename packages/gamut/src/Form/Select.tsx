import cx from 'classnames';
import { each, isArray, isObject } from 'lodash';
import React, { forwardRef, ReactNode, SelectHTMLAttributes } from 'react';

import styles from './styles/Select.module.scss';

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: boolean;
  htmlFor?: string;
  options?: string[] | Record<string, number | string>;
  id?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const className = cx(
      styles.Select,
      props.className,
      props.error && styles.error
    );
    const { options, error, id, ...rest } = props;

    let selectOptions: ReactNode[] = [];

    if (isArray(options)) {
      selectOptions = options.map((option) => {
        const key = id ? `${id}-${option}` : option;
        return (
          <option key={key} value={option} data-testid={key}>
            {option}
          </option>
        );
      });
    } else if (isObject(options)) {
      each(options, (text, val) => {
        const key = id ? `${id}-${val}` : val;
        selectOptions.push(
          <option key={key} value={val} data-testid={key}>
            {text}
          </option>
        );
      });
    }

    return (
      <div className={className}>
        <svg className={styles.selectIcon}>
          <path
            d="M1.175 0L5 3.825 8.825 0 10 1.183l-5 5-5-5z"
            fill="#3E3E40"
          />
        </svg>
        <select
          {...rest}
          className={styles.selectInput}
          defaultValue={props.defaultValue || ''}
          id={id || props.htmlFor}
          ref={ref}
        >
          {selectOptions}
        </select>
      </div>
    );
  }
);
