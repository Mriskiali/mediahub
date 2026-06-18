'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { createPost, updatePost } from '@/lib/actions/posts';
import { slugify } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';
import type { PostFormProps, PostFormData, MediaType } from '@/types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const mediaTypeOptions = [
  { value: 'VIDEO', label: 'Video' },
  { value: 'AUDIO', label: 'Audio' },
  { value: 'IMAGE', label: 'Gambar' },
  { value: 'ARTICLE', label: 'Artikel' },
];

export function PostForm({ post, mode }: PostFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<PostFormData>({
    title: post?.title ?? '',
    slug: post?.slug ?? '',
    excerpt: post?.excerpt ?? '',
    content: post?.content ?? '',
    mediaType: post?.mediaType ?? 'ARTICLE',
    mediaUrl: post?.mediaUrl ?? '',
    thumbnailUrl: post?.thumbnailUrl ?? '',
    tags: post?.tags?.join(', ') ?? '',
    published: post?.published ?? false,
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: mode === 'create' ? slugify(title) : prev.slug,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        if (mode === 'create') {
          const result = await createPost(formData);
          if (result?.error) {
            setError(result.error);
            toast(result.error, 'error');
            return;
          }
        } else if (post) {
          const result = await updatePost(post.id, formData);
          if (result?.error) {
            setError(result.error);
            toast(result.error, 'error');
            return;
          }
        }
        setSuccess(true);
        toast(mode === 'create' ? 'Postingan berhasil dibuat!' : 'Postingan berhasil diperbarui!', 'success');
        router.push('/admin/posts');
        router.refresh();
      } catch {
        // Fallback catch
        toast('Terjadi kesalahan yang tidak terduga.', 'error');
      }
    });
  };

  const showMediaUrl = formData.mediaType !== 'ARTICLE';

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Status Messages */}
      {error && (
        <div className="flex items-center gap-3 border-4 border-black dark:border-white bg-[#f87171] px-4 py-3 text-black font-bold uppercase tracking-wider brutal-shadow transition-colors">
          <span className="font-mono text-2xl font-black leading-none flex-shrink-0">[!]</span>
          {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-3 border-4 border-black dark:border-white bg-[#4ade80] px-4 py-3 text-black font-bold uppercase tracking-wider brutal-shadow transition-colors">
          <span className="font-mono text-2xl font-black leading-none flex-shrink-0">[V]</span>
          Postingan berhasil {mode === 'create' ? 'dibuat' : 'diperbarui'}! Mengalihkan...
        </div>
      )}

      {/* Basic Info */}
      <div className="border-4 border-black dark:border-white bg-white dark:bg-black p-6 brutal-shadow space-y-6 transition-colors">
        <h2 className="text-xl font-black text-black uppercase tracking-widest bg-[#fde047] inline-block px-3 py-1 brutal-border">
          Informasi Dasar
        </h2>
        <Input
          id="post-title"
          name="title"
          label="Judul *"
          placeholder="Masukkan judul postingan..."
          value={formData.title}
          onChange={handleTitleChange}
          required
        />
        <Input
          id="post-slug"
          name="slug"
          label="Slug *"
          placeholder="url-friendly-slug"
          value={formData.slug}
          onChange={handleChange}
          hint="Dibuat otomatis dari judul. Harus unik."
          required
        />
        <Textarea
          id="post-excerpt"
          name="excerpt"
          label="Kutipan"
          placeholder="Deskripsi singkat tentang postingan ini..."
          value={formData.excerpt}
          onChange={handleChange}
          className="min-h-[80px]"
        />
      </div>

      {/* Media */}
      <div className="border-4 border-black dark:border-white bg-white dark:bg-black p-6 brutal-shadow space-y-6 transition-colors">
        <h2 className="text-xl font-black text-black uppercase tracking-widest bg-[#facc15] inline-block px-3 py-1 brutal-border">Media</h2>
        <Select
          id="post-media-type"
          name="mediaType"
          label="Tipe Media *"
          options={mediaTypeOptions}
          value={formData.mediaType}
          onChange={handleChange}
          required
        />
        {showMediaUrl && (
          <Input
            id="post-media-url"
            name="mediaUrl"
            label="URL Media"
            placeholder={
              formData.mediaType === 'VIDEO'
                ? 'https://youtube.com/watch?v=... atau URL video langsung'
                : formData.mediaType === 'AUDIO'
                ? 'https://... (URL MP3, OGG, atau aliran audio)'
                : 'https://... (URL gambar)'
            }
            value={formData.mediaUrl}
            onChange={handleChange}
          />
        )}
        <Input
          id="post-thumbnail-url"
          name="thumbnailUrl"
          label="URL Thumbnail"
          placeholder="https://... (gambar sampul untuk kartu postingan)"
          value={formData.thumbnailUrl}
          onChange={handleChange}
        />
        <Input
          id="post-tags"
          name="tags"
          label="Tag"
          placeholder="multimedia, video, teknologi (pisahkan dengan koma)"
          value={formData.tags}
          onChange={handleChange}
          hint="Pisahkan tag dengan koma"
        />
      </div>

      {/* Content */}
      <div className="border-4 border-black dark:border-white bg-white dark:bg-black p-6 brutal-shadow space-y-6 transition-colors">
        <h2 className="text-xl font-black text-black uppercase tracking-widest bg-[#60a5fa] inline-block px-3 py-1 brutal-border">Konten (Markdown)</h2>
        <p className="text-sm font-bold text-gray-500 dark:text-gray-400">Mendukung Markdown penuh termasuk judul, tebal, tautan, blok kode, dan tabel.</p>
        
        <div className="flex flex-col gap-6 mt-4">
          <div className="flex flex-col">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-2 bg-[#e4e4e7] dark:bg-zinc-800 text-black dark:text-white inline-block px-2 py-1 self-start brutal-border">Editor</h3>
            <Textarea
              id="post-content"
              name="content"
              label=""
              placeholder="# Judul&#10;&#10;Tulis konten Anda dalam format **Markdown**..."
              value={formData.content}
              onChange={handleChange}
              className="min-h-[500px] font-mono text-sm flex-1"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-2 bg-[#facc15] text-black inline-block px-2 py-1 self-start brutal-border">Preview</h3>
            <div className="flex-1 brutal-border bg-white dark:bg-black p-4 overflow-y-auto max-h-[500px]">
              <div className="prose prose-lg dark:prose-invert max-w-none 
                  prose-headings:font-black prose-headings:uppercase prose-headings:tracking-widest 
                  prose-a:text-[#3b82f6] hover:prose-a:text-[#2563eb] prose-a:underline prose-a:font-bold
                  prose-img:border-4 prose-img:border-black dark:prose-img:border-white prose-img:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:prose-img:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]
                  prose-pre:bg-black prose-pre:border-4 prose-pre:border-black dark:prose-pre:border-white prose-pre:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:prose-pre:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]
                  prose-blockquote:border-l-8 prose-blockquote:border-black dark:prose-blockquote:border-white prose-blockquote:bg-[#fde047] prose-blockquote:text-black prose-blockquote:not-italic prose-blockquote:font-bold prose-blockquote:px-6 prose-blockquote:py-2
                  prose-p:font-medium prose-p:leading-relaxed prose-p:text-gray-900 dark:prose-p:text-gray-100
                  prose-strong:font-black prose-strong:bg-[#facc15] prose-strong:text-black prose-strong:px-1
                  prose-code:font-bold prose-code:bg-[#e4e4e7] dark:prose-code:bg-zinc-800 prose-code:text-black dark:prose-code:text-white prose-code:px-1 prose-code:before:content-none prose-code:after:content-none
                  marker:text-black dark:marker:text-white">
                {formData.content ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {formData.content}
                  </ReactMarkdown>
                ) : (
                  <p className="text-gray-400 dark:text-gray-500 italic">Preview markdown akan muncul di sini...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Publish */}
      <div className="flex items-center justify-between border-4 border-black dark:border-white bg-[#f472b6] p-6 brutal-shadow transition-colors">
        <div>
          <p className="font-black text-black text-lg uppercase tracking-wider">Terbitkan postingan ini</p>
          <p className="text-sm font-bold text-black mt-1">
            Postingan yang tidak diterbitkan akan disembunyikan dari portal publik.
          </p>
        </div>
        <label
          htmlFor="post-published"
          className="relative inline-flex cursor-pointer items-center"
        >
          <input
            type="checkbox"
            id="post-published"
            name="published"
            checked={formData.published}
            onChange={handleChange}
            className="sr-only peer"
          />
          <div className="peer h-10 w-20 brutal-border bg-white dark:bg-gray-300 peer-checked:bg-black dark:peer-checked:bg-zinc-800 after:absolute after:left-1 after:top-1 after:h-8 after:w-8 after:brutal-border after:bg-white dark:after:bg-zinc-900 after:transition-all peer-checked:after:translate-x-10 after:shadow-sm" />
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/posts')}
          disabled={isPending}
        >
          Batal
        </Button>
        <Button
          id="post-form-submit"
          type="submit"
          isLoading={isPending}
          disabled={!formData.title || !formData.slug}
        >
          {mode === 'create' ? 'Buat Postingan' : 'Simpan Perubahan'}
        </Button>
      </div>
    </form>
  );
}
