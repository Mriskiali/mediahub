import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPosts } from "@/lib/actions/posts";
import { PostGrid } from "@/components/posts/PostGrid";
import { Pagination } from "@/components/ui/Pagination";
import { getMediaTypeLabel } from "@/lib/utils";
import type { MediaType } from "@/types";

interface CategoryPageProps {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ page?: string }>;
}

const validTypes: MediaType[] = ["VIDEO", "AUDIO", "IMAGE", "ARTICLE"];

const mediaTypeIcons: Record<MediaType, React.ReactNode> = {
  VIDEO: <span className="font-mono text-2xl font-black text-black leading-none">[▶]</span>,
  AUDIO: <span className="font-mono text-2xl font-black text-black leading-none">[♪]</span>,
  IMAGE: <span className="font-mono text-2xl font-black text-black leading-none">[■]</span>,
  ARTICLE: <span className="font-mono text-2xl font-black text-black leading-none">[≡]</span>,
};

const mediaTypeColors: Record<MediaType, string> = {
  VIDEO: "bg-[#fde047]",
  AUDIO: "bg-[#4ade80]",
  IMAGE: "bg-[#f472b6]",
  ARTICLE: "bg-[#60a5fa]",
};

const mediaTypeDescriptions: Record<MediaType, string> = {
  VIDEO: "Tonton konten video dari koleksi multimedia kami.",
  AUDIO: "Dengarkan podcast, musik, dan rekaman audio.",
  IMAGE: "Jelajahi galeri foto dan konten visual yang menakjubkan.",
  ARTICLE: "Baca artikel mendalam, tutorial, dan konten tertulis.",
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { type } = await params;
  const label = getMediaTypeLabel(type.toUpperCase());
  return {
    title: `Konten ${label}`,
    description: `Jelajahi semua konten ${label.toLowerCase()} di MediaHub.`,
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { type } = await params;
  const { page } = await searchParams;
  const mediaType = type.toUpperCase() as MediaType;

  if (!validTypes.includes(mediaType)) {
    notFound();
  }

  const currentPage = Number(page) || 1;
  const limit = 6;
  const skip = (currentPage - 1) * limit;

  const { data: posts, total } = await getPosts({ published: true, mediaType, limit, skip });
  const totalPages = Math.ceil((total || 0) / limit);

  // Helper to create page URLs
  const createPageUrl = (pageNumber: number) => {
    return `/category/${mediaType}?page=${pageNumber}#posts-list`;
  };

  const icon = mediaTypeIcons[mediaType];
  const description = mediaTypeDescriptions[mediaType];
  let label = getMediaTypeLabel(mediaType);

  if (label === "Image") label = "Gambar";
  else if (label === "Article") label = "Artikel";

  const bgClass = mediaTypeColors[mediaType] || "bg-white";

  return (
    <div id="posts-list" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-white dark:bg-black transition-colors min-h-[calc(100vh-16rem)]">
      {/* Category Header */}
      <div className="mb-12">
        <div
          className={`mb-6 inline-flex items-center gap-4 ${bgClass} px-6 py-4 brutal-border brutal-shadow`}
        >
          {icon}
          <h1 className="text-4xl font-black text-black uppercase tracking-widest">
            {label}
          </h1>
        </div>
        <p className="text-xl font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider mb-4 max-w-2xl">
          {description}
        </p>
        <p className="text-sm font-black text-black dark:text-white uppercase tracking-wider bg-[#e4e4e7] dark:bg-zinc-800 inline-block px-3 py-1 brutal-border">
          {total || 0} {total === 1 ? "postingan" : "postingan"}{" "}
          ditemukan
        </p>
      </div>

      {/* Grid */}
      <PostGrid posts={posts} />

      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        createPageUrl={createPageUrl} 
      />
    </div>
  );
}
