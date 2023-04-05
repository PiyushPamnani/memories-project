import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "rgba(0,183,255, 1)",
  },
  image: {
    marginLeft: "15px",
  },
  [theme.breakpoints.down("md")]: {
    mainContainer: {
      display: "flex",
      flexDirection: "column-reverse",
    },
  },
  [theme.breakpoints.down("xs")]: {
    heading: {
      fontSize: "35px",
    },
    image: {
      width: "35px",
      height: "35px",
    },
  },
}));
