import "./SingleArticle.css";
const SingleArticle = ({ articleData }) => {
  console.log(articleData.imgUrl);
  return (
    <article>
      <img src={"http://localhost:309/" + articleData.imgUrl} alt="" />
      <h3>{articleData.titel}</h3>
      <p>{articleData.text}</p>
    </article>
  );
};

export default SingleArticle;
