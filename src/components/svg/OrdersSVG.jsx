import * as React from "react"
import Svg, { Path } from "react-native-svg"
const OrdersSVG = ({color="#231F20",height=20,width=20,...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <Path
      fill={color}
      d="M13.4 15.25a.75.75 0 0 1 .75-.75h5.1a.75.75 0 0 1 0 1.5h-5.1a.75.75 0 0 1-.75-.75ZM12 1c0-.53-.47-1-1-1H1C.47 0 0 .47 0 1v14c0 .53.47 1 1 1h10c.53 0 1-.47 1-1V1Zm-10.5.5h9v13h-9v-13Zm11.9 10.125a.75.75 0 0 1 .75-.75h5.1a.75.75 0 0 1 0 1.5h-5.1a.75.75 0 0 1-.75-.75ZM13.4 8a.75.75 0 0 1 .75-.75h5.1a.75.75 0 0 1 0 1.5h-5.1A.75.75 0 0 1 13.4 8Zm0-3.625a.75.75 0 0 1 .75-.75h5.1a.75.75 0 0 1 0 1.5h-5.1a.75.75 0 0 1-.75-.75Zm0-3.625a.75.75 0 0 1 .75-.75h5.1a.75.75 0 0 1 0 1.5h-5.1a.75.75 0 0 1-.75-.75Z"
    />
  </Svg>
)
export default OrdersSVG
