import React from "react";
import { ButtonGroup, Button } from "@mui/material";
import { useHistory } from "react-router-dom";

const Logo = () => {
  return (
    <svg
      width='10%'
      height='10%'
      viewBox='0 0 119 38'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M0 0.869141H11.7148C13.6334 0.869141 15.0329 1.29805 15.9358 2.17847C16.8386 3.05889 17.2901 4.36823 17.2901 6.15165C17.2901 7.32554 17.0418 8.2737 16.5227 9.01867C16.0035 9.74107 15.394 10.2603 14.6492 10.5538C16.2292 10.9827 17.3127 12.0437 17.877 13.7142C18.0801 14.3238 18.1704 15.0236 18.1704 15.8137C18.1704 17.7326 17.719 19.1322 16.8161 20.0352C15.9132 20.9382 14.5137 21.3897 12.5951 21.3897H0V0.869141ZM12.0083 6.71602C12.0083 5.54212 11.4214 4.95519 10.2476 4.95519H5.25922V9.06381H10.2476C11.4214 9.06381 12.0083 8.47688 12.0083 7.30299V6.71602ZM12.8885 14.9333C12.8885 13.7594 12.3017 13.1725 11.1279 13.1725H5.25922V17.2811H11.1279C12.3017 17.2811 12.8885 16.6941 12.8885 15.5202V14.9333Z'
        fill='black'
      />
      <path
        d='M24.4676 21.3897H18.7568L26.5216 0.869141H32.3904L40.1551 21.3897H34.4444L33.1352 17.7326H25.7993L24.4676 21.3897ZM27.1085 13.8948H31.8035L29.456 7.0095L27.1085 13.8948Z'
        fill='black'
      />
      <path
        d='M59.4997 21.3897H53.9245L46.882 9.08638V21.3897H41.6001V0.869141H47.1754L54.2179 13.1725V0.869141H59.4997V21.3897Z'
        fill='black'
      />
      <path
        d='M60.6738 0.869141H66.2492L71.0796 10.8247L75.91 0.869141H81.4853L73.7205 15.9717V21.3897H68.4386V15.9717L60.6738 0.869141Z'
        fill='black'
      />
      <path
        d='M83.9676 21.3897H78.2568L86.0216 0.869141H91.8903L99.6551 21.3897H93.9444L92.6352 17.7326H85.2993L83.9676 21.3897ZM86.6085 13.8948H91.3035L88.9559 7.0095L86.6085 13.8948Z'
        fill='black'
      />
      <path
        d='M118.977 21.3897H113.402L106.359 9.08638V21.3897H101.1V0.869141H106.675L113.718 13.1725V0.869141H119V21.3897H118.977Z'
        fill='black'
      />
      <path
        d='M0 27.248H4.49181C5.59784 27.248 6.56844 27.4512 7.42618 27.8801C8.28392 28.309 8.93852 28.9186 9.41253 29.6861C9.88654 30.4762 10.1123 31.3567 10.1123 32.3951C10.1123 33.411 9.88654 34.314 9.41253 35.1041C8.93852 35.8942 8.28392 36.4811 7.42618 36.9101C6.56844 37.339 5.59784 37.5422 4.49181 37.5422H0V27.248ZM4.40155 35.9168C5.14643 35.9168 5.8236 35.7813 6.3879 35.4879C6.9522 35.1944 7.40362 34.788 7.71963 34.2463C8.03564 33.7045 8.19366 33.0949 8.19366 32.3951C8.19366 31.6953 8.03564 31.0632 7.71963 30.544C7.40362 30.0022 6.97477 29.5958 6.3879 29.3024C5.8236 29.0089 5.14643 28.8734 4.40155 28.8734H1.89603V35.9394H4.40155V35.9168Z'
        fill='black'
      />
      <path
        d='M18.6664 35.1707H13.52L12.5043 37.5637H10.5405L15.1678 27.2695H17.0413L21.691 37.5637H19.6822L18.6664 35.1707ZM18.0344 33.6582L16.0932 29.1658L14.1746 33.6582H18.0344Z'
        fill='black'
      />
      <path
        d='M24.5807 28.8734H21.1724V27.248H29.9077V28.8734H26.4993V37.5422H24.5807V28.8734Z'
        fill='black'
      />
      <path
        d='M37.5146 35.1707H32.3682L31.3524 37.5637H29.3887L34.0159 27.2695H35.8894L40.5392 37.5637H38.5303L37.5146 35.1707ZM36.8825 33.6582L34.9414 29.1658L33.0228 33.6582H36.8825Z'
        fill='black'
      />
      <path
        d='M46.7914 37.3604C46.0465 37.1346 45.4596 36.8412 45.0308 36.4574L45.6853 34.9674C46.1142 35.3061 46.6334 35.577 47.2428 35.7801C47.8523 35.9833 48.4617 36.0962 49.0937 36.0962C49.8612 36.0962 50.4254 35.9833 50.8092 35.735C51.1929 35.4867 51.3735 35.1706 51.3735 34.7643C51.3735 34.4708 51.2606 34.2225 51.0575 34.0419C50.8543 33.8613 50.5834 33.7032 50.2449 33.5904C49.9289 33.4775 49.4774 33.3646 48.9131 33.2292C48.1231 33.0486 47.4911 32.8454 47.0171 32.6648C46.5431 32.4842 46.1142 32.1907 45.7756 31.7844C45.4371 31.378 45.2565 30.8588 45.2565 30.1815C45.2565 29.6172 45.4145 29.0979 45.7305 28.6239C46.0465 28.1498 46.498 27.7886 47.13 27.5177C47.762 27.2468 48.5068 27.1113 49.4097 27.1113C50.0417 27.1113 50.6512 27.1791 51.2606 27.3371C51.8701 27.4951 52.3892 27.7209 52.8406 28.0143L52.2312 29.5043C51.7798 29.2334 51.3058 29.0302 50.8092 28.8948C50.3126 28.7593 49.8386 28.6916 49.3872 28.6916C48.6423 28.6916 48.078 28.827 47.6943 29.0754C47.3331 29.3237 47.1525 29.6623 47.1525 30.0912C47.1525 30.3847 47.2654 30.633 47.4686 30.8136C47.6717 30.9942 47.9425 31.1523 48.2811 31.2651C48.5971 31.378 49.0486 31.4909 49.6129 31.6263C50.3803 31.8069 51.0123 31.9875 51.4863 32.1681C51.9829 32.3487 52.3892 32.6422 52.7504 33.0486C53.089 33.4323 53.2696 33.9741 53.2696 34.6288C53.2696 35.1932 53.1115 35.7124 52.7955 36.1639C52.4795 36.6154 52.0281 36.9992 51.3961 37.2701C50.764 37.541 49.9966 37.6764 49.0937 37.6764C48.3037 37.699 47.5363 37.5861 46.7914 37.3604Z'
        fill='black'
      />
      <path
        d='M62.8627 35.9394V37.5422H55.1431V27.248H62.6595V28.8509H57.0617V31.5373H62.0275V33.1175H57.0617V35.9619H62.8627V35.9394Z'
        fill='black'
      />
      <path
        d='M71.7339 37.5422L69.6347 34.5172C69.5444 34.5172 69.409 34.5397 69.2284 34.5397H66.9035V37.5422H64.9849V27.248H69.2284C70.1313 27.248 70.8987 27.4061 71.5533 27.6995C72.2079 27.993 72.7271 28.4219 73.0656 28.9637C73.4268 29.5055 73.5848 30.1602 73.5848 30.9278C73.5848 31.6953 73.4042 32.3726 73.0205 32.9369C72.6368 33.5013 72.0951 33.9077 71.3953 34.1786L73.7654 37.5648H71.7339V37.5422ZM71.0568 29.3927C70.6279 29.0315 69.9958 28.8734 69.1607 28.8734H66.9261V32.9821H69.1607C69.9958 32.9821 70.6279 32.8015 71.0568 32.4403C71.4856 32.0791 71.7113 31.5824 71.7113 30.9278C71.6888 30.2505 71.4856 29.7539 71.0568 29.3927Z'
        fill='black'
      />
      <path
        d='M85.1638 27.248L80.6719 37.5422H78.7984L74.3066 27.248H76.3833L79.8142 35.1944L83.2677 27.248H85.1638Z'
        fill='black'
      />
      <path d='M86.2471 27.248H88.1657V37.5422H86.2471V27.248Z' fill='black' />
      <path
        d='M92.8834 36.9994C92.0482 36.5479 91.3936 35.9158 90.9196 35.1031C90.4456 34.2904 90.1973 33.3874 90.1973 32.3715C90.1973 31.3557 90.4456 30.4527 90.9196 29.64C91.3936 28.8273 92.0482 28.1952 92.9059 27.7437C93.7411 27.2922 94.6891 27.0664 95.7274 27.0664C96.5625 27.0664 97.33 27.2244 98.0298 27.5179C98.7295 27.8114 99.3163 28.2403 99.7903 28.8047L98.5489 29.956C97.804 29.1433 96.8786 28.7595 95.7951 28.7595C95.0954 28.7595 94.4634 28.9175 93.8991 29.2336C93.3348 29.5496 92.9059 29.9786 92.5899 30.5204C92.2739 31.0622 92.1159 31.6943 92.1159 32.3941C92.1159 33.0939 92.2739 33.7035 92.5899 34.2678C92.9059 34.8096 93.3348 35.2385 93.8991 35.5546C94.4634 35.8706 95.0954 36.0287 95.7951 36.0287C96.8786 36.0287 97.804 35.6223 98.5489 34.8096L99.7903 35.9835C99.3163 36.5479 98.7295 36.9768 98.0298 37.2703C97.33 37.5638 96.5626 37.7218 95.7048 37.7218C94.6665 37.6992 93.7185 37.4509 92.8834 36.9994Z'
        fill='black'
      />
      <path
        d='M109.361 35.9394V37.5422H101.642V27.248H109.158V28.8509H103.56V31.5373H108.526V33.1175H103.56V35.9619H109.361V35.9394Z'
        fill='black'
      />
      <path
        d='M112.386 37.3604C111.641 37.1346 111.054 36.8412 110.625 36.4574L111.28 34.9674C111.708 35.3061 112.228 35.577 112.837 35.7801C113.447 35.9833 114.056 36.0962 114.688 36.0962C115.455 36.0962 116.02 35.9833 116.403 35.735C116.787 35.4867 116.968 35.1706 116.968 34.7643C116.968 34.4708 116.855 34.2225 116.652 34.0419C116.449 33.8613 116.178 33.7032 115.839 33.5904C115.523 33.4775 115.072 33.3646 114.507 33.2292C113.717 33.0486 113.085 32.8454 112.611 32.6648C112.137 32.4842 111.708 32.1907 111.37 31.7844C111.031 31.378 110.851 30.8588 110.851 30.1815C110.851 29.6172 111.009 29.0979 111.325 28.6239C111.641 28.1498 112.092 27.7886 112.724 27.5177C113.356 27.2468 114.101 27.1113 115.004 27.1113C115.636 27.1113 116.245 27.1791 116.855 27.3371C117.464 27.4951 117.984 27.7209 118.435 28.0143L117.826 29.5043C117.374 29.2334 116.9 29.0302 116.403 28.8948C115.907 28.7593 115.433 28.6916 114.981 28.6916C114.237 28.6916 113.672 28.827 113.289 29.0754C112.927 29.3237 112.747 29.6623 112.747 30.0912C112.747 30.3847 112.86 30.633 113.063 30.8136C113.266 30.9942 113.537 31.1523 113.875 31.2651C114.191 31.378 114.643 31.4909 115.207 31.6263C115.975 31.8069 116.607 31.9875 117.081 32.1681C117.577 32.3487 117.984 32.6422 118.345 33.0486C118.683 33.4323 118.864 33.9741 118.864 34.6288C118.864 35.1932 118.706 35.7124 118.39 36.1639C118.074 36.6154 117.622 36.9992 116.99 37.2701C116.358 37.541 115.591 37.6764 114.688 37.6764C113.875 37.699 113.108 37.5861 112.386 37.3604Z'
        fill='black'
      />
    </svg>
  );
};

const Auth = () => {
  const history = useHistory();

  return (
    <div className='flex-c-jc-ac wp-100 hp-100'>
      <Logo />
      <div className='flex-r-jc-ac wp-100 mt-25'>
        <Button
          onClick={() => history.push("/o_login")}
          size='large'
          variant='outlined'
          className='mr-10'
        >
          AUTHENTICATE HERE
        </Button>
        <Button
          onClick={() => history.push("/register")}
          size='large'
          variant='contained'
        >
          ON BOARD A NEW USER
        </Button>
      </div>
    </div>
  );
};

export default Auth;
