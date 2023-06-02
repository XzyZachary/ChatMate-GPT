/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-30.
 */

import React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
const SvgComponent = (props: SvgProps) => {
  return (
    <Svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      {...props}>
      <Path
        d="M14.0111 25.8686C8.36964 25.8686 2.53442 23.0068 2.53442 18.2184C2.53442 15.8241 3.96225 13.0669 6.5548 10.455C9.03654 7.95664 11.8782 6.40454 13.9708 6.40454C14.8452 6.40454 15.5812 6.68095 16.1004 7.20362C16.6735 7.78037 16.9418 8.62304 16.8758 9.64054L16.8573 9.93165L17.1349 9.84222C18.1209 9.52488 19.0288 9.36417 19.8344 9.36417C21.4919 9.36417 22.3113 10.043 22.7069 10.6126C23.0552 11.1127 23.3888 11.9982 23.002 13.3765L22.9535 13.5501L23.1214 13.6156C25.1603 14.4099 26.3299 15.925 26.3299 17.7724C26.329 21.6016 21.2696 25.8686 14.0111 25.8686ZM13.9708 8.19593C12.6531 8.19593 10.2419 9.28488 7.82577 11.7176C5.60133 13.9589 4.3256 16.3281 4.3256 18.2184C4.3256 21.8372 9.35302 24.0772 14.0111 24.0772C20.4365 24.0772 24.5373 20.3432 24.5373 17.7725C24.5373 16.0983 22.8394 15.3862 22.1093 15.1577C21.8077 15.0666 21.3547 14.9297 21.1198 14.4434C20.9624 14.1171 20.9657 13.7399 21.1306 13.3223C21.4294 12.5653 21.4667 11.9662 21.2363 11.6348C21.0212 11.3254 20.5234 11.1549 19.8343 11.1549C18.9731 11.1549 17.8575 11.4253 16.6927 11.9163L16.5245 11.9872H16.5013L16.4725 11.996C16.2837 12.0543 16.105 12.084 15.9415 12.084C15.5636 12.084 15.2294 11.9224 15.0239 11.6406C14.8974 11.4675 14.712 11.0929 14.8921 10.5294C15.1876 9.57251 15.1646 8.80143 14.8306 8.46533C14.6519 8.2868 14.3629 8.19593 13.9708 8.19593H13.9708Z"
        fill={props.color}
      />
      <Path
        d="M13.0227 23.2522C9.63893 23.2522 7.01312 21.5228 6.7791 19.1399C6.51845 16.4861 9.28115 14.1113 13.0687 13.7339C13.394 13.7014 13.7207 13.685 14.0475 13.6847C17.4306 13.6847 20.0561 15.4138 20.2896 17.7966C20.5494 20.4513 17.7867 22.8261 14.0005 23.2035C13.6755 23.2357 13.3492 23.2519 13.0227 23.2522ZM14.0472 15.2778C13.774 15.2778 13.4979 15.2918 13.2265 15.3185C10.3748 15.603 8.19377 17.2474 8.36426 18.9836C8.51428 20.5089 10.5169 21.6592 13.0229 21.6592C13.2947 21.6592 13.5706 21.6451 13.8429 21.6182C16.6937 21.3341 18.8747 19.6892 18.7042 17.9515C18.5553 16.4274 16.5526 15.2778 14.0472 15.2778Z"
        fill={props.color}
      />
      <Path
        d="M12.4692 20.5917C12.2538 20.5917 12.0439 20.5589 11.8456 20.4946C11.3939 20.3476 11.054 20.0516 10.8883 19.6604C10.7296 19.2859 10.7478 18.8637 10.9397 18.4713C11.267 17.8026 12.0285 17.3533 12.8345 17.3533C13.0094 17.3533 13.1813 17.3752 13.3455 17.4182C13.8187 17.5411 14.1978 17.8355 14.3863 18.2257C14.5629 18.5915 14.5626 19.013 14.3856 19.413C14.0808 20.1072 13.293 20.5917 12.4692 20.5917ZM28.0167 12.8223C27.8813 12.822 27.7477 12.791 27.626 12.7317C27.5042 12.6724 27.3975 12.5863 27.3138 12.4799C27.2301 12.3734 27.1716 12.2494 27.1426 12.1171C27.1137 11.9848 27.1151 11.8477 27.1468 11.716C27.2457 11.3041 27.2956 10.882 27.2955 10.4583C27.2955 7.51974 24.9048 5.12884 21.966 5.12884C21.7416 5.12884 21.5158 5.14285 21.2951 5.17048C21.1784 5.18263 21.0604 5.17168 20.948 5.13825C20.8355 5.10482 20.7307 5.04956 20.6396 4.97564C20.5485 4.90172 20.4729 4.81058 20.417 4.70742C20.3611 4.60426 20.3261 4.4911 20.3139 4.37441L20.3138 4.37318C20.2886 4.14267 20.3542 3.91144 20.4965 3.72837C20.6388 3.5453 20.8467 3.42475 21.0763 3.39222C21.3714 3.35564 21.6686 3.33729 21.966 3.33728C25.8926 3.33728 29.0868 6.53181 29.0868 10.4583C29.0868 11.026 29.0197 11.5909 28.8875 12.137C28.8408 12.3324 28.7295 12.5062 28.5718 12.6306C28.414 12.755 28.219 12.8226 28.0181 12.8225L28.0167 12.8223Z"
        fill={props.color}
      />
      <Path
        d="M24.8854 11.6652C24.7692 11.6651 24.6545 11.6395 24.5492 11.5903C24.444 11.5412 24.3507 11.4696 24.276 11.3807C24.2013 11.2917 24.1469 11.1875 24.1167 11.0753C24.0865 10.9631 24.0812 10.8457 24.1011 10.7312C24.1247 10.5961 24.1345 10.4562 24.1306 10.3157C24.1229 10.0457 24.0621 9.77988 23.9515 9.53346C23.8409 9.28704 23.6828 9.06484 23.4863 8.8796C23.1068 8.51901 22.603 8.31842 22.0795 8.31946C22.0583 8.31946 21.9902 8.32086 21.9902 8.32086C21.7839 8.32172 21.5854 8.24176 21.4373 8.0981C21.2892 7.95445 21.2032 7.75851 21.1978 7.55225C21.194 7.4469 21.2112 7.34184 21.2484 7.24321C21.2856 7.14457 21.3421 7.05433 21.4145 6.97775C21.486 6.90144 21.572 6.84009 21.6675 6.79728C21.7629 6.75446 21.8659 6.73102 21.9704 6.72831C22.4495 6.7137 22.9266 6.79399 23.3745 6.96457C23.8224 7.13515 24.232 7.39265 24.58 7.72223C24.9295 8.05024 25.2104 8.44434 25.4065 8.8817C25.6026 9.31906 25.7099 9.79098 25.7223 10.2701C25.7295 10.5167 25.7118 10.7633 25.6696 11.0064C25.6375 11.1909 25.5412 11.3582 25.3978 11.4788C25.2545 11.5994 25.0731 11.6655 24.8858 11.6656H24.8847V11.6652H24.8854Z"
        fill={props.color}
      />
    </Svg>
  )
}
const SvgIcon = React.memo(SvgComponent)
export default SvgIcon