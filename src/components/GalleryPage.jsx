import React, { useState, useEffect } from 'react';
import { Image, Search, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { fetchGallery, API_BASE } from '../utils/api';

const highlightNumbers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 55, 56, 57, 58, 59,
  67, 68, 69, 70, 71, 72, 73, 74, 76, 77, 78, 79, 80, 81, 82, 84, 85, 86, 87, 88, 89, 90,
  91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110,
  111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127
];

const defaultGalleryImages = [
  ...highlightNumbers.map(num => ({
    "src": `/images/Highlights1/Dhara Divine Awards - Highlight (${num}).png`,
    "category": "Highlights",
    "caption": `Dhara Divine Awards - Highlight Moment ${num}`,
    "isHighlight": true
  })),
  {
    "src": "/images/Section 1/1.Shri.S. Ravi (Sivachariyar).jpg",
    "category": "1. Spiritual Piller",
    "caption": "1. Shri.S. Ravi (Sivachariyar)"
  },
  {
    "src": "/images/Section 1/2.Shri.Raju(alias) Lakshmana Bhattar (Bhattachariyar).jpg",
    "category": "1. Spiritual Piller",
    "caption": "2. Shri.Raju(alias) Lakshmana Bhattar (Bhattachariyar)"
  },
  {
    "src": "/images/Section 1/3.Shri.S.Vasu(Sakthi Worship).png",
    "category": "1. Spiritual Piller",
    "caption": "3. Shri.S.Vasu(Sakthi Worship)"
  },
  {
    "src": "/images/Section 1/4.Shri S Lakshmipathiraja (Maadhvam).jpg",
    "category": "1. Spiritual Piller",
    "caption": "4. Shri S Lakshmipathiraja (Maadhvam)"
  },
  {
    "src": "/images/Section 1/5.Shri. Siva Sri. Vadhavoor Adigal(Sivanadiyar).jpg",
    "category": "1. Spiritual Piller",
    "caption": "5. Shri. Siva Sri. Vadhavoor Adigal(Sivanadiyar)"
  },
  {
    "src": "/images/Section 1/6.Shri. Valayapettai Re.Krishnan (Koumaaram).jpg",
    "category": "1. Spiritual Piller",
    "caption": "6. Shri. Valayapettai Re.Krishnan (Koumaaram)"
  },
  {
    "src": "/images/Section 1/7.Shri. Veeramanidasan(Ayyappa Devote).jpg",
    "category": "1. Spiritual Piller",
    "caption": "7. Shri. Veeramanidasan(Ayyappa Devote)"
  },
  {
    "src": "/images/Section 1/8. Shri. Krishnan Anand Swami(Siddhar Valzhipadu ).jpg",
    "category": "1. Spiritual Piller",
    "caption": "8. Shri. Krishnan Anand Swami(Siddhar Valzhipadu )"
  },
  {
    "src": "/images/Section 1/9.Shri.Maaligaiparai M.P Karuppusamy(Karuppusamy Worship).jpg",
    "category": "1. Spiritual Piller",
    "caption": "9. Shri.Maaligaiparai M.P Karuppusamy(Karuppusamy Worship)"
  },
  {
    "src": "/images/Section 1/10.Shri. Sadhu Janagiraman(Vallalar Sanmaargam).jpg",
    "category": "1. Spiritual Piller",
    "caption": "10. Shri. Sadhu Janagiraman(Vallalar Sanmaargam)"
  },
  {
    "src": "/images/Section 1/11.Shri. S.Parasuram Guruji(Shridi Sai Devote).png",
    "category": "1. Spiritual Piller",
    "caption": "11. Shri. S.Parasuram Guruji(Shridi Sai Devote)"
  },
  {
    "src": "/images/Section 1/12.Shri.S.Ganesan(Uzhavaarapani).jpg",
    "category": "1. Spiritual Piller",
    "caption": "12. Shri.S.Ganesan(Uzhavaarapani)"
  },
  {
    "src": "/images/Section 1/13.Shri.G.Vijayan (Village Temple poosari).png",
    "category": "1. Spiritual Piller",
    "caption": "13. Shri.G.Vijayan (Village Temple poosari)"
  },
  {
    "src": "/images/Section 2/1.Shri. T Srinivasachariya Swami Ji(Spiritual Books).jpg",
    "category": "2. Institutions and Organisation",
    "caption": "1. Shri. T Srinivasachariya Swami Ji(Spiritual Books)"
  },
  {
    "src": "/images/Section 2/2.Shri.N.Gopalaswami IAS(Rtd)(School Education Institution).png",
    "category": "2. Institutions and Organisation",
    "caption": "2. Shri.N.Gopalaswami IAS(Rtd)(School Education Institution)"
  },
  {
    "src": "/images/Section 2/3.Shri.Kannan Ji(Spiritual Article).png",
    "category": "2. Institutions and Organisation",
    "caption": "3. Shri.Kannan Ji(Spiritual Article)"
  },
  {
    "src": "/images/Section 2/4.Shri Dr Mohan Rajan(Rajan Eye Care).jpg",
    "category": "2. Institutions and Organisation",
    "caption": "4. Shri Dr Mohan Rajan(Rajan Eye Care)"
  },
  {
    "src": "/images/Section 2/5. Shri.Srivathsan TR(Restaurant).png",
    "category": "2. Institutions and Organisation",
    "caption": "5. Shri.Srivathsan TR(Restaurant)"
  },
  {
    "src": "/images/Section 2/6.Shri. S.Senthil Kumar(College Educational Institution).jpg",
    "category": "2. Institutions and Organisation",
    "caption": "6. Shri. S.Senthil Kumar(College Educational Institution)"
  },
  {
    "src": "/images/Section 2/7.Shri. Vallal Illam (Anna Dhan Centre).jpg",
    "category": "2. Institutions and Organisation",
    "caption": "7. Shri. Vallal Illam (Anna Dhan Centre)"
  },
  {
    "src": "/images/Section 2/8.Shri. T.N.Sekar(Industries).png",
    "category": "2. Institutions and Organisation",
    "caption": "8. Shri. T.N.Sekar(Industries)"
  },
  {
    "src": "/images/Section 2/9.Smt. Dr.B Thanuja(Women Organisation).jpg",
    "category": "2. Institutions and Organisation",
    "caption": "9. Smt. Dr.B Thanuja(Women Organisation)"
  },
  {
    "src": "/images/Section 2/10.Smt. Anusiya Devi(Waterbody Aarti).jpg",
    "category": "2. Institutions and Organisation",
    "caption": "10. Smt. Anusiya Devi(Waterbody Aarti)"
  },
  {
    "src": "/images/Section 2/11.Shri. Sivasubbaraman Nagarajan(Pooja Products).jpg",
    "category": "2. Institutions and Organisation",
    "caption": "11. Shri. Sivasubbaraman Nagarajan(Pooja Products)"
  },
  {
    "src": "/images/Section 2/12.Shri. Siva Sri Sivakumar(Spiritual Vaadhyam).jpg",
    "category": "2. Institutions and Organisation",
    "caption": "12. Shri. Siva Sri Sivakumar(Spiritual Vaadhyam)"
  },
  {
    "src": "/images/Section 2/13.Shri. Swami Kannan Bhattachariyar(Spiritual Tourism).png",
    "category": "2. Institutions and Organisation",
    "caption": "13. Shri. Swami Kannan Bhattachariyar(Spiritual Tourism)"
  },
  {
    "src": "/images/Section 2/14.Smt.S. Aruljothi( Spiritual Media).png",
    "category": "2. Institutions and Organisation",
    "caption": "14. Smt.S. Aruljothi( Spiritual Media)"
  },
  {
    "src": "/images/Section 2/15.Shri .Regunathan Parambarai Thennamarakudi Vaidhyasalai(Siddha Hospital).jpg",
    "category": "2. Institutions and Organisation",
    "caption": "15. Shri .Regunathan Parambarai Thennamarakudi Vaidhyasalai(Siddha Hospital)"
  },
  {
    "src": "/images/Section 2/16.Shri .Prakash(Mahalaxmi textiles).jpg",
    "category": "2. Institutions and Organisation",
    "caption": "16. Shri .Prakash(Mahalaxmi textiles)"
  },
  {
    "src": "/images/Section 2/17.Shri.PS Vairakkannu(S.V jewellery).jpg",
    "category": "2. Institutions and Organisation",
    "caption": "17. Shri.PS Vairakkannu(S.V jewellery)"
  },
  {
    "src": "/images/Section 2/18.Shri. Shakthi Saravanan Ulaganathan(Spiritual Meditation Centre).jpg",
    "category": "2. Institutions and Organisation",
    "caption": "18. Shri. Shakthi Saravanan Ulaganathan(Spiritual Meditation Centre)"
  },
  {
    "src": "/images/Section 2/19.Smt. Dr. Dhakshayani Ramachandran(Spiritual Music School).jpg",
    "category": "2. Institutions and Organisation",
    "caption": "19. Smt. Dr. Dhakshayani Ramachandran(Spiritual Music School)"
  },
  {
    "src": "/images/Section 3/1.Hon'ble Justice Shri T.N Vallinayagam(Rtd)(Judicial).jpg",
    "category": "3. Individuals and Professionals",
    "caption": "1. Hon'ble Justice Shri T.N Vallinayagam(Rtd)(Judicial)"
  },
  {
    "src": "/images/Section 3/2.Shri.Kanal Kannan(Cinema And Arts).jpg",
    "category": "3. Individuals and Professionals",
    "caption": "2. Shri.Kanal Kannan(Cinema And Arts)"
  },
  {
    "src": "/images/Section 3/3.Shri.S. Balasubramaniam(Entrepreneur).jpg",
    "category": "3. Individuals and Professionals",
    "caption": "3. Shri.S. Balasubramaniam(Entrepreneur)"
  },
  {
    "src": "/images/Section 3/4.Shri. Solar Sai(Spiritual Singer).jpg",
    "category": "3. Individuals and Professionals",
    "caption": "4. Shri. Solar Sai(Spiritual Singer)"
  },
  {
    "src": "/images/Section 3/5.Shri .Thaamal KO Saravanan(Spiritual Speaker).jpg",
    "category": "3. Individuals and Professionals",
    "caption": "5. Shri .Thaamal KO Saravanan(Spiritual Speaker)"
  },
  {
    "src": "/images/Section 3/6.Agasthiyar Jeeva Nadi Shri. M Babu(Astrologer).jpg",
    "category": "3. Individuals and Professionals",
    "caption": "6. Agasthiyar Jeeva Nadi Shri. M Babu(Astrologer)"
  },
  {
    "src": "/images/Section 3/7.Shri. N.Suresh(Advocate).jpg",
    "category": "3. Individuals and Professionals",
    "caption": "7. Shri. N.Suresh(Advocate)"
  },
  {
    "src": "/images/Section 3/8.Shri.Prof.Dr. K.R. Venkatesan(Professor).jpg",
    "category": "3. Individuals and Professionals",
    "caption": "8. Shri.Prof.Dr. K.R. Venkatesan(Professor)"
  },
  {
    "src": "/images/Section 3/9.Shri .CK Ashok Kumar(Social Evangelist).jpg",
    "category": "3. Individuals and Professionals",
    "caption": "9. Shri .CK Ashok Kumar(Social Evangelist)"
  },
  {
    "src": "/images/Section 3/10.Shri .Prabhakaran(Auditor).jpg",
    "category": "3. Individuals and Professionals",
    "caption": "10. Shri .Prabhakaran(Auditor)"
  },
  {
    "src": "/images/Section 3/11. Smt. Dr. Rajeshwari Ramachandran(Doctor).png",
    "category": "3. Individuals and Professionals",
    "caption": "11. Smt. Dr. Rajeshwari Ramachandran(Doctor)"
  },
  {
    "src": "/images/Section 3/12.Shri. Vyasai Thangam Ravi Ji(Traditional Sports Trainer).jpg",
    "category": "3. Individuals and Professionals",
    "caption": "12. Shri. Vyasai Thangam Ravi Ji(Traditional Sports Trainer)"
  },
  {
    "src": "/images/Section 3/13.Smt. Charulatha Rajgopal(Temple Rehabilitation Volunteer).jpg",
    "category": "3. Individuals and Professionals",
    "caption": "13. Smt. Charulatha Rajgopal(Temple Rehabilitation Volunteer)"
  },
  {
    "src": "/images/Section 3/14.Shri. K. Ezhilan(Agricultural).jpg",
    "category": "3. Individuals and Professionals",
    "caption": "14. Shri. K. Ezhilan(Agricultural)"
  },
  {
    "src": "/images/Section 3/15. Shri. PSV Kumar(Construction industry).jpg",
    "category": "3. Individuals and Professionals",
    "caption": "15. Shri. PSV Kumar(Construction industry)"
  },
  {
    "src": "/images/Section 3/16. Shri. Anand Megalingam(Scientist).png",
    "category": "3. Individuals and Professionals",
    "caption": "16. Shri. Anand Megalingam(Scientist)"
  },
  {
    "src": "/images/Section 3/17.Shri.(late) Indra Soundarrajan(Writer).jpg",
    "category": "3. Individuals and Professionals",
    "caption": "17. Shri.(late) Indra Soundarrajan(Writer)"
  },
  {
    "src": "/images/Section 3/18.Shri.Nannilam Brahma Shri R.Srikrishna Ganabadigal(Vedic Scholar).jpg",
    "category": "3. Individuals and Professionals",
    "caption": "18. Shri.Nannilam Brahma Shri R.Srikrishna Ganabadigal(Vedic Scholar)"
  },
  {
    "src": "/images/Section 3/19.Shri. Yatheeshwar Raja(Spiritual Music Director).jpg",
    "category": "3. Individuals and Professionals",
    "caption": "19. Shri. Yatheeshwar Raja(Spiritual Music Director)"
  },
  {
    "src": "/images/Section 4/1.Sivasri. P. Swaminatha Sivachariyar(Veda Padashala).jpg",
    "category": "4. Grass Route Eminents",
    "caption": "1. Sivasri. P. Swaminatha Sivachariyar(Veda Padashala)"
  },
  {
    "src": "/images/Section 4/2.Shri. Kannan Gurukkal(Bakthi Sevaks in Need).jpg",
    "category": "4. Grass Route Eminents",
    "caption": "2. Shri. Kannan Gurukkal(Bakthi Sevaks in Need)"
  },
  {
    "src": "/images/Section 4/3.Shri. S. Shyam Sundar(Gho Shalas).jpg",
    "category": "4. Grass Route Eminents",
    "caption": "3. Shri. S. Shyam Sundar(Gho Shalas)"
  },
  {
    "src": "/images/Section 4/4.Brahma Shri.S. Perumal Sthapathiar(Black Stone Sculptor).jpg",
    "category": "4. Grass Route Eminents",
    "caption": "4. Brahma Shri.S. Perumal Sthapathiar(Black Stone Sculptor)"
  },
  {
    "src": "/images/Section 4/5.Shri.Siva (Arts & Gallery).png",
    "category": "4. Grass Route Eminents",
    "caption": "5. Shri.Siva (Arts & Gallery)"
  },
  {
    "src": "/images/Section 4/6.Shri. Appar Lakshmanan(Temple Carpenter).jpg",
    "category": "4. Grass Route Eminents",
    "caption": "6. Shri. Appar Lakshmanan(Temple Carpenter)"
  },
  {
    "src": "/images/Section 4/7.Shri.Artist Padmavasan(Temple Artist).jpg",
    "category": "4. Grass Route Eminents",
    "caption": "7. Shri.Artist Padmavasan(Temple Artist)"
  },
  {
    "src": "/images/Section 4/8.Shri. N. Arunachalam(Madapalli Worker).jpg",
    "category": "4. Grass Route Eminents",
    "caption": "8. Shri. N. Arunachalam(Madapalli Worker)"
  },
  {
    "src": "/images/Section 4/9.Malligai Chakravarthi Srila Sri.Dr.S. Nagarathinam(Flower Decors).jpg",
    "category": "4. Grass Route Eminents",
    "caption": "9. Malligai Chakravarthi Srila Sri.Dr.S. Nagarathinam(Flower Decors)"
  },
  {
    "src": "/images/Section 4/10.Shri. S. Rajagopal(Sacred Elephant keeper).jpg",
    "category": "4. Grass Route Eminents",
    "caption": "10. Shri. S. Rajagopal(Sacred Elephant keeper)"
  },
  {
    "src": "/images/Section 4/11.Shri.M. Sankar(Potters And GoluDoll Maker).jpg",
    "category": "4. Grass Route Eminents",
    "caption": "11. Shri.M. Sankar(Potters And GoluDoll Maker)"
  },
  {
    "src": "/images/Section 4/12.Shri.M.SampathStreet Play Artist Sri.Kannapiran Nadaga Mandram(Street Play Artist).jpg",
    "category": "4. Grass Route Eminents",
    "caption": "12. Shri.M.SampathStreet Play Artist Sri.Kannapiran Nadaga Mandram(Street Play Artist)"
  },

];

