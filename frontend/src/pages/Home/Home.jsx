import Articles from "../../components/Articles/Articles";
import "./Home.css";
const Home = () => {
  return (
    <>
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-h1">
            Glory <span>MMA</span> <span>Blog</span>
          </h1>
        </div>
      </section>
      <Articles />
    </>
  );
};

export default Home;
