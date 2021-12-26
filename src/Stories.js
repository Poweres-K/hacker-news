import React from "react";
import { useGlobalContext } from "./context";

const SingleStory = React.memo(
  ({ title, objectID, points, author, url, num_comments, handleRemove }) => {
    return (
      <article className="story" key={objectID}>
        <h4 className="title">{title}</h4>
        <p className="info">
          {points} points by <span>{author} | </span>
          {num_comments} comments
        </p>
        <div>
          <a
            href={url}
            target="_blank"
            className="read-link"
            rel="noopener noreferrer"
          >
            read more
          </a>
          <button
            className="remove-btn"
            onClick={() => {
              handleRemove(objectID);
            }}
          >
            Remove
          </button>
        </div>
      </article>
    );
  }
);

const Stories = () => {
  const { news, loading, handleRemove } = useGlobalContext();

  if (loading) {
    return <div className="loading"></div>;
  }
  return (
    <section className="stories">
      {news.map((story) => {
        return (
          <SingleStory
            key={story.objectID}
            {...story}
            handleRemove={handleRemove}
          />
        );
      })}
    </section>
  );
};

export default Stories;
