import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { commentPost } from "../../actions/ActionPosts";
import useStyles from "./postDetailsStyles";

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const scrollRef = useRef();

  const handleSubmit = async () => {
    const fullComment = `${user.result.name}: ${comment}`;

    const newComment = await dispatch(commentPost(fullComment, post._id));

    setComments(newComment);
    setComment("");

    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments.map((c, idx) => (
            <Typography key={idx} gutterBottom variant="subtitle1">
              <strong>{c.split(": ")[0]}</strong>
              {c.split(":")[1]}
            </Typography>
          ))}
          <div ref={scrollRef} />
        </div>
        {user?.result?.name && (
          <div className={classes.typeComment}>
            <Typography gutterBottom variant="h6">
              Write a Comment
            </Typography>
            <TextField
              label="Add a comment"
              rows={4}
              multiline
              fullWidth
              variant="outlined"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              fullWidth
              style={{ marginTop: "10px" }}
              variant="contained"
              color="primary"
              disabled={!comment}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
