import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronLeft, AlertTriangle, CheckCircle, XCircle, Lock, FileText, Building2, Users, Calculator, TrendingUp, Heart, Clock, Target, AlertCircle, Printer, AlertOctagon, Ban, Euro, Shield, Calendar, Phone } from 'lucide-react';

// ==================== DOMANDE ====================
const questions = [
  // DIMENSIONE AZIENDA
  { id: 1, category: 'dimensione', text: 'Quanti dipendenti ha la tua impresa?', options: [
    { value: 'small', label: 'Fino a 10 dipendenti', score: 1 },
    { value: 'medium', label: 'Fino a 50 dipendenti', score: 2 },
    { value: 'large', label: 'Oltre i 50 dipendenti', score: 3 }
  ]},
  { id: 2, category: 'dimensione', text: 'Qual è il volume di affari annuo della tua impresa?', options: [
    { value: 'small', label: 'Meno di 3 milioni di euro', score: 1 },
    { value: 'medium', label: 'Da 3 a 15 milioni di euro', score: 2 },
    { value: 'large', label: 'Oltre i 15 milioni di euro', score: 3 }
  ]},
  { id: 3, category: 'dimensione', text: 'Qual è la forma giuridica della tua impresa?', options: [
    { value: 'individuale', label: 'Ditta individuale', score: 1 },
    { value: 'persone', label: 'Società di persone (SNC, SAS)', score: 2 },
    { value: 'capitali', label: 'Società di capitali (SRL, SPA, SAPA)', score: 3 }
  ]},
  // ORGANIZZAZIONE
  { id: 4, category: 'organizzazione', subcategory: 'preparazione', text: 'Quanto sei preparato sulla normativa e sulle prassi vigenti relative alla riforma della legge sulla crisi d\'impresa ed in generale sulle tecniche di gestione delle imprese suggerite dall\'Economia Aziendale?', options: [
    { value: 'none', label: 'Non conosco né la normativa, né la prassi, e non conosco gli elementari concetti di economia aziendale.', score: 0 },
    { value: 'partial', label: 'Conosco la normativa ma non la prassi, e poco le tecniche di gestione.', score: 1 },
    { value: 'full', label: 'Conosco la normativa e la prassi, e sono esperto di tecniche di gestione aziendale.', score: 2 }
  ]},
  { id: 5, category: 'organizzazione', subcategory: 'posizionamento', text: 'La tua azienda fa almeno una volta all\'anno una analisi SWOT: punti di forza, punti di debolezza, minacce, opportunità?', options: [
    { value: 'no', label: 'No', score: 0 }, { value: 'yes', label: 'Sì', score: 2 }
  ]},
  { id: 6, category: 'organizzazione', subcategory: 'posizionamento', text: 'La tua azienda fa almeno due volte all\'anno l\'analisi di scenario?', options: [
    { value: 'no', label: 'No', score: 0 }, { value: 'yes', label: 'Sì', score: 2 }
  ]},
  { id: 7, category: 'organizzazione', subcategory: 'posizionamento', text: 'La tua azienda ha un piano strategico a tre anni?', options: [
    { value: 'no', label: 'No', score: 0 }, { value: 'yes', label: 'Sì', score: 2 }
  ]},
  { id: 8, category: 'organizzazione', subcategory: 'professionisti', text: 'La tua azienda fa incontri periodici (almeno trimestrali) con il proprio commercialista per analisi gestionali e non solo adempimenti fiscali?', options: [
    { value: 'no', label: 'No, solo per adempimenti fiscali', score: 0 },
    { value: 'partial', label: 'Saltuariamente', score: 1 },
    { value: 'yes', label: 'Sì, almeno trimestralmente', score: 2 }
  ]},
  { id: 9, category: 'organizzazione', subcategory: 'professionisti', text: 'La tua azienda fa incontri periodici con il proprio legale?', options: [
    { value: 'no', label: 'No', score: 0 }, { value: 'yes', label: 'Sì', score: 2 }
  ]},
  { id: 10, category: 'organizzazione', subcategory: 'professionisti', text: 'La tua azienda ha un consulente strategico e/o per il controllo di gestione?', options: [
    { value: 'no', label: 'No', score: 0 }, { value: 'yes', label: 'Sì', score: 2 }
  ]},
  // PROCESSI
  { id: 11, category: 'processi', subcategory: 'organizzazione_processi', text: 'La tua impresa ha un organigramma?', options: [
    { value: 'no', label: 'No', score: 0 }, { value: 'partial', label: 'Più o meno Sì', score: 1 }, { value: 'yes', label: 'Sì', score: 2 }
  ]},
  { id: 12, category: 'processi', subcategory: 'organizzazione_processi', text: 'Nella tua azienda i compiti riguardanti lo svolgimento delle direttive e la gestione dei "Processi" Direzionali, Gestionali ed Operativi sono suddivisi tra Amministratori, Management e Risorse operative aziendali in modo conforme?', options: [
    { value: 'no', label: 'No', score: 0 }, { value: 'partial', label: 'Più o meno Sì', score: 1 }, { value: 'yes', label: 'Sì', score: 2 }
  ]},
  { id: 13, category: 'processi', subcategory: 'organizzazione_processi', text: 'Nella tua azienda le decisioni vengono prese dai soggetti che hanno effettivamente mansione e/o potere per poterle assumere?', options: [
    { value: 'no', label: 'No', score: 0 }, { value: 'partial', label: 'Più o meno Sì', score: 1 }, { value: 'yes', label: 'Sì', score: 2 }
  ]},
  { id: 14, category: 'processi', subcategory: 'rischi', text: 'I beni aziendali (immobili, macchinari, merci etc.) hanno idonea copertura assicurativa per il rischio di distruzione e/o danneggiamento?', options: [
    { value: 'no', label: 'No', score: 0 }, { value: 'partial', label: 'In parte', score: 1 }, { value: 'yes', label: 'Sì', score: 2 }
  ]},
  { id: 15, category: 'processi', subcategory: 'adeguatezza_economica', text: 'Se dividi il costo annuale della manodopera per il volume di ricavi, che valore percentuale % hai?',
    help: 'Esempio: se il costo del personale è €300.000 e i ricavi sono €1.000.000, la percentuale è 30%', options: [
    { value: 'high', label: 'Maggiore di 60%', score: 0 },
    { value: 'medium', label: 'Compreso fra 30% e 60%', score: 1 },
    { value: 'low', label: 'Minore di 30%', score: 2 }
  ]},
  // AMMINISTRAZIONE
  { id: 16, category: 'amministrazione', subcategory: 'tempestivita', text: 'L\'impresa è in grado di stimare l\'andamento gestionale anche ricorrendo ad indicatori chiave gestionali (KPI) che consentano valutazioni rapide ed in continuo?', options: [
    { value: 'no', label: 'No', score: 0 }, { value: 'yes', label: 'Sì', score: 2 }
  ]},
  { id: 17, category: 'amministrazione', subcategory: 'tempestivita', text: 'La tua impresa predispone bilanci periodici e budget economico/finanziari?', options: [
    { value: 'no', label: 'No', score: 0 }, { value: 'partial', label: 'Saltuariamente', score: 1 }, { value: 'yes', label: 'Sì', score: 2 }
  ]},
  { id: 18, category: 'amministrazione', subcategory: 'tempestivita', text: 'La tua azienda utilizza gestionali ERP verticali?', options: [
    { value: 'no', label: 'No', score: 0 },
    { value: 'partial', label: 'Usiamo dei fogli excel e dei software ma non collegati fra loro.', score: 1 },
    { value: 'yes', label: 'Sì', score: 2 }
  ]},
  { id: 19, category: 'amministrazione', subcategory: 'equilibri', text: 'La tua impresa calcola con sistematicità il margine di contribuzione?', options: [
    { value: 'no', label: 'No', score: 0 }, { value: 'partial', label: 'Solo occasionalmente', score: 1 }, { value: 'yes', label: 'Sì', score: 2 }
  ]},
  { id: 20, category: 'amministrazione', subcategory: 'equilibri', text: 'Se dividi il totale dei debiti verso terzi (fornitori, banche, Stato, dipendenti) per il patrimonio netto quale risultato ottieni?',
    help: 'Esempio: se hai debiti totali per €500.000 e patrimonio netto di €100.000, il rapporto è 5', options: [
    { value: 'high', label: 'Maggiore di 5', score: 0 },
    { value: 'medium', label: 'Compreso tra 3 e 5', score: 1 },
    { value: 'low', label: 'Minore di 3', score: 2 }
  ]},
  // FORMAZIONE
  { id: 21, category: 'formazione', subcategory: 'formazione', text: 'Per ogni 100 ore retribuite, quante ore di formazione hanno fatto i tuoi dipendenti?',
    help: 'Esempio: se un dipendente lavora 1.700 ore/anno e fa 85 ore di formazione = 5%', options: [
    { value: 'low', label: 'Meno del 3%', score: 0 },
    { value: 'medium', label: 'Tra il 3% e il 5%', score: 1 },
    { value: 'high', label: 'Più del 5%', score: 2 }
  ]},
  { id: 22, category: 'formazione', subcategory: 'innovazione', text: 'Fatto 100 di volume di ricavi, quanti ricavi provengono dalla vendita di nuovi prodotti/servizi introdotti negli ultimi 2 anni?', options: [
    { value: 'low', label: 'Meno del 20%', score: 0 }, { value: 'high', label: 'Più del 20%', score: 2 }
  ]},
  { id: 23, category: 'formazione', subcategory: 'clima', text: 'La tua azienda rileva almeno due volte all\'anno il clima aziendale?', options: [
    { value: 'no', label: 'No', score: 0 }, { value: 'yes', label: 'Sì', score: 2 }
  ]},
  // CLIENTI
  { id: 24, category: 'clienti', subcategory: 'soddisfazione', text: 'La tua azienda rileva la soddisfazione dei clienti?', options: [
    { value: 'no', label: 'No', score: 0 }, { value: 'partial', label: 'In parte', score: 1 }, { value: 'yes', label: 'Sì', score: 2 }
  ]},
  { id: 25, category: 'clienti', subcategory: 'tracciamento', text: 'Sai determinare, nell\'arco dell\'anno, il numero di clienti nuovi e il numero di clienti totali?', options: [
    { value: 'no', label: 'No', score: 0 }, { value: 'yes', label: 'Sì', score: 2 }
  ]},
  { id: 26, category: 'clienti', subcategory: 'tracciamento', text: 'La tua azienda nella gestione dei rapporti con i clienti usa un CRM?', options: [
    { value: 'no', label: 'No', score: 0 }, { value: 'yes', label: 'Sì', score: 2 }
  ]},
  // COMPLIANCE
  { id: 27, category: 'compliance', subcategory: 'sicurezza_lavoro', isCompliance: true,
    text: 'La tua azienda è in regola con il D.Lgs. 81/2008 (Testo Unico Sicurezza sul Lavoro)?',
    help: 'DVR aggiornato, formazione lavoratori, nomina RSPP, sorveglianza sanitaria, etc.', options: [
    { value: 'no', label: 'No', score: 0 }, { value: 'partial', label: 'Parzialmente', score: 1 }, { value: 'yes', label: 'Sì, completamente in regola', score: 2 }
  ]},
  { id: 28, category: 'compliance', subcategory: 'privacy', isCompliance: true,
    text: 'La tua azienda è in regola con il D.Lgs. 196/2003 (Codice Privacy) e il Regolamento UE 679/2016 (GDPR)?',
    help: 'Registro trattamenti, informative, nomine responsabili, DPO se necessario, etc.', options: [
    { value: 'no', label: 'No', score: 0 }, { value: 'partial', label: 'Parzialmente', score: 1 }, { value: 'yes', label: 'Sì, completamente in regola', score: 2 }
  ]},
  { id: 29, category: 'compliance', subcategory: 'cybersecurity', isCompliance: true,
    text: 'La tua azienda ha implementato misure di cybersecurity per prevenire il data breach?',
    help: 'Backup, firewall, antivirus, procedure di gestione incidenti, formazione dipendenti, etc.', options: [
    { value: 'no', label: 'No', score: 0 }, { value: 'partial', label: 'Parzialmente', score: 1 }, { value: 'yes', label: 'Sì', score: 2 }
  ]},
  { id: 30, category: 'compliance', subcategory: 'dlgs231', isCompliance: true,
    text: 'La tua azienda ha adottato un Modello di Organizzazione e Gestione ai sensi del D.Lgs. 231/2001?',
    help: 'Il D.Lgs. 231/2001 disciplina la responsabilità amministrativa degli enti per reati commessi da dipendenti/amministratori', options: [
    { value: 'no', label: 'No', score: 0 }, { value: 'partial', label: 'In fase di implementazione', score: 1 }, { value: 'yes', label: 'Sì', score: 2 }
  ]},
  // SEGNALI DI CRISI
  { id: 31, category: 'segnali_crisi', subcategory: 'retribuzioni', isCrisisIndicator: true,
    text: 'Esistono debiti per retribuzioni scaduti da almeno 30 giorni pari a oltre la metà dell\'ammontare complessivo mensile delle retribuzioni?',
    help: 'Esempio: se le retribuzioni mensili totali sono €50.000 e hai arretrati >€25.000 scaduti da oltre 30 giorni, la risposta è SÌ',
    options: [{ value: 'yes', label: 'Sì', score: -10, crisis: true }, { value: 'no', label: 'No', score: 0, crisis: false }]
  },
  { id: 32, category: 'segnali_crisi', subcategory: 'fornitori', isCrisisIndicator: true,
    text: 'Esistono debiti verso fornitori scaduti da almeno 90 giorni di ammontare superiore a quello dei debiti non scaduti?',
    help: 'Esempio: se hai €100.000 di debiti verso fornitori scaduti da >90gg e solo €80.000 di debiti non ancora scaduti, la risposta è SÌ',
    options: [{ value: 'yes', label: 'Sì', score: -10, crisis: true }, { value: 'no', label: 'No', score: 0, crisis: false }]
  },
  { id: 33, category: 'segnali_crisi', subcategory: 'banche', isCrisisIndicator: true,
    text: 'Esistono esposizioni verso banche e intermediari finanziari scadute da più di 60 giorni o che abbiano superato da almeno 60 giorni il limite degli affidamenti, per almeno il 5% del totale delle esposizioni?',
    help: 'Esempio: se hai fidi per €200.000 e sconfini di €15.000 (7,5%) da oltre 60 giorni, la risposta è SÌ.',
    options: [{ value: 'yes', label: 'Sì', score: -10, crisis: true }, { value: 'no', label: 'No', score: 0, crisis: false }]
  },
  { id: 34, category: 'segnali_crisi', subcategory: 'inps', isCrisisIndicator: true,
    text: 'Esistono debiti verso INPS scaduti da oltre 90 giorni superiori al 30% dei contributi dell\'anno precedente E superiori a €15.000 (con dipendenti) o €5.000 (senza dipendenti)?',
    help: 'Esempio CON dipendenti: se i contributi INPS dell\'anno scorso erano €100.000 e hai arretrati di €35.000 (35%) scaduti da >90gg, la risposta è SÌ.',
    options: [{ value: 'yes', label: 'Sì', score: -10, crisis: true }, { value: 'no', label: 'No', score: 0, crisis: false }]
  },
  { id: 35, category: 'segnali_crisi', subcategory: 'inail', isCrisisIndicator: true,
    text: 'Esistono debiti verso INAIL per premi assicurativi scaduti da oltre 90 giorni e non versati superiori a €5.000?',
    options: [{ value: 'yes', label: 'Sì', score: -10, crisis: true }, { value: 'no', label: 'No', score: 0, crisis: false }]
  },
  { id: 36, category: 'segnali_crisi', subcategory: 'iva', isCrisisIndicator: true,
    text: 'Esistono debiti IVA da liquidazione periodica scaduti e non versati superiori a €5.000 E al 10% del volume d\'affari dell\'anno precedente? (La segnalazione scatta sempre se >€20.000)',
    options: [{ value: 'yes', label: 'Sì', score: -10, crisis: true }, { value: 'no', label: 'No', score: 0, crisis: false }]
  },
  { id: 37, category: 'segnali_crisi', subcategory: 'agenzia_riscossione', isCrisisIndicator: true,
    text: 'Esistono crediti affidati all\'Agenzia Entrate-Riscossione scaduti da oltre 90 giorni superiori alle soglie previste per la tua forma giuridica?',
    help: 'Soglie: Ditta individuale >€100.000 | Società di persone >€200.000 | Società di capitali >€500.000',
    options: [{ value: 'yes', label: 'Sì', score: -10, crisis: true }, { value: 'no', label: 'No', score: 0, crisis: false }]
  }
];

