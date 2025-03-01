import dynamic from "next/dynamic";

const Sketch = dynamic(() => import("../components/ImageSketch"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <Sketch />
    </div>
  );
}
