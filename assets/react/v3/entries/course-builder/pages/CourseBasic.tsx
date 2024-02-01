import Button from '@Atoms/Button';
import FormInput from '@Components/fields/FormInput';
import FormInputWithContent from '@Components/fields/FormInputWithContent';
import FormRadioGroup from '@Components/fields/FormRadioGroup';
import FormSelectInput from '@Components/fields/FormSelectInput';
import FormSwitch from '@Components/fields/FormSwitch';
import FormTextareaInput from '@Components/fields/FormTextareaInput';
import { useModal } from '@Components/modals/Modal';
import ReferenceModal from '@Components/modals/ReferenceModal';
import ConfirmationModal from '@Components/modals/ConfirmationModal';
import { borderRadius, colorTokens, footerHeight, headerHeight, spacing } from '@Config/styles';
import { typography } from '@Config/typography';
import { useFormWithGlobalError } from '@Hooks/useFormWithGlobalError';
import { css } from '@emotion/react';
import { Controller } from 'react-hook-form';
import Tabs from '@Molecules/Tabs';
import { useState } from 'react';
import SVGIcon from '@Atoms/SVGIcon';
import FormMedia from '@Components/fields/FormMedia';

const CourseBasic = () => {
  const form = useFormWithGlobalError();
  const { showModal } = useModal();

  const [activeTab, setActiveTab] = useState('general');

  const tabList = [
    {
      label: 'General',
      value: 'general',
      icon: <SVGIcon name="settings" width={24} height={24} />,
    },
    {
      label: 'Content Drip',
      value: 'content_drip',
      icon: <SVGIcon name="contentDrip" width={24} height={24} />,
      activeBadge: true,
    },
  ];

  return (
    <div css={styles.wrapper}>
      <div css={styles.mainForm}>
        <h6 css={styles.title}>Course Basic</h6>

        <Button
          onClick={async () => {
            const { action } = await showModal({
              component: ConfirmationModal,
              props: {
                title: 'Modal',
              },
              closeOnOutsideClick: true,
            });
            console.log(action);
          }}
        >
          Open Modal
        </Button>
        <Tabs tabList={tabList} activeTab={activeTab} onChange={setActiveTab} />

        <div css={styles.courseSettings}>
          <Tabs tabList={tabList} activeTab={activeTab} onChange={setActiveTab} orientation="vertical" />

          <div css={styles.courseSettingsRight}>
            <Controller
              name="title"
              control={form.control}
              render={(controllerProps) => (
                <FormInput {...controllerProps} label="Title" placeholder="Course title" maxLimit={245} isClearable />
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={(controllerProps) => (
                <FormTextareaInput {...controllerProps} label="Course Description" maxLimit={400} />
              )}
            />
          </div>
        </div>

        <form css={styles.form}>
          <Controller
            name="title"
            control={form.control}
            render={(controllerProps) => (
              <FormInput {...controllerProps} label="Title" placeholder="Course title" maxLimit={245} isClearable />
            )}
          />

          <Controller
            name="price"
            control={form.control}
            render={(controllerProps) => (
              <FormInputWithContent {...controllerProps} label="Regular Price" placeholder="0.00" content="$" />
            )}
          />

          <Controller
            name="public"
            control={form.control}
            render={(controllerProps) => (
              <FormSwitch {...controllerProps} label="Public Course" helpText="Public course help text" />
            )}
          />

          <Controller
            name="description"
            control={form.control}
            render={(controllerProps) => (
              <FormTextareaInput {...controllerProps} label="Course Description" maxLimit={400} />
            )}
          />

          <Controller
            name="has_price"
            control={form.control}
            render={(controllerProps) => (
              <FormRadioGroup
                {...controllerProps}
                label="Price"
                options={[
                  { label: 'Free', value: 0 },
                  { label: 'Paid', value: 1 },
                ]}
              />
            )}
          />
        </form>
      </div>
      <div css={styles.sidebar}>
        <Controller
          name="level"
          control={form.control}
          defaultValue={2}
          render={(controllerProps) => (
            <FormSelectInput
              {...controllerProps}
              label="Visibility Status"
              helpText="Hello there"
              options={[
                {
                  label: 'One',
                  value: 1,
                },
                {
                  label: 'Two',
                  value: 2,
                },
                {
                  label: 'Three',
                  value: 3,
                },
              ]}
            />
          )}
        />

        <Controller
          name="image"
          control={form.control}
          render={(controllerProps) => (
            <FormMedia
              {...controllerProps}
              label="Visibility Status"
              helpText="Hello there"
            />
          )}
        />
      </div>
    </div>
  );
};

export default CourseBasic;

const styles = {
  wrapper: css`
    display: grid;
    grid-template-columns: 1fr 370px;
  `,
  mainForm: css`
    padding: ${spacing[24]} ${spacing[64]};
  `,
  title: css`
    ${typography.heading6('medium')};
    margin-bottom: ${spacing[40]};
  `,
  form: css`
    display: flex;
    flex-direction: column;
    gap: ${spacing[24]};
  `,
  sidebar: css`
    padding-top: ${spacing[24]};
    padding-left: ${spacing[64]};
    border-left: 1px solid ${colorTokens.stroke.default};
    min-height: calc(100vh - (${headerHeight}px + ${footerHeight}px));
  `,
  courseSettings: css`
    display: grid;
    grid-template-columns: 200px 1fr;
    margin-block: ${spacing[48]};
    border: 1px solid ${colorTokens.stroke.default};
    border-radius: ${borderRadius[6]};
    background-color: ${colorTokens.background.default};
    overflow: hidden;
  `,
  courseSettingsRight: css`
    padding: ${spacing[16]} ${spacing[32]} ${spacing[32]} ${spacing[32]};
    background-color: ${colorTokens.background.white};
  `,
};