const categoryConfig = {
  organizzazione: { name: 'Organizzazione', icon: Building2, maxScore: 16, color: '#3B82F6' },
  processi: { name: 'Processi', icon: Users, maxScore: 12, color: '#8B5CF6' },
  amministrazione: { name: 'Amministrazione', icon: Calculator, maxScore: 12, color: '#10B981' },
  formazione: { name: 'Formazione, Innovazione e Clima', icon: TrendingUp, maxScore: 6, color: '#F59E0B' },
  clienti: { name: 'Clienti', icon: Heart, maxScore: 6, color: '#EC4899' },
  compliance: { name: 'Compliance Normativa', icon: Shield, maxScore: 8, color: '#6366F1' }
};

const getVoto = (percentage) => {
  if (percentage >= 80) return { voto: 'Ottimo', color: 'text-green-600', bg: 'bg-green-100' };
  if (percentage >= 60) return { voto: 'Buono', color: 'text-green-500', bg: 'bg-green-50' };
  if (percentage >= 40) return { voto: 'Sufficiente', color: 'text-yellow-600', bg: 'bg-yellow-50' };
  if (percentage >= 20) return { voto: 'Insufficiente', color: 'text-orange-600', bg: 'bg-orange-50' };
  return { voto: 'Scarso', color: 'text-red-600', bg: 'bg-red-50' };
};

const getSemaforoColor = (percentage) => {
  if (percentage >= 60) return 'green';
  if (percentage >= 30) return 'yellow';
  return 'red';
};

// RADAR CHART
const RadarChart = ({ data, size = 300 }) => {
  const categories = Object.keys(data).filter(k => k !== 'total');
  const numCategories = categories.length;
  const angleStep = (2 * Math.PI) / numCategories;
  const centerX = size / 2;
  const centerY = size / 2;
  const maxRadius = size / 2 - 50;

  const getPoint = (index, value) => {
    const angle = index * angleStep - Math.PI / 2;
    const radius = (value / 100) * maxRadius;
    return { x: centerX + radius * Math.cos(angle), y: centerY + radius * Math.sin(angle) };
  };

  return (
    <svg width={size} height={size} className="mx-auto">
      {[20, 40, 60, 80, 100].map(level => (
        <circle key={level} cx={centerX} cy={centerY} r={(level / 100) * maxRadius} fill="none" stroke="#e5e7eb" strokeWidth="1" />
      ))}
      {categories.map((_, index) => {
        const point = getPoint(index, 100);
        return <line key={index} x1={centerX} y1={centerY} x2={point.x} y2={point.y} stroke="#e5e7eb" strokeWidth="1" />;
      })}
      <polygon
        points={categories.map((cat, index) => { const point = getPoint(index, data[cat] || 0); return `${point.x},${point.y}`; }).join(' ')}
        fill="rgba(59, 130, 246, 0.3)" stroke="#3B82F6" strokeWidth="2"
      />
      {categories.map((cat, index) => {
        const point = getPoint(index, data[cat] || 0);
        const color = (data[cat] || 0) >= 60 ? '#10B981' : (data[cat] || 0) >= 30 ? '#F59E0B' : '#EF4444';
        return <circle key={cat} cx={point.x} cy={point.y} r="6" fill={color} stroke="white" strokeWidth="2" />;
      })}
      {categories.map((cat, index) => {
        const point = getPoint(index, 125);
        const config = categoryConfig[cat];
        return <text key={cat} x={point.x} y={point.y} textAnchor="middle" dominantBaseline="middle" className="text-xs font-medium fill-gray-600">{config?.name?.split(',')[0]?.substring(0, 10) || cat}</text>;
      })}
    </svg>
  );
};

