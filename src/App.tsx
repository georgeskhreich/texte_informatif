import React, { useState, useEffect } from 'react';

// --- ICONS (Remplacement de lucide-react par des SVG intégrés pour éviter les erreurs de chargement) ---
const Icon = ({ children, className = "", size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {children}
  </svg>
);

const BookOpen = (p) => <Icon {...p}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></Icon>;
const CheckCircle = (p) => <Icon {...p}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></Icon>;
const AlertCircle = (p) => <Icon {...p}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></Icon>;
const PenTool = (p) => <Icon {...p}><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></Icon>;
const Newspaper = (p) => <Icon {...p}><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></Icon>;
const ArrowRight = (p) => <Icon {...p}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></Icon>;
const Trophy = (p) => <Icon {...p}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></Icon>;
const FileText = (p) => <Icon {...p}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></Icon>;
const Check = (p) => <Icon {...p}><path d="M20 6 9 17l-5-5"/></Icon>;
const ChevronRight = (p) => <Icon {...p}><path d="m9 18 6-6-6-6"/></Icon>;
const Sparkles = (p) => <Icon {...p}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></Icon>;
const Loader = (p) => <Icon className="animate-spin" {...p}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></Icon>;

// --- BANQUE DE TEXTES POUR LA PHASE 1 ---
const phase1Texts = [
  {
    id: 1,
    title: "L'Intelligence Artificielle (IA) dans notre quotidien",
    paragraphs: [
      "L'intelligence artificielle désigne un ensemble d'algorithmes informatiques conçus pour simuler l'intelligence humaine. Concrètement, ces systèmes sont capables d'apprendre à partir de vastes quantités de données (le \"Machine Learning\"). Aujourd'hui, l'IA n'est plus de la science-fiction : elle est présente partout. Elle se trouve dans nos smartphones via les assistants vocaux, dans les hôpitaux pour aider à diagnostiquer des maladies avec une précision inédite, et même dans les voitures autonomes qui analysent la route en temps réel.",
      "Toutefois, cette technologie soulève de nouvelles questions. Les experts s'interrogent sur la protection de la vie privée, car ces machines ont besoin d'énormément d'informations personnelles pour fonctionner correctement. De plus, son impact sur le marché du travail nécessite de repenser la formation des futurs employés."
    ],
    questions: [
      { text: "Qu'est-ce que l'IA concrètement selon le texte ?", options: [{ id: 'a', text: "Des robots en métal" }, { id: 'b', text: "Des algorithmes informatiques" }, { id: 'c', text: "De la science-fiction" }], correctAnswer: 'b' },
      { text: "Dans quels domaines l'IA est-elle utilisée aujourd'hui (selon le 1er paragraphe) ?", options: [{ id: 'a', text: "Santé, transport, téléphonie" }, { id: 'b', text: "Cuisine, agriculture, sport" }, { id: 'c', text: "Uniquement dans les jeux vidéo" }], correctAnswer: 'a' },
      { text: "Quel est le principal problème soulevé par les experts ?", options: [{ id: 'a', text: "Les robots vont nous attaquer" }, { id: 'b', text: "L'IA coûte trop cher" }, { id: 'c', text: "La protection de la vie privée" }], correctAnswer: 'c' }
    ]
  },
  {
    id: 2,
    title: "La richesse de la faune au Sud du Liban",
    paragraphs: [
      "Le Sud du Liban abrite une biodiversité remarquable, souvent méconnue du grand public. La réserve naturelle de la côte de Tyr, par exemple, est un sanctuaire crucial pour la faune marine. Chaque année, ses plages de sable fin accueillent les tortues marines (notamment la tortue caouanne et la tortue verte) qui viennent y pondre leurs œufs à la nuit tombée, loin de l'agitation humaine.",
      "À l'intérieur des terres, les collines et les vallées escarpées servent de refuge à de nombreuses espèces terrestres. On y observe des renards roux, des porcs-épics, et une grande variété d'oiseaux migrateurs qui font escale dans la région. Cependant, cette richesse est menacée par l'urbanisation rapide et la pollution des côtes, obligeant les associations écologiques à multiplier les campagnes de sensibilisation."
    ],
    questions: [
      { text: "Quel animal marin pond ses œufs sur les plages de Tyr ?", options: [{ id: 'a', text: "Les dauphins" }, { id: 'b', text: "Les tortues marines" }, { id: 'c', text: "Les phoques" }], correctAnswer: 'b' },
      { text: "Quelles espèces terrestres peut-on observer dans les terres du Sud ?", options: [{ id: 'a', text: "Des renards roux et des porcs-épics" }, { id: 'b', text: "Des lions et des éléphants" }, { id: 'c', text: "Des loups et des ours" }], correctAnswer: 'a' },
      { text: "Quelles sont les principales menaces pesant sur cette faune ?", options: [{ id: 'a', text: "La chasse excessive" }, { id: 'b', text: "Le braconnage nocturne" }, { id: 'c', text: "L'urbanisation et la pollution" }], correctAnswer: 'c' }
    ]
  },
  {
    id: 3,
    title: "Les mystères de l'Univers : Les trous noirs",
    paragraphs: [
      "Un trou noir est l'un des phénomènes les plus fascinants de l'univers. Il s'agit d'une région de l'espace où la force de gravité est si intense que rien, pas même la lumière, ne peut s'en échapper. Les trous noirs se forment généralement à la fin du cycle de vie des étoiles massives, lorsqu'elles s'effondrent sur elles-mêmes dans une gigantesque explosion appelée supernova.",
      "Malgré leur nom, les trous noirs ne sont pas des espaces vides. Au contraire, ils contiennent une quantité énorme de matière concentrée dans un espace infiniment petit, appelé singularité. Bien qu'ils soient invisibles, les astronomes peuvent les détecter en observant l'effet de leur immense gravité sur les étoiles et les gaz environnants."
    ],
    questions: [
      { text: "Qu'est-ce qui caractérise principalement un trou noir ?", options: [{ id: 'a', text: "Une gravité si forte que rien ne s'échappe" }, { id: 'b', text: "Un grand vide dans l'espace" }, { id: 'c', text: "Une étoile très brillante" }], correctAnswer: 'a' },
      { text: "Comment se directent généralement les trous noirs ?", options: [{ id: 'a', text: "Par la collision de deux planètes" }, { id: 'b', text: "Suite à l'effondrement d'une étoile massive (supernova)" }, { id: 'c', text: "Par le refroidissement du soleil" }], correctAnswer: 'b' },
      { text: "Comment les astronomes détectent-ils les trous noirs s'ils sont invisibles ?", options: [{ id: 'a', text: "En utilisant des télescopes géants" }, { id: 'b', text: "En observant leur effet sur les étoiles environnantes" }, { id: 'c', text: "En envoyant des sondes spatiales" }], correctAnswer: 'b' }
    ]
  }
];

const App = () => {
  const [phase, setPhase] = useState(0);

  // --- PHASE 1 STATE ---
  const [currentTextData, setCurrentTextData] = useState(null);
  const [q1, setQ1] = useState(null);
  const [q2, setQ2] = useState(null);
  const [q3, setQ3] = useState(null);
  const [tweet, setTweet] = useState('');
  const [phase1Error, setPhase1Error] = useState(false);

  // --- PHASE 2 STATE ---
  const [draggedItem, setDraggedItem] = useState(null);
  const [droppedItems, setDroppedItems] = useState({
    z1: null, z2: null, z3: null, z4: null, z5: null
  });

  // --- PHASE 3 STATE ---
  const subjects = [
    "L'impact du réchauffement climatique sur les cèdres du Liban",
    "Le fonctionnement des voitures électriques",
    "La protection des tortues marines à Tyr",
    "Les dangers des réseaux sociaux sur le sommeil"
  ];
  const [randomSubject, setRandomSubject] = useState('');
  const [articleTitle, setArticleTitle] = useState('');
  const [articleIntro, setArticleIntro] = useState('');
  const [articleDev, setArticleDev] = useState('');
  const [articleConcl, setArticleConcl] = useState('');

  // --- GEMINI AI STATE ---
  const [isGeneratingFacts, setIsGeneratingFacts] = useState(false);
  const [generatedFacts, setGeneratedFacts] = useState('');
  const [isEvaluatingArticle, setIsEvaluatingArticle] = useState(false);
  const [articleFeedback, setArticleFeedback] = useState('');

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // La clé API est fournie automatiquement par l'environnement

  const callGemini = async (prompt) => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        })
      });
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "Erreur lors de la génération. Veuillez réessayer.";
    } catch (error) {
      console.error(error);
      return "Impossible de contacter l'assistant IA pour le moment.";
    }
  };

  const handleGenerateFacts = async () => {
    setIsGeneratingFacts(true);
    const prompt = `Tu es un assistant pour des élèves de 15 ans. Donne-moi 3 faits précis ou statistiques intéressantes (en français) sur le sujet "${randomSubject}" pour m'aider à rédiger le développement d'un article de journal. Fais très court (bullet points) et utilise un vocabulaire adapté à des lycéens.`;
    const facts = await callGemini(prompt);
    setGeneratedFacts(facts);
    setIsGeneratingFacts(false);
  };

  const handleEvaluateArticle = async () => {
    setIsEvaluatingArticle(true);
    const prompt = `Tu es un rédacteur en chef bienveillant d'un journal scolaire. Évalue ce texte informatif écrit par un élève de 15 ans sur le sujet "${randomSubject}".
    Titre : ${articleTitle}
    Introduction : ${articleIntro}
    Développement : ${articleDev}
    Conclusion : ${articleConcl}
    Fais un retour constructif en 3 phrases maximum : souligne un point positif (bonne structure, vocabulaire précis, etc.) et donne un axe d'amélioration spécifique. Adresse-toi directement à l'élève en le tutoyant et avec un ton très encourageant.`;
    const feedback = await callGemini(prompt);
    setArticleFeedback(feedback);
    setIsEvaluatingArticle(false);
  };

  useEffect(() => {
    // Hack pour injecter Tailwind CSS si l'utilisateur le copie dans un projet Vercel non configuré
    if (!document.getElementById('tailwind-cdn-script')) {
      const script = document.createElement('script');
      script.id = 'tailwind-cdn-script';
      script.src = "https://cdn.tailwindcss.com";
      document.head.appendChild(script);
    }
    
    setRandomSubject(subjects[Math.floor(Math.random() * subjects.length)]);
    setCurrentTextData(phase1Texts[Math.floor(Math.random() * phase1Texts.length)]);
  }, []);

  // --- LOGIC PHASE 1 ---
  const handlePhase1Submit = () => {
    if (!currentTextData) return;
    
    // Vérification dynamique des réponses selon le texte affiché
    if (q1 === currentTextData.questions[0].correctAnswer && 
        q2 === currentTextData.questions[1].correctAnswer && 
        q3 === currentTextData.questions[2].correctAnswer && 
        tweet.length > 10 && tweet.length <= 280) {
      setPhase1Error(false);
      setPhase(2);
    } else {
      setPhase1Error(true);
    }
  };

  // --- LOGIC RESTART ACTIVITY ---
  const handleRestart = () => {
    setPhase(0);
    setArticleTitle(''); setArticleIntro(''); setArticleDev(''); setArticleConcl('');
    setQ1(null); setQ2(null); setQ3(null); setTweet(''); setPhase1Error(false);
    setDroppedItems({z1: null, z2: null, z3: null, z4: null, z5: null});
    setGeneratedFacts(''); setArticleFeedback('');
    
    // Choisir un nouveau sujet et un nouveau texte (différent du précédent si possible)
    setRandomSubject(subjects[Math.floor(Math.random() * subjects.length)]);
    const availableTexts = phase1Texts.filter(t => t.id !== currentTextData?.id);
    setCurrentTextData(availableTexts[Math.floor(Math.random() * availableTexts.length)]);
  };

  // --- LOGIC PHASE 2 ---
  const labels = [
    { id: 'l1', text: 'Titre / Sous-titre', correctFor: 'z1' },
    { id: 'l2', text: 'Présent de vérité générale', correctFor: 'z2' },
    { id: 'l3', text: 'Objectivité (pas de "Je")', correctFor: 'z3' },
    { id: 'l4', text: 'Connecteurs logiques', correctFor: 'z4' },
    { id: 'l5', text: 'Vocabulaire technique', correctFor: 'z5' }
  ];

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.setData('text/plain', item.id);
  };

  const handleDrop = (e, zoneId) => {
    e.preventDefault();
    if (draggedItem) {
      setDroppedItems(prev => ({ ...prev, [zoneId]: draggedItem }));
      setDraggedItem(null);
    }
  };

  const isPhase2Complete = () => {
    return droppedItems.z1?.correctFor === 'z1' &&
           droppedItems.z2?.correctFor === 'z2' &&
           droppedItems.z3?.correctFor === 'z3' &&
           droppedItems.z4?.correctFor === 'z4' &&
           droppedItems.z5?.correctFor === 'z5';
  };

  // --- LOGIC PHASE 3 ---
  const isPhase3Complete = articleTitle && articleIntro && articleDev && articleConcl;


  // ==========================================
  // RENDERERS
  // ==========================================

  const renderIntro = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-6 space-y-6">
      <div className="bg-blue-100 p-6 rounded-full">
        <Newspaper size={80} className="text-blue-600" />
      </div>
      <h1 className="text-4xl font-bold text-gray-800">Le Défi du Rédacteur en Chef</h1>
      <p className="text-xl text-gray-600 max-w-2xl">
        Bienvenue dans la salle de rédaction ! Votre mission d'aujourd'hui est de maîtriser l'art de transmettre l'information. Êtes-vous prêt à relever les 3 défis pour publier votre propre article ?
      </p>
      <button 
        onClick={() => setPhase(1)}
        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg transition-transform transform hover:scale-105 flex items-center"
      >
        Commencer le défi <ArrowRight className="ml-2" />
      </button>
    </div>
  );

  const renderPhase1 = () => {
    if (!currentTextData) return null;

    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8 animate-fade-in">
        <div className="flex items-center space-x-4 border-b pb-4">
          <div className="bg-blue-100 p-3 rounded-full"><BookOpen className="text-blue-600" /></div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Phase 1 : La Salle de Dépêches</h2>
            <p className="text-gray-500">Lisez ce texte brut, comprenez-le et reformulez l'essentiel.</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-bold text-xl mb-3">{currentTextData.title}</h3>
          {currentTextData.paragraphs.map((para, index) => (
            <p key={index} className="text-gray-700 leading-relaxed mb-4">
              {para}
            </p>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-xl">
            <h4 className="font-bold mb-4 flex items-center"><CheckCircle className="w-5 h-5 mr-2 text-blue-600"/> Mission 1 : Repérage rapide</h4>
            
            <div className="space-y-4">
              {currentTextData.questions.map((q, index) => {
                const setters = [setQ1, setQ2, setQ3];
                const states = [q1, q2, q3];
                const inputName = `q${index + 1}`;
                
                return (
                  <div key={index} className="bg-white p-4 rounded border">
                    <p className="font-medium mb-2">{index + 1}. {q.text}</p>
                    <div className="space-x-0 sm:space-x-4 flex flex-col sm:flex-row sm:items-center mt-2">
                      {q.options.map(opt => (
                        <label key={opt.id} className="inline-flex items-center mr-4 mb-2 sm:mb-0">
                          <input 
                            type="radio" 
                            name={inputName} 
                            checked={states[index] === opt.id}
                            onChange={() => setters[index](opt.id)} 
                            className="mr-2"
                          /> 
                          {opt.text}
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl">
            <h4 className="font-bold mb-4 flex items-center"><PenTool className="w-5 h-5 mr-2 text-blue-600"/> Mission 2 : Le Tweet Informatif</h4>
          <textarea 
            className="w-full p-3 border rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            rows="3"
            placeholder="Tapez votre résumé ici..."
            value={tweet}
            onChange={(e) => setTweet(e.target.value.slice(0, 280))}
          ></textarea>
          <div className="text-right text-sm text-gray-500 mt-1">
            {tweet.length} / 280
          </div>
        </div>

        {phase1Error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" /> 
            Attention ! Vérifiez vos réponses au quiz (toutes doivent être correctes) et assurez-vous d'avoir rédigé votre Tweet.
          </div>
        )}

        <div className="text-right">
          <button 
            onClick={handlePhase1Submit}
            className="bg-gray-800 hover:bg-black text-white px-6 py-3 rounded-lg font-bold flex items-center ml-auto"
          >
            Valider et passer à la suite <ChevronRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
    );
  };

  const renderPhase2 = () => {
    const DropZone = ({ id, text }) => {
      const item = droppedItems[id];
      const isCorrect = item && item.correctFor === id;
      const isWrong = item && item.correctFor !== id;

      return (
        <span 
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, id)}
          className={`inline-flex items-center justify-center min-w-[150px] min-h-[30px] px-2 mx-1 border-2 border-dashed rounded text-sm font-bold align-middle
            ${!item ? 'border-gray-400 bg-gray-50 text-gray-400' : ''}
            ${isCorrect ? 'border-green-500 bg-green-100 text-green-700 border-solid' : ''}
            ${isWrong ? 'border-red-500 bg-red-100 text-red-700 border-solid' : ''}
            transition-colors duration-300
          `}
        >
          {item ? (
            <>
              {item.text}
              {isCorrect && <Check size={16} className="ml-1" />}
              {isWrong && <AlertCircle size={16} className="ml-1" />}
            </>
          ) : (
            "Déposer ici"
          )}
        </span>
      );
    };

    return (
      <div className="max-w-5xl mx-auto p-6 space-y-8 animate-fade-in">
        <div className="flex items-center space-x-4 border-b pb-4">
          <div className="bg-purple-100 p-3 rounded-full"><FileText className="text-purple-600" /></div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Phase 2 : L'Autopsie du Texte</h2>
            <p className="text-gray-500">Découvrez les règles en glissant les étiquettes dans les bonnes cases du texte.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="md:col-span-1 bg-purple-50 p-4 rounded-xl shadow-inner border border-purple-100 flex flex-col gap-3">
            <h3 className="font-bold text-sm text-purple-800 uppercase tracking-wider mb-2">Boîte à outils</h3>
            <p className="text-xs text-gray-600 mb-2">Glissez (Drag & Drop) ces étiquettes vers le texte :</p>
            {labels.map(label => {
              const isPlacedCorrectly = Object.entries(droppedItems).some(([zone, item]) => item && item.id === label.id && zone === item.correctFor);
              if (isPlacedCorrectly) return null; // Hide if placed correctly
              
              return (
                <div
                  key={label.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, label)}
                  className="bg-white border-2 border-purple-400 text-purple-700 px-3 py-2 rounded shadow-sm cursor-grab active:cursor-grabbing text-sm font-bold text-center hover:bg-purple-100 transition-colors"
                >
                  {label.text}
                </div>
              );
            })}
          </div>

          <div className="md:col-span-3 bg-white p-8 rounded-xl shadow-md border border-gray-200 text-lg leading-loose">
            <div className="mb-6 text-center">
              <DropZone id="z1" /> <br/>
              <span className="text-2xl font-bold block mt-2">Le Cycle Naturel de l'Eau</span>
            </div>
            
            <p className="mb-4">
              <DropZone id="z3" /> il est scientifiquement prouvé que la quantité d'eau sur la planète Terre reste constante. 
            </p>
            <p className="mb-4">
              L'eau des océans <DropZone id="z2" /> (s'évapore) continuellement sous l'effet de la chaleur du soleil. 
              <DropZone id="z4" />, cette vapeur monte dans l'atmosphère où elle subit un phénomène de <DropZone id="z5" /> (condensation) pour former des nuages.
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="text-gray-600 italic">
            Complétez toutes les zones correctement (en vert) pour avancer.
          </div>
          <button 
            onClick={() => setPhase(3)}
            disabled={!isPhase2Complete()}
            className={`px-6 py-3 rounded-lg font-bold flex items-center ${isPhase2Complete() ? 'bg-gray-800 hover:bg-black text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            Passer à la rédaction <ChevronRight className="ml-2" />
          </button>
        </div>
      </div>
    );
  };

  const renderPhase3 = () => (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-fade-in">
       <div className="flex items-center space-x-4 border-b pb-4">
        <div className="bg-green-100 p-3 rounded-full"><PenTool className="text-green-600" /></div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Phase 3 : La Publication</h2>
          <p className="text-gray-500">Utilisez la structure apprise pour rédiger votre propre article.</p>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded text-yellow-800 font-medium flex items-center shadow-sm">
        <AlertCircle className="mr-3" /> Sujet imposé par la rédaction : <strong className="ml-2">{randomSubject}</strong>
      </div>

      <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        
        {/* Champ 1 : Titre */}
        <div>
          <label className="block font-bold text-gray-700 mb-1">1. Titre de l'article</label>
          <p className="text-xs text-gray-500 mb-2">Accrocheur, objectif et sans verbe conjugué si possible.</p>
          <input 
            type="text" 
            className="w-full p-3 border rounded bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none font-bold text-lg"
            placeholder="Ex: Alerte sur les forêts libanaises"
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
          />
        </div>

        {/* Champ 2 : Intro */}
        <div>
          <label className="block font-bold text-gray-700 mb-1">2. L'Introduction (Le "Quoi ?")</label>
          <p className="text-xs text-gray-500 mb-2">Présentez le sujet en une ou deux phrases claires.</p>
          <textarea 
            className="w-full p-3 border rounded bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none resize-none"
            rows="2"
            value={articleIntro}
            onChange={(e) => setArticleIntro(e.target.value)}
          ></textarea>
        </div>

        {/* Champ 3 : Développement */}
        <div>
          <label className="block font-bold text-gray-700 mb-1">3. Le Développement (Faits et Chiffres)</label>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
            <p className="text-xs text-gray-500">Utilisez des connecteurs logiques (En effet, De plus...) et du vocabulaire précis.</p>
            <button 
              onClick={handleGenerateFacts}
              disabled={isGeneratingFacts}
              className="mt-2 sm:mt-0 text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 font-bold py-1.5 px-3 rounded flex items-center transition-colors disabled:opacity-50"
            >
              {isGeneratingFacts ? <Loader size={14} className="mr-1.5" /> : <Sparkles size={14} className="mr-1.5" />}
              {isGeneratingFacts ? "Recherche en cours..." : "✨ Assistant de Recherche IA"}
            </button>
          </div>

          {generatedFacts && (
            <div className="mb-3 p-4 bg-purple-50 border border-purple-200 rounded-lg text-sm text-purple-900 whitespace-pre-wrap">
              <strong>💡 Faits trouvés par l'IA pour vous inspirer :</strong><br />
              {generatedFacts}
            </div>
          )}

          <textarea 
            className="w-full p-3 border rounded bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none resize-none"
            rows="4"
            value={articleDev}
            onChange={(e) => setArticleDev(e.target.value)}
          ></textarea>
        </div>

        {/* Champ 4 : Conclusion */}
        <div>
          <label className="block font-bold text-gray-700 mb-1">4. La Conclusion</label>
          <p className="text-xs text-gray-500 mb-2">Résumez ou ouvrez sur une question (sans utiliser "Je pense que").</p>
          <textarea 
            className="w-full p-3 border rounded bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none resize-none"
            rows="2"
            value={articleConcl}
            onChange={(e) => setArticleConcl(e.target.value)}
          ></textarea>
        </div>

      </div>

      <div className="text-center mt-8">
        <button 
          onClick={() => setPhase(4)}
          disabled={!isPhase3Complete}
          className={`px-8 py-4 rounded-full font-bold text-xl flex items-center justify-center mx-auto shadow-lg transition-transform transform ${isPhase3Complete ? 'bg-green-600 hover:bg-green-700 hover:scale-105 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          <Newspaper className="mr-2" /> Publier mon article
        </button>
      </div>

    </div>
  );

  const renderFinal = () => (
    <div className="max-w-3xl mx-auto p-6 animate-fade-in space-y-8">
      <div className="text-center space-y-4 mb-8">
        <Trophy size={64} className="mx-auto text-yellow-500" />
        <h2 className="text-3xl font-bold text-gray-800">Félicitations, Rédacteur en Chef !</h2>
        <p className="text-gray-600">Votre article vient d'être publié à la Une.</p>
      </div>

      {/* Rendu style "Journal" */}
      <div className="bg-white p-8 md:p-12 shadow-2xl rounded-sm border-t-8 border-gray-900 font-serif">
        <div className="border-b-2 border-gray-900 pb-4 mb-6 text-center">
          <h1 className="text-5xl font-black uppercase tracking-tighter text-gray-900 mb-2">LE PETIT JOURNAL</h1>
          <p className="text-sm text-gray-500 uppercase tracking-widest font-sans">Édition Spéciale CS1 - {new Date().toLocaleDateString()}</p>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">{articleTitle}</h2>
        
        <div className="prose prose-lg max-w-none text-gray-800">
          <p className="text-xl font-medium leading-relaxed mb-6 bg-gray-100 p-4 rounded border-l-4 border-gray-800">
            {articleIntro}
          </p>
          <div className="columns-1 md:columns-2 gap-8 text-justify">
            <p className="mb-4">{articleDev}</p>
          </div>
          <hr className="my-6 border-gray-300" />
          <p className="font-bold text-center italic text-gray-700">
            {articleConcl}
          </p>
        </div>
      </div>

      {/* --- IA FEEDBACK SECTION --- */}
      <div className="bg-purple-50 p-6 md:p-8 rounded-xl border border-purple-200 shadow-md">
        <h3 className="text-xl font-bold text-purple-900 flex items-center mb-4">
          <Sparkles className="mr-2" /> Retour du Rédacteur en Chef (IA)
        </h3>
        
        {!articleFeedback ? (
          <div>
            <p className="text-purple-700 mb-4">Demandez à notre intelligence artificielle d'analyser votre article pour recevoir des conseils de rédaction personnalisés.</p>
            <button 
              onClick={handleEvaluateArticle}
              disabled={isEvaluatingArticle}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full flex items-center shadow-sm transition-colors disabled:opacity-70"
            >
              {isEvaluatingArticle ? <Loader className="mr-2" /> : <Sparkles className="mr-2" />}
              {isEvaluatingArticle ? "Analyse de l'article en cours..." : "✨ Obtenir l'avis critique"}
            </button>
          </div>
        ) : (
          <div className="bg-white p-5 rounded-lg border border-purple-100 text-gray-800 whitespace-pre-wrap leading-relaxed shadow-sm">
            {articleFeedback}
          </div>
        )}
      </div>

      <div className="text-center mt-12">
        <button 
          onClick={handleRestart}
          className="text-gray-500 hover:text-gray-800 underline font-medium"
        >
          Recommencer l'activité
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-200">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-bold text-lg md:text-xl flex items-center text-blue-900 text-center md:text-left">
            <Newspaper className="mr-2 shrink-0" size={24} /> Etude du texte informatif SSCC Ain Ebel Classe de CS1
          </div>
          {phase > 0 && phase < 4 && (
            <div className="flex space-x-2 text-sm font-medium">
              <span className={`px-3 py-1 rounded-full ${phase === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1. Comprendre</span>
              <span className={`px-3 py-1 rounded-full ${phase === 2 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2. Analyser</span>
              <span className={`px-3 py-1 rounded-full ${phase === 3 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>3. Rédiger</span>
            </div>
          )}
        </div>
      </header>

      <main className="py-8">
        {phase === 0 && renderIntro()}
        {phase === 1 && renderPhase1()}
        {phase === 2 && renderPhase2()}
        {phase === 3 && renderPhase3()}
        {phase === 4 && renderFinal()}
      </main>
    </div>
  );
};

export default App;
