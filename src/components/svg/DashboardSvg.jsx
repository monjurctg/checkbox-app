// import * as React from "react"
// import Svg, { Path } from "react-native-svg"
// const DashboardSvg = ({props}) => (
//     <Svg
//     xmlns="http://www.w3.org/2000/svg"
//     width={18}
//     height={18}
//     fill="none"
//     {...props}
//   >
//     <Path
//       fill="#231F20"
//       d="M18 1c0-.478-.379-1-1-1H1C.38 0 0 .519 0 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1V1ZM8 1.5v15H1.5v-15H8Zm1.5 8h7v7h-7v-7Zm7-8V8h-7V1.5h7Z"
//     />
//   </Svg>
// )
// export default DashboardSvg


import * as React from "react"
import Svg, { Path } from "react-native-svg"
const DashboardSvg = ({color="#231F20",size,...props}) => (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    {...props}
  >
    <Path
      fill={color}
      d="M18 1c0-.478-.379-1-1-1H1C.38 0 0 .519 0 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1V1ZM8 1.5v15H1.5v-15H8Zm1.5 8h7v7h-7v-7Zm7-8V8h-7V1.5h7Z"
    />
  </Svg>
)
export default DashboardSvg
