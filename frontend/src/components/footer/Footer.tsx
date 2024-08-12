import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          padding: 20,
          minHeight: "20vh",
          maxHeight: "30vh",
          marginTop: 70,
        }}>
        <p style={{ fontSize: "30px", textAlign: "center" }}>
          Author -
          <Link
            className="nav-link"
            target="_blank"
            to={"https://github.com/KimBergstroem"}>
            Github
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
