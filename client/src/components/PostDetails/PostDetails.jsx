import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, getPostsBySearch } from "../../actions/ActionPosts";
import useStyles from "./postDetailsStyles";
import CommentSection from "./CommentSection";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.ReducerPosts);
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const recommendedPosts = posts.filter(({ _id }) => _id !== post?._id);

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  const openPost = (_id) => navigate(`/posts/${_id}`);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post]);

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper className={classes.loadingPaper} elevation={6}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return (
    <Paper style={{ borderRadius: "15px", padding: "20px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection post={post} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>
      {recommendedPosts.length ? (
        <div
          className={classes.section}
          style={{ margin: "20px", cursor: "default" }}
        >
          <Typography gutterBottom variant="h5">
            You Might Also Like:
          </Typography>
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(
              ({ title, message, name, likes, selectedFile, _id }) => (
                <>
                  <Divider />
                  <div
                    style={{ margin: "20px", cursor: "pointer" }}
                    onClick={() => openPost(_id)}
                    key={_id}
                  >
                    <Typography gutterBottom variant="h6">
                      {title}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2">
                      {message}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2">
                      {name}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1">
                      Likes: {likes.length}
                    </Typography>
                    <img src={selectedFile} width="200px" />
                  </div>
                </>
              )
            )}
          </div>
        </div>
      ) : (
        <>
          <Divider style={{ margin: "20px" }} />
          <div className={classes.section} style={{ cursor: "default" }}>
            <Typography gutterBottom variant="h5">
              No Recommendations for this Post!
            </Typography>
          </div>
        </>
      )}
    </Paper>
  );
};

export default PostDetails;
