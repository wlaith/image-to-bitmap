/* eslint-disable @next/next/no-img-element */
export default function Header() {
  return (
    <div className="flex items-center border-b">
      <div
        style={{ padding: "0 20px", overflow: "hidden", whiteSpace: "nowrap" }}
      >
        <h1
          style={{
            fontSize: "60px",
            fontFamily: "Silkscreen, sans-serif",
            display: "inline-block",
            whiteSpace: "nowrap",
            animation: "moveLeftToRight 10s linear infinite",
          }}
        >
          convert JPGs to bit maps
        </h1>

        <style>
          {`
          @keyframes moveLeftToRight {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
        </style>
      </div>
      <div className="w-1/3 flex gap-4">
        <div className="border-l h-fill"></div>
        <a
          className="flex text-2xl items-center gap-2 rounded-full h-fit px-3 py-2 border"
          href="https://github.com/wlaith/image-to-bitmap"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>Github</p>
          <img
            src="images/icons/Arrow.svg"
            alt="arrow"
            className="h-7 w-7 border rounded-full p-1"
          ></img>
        </a>
      </div>
    </div>
  );
}
