import React, { useState, useEffect } from "react";
import CommentsList from "./CommentsList";

const commentURL = "http://127.0.0.1:5555/reviews";

function Comments({
  review,
  usercomment,
  product,
  commentsDictionary,
  setCommentsDictionary,
}) {
  const [apiComments, setApiComments] = useState([]);


  function fetchCommentData() {
    fetch(commentURL)
      .then((response) => response.json())
      .then((data) => setApiComments(data));
  }

  useEffect(() => fetchCommentData(), []);

  return (
    <div className="other-user-comments">
      <h3>
        <u>Reviews</u>
      </h3>
      <p>
        {/* <b>{review.user_name}</b>: {review.comment} */}
      </p>
      <CommentsList
        apiComments={apiComments}
        usercomment={usercomment}
        product={product}
        commentsDictionary={commentsDictionary}
        setCommentsDictionary={setCommentsDictionary}
        fetchCommentData={fetchCommentData}
      />
    </div>
  );
}

export default Comments;
