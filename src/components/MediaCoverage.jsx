import React, { useState, useEffect } from 'react';
import { FileDown, Newspaper, Camera, Mail, Phone, User, Landmark, Send, CheckCircle, Calendar, ExternalLink, Video, ZoomIn, X } from 'lucide-react';
import { submitForm, fetchNews } from '../utils/api';

export default function MediaCoverage({ onSubmitSuccess }) {
  const [newsArticles, setNewsArticles] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    outlet: '',
    idNumber: '',
    coverageType: 'print',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    const loadNews = () => {
      fetchNews().then(data => {
        if (data && data.length > 0) {
          setNewsArticles(data);
        }
      });
    };

    loadNews();

    window.addEventListener('focus', loadNews);
    window.addEventListener('storage', loadNews);

    return () => {
      window.removeEventListener('focus', loadNews);
      window.removeEventListener('storage', loadNews);
    };
  }, []);

  const pressKits = [
    {
      title: 'Official Press Release (June 2025)',
      desc: 'Official announcement of categories, guest list, and jury details for the Divine Awards 2025.',
      fileSize: '1.2 MB',
      type: 'PDF'
    },
    {
      title: 'Brand Asset Kit & Logos',
      desc: 'Includes high-resolution vector logos, color codes, and usage guidelines for Dhara Foundations.',
      fileSize: '4.8 MB',
      type: 'ZIP'
    },
    {
      title: 'Event Schedule & Media Guidelines',
      desc: 'Detailed itinerary, routing details, and photography regulations for accredited reporters.',
      fileSize: '850 KB',
      type: 'PDF'
    },
    {
      title: 'Divine Awards 2025 Retrospective',
      desc: 'Statistics, winner profile summaries, and high-quality royalty-free images from last year.',
      fileSize: '18.4 MB',
      type: 'ZIP'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDownload = (title) => {
    alert(`Downloading press asset: ${title} (Mock Event)`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.outlet || !formData.email || !formData.idNumber) {
      alert('Please fill in all required fields.');
      return;
    }

    const submission = {
      senderName: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: `Press Pass accreditation request for ${formData.outlet}`,
      message: `ID Number: ${formData.idNumber}. Coverage Type: ${formData.coverageType}. Notes: ${formData.message || 'None'}`,
      type: 'media',
      organization: formData.outlet
    };

    submitForm('General Enquiries', submission);

    onSubmitSuccess({
      title: 'Media Accreditation Request Received',
      message: `Namaste, ${formData.name}. Your application for press credentials representing "${formData.outlet}" has been registered. Our media relations desk will evaluate your press ID (${formData.idNumber}) and verify coverage details. Approved passes will be emailed to ${formData.email}.`,
      details: [
        { label: 'Journalist', value: formData.name },
        { label: 'Publication/Outlet', value: formData.outlet },
        { label: 'Coverage Class', value: formData.coverageType.toUpperCase() }
      ]
    });
  };

  return (
    <div className="py-16 px-6 md:px-12 max-w-7xl mx-auto w-full space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono font-bold text-[var(--color-primary-accent)] uppercase tracking-[3px]">
          Press Room
        </span>
        <h2 className="text-4xl sm:text-5xl font-bold text-[var(--color-deep-forest-dark)] font-serif leading-tight">
          News &amp; Media Coverage
        </h2>
        <div className="w-24 h-1 bg-[var(--color-saffron-glow)] mx-auto rounded-full"></div>
      </div>

      <div className="space-y-8 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {newsArticles.map((art, idx) => {
              const isVideo = art.type === 'video' || !!art.mediaUrl;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-[#D9CBB0]/60 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between group h-full"
                >
                  {isVideo ? (
                    <div 
                      className="relative overflow-hidden bg-[#121310] shrink-0 flex items-center justify-center p-2 cursor-pointer group/img" 
                      style={{ minHeight: '280px', maxHeight: '380px' }}
                      onClick={() => setSelectedVideo(art)}
                      title="Click to play video"
                    >
                      <video
                        src={art.mediaUrl}
                        preload="metadata"
                        className="w-full h-full max-h-[360px] object-contain transition-transform duration-500 group-hover/img:scale-105"
                        muted
                        playsInline
                      />
                      <div className="absolute inset-0 bg-black/35 flex items-center justify-center group-hover/img:bg-black/50 transition-colors">
                        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover/img:scale-110 transition-transform duration-300 border border-white/30">
                          <Video className="w-6 h-6 text-[#FFD27F]" fill="#FFD27F" />
                        </div>
                      </div>
                      <div className="absolute top-3 left-3 bg-[#D9762E] text-white px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider shadow flex items-center gap-1 z-10">
                        <Video size={12} /> Video Coverage
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="relative overflow-hidden bg-[#121310] shrink-0 flex items-center justify-center p-2 cursor-pointer group/img" 
                      style={{ minHeight: '280px', maxHeight: '380px' }}
                      onClick={() => setSelectedImage(art)}
                      title="Click to view full image"
                    >
                      <img
                        src={encodeURI(art.image)}
                        alt={art.title}
                        className="w-full h-full max-h-[360px] object-contain transition-transform duration-500 group-hover/img:scale-105"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80";
                        }}
                      />
                      <div className="absolute top-3 left-3 bg-[var(--color-deep-forest)] text-[var(--color-saffron-glow)] px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider shadow flex items-center gap-1 z-10">
                        <Newspaper size={12} /> Newspaper Coverage
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/75 text-white text-[10px] px-2.5 py-1 rounded-lg opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center gap-1 font-mono font-bold z-10">
                        <ZoomIn size={12} /> Full Image
                      </div>
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-mono text-[var(--color-primary-accent)] font-bold">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[var(--color-saffron-glow-dark)]" />
                          <span>{art.date}</span>
                        </div>
                        {isVideo && (
                          <span className="text-[10px] bg-[#D9762E]/10 text-[#D9762E] px-2 py-0.5 rounded-full font-sans font-bold">
                            Playable Video
                          </span>
                        )}
                      </div>

                      <h4 className="font-bold text-base text-[var(--color-deep-forest-dark)] font-serif leading-snug group-hover:text-[var(--color-primary-accent)] transition-colors line-clamp-2">
                        {art.title}
                      </h4>
                      <p className="text-xs text-[var(--ink-soft)] leading-relaxed font-sans line-clamp-3">
                        {art.summary}
                      </p>
                    </div>

                    {art.link && (
                      <a
                        href={art.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#D9762E] hover:underline font-bold pt-2 border-t border-neutral-100"
                      >
                        <ExternalLink size={14} /> Read Full Report / Watch Source
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Full-Screen Lightbox Modal for Uncut Newspaper Image Viewing */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9999] flex items-center justify-center p-4 sm:p-8 animate-fade-in" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-5xl w-full max-h-[90vh] bg-[#121310] border border-white/20 rounded-3xl overflow-hidden flex flex-col p-4 sm:p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h4 className="font-serif font-bold text-lg text-white line-clamp-1">{selectedImage.title}</h4>
                <p className="text-xs text-[var(--color-saffron-glow)] font-mono">{selectedImage.date}</p>
              </div>
              <button 
                onClick={() => setSelectedImage(null)}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-auto flex items-center justify-center min-h-0 bg-black/50 rounded-2xl p-2">
              <img 
                src={encodeURI(selectedImage.image)} 
                alt={selectedImage.title} 
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
              />
            </div>
            {selectedImage.summary && (
              <p className="text-xs text-neutral-300 leading-relaxed font-sans line-clamp-2 pt-1">
                {selectedImage.summary}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Full-Screen Video Player Lightbox Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[9999] flex items-center justify-center p-4 sm:p-8 animate-fade-in" onClick={() => setSelectedVideo(null)}>
          <div className="relative max-w-4xl w-full bg-[#121310] border border-white/20 rounded-3xl overflow-hidden flex flex-col p-4 sm:p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h4 className="font-serif font-bold text-lg text-white line-clamp-1">{selectedVideo.title}</h4>
                <p className="text-xs text-[var(--color-saffron-glow)] font-mono">{selectedVideo.date}</p>
              </div>
              <button 
                onClick={() => setSelectedVideo(null)}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center min-h-0 bg-black rounded-2xl p-2 relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <video 
                controls 
                autoPlay
                src={selectedVideo.mediaUrl} 
                className="w-full h-full object-contain rounded-lg shadow-2xl"
              />
            </div>
            {selectedVideo.summary && (
              <p className="text-xs text-neutral-300 leading-relaxed font-sans line-clamp-2 pt-1">
                {selectedVideo.summary}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
