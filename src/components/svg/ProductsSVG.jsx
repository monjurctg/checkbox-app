import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ProductsSVG = ({color="#231F20",...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={23}
    fill="none"
    {...props}
  >
    <Path
      fill={color}
      fillRule="evenodd"
      d="M23.001 6.066v12.065L12 24 1 18.131V6l11-6 11.001 6.066ZM2 17.531l9.5 5.069V12.03L2 7.084v10.447ZM22.001 7.143 12.5 12.032V22.6l9.501-5.069V7.143Zm-5.52 1.716L6.947 3.895 2.598 6.268l9.404 4.896 4.479-2.305ZM8.005 3.318l9.565 4.98 3.832-1.972-9.405-5.185-3.992 2.177Z"
      clipRule="evenodd"
    />
    <Path
      fill={color}
      fillRule="evenodd"
      d="M22.001 6.066v12.065L11 24 0 18.131V6l11-6 11.001 6.066ZM1 17.531l9.5 5.069V12.03L1 7.084v10.447ZM21.001 7.143 11.5 12.032V22.6l9.501-5.069V7.143Zm-5.52 1.716L5.947 3.895 1.598 6.268l9.404 4.896 4.479-2.305ZM7.005 3.318l9.565 4.98 3.832-1.972-9.405-5.185-3.992 2.177Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default ProductsSVG
