import Button, { ButtonVariant } from '@Atoms/Button';
import SVGIcon from '@Atoms/SVGIcon';
import { colorPalate, colorTokens, headerHeight, spacing } from '@Config/styles';
import { css } from '@emotion/react';
import { styleUtils } from '@Utils/style-utils';
import { __ } from '@wordpress/i18n';

const Header = () => {
  return (
    <div css={styles.wrapper}>
      <div>
        <svg width="96" height="20" viewBox="0 0 96 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_32880_20004)">
            <path
              d="M22.9125 16.4205V5.30046H19.5792C19.2025 5.30046 19.0625 5.06046 19.0625 4.47712V3.96046C19.0625 3.37379 19.2025 3.13379 19.5792 3.13379H28.7991C29.1791 3.13379 29.3158 3.37379 29.3158 3.96046V4.47712C29.3158 5.06046 29.1424 5.30046 28.7991 5.30046H25.4958V16.4205C25.4958 16.8005 25.1858 17.0071 24.4625 17.0071H23.9458C23.2225 17.0005 22.9125 16.8005 22.9125 16.4205Z"
              fill="#092844"
            />
            <path
              d="M44.2891 11.9096C44.2891 8.63961 45.909 6.84961 48.9557 6.84961C52.0023 6.84961 53.6023 8.63961 53.6023 11.9096C53.6023 15.1796 51.999 16.9696 48.9724 16.9696C45.9457 16.9696 44.2891 15.1796 44.2891 11.9096ZM51.1057 11.9096C51.1057 9.80961 50.439 8.74294 48.9724 8.74294C47.5057 8.74294 46.8024 9.80961 46.8024 11.9096C46.8024 14.0096 47.469 15.0763 48.9724 15.0763C50.4757 15.0763 51.1057 13.9996 51.1057 11.9096Z"
              fill="#092844"
            />
            <path
              d="M54.999 6.85012H56.6157C56.6522 6.8492 56.6886 6.85574 56.7226 6.86932C56.7566 6.8829 56.7875 6.90324 56.8133 6.92912C56.8392 6.95499 56.8595 6.98586 56.8731 7.01984C56.8867 7.05382 56.8932 7.0902 56.8923 7.12679L56.9957 8.57012C57.4757 7.78012 58.1656 7.09012 59.1623 7.09012C60.059 7.09012 60.299 7.42345 60.299 8.02012C60.299 8.40012 60.0923 9.46679 59.749 9.46679C59.4321 9.38745 59.1103 9.32954 58.7856 9.29345C57.889 9.29345 57.269 10.0868 57.119 10.3601V16.4201C57.119 16.8001 56.809 17.0068 56.0523 17.0068H55.7423C55.019 17.0068 54.709 16.8001 54.709 16.4201V7.12679C54.7085 7.08917 54.7157 7.05184 54.7303 7.01715C54.7448 6.98246 54.7664 6.95115 54.7936 6.92517C54.8209 6.8992 54.8532 6.87913 54.8885 6.86622C54.9238 6.8533 54.9615 6.84782 54.999 6.85012Z"
              fill="#092844"
            />
            <path
              d="M65.0824 16.3871V3.54712C65.0824 3.27046 65.3224 3.13379 65.8391 3.13379H65.9991C66.5491 3.13379 66.7557 3.30379 66.7557 3.54712V15.4905H72.089C72.3657 15.4905 72.469 15.6638 72.469 16.0771V16.3871C72.469 16.8005 72.3657 16.9705 72.089 16.9705H65.6657C65.5863 16.983 65.505 16.9766 65.4285 16.9517C65.352 16.9268 65.2824 16.8842 65.2255 16.8273C65.1687 16.7704 65.126 16.7009 65.1012 16.6244C65.0763 16.5479 65.0699 16.4666 65.0824 16.3871Z"
              fill="#092844"
            />
            <path
              d="M85.1858 3.09623H84.5191C84.3645 3.07085 84.2059 3.08853 84.0607 3.14733C83.9154 3.20612 83.7892 3.30377 83.6958 3.42956L79.5392 10.5662L75.3725 3.4429C75.2725 3.23623 75.0392 3.10956 74.5492 3.10956H73.8592C73.3092 3.10956 73.1025 3.2829 73.1025 3.5229V16.5562C73.1025 16.8329 73.3425 16.9696 73.8592 16.9696H73.9992C74.5525 16.9696 74.7592 16.7996 74.7592 16.5562V6.88956C74.7652 6.53362 74.753 6.17759 74.7225 5.8229L74.7925 5.78956C74.9195 6.09345 75.0805 6.38196 75.2725 6.64956L78.7492 12.6662C78.7784 12.7482 78.8354 12.8174 78.9103 12.8619C78.9851 12.9063 79.0732 12.9232 79.1592 12.9096H79.9192C80.0033 12.9088 80.0858 12.8859 80.1584 12.8432C80.2309 12.8005 80.291 12.7395 80.3325 12.6662L83.7391 6.77956C83.9125 6.50623 84.0491 6.22956 84.2225 5.91956L84.2891 5.95623C84.2558 6.28956 84.2558 6.67623 84.2558 7.0229V16.5562C84.2558 16.8329 84.4958 16.9696 85.0124 16.9696H85.1491C85.7024 16.9696 85.9091 16.7996 85.9091 16.5562V3.55623C85.9758 3.26956 85.7358 3.09623 85.1858 3.09623Z"
              fill="#092844"
            />
            <path
              d="M87.9054 16.0401C87.6621 15.8701 87.5254 15.7068 87.5254 15.5601C87.5254 15.2501 88.0054 14.4935 88.2121 14.4935C88.3627 14.5329 88.5035 14.6033 88.6254 14.7001C89.5275 15.2172 90.549 15.4895 91.5887 15.4901C93.0687 15.4901 94.1353 14.5601 94.1353 13.1835C94.1353 11.6001 92.6887 11.1201 91.1754 10.5335C89.5087 9.86681 87.7654 9.26014 87.7654 6.67681C87.7654 4.57681 89.4887 3.06348 92.0987 3.06348C92.9253 3.06348 94.1987 3.30348 94.8553 3.75348C94.9564 3.80114 95.0438 3.87343 95.1096 3.96371C95.1755 4.05399 95.2175 4.15936 95.232 4.27014C95.232 4.57681 94.8187 5.30014 94.612 5.30014C94.423 5.2629 94.2457 5.18057 94.0953 5.06014C93.4725 4.72099 92.7746 4.54335 92.0654 4.54348C90.5854 4.54348 89.552 5.33681 89.552 6.74681C89.552 8.15681 90.792 8.53681 92.202 9.08014C93.9587 9.74681 95.922 10.5268 95.922 13.2135C95.922 15.5468 94.1987 17.0001 91.5887 17.0001C89.8987 17.0001 88.5221 16.5235 87.9054 16.0401Z"
              fill="#092844"
            />
            <path
              d="M43.1892 14.9067C42.969 14.9458 42.7461 14.9681 42.5225 14.9733C42.0059 14.9733 41.6959 14.7333 41.6959 13.9067V8.77665H42.7259C42.8621 8.77409 42.992 8.71883 43.0884 8.62249C43.1847 8.52615 43.24 8.39621 43.2425 8.25999V7.29665C43.2391 7.16069 43.1836 7.03123 43.0875 6.93506C42.9913 6.83889 42.8618 6.78337 42.7259 6.77999H41.6959V4.66665C41.6916 4.53127 41.6358 4.40265 41.5397 4.30718C41.4436 4.21172 41.3146 4.15666 41.1792 4.15332H39.7326C39.5992 4.15919 39.4731 4.21546 39.3797 4.31075C39.2862 4.40604 39.2325 4.53324 39.2292 4.66665V6.76665H38.5626C38.4266 6.77003 38.2971 6.82555 38.201 6.92172C38.1048 7.01789 38.0493 7.14736 38.0459 7.28332V8.24665C38.0485 8.38288 38.1037 8.51281 38.2001 8.60916C38.2964 8.7055 38.4263 8.76076 38.5626 8.76332H39.2292V13.94C39.2292 16.1433 40.4359 16.94 41.9825 16.94C42.5692 16.94 43.7059 16.87 43.7059 16.1133C43.7392 15.9733 43.5325 14.9067 43.1892 14.9067Z"
              fill="#092844"
            />
            <path
              d="M36.5463 6.81641C36.6823 6.81979 36.8118 6.8753 36.9079 6.97148C37.0041 7.06765 37.0596 7.19711 37.063 7.33307V16.4531C37.0596 16.589 37.0041 16.7185 36.9079 16.8147C36.8118 16.9108 36.6823 16.9664 36.5463 16.9697H35.2363C35.1004 16.9664 34.9709 16.9108 34.8747 16.8147C34.7786 16.7185 34.7231 16.589 34.7197 16.4531V15.4897C34.3561 15.9384 33.8997 16.3029 33.3818 16.5584C32.864 16.8139 32.2969 16.9542 31.7197 16.9697C29.7197 16.9697 28.7197 15.9031 28.7197 13.8031V7.33307C28.7231 7.19711 28.7786 7.06765 28.8748 6.97148C28.971 6.8753 29.1004 6.81979 29.2364 6.81641H30.683C30.821 6.81638 30.9535 6.87049 31.052 6.96711C31.1504 7.06373 31.2071 7.19513 31.2097 7.33307V13.4597C31.2097 14.3897 31.6897 14.9064 32.6897 14.9064C33.5164 14.9064 34.203 14.2864 34.583 13.6997V7.33307C34.5856 7.19685 34.6408 7.06691 34.7372 6.97057C34.8335 6.87423 34.9635 6.81897 35.0997 6.81641H36.5463Z"
              fill="#092844"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.01997 12.7364C3.76738 12.7273 3.52761 12.6229 3.34888 12.4442C3.17016 12.2655 3.06574 12.0257 3.05664 11.7731V9.56978C3.05664 9.31429 3.15813 9.06926 3.33879 8.8886C3.51945 8.70794 3.76448 8.60645 4.01997 8.60645C4.27546 8.60645 4.52048 8.70794 4.70114 8.8886C4.8818 9.06926 4.98329 9.31429 4.98329 9.56978V11.7731C4.9865 11.9005 4.96377 12.0272 4.91649 12.1455C4.86921 12.2638 4.79837 12.3713 4.70827 12.4614C4.61817 12.5515 4.5107 12.6224 4.39237 12.6696C4.27405 12.7169 4.14735 12.7396 4.01997 12.7364Z"
              fill="#0049F8"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.9733 12.7364C10.8459 12.7382 10.7193 12.7146 10.6011 12.6669C10.4829 12.6193 10.3753 12.5485 10.2847 12.4589C10.1941 12.3692 10.1222 12.2624 10.0734 12.1446C10.0245 12.0269 9.99955 11.9006 10 11.7731V9.56978C10 9.31429 10.1015 9.06926 10.2822 8.8886C10.4628 8.70794 10.7078 8.60645 10.9633 8.60645C11.2188 8.60645 11.4638 8.70794 11.6445 8.8886C11.8252 9.06926 11.9267 9.31429 11.9267 9.56978V11.7731C11.9271 11.8997 11.9025 12.0252 11.8542 12.1423C11.806 12.2594 11.735 12.3657 11.6455 12.4553C11.5559 12.5448 11.4496 12.6158 11.3325 12.664C11.2154 12.7123 11.09 12.7369 10.9633 12.7364"
              fill="#0049F8"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.09297 7.91667C2.28331 7.50729 2.58349 7.15874 2.96012 6.90981C3.33675 6.66088 3.77506 6.52132 4.22629 6.50667C4.87379 6.52758 5.48682 6.80342 5.93193 7.27414C6.37705 7.74485 6.61821 8.37233 6.60293 9.02V13.53C6.63253 13.7464 6.73949 13.9447 6.90403 14.0882C7.06858 14.2318 7.27956 14.3109 7.49793 14.3109C7.7163 14.3109 7.92728 14.2318 8.09182 14.0882C8.25636 13.9447 8.36333 13.7464 8.39292 13.53V9.02C8.37675 8.37265 8.61716 7.74516 9.06175 7.27434C9.50633 6.80353 10.119 6.52758 10.7662 6.50667C11.2006 6.4991 11.6277 6.61877 11.995 6.85095C12.3622 7.08313 12.6534 7.41766 12.8329 7.81333C13.2975 8.72367 13.5218 9.73761 13.4847 10.759C13.4475 11.7803 13.15 12.7753 12.6205 13.6494C12.091 14.5236 11.3469 15.248 10.4589 15.754C9.57092 16.2599 8.56838 16.5307 7.5464 16.5405C6.52441 16.5503 5.51685 16.2989 4.61927 15.8102C3.72169 15.3214 2.96384 14.6114 2.41759 13.7476C1.87135 12.8838 1.55481 11.8948 1.49799 10.8743C1.44118 9.85384 1.64598 8.83578 2.09297 7.91667ZM5.87961 2H9.25291V3.30333C8.68962 3.16752 8.11236 3.09816 7.53293 3.09667C6.97318 3.10222 6.41518 3.16025 5.86627 3.27L5.87961 2ZM15.0362 11.2233C15.0362 11.0167 15.0695 10.8433 15.0695 10.6367C15.0664 9.29801 14.7081 7.98417 14.0311 6.82932C13.3541 5.67446 12.3828 4.71997 11.2162 4.06333V2H12.6662C12.9314 2 13.1858 1.89464 13.3733 1.70711C13.5609 1.51957 13.6662 1.26522 13.6662 1C13.6662 0.734784 13.5609 0.48043 13.3733 0.292893C13.1858 0.105357 12.9314 0 12.6662 0L2.4363 0C2.16971 0.0134737 1.91817 0.127661 1.73254 0.31948C1.54691 0.511299 1.44103 0.766442 1.43631 1.03333C1.43631 1.29855 1.54166 1.5529 1.7292 1.74044C1.91673 1.92798 2.17108 2.03333 2.4363 2.03333H3.91629V4.06667C3.0103 4.56216 2.21602 5.23885 1.5829 6.05462C0.949777 6.87039 0.491367 7.80776 0.236213 8.80837C-0.0189409 9.80899 -0.0653757 10.8514 0.0998 11.8707C0.264976 12.8901 0.638225 13.8645 1.19631 14.7333C3.99962 19.4833 11.5929 19.9667 14.1762 20C14.4042 19.9931 14.623 19.9084 14.7962 19.76C14.8763 19.6784 14.9389 19.5814 14.9802 19.4748C15.0214 19.3681 15.0405 19.2542 15.0362 19.14V11.2233Z"
              fill="#0049F8"
            />
          </g>
          <defs>
            <clipPath id="clip0_32880_20004">
              <rect width="95.9259" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div css={styles.headerRight}>
        <Button variant={ButtonVariant.text} icon={<SVGIcon name="save" width={24} height={24} />}>
          {__('Save as Draft', 'tutor')}
        </Button>
        <Button variant={ButtonVariant.secondary}>{__('Preview', 'tutor')}</Button>
        <Button variant={ButtonVariant.primary}>{__('Publish', 'tutor')}</Button>
        <button
          type="button"
          css={styles.closeButton}
          onClick={() => {
            window.history.back();
          }}
        >
          <SVGIcon name="cross" width={32} height={32} />
        </button>
      </div>
    </div>
  );
};

export default Header;

const styles = {
  wrapper: css`
    height: ${headerHeight}px;
    width: 100%;
    background-color: ${colorTokens.background.white};
    border-bottom: 1px solid ${colorTokens.stroke.divider};
    padding: ${spacing[20]} ${spacing[32]} ${spacing[20]} ${spacing[56]};
    display: flex;
    align-items: center;
    justify-content: space-between;

    html[dir='rtl'] & {
      padding: ${spacing[20]} ${spacing[56]} ${spacing[20]} ${spacing[32]};
    }
  `,
  headerRight: css`
    display: flex;
    align-items: center;
    gap: ${spacing[12]};
  `,
  closeButton: css`
    ${styleUtils.resetButton};
    cursor: pointer;
    display: flex;
    color: ${colorPalate.icon.default};
    margin-left: ${spacing[4]};
  `,
};
