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
  text_primary1: {
    color: colors.primary_1,
  },
  text_primary2: {
    color: colors.primary_2,
  },

  text_primary3: {
    color: colors.primary_3,
  },
  text_primary4: {
    color: colors.primary_4,
  },
  bg_primary1: {
    backgroundColor: colors.primary_1,
  },
  mt_5: {
    marginTop: scale(5),
  },
  mt_10: {
    marginTop: scale(10),
  },
  mt_15: {
    marginTop: scale(15),
  },
  mt_20: {
    marginTop: scale(20),
  },
  mt_25: {
    marginTop: scale(25),
  },
  mt_35: {
    marginTop: scale(35),
  },
  text_center: {
    textAlign: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
};
