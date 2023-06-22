

import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Text from "../tags/Text"
const HomeSVG = ({ color="#231F20",size, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    
    {...props}
  >
    
    <Path
      fill={color}
      d="M20 6.093V1h-3v2.093l3 3ZM24 12 12 0 0 12h3v10h7v-5h4v5h7V12h3Zm-5 8h-3v-5H8v5H5V9.74l7-6.912 7 6.99V20Z"
    />
  </Svg>
)
export default HomeSVG