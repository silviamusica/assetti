# Adeguati Assetti Aziendali 2086

Applicazione React per la verifica degli adeguati assetti organizzativi, amministrativi e contabili ai sensi dell'Art. 2086 secondo comma del Codice Civile.

## Descrizione

Questo strumento permette di verificare l'adeguatezza degli assetti aziendali secondo il D.Lgs. 14/2019, includendo:

- ✅ Verifica assetti organizzativi
- ✅ Verifica assetti amministrativi  
- ✅ Verifica assetti contabili
- ⚠️ Rilevamento segnali di crisi
- 🛡️ Verifica compliance normativa (Sicurezza, Privacy, GDPR, Cybersecurity, D.Lgs. 231/2001)

## Funzionalità

### Report Base (Gratuito)
- Semaforo di rischio complessivo
- Punteggi per ogni prospettiva aziendale
- Radar chart di analisi
- Rilevamento segnali di crisi

### Report Peritale Completo
- Analisi dettagliata conforme agli standard professionali
- Riferimenti normativi e giurisprudenziali
- Giudizio professionale motivato
- Esportazione PDF

### Piano di Miglioramento (Servizio Premium)
- Azioni urgenti (7-15 giorni)
- Azioni a breve termine (15-45 giorni)
- Azioni a medio termine (60+ giorni)
- Modello delibera CdA/Amministratore Unico

## Setup e Installazione

### Prerequisiti
- Node.js (versione 18 o superiore)
- npm o yarn

### Installazione dipendenze

\`\`\`bash
npm install
\`\`\`

### Avvio in modalità sviluppo

\`\`\`bash
npm run dev
\`\`\`

L'applicazione sarà disponibile su http://localhost:3000

### Build per produzione

\`\`\`bash
npm run build
\`\`\`

I file buildati saranno nella cartella `dist/`

### Anteprima build

\`\`\`bash
npm run preview
\`\`\`

## Tecnologie Utilizzate

- **React 18** - Framework UI
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icone
- **React Hooks** - State management

## Struttura del Progetto

\`\`\`
2086/
├── src/
│   ├── components/
│   │   └── AssettiAziendali2086Final.jsx  # Componente principale
│   ├── App.jsx                             # App root
│   ├── main.jsx                            # Entry point
│   └── index.css                           # Stili globali
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
\`\`\`

## Funzionalità Speciali

### Shortcut da tastiera
- Premere **F-G-H** in sequenza per compilare automaticamente il questionario con dati demo

### Stampa/PDF
- Utilizzare Ctrl+P (Cmd+P su Mac) per esportare il report in PDF
- Il layout è ottimizzato per la stampa con supporto per interruzioni di pagina

## Prospettive Analizzate

1. **Organizzazione** (16 punti)
   - Preparazione del soggetto economico
   - Posizionamento strategico
   - Panel professionisti esterni

2. **Processi** (12 punti)
   - Organizzazione e governo processi
   - Copertura rischi
   - Adeguatezza economica organigramma

3. **Amministrazione** (12 punti)
   - Tempestività rilevamento
   - Equilibri economico-finanziari

4. **Formazione, Innovazione e Clima** (6 punti)
   - Formazione dipendenti
   - Innovazione prodotti/servizi
   - Clima aziendale

5. **Clienti** (6 punti)
   - Customer satisfaction
   - Tracciamento clienti (CRM)

6. **Compliance Normativa** (8 punti)
   - D.Lgs. 81/2008 (Sicurezza)
   - Privacy/GDPR
   - Cybersecurity
   - D.Lgs. 231/2001

## Segnali di Crisi Monitorati

L'app rileva automaticamente i segnali di crisi previsti dall'Art. 3 comma 4 e Art. 25-novies:

- Debiti per retribuzioni
- Debiti verso fornitori
- Esposizioni bancarie
- Debiti INPS
- Debiti INAIL  
- Debiti IVA
- Crediti Agenzia Entrate-Riscossione

## Licenza

Tutti i diritti riservati - Network Consulenti Aziendali d'Italia

## Contatti

- Website: www.2086.it
- Email: info@2086.it

---

**Nota Importante**: Questo strumento fornisce una valutazione indicativa. Per un parere professionale completo si consiglia di consultare un commercialista o consulente aziendale specializzato.
