import './EtymoPage.scss';

function EtymoPage() {
  const etymologyData = [
    { root: 'deino-', meaning: 'terrible' },
    { root: 'bronto-', meaning: 'énorme' },
    { root: 'archeo-', meaning: 'ancien' },
    { root: '-suchus', meaning: 'crocodile' },
    { root: '-saurus', meaning: 'lézard' },
    { root: '-don', meaning: 'dent' },
    { root: '-pis', meaning: 'écaille' },
    { root: 'pter-', meaning: 'aile' },
    { root: '-tops', meaning: 'visage' },
    { root: '-dactyl', meaning: 'doigt' },
    { root: '-titan-', meaning: 'géant' },
    { root: '-raptor', meaning: 'voleur' },
    { root: '-mimus', meaning: 'imitateur' },
    { root: 'ornitho-', meaning: 'oiseau' },
    { root: '-ornis', meaning: 'oiseau' },
    { root: '-pleur-', meaning: 'côté' },
    { root: '-arthro-', meaning: 'articulé' },
    { root: '-avis', meaning: 'oiseau' },
    { root: '-cheirus', meaning: 'main' },
    { root: '-archus', meaning: 'maître' },
    { root: '-long', meaning: 'dragon' },
    { root: '-cera-', meaning: 'corne' },
    { root: '-caris', meaning: 'crevette' },
    { root: 'pro-', meaning: 'premier' },
    { root: 'micro-', meaning: 'petit' },
    { root: 'drepan-', meaning: 'faucille' },
    { root: '-pelta', meaning: 'bouclier' },
  ];

  etymologyData.sort((a, b) => a.root.replace('-', '').localeCompare(b.root.replace('-', '')));

  return (
    <section className="etymology-table">
      <table>
        <thead>
          <tr>
            <th>Racine</th>
            <th>Signification</th>
          </tr>
        </thead>
        <tbody>
          {etymologyData.map((item, index) => (
            <tr key={index}>
              <td>{item.root}</td>
              <td>{item.meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default EtymoPage;
