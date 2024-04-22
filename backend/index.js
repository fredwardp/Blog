import express from "express";
import multer from "multer";
import cors from "cors";
import { body, validationResult, param } from "express-validator";
import { readBlogArticle, writeBlogArticle } from "./filesystem.js";

// Server anlegen
const app = express();

// ressourcen werden im body versendet
// der body einer request muss geparsed werden, um auf seinen Inhalt zu greifen
// dazu verwenden wir einen Body-Parser (zB: express.json())
// express.json() ist ein body-parser-middleware von express der json inhalte parsed
app.use(express.json());

app.use(express.static("uploads"));
const upload = multer({ dest: "./uploads" });

app.post("/api/v1/uploads", upload.single("img"), (req, res) => {
  res.json({ imgUrl: req.file.filename });
});

// Um den Fehler im Browser "Corse policy blablabla" zu verhindern
app.use(cors());

// Jede request loggen mit der login middleware
app.use((req, _, next) => {
  console.log("New request:", req.method, req.url);
  next();
});

// jede einzelne request Anfrage aufgreifen
app.get("/api/v1/articles", (_, res) => {
  readBlogArticle()
    .then((articles) => res.status(200).json(articles))
    .catch((err) =>
      res.status(500).json({ err, message: "Internal Server Error" })
    );
});

app.get("/api/v1/articles/:id", (req, res) => {
  const articleId = req.params.id;
  readBlogArticle()
    .then((articles) =>
      articles.find((article) => article.id.toString() === articleId)
    )
    .then((articleFound) => {
      if (articleFound) {
        res.status(200).json(articleFound);
      } else {
        res.status(404).json("Could not fight this article");
      }
    })
    .catch((err) =>
      res.status(500).json({ err, message: "Internal Server error" })
    );
});

app.post("/api/v1/articles", (req, res) => {
  const timeMs = Date.now();
  const actDate = new Date(timeMs);
  const articleTemplate = {
    id: Date.now(),
    time: actDate,
    titel: req.body.titel,
    text: req.body.text,
    imgUrl: req.body.imgUrl,
  };

  readBlogArticle()
    .then((articles) => [...articles, articleTemplate])
    .then((newArticles) => writeBlogArticle(newArticles))
    .then((newArticles) => res.status(200).json(newArticles))
    .catch((err) =>
      res.status(200).json({ err, message: "Internal server error" })
    );
});

app.patch("/api/v1/articles/:id", (req, res) => {
  const articleId = req.params.id;
  const updArticle = req.body;

  readBlogArticle()
    .then((articles) =>
      articles.map((article) => {
        if (article.id.toString() === articleId) {
          return {
            ...article,
            ...updArticle,
          };
        } else {
          return article;
        }
      })
    )
    .then((updatedArticles) => writeBlogArticle(updatedArticles))
    .then((updatedArticles) => res.status(200).json(updatedArticles))
    .catch((err) =>
      res.status(500).json({ err, message: "Internal server error patch" })
    );
});

app.delete("/api/v1/articles/:id", (req, res) => {
  const articleId = req.params.id;
  readBlogArticle()
    .then((articles) =>
      articles.filter((article) => article.id.toString() !== articleId)
    )
    .then((updArticles) => writeBlogArticle(updArticles))
    .then((updArticles) => res.status(200).json(updArticles))
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Internal Server Error while deleting post", err })
    );
});

const PORT = 309;

app.listen(PORT, () => console.log("Server ready at Port:", PORT));
