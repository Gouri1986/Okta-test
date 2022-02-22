export const TableRowOptionIcon = () => {
  return (
    <svg
      width='17'
      height='5'
      className='cp mr-15 ml-15'
      viewBox='0 0 17 5'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g opacity='0.502'>
        <path
          opacity='0.502'
          d='M2.36805 4.03199C3.40082 4.03199 4.23805 3.19476 4.23805 2.16199C4.23805 1.12922 3.40082 0.291992 2.36805 0.291992C1.33527 0.291992 0.498047 1.12922 0.498047 2.16199C0.498047 3.19476 1.33527 4.03199 2.36805 4.03199Z'
          fill='#02013D'
        />
        <path
          opacity='0.502'
          d='M8.49793 4.03199C9.5307 4.03199 10.3679 3.19476 10.3679 2.16199C10.3679 1.12922 9.5307 0.291992 8.49793 0.291992C7.46516 0.291992 6.62793 1.12922 6.62793 2.16199C6.62793 3.19476 7.46516 4.03199 8.49793 4.03199Z'
          fill='#02013D'
        />
        <path
          opacity='0.502'
          d='M14.6278 4.03199C15.6606 4.03199 16.4978 3.19476 16.4978 2.16199C16.4978 1.12922 15.6606 0.291992 14.6278 0.291992C13.595 0.291992 12.7578 1.12922 12.7578 2.16199C12.7578 3.19476 13.595 4.03199 14.6278 4.03199Z'
          fill='#02013D'
        />
      </g>
    </svg>
  );
};

export const TableHeaderSortDownArrow = ({ up }) => {
  return (
    <svg
      width='14'
      height='13'
      viewBox='0 0 14 13'
      className='l-0'
      fill='none'
      transform={up ? "rotate(180)" : "rotate(0)"}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M0.988281 6.5L7 0.488281L13.0117 6.5L11.9219 7.55469L7.73828 3.37109V12.5117H6.26172V3.37109L2.04297 7.55469L0.988281 6.5Z'
        fill='#757575'
      />
    </svg>
  );
};

export const TrashIcon = () => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 50 50'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M8.33333 14.5833V39.5833C8.33333 41.2409 8.99181 42.8306 10.1639 44.0027C11.336 45.1748 12.9257 45.8333 14.5833 45.8333H35.4167C37.0743 45.8333 38.664 45.1748 39.8361 44.0027C41.0082 42.8306 41.6667 41.2409 41.6667 39.5833V14.5833C42.2192 14.5833 42.7491 14.3638 43.1398 13.9731C43.5305 13.5824 43.75 13.0525 43.75 12.4999C43.75 11.9474 43.5305 11.4175 43.1398 11.0268C42.7491 10.6361 42.2192 10.4166 41.6667 10.4166H33.3333V8.33325C33.3333 6.67565 32.6749 5.08594 31.5028 3.91383C30.3306 2.74173 28.7409 2.08325 27.0833 2.08325H22.9167C21.2591 2.08325 19.6694 2.74173 18.4972 3.91383C17.3251 5.08594 16.6667 6.67565 16.6667 8.33325V10.4166H8.33333C7.7808 10.4166 7.25089 10.6361 6.86019 11.0268C6.46949 11.4175 6.25 11.9474 6.25 12.4999C6.25 13.0525 6.46949 13.5824 6.86019 13.9731C7.25089 14.3638 7.7808 14.5833 8.33333 14.5833ZM20.8333 8.33325C20.8333 7.78072 21.0528 7.25081 21.4435 6.86011C21.8342 6.46941 22.3641 6.24992 22.9167 6.24992H27.0833C27.6359 6.24992 28.1658 6.46941 28.5565 6.86011C28.9472 7.25081 29.1667 7.78072 29.1667 8.33325V10.4166H20.8333V8.33325ZM12.5 14.5833H37.5V39.5833C37.5 40.1358 37.2805 40.6657 36.8898 41.0564C36.4991 41.4471 35.9692 41.6666 35.4167 41.6666H14.5833C14.0308 41.6666 13.5009 41.4471 13.1102 41.0564C12.7195 40.6657 12.5 40.1358 12.5 39.5833V14.5833Z'
        fill='#464255'
      />
      <path
        d='M18.75 37.5C19.3025 37.5 19.8324 37.2805 20.2231 36.8898C20.6138 36.4991 20.8333 35.9692 20.8333 35.4167V20.8333C20.8333 20.2808 20.6138 19.7509 20.2231 19.3602C19.8324 18.9695 19.3025 18.75 18.75 18.75C18.1974 18.75 17.6675 18.9695 17.2768 19.3602C16.8861 19.7509 16.6666 20.2808 16.6666 20.8333V35.4167C16.6666 35.9692 16.8861 36.4991 17.2768 36.8898C17.6675 37.2805 18.1974 37.5 18.75 37.5Z'
        fill='#464255'
      />
      <path
        d='M31.25 37.5C31.8025 37.5 32.3324 37.2805 32.7231 36.8898C33.1138 36.4991 33.3333 35.9692 33.3333 35.4167V20.8333C33.3333 20.2808 33.1138 19.7509 32.7231 19.3602C32.3324 18.9695 31.8025 18.75 31.25 18.75C30.6974 18.75 30.1675 18.9695 29.7768 19.3602C29.3861 19.7509 29.1666 20.2808 29.1666 20.8333V35.4167C29.1666 35.9692 29.3861 36.4991 29.7768 36.8898C30.1675 37.2805 30.6974 37.5 31.25 37.5Z'
        fill='#464255'
      />
    </svg>
  );
};

