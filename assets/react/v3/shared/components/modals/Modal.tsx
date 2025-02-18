import { css } from '@emotion/react';
import React, { useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { colorTokens, zIndex } from '@Config/styles';
import { AnimatedDiv, AnimationType, useAnimation } from '@Hooks/useAnimation';
import { nanoid, noop } from '@Utils/util';

const styles = {
  backdrop: ({ magicAi = false }: { magicAi?: boolean }) => css`
    position: fixed;
    background-color: ${colorTokens.background.modal};
    opacity: 0.7;
    inset: 0;
    z-index: ${zIndex.negative};

    ${
      magicAi &&
      css`
      background: linear-gradient(73.09deg, rgba(255, 150, 69, 0.4) 18.05%, rgba(255, 100, 113, 0.4) 30.25%, rgba(207, 110, 189, 0.4) 55.42%, rgba(164, 119, 209, 0.4) 71.66%, rgba(62, 100, 222, 0.4) 97.9%);
      opacity: 1;
      backdrop-filter: blur(10px); 
    `
    }
  `,
  container: css`
    z-index: ${zIndex.highest};
    position: fixed;
    display: flex;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  `,
};

export type PromiseResolvePayload<A extends string = string> = { action: A; [key: string]: unknown };
export type ModalProps = {
  closeModal: (param?: PromiseResolvePayload<'CLOSE'>) => void;
  icon?: React.ReactNode;
  title?: string | React.ReactNode;
  subtitle?: string;
  headerChildren?: React.ReactNode;
  entireHeader?: React.ReactNode;
  actions?: React.ReactNode;
};

type ModalContextType = {
  showModal<P extends ModalProps>(options: {
    component: React.FunctionComponent<P>;
    props?: Omit<P, 'closeModal'>;
    closeOnOutsideClick?: boolean;
    closeOnEscape?: boolean;
    isMagicAi?: boolean;
    depthIndex?: number;
  }): Promise<NonNullable<Parameters<P['closeModal']>[0]> | PromiseResolvePayload<'CLOSE'>>;
  closeModal(data?: PromiseResolvePayload): void;
  hasModalOnStack?: boolean;
};

const ModalContext = React.createContext<ModalContextType>({
  showModal: () => Promise.resolve({ action: 'CLOSE' as const }),
  closeModal: noop,
  hasModalOnStack: false,
});

export const useModal = () => useContext(ModalContext);

export const ModalProvider: React.FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<{
    modals: {
      id: string;
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      component: React.FunctionComponent<any>;
      props?: { [key: string]: unknown };
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      resolve: (data: PromiseResolvePayload<any>) => void;
      closeOnOutsideClick: boolean;
      closeOnEscape?: boolean;
      isMagicAi?: boolean;
      depthIndex?: number;
    }[];
  }>({
    modals: [],
  });

  const showModal = useCallback<ModalContextType['showModal']>(
    ({
      component,
      props,
      closeOnOutsideClick = false,
      closeOnEscape = true,
      isMagicAi = false,
      depthIndex = zIndex.modal,
    }) => {
      return new Promise((resolve) => {
        setState((previousState) => ({
          ...previousState,
          modals: [
            ...previousState.modals,
            {
              component,
              props,
              resolve,
              closeOnOutsideClick,
              closeOnEscape,
              id: nanoid(),
              depthIndex,
              isMagicAi,
            },
          ],
        }));
      });
    },
    [],
  );

  const closeModal = useCallback<ModalContextType['closeModal']>((data = { action: 'CLOSE' }) => {
    setState((previousState) => {
      const lastModal = previousState.modals[previousState.modals.length - 1];
      lastModal?.resolve(data);
      return {
        ...previousState,
        modals: previousState.modals.slice(0, previousState.modals.length - 1),
      };
    });
  }, []);

  const { transitions } = useAnimation({
    data: state.modals,
    animationType: AnimationType.slideUp,
    animationDuration: 250,
  });

  const hasModalOnStack = useMemo(() => {
    return state.modals.length > 0;
  }, [state.modals]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const currentlyOpenPopovers = document.querySelectorAll('.tutor-portal-popover');

      if (
        event.key === 'Escape' &&
        state.modals[state.modals.length - 1]?.closeOnEscape &&
        !currentlyOpenPopovers.length
      ) {
        closeModal({ action: 'CLOSE' });
      }
    };

    // Use capture phase to ensure this event is caught even when input is focused
    if (state.modals.length > 0) {
      document.addEventListener('keydown', handleKeyDown, true);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [state.modals.length, closeModal]);

  return (
    <ModalContext.Provider value={{ showModal, closeModal, hasModalOnStack }}>
      {children}
      {transitions((style, modal) => {
        return (
          <div
            css={[
              styles.container,
              {
                zIndex: modal.depthIndex,
              },
            ]}
          >
            <AnimatedDiv style={style} hideOnOverflow={false}>
              {React.createElement(modal.component, { ...modal.props, closeModal })}
            </AnimatedDiv>
            <div
              css={styles.backdrop({ magicAi: modal.isMagicAi })}
              onKeyUp={noop}
              tabIndex={-1}
              // This is not ideal to attach a click event on a non-interactive element like div,
              // but in this case we have to do it.
              onClick={() => {
                if (modal.closeOnOutsideClick) {
                  closeModal({ action: 'CLOSE' });
                }
              }}
            />
          </div>
        );
      })}
    </ModalContext.Provider>
  );
};
