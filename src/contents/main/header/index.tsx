import Image from "next/image";
import {
  FaAmazon,
  FaYoutube,
  FaSpotify,
  FaXTwitter,
  FaTiktok,
} from "react-icons/fa6";

export default function Header() {
  return (
    <header>
      <div className="flex flex-col items-center">
        {/* Logo */}
        <div className="flex items-center gap-0">
          <Image
            src="/images/logo.png" // Substitua pelo seu logo
            alt="Grove Lake Logo"
            width={250}
            height={250}
          />
          <h1 className="sr-only">Grove Lake Music, Art and Store</h1>
        </div>

        {/* Redes Sociais */}
        <div className="flex gap-8 text-2xl">
          <a
            href="https://www.tiktok.com/@grovelakemusic"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTiktok />
          </a>
          <a
            href="https://music.amazon.com.br/artists/B0DFNP9NYX/grove-lake"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaAmazon />
          </a>
          <a
            href="https://www.youtube.com/channel/UCDi5A0S_5_mRYij1SFg6WtQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube />
          </a>
          <a
            href="https://open.spotify.com/intl-pt/artist/3w5QkuCxzp8kT4YZjJ1HEI?si=7ZAKKAlgQ-iLCYDSazhERQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaSpotify />
          </a>
          {/* <a
            href="https://x.com/grovelake"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter />
          </a> */}
        </div>
      </div>
    </header>
  );
}
