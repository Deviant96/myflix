import Image from "next/image";

export default function MovieItemPortrait({ Poster, Title, onClick }) {
  return (
    <div
      className="rounded-3xl relative h-80 cursor-pointer"
      onClick={() => onClick()}
    >
      <Image
        src={Poster ? Poster : `https://placehold.co/600x240/FFFFFF/000000/png`}
        width={600}
        height={240}
        className="absolute top-0 left-0 z-0 w-full h-full"
        alt=""
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