export const PencilIcon = () => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 50 50'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M6.24987 45.8336H14.5832C14.8574 45.8352 15.1292 45.7827 15.383 45.679C15.6368 45.5753 15.8677 45.4225 16.0624 45.2295L41.0624 20.2294C41.2576 20.0358 41.4126 19.8054 41.5184 19.5515C41.6242 19.2976 41.6786 19.0253 41.6786 18.7503C41.6786 18.4753 41.6242 18.203 41.5184 17.9491C41.4126 17.6952 41.2576 17.4648 41.0624 17.2711L32.729 8.93778C32.5354 8.74251 32.3049 8.58752 32.0511 8.48176C31.7972 8.37599 31.5249 8.32153 31.2499 8.32153C30.9748 8.32153 30.7025 8.37599 30.4487 8.48176C30.1948 8.58752 29.9644 8.74251 29.7707 8.93778L4.77071 33.9378C4.57762 34.1325 4.42486 34.3633 4.32118 34.6171C4.21751 34.871 4.16495 35.1428 4.16654 35.417V43.7503C4.16654 44.3028 4.38603 44.8327 4.77673 45.2234C5.16743 45.6141 5.69734 45.8336 6.24987 45.8336ZM8.33321 36.2711L31.2499 13.3544L36.6457 18.7503L13.729 41.667H8.33321V36.2711Z'
        fill='#464255'
      />
      <path
        d='M36.8961 4.77089C36.7018 4.57665 36.4712 4.42256 36.2174 4.31744C35.9637 4.21231 35.6916 4.1582 35.4169 4.1582C34.8621 4.1582 34.3301 4.37859 33.9378 4.77089C33.5455 5.16319 33.3251 5.69527 33.3251 6.25006C33.3251 6.80486 33.5455 7.33693 33.9378 7.72923L42.2711 16.0626C42.4648 16.2578 42.6952 16.4128 42.9491 16.5186C43.2029 16.6244 43.4752 16.6788 43.7503 16.6788C44.0253 16.6788 44.2976 16.6244 44.5515 16.5186C44.8053 16.4128 45.0358 16.2578 45.2294 16.0626C45.4247 15.8689 45.5797 15.6385 45.6855 15.3846C45.7912 15.1307 45.8457 14.8584 45.8457 14.5834C45.8457 14.3084 45.7912 14.0361 45.6855 13.7822C45.5797 13.5283 45.4247 13.2979 45.2294 13.1042L36.8961 4.77089Z'
        fill='#464255'
      />
    </svg>
  );
};

export const AddNewIcon = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7363 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM10 18C8.41775 18 6.87104 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99113 2.15372 8.43928C2.4624 6.88743 3.22433 5.46197 4.34315 4.34315C5.46197 3.22433 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21447 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C18 12.1217 17.1572 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18ZM14 9H11V6C11 5.73478 10.8946 5.48043 10.7071 5.29289C10.5196 5.10536 10.2652 5 10 5C9.73479 5 9.48043 5.10536 9.2929 5.29289C9.10536 5.48043 9 5.73478 9 6V9H6C5.73479 9 5.48043 9.10536 5.2929 9.29289C5.10536 9.48043 5 9.73478 5 10C5 10.2652 5.10536 10.5196 5.2929 10.7071C5.48043 10.8946 5.73479 11 6 11H9V14C9 14.2652 9.10536 14.5196 9.2929 14.7071C9.48043 14.8946 9.73479 15 10 15C10.2652 15 10.5196 14.8946 10.7071 14.7071C10.8946 14.5196 11 14.2652 11 14V11H14C14.2652 11 14.5196 10.8946 14.7071 10.7071C14.8946 10.5196 15 10.2652 15 10C15 9.73478 14.8946 9.48043 14.7071 9.29289C14.5196 9.10536 14.2652 9 14 9Z'
        fill='white'
      />
    </svg>
  );
};

export const RowRightArrow = () => {
  return (
    <svg
      width='8'
      height='12'
      viewBox='0 0 8 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M6.83037 5.29019L2.59037 1.05019C2.49741 0.956464 2.38681 0.88207 2.26495 0.831301C2.14309 0.780533 2.01238 0.754395 1.88037 0.754395C1.74836 0.754395 1.61765 0.780533 1.49579 0.831301C1.37393 0.88207 1.26333 0.956464 1.17037 1.05019C0.984119 1.23756 0.879578 1.49101 0.879578 1.75519C0.879578 2.01938 0.984119 2.27283 1.17037 2.46019L4.71037 6.00019L1.17037 9.54019C0.984119 9.72755 0.879578 9.98101 0.879578 10.2452C0.879578 10.5094 0.984119 10.7628 1.17037 10.9502C1.26381 11.0429 1.37463 11.1162 1.49646 11.166C1.6183 11.2157 1.74876 11.241 1.88037 11.2402C2.01198 11.241 2.14244 11.2157 2.26428 11.166C2.38611 11.1162 2.49693 11.0429 2.59037 10.9502L6.83037 6.71019C6.9241 6.61723 6.99849 6.50663 7.04926 6.38477C7.10003 6.26291 7.12617 6.1322 7.12617 6.00019C7.12617 5.86818 7.10003 5.73747 7.04926 5.61562C6.99849 5.49376 6.9241 5.38315 6.83037 5.29019Z'
        fill='black'
      />
    </svg>
  );
};
