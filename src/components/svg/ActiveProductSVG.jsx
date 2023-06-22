import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ActiveProductSVG = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#BE202E"
      fillRule="evenodd"
      d="M10.499 12.03v11.971l-10.5-5.603V6.563l10.5 5.467ZM22 18.398 11.499 24V12.032L22 6.628v11.77ZM5.111 3.212 15.72 8.736l-4.719 2.428L.528 5.711l4.583-2.499Zm16.362 2.563-4.664 2.4-10.641-5.54L10.999 0l10.474 5.775Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default ActiveProductSVG
