import { TypeAnimation } from "react-type-animation";
import GraphemeSplitter from "grapheme-splitter";

const splitter = new GraphemeSplitter();

const TypingAnim = () => {
  return (
    <TypeAnimation
      splitter={(str) => splitter.splitGraphemes(str)}
      sequence={[
        "Welcome 🇬🇧",
        1000,
        "Benvenuto 🇮🇹",
        1000,
        "欢迎 🇨🇳",
        1000,
        "Добре дошли 🇧🇬 ",
        1000,
        "Bienvenido 🇪🇸",
        1000,
        "Bienvenue 🇫🇷",
        1000,
      ]}
      speed={20}
      style={{
        fontSize: "45px",
        color: "#fff",
        fontWeight: "900",
        display: "inline-block",
        textShadow: "1px 1px 20px #fff",
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnim;
