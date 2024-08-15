import Button from '@Atoms/Button';
import BasicModalWrapper from '@Components/modals/BasicModalWrapper';
import type { ModalProps } from '@Components/modals/Modal';
import { spacing } from '@Config/styles';
import Show from '@Controls/Show';
import { Coupon } from '@CouponServices/coupon';
import { useFormWithGlobalError } from '@Hooks/useFormWithGlobalError';
import { css } from '@emotion/react';
import { __ } from '@wordpress/i18n';
import { UseFormReturn } from 'react-hook-form';
import CourseListTable from './CourseListTable';
import { Enrollment } from '@EnrollmentServices/enrollment';

interface CourseListModalProps extends ModalProps {
  closeModal: (props?: { action: 'CONFIRM' | 'CLOSE' }) => void;
  form: UseFormReturn<Enrollment, any, undefined>;
}

function CourseListModal({ title, closeModal, actions, form }: CourseListModalProps) {
  const _form = useFormWithGlobalError<Enrollment>({
    defaultValues: form.getValues(),
  });

  function handleApply() {
    form.setValue('course', _form.getValues('course'));
    closeModal({ action: 'CONFIRM' });
  }

  return (
    <BasicModalWrapper onClose={() => closeModal({ action: 'CLOSE' })} title={title} actions={actions}>
      <div css={styles.modalWrapper}>
        <CourseListTable form={_form} />
        <div css={styles.footer}>
          <Button size="small" variant="text" onClick={() => closeModal({ action: 'CLOSE' })}>
            {__('Cancel', 'tutor')}
          </Button>
          <Button type="submit" size="small" variant="primary" onClick={handleApply}>
            {__('Apply', 'tutor')}
          </Button>
        </div>
      </div>
    </BasicModalWrapper>
  );
}

export default CourseListModal;

const styles = {
  modalWrapper: css`
    width: 720px;
  `,
  footer: css`
    box-shadow: 0px 1px 0px 0px #e4e5e7 inset;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: end;
    gap: ${spacing[16]};
    padding-inline: ${spacing[16]};
  `,
};
