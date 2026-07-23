import React, { useState, useEffect } from 'react';
import { Award, Users, Calendar, Trees, Search, Play, X } from 'lucide-react';
import { fetchEvents, fetchSiteConfig } from '../utils/api';

const iconMap = {
  Award: Award,
  Users: Users,
  Calendar: Calendar,
  Trees: Trees
};

export default function EventsActivities() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Videos');
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [dynamicEvents, setDynamicEvents] = useState([]);
  const [eventStats, setEventStats] = useState([
    {
      icon: Award,
      value: '63+',
      label: 'Divine Awardees Honored',
      desc: 'Grassroots leaders, philanthropists, and silent seva sadhaks honored for Sanatana Dharma service.'
    },
    {
      icon: Users,
      value: '2,500+',
      label: 'Dignitaries & Attendees',
      desc: 'Gathering of Madras High Court Judge Justice GR Swaminathan, Adheenams, and eminent personalities.'
    },
    {
      icon: Calendar,
      value: 'Jan 2025',
      label: 'Flagship Assembly Date',
      desc: 'A grand devotional assembly hosted at the Chinmaya Heritage Centre in Chennai.'
    },
    {
      icon: Trees,
      value: '100% Seva',
      label: 'Pure Selfless Platform',
      desc: 'Organized fully by volunteers to recognize quiet champions of socio-cultural revival.'
    }
  ]);

  useEffect(() => {
    fetchEvents().then(res => {
      if (res && res.length) {
        setDynamicEvents(res.filter(ev => ev.type === 'video'));
      }
    });
    fetchSiteConfig().then(config => {
      if (config && config.eventStats && config.eventStats.length === 4) {
        const mappedStats = config.eventStats.map(stat => ({
          ...stat,
          icon: iconMap[stat.icon] || Award
        }));
        setEventStats(mappedStats);
      }
    });
  }, []);

  const getImageUrl = (src) => {
    if (!src) return '';
    return src;
  };

  const stats = [
    {
      icon: Award,
      value: '63+',
      label: 'Divine Awardees Honored',
      desc: 'Grassroots leaders, philanthropists, and silent seva sadhaks honored for Sanatana Dharma service.'
    },
    {
      icon: Users,
      value: '2,500+',
      label: 'Dignitaries & Attendees',
      desc: 'Gathering of Madras High Court Judge Justice GR Swaminathan, Adheenams, and eminent personalities.'
    },
    {
      icon: Calendar,
      value: 'Jan 2025',
      label: 'Flagship Assembly Date',
      desc: 'A grand devotional assembly hosted at the Chinmaya Heritage Centre in Chennai.'
    },
    {
      icon: Trees,
      value: '100% Seva',
      label: 'Pure Selfless Platform',
      desc: 'Organized fully by volunteers to recognize quiet champions of socio-cultural revival.'
    }
  ];

  const section1Videos = [
    {
      id: "FbStAM_Zj2I",
      title: "Sivachariyar S. Ravi Sivaachariyar",
      description: "Felicitation and spiritual discourse by respected Sivachariyar S. Ravi Sivaachariyar at Dhara Divine Awards 2025, honoring his lifelong service to Saiva traditions.",
      duration: "Sivachariyar Seva"
    },
    {
      id: "YfHlnUSwxtY",
      title: "Bhattacharyar Raju @ Lakshmana Bhattar",
      description: "Recognizing Bhattacharyar Raju @ Lakshmana Bhattar for his dedicated temple rituals and preservation of temple agamas at the Dhara Divine Awards ceremony.",
      duration: "Temple Priest Seva"
    },
    {
      id: "EuHZEntcPyE",
      title: "Amman Worship Exponent - Shri Vasu",
      description: "Honoring Shri Vasu for his devoted propagation of rural Amman worship and community spiritual gatherings celebrating divine mother rituals.",
      duration: "Amman Worship"
    },
    {
      id: "rDtqORELaEU",
      title: "Madhvam Tradition Exponent - S. Lakshmipathi Raja",
      description: "Recognizing Shri S. Lakshmipathi Raja for his exemplary contributions to preserving and teaching Madhvam philosophy and Sanatana traditions.",
      duration: "Madhvam Heritage"
    },
    {
      id: "Brj6var2zm8",
      title: "Sivanadiyar Vaadhoor Adigal",
      description: "Inspiring stage honors and felicitation of Sivanadiyar Vaadhoor Adigal for his tireless dedication to Lord Shiva temples and devotional service.",
      duration: "Sivanadiyar Seva"
    },
    {
      id: "DpaDK56pF5s",
      title: "Kaumaram Exponent - Valayapettai R. Krishnan",
      description: "Celebrating Shri Valayapettai R. Krishnan for his devoted propagation of Lord Murugan (Kaumaram) worship and sacred Tamil hymns.",
      duration: "Kaumaram Tradition"
    },
    {
      id: "38Dm6oAPpuE",
      title: "Devoted Ayyappa Bhaktar - Shri Veeramanidasan",
      description: "Award presentation and devotional sharing by renowned Ayyappa Bhaktar and spiritual singer Shri Veeramanidasan at the Chinmaya Heritage Centre.",
      duration: "Ayyappa Seva"
    },
    {
      id: "ldm25NUvG3Y",
      title: "Vallalar Sanmarkkam - Sadhu Janagiraman",
      description: "Honoring Sadhu Janagiraman for embodying and spreading the compassionate teachings of Arutperunjothi Vallalar Ramalinga Swamigal.",
      duration: "Sanmarkkam Seva"
    },
    {
      id: "X3UsGQ9_9VE",
      title: "Shirdi Sai Baba Devotee - Shri Parasuram Guruji",
      description: "Felicitation of Shri Parasuram Guruji for his extensive humanitarian and spiritual service dedicated to the ideals of Shirdi Sai Baba.",
      duration: "Sai Bhakti Seva"
    },
    {
      id: "szqZ3fmloNY",
      title: "Siddhar Tradition Exponent - Ayya Krishnan Ananda Swamy",
      description: "Recognizing Ayya Krishnan Ananda Swamy for preserving and sharing the ancient Siddhar heritage and spiritual wisdom with the community.",
      duration: "Siddhar Tradition"
    },
    {
      id: "9wbBx7FUNjg",
      title: "Karuppasamy Worship Exponent - Maaligaiparai M.P. Karuppusamy",
      description: "Honoring Shri M.P. Karuppusamy for his lifelong dedication to village guardian deity worship (Karuppasamy) and cultural preservation.",
      duration: "Guardian Deity Seva"
    },
    {
      id: "kQBJF9H24l8",
      title: "Uzhavarappani Dedication - Shri S. Ganesh",
      description: "Recognizing Shri S. Ganesh for his inspiring selfless service (Uzhavarappani) in cleaning and maintaining ancient temples across Tamil Nadu.",
      duration: "Uzhavarappani Seva"
    },
    {
      id: "k8dga5kEsXY",
      title: "Rural Temple Priest - G. Vijayan Poosari",
      description: "Felicitation of Grama Koil Poosari Shri G. Vijayan for his devoted service in maintaining and conducting rituals at rural village temples.",
      duration: "Gramadevatha Seva"
    }
  ];

  const section2Videos = [
    {
      id: "TXelzl_jlSY",
      title: "Spiritual Literature - T. Srinivasachariya Swamiji",
      description: "Honoring T. Srinivasachariya Swamiji for his dedicated preservation and publication of sacred spiritual books and Vedic texts.",
      duration: "Spiritual Literature"
    },
    {
      id: "ARxvSLwCulw",
      title: "School Institution Excellence - Retd. IAS N. Gopalaswami",
      description: "Felicitation of former Chief Election Commissioner & Padma Bhushan Retd. IAS N. Gopalaswami for value-based educational institutions.",
      duration: "Education Seva"
    },
    {
      id: "wveGXIMilHs",
      title: "Spiritual Artifacts & Accessories - Shri Kannan Ji",
      description: "Recognizing Shri Kannan Ji for craftsmanship and dedication in supplying authentic traditional spiritual artifacts and pooja accessories.",
      duration: "Traditional Craft"
    },
    {
      id: "sn6cyfTwnz0",
      title: "Medical Healthcare Service - Dr. Mohan Rajan",
      description: "Honoring eminent ophthalmologist Dr. Mohan Rajan (Rajan Eye Care Hospital) for outstanding charitable eye care and medical seva.",
      duration: "Medical Seva"
    },
    {
      id: "-TWtlLxgu8E",
      title: "Annadhanam & Hospitality - T.R. Srivasthsan (Only Coffee)",
      description: "Recognizing Shri T.R. Srivasthsan for preserving traditional authentic South Indian food culture and hospitality.",
      duration: "Hospitality Seva"
    },
    {
      id: "vBzP6X7kRC8",
      title: "Higher Education Seva - Shri Senthil Kumar (E.S. College)",
      description: "Award presentation to Shri Senthil Kumar representing E.S. College of Nursing for holistic youth education and social empowerment.",
      duration: "Higher Education"
    },
    {
      id: "Zczerv6yInU",
      title: "Vallal Illam - Selfless Annadhanam Center",
      description: "Honoring Vallal Illam for conducting daily uninterrupted feeding (Annadhanam) and compassionate shelter for the needy.",
      duration: "Annadhanam Seva"
    },
    {
      id: "7et8pLZbu3w",
      title: "Industrial & Philanthropic Seva - Shri T.N. Sekar",
      description: "Felicitation of industrialist Shri T.N. Sekar for his extensive CSR contributions and support to rural dharma projects.",
      duration: "Corporate CSR Seva"
    },
    {
      id: "rWLQMOhzZDE",
      title: "Women's Spiritual Organization - Dr. Thanuja",
      description: "Recognizing Dr. Thanuja and her dedicated women's spiritual forum for fostering cultural values and social welfare among women.",
      duration: "Women Empowerment"
    },
    {
      id: "1lObOM1uqY8",
      title: "Traditional Pooja Items - Sivasubbranam Nagaraj",
      description: "Felicitation of ritual craftsman Sivasubbranam Nagaraj for outstanding pooja product dedication and sacred accessories.",
      duration: "Traditional Craft"
    },
    {
      id: "YuCPffiT5ck",
      title: "Samudra Aarti Tradition - Smt. Anusiya Devi",
      description: "Honoring Smt. Anusiya Devi for organizing and leading sacred ocean worship (Samudra Aarti) and coastal spiritual devotion.",
      duration: "Samudra Aarti Seva"
    },
    {
      id: "0t1BJ1K-TLY",
      title: "Traditional Spiritual Instruments - Siva Sri Sivakumar",
      description: "Recognizing Siva Sri Sivakumar for preserving ancient temple musical instruments and ritual acoustic traditions.",
      duration: "Temple Music Seva"
    },
    {
      id: "1lKtViQYoIY",
      title: "Spiritual Tourism & Heritage - Swami Kannan Bhattachariyar",
      description: "Felicitation of Swami Kannan Bhattachariyar for guiding pilgrims and promoting sacred temple tourism across holy kshetras.",
      duration: "Spiritual Heritage"
    },
    {
      id: "QpAgaOlQrNA",
      title: "Spiritual Broadcasting & Media - Sudhakar Dhanapal (OM TV)",
      description: "Honoring Shri Sudhakar Dhanapal of OM TV for digital propagation of Sanatana Dharma, discourses, and temple festivals.",
      duration: "Dharmic Media"
    },
    {
      id: "d5TjYuqP1sc",
      title: "Siddha Medical Heritage - Dr. Regunathan",
      description: "Recognizing Siddha medical practitioner Dr. Regunathan for traditional herbal healthcare and charitable wellness camps.",
      duration: "Siddha Medicine"
    },
    {
      id: "ZF2x32fk8xw",
      title: "Traditional Textiles & Philanthropy - J. Prakash (Mahalakshmi Textiles)",
      description: "Award presentation to Shri J. Prakash honoring his support of handloom weavers and philanthropic dharma initiatives.",
      duration: "Textile Heritage"
    },
    {
      id: "YptoetD6SUY",
      title: "Philanthropic Seva - Ln. P.S. Vairakannu (S.V. Jewellery, Panruti)",
      description: "Celebrating Lion P.S. Vairakannu for his exemplary social service, community welfare projects, and support for spiritual events.",
      duration: "Social Welfare Seva"
    },
    {
      id: "zTO9_JbxRak",
      title: "Vazhga Valamudan Yoga Seva - Shri Sakthi Saravanan",
      description: "Honoring Shri Sakthi Saravanan for imparting Vethathiri Maharishi's 'Vazhga Valamudan' mind-body wellness and meditation teachings.",
      duration: "Yoga & Meditation"
    },
    {
      id: "DFkgQAHLYC8",
      title: "Spiritual Music Academy - Dr. Dhatchayani",
      description: "Felicitation of Dr. Dhatchayani for instructing younger generations in devotional classical vocals and spiritual music.",
      duration: "Classical Music"
    }
  ];

  const section3Videos = [
    {
      id: "nixZwctrAMc",
      title: "Hon'ble Justice Shri.T.N. Vallinayagam",
      description: "Inspirational keynote address and felicitation by Hon'ble Justice (Retd.) Thiru T.N. Vallinayagam (Madras High Court) celebrating righteous dharma service.",
      duration: "Judicial Keynote"
    },
    {
      id: "eAOHKA5E5yA",
      title: "Cinema & Cultural Art - Kanal Kannan",
      description: "Special recognition and discourse by renowned cinema stunt director and cultural advocate Kanal Kannan celebrating Sanatana values.",
      duration: "Cultural Art"
    },
    {
      id: "ufMSakmU8oQ",
      title: "Entrepreneurship & Philanthropy - Balasubramanian",
      description: "Award presentation honoring entrepreneur Shri Balasubramanian for supporting community welfare and spiritual initiatives.",
      duration: "Entrepreneurship"
    },
    {
      id: "wVY5AXa-QRE",
      title: "Spiritual Singer - Solar Sai",
      description: "Inspiring stage honors and devotional music performance by devotional singer Solar Sai across temple festivals.",
      duration: "Devotional Music"
    },
    {
      id: "bAIIopBY4Z0",
      title: "Spiritual Discourse Exponent - Thamal Ko.Saravanan",
      description: "Felicitation of eminent spiritual speaker Thamal Ko. Saravanan for his profound discourses on puranas and moral conduct.",
      duration: "Spiritual Discourse"
    },
    {
      id: "kiJiHC39jPI",
      title: "Legal & Advocacy Seva - Advocate Suresh",
      description: "Honoring Advocate Suresh for his dedicated legal guidance, societal service, and protection of traditional community rights.",
      duration: "Legal Seva"
    },
    {
      id: "iaUnzatxvvM",
      title: "Vedic Astrology Heritage - M Babu",
      description: "Recognizing astrologer Shri M. Babu for preserving traditional Jyotisha shastra and offering guidance grounded in spiritual wisdom.",
      duration: "Vedic Astrology"
    },
    {
      id: "gLS1eAy5VwY",
      title: "Academic & Professorial Excellence - KR Venkatesan",
      description: "Award presentation to Professor K.R. Venkatesan celebrating his contributions to higher education and cultural mentorship.",
      duration: "Higher Education"
    },
    {
      id: "8vZCs8bVSuI",
      title: "Social Evangelist - CK Ashok Kumar",
      description: "Keynote recognition of Social Evangelist C.K. Ashok Kumar for empowering youth and driving grassroots social transformation.",
      duration: "Social Welfare"
    },
    {
      id: "3FQgwocLBnQ",
      title: "Chartered Accountant & Governance - CA Prabakaran",
      description: "Professional governance perspective and felicitation of CA Prabakaran for supporting non-profit institutions and compliance.",
      duration: "Financial Seva"
    },
    {
      id: "oEsIdHha5uw",
      title: "Medical Healthcare Seva - Dr. Rajeswari Ramachandran",
      description: "Honoring Dr. Rajeswari Ramachandran for her extensive medical philanthropy and charitable healthcare camps.",
      duration: "Medical Seva"
    },
    {
      id: "VONlv_X9Aro",
      title: "Traditional Heritage Sports Coach - Ravi",
      description: "Recognizing Coach Ravi for reviving and instructing ancient martial arts and traditional Indian sports among young generations.",
      duration: "Heritage Sports"
    },
    {
      id: "uD_oYwaKRio",
      title: "Temple Restoration Seva - Charulatha",
      description: "Award presentation recognizing Smt. Charulatha for her dedicated efforts in rural temple restoration and heritage preservation.",
      duration: "Temple Seva"
    },
    {
      id: "rdoUzO6ZTmA",
      title: "Agricultural & Organic Seva - Ezhilan",
      description: "Celebrating farmer and agriculturalist Shri Ezhilan for his dedication to organic farming and traditional agrarian practices.",
      duration: "Agriculture Seva"
    },
    {
      id: "626zH3fSbkI",
      title: "Infrastructure & Community Development - PSV Kumar",
      description: "Honoring builder Shri PSV Kumar for his contributions to community infrastructure and philanthropic support of spiritual events.",
      duration: "Infrastructure Seva"
    },
    {
      id: "iBXIal9dfic",
      title: "Space Scientist & Innovator - Anand Megalingam",
      description: "Special recognition of space scientist and entrepreneur Anand Megalingam inspiring indigenous scientific excellence and youth innovation.",
      duration: "Space Science"
    },
    {
      id: "XLLAYE7p0k0",
      title: "Renowned Spiritual Author - Indra Soundar Rajan",
      description: "Stage honors and felicitation of celebrated author and spiritual researcher Indra Soundar Rajan for popularizing temple histories and lore.",
      duration: "Spiritual Literature"
    },
    {
      id: "4QoCtoaXkoc",
      title: "Vedic Scholar - Sri Krishnan Ganabadigal",
      description: "Reverential honors presented to Vedic scholar Sri Krishnan Ganapadigal for preserving and chanting Ghana-patha Vedic scriptures.",
      duration: "Vedic Scholarship"
    },
    {
      id: "IILqWheG9f4",
      title: "Spiritual Music Director - Yatheeswar Raja",
      description: "Devotional performance and traditional music discourse by Spiritual Music Director Yatheeswar Raja.",
      duration: "Spiritual Music"
    }
  ];

  const section4Videos = [
    {
      id: "Rqa2xKbkxU8",
      title: "Vedic Pathashala - P. Swaminatha Sivachariyar",
      description: "Reverential honors and stage felicitation of Shri P. Swaminatha Sivachariyar for imparting sacred Vedic education to younger generations.",
      duration: "Vedic Pathashala"
    },
    {
      id: "N6RVzQpWyXM",
      title: "Bhakti Seva - Kannan Gurukkal",
      description: "Recognizing Kannan Gurukkal for his lifelong dedication to temple rituals, agamas, and community spiritual devotion.",
      duration: "Temple Priest Seva"
    },
    {
      id: "yvtlKVpqdUI",
      title: "Stone Sculptor / Sthapathi - S.Perumal Sthapathiar",
      description: "Award presentation honoring master stone sthapathi Shri S. Perumal for preserving the sacred Shilpa Shastra temple architecture.",
      duration: "Temple Architecture"
    },
    {
      id: "ITHhOioXMBk",
      title: "Metal Crafts & Statuary - Siva Arts & Gallery",
      description: "Honoring traditional bronze and metal iconographers at Siva Arts & Gallery for creating divine temple vigrahas and statuary.",
      duration: "Metal Iconography"
    },
    {
      id: "grT3vEUF7kU",
      title: "Temple Woodwork & Carpentry - Appar Lakshmanan",
      description: "Recognizing master craftsman Shri Appar Lakshmanan for his intricate wooden carvings and sacred chariot (Ratham) woodwork.",
      duration: "Temple Carpentry"
    },
    {
      id: "KTBcMwRYbmc",
      title: "Temple Mural & Sacred Art - Padmavasan",
      description: "Celebrating artist Padmavasan for adorning temple sanctums with exquisite mythological murals and sacred Tanjore painting styles.",
      duration: "Sacred Art"
    },
    {
      id: "YCZ53swMdPM",
      title: "Temple Madapalli Seva - N. Arunachalam",
      description: "Honoring Shri N. Arunachalam for his selfless service in sacred temple kitchens (Madapalli) preparing prasadam with devotion.",
      duration: "Madapalli Seva"
    },
    {
      id: "9uYJukag88s",
      title: "Sacred Flower Garland Decoration - Dr. S. Nagarathinam",
      description: "Recognizing floral artist Dr. S. Nagarathinam for creating magnificent floral garlands and pushpa alankarams for deity processions.",
      duration: "Pushpa Alankaram"
    },
    {
      id: "1T_SGxOs-CY",
      title: "Temple Elephant Caretaker - S. Rajagopal",
      description: "Felicitation of temple elephant caretaker (Mahout) S. Rajagopal honoring his compassion and lifelong care of sacred elephants.",
      duration: "Mahout Seva"
    },
    {
      id: "2X9u2p0YxIw",
      title: "Traditional Clay Golu Doll Maker - M. Sankar",
      description: "Award presentation to clay doll artisan M. Sankar preserving traditional Navarathri Golu craft heritage.",
      duration: "Traditional Craft"
    },
    {
      id: "RnZUT2BE_rM",
      title: "Therukooththu Folk Play Exponent - Sampath",
      description: "Recognizing Therukooththu artist Shri Sampath for keeping the vibrant rural Tamil street theater and puranic storytelling alive.",
      duration: "Folk Theater Art"
    }
  ];

  const spiritualPillarsCategories = ['Spiritual Pillars', 'Sivacharyas', 'Bhattacharyas', 'Odhuvars', 'Sivachariyar Seva', 'Sai Bhakti Seva', 'Siddhar Tradition', 'Guardian Deity Seva', 'Uzhavarappani Seva', 'Gramadevatha Seva'];
  const institutionsCategories = ['Institutions and Organisations', 'Institutions', 'Organisations', 'Traditional Craft', 'Traditional Art', 'Education Seva', 'Medical Seva', 'Hospitality Seva', 'Higher Education', 'Annadhanam Seva', 'Corporate CSR Seva', 'Social Welfare'];
  const individualsCategories = ['Individuals and Professionals', 'Individuals', 'Professionals', 'Madras HC Judge', 'Spiritual Music', 'Financial Seva'];
  const grassRouteCategories = ['Grass Route Eminents', 'Grassroots', 'Grassroots Volunteers', 'Grassroot', 'Temple Seva', 'Heritage Sports', 'Vedic Pathashala', 'Temple Priest Seva', 'Temple Architecture', 'Metal Iconography', 'Temple Carpentry', 'Sacred Art', 'Madapalli Seva', 'Pushpa Alankaram', 'Mahout Seva', 'Folk Theater Art'];

  const dynamicSection = dynamicEvents.filter(ev => 
    !spiritualPillarsCategories.includes(ev.category) &&
    !institutionsCategories.includes(ev.category) &&
    !individualsCategories.includes(ev.category) &&
    !grassRouteCategories.includes(ev.category)
  );

  const dynamicSpiritual = dynamicEvents.filter(ev => spiritualPillarsCategories.includes(ev.category));
  const dynamicInstitutions = dynamicEvents.filter(ev => institutionsCategories.includes(ev.category));
  const dynamicIndividuals = dynamicEvents.filter(ev => individualsCategories.includes(ev.category));
  const dynamicGrassroots = dynamicEvents.filter(ev => grassRouteCategories.includes(ev.category));

  const mapToVideoFormat = (ev) => ({
    id: ev.youtubeId,
    title: ev.title,
    description: ev.description,
    duration: ev.category
  });

  const sections = [
    ...(dynamicSection.length > 0 ? [{
      id: "sec-dynamic",
      title: "Recent Updates & Events",
      subtitle: "Latest videos and updates added via admin portal.",
      videos: dynamicSection.map(mapToVideoFormat)
    }] : []),
    {
      id: "sec-1",
      title: "Spiritual Pillars",
      subtitle: "Honoring Sivachariyars, Bhattachariyars, Sivanadiyars, and dedicated exponents of sacred Sanatana worship traditions.",
      videos: [...dynamicSpiritual.map(mapToVideoFormat), ...section1Videos]
    },
    {
      id: "sec-2",
      title: "Institutions and Organisations",
      subtitle: "Recognizing excellence across education, healthcare, annadhanam, spiritual media, traditional crafts, and philanthropy.",
      videos: [...dynamicInstitutions.map(mapToVideoFormat), ...section2Videos]
    },
    {
      id: "sec-3",
      title: "Individuals and Professionals",
      subtitle: "Keynote speeches, felicitations, and discourses by distinguished judges, legal experts, authors, doctors, and traditional specialists.",
      videos: [...dynamicIndividuals.map(mapToVideoFormat), ...section3Videos]
    },
    {
      id: "sec-4",
      title: "Grass Route Eminents",
      subtitle: "Honoring grassroots temple artisans, master sthapathis, sculptors, pushpa alankarams, madapalli sevaks, mahouts, and folk artists.",
      videos: [...dynamicGrassroots.map(mapToVideoFormat), ...section4Videos]
    }
  ];

  const allMedia = sections.flatMap(sec => sec.videos);

  const matchesSearch = (item) => {
    if (!searchQuery) return true;
    return (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
           (item.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
           (item.duration || '').toLowerCase().includes(searchQuery.toLowerCase());
  };

  const handleMediaClick = (item) => {
    setActiveVideoId(item.id);
  };

  return (
    <div className="py-16 px-6 md:px-12 max-w-7xl mx-auto w-full space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono font-bold text-[var(--color-primary-accent)] uppercase tracking-[3px]">
          Divine Awards Videos
        </span>
        <h2 className="text-4xl sm:text-5xl font-bold text-[var(--color-deep-forest-dark)] font-serif leading-tight">
          Dhara Divine Awards Videos
        </h2>
        <div className="w-24 h-1 bg-[var(--color-saffron-glow)] mx-auto rounded-full"></div>
        <p className="text-sm text-[var(--ink-soft)] leading-relaxed pt-2">
          Glimpses from the sacred ceremonies, honoring grassroots champions of heritage and selflessness.
        </p>
      </div>

      {/* Impact Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {eventStats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-[#D9CBB0]/60 p-6 text-center hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--color-deep-forest)]/5 text-[var(--color-primary-accent)] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-3xl font-bold text-[var(--color-deep-forest-dark)] font-serif block mb-1">
                {s.value}
              </span>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-primary-accent)] mb-2">
                {s.label}
              </h4>
              <p className="text-[11px] text-[var(--ink-soft)] leading-relaxed">
                {s.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Media Grid Section */}
      <div className="space-y-12 pt-8">
        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-white/70 backdrop-blur-md rounded-3xl border border-[#D9CBB0]/60 shadow-sm max-w-5xl mx-auto w-full">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-neutral-50 border border-[#D9CBB0]/40 rounded-2xl focus:outline-none focus:border-[var(--color-primary-accent)] focus:ring-1 focus:ring-[var(--color-primary-accent)] transition-all font-sans"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 justify-center">
            {[
              'All Videos',
              'Recent Updates & Events',
              'Spiritual Pillars',
              'Institutions and Organisations',
              'Individuals and Professionals',
              'Grass Route Eminents'
            ].map((cat) => (
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
          {(selectedCategory === 'All Videos'
            ? sections
            : sections.filter(sec => sec.title === selectedCategory)
          ).map((sec) => {
            const sectionItems = sec.videos
              .map(vid => ({
                id: vid.id,
                type: "video",
                category: vid.duration || "YouTube Video",
                title: vid.title,
                image: `https://img.youtube.com/vi/${vid.id}/hqdefault.jpg`,
                description: vid.description,
                duration: vid.duration
              }))
              .filter(matchesSearch);

            if (sectionItems.length === 0) return null;

            return (
              <div key={sec.id} className="space-y-6">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D9CBB0]/40 pb-4 gap-2">
                  <div>
                    <h4 className="text-xl sm:text-2xl font-bold text-[var(--color-deep-forest-dark)] font-serif flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[var(--color-primary-accent)] inline-block"></span>
                      {sec.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[var(--ink-soft)] mt-1 font-sans pl-4">
                      {sec.subtitle}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#F4EFE6]/80 text-[var(--color-deep-forest)] text-[11px] font-mono font-bold self-start md:self-auto border border-[#D9CBB0]/40 shadow-xs shrink-0">
                    {sectionItems.length} {sectionItems.length === 1 ? 'Video' : 'Videos'}
                  </span>
                </div>

                {/* Video Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {sectionItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-3xl border border-[#D9CBB0]/60 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between h-full group relative cursor-pointer"
                      onClick={() => handleMediaClick(item)}
                    >
                      <div className="relative aspect-video bg-neutral-50 overflow-hidden shrink-0">
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                        />
                        <div className="absolute inset-0 bg-black/25 flex items-center justify-center group-hover:bg-black/45 transition-colors">
                          <div className="w-11 h-11 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          </div>
                        </div>
                        <div className="absolute top-3 left-3 bg-[var(--color-deep-forest)] text-[var(--color-saffron-glow)] text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                          Video
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <span className="text-[9px] font-mono text-[var(--color-primary-accent)] uppercase tracking-wider font-bold block bg-amber-50 w-max px-2 py-0.5 rounded-full">
                            {item.category}
                          </span>
                          <h5 className="font-bold text-sm text-[var(--color-deep-forest-dark)] font-serif leading-snug group-hover:text-[var(--color-primary-accent)] transition-colors line-clamp-2">
                            {item.title}
                          </h5>
                          <p className="text-[11px] text-[var(--ink-soft)] leading-relaxed font-sans line-clamp-3">
                            {item.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-neutral-100 flex items-center justify-end">
                          <button
                            className="inline-flex items-center gap-1.5 bg-[var(--color-deep-forest)] hover:opacity-90 text-white text-[10px] font-sans font-bold px-3.5 py-1.5 rounded-xl transition-colors shadow-sm cursor-pointer"
                          >
                            <Play className="w-2.5 h-2.5 fill-current" />
                            <span>Play Video</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen YouTube Video Modal Player */}
      {activeVideoId && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4 md:p-8" 
          onClick={() => setActiveVideoId(null)}
        >
          <div 
            className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-black rounded-full text-white transition-colors cursor-pointer" 
              onClick={() => setActiveVideoId(null)}
            >
              <X className="w-5 h-5" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
              className="w-full h-full border-0"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
