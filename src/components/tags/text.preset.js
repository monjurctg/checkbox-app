import {scale} from "../../../utils/funtions";
import {colors} from "../../theme/colors";
import {typography} from "../../theme/typography";

export const Base = {
  fontFamily: typography.regular,
  fontSize: scale(16),
  color: colors.black,
};

const Bold = {
  fontFamily: typography.bold,
  color: colors.black,
};
export const Base_bold = {
  fontFamily: typography.bold,
  fontSize: scale(16),
  color: colors.black,
};

export const presset = {
  default: Base,
  bold: Bold,
  h1: {
    ...Bold,
    fontSize: scale(30),
  },
  h2: {
    ...Bold,
    fontSize: scale(24),
  },
  h3: {
    ...Bold,
    fontSize: scale(20),
  },
  p1: {
    ...Base,
  },
  p2: {
    ...Base,
    fontSize: scale(14),
  },
  p3: {
    ...Base,
    fontSize: scale(12),
  },
};
