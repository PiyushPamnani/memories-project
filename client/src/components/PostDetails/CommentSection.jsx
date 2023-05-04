import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { RemoveCircleOutline } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { commentPost, deleteComment } from "../../actions/ActionPosts";
import useStyles from "./postDetailsStyles";

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const scrollRef = useRef();
  console.log(post);

  const handleSubmit = async () => {
    const fullComment = `${user.result.name}: ${comment}~ ${user.result.email}`;

    const newComment = await dispatch(commentPost(fullComment, post._id));

    setComments(newComment);
    setComment("");

    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleDelete = async (commentIdx) => {
    await dispatch(deleteComment(post._id, commentIdx));

    const newComment = comments.filter(
      (comment, index) => index !== commentIdx
    );

    setComments(newComment);
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments.map((c, idx) => (
            <Typography
              className={classes.commentSection}
              key={idx}
              gutterBottom
              variant="subtitle1"
            >
              <span>
                <strong>{c.split(": ")[0]}: </strong>
                {c.substring(c.indexOf(":") + 1, c.indexOf("~"))}
              </span>
              {(user?.result?.googleId === post?.creator ||
                user?.result?._id === post?.creator ||
                c.split("~ ")[1] === user?.result?.email) && (
                <span
                  onClick={() => handleDelete(idx)}
                  className={classes.deleteButton}
                >
                  <RemoveCircleOutline fontSize="small" />
                </span>
              )}
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
