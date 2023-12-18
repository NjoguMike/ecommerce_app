import React, { useState, useEffect } from "react";
import ls from "local-storage"

const commentURL = "http://127.0.0.1:5555/reviews";

function CommentsList(props) {
  const {
    product,
    commentsDictionary,
    setCommentsDictionary,
    apiComments = [],
    fetchCommentData,
  } = props;
  console.log({ commentsDictionary })

  const user = ls.get("user");

  const [newComment, setNewComment] = useState("");
  const [productComments, setProductComments] = useState([]);

  useEffect(
    () =>
      setProductComments(
        apiComments.filter((comment) => comment.item_id === product.id),
      ),
    [apiComments],
  );

  function handleSubmit(e) {
    fetch(commentURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comment: newComment,
        customer_id: user.id, // TODO: Get persisted customer id
        item_id: product.id,
      }),
    })
      .then((res) => res.json())
      .then((comment) => {
        setCommentsDictionary({
          ...commentsDictionary,
          ...{ [product.id]: [...productComments, comment] },
        });
        fetchCommentData();
        setNewComment("");
      });
  }

  function handleDelete(id) {
    fetch(`${commentURL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
      }),
    })
      .then((res) => res.json())
      .then((comment) => {
        setCommentsDictionary({
          ...commentsDictionary,
          ...{ [product.id]: [...productComments, comment] },
        });
        fetchCommentData();
        setNewComment("");
      });
  }

  function handleEdit(id, comment) {
    fetch(`${commentURL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        comment,
      }),
    })
      .then((res) => res.json())
      .then((comment) => {
        setCommentsDictionary({
          ...commentsDictionary,
          ...{ [product.id]: [...productComments, comment] },
        });
        fetchCommentData();
        setNewComment("");
      });
  }

  return (
    <div className="comments-section">
      <div className="comments-list">
        {productComments.map((comment) => (
          <div className="comment-field" key={comment.id}>
            <div>
              <p>
                <b>{comment.customer.firstname}</b>:{comment.comment}
              </p>
            </div>
            <div className="comment-field-btns">
              <button
                className="comment-btn"
                onClick={(_) => handleDelete(comment.id)}
              >
                <i className="bi bi-trash"></i>
                Delete
              </button>
              <button
                className="comment-btn"
                onClick={(_) =>
                  handleEdit(
                    comment.id,
                    "First purchase and was not dissapointed.",
                  )
                }
              >
                <i className="bi bi-pen"></i>
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="comment-input">
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => {
            setNewComment(e.target.value);
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          type="text"
          placeholder="Add a comment..."
          id="comment"
        />
        <button onClick={handleSubmit} className="comment-btn">
          Submit
        </button>
      </div>
    </div>
  );
}

export default CommentsList;