export default function GalleryPage() {
  const cleanCategory = (cat) => {
    if (cat === '1. Spiritual Piller') return '1. Spiritual Pillar';
    if (cat === '2. Institutions and Organisation') return '2. Institutions and Organisations';
    return cat;
  };

  const [galleryImages, setGalleryImages] = useState(() => 
    defaultGalleryImages.map(img => ({ ...img, category: cleanCategory(img.category) }))
  );
  const [selectedCategory, setSelectedCategory] = useState('All Sections');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const loadGallery = async () => {
      const data = await fetchGallery();
      if (data && data.length > 0) {
        const cleanedData = data.map(img => ({ ...img, category: cleanCategory(img.category) }));
        const cleanedDefaults = defaultGalleryImages.map(img => ({ ...img, category: cleanCategory(img.category) }));
        setGalleryImages([...cleanedData, ...cleanedDefaults]);
      }
    };
    loadGallery();
  }, []);

  const getImageUrl = (src) => {
    if (!src) return '';
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/uploads') || src.startsWith('data:') || src.startsWith('/images/')) {
      if (src.startsWith('/uploads')) {
        return `${API_BASE}${src}`;
      }
      return src;
    }
    return `/images/Devine Awards images/${src}`;
  };

  const categories = [
    'All Sections',
    'Highlights',
    '1. Spiritual Pillar',
    '2. Institutions and Organisations',
    '3. Individuals and Professionals',
    '4. Grass Route Eminents'
  ];

  const sectionDescriptions = {
    'Highlights': 'Key moments from sacred assemblies, chief guest felicitations, and the grand Dhara Divine Awards ceremony.',
    '1. Spiritual Pillar': 'Sivachariyars, Bhattachariyars, Sivanadiyars, and Spiritual Masters who uphold sacred traditions.',
    '2. Institutions and Organisations': 'Spiritual schools, siddha hospitals, anna dhan centers, and dedicated institutions serving society.',
    '3. Individuals and Professionals': 'Eminent judges, doctors, scientists, authors, artists, and leaders advancing Sanatana Dharma.',
    '4. Grass Route Eminents': 'Unsung heroes: Veda padashalas, temple sculptors, traditional artists, gho shalas, and sacred craftsmen.'
  };

  const matchesSearch = (img) => {
    if (!searchQuery) return true;
    return (img.caption || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
           (img.category || '').toLowerCase().includes(searchQuery.toLowerCase());
  };

  // Build filtered image list for lightbox indexing
  const filteredImages = galleryImages.filter(img => {
    const matchesCat = selectedCategory === 'All Sections' ? true : img.category === selectedCategory;
    return matchesCat && matchesSearch(img);
  });

  const openLightbox = (imgObj) => {
    const idx = filteredImages.findIndex(item => item === imgObj);
    if (idx !== -1) setLightboxIndex(idx);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const navigateLightbox = (direction) => {
    if (lightboxIndex === null) return;
    let newIndex = lightboxIndex + direction;
    if (newIndex < 0) newIndex = filteredImages.length - 1;
    if (newIndex >= filteredImages.length) newIndex = 0;
    setLightboxIndex(newIndex);
  };

  // Determine sections to display
  const sectionsToDisplay = selectedCategory === 'All Sections'
    ? ['Highlights', '1. Spiritual Pillar', '2. Institutions and Organisations', '3. Individuals and Professionals', '4. Grass Route Eminents']
    : [selectedCategory];

  return (
    <div className="py-16 px-6 md:px-12 max-w-7xl mx-auto w-full space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono font-bold text-[var(--color-primary-accent)] uppercase tracking-[3px]">
          Visual Archive
        </span>
        <h2 className="text-4xl sm:text-5xl font-bold text-[var(--color-deep-forest-dark)] font-serif leading-tight">
          Dhara Divine Awards Gallery
        </h2>
        <div className="w-24 h-1 bg-[var(--color-saffron-glow)] mx-auto rounded-full"></div>
        <p className="text-sm text-[var(--ink-soft)] leading-relaxed pt-2">
          Glimpses from the sacred assemblies, felicitations of unsung heroes, guest dignitaries, and ongoing grassroots welfare campaigns.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-white/70 backdrop-blur-md rounded-3xl border border-[#D9CBB0]/60 shadow-sm max-w-5xl mx-auto">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search photos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-neutral-50 border border-[#D9CBB0]/40 rounded-2xl focus:outline-none focus:border-[var(--color-primary-accent)] focus:ring-1 focus:ring-[var(--color-primary-accent)] transition-all font-sans"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-[11px] font-sans font-bold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-[var(--color-deep-forest)] text-white shadow-sm'
                  : 'bg-white border border-[#D9CBB0]/40 text-[var(--color-deep-forest-dark)] hover:border-[var(--color-primary-accent)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sections Display */}
      <div className="space-y-16">
        {sectionsToDisplay.map(secName => {
          const sectionImages = galleryImages.filter(img => img.category === secName && matchesSearch(img));
          if (sectionImages.length === 0) return null;

          return (
            <div key={secName} className="space-y-6">
              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D9CBB0]/60 pb-4 gap-2">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--color-deep-forest-dark)] font-serif">
                    {secName}
                  </h3>
                  {sectionDescriptions[secName] && (
                    <p className="text-xs sm:text-sm text-[var(--ink-soft)] mt-1">
                      {sectionDescriptions[secName]}
                    </p>
                  )}
                </div>
                <span className="px-3 py-1 rounded-full bg-[#F4EFE6] text-[var(--color-deep-forest)] text-xs font-mono font-bold self-start md:self-auto border border-[#D9CBB0]/50 shadow-sm">
                  {sectionImages.length} {sectionImages.length === 1 ? 'Photo' : 'Photos'}
                </span>
              </div>

              {/* Images Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sectionImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => openLightbox(img)}
                    className="bg-white rounded-3xl border border-[#D9CBB0]/60 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
                  >
                    <div className={`h-56 relative overflow-hidden ${img.src === 'devine awrds-57.jpg' || img.src === 'devine awrds-37.jpg' || img.src.includes('Section') || img.src.includes('Highlights') ? 'bg-[#281006]' : 'bg-[#F4EFE6]'}`}>
                      <img
                        src={getImageUrl(img.src)}
                        alt={img.caption}
                        className={`w-full h-full ${img.src === 'devine awrds-57.jpg' || img.src === 'devine awrds-37.jpg' || img.src.includes('Section') || img.src.includes('Highlights') ? 'object-contain object-center' : 'object-cover object-top'} group-hover:scale-105 transition-transform duration-500`}
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80";
                        }}
                      />
                      {/* Overlay details */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center">
                          <ZoomIn className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <p className="text-xs font-sans font-bold text-[var(--color-deep-forest-dark)] line-clamp-2 leading-relaxed">
                        {img.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Brochure Download CTA at the bottom end of the gallery */}
      <div className="flex flex-col items-center justify-center pt-12 pb-6 border-t border-[#D9CBB0]/40 mt-16 text-center space-y-4">
        <h4 className="font-serif text-2xl font-bold text-[var(--color-deep-forest-dark)]">Dhara Divine Awards 2025 Brochure</h4>
        <p className="text-sm text-[var(--ink-soft)] max-w-md">Download the official event brochure to learn more about the nominations, spiritual pillars, and program details.</p>
        <a 
          href="/images/Dhara Divine Awards.pdf" 
          download="Dhara Divine Awards 2025 Brochure.pdf"
          className="btn btn-primary sparkle-shimmer-btn inline-flex items-center gap-2"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <svg className="w-4.5 h-4.5 download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          <span>Download 2025 Brochure (PDF)</span>
        </a>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredImages[lightboxIndex] && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          onClick={closeLightbox}
        >
          {/* Prominent Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[10000] bg-white/10 hover:bg-white/20 text-white/80 hover:text-white p-2.5 sm:p-3 rounded-full shadow-lg transition-all cursor-pointer flex items-center justify-center border border-white/15 hover:scale-110"
            title="Close Gallery Lightbox"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 stroke-2" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
            className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-[10000] border border-white/10"
            title="Previous Image"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
            className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-[10000] border border-white/10"
            title="Next Image"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          <div 
            className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center gap-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden rounded-2xl max-h-[75vh] border border-white/15 shadow-2xl bg-[#281006]">
              <img
                src={getImageUrl(filteredImages[lightboxIndex].src)}
                alt={filteredImages[lightboxIndex].caption}
                className="max-w-full max-h-[75vh] object-contain"
              />
            </div>
            <div className="text-center text-white space-y-1 max-w-2xl px-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-primary-accent)] font-bold">
                {filteredImages[lightboxIndex].category} • {lightboxIndex + 1} of {filteredImages.length}
              </span>
              <p className="text-base sm:text-lg font-serif">
                {filteredImages[lightboxIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