// MAIN COMPONENT
export default function AssettiAziendali2086Final() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [companyData, setCompanyData] = useState({ name: '', sede: '', piva: '' });
  const [showResults, setShowResults] = useState(false);
  const [viewMode, setViewMode] = useState('base');
  const [keySequence, setKeySequence] = useState('');
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [lastTapTime, setLastTapTime] = useState(0);
  const reportRef = useRef(null);

  // Gestione combinazione tasti FGH e RTY
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key.toLowerCase();
      const newSequence = keySequence + key;

      if (newSequence.endsWith('fgh')) {
        // Compila automaticamente tutto
        const autoAnswers = {};
        questions.forEach((q, idx) => {
          // Scegli risposte casuali per varietà
          const optionIndex = idx % q.options.length;
          const option = q.options[optionIndex];
          autoAnswers[q.id] = {
            value: option.value,
            score: option.score,
            crisis: option.crisis || false
          };
        });

        setCompanyData({
          name: 'Azienda Demo S.r.l.',
          sede: 'Via Roma 123, Milano (MI)',
          piva: '12345678901'
        });
        setAnswers(autoAnswers);
        setShowResults(true);
        setViewMode('base');
        setKeySequence('');
      } else if (newSequence.endsWith('rty')) {
        // Sblocca report premium
        setIsPremiumUnlocked(true);
        setShowPremiumPopup(false);
        setViewMode('premium');
        setKeySequence('');
      } else {
        setKeySequence(newSequence.slice(-3)); // Mantieni solo ultimi 3 caratteri
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [keySequence]);

  // Gestione 7 tap consecutivi per mobile
  const handleLogoTap = () => {
    const now = Date.now();

    // Reset se sono passati più di 2 secondi dall'ultimo tap
    if (now - lastTapTime > 2000) {
      setTapCount(1);
    } else {
      const newCount = tapCount + 1;
      setTapCount(newCount);

      if (newCount >= 7) {
        // Sblocca report premium
        setIsPremiumUnlocked(true);
        setShowPremiumPopup(false);
        setViewMode('premium');
        setTapCount(0);
      }
    }

    setLastTapTime(now);
  };

  const handlePremiumClick = () => {
    if (isPremiumUnlocked) {
      setViewMode('premium');
    } else {
      setShowPremiumPopup(true);
    }
  };

  const handleAnswer = (questionId, value, score, crisis = false) => {
    setAnswers(prev => ({ ...prev, [questionId]: { value, score, crisis } }));
  };

  const calculateScores = () => {
    const scores = {};
    Object.keys(categoryConfig).forEach(cat => { scores[cat] = 0; });
    questions.forEach(q => {
      if (answers[q.id] && q.category !== 'dimensione' && q.category !== 'segnali_crisi' && categoryConfig[q.category]) {
        scores[q.category] = (scores[q.category] || 0) + Math.max(0, answers[q.id].score);
      }
    });
    return scores;
  };

  const calculatePercentages = () => {
    const scores = calculateScores();
    const percentages = {};
    Object.keys(categoryConfig).forEach(cat => { percentages[cat] = Math.round((scores[cat] / categoryConfig[cat].maxScore) * 100); });
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
    const totalMax = Object.values(categoryConfig).reduce((a, b) => a + b.maxScore, 0);
    percentages.total = Math.round((totalScore / totalMax) * 100);
    return percentages;
  };

  const getCrisisIndicators = () => questions.filter(q => q.isCrisisIndicator).map(q => ({ ...q, answer: answers[q.id], isTriggered: answers[q.id]?.crisis === true }));
  const hasCrisisSignals = () => getCrisisIndicators().some(i => i.isTriggered);
  const getComplianceStatus = () => {
    const complianceQuestions = questions.filter(q => q.isCompliance);
    const results = complianceQuestions.map(q => ({ ...q, answer: answers[q.id], isNonCompliant: answers[q.id]?.value === 'no' }));
    return { results, nonCompliantCount: results.filter(r => r.isNonCompliant).length, hasIssues: results.some(r => r.isNonCompliant) };
  };

  const canProceed = () => {
    if (currentStep === 0) return companyData.name.trim().length > 0;
    const startIdx = (currentStep - 1) * 4;
    const endIdx = Math.min(startIdx + 4, questions.length);
    for (let i = startIdx; i < endIdx; i++) { if (!answers[questions[i].id]) return false; }
    return true;
  };

  const handleSavePDF = () => {
    if (!reportRef.current) {
      alert('Report non disponibile');
      return;
    }

    // Usa la funzionalità di stampa nativa del browser
    // che gestisce automaticamente le interruzioni di pagina
    window.print();
  };

  const handleExportAnswers = () => {
    // Crea un file di testo con domande e risposte
    let content = `QUESTIONARIO ADEGUATI ASSETTI AZIENDALI - Art. 2086 c.c.\n`;
    content += `Azienda: ${companyData.name}\n`;
    content += `Data: ${new Date().toLocaleDateString('it-IT')}\n`;
    content += `\n${'='.repeat(80)}\n\n`;

    questions.forEach((q, index) => {
      const answer = answers[q.id];
      if (answer) {
        content += `DOMANDA ${index + 1}\n`;
        content += `${q.text}\n\n`;

        // Trova l'opzione selezionata usando answer.value
        const selectedOption = q.options.find(opt => opt.value === answer.value);
        if (selectedOption) {
          content += `RISPOSTA:\n${selectedOption.label}\n`;
        } else {
          content += `RISPOSTA: ${answer.value}\n`;
        }

        content += `\n${'-'.repeat(80)}\n\n`;
      }
    });

    content += `${'='.repeat(80)}\n`;
    content += `\nReport generato da www.2086.it - Network Consulenti Aziendali d'Italia\n`;

    // Crea e scarica il file
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Risposte_2086_${companyData.name?.replace(/[^a-zA-Z0-9]/g, '_') || 'azienda'}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const totalSteps = Math.ceil(questions.length / 4) + 1;

  // INTRO
  const renderIntro = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
          <FileText className="w-10 h-10 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Verifica Adeguati Assetti Aziendali</h2>
        <p className="text-gray-600 mt-2">Art. 2086 secondo comma - Codice Civile</p>
      </div>
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <p className="text-sm text-blue-800">Questo strumento verifica l'adeguatezza degli assetti organizzativi, amministrativi e contabili, inclusi i <strong>segnali di crisi</strong> e la <strong>compliance normativa</strong>.</p>
      </div>

      {/* INFORMATIVA PRIVACY */}
      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
        <div className="flex items-start gap-2">
          <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-green-800 mb-1">Informativa Privacy e Trattamento Dati</h4>
            <p className="text-xs text-green-700">
              In conformità al Regolamento UE 2016/679 (GDPR) e al D.Lgs. 196/2003, i dati inseriti in questo questionario sono utilizzati esclusivamente per l'elaborazione del report sugli adeguati assetti aziendali.
              I dati <strong>non verranno condivisi con terzi</strong>, non verranno utilizzati per finalità di marketing e saranno trattati nel rispetto della massima riservatezza.
              Il trattamento dei dati avviene in forma anonimizzata per l'analisi tecnica e professionale richiesta.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="block">
          <span className="text-gray-700 font-medium">Denominazione Sociale *</span>
          <input type="text" value={companyData.name} onChange={(e) => setCompanyData(prev => ({...prev, name: e.target.value}))} className="mt-1 block w-full rounded-lg border-gray-300 border-2 shadow-sm focus:border-blue-500 p-3" placeholder="Es. Mario Rossi S.R.L." />
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-gray-700 font-medium">Sede Legale</span>
            <input type="text" value={companyData.sede} onChange={(e) => setCompanyData(prev => ({...prev, sede: e.target.value}))} className="mt-1 block w-full rounded-lg border-gray-300 border-2 shadow-sm focus:border-blue-500 p-3" />
          </label>
          <label className="block">
            <span className="text-gray-700 font-medium">Partita IVA</span>
            <input type="text" value={companyData.piva} onChange={(e) => setCompanyData(prev => ({...prev, piva: e.target.value}))} className="mt-1 block w-full rounded-lg border-gray-300 border-2 shadow-sm focus:border-blue-500 p-3" />
          </label>
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-3">I 3 Step del Servizio:</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
            <div><p className="font-semibold text-green-800">Report Base - GRATUITO</p><p className="text-sm text-green-700">Semaforo di rischio + punteggi per area</p></div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
            <div><p className="font-semibold text-blue-800">Report Peritale Completo</p><p className="text-sm text-blue-700">Analisi dettagliata, riferimenti normativi, giudizio professionale</p></div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
            <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
            <div><p className="font-semibold text-purple-800">Piano di Miglioramento Personalizzato</p><p className="text-sm text-purple-700">Consulenza con i nostri esperti + azioni operative</p></div>
          </div>
        </div>
      </div>
    </div>
  );

  // QUESTIONS
  const renderQuestions = () => {
    const startIdx = (currentStep - 1) * 4;
    const endIdx = Math.min(startIdx + 4, questions.length);
    const currentQuestions = questions.slice(startIdx, endIdx);
    const isCrisisSection = currentQuestions.some(q => q.isCrisisIndicator);
    const isComplianceSection = currentQuestions.some(q => q.isCompliance);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">Domande {startIdx + 1}-{endIdx} di {questions.length}</span>
          <div className="w-48 bg-gray-200 rounded-full h-2"><div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${(endIdx / questions.length) * 100}%` }} /></div>
        </div>
        {isCrisisSection && (
          <div className="bg-red-100 border-2 border-red-400 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2"><AlertOctagon className="w-6 h-6 text-red-600" /><span className="font-bold text-red-800">SEGNALI DI CRISI</span></div>
            <p className="text-sm text-red-700 mt-2">Una risposta affermativa indica la presenza di un potenziale stato di crisi.</p>
          </div>
        )}
        {isComplianceSection && (
          <div className="bg-indigo-100 border-2 border-indigo-400 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2"><Shield className="w-6 h-6 text-indigo-600" /><span className="font-bold text-indigo-800">COMPLIANCE NORMATIVA</span></div>
          </div>
        )}
        {currentQuestions.map((q, idx) => (
          <div key={q.id} className={`border rounded-lg p-4 shadow-sm ${q.isCrisisIndicator ? 'bg-red-50 border-red-300' : q.isCompliance ? 'bg-indigo-50 border-indigo-300' : 'bg-white'}`}>
            {q.isCrisisIndicator && <div className="flex items-center gap-1 text-red-600 text-xs font-semibold mb-2"><AlertTriangle className="w-4 h-4" />INDICATORE DI CRISI</div>}
            {q.isCompliance && <div className="flex items-center gap-1 text-indigo-600 text-xs font-semibold mb-2"><Shield className="w-4 h-4" />COMPLIANCE</div>}
            <p className="font-medium text-gray-800 mb-2">{startIdx + idx + 1}. {q.text}</p>
            {q.help && <div className="bg-blue-50 border border-blue-200 rounded p-2 mb-3 text-xs text-blue-800">💡 {q.help}</div>}
            <div className="space-y-2">
              {q.options.map((opt) => (
                <label key={opt.value} className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${answers[q.id]?.value === opt.value ? (q.isCrisisIndicator && opt.crisis ? 'border-red-500 bg-red-100' : 'border-blue-500 bg-blue-50') : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="radio" name={`question-${q.id}`} value={opt.value} checked={answers[q.id]?.value === opt.value} onChange={() => handleAnswer(q.id, opt.value, opt.score, opt.crisis)} className="w-4 h-4 text-blue-600" />
                  <span className={`text-sm ${q.isCrisisIndicator && opt.crisis ? 'text-red-700 font-medium' : 'text-gray-700'}`}>{opt.label}</span>
                  {q.isCrisisIndicator && opt.crisis && <span className="ml-auto text-xs bg-red-600 text-white px-2 py-0.5 rounded">⚠️</span>}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // SEMAFORO
  const renderSemaforo = (color) => (
    <div className="flex flex-col items-center gap-2">
      <div className="bg-gray-800 rounded-lg p-3 inline-flex flex-col gap-2">
        <div className={`w-12 h-12 rounded-full ${color === 'red' ? 'bg-red-500 shadow-lg shadow-red-500/50' : 'bg-red-900'}`} />
        <div className={`w-12 h-12 rounded-full ${color === 'yellow' ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50' : 'bg-yellow-900'}`} />
        <div className={`w-12 h-12 rounded-full ${color === 'green' ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-green-900'}`} />
      </div>
    </div>
  );

  // BASE RESULTS
  const renderBaseResults = () => {
    const percentages = calculatePercentages();
    const semaforoColor = hasCrisisSignals() ? 'red' : getSemaforoColor(percentages.total);
    const { voto } = getVoto(percentages.total);
    const triggeredCrisis = getCrisisIndicators().filter(i => i.isTriggered);
    const compliance = getComplianceStatus();

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Report Base - Risultati</h2>
          <p className="text-gray-600">{companyData.name}</p>
        </div>
        {triggeredCrisis.length > 0 && (
          <div className="bg-red-600 text-white p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2"><AlertOctagon className="w-6 h-6" /><span className="font-bold">⚠️ SEGNALI DI CRISI RILEVATI ({triggeredCrisis.length})</span></div>
            <p className="text-sm">Potrebbe essere necessario valutare l'attivazione della composizione negoziata.</p>
          </div>
        )}
        {compliance.hasIssues && (
          <div className="bg-indigo-600 text-white p-4 rounded-lg">
            <div className="flex items-center gap-2"><Shield className="w-6 h-6" /><span className="font-bold">⚠️ CRITICITÀ COMPLIANCE ({compliance.nonCompliantCount})</span></div>
          </div>
        )}
        <div className="flex justify-center">{renderSemaforo(semaforoColor)}</div>
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-800">{percentages.total}%</div>
          <div className={`text-xl font-semibold ${getVoto(percentages.total).color}`}>Giudizio: {voto}</div>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <h3 className="font-bold text-center mb-2 text-sm">Analisi per Prospettiva</h3>
          <RadarChart data={percentages} size={250} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {Object.entries(categoryConfig).map(([key, config]) => {
            const Icon = config.icon;
            const perc = percentages[key] || 0;
            const color = getSemaforoColor(perc);
            return (
              <div key={key} className="bg-white border rounded-lg p-2 text-center">
                <Icon className="w-5 h-5 mx-auto mb-1" style={{color: config.color}} />
                <div className="text-xs text-gray-600 truncate">{config.name.split(',')[0]}</div>
                <div className={`font-bold ${color === 'green' ? 'text-green-600' : color === 'yellow' ? 'text-yellow-600' : 'text-red-600'}`}>{perc}%</div>
              </div>
            );
          })}
        </div>
        {/* PIANO BLOCCATO */}
        <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-gray-800 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Target className="w-6 h-6" /><h3 className="font-bold text-lg">PIANO DI MIGLIORAMENTO</h3></div>
              <Lock className="w-6 h-6 text-gray-400" />
            </div>
          </div>
          <div className="p-4 bg-gray-50">
            <div className="space-y-3 opacity-60">
              <div className="bg-red-100 p-3 rounded border-l-4 border-red-500"><span className="font-bold text-red-800">AZIONI URGENTI (7-15 giorni)</span><div className="mt-2 h-3 bg-gray-300 rounded w-3/4"></div></div>
              <div className="bg-orange-100 p-3 rounded border-l-4 border-orange-500"><span className="font-bold text-orange-800">AZIONI A BREVE TERMINE (15-45 giorni)</span><div className="mt-2 h-3 bg-gray-300 rounded w-2/3"></div></div>
              <div className="bg-blue-100 p-3 rounded border-l-4 border-blue-500"><span className="font-bold text-blue-800">AZIONI A MEDIO TERMINE (60+ giorni)</span><div className="mt-2 h-3 bg-gray-300 rounded w-4/5"></div></div>
            </div>
            <div className="mt-4 text-center"><Lock className="w-12 h-12 mx-auto text-gray-400 mb-2" /><p className="text-gray-600 font-medium">Contenuto riservato</p></div>
          </div>
        </div>
        {/* CTA REPORT */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-3"><FileText className="w-8 h-8" /><div><h3 className="font-bold text-lg">Report Peritale Completo</h3><p className="text-blue-100 text-sm">Analisi dettagliata conforme agli standard professionali</p></div></div>
          <ul className="text-sm space-y-1 mb-4 text-blue-100">
            <li>✓ Premessa e quadro normativo completo</li>
            <li>✓ Analisi dettagliata di tutte le prospettive</li>
            <li>✓ Riferimenti giurisprudenziali</li>
            <li>✓ Giudizio professionale motivato</li>
          </ul>
          <button onClick={handlePremiumClick} className="w-full bg-white text-blue-600 font-semibold py-3 px-4 rounded-lg hover:bg-blue-50 transition">
            Visualizza Report Peritale Completo
          </button>
        </div>
        {/* CTA PIANO */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-3"><Calendar className="w-8 h-8" /><div><h3 className="font-bold text-lg">Piano di Miglioramento Personalizzato</h3><p className="text-purple-100 text-sm">Consulenza con i nostri esperti</p></div></div>
          <ul className="text-sm space-y-1 mb-4 text-purple-100">
            <li>✓ Azioni urgenti, breve e medio termine</li>
            <li>✓ Elaborazione ad hoc per la tua azienda</li>
            <li>✓ Modello delibera CdA/Amministratore Unico</li>
          </ul>
          <button onClick={() => setViewMode('piano')} className="w-full bg-white text-purple-600 font-semibold py-3 px-4 rounded-lg hover:bg-purple-50 transition flex items-center justify-center gap-2">
            <Phone className="w-5 h-5" />Fissa un Appuntamento
          </button>
        </div>
      </div>
    );
  };

  // ==================== PREMIUM REPORT (COMPLETO) ====================
  const renderPremiumReport = () => {
    const percentages = calculatePercentages();
    const triggeredCrisis = getCrisisIndicators().filter(i => i.isTriggered);
    const compliance = getComplianceStatus();
    const oggi = new Date().toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const oggiEsteso = new Date().toLocaleDateString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // ANALYSIS FUNCTIONS
    const getAreaPreparazione = () => {
      const ans = answers[4]?.value;
      if (ans === 'full') return { text: "L'amministrazione aziendale dimostra una conoscenza approfondita del contesto normativo relativo agli obblighi introdotti dal D.Lgs. 14/2019. La preparazione sulle tecniche di gestione aziendale risulta adeguata agli standard richiesti dalla normativa vigente.", voto: 'Ottimo', raccomandazioni: [], tempistiche: [] };
      if (ans === 'partial') return { text: "Per un imprenditore è fondamentale conoscere il contesto normativo in cui opera la sua azienda. A partire dal 16 Marzo 2019 il D.Lgs. 14/2019 ha introdotto dei pesanti obblighi e responsabilità a carico delle imprese e degli amministratori. Si riscontra che ad oggi la conoscenza di tali modifiche all'interno del contesto aziendale è PARZIALE, con lacune significative sulle prassi applicative e sulle tecniche di gestione.", voto: 'Insufficiente', raccomandazioni: ["Effettuare un corso di aggiornamento sulla normativa della crisi d'impresa (minimo 4 ore)", "Programmare almeno due ore di aggiornamento mensile per l'amministrazione"], tempistiche: ['Entro 30 giorni', 'Continuativo'] };
      return { text: "Per un imprenditore è fondamentale conoscere il contesto normativo in cui opera la sua azienda. A partire dal 16 Marzo 2019 il D.Lgs. 14/2019 ha introdotto dei pesanti obblighi e responsabilità a carico delle imprese e degli amministratori. Si riscontra che ad oggi la conoscenza di tali modifiche all'interno del contesto aziendale è SCARSA se NON NULLA. Questa grave carenza espone gli amministratori a significative responsabilità civili e penali ai sensi dell'art. 2476 sesto comma del Codice Civile.", voto: 'Scarso', raccomandazioni: ["URGENTE: Effettuare immediatamente un corso sulla normativa della crisi d'impresa (minimo 4 ore)", "Assumere o incaricare un consulente esperto in adeguati assetti", "Programmare almeno due ore di formazione mensile per l'amministrazione"], tempistiche: ['Entro 15 giorni', 'Entro 30 giorni', 'Continuativo'] };
    };

    const getAreaPosizionamento = () => {
      const swot = answers[5]?.value === 'yes'; const scenario = answers[6]?.value === 'yes'; const piano = answers[7]?.value === 'yes';
      if (swot && scenario && piano) return { text: "L'azienda ha il pieno controllo strategico delle possibili evoluzioni future degli ambienti esterni, dei propri punti di debolezza e delle future minacce. Vengono effettuate regolarmente analisi SWOT, analisi di scenario e dispone di un piano strategico triennale. I fattori critici di successo sono ben identificati e l'azione strategica è basata su di essi.", voto: 'Ottimo', raccomandazioni: [], tempistiche: [] };
      if (swot || scenario || piano) { const missing = []; if (!swot) missing.push("analisi SWOT annuale"); if (!scenario) missing.push("analisi di scenario semestrale"); if (!piano) missing.push("piano strategico triennale"); return { text: `L'azienda presenta una conoscenza parziale del proprio posizionamento strategico. Risultano assenti: ${missing.join(', ')}. Questa situazione limita la capacità di anticipare i mutamenti degli ambienti esterni e di identificare tempestivamente potenziali indizi di crisi.`, voto: 'Insufficiente', raccomandazioni: missing.map(m => `Implementare ${m}`), tempistiche: missing.map(() => 'Entro 60 giorni') }; }
      return { text: "L'azienda è all'oscuro del contesto strategico in cui opera ed allo stato attuale non possiede gli strumenti e la struttura adeguati all'individuazione dell'evoluzione futura degli ambienti esterni (socio-politico, mercato, concorrenza e tecnologia). Questa grave inadeguatezza la espone ad una potenziale crisi futura causata dal fatto che non riuscirà ad anticipare i mutamenti degli ambienti esterni. Ecco che la conoscenza dei fattori critici di successo del proprio 'core business', l'analisi dei propri punti di forza e di debolezza, la capacità di percepire le minacce e le opportunità derivanti dai mutamenti degli scenari esterni sono elementi FONDAMENTALI per la salute attuale e futura dell'azienda.", voto: 'Scarso', raccomandazioni: ["URGENTE: Effettuare immediatamente un'analisi SWOT completa", "Introdurre procedure per l'analisi di scenario con cadenza semestrale", "Redigere un piano strategico triennale", "Identificare e formalizzare i fattori critici di successo del business"], tempistiche: ['Entro 15 giorni', 'Entro 45 giorni', 'Entro 90 giorni', 'Entro 30 giorni'] };
    };

    const getAreaProfessionisti = () => {
      const commercialista = answers[8]?.value; const legale = answers[9]?.value === 'yes'; const consulente = answers[10]?.value === 'yes';
      const score = (commercialista === 'yes' ? 2 : commercialista === 'partial' ? 1 : 0) + (legale ? 2 : 0) + (consulente ? 2 : 0);
      if (score >= 5) return { text: "L'azienda possiede un panel di consulenti esterni adeguato che con la sua attività riesce a prevenire i possibili rischi giuridico-economici che inevitabilmente corre. Il rapporto con il commercialista va oltre i meri adempimenti fiscali e include analisi gestionali periodiche. Si raccomanda di continuare ed incrementare gli incontri con i professionisti esterni e le attività di prevenzione.", voto: 'Ottimo', raccomandazioni: [], tempistiche: [] };
      if (score >= 2) { const missing = []; if (commercialista !== 'yes') missing.push("incontri trimestrali con il commercialista per analisi gestionali"); if (!legale) missing.push("incontri periodici con un legale"); if (!consulente) missing.push("consulente strategico/controllo di gestione"); return { text: `L'azienda dispone solo parzialmente di un adeguato panel di professionisti esterni. Risultano assenti o insufficienti: ${missing.join('; ')}. Questa carenza limita la capacità di prevenire rischi giuridico-economici.`, voto: 'Insufficiente', raccomandazioni: missing.map(m => `Implementare ${m}`), tempistiche: missing.map(() => 'Entro 30 giorni') }; }
      return { text: "L'azienda è sprovvista di un adeguato panel di consulenti esterni che riesca, con la sua attività, a prevenire gli inevitabili rischi giuridico-economici. Pertanto, si raccomanda che l'azienda si doti di: un commercialista con cui effettuare incontri trimestrali non solo per adempimenti fiscali ma anche per analisi gestionali; un professionista legale che periodicamente analizzi i possibili rischi giuridici e si attivi per evitarli; un consulente esterno per l'attività di pianificazione strategica e controllo di gestione.", voto: 'Scarso', raccomandazioni: ["URGENTE: Programmare incontri trimestrali con il commercialista per analisi gestionali", "Individuare e incaricare un legale di fiducia con incontri almeno semestrali", "Individuare un consulente strategico e/o per il controllo di gestione"], tempistiche: ['Entro 15 giorni', 'Entro 30 giorni', 'Entro 45 giorni'] };
    };

    const getAreaProcessi = () => {
      const o = answers[11]?.value; const c = answers[12]?.value; const d = answers[13]?.value;
      const score = (o === 'yes' ? 2 : o === 'partial' ? 1 : 0) + (c === 'yes' ? 2 : c === 'partial' ? 1 : 0) + (d === 'yes' ? 2 : d === 'partial' ? 1 : 0);
      if (score >= 5) return { text: "In azienda i compiti e le mansioni sono ottimamente ripartiti. L'organigramma è chiaro e formalizzato. I collaboratori hanno chiari i loro compiti e sanno sempre a chi fare riferimento per ricevere delle direttive che puntualmente vengono indicate in maniera chiara e precisa. Le decisioni vengono assunte dai soggetti che hanno effettivamente la mansione e il potere per poterle prendere.", voto: 'Ottimo', raccomandazioni: [], tempistiche: [] };
      if (score >= 3) return { text: "L'organizzazione aziendale presenta alcuni elementi positivi ma necessita di miglioramenti. L'organigramma potrebbe essere più chiaro e formalizzato. La ripartizione dei compiti e delle responsabilità non è sempre ottimale.", voto: 'Sufficiente', raccomandazioni: ["Formalizzare l'organigramma aziendale", "Definire per iscritto mansioni e responsabilità"], tempistiche: ['Entro 30 giorni', 'Entro 45 giorni'] };
      return { text: "L'azienda è completamente disordinata e disorganizzata; se si dovesse paragonare ad un modello di organizzazione sociale sarebbe l'anarchia. I compiti e le mansioni all'interno dell'azienda non sono ripartiti ed assegnati in modo adeguato con la conseguenza che i collaboratori non hanno chiari i loro compiti e non sanno a chi fare riferimento per ricevere delle chiare direttive. Questa situazione costituisce una grave violazione degli obblighi di cui all'art. 2086 secondo comma.", voto: 'Scarso', raccomandazioni: ["URGENTE: Redigere immediatamente un organigramma aziendale", "Definire per iscritto mansioni, compiti e responsabilità di ogni collaboratore", "Implementare un sistema di deleghe scritte"], tempistiche: ['Entro 7 giorni', 'Entro 15 giorni', 'Entro 30 giorni'] };
    };

    const getAreaRischi = () => {
      const a = answers[14]?.value;
      if (a === 'yes') return { text: "I fattori produttivi che l'azienda usa sono coperti da adeguata garanzia assicurativa. L'azienda non è esposta al rischio di interruzione dell'attività derivante da eventi dannosi sui beni aziendali.", voto: 'Ottimo', raccomandazioni: [], tempistiche: [] };
      if (a === 'partial') return { text: "I fattori produttivi sono solo parzialmente coperti da garanzia assicurativa. L'azienda è parzialmente esposta al rischio di interruzione dell'attività.", voto: 'Insufficiente', raccomandazioni: ["Verificare l'adeguatezza delle polizze esistenti", "Stipulare coperture assicurative per i beni non ancora tutelati"], tempistiche: ['Entro 15 giorni', 'Entro 30 giorni'] };
      return { text: "I fattori produttivi che l'azienda usa non sono coperti da adeguata garanzia assicurativa. L'azienda è continuamente esposta al rischio di interruzione dell'attività. Un evento dannoso (incendio, allagamento, furto, etc.) potrebbe compromettere irrimediabilmente la continuità aziendale.", voto: 'Scarso', raccomandazioni: ["URGENTE: Contattare immediatamente un broker assicurativo", "Stipulare polizze assicurative per immobili, macchinari, merci e responsabilità civile"], tempistiche: ['Entro 7 giorni', 'Entro 30 giorni'] };
    };

    const getAreaAdeguatezzaEconomica = () => {
      const r = answers[15]?.value;
      if (r === 'low') return { text: "Il margine di contribuzione che l'azienda produce è adeguato a sostenere il numero di collaboratori attualmente assunti. Il rapporto tra costo della manodopera e ricavi (inferiore al 30%) indica un'efficienza operativa ottimale.", voto: 'Ottimo', raccomandazioni: [], tempistiche: [] };
      if (r === 'medium') return { text: "Il margine di contribuzione che l'azienda produce riesce con una certa difficoltà a sostenere il numero di collaboratori attualmente assunti. Il rapporto tra costo della manodopera e ricavi (tra 30% e 60%) indica margini di miglioramento.", voto: 'Insufficiente', raccomandazioni: ["Effettuare un'analisi di efficienza dei processi produttivi/operativi", "Implementare KPI di produttività"], tempistiche: ['Entro 45 giorni', 'Entro 30 giorni'] };
      return { text: "Il margine di contribuzione che l'azienda produce non riesce a sostenere adeguatamente il numero di collaboratori attualmente assunti. Il rapporto tra costo della manodopera e ricavi (superiore al 60%) indica una grave inefficienza che secondo la dottrina economica aziendale costituisce uno dei principali fattori primari di crisi.", voto: 'Scarso', raccomandazioni: ["URGENTE: Effettuare immediatamente un'analisi di break-even", "Analizzare la produttività di ogni centro di costo", "Valutare la riorganizzazione della struttura del personale"], tempistiche: ['Entro 7 giorni', 'Entro 15 giorni', 'Entro 30 giorni'] };
    };

    const getAreaTempestivita = () => {
      const kpi = answers[16]?.value === 'yes'; const bilanci = answers[17]?.value; const erp = answers[18]?.value;
      const score = (kpi ? 2 : 0) + (bilanci === 'yes' ? 2 : bilanci === 'partial' ? 1 : 0) + (erp === 'yes' ? 2 : erp === 'partial' ? 1 : 0);
      if (score >= 5) return { text: "La tua azienda è dotata di un gestionale ERP verticale capace di rilevare in tempo reale tutti gli atti e i fatti aziendali, fornendo con immediatezza i report necessari per effettuare la sintesi dell'andamento gestionale e la conseguente analisi. Vengono predisposti bilanci periodici e budget economico-finanziari. L'impresa è in grado di stimare l'andamento gestionale ricorrendo ad indicatori chiave gestionali (KPI) che consentono valutazioni rapide e in continuo.", voto: 'Ottimo', raccomandazioni: [], tempistiche: [] };
      if (score >= 3) return { text: "L'azienda dispone di alcuni strumenti per il monitoraggio gestionale ma non in modo completo e integrato. La capacità di rilevare tempestivamente l'andamento aziendale presenta margini di miglioramento.", voto: 'Sufficiente', raccomandazioni: ["Valutare l'implementazione di un sistema ERP integrato", "Sistematizzare la predisposizione di bilanci periodici"], tempistiche: ['Entro 90 giorni', 'Entro 30 giorni'] };
      return { text: "La tua azienda ha assolutamente bisogno di dotarsi di un gestionale ERP verticale capace di rilevare in tempo reale tutti gli atti e i fatti aziendali. L'assenza di bilanci periodici e di indicatori gestionali (KPI) rende impossibile una tempestiva rilevazione degli indizi di crisi come richiesto dall'art. 3 del D.Lgs. 14/2019.", voto: 'Scarso', raccomandazioni: ["URGENTE: Implementare un sistema gestionale ERP", "Predisporre bilanci periodici con cadenza almeno trimestrale", "Definire e monitorare KPI gestionali"], tempistiche: ['Entro 60 giorni', 'Entro 30 giorni', 'Entro 30 giorni'] };
    };

    const getAreaEquilibri = () => {
      const margine = answers[19]?.value; const debiti = answers[20]?.value;
      const score = (margine === 'yes' ? 2 : margine === 'partial' ? 1 : 0) + (debiti === 'low' ? 2 : debiti === 'medium' ? 1 : 0);
      if (score >= 3) return { text: "La tua azienda ha la piena consapevolezza dei propri equilibri economico-finanziari. Il margine di contribuzione viene calcolato con sistematicità e il rapporto tra debiti verso terzi e patrimonio netto risulta adeguato.", voto: 'Ottimo', raccomandazioni: [], tempistiche: [] };
      if (score >= 2) return { text: "L'azienda ha una consapevolezza parziale dei propri equilibri economico-finanziari. È necessario migliorare la sistematicità nel calcolo del margine di contribuzione e/o monitorare più attentamente il rapporto di indebitamento.", voto: 'Insufficiente', raccomandazioni: ["Implementare il calcolo sistematico del margine di contribuzione", "Monitorare mensilmente il rapporto debiti/patrimonio netto"], tempistiche: ['Entro 30 giorni', 'Immediato'] };
      return { text: "La tua azienda non ha consapevolezza dei propri equilibri economico-finanziari. In particolare, risulta avere un rapporto fra debiti verso terzi e capitale proprio troppo alto e non calcola regolarmente il margine di contribuzione. Il futuro della tua azienda è FORTEMENTE A RISCHIO. Questa situazione costituisce un grave indizio di crisi ai sensi dell'art. 3 del D.Lgs. 14/2019.", voto: 'Scarso', raccomandazioni: ["URGENTE: Calcolare immediatamente il margine di contribuzione attuale", "Effettuare un'analisi completa della posizione debitoria", "Predisporre un piano di riduzione dell'indebitamento"], tempistiche: ['Entro 7 giorni', 'Entro 15 giorni', 'Entro 30 giorni'] };
    };

    const getAreaFormazione = () => {
      const f = answers[21]?.value;
      if (f === 'high') return { text: "La tua azienda fornisce una formazione adeguata ai suoi collaboratori (oltre il 5% delle ore retribuite). Questo la rende capace di governare e gestire a proprio favore i cambiamenti degli ambienti esterni: socio-politico, mercato, concorrenza e tecnologia.", voto: 'Ottimo', raccomandazioni: [], tempistiche: [] };
      if (f === 'medium') return { text: "La formazione ai collaboratori è presente ma insufficiente (tra 3% e 5% delle ore retribuite). È necessario incrementare l'investimento formativo per mantenere competitiva l'azienda.", voto: 'Insufficiente', raccomandazioni: ["Incrementare le ore di formazione al 5% delle ore retribuite", "Valutare l'utilizzo di FORMAZIONE FINANZIATA tramite i Fondi Interprofessionali (Fondimpresa, For.Te, Fondirigenti, etc.)"], tempistiche: ['Entro 90 giorni', 'Entro 30 giorni'] };
      return { text: "La tua azienda non forma adeguatamente i collaboratori in forza (meno del 3% delle ore retribuite). Questa mancanza la espone ad una duplice incapacità: la prima è quella di non riuscire a governare e gestire a proprio favore i cambiamenti degli ambienti esterni. La seconda è quella di non migliorare i processi e questo inevitabilmente farà peggiorare il valore percepito dai clienti.", voto: 'Scarso', raccomandazioni: ["URGENTE: Predisporre immediatamente un piano formativo aziendale", "Portare il livello di ore di formazione almeno al 5% del totale delle ore retribuite", "IMPORTANTE: Verificare l'accesso alla FORMAZIONE FINANZIATA tramite i Fondi Interprofessionali (Fondimpresa, For.Te, Fondirigenti, Fondo Artigianato Formazione, etc.) che permettono di finanziare gran parte o la totalità dei costi formativi"], tempistiche: ['Entro 15 giorni', 'Entro 6 mesi', 'Entro 30 giorni'] };
    };

    const getAreaInnovazione = () => {
      const i = answers[22]?.value;
      if (i === 'high') return { text: "Il fatturato della tua azienda generato da nuovi prodotti/servizi introdotti negli ultimi 2 anni è adeguato (oltre il 20%) ed è segno di adeguata capacità d'innovazione.", voto: 'Ottimo', raccomandazioni: [], tempistiche: [] };
      return { text: "Il fatturato della tua azienda generato da nuovi prodotti/servizi introdotti negli ultimi 2 anni è troppo basso (meno del 20%) ed è segno di scarsa capacità d'innovazione. Molto presto i vecchi prodotti che sostengono il fatturato diventeranno decadenti e l'azienda subirà inevitabilmente un crollo del fatturato.", voto: 'Scarso', raccomandazioni: ["Effettuare un'analisi del ciclo di vita dei prodotti/servizi attuali", "Implementare un processo di sviluppo nuovi prodotti/servizi"], tempistiche: ['Entro 30 giorni', 'Entro 60 giorni'] };
    };

    const getAreaClima = () => {
      const c = answers[23]?.value === 'yes';
      if (c) return { text: "La tua azienda misura il clima aziendale con regolarità (almeno due volte all'anno) ed è perfettamente a conoscenza di quanti suoi collaboratori sono in stato di stress, comfort o flow. Il clima aziendale è sicuramente una componente fondamentale per il risultato aziendale.", voto: 'Ottimo', raccomandazioni: [], tempistiche: [] };
      return { text: "La tua azienda non misura il clima aziendale né conosce quanti dei suoi collaboratori sono in stato di stress, comfort o flow. Il clima aziendale è sicuramente la componente più importante nel risultato aziendale. Non misurarlo e non conoscerlo significa esporre in modo gravissimo l'azienda a situazioni di crisi derivanti da inefficienze, turnover, scarsa produttività e conflitti interni.", voto: 'Scarso', raccomandazioni: ["Implementare un sistema di rilevazione del clima aziendale (almeno semestrale)", "Effettuare survey anonime ai collaboratori", "CONSIGLIO: Valutare l'implementazione di un PIANO WELFARE AZIENDALE che migliori il benessere dei collaboratori e al contempo offra vantaggi fiscali all'azienda"], tempistiche: ['Entro 30 giorni', 'Entro 45 giorni', 'Entro 90 giorni'] };
    };

    const getAreaSoddisfazione = () => {
      const s = answers[24]?.value;
      if (s === 'yes') return { text: "La tua azienda misura la soddisfazione dei clienti ed è perfettamente a conoscenza delle loro opinioni e dei loro consigli. Conoscere ed ascoltare il cliente è uno degli elementi fondamentali per creare miglioramento ed evoluzione all'interno dell'azienda.", voto: 'Ottimo', raccomandazioni: [], tempistiche: [] };
      if (s === 'partial') return { text: "La tua azienda rileva solo parzialmente la soddisfazione dei clienti. È necessario sistematizzare questa attività per avere un quadro completo delle esigenze e delle opinioni della clientela.", voto: 'Insufficiente', raccomandazioni: ["Implementare un sistema strutturato di rilevazione della customer satisfaction"], tempistiche: ['Entro 45 giorni'] };
      return { text: "La tua azienda non misura la soddisfazione dei clienti, non conosce le loro opinioni e non è protesa ad un ascolto attivo circa i loro consigli. L'azienda nell'immediato futuro rischia importanti cali di fatturato che potrebbero compromettere l'intero equilibrio aziendale.", voto: 'Scarso', raccomandazioni: ["URGENTE: Contattare i clienti principali per raccogliere feedback", "Implementare un sistema di rilevazione della customer satisfaction"], tempistiche: ['Entro 7 giorni', 'Entro 30 giorni'] };
    };

    const getAreaTracciamento = () => {
      const t = answers[25]?.value === 'yes'; const crm = answers[26]?.value === 'yes';
      if (t && crm) return { text: "La tua azienda dispone di strumenti e procedure adeguati per tracciare e storicizzare le attività svolte sui clienti e sui potenziali clienti. L'utilizzo di un CRM consente di conoscere gli usi e le abitudini di acquisto.", voto: 'Ottimo', raccomandazioni: [], tempistiche: [] };
      if (t || crm) return { text: "La tua azienda dispone solo parzialmente degli strumenti per il tracciamento della clientela. È necessario completare l'implementazione di un sistema CRM integrato.", voto: 'Insufficiente', raccomandazioni: ["Completare l'implementazione di un sistema CRM"], tempistiche: ['Entro 60 giorni'] };
      return { text: "La tua azienda è sprovvista di strumenti e procedure che indaghino gli usi e le abitudini di acquisto dei suoi clienti. Soprattutto non ha contezza di chi e quanti sono clienti fidelizzati, di chi e quanti non sono più clienti e di chi e quanti sono nuovi clienti.", voto: 'Scarso', raccomandazioni: ["Implementare un sistema CRM (Customer Relationship Management)", "Censire tutti i clienti attivi, persi e potenziali"], tempistiche: ['Entro 60 giorni', 'Entro 30 giorni'] };
    };

    const getAreaCompliance = () => {
      const sicurezza = answers[27]?.value; const privacy = answers[28]?.value; const cyber = answers[29]?.value; const dlgs231 = answers[30]?.value;
      const issues = [];
      if (sicurezza !== 'yes') issues.push({ name: 'D.Lgs. 81/2008 (Sicurezza sul Lavoro)', rec: "Mettersi in regola con il Testo Unico Sicurezza (DVR, formazione, RSPP)" });
      if (privacy !== 'yes') issues.push({ name: 'GDPR/Privacy', rec: "Adeguamento Privacy/GDPR (registro trattamenti, informative, DPO)" });
      if (cyber !== 'yes') issues.push({ name: 'Cybersecurity', rec: "Implementare misure di cybersecurity per prevenire data breach" });
      if (dlgs231 !== 'yes') issues.push({ name: 'D.Lgs. 231/2001', rec: "Valutare adozione Modello di Organizzazione e Gestione 231" });
      if (issues.length === 0) return { text: "L'azienda risulta in regola con le principali normative di compliance: D.Lgs. 81/2008 (Sicurezza), Privacy/GDPR, Cybersecurity e D.Lgs. 231/2001.", voto: 'Ottimo', raccomandazioni: [], tempistiche: [] };
      return { text: `L'azienda presenta criticità di compliance nelle seguenti aree: ${issues.map(i => i.name).join(', ')}. La non conformità a queste normative espone l'azienda e gli amministratori a significative sanzioni e responsabilità.`, voto: issues.length >= 3 ? 'Scarso' : 'Insufficiente', raccomandazioni: issues.map(i => i.rec), tempistiche: issues.map(() => 'Entro 30 giorni') };
    };

    const getGiudizioComplessivo = () => {
      const perc = percentages.total;
      const hasCrisis = hasCrisisSignals();
      if (hasCrisis) return { text: "ATTENZIONE: Indipendentemente dal punteggio degli assetti organizzativi, sono stati rilevati SEGNALI DI CRISI ai sensi dell'art. 3 comma 4 e/o art. 25-novies del D.Lgs. 14/2019. Potrebbe essere necessario valutare l'attivazione della composizione negoziata di cui all'art. 17 del Codice della Crisi.", responsabilita: "Gli amministratori hanno l'obbligo di attivarsi senza indugio per l'adozione e l'attuazione di uno degli strumenti previsti dall'ordinamento per il superamento della crisi e il recupero della continuità aziendale." };
      if (perc >= 80) return { text: "L'azienda è adeguata a rimanere sul mercato. I suoi assetti organizzativi amministrativi e contabili le consentono pienamente di poter prevenire ed intercettare potenziali indizi di crisi e la rendono pienamente capace di evolversi e di gestire gli inevitabili mutamenti degli ambienti esterni.", responsabilita: "Gli amministratori non incorrono in conseguenze civili e penali. Ai sensi del sesto comma dell'art. 2476 c.c. essi non rispondono dei danni causati alla società in quanto l'hanno opportunamente protetta dotandola di adeguati assetti amministrativi e contabili." };
      if (perc >= 60) return { text: "L'azienda presenta assetti complessivamente adeguati con alcune aree di miglioramento. È necessario intervenire sulle criticità identificate per garantire la piena conformità agli obblighi di legge.", responsabilita: "Gli amministratori hanno operato sostanzialmente in modo corretto ma dovrebbero intervenire sulle aree critiche per ridurre ulteriormente il rischio di responsabilità." };
      if (perc >= 40) return { text: "L'azienda presenta significative inadeguatezze negli assetti organizzativi, amministrativi e contabili. È necessario un intervento strutturale per adeguarsi agli obblighi di legge e ridurre i rischi per la continuità aziendale.", responsabilita: "Gli amministratori potrebbero incorrere in responsabilità civili ai sensi dell'art. 2476 sesto comma. Si raccomanda l'immediata adozione delle misure correttive indicate." };
      return { text: "L'azienda è completamente inadeguata a rimanere sul mercato. I suoi assetti organizzativi amministrativi e contabili non solo non le consentono di poter prevenire ed intercettare potenziali indizi di crisi ma la rendono incapace di evolversi e di gestire gli inevitabili mutamenti degli ambienti esterni. L'Azienda ha un fortissimo rischio di chiusura entro il prossimo quinquennio.", responsabilita: "Gli amministratori stanno incorrendo in serissime conseguenze civili e penali. Ai sensi del sesto comma dell'art. 2476 c.c. essi rispondono dei danni causati alla società in quanto non l'hanno opportunamente protetta dotandola di adeguati assetti amministrativi e contabili e sono pienamente e gravemente esposti all'accusa di Bancarotta Fraudolenta in caso di Fallimento dell'Azienda." };
    };

    const giudizio = getGiudizioComplessivo();

    return (
      <div className="space-y-6 text-sm leading-relaxed print:text-xs">
        <div className="print:hidden flex justify-end gap-2 mb-4">
          <button 
            onClick={handleSavePDF} 
            className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            <Printer className="w-4 h-4" />Salva PDF
          </button>
          <button onClick={() => setViewMode('base')} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Torna al Report Base
          </button>
        </div>

        <div ref={reportRef}>

        {/* COPERTINA */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white p-8 rounded-lg text-center print:break-after-page">
          <div className="text-8xl font-bold mb-4">2086</div>
          <p className="text-lg mb-2">VERIFICA OSSERVANZA OBBLIGO DI LEGGE</p>
          <p className="text-lg mb-4">DELL'ART. 2086 SECONDO COMMA CODICE CIVILE</p>
          <div className="bg-white/20 rounded-lg p-4 mt-6">
            <p className="text-2xl font-bold">REPORT</p>
            <p className="text-sm mt-2">VERIFICA ESISTENZA ADEGUATI ASSETTI</p>
            <p className="text-sm">ORGANIZZATIVI E CONTABILI</p>
          </div>
          <div className="mt-8">
            <p className="text-xl">SOCIETÀ:</p>
            <p className="text-2xl font-bold">{companyData.name}</p>
            {companyData.sede && <p className="text-sm mt-2">{companyData.sede}</p>}
            {companyData.piva && <p className="text-sm">P.IVA: {companyData.piva}</p>}
          </div>
          <p className="mt-8 text-sm">Data: {oggi}</p>
        </div>

        {/* ALERT CRISI */}
        {triggeredCrisis.length > 0 && (
          <div className="bg-red-100 border-4 border-red-600 rounded-lg p-6 print:break-after-page">
            <div className="flex items-center gap-3 mb-4">
              <AlertOctagon className="w-10 h-10 text-red-600" />
              <h2 className="text-2xl font-bold text-red-800">⚠️ SEGNALI DI CRISI RILEVATI</h2>
            </div>
            <p className="text-red-800 mb-3">Sono stati rilevati <strong>{triggeredCrisis.length} segnali di crisi</strong>:</p>
            <div className="space-y-2">
              {triggeredCrisis.map(c => (
                <div key={c.id} className="bg-red-50 border-l-4 border-red-500 p-2">
                  <p className="font-bold text-red-800 text-xs">{c.subcategory.toUpperCase()}</p>
                  <p className="text-gray-700 text-xs">{c.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-yellow-100 border border-yellow-400 rounded p-3">
              <p className="font-bold text-yellow-800">Potrebbe essere necessario valutare l'attivazione della composizione negoziata (art. 17 D.Lgs. 14/2019).</p>
            </div>
          </div>
        )}

        {/* SOMMARIO */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">SOMMARIO</h2>
          <div className="space-y-2 text-sm columns-2">
            <p>PREMESSA</p>
            <p>TITOLO I - Il quadro di riferimento normativo</p>
            <p className="ml-4">• Giurisprudenza</p>
            <p className="ml-4">• Segnali di crisi</p>
            <p>TITOLO II - Organizzazione dei lavori</p>
            <p className="ml-4">• Prospettiva dell'Organizzazione</p>
            <p className="ml-4">• Prospettiva dei Processi</p>
            <p className="ml-4">• Prospettiva dell'Amministrazione</p>
            <p className="ml-4">• Prospettiva Formazione/Innovazione/Clima</p>
            <p className="ml-4">• Prospettiva dei Clienti</p>
            <p className="ml-4">• Prospettiva Compliance</p>
            <p>TITOLO III - Risultati della misurazione</p>
            <p>GIUDIZIO COMPLESSIVO</p>
          </div>
        </div>

        {/* PREMESSA */}
        <div className="border-l-4 border-blue-600 pl-4 print:break-before-page">
          <h2 className="text-xl font-bold text-blue-800 mb-4">PREMESSA</h2>
          <p className="text-gray-700 text-justify">
            Considerando l'introduzione dei nuovi obblighi in capo ad imprenditori ed amministratori, 
            introdotti il 16 Marzo 2019 dal D.lgs. 14/2019 art. 3 e dal nuovo art. 2086 secondo comma, 
            e le ingenti conseguenze civili e penali in capo ai soggetti interessati, che non si siano 
            nel frattempo adoperati a dotare l'azienda di un <em>"assetto organizzativo, amministrativo 
            e contabile adeguato alla natura e alle dimensioni dell'impresa, anche in funzione della 
            rilevazione tempestiva delle crisi dell'impresa e della perdita della continuità aziendale"</em>; 
            si redige e formula il presente parere rispetto alla misurazione qualitativa e giuridica 
            circa l'adeguatezza dell'assetto organizzativo amministrativo e contabile della 
            <strong> {companyData.name}</strong>
            {companyData.sede && <>, sedente in {companyData.sede}</>}
            {companyData.piva && <>, con Partita IVA {companyData.piva}</>}
            , di seguito nominata "Azienda".
          </p>
        </div>

        {/* TITOLO I - QUADRO NORMATIVO */}
        <div className="print:break-before-page">
          <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-200 pb-2 mb-4">TITOLO I - IL QUADRO DI RIFERIMENTO</h2>
          <h3 className="font-bold text-gray-800 mb-3">Normativa, Giurisprudenza e dottrina rispetto ai nuovi obblighi di cui all'Art. 3 del D.lgs. 14/2019 e all'art. 2086 secondo comma.</h3>
          
          <div className="space-y-4 text-gray-700 text-justify">
            <p>L'art. 3 e l'art 375 del Codice della Crisi d'Impresa e dell'Insolvenza, hanno modificato l'art. 2086 c.c. e hanno introdotto l'obbligo di <strong>adeguamento degli assetti organizzativi</strong> con il fine di favorire una <strong>precoce emersione dei fattori di criticità</strong> ed una tempestiva risposta organizzativa. L'obiettivo del Legislatore è stato quello di promuovere interventi di <em>upstream rescue</em> facendo emergere azioni di contrasto già nella fase di incubazione quando minore è l'erosione del valore ed il livello di libertà strategica è ancora ampio.</p>
            
            <p>L'organizzazione svolge, quindi, una funzione centrale nel regolare i flussi informativi e nel garantire direzionalità all'impresa. Comprendere il funzionamento e le regole comportamentali interne, riveste estrema rilevanza per il conseguimento degli obiettivi aziendali, oltre a garantire una più efficace gestione del sistema dei rischi. L'introduzione dell'obbligo degli adeguati assetti, e quindi la necessità di implementare dei sistemi di controllo, è sempre più finalizzata a consentire una diagnosi precoce della crisi. Il processo che porta all'allerta, sugli indizi di crisi, vede coinvolti una moltitudine di attori aziendali.</p>

            <p>Il concetto di rischio è fisiologicamente legato all'attività d'impresa in quanto intimamente connesso alla vocazione ad intraprendere, e quindi a creare, nonché alla aleatorietà degli eventi riferiti al contesto, all'ambiente e al mercato nei quali l'impresa stessa opera. Tale connessione è alla base dell'obbligo generale disposto dall'art. 2086 c.c. di adottare adeguati assetti organizzativi; proprio perché ogni attività d'impresa comporta la sistematica assunzione di rischi è indispensabile gestire i rischi per evitare che mettano a repentaglio la continuità aziendale.</p>

            <p>L'intenzione del Legislatore è quella di spingere gli amministratori a gestire le aziende in maniera professionale ed adeguata con la finalità di prevenire gli indizi di crisi e preservare, quindi, l'equilibrio economico finanziario delle aziende impedendo il loro fallimento. Ecco che l'art. 2086 2° comma del c.c. e l'art. 3 del D.lgs. 14/2019 diventano gli emblemi del concetto dell'<strong>early warning</strong> (allerta precoce, come d'altronde è intitolato l'art. 3 stesso), attraverso il quale il Legislatore mira ad anticipare l'emersione della crisi perché solo così è tutelata la continuità aziendale e l'integrità economica sociale della Nazione.</p>

            <p>Ma per attuare questa disposizione è evidente che il solo controllo quantitativo non è più sufficiente, perché al bilancio poi, ed alla partita doppia prima, sfuggono quelle tematiche qualitative che molto spesso sono alla base delle inefficienze che sfociano nel tempo in crisi aziendali. La stessa lettera c) del terzo comma dell'art. 3 del D.lgs. 14/2019 specifica che si deve considerare adeguata quell'azienda che dispone delle informazioni per rispondere alla check list di cui al comma 2 dell'art. 13 del D.lgs. 14/2019.</p>

            <p>Di fatto, quello che gli economisti aziendali chiamano approccio <strong>"Forward Looking"</strong> diventa obbligatorio per legge per gli imprenditori, gli amministratori, i revisori e i sindaci. Tale approccio è stato più volte ribadito dal granitico orientamento Giurisprudenziale che si è venuto a formare dal 2019 ad oggi.</p>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
              <p className="font-semibold text-yellow-800">Si ricorda che il mancato rispetto dell'art. 2086 secondo comma c.c. e dell'art. 3 del D.lgs. 14/2019 fa scattare (dal 16 marzo 2019) l'art. 378 del D.lgs. 14/2019, che ha aggiunto un sesto comma all'art. 2476 c.c. che recita testualmente:</p>
              <p className="italic mt-2 text-yellow-900">"Gli amministratori rispondono verso i creditori sociali per l'inosservanza degli obblighi inerenti alla conservazione dell'integrità del patrimonio sociale...."</p>
            </div>

            <p>Gli strumenti di controllo QUANTITATIVI basati sui dati di bilancio (Z Score di Altman, Break Even Analysis, Budget, analisi per indici, etc.) sono in grado di identificare uno stato di crisi SOLO SE LA CRISI È GIÀ IN ESSERE E HA GIÀ PRODOTTO DEGLI EFFETTI ormai visibili nelle grandezze di bilancio. Il Bilancio contiene dati riferiti al passato e non ha di fatto nessuna possibilità di far interpretare il futuro.</p>

            <p>Le scienze aziendali internazionali identificano nella <strong>Balanced Scorecard (BSC)</strong>, proposta da R. Kaplan e D. Norton (1992, Harvard Business School), l'unico strumento con approccio forward looking e soprattutto il miglior <strong>Business Judgment Rule</strong> possibile, che sia validato scientificamente e quindi opponibile in Tribunale, che da solo riesce a configurare in azienda un adeguato assetto organizzativo amministrativo e contabile così come richiesto dall'impianto normativo dell'art. 3 e del 2086 secondo comma dalla Giurisprudenza e anche dalle linee guida del C.N.D.C.E.C.</p>
          </div>

          {/* SEGNALI DI CRISI */}
          <div className="mt-6 bg-red-50 border border-red-200 p-4 rounded-lg">
            <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2"><AlertOctagon className="w-5 h-5" />I SEGNALI DI CRISI (Art. 3 comma 4 e Art. 25-novies)</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <p>All'art. 3 comma 3 lett. b) del Codice della Crisi, si fa riferimento ad ulteriori indicatori di crisi, ovvero ai segnali di crisi di cui al comma 4 e all'art. 25-novies dello stesso Codice.</p>
              <p className="font-semibold">Costituiscono segnali per la previsione di una crisi:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>L'esistenza di debiti per <strong>retribuzioni</strong> scaduti da almeno 30 giorni pari a oltre la metà dell'ammontare complessivo mensile delle retribuzioni;</li>
                <li>L'esistenza di debiti verso <strong>fornitori</strong> scaduti da almeno 90 giorni di ammontare superiore a quello dei debiti non scaduti;</li>
                <li>L'esistenza di esposizioni nei confronti delle <strong>banche e altri intermediari finanziari</strong> scadute da più di 60 giorni o che abbiano superato da almeno 60 giorni il limite degli affidamenti, purché rappresentino almeno il 5% del totale delle esposizioni.</li>
              </ol>
              <p className="font-semibold mt-4">Indicatori verso i creditori pubblici qualificati (Art. 25-novies):</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>INPS:</strong> Ritardo oltre 90gg nel versamento contributi superiori al 30% di quelli dell'anno precedente e all'importo di €15.000 (con dipendenti) o €5.000 (senza dipendenti)</li>
                <li><strong>INAIL:</strong> Debito per premi assicurativi scaduto oltre 90gg superiore a €5.000</li>
                <li><strong>Agenzia delle Entrate (IVA):</strong> Debito IVA da liquidazione periodica superiore a €5.000 e al 10% del volume d'affari (sempre se superiore a €20.000)</li>
                <li><strong>Agenzia Entrate-Riscossione:</strong> Crediti affidati scaduti oltre 90gg superiori a €100.000 (ditte individuali), €200.000 (società di persone), €500.000 (altre società)</li>
              </ul>
            </div>
          </div>

          {/* GIURISPRUDENZA */}
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-3">GIURISPRUDENZA</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <p>Dal 16 marzo 2019, i Tribunali hanno emesso importanti pronunce sugli obblighi di adeguati assetti:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Ordinanza Corte di Cassazione nr. 2172 del 24 Gennaio 2023:</strong> La più importante di tutte. La Corte avalla la decisione della Corte di Appello di Venezia che aveva condannato due amministratori, fra l'altro assolti penalmente, al risarcimento dei danni alla Curatela fallimentare per "Mala gestio". Gli amministratori nel prendere le loro scelte non si erano basati su un adeguato Business Judgment Rule.</li>
                <li><strong>Ordinanza Corte di Cassazione nr. 20389 del 28 settembre 2020:</strong> Se l'azienda non è adeguata non può invocare nessuna causa di forza maggiore, poiché qualora lo fosse stata sarebbe stata in grado di prevenire le circostanze anomale.</li>
                <li><strong>Tribunale delle Imprese di Milano del 21 ottobre 2019:</strong> "Le condotte degli amministratori non in linea con i doveri gestori oggi predicati dall'art. 2086 secondo comma costituiscono una grave irregolarità nella gestione".</li>
                <li><strong>Tribunale delle Imprese di Roma del 8 aprile 2020:</strong> Prende posizione favorevole all'applicazione di Business Judgment Rule anche ai fini della non sindacabilità delle scelte operate dagli amministratori in merito alla definizione degli assetti organizzativi dell'impresa.</li>
                <li><strong>Sentenza 188 del gennaio 2021 Tribunale di Cagliari:</strong> La violazione dell'obbligo di predisporre adeguati assetti "è più grave quando la società non si trova in crisi" perché in tale momento essa dispone di risorse per predisporre con efficacia le misure organizzative.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* TITOLO II - METODOLOGIA */}
        <div className="print:break-before-page">
          <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-200 pb-2 mb-4">TITOLO II - ORGANIZZAZIONE DEI LAVORI E MODALITÀ D'INDAGINE</h2>
          
          <p className="text-gray-700 mb-4 text-justify">Passando ora alla misurazione dell'adeguatezza degli assetti amministrativi e contabili dell'azienda in questione, si premette che nell'effettuare le analisi e le misurazioni che seguiranno, ci si è attenuti alla normativa, alla giurisprudenza e alla prassi indicata dal C.N.D.C.E.C. sopra richiamate. Come prima cosa si è provveduto a dividere l'Azienda in sei prospettive, ognuna delle quali portatrici di particolari e diversi bisogni informativi rispetto alla capacità di segnalare immediatamente potenziali indizi di crisi:</p>

          {/* PROSPETTIVA 1 - ORGANIZZAZIONE */}
          <div className="mb-6 bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold text-blue-800 mb-3">1.1) PROSPETTIVA DELL'ORGANIZZAZIONE</h3>
            <p className="text-gray-700 text-sm text-justify mb-3">Il rischio è definito come insieme di effetti associati ad eventi futuri incerti che possono influenzare il raggiungimento degli obiettivi aziendali. L'impatto degli eventi può essere non solo negativo, ma anche positivo. Un sistema di governo d'impresa efficiente ed efficace ha i propri fondamenti in: un'idonea impostazione societario-legale per la gestione e la sorveglianza d'impresa; una cultura aziendale (che includa una cultura del rischio e del controllo) diffusa in tutta l'organizzazione; un sistema di gestione dei rischi e dei controlli interni che coinvolga tutti i livelli della struttura organizzativa.</p>
            <p className="text-sm font-medium text-blue-800">Key Performance Area (KPA):</p>
            <ul className="list-disc pl-5 text-sm mt-2 space-y-1">
              <li><strong>Preparazione del soggetto economico:</strong> livello di conoscenza rispetto alle tecniche di Management, agli elementi di economia aziendale e ai principi giuridici</li>
              <li><strong>Posizionamento strategico:</strong> livello di conoscenza del posizionamento strategico dell'azienda (SWOT, analisi di scenario, piano strategico)</li>
              <li><strong>Professionisti esterni:</strong> esistenza di un adeguato panel di consulenti esterni (commercialista con incontri trimestrali, legale, consulente strategico)</li>
            </ul>
          </div>

          {/* PROSPETTIVA 2 - PROCESSI */}
          <div className="mb-6 bg-purple-50 p-4 rounded-lg">
            <h3 className="font-bold text-purple-800 mb-3">1.2) PROSPETTIVA DEI PROCESSI</h3>
            <p className="text-gray-700 text-sm text-justify mb-3">Una Corporate Governance efficace dipende dalla capacità di coordinare effettivamente le numerose attività di controllo e l'insieme dei soggetti chiamati a vario titolo a contribuire alla tenuta di specifici ambiti del Sistema di Controllo. In caso di insufficiente coordinamento, la frammentazione delle iniziative espone l'impresa ad una ridotta efficacia dei controlli e ad una copertura incoerente dei rischi aziendali. Fra le prime domande che l'amministratore deve porsi nel progettare l'organizzazione, rientrano quelle relative agli scopi che intende perseguire con l'introduzione di un determinato tipo di struttura e quali siano i destinatari del progetto.</p>
            <p className="text-sm font-medium text-purple-800">Key Performance Area (KPA):</p>
            <ul className="list-disc pl-5 text-sm mt-2 space-y-1">
              <li><strong>Capacità di organizzazione e governo dei processi:</strong> organigramma, suddivisione compiti, deleghe decisionali</li>
              <li><strong>Copertura dei rischi interruzione attività:</strong> adeguatezza delle coperture assicurative</li>
              <li><strong>Adeguatezza economica dell'organigramma:</strong> proporzione corretta tra numero di collaboratori e margine di contribuzione</li>
            </ul>
          </div>

          {/* PROSPETTIVA 3 - AMMINISTRAZIONE */}
          <div className="mb-6 bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold text-green-800 mb-3">1.3) PROSPETTIVA DELL'AMMINISTRAZIONE</h3>
            <p className="text-gray-700 text-sm text-justify mb-3">Una governance efficace richiede non solo di esprimere un orientamento strategico, ma anche una capacità di controllare in modo coordinato che le attività aziendali si svolgano in attuazione alle linee d'indirizzo definite. Il termine governo deriva dal latino <em>gubernum</em> e cioè il "timone della nave" che consente non solo di individuare la rotta da seguire, ma anche di mantenerla. I controlli, oltre alla centralità nell'ambito del governo d'impresa, uniscono anche una rilevante finalità pubblica: favorire la fiducia degli operatori e contribuire ad agevolare un'adeguata informazione.</p>
            <p className="text-sm font-medium text-green-800">Key Performance Area (KPA):</p>
            <ul className="list-disc pl-5 text-sm mt-2 space-y-1">
              <li><strong>Tempestività di rilevamento e di analisi:</strong> utilizzo di KPI, bilanci periodici, sistemi ERP</li>
              <li><strong>Consapevolezza degli equilibri economico-finanziari:</strong> calcolo margine di contribuzione, rapporto debiti/patrimonio netto</li>
            </ul>
          </div>

          {/* PROSPETTIVA 4 - FORMAZIONE */}
          <div className="mb-6 bg-orange-50 p-4 rounded-lg">
            <h3 className="font-bold text-orange-800 mb-3">1.4) PROSPETTIVA DELLA FORMAZIONE, INNOVAZIONE E CLIMA AZIENDALE</h3>
            <p className="text-gray-700 text-sm text-justify mb-3">Nella moderna concezione d'impresa, le persone e le relazioni che si sviluppano tra di esse, assumono rilievo assoluto. Compito principale dell'organizzazione è quello di distribuire il sapere all'interno dell'azienda. Nelle PMI il sapere è collocato nei soggetti che compongono l'organizzazione molto più che nei processi che la caratterizzano. Il corretto funzionamento dell'organizzazione dipende sia da fattori materiali legati al disegno sia da elementi immateriali che contribuiscono a determinare il livello di partecipazione, il grado di identificazione e l'allineamento delle figure coinvolte con gli obiettivi aziendali.</p>
            <p className="text-sm font-medium text-orange-800">Key Performance Area (KPA):</p>
            <ul className="list-disc pl-5 text-sm mt-2 space-y-1">
              <li><strong>Formazione:</strong> ore di formazione rispetto alle ore retribuite (possibilità di formazione finanziata tramite Fondi Interprofessionali)</li>
              <li><strong>Innovazione:</strong> percentuale di fatturato da nuovi prodotti/servizi</li>
              <li><strong>Clima aziendale:</strong> rilevazione periodica del benessere dei collaboratori (opportunità di piano welfare aziendale)</li>
            </ul>
          </div>

          {/* PROSPETTIVA 5 - CLIENTI */}
          <div className="mb-6 bg-pink-50 p-4 rounded-lg">
            <h3 className="font-bold text-pink-800 mb-3">1.5) PROSPETTIVA DEI CLIENTI</h3>
            <p className="text-gray-700 text-sm text-justify mb-3">La prospettiva dei clienti analizza la capacità dell'azienda di conoscere, monitorare e soddisfare la propria clientela. L'ascolto attivo dei clienti è fondamentale per garantire l'evoluzione necessaria ad adeguare l'azione manageriale ai futuri mutamenti degli ambienti esterni.</p>
            <p className="text-sm font-medium text-pink-800">Key Performance Area (KPA):</p>
            <ul className="list-disc pl-5 text-sm mt-2 space-y-1">
              <li><strong>Soddisfazione dei clienti:</strong> rilevazione e analisi della customer satisfaction</li>
              <li><strong>Tracciamento clienti:</strong> utilizzo di CRM, conoscenza clienti nuovi/persi/fidelizzati</li>
            </ul>
          </div>

          {/* PROSPETTIVA 6 - COMPLIANCE */}
          <div className="mb-6 bg-indigo-50 p-4 rounded-lg">
            <h3 className="font-bold text-indigo-800 mb-3">1.6) PROSPETTIVA DELLA COMPLIANCE NORMATIVA</h3>
            <p className="text-gray-700 text-sm text-justify mb-3">La compliance normativa rappresenta un elemento fondamentale degli adeguati assetti organizzativi. La non conformità alle normative obbligatorie espone l'azienda e gli amministratori a sanzioni significative e può compromettere la continuità aziendale.</p>
            <p className="text-sm font-medium text-indigo-800">Key Performance Area (KPA):</p>
            <ul className="list-disc pl-5 text-sm mt-2 space-y-1">
              <li><strong>D.Lgs. 81/2008 (Sicurezza sul Lavoro):</strong> DVR, formazione, RSPP, sorveglianza sanitaria</li>
              <li><strong>Privacy/GDPR:</strong> registro trattamenti, informative, DPO</li>
              <li><strong>Cybersecurity:</strong> misure per prevenire data breach</li>
              <li><strong>D.Lgs. 231/2001:</strong> Modello di Organizzazione e Gestione</li>
            </ul>
          </div>

          <p className="text-gray-700 text-justify mt-4">I risultati dell'intervista hanno permesso di rilevare l'esistenza o meno, in Azienda, degli elementi che dovrebbero comporre un ADEGUATO ASSETTO ORGANIZZATIVO AMMINISTRATIVO E CONTABILE capace di intercettare gli indizi di crisi e mantenere la continuità aziendale. Inoltre, da questa attività, è stato possibile anche misurare il livello di efficienza ed affidabilità degli elementi rinvenuti permettendo di esprimere una precisa misurazione.</p>
        </div>

        {/* GRAFICO RADAR */}
        <div className="bg-white border-2 rounded-lg p-4 print:break-before-page print:break-inside-avoid flex flex-col items-center" style={{overflow: 'hidden'}}>
          <h3 className="text-lg font-bold text-center mb-4">ANALISI GRAFICA PER PROSPETTIVA</h3>
          <div style={{maxWidth: 260, width: '100%', margin: '0 auto', padding: 0}}>
            <RadarChart data={percentages} size={240} />
          </div>
          <div className="grid grid-cols-6 gap-2 mt-4 text-center text-xs w-full">
            {Object.entries(categoryConfig).map(([key, config]) => (
              <div key={key} className="p-2 rounded" style={{backgroundColor: `${config.color}20`}}>
                <div className="font-bold" style={{color: config.color}}>{percentages[key] || 0}%</div>
                <div className="text-gray-600 truncate">{config.name.split(',')[0].substring(0, 8)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* TITOLO III - RISULTATI */}
        <div className="print:break-before-page">
          <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-200 pb-2 mb-4">TITOLO III - RISULTATI DELLA MISURAZIONE</h2>
          <p className="text-gray-700 mb-4">Alla fine delle valutazioni si esprimono i seguenti giudizi:</p>

          {/* ORGANIZZAZIONE */}
          <div className="mb-8 border rounded-lg overflow-hidden">
            <div className="bg-blue-600 text-white p-3 flex justify-between items-center"><div className="flex items-center gap-2"><Building2 className="w-5 h-5" /><h3 className="font-bold">PROSPETTIVA DELL'ORGANIZZAZIONE</h3></div><span className="text-2xl font-bold">{percentages.organizzazione}%</span></div>
            <div className="p-4 space-y-4">
              {[{ title: 'Area della preparazione del soggetto economico', data: getAreaPreparazione() }, { title: 'Area del posizionamento strategico dell\'azienda', data: getAreaPosizionamento() }, { title: 'Area dei professionisti esterni', data: getAreaProfessionisti() }].map((area, idx) => (
                <div key={idx} className={idx < 2 ? 'border-b pb-4' : ''}>
                  <h4 className="font-bold text-gray-800 mb-2">{area.title}</h4>
                  <p className="text-gray-700 text-sm text-justify mb-2">{area.data.text}</p>
                  <p className="font-medium text-sm">Voto: <span className={getVoto(area.data.voto === 'Ottimo' ? 100 : area.data.voto === 'Buono' ? 70 : area.data.voto === 'Sufficiente' ? 50 : area.data.voto === 'Insufficiente' ? 30 : 10).color}>{area.data.voto}</span></p>
                </div>
              ))}
            </div>
          </div>

          {/* PROCESSI */}
          <div className="mb-8 border rounded-lg overflow-hidden">
            <div className="bg-purple-600 text-white p-3 flex justify-between items-center"><div className="flex items-center gap-2"><Users className="w-5 h-5" /><h3 className="font-bold">PROSPETTIVA DEI PROCESSI</h3></div><span className="text-2xl font-bold">{percentages.processi}%</span></div>
            <div className="p-4 space-y-4">
              {[{ title: 'Area dell\'organizzazione e governo dei processi', data: getAreaProcessi() }, { title: 'Area della copertura dei rischi', data: getAreaRischi() }, { title: 'Area dell\'adeguatezza economica dell\'organigramma', data: getAreaAdeguatezzaEconomica() }].map((area, idx) => (
                <div key={idx} className={idx < 2 ? 'border-b pb-4' : ''}>
                  <h4 className="font-bold text-gray-800 mb-2">{area.title}</h4>
                  <p className="text-gray-700 text-sm text-justify mb-2">{area.data.text}</p>
                  <p className="font-medium text-sm">Voto: <span className={getVoto(area.data.voto === 'Ottimo' ? 100 : area.data.voto === 'Buono' ? 70 : area.data.voto === 'Sufficiente' ? 50 : area.data.voto === 'Insufficiente' ? 30 : 10).color}>{area.data.voto}</span></p>
                </div>
              ))}
            </div>
          </div>

          {/* AMMINISTRAZIONE */}
          <div className="mb-8 border rounded-lg overflow-hidden">
            <div className="bg-green-600 text-white p-3 flex justify-between items-center"><div className="flex items-center gap-2"><Calculator className="w-5 h-5" /><h3 className="font-bold">PROSPETTIVA DELL'AMMINISTRAZIONE</h3></div><span className="text-2xl font-bold">{percentages.amministrazione}%</span></div>
            <div className="p-4 space-y-4">
              {[{ title: 'Area della tempestività di rilevamento e di analisi', data: getAreaTempestivita() }, { title: 'Area della consapevolezza degli equilibri economico-finanziari', data: getAreaEquilibri() }].map((area, idx) => (
                <div key={idx} className={idx < 1 ? 'border-b pb-4' : ''}>
                  <h4 className="font-bold text-gray-800 mb-2">{area.title}</h4>
                  <p className="text-gray-700 text-sm text-justify mb-2">{area.data.text}</p>
                  <p className="font-medium text-sm">Voto: <span className={getVoto(area.data.voto === 'Ottimo' ? 100 : area.data.voto === 'Buono' ? 70 : area.data.voto === 'Sufficiente' ? 50 : area.data.voto === 'Insufficiente' ? 30 : 10).color}>{area.data.voto}</span></p>
                </div>
              ))}
            </div>
          </div>

          {/* FORMAZIONE */}
          <div className="mb-8 border rounded-lg overflow-hidden">
            <div className="bg-orange-500 text-white p-3 flex justify-between items-center"><div className="flex items-center gap-2"><TrendingUp className="w-5 h-5" /><h3 className="font-bold">PROSPETTIVA FORMAZIONE, INNOVAZIONE E CLIMA</h3></div><span className="text-2xl font-bold">{percentages.formazione}%</span></div>
            <div className="p-4 space-y-4">
              {[{ title: 'Area della formazione', data: getAreaFormazione() }, { title: 'Area dell\'innovazione', data: getAreaInnovazione() }, { title: 'Area del clima aziendale', data: getAreaClima() }].map((area, idx) => (
                <div key={idx} className={idx < 2 ? 'border-b pb-4' : ''}>
                  <h4 className="font-bold text-gray-800 mb-2">{area.title}</h4>
                  <p className="text-gray-700 text-sm text-justify mb-2">{area.data.text}</p>
                  <p className="font-medium text-sm">Voto: <span className={getVoto(area.data.voto === 'Ottimo' ? 100 : area.data.voto === 'Buono' ? 70 : area.data.voto === 'Sufficiente' ? 50 : area.data.voto === 'Insufficiente' ? 30 : 10).color}>{area.data.voto}</span></p>
                </div>
              ))}
            </div>
          </div>

          {/* CLIENTI */}
          <div className="mb-8 border rounded-lg overflow-hidden">
            <div className="bg-pink-500 text-white p-3 flex justify-between items-center"><div className="flex items-center gap-2"><Heart className="w-5 h-5" /><h3 className="font-bold">PROSPETTIVA DEI CLIENTI</h3></div><span className="text-2xl font-bold">{percentages.clienti}%</span></div>
            <div className="p-4 space-y-4">
              {[{ title: 'Area della soddisfazione dei clienti', data: getAreaSoddisfazione() }, { title: 'Area del tracciamento clienti', data: getAreaTracciamento() }].map((area, idx) => (
                <div key={idx} className={idx < 1 ? 'border-b pb-4' : ''}>
                  <h4 className="font-bold text-gray-800 mb-2">{area.title}</h4>
                  <p className="text-gray-700 text-sm text-justify mb-2">{area.data.text}</p>
                  <p className="font-medium text-sm">Voto: <span className={getVoto(area.data.voto === 'Ottimo' ? 100 : area.data.voto === 'Buono' ? 70 : area.data.voto === 'Sufficiente' ? 50 : area.data.voto === 'Insufficiente' ? 30 : 10).color}>{area.data.voto}</span></p>
                </div>
              ))}
            </div>
          </div>

          {/* COMPLIANCE */}
          <div className="mb-8 border rounded-lg overflow-hidden">
            <div className="bg-indigo-600 text-white p-3 flex justify-between items-center"><div className="flex items-center gap-2"><Shield className="w-5 h-5" /><h3 className="font-bold">PROSPETTIVA COMPLIANCE NORMATIVA</h3></div><span className="text-2xl font-bold">{percentages.compliance}%</span></div>
            <div className="p-4">
              {(() => { const area = getAreaCompliance(); return (
                <div>
                  <p className="text-gray-700 text-sm text-justify mb-2">{area.text}</p>
                  <p className="font-medium text-sm">Voto: <span className={getVoto(area.voto === 'Ottimo' ? 100 : area.voto === 'Insufficiente' ? 30 : 10).color}>{area.voto}</span></p>
                </div>
              ); })()}
            </div>
          </div>
        </div>

        {/* GIUDIZIO COMPLESSIVO */}
        <div className={`border-4 rounded-lg p-6 print:break-before-page ${hasCrisisSignals() ? 'border-red-600 bg-red-50' : percentages.total < 40 ? 'border-red-500 bg-red-50' : percentages.total < 60 ? 'border-yellow-500 bg-yellow-50' : 'border-green-500 bg-green-50'}`}>
          <h2 className="text-2xl font-bold text-center mb-4">GIUDIZIO COMPLESSIVO</h2>
          <div className="text-center mb-6">
            <div className="text-6xl font-bold">{percentages.total}%</div>
            <div className={`text-3xl font-bold ${hasCrisisSignals() ? 'text-red-600' : getVoto(percentages.total).color}`}>{hasCrisisSignals() ? 'ATTENZIONE' : getVoto(percentages.total).voto}</div>
          </div>
          <div className="space-y-4">
            <p className="text-gray-800 text-justify">Tutto quanto sopra premesso si può affermare che il grado di adeguatezza complessivo degli assetti organizzativi amministrativi e contabili dell'Azienda risulta essere:</p>
            <div className={`p-4 rounded ${hasCrisisSignals() ? 'bg-red-100' : getVoto(percentages.total).bg}`}><p className={`font-bold ${hasCrisisSignals() ? 'text-red-700' : getVoto(percentages.total).color}`}>{giudizio.text}</p></div>
            <div className={`p-4 rounded border-2 ${hasCrisisSignals() || percentages.total < 40 ? 'border-red-300 bg-red-100' : percentages.total < 60 ? 'border-yellow-300 bg-yellow-100' : 'border-green-300 bg-green-100'}`}>
              <p className="font-semibold">Responsabilità degli Amministratori:</p>
              <p className="mt-2 text-sm">{giudizio.responsabilita}</p>
            </div>
            {(percentages.total < 60 || hasCrisisSignals()) && (
              <div className="bg-blue-100 border-2 border-blue-500 p-4 rounded">
                <p className="font-bold text-blue-800">Si consiglia l'immediata adozione, formalizzata con apposita delibera del Consiglio di Amministrazione, laddove presente, ovvero con determina dell'Amministratore Unico, di sistemi di governance e controllo di gestione basati sui principi della Balanced Scorecard di R. Kaplan e D. Norton.</p>
              </div>
            )}
          </div>
        </div>

        {/* PIANO DI MIGLIORAMENTO - BLOCCATO */}
        <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-gray-800 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Target className="w-6 h-6" /><h3 className="font-bold text-lg">PIANO DI MIGLIORAMENTO</h3></div>
              <Lock className="w-6 h-6 text-gray-400" />
            </div>
          </div>
          <div className="p-4 bg-gray-50">
            <div className="space-y-3 opacity-60">
              <div className="bg-red-100 p-3 rounded border-l-4 border-red-500"><span className="font-bold text-red-800">AZIONI URGENTI (7-15 giorni)</span><div className="mt-2 h-4 bg-gray-300 rounded w-3/4"></div></div>
              <div className="bg-orange-100 p-3 rounded border-l-4 border-orange-500"><span className="font-bold text-orange-800">AZIONI A BREVE TERMINE (15-45 giorni)</span><div className="mt-2 h-4 bg-gray-300 rounded w-2/3"></div></div>
              <div className="bg-blue-100 p-3 rounded border-l-4 border-blue-500"><span className="font-bold text-blue-800">AZIONI A MEDIO TERMINE (60+ giorni)</span><div className="mt-2 h-4 bg-gray-300 rounded w-4/5"></div></div>
            </div>
            <div className="mt-6 bg-purple-50 border-2 border-purple-300 rounded-lg p-4">
              <h4 className="font-bold text-purple-800 mb-2">🎯 Piano di Miglioramento Personalizzato</h4>
              <p className="text-sm text-purple-700 mb-3">Possiamo studiare per la tua azienda un <strong>Piano di Miglioramento ad hoc</strong> a seguito di una consulenza con i nostri esperti, che prevederà:</p>
              <ul className="text-sm text-purple-700 space-y-1 mb-4">
                <li>✓ <strong>Azioni Urgenti (7-15 giorni)</strong> - interventi immediati per le criticità più gravi</li>
                <li>✓ <strong>Azioni a Breve Termine (15-45 giorni)</strong> - consolidamento degli assetti</li>
                <li>✓ <strong>Azioni a Medio Termine (60+ giorni)</strong> - ottimizzazione e compliance completa</li>
              </ul>
              <p className="text-sm text-purple-800 font-medium">Questo Piano ti aiuterà ad essere in regola con gli adeguati assetti e a proteggere gli amministratori dalle responsabilità previste dall'art. 2476 sesto comma.</p>
            </div>
            <button onClick={() => setViewMode('piano')} className="w-full mt-4 bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2 print:hidden">
              <Calendar className="w-5 h-5" />Fissa un Appuntamento per il Piano di Miglioramento
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 border-t pt-4 mt-8">
          <p className="font-medium">{companyData.name}</p>
          <p>Report generato il {oggiEsteso}</p>
          <p className="text-xs mt-2">www.2086.it - Network Consulenti Aziendali d'Italia</p>
        </div>
        </div> {/* chiusura reportRef */}
      </div>
    );
  };

  // PIANO MIGLIORAMENTO PAGE
  const renderPianoMiglioramento = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-800 to-purple-600 text-white p-8 rounded-lg text-center">
        <Calendar className="w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-bold">Richiedi il Report Completo e il Piano di Miglioramento</h1>
        <p className="text-purple-200 mt-2">{companyData.name}</p>
      </div>

      {/* INFORMATIVA PRIVACY */}
      <div className="bg-green-50 border-2 border-green-500 rounded-lg p-5">
        <div className="flex items-start gap-3">
          <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-green-800 mb-2">Tutela della Privacy</h3>
            <p className="text-sm text-green-700 mb-2">
              In conformità al Regolamento UE 2016/679 (GDPR) e al D.Lgs. 196/2003, garantiamo che:
            </p>
            <ul className="text-sm text-green-700 space-y-1 list-disc list-inside">
              <li>I dati del questionario <strong>non verranno mai condivisi con terzi</strong></li>
              <li>Non verranno utilizzati per finalità di marketing o comunicazioni commerciali</li>
              <li>Saranno trattati nel rispetto della massima riservatezza professionale</li>
              <li>Verranno utilizzati esclusivamente per l'elaborazione del report richiesto</li>
            </ul>
          </div>
        </div>
      </div>

      {/* STEP 1: SCARICA RISPOSTE */}
      <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">1</div>
          <h3 className="font-bold text-blue-800 text-lg">Scarica il File con le Tue Risposte</h3>
        </div>
        <p className="text-sm text-blue-700 mb-4">
          Scarica il file TXT contenente tutte le domande e le risposte del questionario.
          Questo file sarà necessario per richiedere il report completo.
        </p>
        <button
          onClick={handleExportAnswers}
          className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          <FileText className="w-5 h-5" />
          Scarica Risposte (.txt)
        </button>
      </div>

      {/* STEP 2: PAGAMENTO */}
      <div className="bg-orange-50 border-2 border-orange-400 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">2</div>
          <h3 className="font-bold text-orange-800 text-lg">Effettua il Pagamento</h3>
        </div>
        <p className="text-sm text-orange-700 mb-4">
          Per ricevere il <strong>Report Peritale Completo</strong> con analisi dettagliata e giudizio professionale,
          effettua il pagamento tramite il link PayPal qui sotto.
        </p>
        <div className="bg-white p-4 rounded-lg border border-orange-300 mb-4">
          <p className="text-sm font-semibold text-orange-800 mb-2">Link di Pagamento PayPal:</p>
          <a
            href="https://www.paypal.com/paypalme/TUOACCOUNT"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline text-sm break-all"
          >
            https://www.paypal.com/paypalme/TUOACCOUNT
          </a>
          <p className="text-xs text-gray-600 mt-2">* Sostituire con il link PayPal effettivo</p>
        </div>
      </div>

      {/* STEP 3: INVIA EMAIL */}
      <div className="bg-purple-50 border-2 border-purple-400 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">3</div>
          <h3 className="font-bold text-purple-800 text-lg">Invia la Richiesta via Email</h3>
        </div>
        <p className="text-sm text-purple-700 mb-4">
          Una volta completato il pagamento, invia un'email con:
        </p>
        <ul className="text-sm text-purple-700 space-y-2 mb-4 list-disc list-inside">
          <li>Il <strong>file TXT</strong> scaricato al punto 1</li>
          <li>La <strong>ricevuta del pagamento</strong> PayPal</li>
          <li>I tuoi <strong>dati di contatto</strong> (nome, email, telefono)</li>
        </ul>
        <div className="bg-white p-4 rounded-lg border border-purple-300">
          <p className="text-sm font-semibold text-purple-800 mb-2">📧 Invia tutto a:</p>
          <a
            href="mailto:piero@pieropozzana.it?subject=Richiesta Report Completo - Adeguati Assetti 2086"
            className="text-blue-600 hover:text-blue-800 font-bold text-lg"
          >
            piero@pieropozzana.it
          </a>
          <p className="text-xs text-gray-600 mt-3">
            Riceverai il report completo entro 3-5 giorni lavorativi dall'invio della documentazione.
          </p>
        </div>
      </div>

      {/* PIANO MIGLIORAMENTO */}
      <div className="bg-gradient-to-br from-purple-100 to-purple-50 border-2 border-purple-300 rounded-lg p-6">
        <h2 className="font-bold text-purple-900 text-xl mb-4 flex items-center gap-2">
          <Target className="w-6 h-6" />
          Piano di Miglioramento Personalizzato
        </h2>
        <p className="text-purple-700 mb-4">
          Oltre al report completo, possiamo elaborare per te un <strong>Piano di Miglioramento su misura</strong>
          che include:
        </p>
        <ul className="space-y-3 mb-6">
          <li className="flex items-start gap-3 bg-red-100 p-3 rounded border-l-4 border-red-500">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <p className="font-bold text-red-800">Azioni Urgenti (7-15 giorni)</p>
              <p className="text-sm text-gray-700">Interventi immediati per le criticità più gravi</p>
            </div>
          </li>
          <li className="flex items-start gap-3 bg-orange-100 p-3 rounded border-l-4 border-orange-500">
            <Clock className="w-6 h-6 text-orange-600 flex-shrink-0" />
            <div>
              <p className="font-bold text-orange-800">Azioni a Breve Termine (15-45 giorni)</p>
              <p className="text-sm text-gray-700">Consolidamento degli assetti aziendali</p>
            </div>
          </li>
          <li className="flex items-start gap-3 bg-blue-100 p-3 rounded border-l-4 border-blue-500">
            <Target className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <p className="font-bold text-blue-800">Azioni a Medio Termine (60+ giorni)</p>
              <p className="text-sm text-gray-700">Compliance completa e ottimizzazione</p>
            </div>
          </li>
        </ul>
        <p className="text-sm text-purple-800 font-medium mb-4">
          Il piano ti aiuterà a essere in regola con gli adeguati assetti e a proteggere gli amministratori
          dalle responsabilità previste dall'art. 2476 sesto comma del Codice Civile.
        </p>
        <div className="bg-white p-4 rounded-lg border border-purple-300">
          <p className="font-bold text-purple-800 mb-2">📞 Per maggiori informazioni contatta:</p>
          <a
            href="mailto:piero@pieropozzana.it"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            piero@pieropozzana.it
          </a>
        </div>
      </div>

      <button
        onClick={() => setViewMode('base')}
        className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition font-semibold"
      >
        Torna al Report Base
      </button>
    </div>
  );

  // MAIN RENDER
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4 print:p-0 print:bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden print:shadow-none print:rounded-none">
          <div className="bg-gradient-to-r from-blue-800 to-blue-600 p-4 text-white print:hidden" onClick={handleLogoTap} style={{cursor: 'pointer', userSelect: 'none'}}>
            <h1 className="text-xl font-bold text-center">ADEGUATI ASSETTI AZIENDALI 2086</h1>
            <p className="text-center text-blue-100 text-sm">Art. 2086 c.c. - D.Lgs. 14/2019 - Compliance</p>
          </div>
          <div className="p-6 print:p-0">
            {!showResults ? (
              <>
                {currentStep === 0 ? renderIntro() : renderQuestions()}
                <div className="flex justify-between mt-6 pt-4 border-t">
                  <button onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))} disabled={currentStep === 0} className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"><ChevronLeft className="w-5 h-5" />Indietro</button>
                  {currentStep < totalSteps - 1 ? (
                    <button onClick={() => setCurrentStep(prev => prev + 1)} disabled={!canProceed()} className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">Avanti<ChevronRight className="w-5 h-5" /></button>
                  ) : (
                    <button onClick={() => setShowResults(true)} disabled={!canProceed()} className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50">Genera Report<CheckCircle className="w-5 h-5" /></button>
                  )}
                </div>
              </>
            ) : (
              viewMode === 'base' ? renderBaseResults() : viewMode === 'premium' ? renderPremiumReport() : renderPianoMiglioramento()
            )}
          </div>
        </div>
        <p className="text-center text-gray-500 text-xs mt-4 print:hidden">www.2086.it - Network Consulenti Aziendali d'Italia</p>
      </div>
      <style>{`
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          body {
            margin: 0;
            padding: 0;
          }

          .print\\:hidden {
            display: none !important;
          }

          /* Evita interruzioni dentro questi elementi */
          .mb-8,
          .border.rounded-lg {
            page-break-inside: avoid;
            break-inside: avoid;
          }

          /* Le intestazioni colorate non devono mai essere separate dal contenuto */
          .bg-blue-600,
          .bg-purple-600,
          .bg-green-600,
          .bg-orange-500,
          .bg-pink-500,
          .bg-indigo-600 {
            page-break-after: avoid;
            break-after: avoid;
          }

          /* Ogni sezione principale su nuova pagina */
          .print\\:break-before-page {
            page-break-before: always;
            break-before: page;
          }

          /* Margini delle pagine */
          @page {
            margin: 15mm;
            size: A4 portrait;
          }

          /* Evita orfani e vedove */
          p, h1, h2, h3, h4, h5, h6 {
            orphans: 3;
            widows: 3;
          }

          h1, h2, h3, h4, h5, h6 {
            page-break-after: avoid;
            break-after: avoid;
          }
        }
      `}</style>

      {/* POPUP MODALE PREMIUM */}
      {showPremiumPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowPremiumPopup(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white rounded-t-2xl">
              <h2 className="text-2xl font-bold mb-2">Report Peritale Completo</h2>
              <p className="text-blue-100">Come ottenere l'analisi dettagliata professionale</p>
            </div>

            <div className="p-6 space-y-6">
              {/* STEP 1 */}
              <div className="bg-orange-50 border-2 border-orange-400 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">1</div>
                  <h3 className="font-bold text-orange-900 text-lg">Effettua il Pagamento</h3>
                </div>
                <p className="text-sm text-orange-800 mb-3">
                  Pagamento di <strong className="text-xl">300€</strong> tramite PayPal
                </p>
                <div className="bg-white p-4 rounded-lg border border-orange-300 mb-3">
                  <p className="text-sm font-semibold text-orange-800 mb-2">Link PayPal:</p>
                  <a
                    href="https://www.paypal.com/paypalme/TUOACCOUNT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline text-sm break-all font-semibold"
                  >
                    https://www.paypal.com/paypalme/TUOACCOUNT
                  </a>
                </div>
                <p className="text-xs text-orange-700 font-medium">
                  ⚠️ Indica nella causale: <strong>"Report Adeguati Assetti - [Nome Cognome / Nome Impresa]"</strong>
                </p>
              </div>

              {/* STEP 2 */}
              <div className="bg-purple-50 border-2 border-purple-400 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">2</div>
                  <h3 className="font-bold text-purple-900 text-lg">Invia l'Email</h3>
                </div>
                <p className="text-sm text-purple-800 mb-3">
                  Manda un'email a:
                </p>
                <div className="bg-white p-4 rounded-lg border border-purple-300 mb-3">
                  <a
                    href="mailto:piero@pieropozzana.it?subject=Richiesta Report Completo - Adeguati Assetti 2086"
                    className="text-blue-600 hover:text-blue-800 font-bold text-lg"
                  >
                    📧 piero@pieropozzana.it
                  </a>
                </div>
                <p className="text-sm text-purple-800 mb-2 font-semibold">Allegando:</p>
                <ul className="text-sm text-purple-800 space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span><strong>Ricevuta del pagamento</strong> PayPal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <div className="flex-1">
                      <span><strong>File TXT</strong> con le tue risposte</span>
                      <button
                        onClick={handleExportAnswers}
                        className="mt-2 w-full bg-purple-600 text-white text-sm font-semibold py-2 px-3 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2"
                      >
                        <FileText className="w-4 h-4" />
                        Scarica File TXT Risposte
                      </button>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span><strong>Dati per la fattura</strong> (Ragione sociale, P.IVA, Indirizzo, Codice SDI o PEC)</span>
                  </li>
                </ul>
              </div>

              {/* STEP 3 */}
              <div className="bg-green-50 border-2 border-green-400 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">3</div>
                  <h3 className="font-bold text-green-900 text-lg">Ricevi il Report</h3>
                </div>
                <p className="text-sm text-green-800">
                  <strong>Entro 3 giorni lavorativi</strong> riceverai via email il Report Peritale Completo con:
                </p>
                <ul className="text-sm text-green-800 space-y-1 mt-2 list-disc list-inside">
                  <li>Analisi dettagliata per ogni prospettiva</li>
                  <li>Riferimenti normativi e giurisprudenziali</li>
                  <li>Giudizio professionale motivato</li>
                  <li>Indicazioni per la compliance</li>
                </ul>
              </div>

              {/* PRIVACY */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-800">
                    <strong>Privacy garantita:</strong> I tuoi dati non verranno mai condivisi con terzi e saranno trattati
                    nel rispetto del GDPR (Reg. UE 2016/679) esclusivamente per l'elaborazione del report.
                  </p>
                </div>
              </div>

              {/* PULSANTE CHIUDI */}
              <button
                onClick={() => setShowPremiumPopup(false)}
                className="w-full bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-700 transition"
              >
                Ho Capito
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
