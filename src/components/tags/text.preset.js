import {colors} from "../../theme/colors";
import {typography} from "../../theme/typography";

export const Base = {
  fontFamily: typography.regular,
  fontSize: 16,
  color: colors.black,
};

const Bold = {
  fontFamily: typography.bold,
  color: colors.black,
};
export const Base_bold = {
  fontFamily: typography.bold,
  fontSize: 16,
  color: colors.black,
};

export const presset = {
  default: Base,
  bold: Bold,
  h1: {
    ...Bold,
    fontSize: 30,
  },
  h2: {
    ...Bold,
    fontSize: 24,
  },
  h3: {
    ...Bold,
    fontSize: 20,
  },
  p1: {
    ...Base,
  },
};
