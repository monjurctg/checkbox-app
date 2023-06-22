import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ActiveHome = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={22}
    fill="none"
    {...props}
  >
    <Path
      fill="#BE202E"
      d="M21 12v10h-6v-6H9v6H3V12H0L12 0l12 12h-3Zm-1-5.907V1h-3v2.093l3 3Z"
    />
  </Svg>
)
export default ActiveHome
