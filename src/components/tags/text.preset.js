import {Text} from "react-native";
import {scale} from "../../../utils/funtions";
import {colors} from "../../theme/colors";
import {typography} from "../../theme/typography";

export const Base = {
  // fontFamily: typography.regular,
  fontSize: scale(16),
  color: colors.black,
};

const Bold = {
  // fontFamily: typography.bold,
  color: colors.black,
};
export const Base_bold = {
  // fontFamily: typography.bold,
  fontSize: scale(16),
  color: colors.black,
};
{
  /* <Text style={{fontWeight:"bold"}}></Text>; */
}
export const presset = {
  default: Base,
  // bold: Bold,
  h1: {
    ...Bold,
    fontSize: scale(30),
  },
  bold: {
    fontWeight: "bold",
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
    leineHeight: scale(30),
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
  text_second1: {
    color: colors.secoundary_1,
  },
  text_second2: {
    color: colors.secoundary_2,
  },
  text_second3: {
    color: colors.secoundary_3,
  },
  text_second4: {
    color: colors.secoundary_4,
  },
  text_second1: {
    color: colors.secoundary_1,
  },
  bg_primary1: {
    backgroundColor: colors.primary_1,
  },

  // margin Top
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

  // font weight
  fw_100: {
    fontWeight: 100,
  },
  fw_200: {
    fontWeight: 200,
  },
  fw_300: {
    fontWeight: 300,
  },
  fw_400: {
    fontWeight: 400,
  },
  fw_500: {
    fontWeight: 500,
  },
  fw_600: {
    fontWeight: 600,
  },
  fw_700: {
    fontWeight: 700,
  },
  fw_800: {
    fontWeight: 800,
  },

  // font size
  fs_1: {
    fontSize: scale(30),
  },
  fs_2: {
    fontSize: scale(24),
  },
  fs_3: {
    fontSize: scale(20),
  },
  fs_4: {
    fontSize: scale(16),
  },
  fs_5: {
    fontSize: scale(14),
  },
  fs_6: {
    fontSize: scale(12),
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
