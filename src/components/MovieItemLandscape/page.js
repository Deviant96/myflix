import Image from "next/image";

export default function MovieItemLandscape({ Poster, Title }) {
  return (
    <div
      className="cursor-pointer rounded-3xl overflow-hidden relative"
      style={{ position: "relative", width: "auto", height: "200px" }}
    >
      <Image
        src={Poster}
        alt=""
        sizes="500px"
        fill
        style={{
          objectFit: "cover",
        }}
      />
      <div className="flex flex-col p-3 absolute bottom-0 left-0 text-white z-[2]">
        <div className="text-2xl font-bold whitespace-break-spaces">
          {Title}
        </div>
      </div>
      <div
        className="
                    bg-gradient-to-b 
                    from-transparent 
                    to-black 
                    absolute 
                    top-0 
                    left-0 
                    w-full 
                    h-full 
                    z-[1]"
      ></div>
    </div>
  );
}
