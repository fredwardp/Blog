import { useEffect, useState } from "react";
import SingleArticle from "../SingleArticle/SingleArticle";
import "./Articles.css";

const Articles = () => {
  const [allArticles, setAllArticles] = useState();
  useEffect(() => {
    fetch("http://localhost:309/api/v1/articles")
      .then((res) => res.json())
      .then((articles) => setAllArticles(articles))
      .catch((err) => console.log({ message: "Could not load data", err }));
  }, []);
  console.log(allArticles);

  return (
    <>
      <div className="gold-line"></div>
      <section className="content-section container">
        <h2>Artikel</h2>
        <div className="article-wrapper">
          {allArticles
            ? allArticles.map((article) => (
                <SingleArticle key={article.id} articleData={article} />
              ))
            : ""}
        </div>
      </section>
    </>
  );
};

export default Articles;
