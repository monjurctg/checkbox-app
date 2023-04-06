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
<Text style={{marginHorizontal: "bold"}}></Text>;

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
  text_white: {
    color: colors.white,
  },
  bg_primary1: {
    backgroundColor: colors.primary_1,
  },
  bg_secoundary2: {
    backgroundColor: colors.secoundary_2,
  },
  text_center: {
    textAlign: "center",
  },
  lh_24: {
    lineHeight: scale(24),
  },

  // font weight
  fw_100: {
    fontWeight: "100",
  },
  fw_325: {
    fontWeight: "325",
  },
  fw_200: {
    fontWeight: "200",
  },
  fw_300: {
    fontWeight: " 300",
  },
  fw_325: {
    fontWeight: "325",
  },
  fw_350: {
    fontWeight: "350",
  },
  fw_400: {
    fontWeight: "400",
  },
  fw_500: {
    fontWeight: "500",
  },
  fw_600: {
    fontWeight: "600",
  },
  fw_700: {
    fontWeight: "700",
  },
  fw_800: {
    fontWeight: "800",
  },

  // font size
  fs_30: {
    fontSize: scale(30),
  },
  fs_24: {
    fontSize: scale(24),
  },
  fs_20: {
    fontSize: scale(20),
  },
  fs_18: {
    fontSize: scale(18),
  },
  fs_16: {
    fontSize: scale(16),
  },
  fs_14: {
    fontSize: scale(14),
  },
  fs_12: {
    fontSize: scale(12),
  },
  // line height
  lh_14: {
    lineHeight: scale(14),
  },
  lh_16: {
    lineHeight: scale(16),
  },
  lh_20: {
    lineHeight: scale(20),
  },
  lh_30: {
    lineHeight: scale(30),
  },

  text_center: {
    textAlign: "center",
  },
  // bordercol
  border_1: {
    borderWidth: 1,
    borderColor: colors.secoundary_3,
    padding: scale(10),
  },
  border_2: {
    borderWidth: 2,
    borderColor: colors.secoundary_3,
    padding: scale(10),
  },
  border_3: {
    borderWidth: 3,
    borderColor: colors.secoundary_3,
    padding: scale(10),
  },

  radius_5: {
    borderRadius: scale(5),
  },

  radius_4: {
    borderRadius: scale(4),
  },
  radius_10: {
    borderRadius: scale(10),
  },
  radius_15: {
    borderRadius: scale(15),
  },
  radius_20: {
    borderRadius: scale(20),
  },
  border_round: {
    borderRadius: scale(200),
  },
  border_primary1: {
    borderColor: colors.primary_1,
  },

  // padding

  p_5: {
    padding: scale(5),
  },
  p_10: {
    padding: scale(10),
  },
  p_15: {
    padding: scale(15),
  },
  p_20: {
    padding: scale(20),
  },
  p_25: {
    padding: scale(25),
  },

  p_30: {
    padding: scale(30),
  },
  ph_5: {
    paddingHorizontal: scale(5),
  },
  ph_10: {
    paddingHorizontal: scale(10),
  },
  ph_15: {
    paddingHorizontal: scale(15),
  },
  ph_20: {
    paddingHorizontal: scale(20),
  },
  ph_25: {
    paddingHorizontal: scale(25),
  },

  ph_30: {
    paddingHorizontal: scale(30),
  },
  pl_5: {
    paddingLeft: scale(5),
  },
  pl_10: {
    paddingLeft: scale(10),
  },
  pl_15: {
    paddingLeft: scale(15),
  },
  pl_20: {
    paddingLeft: scale(20),
  },
  pl_25: {
    paddingLeft: scale(25),
  },
  pl_30: {
    paddingLeft: scale(30),
  },
  pr_5: {
    paddingRight: scale(5),
  },
  pr_10: {
    paddingRight: scale(10),
  },
  pr_15: {
    paddingRight: scale(15),
  },
  pr_20: {
    paddingRight: scale(20),
  },
  pr_25: {
    paddingRight: scale(25),
  },
  pr_30: {
    paddingRight: scale(30),
  },

  pt_5: {
    paddingTop: scale(5),
  },
  pt_10: {
    paddingTop: scale(10),
  },
  pt_15: {
    paddingTop: scale(15),
  },
  pt_20: {
    paddingTop: scale(20),
  },
  pt_25: {
    paddingTop: scale(25),
  },
  pt_35: {
    paddingTop: scale(35),
  },

  // margin
  m_5: {
    margin: scale(5),
  },
  m_10: {
    margin: scale(10),
  },
  m_15: {
    margin: scale(15),
  },
  m_20: {
    margin: scale(20),
  },
  m_25: {
    margin: scale(25),
  },

  m_30: {
    margin: scale(30),
  },
  mh_5: {
    marginHorizontal: scale(5),
  },
  mh_10: {
    marginHorizontal: scale(10),
  },
  mh_15: {
    marginHorizontal: scale(15),
  },
  mh_20: {
    marginHorizontal: scale(20),
  },
  mh_25: {
    marginHorizontal: scale(25),
  },

  mh_30: {
    marginHorizontal: scale(30),
  },
  ml_5: {
    marginLeft: scale(5),
  },
  ml_10: {
    marginLeft: scale(10),
  },
  ml_15: {
    marginLeft: scale(15),
  },
  ml_20: {
    marginLeft: scale(20),
  },
  ml_25: {
    marginLeft: scale(25),
  },
  ml_30: {
    marginLeft: scale(30),
  },
  mr_5: {
    marginRight: scale(5),
  },
  mr_10: {
    marginRight: scale(10),
  },
  mr_15: {
    marginRight: scale(15),
  },
  mr_20: {
    marginRight: scale(20),
  },
  mr_25: {
    marginRight: scale(25),
  },
  mr_30: {
    marginRight: scale(30),
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

  active: {
    backgroundColor: colors.secoundary_1,
    color: colors.white,
  },

  // flexboz

  jc_between: {
    justifyContent: "space-between",
  },
  jc_even: {
    justifyContent: "space-evenly",
  },
  jc_end: {
    justifyContent: "flex-end",
  },
  jc_start: {
    justifyContent: "flex-start",
  },

  alignCenter: {
    alignSelf: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  d_flex: {
    display: "flex",
  },
  wrap: {
    flexWrap: "wrap",
  },
  row: {
    flexDirection: "row",
  },
};
