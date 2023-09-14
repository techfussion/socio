import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import axios from "axios";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    await axios(
      {
        "method": "GET",
        "url": `http://localhost:3001/posts`,
        "headers": {
          "Authorization": `${token}`//Bearer 
        }
      }
    )
    .then(response => {
      dispatch(setPosts({ posts: response.data }));
    })
    .catch(err => {
      console.log({msg: "error from postswidget", err: err});
    })
    // const response = await fetch("http://localhost:3001/posts", {
    //   method: "GET",
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    // const data = await response.json();
    // dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    await axios(
      {
        "method": "GET",
        "url": `http://localhost:3001/posts/${userId}/posts`,
        "headers": {
          "Authorization": `${token}`//Bearer 
        }
      }
    )
    .then(response => {
      dispatch(setPosts({ posts: response.data }));
    })
    .catch(err => {
      console.log(err);
    })
    // const response = await fetch(
    //   `http://localhost:3001/posts/${userId}/posts`,
    //   {
    //     method: "GET",
    //     headers: { Authorization: `Bearer ${token}` },
    //   }
    // );
    // const data = await response.json();
    // dispatch(setPosts({ posts: data }));
  };
  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
