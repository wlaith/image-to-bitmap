import dynamic from "next/dynamic";

const Sketch = dynamic(() => import("../components/ImageSketch"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="p-20 flex w-full justify-between">
      <h1>Pixelation Effect</h1>
      <div className=" top-0 left-0 rounded-2xl">
        <Sketch />
      </div>
    </div>
  );
}
