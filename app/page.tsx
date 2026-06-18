import type { Metadata } from "next";
import { getPosts } from "@/lib/actions/posts";
import { PostGrid } from "@/components/posts/PostGrid";
import { Pagination } from "@/components/ui/Pagination";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MediaHub",
  description:
    "Jelajahi konten multimedia terbaru — video, podcast, gambar, dan artikel di portal berita kami.",
};

const categoryCards = [
  {
    href: "/category/VIDEO",
    label: "Video",
    icon: "[▶]",
    description: "Tonton konten video terkurasi",
    bg: "bg-[#fde047]",
  },
  {
    href: "/category/AUDIO",
    label: "Audio",
    icon: "[♪]",
    description: "Dengarkan podcast & musik",
    bg: "bg-[#4ade80]",
  },
  {
    href: "/category/IMAGE",
    label: "Gambar",
    icon: "[■]",
    description: "Jelajahi galeri foto",
    bg: "bg-[#f472b6]",
  },
  {
    href: "/category/ARTICLE",
    label: "Artikel",
    icon: "[≡]",
    description: "Baca artikel mendalam",
    bg: "bg-[#60a5fa]",
  },
];

interface HomePageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const limit = 6;
  const skip = (currentPage - 1) * limit;

  const { data: posts, total } = await getPosts({
    published: true,
    limit,
    skip,
  });
  const totalPages = Math.ceil((total || 0) / limit);

  // Helper to create page URLs
  const createPageUrl = (pageNumber: number) => {
    return `/?page=${pageNumber}#posts-list`;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b-4 border-black dark:border-white bg-white dark:bg-black py-24 sm:py-32 text-black dark:text-white transition-colors">
        {/* Brutalist Pattern Background */}
        <div
          className="absolute inset-0 opacity-[0.05] dark:opacity-[0.15] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 2px, transparent 2px)",
            backgroundSize: "30px 30px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="mb-8 inline-flex items-center gap-3 bg-[#fde047] px-4 py-2 text-sm font-bold uppercase tracking-widest text-black brutal-border brutal-shadow">
            <span className="font-mono text-lg font-black leading-none">
              [*]
            </span>
            Portal Konten Multimedia
          </div>
          <h1 className="mb-6 text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-black dark:text-white uppercase">
            Temukan
            <br />
            <span className="bg-black text-white dark:bg-white dark:text-black px-6 py-2 inline-block brutal-border mt-2 rotate-[-2deg] brutal-shadow">
              Multimedia
            </span>
            <br />
            Konten
          </h1>
          <p className="mx-auto mb-16 max-w-2xl text-xl font-bold text-gray-800 dark:text-gray-200 leading-relaxed uppercase tracking-wider">
            Jelajahi video, audio, gambar, dan artikel mendalam — semua dikurasi
            dalam satu portal berita multimedia.
          </p>

          {/* Category Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {categoryCards.map((cat) => {
              return (
                <Link
                  key={cat.href}
                  href={cat.href}
                  id={`home-category-${cat.label.toLowerCase()}`}
                  className={`group relative overflow-hidden brutal-border ${cat.bg} p-6 text-left transition-all duration-200 brutal-shadow brutal-shadow-hover hover:-translate-y-1 flex flex-col`}
                >
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center bg-white dark:bg-black brutal-border brutal-shadow`}
                  >
                    <span className="font-mono text-xl font-black text-black dark:text-white">
                      {cat.icon}
                    </span>
                  </div>
                  <p
                    className={`font-black text-xl text-black uppercase tracking-wider`}
                  >
                    {cat.label}
                  </p>
                  <p className="text-sm font-bold text-black mt-2 leading-snug">
                    {cat.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section
        id="posts-list"
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 bg-[#facc15] px-4 py-2 brutal-border brutal-shadow">
            <span className="font-mono text-xl font-black leading-none text-black">
              [↗]
            </span>
            <h2 className="text-2xl font-black uppercase tracking-widest text-black">
              Postingan Terbaru
            </h2>
          </div>
        </div>
        <PostGrid posts={posts} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          createPageUrl={createPageUrl}
        />
      </section>
    </div>
  );
}
