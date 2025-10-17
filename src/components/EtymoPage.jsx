import React from 'react';
import '../styles/EtymoPage.css';

function EtymoPage() {
  const etymologyData = [
    { root: 'deino-', meaning: 'terrible', origin: 'Grec ancien : δεινός (deinós)' },
    { root: 'bronto-', meaning: 'énorme', origin: 'Grec ancien : βροντή (brontḗ)' },
    { root: 'archeo-', meaning: 'ancien', origin: 'Grec ancien : αρχαῖος (archaîos)' },
    { root: '-suchus', meaning: 'crocodile', origin: 'Grec ancien : σοῦχος (soûkhos)' },
    { root: '-saurus', meaning: 'lézard', origin: 'Grec ancien : σαῦρος (saûros)' },
    { root: '-odon', meaning: 'dent', origin: 'Grec ancien : ὀδούς (odoús)' },
    { root: '-pis', meaning: 'écaille', origin: 'Grec ancien : πίσσα (píssa)' },
    { root: '-pter-', meaning: 'aile', origin: 'Grec ancien : πτερόν (pterón)' },
    { root: '-tops', meaning: 'visage', origin: 'Grec ancien : τόπος (tópos)' },
    { root: '-dactyl-', meaning: 'doigt', origin: 'Grec ancien : δάκτυλος (dáktylos)' },
    { root: '-titan-', meaning: 'géant', origin: 'Grec ancien : Τιτάν (Titán)' },
    { root: '-raptor', meaning: 'voleur', origin: 'Latin : raptor' },
    { root: '-mimus', meaning: 'imitateur', origin: 'Grec ancien : μῖμος (mîmos)' },
    { root: 'ornitho-', meaning: 'oiseau', origin: 'Grec ancien : ὄρνις (órnis)' },
    { root: '-ornis', meaning: 'oiseau', origin: 'Grec ancien : ὄρνις (órnis)' },
    { root: '-pleur-', meaning: 'côté', origin: 'Grec ancien : πλευρά (pleurá)' },
    { root: '-arthro-', meaning: 'articulé', origin: 'Grec ancien : ἄρθρον (árthron)' },
    { root: '-avis', meaning: 'oiseau', origin: 'Latin : avis' },
    { root: '-cheirus', meaning: 'main', origin: 'Grec ancien : χείρ (kheír)' },
    { root: '-archus', meaning: 'maître', origin: 'Grec ancien : ἄρχω (árkhō)' },
    { root: '-long', meaning: 'dragon', origin: 'Chinois : 龙 (lóng)' },
    { root: '-cera-', meaning: 'corne', origin: 'Grec ancien : κέρας (kéras)' },
    { root: '-caris', meaning: 'crevette', origin: 'Grec ancien : καρίς (karís)' },
    { root: 'pro-', meaning: 'premier', origin: 'Grec ancien : πρό (pró)' },
    { root: 'micro-', meaning: 'petit', origin: 'Grec ancien : μικρός (mikrós)' },
    { root: 'drepan-', meaning: 'faucille', origin: 'Grec ancien : δρέπανον (drépanon)' },
    { root: '-pelta', meaning: 'bouclier', origin: 'Grec ancien : πέλτη (péltē)' },
    { root: 'nano-', meaning: 'nain', origin: 'Grec ancien : νάνος (nános)' },
    { root: 'ovo-', meaning: 'œuf', origin: 'Latin : ōvum' },
    { root: 'plate-', meaning: 'large, plat', origin: 'Grec ancien : πλατύς (platús)' },
    { root: 'ichthyo-', meaning: 'poisson', origin: 'Grec ancien : ἰχθύς (ikhthús)' },
    { root: '-cephal-', meaning: 'tête', origin: 'Grec ancien : κεφαλή (kephalḗ)' },
    { root: 'hadro-', meaning: 'épais, robuste', origin: 'Grec ancien : ἁδρός (hadrós)' },
    { root: 'stego-', meaning: 'toit', origin: 'Grec ancien : στέγος (stégos)' },
    { root: 'ankylo-', meaning: 'rigide', origin: 'Grec ancien : ἀγκύλος (ankúlos)' },
    { root: '-therium', meaning: 'animal', origin: 'Grec ancien : θηρίον (thēríon)' },
    { root: 'pachy-', meaning: 'épais', origin: 'Grec ancien : παχύς (pakhús)' },
    { root: 'eo-', meaning: 'aube', origin: 'Grec ancien : ἠώς (ēṓs)' },
    { root: 'neo-', meaning: 'nouveau', origin: 'Grec ancien : νέος (néos)' },
    { root: '-onyx', meaning: 'griffe', origin: 'Grec ancien : ὄνυξ (ónux)' },
    { root: 'eu-', meaning: 'bien, vrai', origin: 'Grec ancien : εὖ (eû)' },
    { root: '-phag-', meaning: 'mangeur', origin: 'Grec ancien : φαγεῖν (phageîn)' },
    { root: 'parasauro-', meaning: 'proche du lézard', origin: 'Grec ancien : παρά (pará) et σαῦρος (saûros)' },
    { root: 'giganoto-', meaning: 'géant', origin: 'Grec ancien : γίγας (gígas)' },
    { root: 'spino-', meaning: 'épine', origin: 'Latin : spīna' },
  ];

  etymologyData.sort((a, b) => a.root.replace('-', '').localeCompare(b.root.replace('-', '')));

  return (
    <main className="etymo-page">
      <section className="grid-container">
        {etymologyData.map((item, index) => {
          const [language, word] = item.origin.split(': ');
          return (
            <section key={index} className="grid-item">
              <div className="root">{item.root}</div>
              <div className="meaning">{item.meaning}</div>
              <div className="origin">
                {language} :<br />
                {word}
              </div>
            </section>
          );
        })}
      </section>
    </main>
  );
}

export default EtymoPage;
