import cx from 'classnames';
import React, { forwardRef, TextareaHTMLAttributes } from 'react';

import styles from './styles/TextArea.module.scss';

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
  error?: boolean;
  htmlFor?: string;
  name?: string;
  required?: boolean;
  value?: string;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ error, htmlFor, className, id, ...rest }, ref) => {
    const classNames = cx(
      styles.TextArea,
      {
        [styles.error]: error,
      },
      className
    );

    return (
      <textarea {...rest} id={id || htmlFor} className={classNames} ref={ref} />
    );
  }
);
