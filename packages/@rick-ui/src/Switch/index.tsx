import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { memoSVC } from '@rickzhou/react-utils';
import { useState } from 'react';
import { themeSwitchStyle } from './style';

export type SwitchProps = {
  className?: string;
  disabled?: boolean;
  value?: boolean;
  onChange?: (value: boolean) => void;
};

const Switch = memoSVC<SwitchProps>(
  ({ className = '', disabled, onChange, value }) => {
    const [check, setCheck] = useState(value ?? true);
    const iconStyles = {
      fontSize: '4vw',
      opacity: 0,
    };

    return (
      <div css={themeSwitchStyle} className={`${check ? 'check' : 'uncheck'}`}>
        <div className={`switch ${className}`}>
          <button
            type="button"
            id="switch"
            className={`${disabled ? 'cursor-not-allowed!' : ''}`}
            disabled={disabled}
            onClick={() => {
              setCheck(pre => {
                onChange?.(!pre);
                return !pre;
              });
            }}>
            <CheckOutlined style={iconStyles} />

            <span className="btn-switch">
              {check ? (
                <CheckOutlined style={iconStyles} />
              ) : (
                <CloseOutlined style={iconStyles} />
              )}
            </span>

            <CloseOutlined style={iconStyles} />
          </button>
        </div>
      </div>
    );
  },
);

export default Switch;
