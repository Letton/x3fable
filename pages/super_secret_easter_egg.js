import JSConfetti from "js-confetti";
import { useState, useRef, useCallback, useEffect } from "react";

export default function Secret_easter_egg() {
  const [text, setText] = useState("Нажми на меня!");
  const jsConfettiRef = useRef();
  const texts = ["Ты солнышко", "Ты зайка", "Ты умничка", "Ты золотце"];
  useEffect(() => {
    jsConfettiRef.current = new JSConfetti();
  }, []);

  const handleClick = useCallback(() => {
    if (jsConfettiRef.current) {
      jsConfettiRef.current
        .addConfetti({
          confettiColors: [
            "#9b5de5",
            "#f15bb5",
            "#fee440",
            "#00bbf9",
            "#00f5d4",
          ],
          confettiRadius: 6,
          confettiNumber: 300,
        })
        .then(() => console.log("Manual batch completed"));
      console.log(Math.floor(Math.random() * texts.length));
      setText(texts[Math.floor(Math.random() * texts.length)]);
    }
  }, [jsConfettiRef, texts]);

  return (
    <div
      style={{
        background: "#fff",
        display: "flex",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <button
        onClick={handleClick}
        style={{
          all: "initial",
          margin: "0 auto",
          "font-family": "sans-serif",

          padding: "10px 26px",
          "font-size": "18px",
          "border-radius": "6px",

          color: "#fff",
          "background-color": "#ff4cc7",
          cursor: "pointer",
        }}
      >
        {text}
      </button>
    </div>
  );
}
