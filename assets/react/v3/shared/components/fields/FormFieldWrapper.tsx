import LoadingSpinner from '@Atoms/LoadingSpinner';
import SVGIcon from '@Atoms/SVGIcon';
import Tooltip from '@Atoms/Tooltip';
import { borderRadius, colorTokens, lineHeight, shadow, spacing } from '@Config/styles';
import { typography } from '@Config/typography';
import { css, SerializedStyles } from '@emotion/react';
import { FormControllerProps } from '@Utils/form';
import { nanoid } from '@Utils/util';
import { ReactNode } from 'react';

interface InputOptions {
  variant: unknown;
  hasFieldError: boolean;
  removeBorder: boolean;
  readOnly: boolean;
  hasHelpText: boolean;
}

interface InputProps {
  id: string;
  name: string;
  css: SerializedStyles[];
  'aria-invalid': 'true' | 'false';
  disabled: boolean;
  readOnly: boolean;
  placeholder?: string;
}

interface FormFieldWrapperProps<T> extends FormControllerProps<T> {
  label?: string;
  isInlineLabel?: boolean;
  children: (inputProps: InputProps) => ReactNode;
  placeholder?: string;
  variant?: unknown;
  loading?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  helpText?: string;
  isHidden?: boolean;
  removeBorder?: boolean;
  characterCount?: { maxLimit: number; inputCharacter: number };
}

const styles = {
  container: ({ disabled, isHidden }: { disabled: boolean; isHidden: boolean }) => css`
    display: flex;
    flex-direction: column;
    position: relative;
    background: inherit;

    ${disabled &&
    css`
      opacity: 0.5;
    `}

    ${isHidden &&
    css`
      display: none;
    `}
  `,
  inputContainer: (isInlineLabel: boolean) => css`
    display: flex;
    flex-direction: column;
    gap: ${spacing[4]};
    width: 100%;

    ${isInlineLabel &&
    css`
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: ${spacing[12]};
    `}
  `,
  input: (options: InputOptions) => css`
    width: 100%;
    height: 40px;
    border-radius: ${borderRadius[6]};
    border: 1px solid ${colorTokens.stroke.default};
    padding: ${spacing[8]} ${spacing[16]};
    color: ${colorTokens.text.title};
    appearance: textfield;

    ${options.hasHelpText &&
    css`
      padding: 0 ${spacing[32]} 0 ${spacing[12]};
    `}

    ${options.removeBorder &&
    css`
      border-radius: 0;
      border: none;
      box-shadow: none;
    `}

    :focus {
      outline: none;
      box-shadow: ${shadow.focus};
    }

    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    ::placeholder {
      color: ${colorTokens.text.subdued};
    }

    ${options.hasFieldError &&
    css`
      border: 1px solid ${colorTokens.stroke.danger};
    `}

    ${options.readOnly &&
    css`
      border: 1px solid ${colorTokens.background.disable};
      background-color: ${colorTokens.background.disable};
    `}
  `,
  errorLabel: (hasError: boolean) => css`
    ${typography.small()};
    display: flex;
    align-items: center;
    margin-top: ${spacing[4]};
    ${hasError &&
    css`
      color: ${colorTokens.color.danger.main};
    `}
    & svg {
      margin-right: ${spacing[8]};
    }
  `,
  labelContainer: css`
    display: flex;
    align-items: center;
    gap: ${spacing[4]};

    > div {
      display: flex;
      color: ${colorTokens.color.black[30]};
    }
  `,
  label: (isInlineLabel: boolean) => css`
    ${typography.caption()}
    line-height: ${lineHeight[24]};
    color: ${colorTokens.text.title};

    ${isInlineLabel &&
    css`
      ${typography.caption()}
      color: ${colorTokens.text.title};
    `}
  `,
  inputWrapper: css`
    position: relative;
  `,
  loader: css`
    position: absolute;
    top: 50%;
    right: ${spacing[12]};
    transform: translateY(-50%);
    display: flex;
  `,
};

const FormFieldWrapper = <T,>({
  field,
  fieldState,
  children,
  disabled = false,
  readOnly = false,
  label,
  isInlineLabel = false,
  variant,
  loading,
  placeholder,
  helpText,
  isHidden = false,
  removeBorder = false,
  characterCount,
}: FormFieldWrapperProps<T>) => {
  const id = nanoid();

  const inputContent = (
    <div css={styles.inputWrapper}>
      {children({
        id,
        name: field.name,
        css: [
          styles.input({
            variant,
            hasFieldError: !!fieldState.error,
            removeBorder,
            readOnly,
            hasHelpText: !!helpText,
          }),
        ],
        'aria-invalid': fieldState.error ? 'true' : 'false',
        disabled: disabled,
        readOnly: readOnly,
        placeholder,
      })}

      {loading && (
        <div css={styles.loader}>
          <LoadingSpinner size={20} color={colorTokens.icon.default} />
        </div>
      )}
    </div>
  );

  return (
    <div css={styles.container({ disabled, isHidden })}>
      <div css={styles.inputContainer(isInlineLabel)}>
        {(label || helpText) && (
          <div css={styles.labelContainer}>
            {label && (
              <label htmlFor={id} css={styles.label(isInlineLabel)}>
                {label}
              </label>
            )}

            {helpText && (
              <Tooltip content={helpText} placement="top" allowHTML>
                <SVGIcon name="info" width={18} height={18} />
              </Tooltip>
            )}
          </div>
        )}

        {characterCount ? (
          <Tooltip placement="right" content={characterCount.maxLimit - characterCount.inputCharacter}>
            {inputContent}
          </Tooltip>
        ) : (
          inputContent
        )}
      </div>
      {fieldState.error?.message && (
        <p css={styles.errorLabel(!!fieldState.error)}>
          <SVGIcon name="alert" width={20} height={20} /> {fieldState.error.message}
        </p>
      )}
    </div>
  );
};

export default FormFieldWrapper;
