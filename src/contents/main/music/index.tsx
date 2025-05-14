import musicData from "@/data/songs.json";
import Image from "next/image";
import {
  FaAmazon,
  FaYoutube,
  FaSpotify,
  FaXTwitter,
  FaTiktok,
} from "react-icons/fa6";

export default function Music() {
  return (
    <section className="py-12 px-12">
      {/* <h2 className="text-2xl font-bold mb-6">Músicas</h2> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {musicData.map((track) => (
          <div
            key={track.title}
            className="flex flex-col items-center p-4 rounded-xl shadow-lg"
          >
            <Image
              src={track.cover} // Substitua pelo seu logo
              alt={track.title}
              width={200}
              height={200}
              className="rounded mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{track.title}</h3>
            {/* <p className="text-sm text-gray-400 mb-4">{track.description}</p> */}
            <div className="flex gap-4 text-xl">
              <a
                href={track.links.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaSpotify />
              </a>
              <a
                href={track.links.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube />
              </a>
              <a
                href={track.links.amazon}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaAmazon />
              </a>
              <a
                href={track.links.tiktok}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTiktok />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
