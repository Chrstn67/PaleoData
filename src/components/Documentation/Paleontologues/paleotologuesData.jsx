import Cuvier from '../../../../public/assets/images_doc/paleontologues/Georges_Cuvier.jpg';
import Schmerling from '../../../../public/assets/images_doc/paleontologues/Philippe-Charles_Schmerling.jpg';
import Anning from '../../../../public/assets/images_doc/paleontologues/Mary_Anning.jpg';
import DessalinesDOrbigny from '../../../../public/assets/images_doc/paleontologues/Alcide_Dessalines_dOrbigny.jpg';

import GourdanDeFromentel from '../../../../public/assets/images_doc/paleontologues/Edouard_Gourdan_de_Fromentel.jpg';
import TestotFerry from '../../../../public/assets/images_doc/paleontologues/Henry_Testot-Ferry.jpg';
import Marsh from '../../../../public/assets/images_doc/paleontologues/Othniel_Charles_Marsh.jpg';
import Nopcsa from '../../../../public/assets/images_doc/paleontologues/Franz_Nopcsa.jpeg';
import Walcott from '../../../../public/assets/images_doc/paleontologues/Charles_Walcott.jpg';
import Buckland from '../../../../public/assets/images_doc/paleontologues/William_Buckland.jpg';
import GideonMantell from '../../../../public/assets/images_doc/paleontologues/Gideon_Mantell.jpg';
import RichardOwen from '../../../../public/assets/images_doc/paleontologues/Richard_Owen.jpeg';
// import Walker from '../../../../public/assets/images_doc/paleontologues/Gideon_Mantell.jpg';

const paleontologuesData = [
  {
    notion: 'Georges Cuvier (1769-1832)',
    explications:
      "Georges Cuvier est le fondateur de la paléontologie des vertébrés. Il avait émis l'hypothèse que certains fossiles pouvaient appartenir à des espèces animales disparues et en particulier à des reptiles.",
    illustrations: [Cuvier],
    alt: 'Portrait de Georges Cuvier',
  },
  {
    notion: 'Philippe-Charles Schmerling (1790-1836)',
    explications:
      'Philippe-Charles Schmerling a découvert des espèces animales mammifères telles que Ursus leodiensis, Felis engiholiensis, Cattus minuta. En déterminant les pathologies dont avaient pu souffrir les animaux dont il a trouvé des restes osseux, Schmerling agit en précurseur de ce qui va devenir une science nouvelle au xxe siècle : la paléopathologie.',
    illustrations: [Schmerling],
    alt: 'Portrait de Philippe-Charles Schmerling',
  },
  {
    notion: 'Mary Anning (1799-1847)',
    explications:
      "Sa famille pauvre vendait des fossiles sur les marchés. Les fossiles proviennent des falaises proches de Lyme Regis, composées de roches sédimentaires déposées en milieu marin au début du Jurassique, il y a environ 200 millions d’années. So frère Joseph découvre le crâne d’un grand reptile, le reste du squelette étant trouvé par Mary l’année suivante. Étudié par des savants de l'époque, il s'est avéré qu'il s'agissait d'un reptile marin dont le nom donné est Ichthyosaurus. À la suite de cette découverte, Mary Anning acquiert une renommée certaine en tant que chercheuse de fossiles.",
    illustrations: [Anning],
    alt: 'Portrait de Mary Anning',
  },
  {
    notion: "Alcide Dessalines d'Orbigny (1802-1857)",
    explications:
      "Ce français a voyagé en Amérique du Sud et a exploré ses contrées durant 8 ans de 1826 à 1834. Il se lance alors dans l'étude des fossiles ; son activité dans ce domaine est immense, surtout dans la description et l'identification de milliers d'espèces. On lui doit la connaissance de certains groupes peu connus alors, tel celui des foraminifères (eucaryotes unicellulaires du début du Cambrien).",
    illustrations: [DessalinesDOrbigny],
    alt: "Portrait de Alcide Dessalines d'Orbigny",
  },
  {
    notion: 'Louis Édouard Gourdan de Fromentel (1824-1901)',
    explications:
      "Devenu médecin, Louis Édouard Gourdan de Fromentel se tourne vers la paléontologie et participe à l'écriture des livres 'Paléontologie Française'. ",
    illustrations: [GourdanDeFromentel],
    alt: 'Portrait de Louis Édouard Gourdan de Fromentel',
  },
  {
    notion: 'Henry Testot-Ferry (1826-1869)',
    explications:
      "Il est le découvreur du site paléopréhistorique de la Roche de Solutré, où il a découvert des restes de chevaux, rennes, renards, éléphants, loups et tigre des cavernes. Il a également retrouvé des outils fabriqués par l'homme.",
    illustrations: [TestotFerry],
    alt: 'Portrait de Henry Testot-Ferry',
  },
  {
    notion: 'Othniel Charles Marsh (1831-1899)',
    explications:
      "Othniel Charles Marsh est le paléontologue qui a découvert le premier ptérosaure fossile américain. Il découvre aussi les restes d’anciens chevaux. Il décrit aussi des oiseaux dentés du crétacé (comme Ichthyornis, Baptornis ou Hesperornis) et des reptiles volants, ainsi que de nombreux dinosaures du crétacé et du jurassique comme Apatosaurus, Brontosaurus et Allosaurus. Le nom d'Othnielia est donné à un petit dinosaure de la famille des Hypsilophodontidés.",
    illustrations: [Marsh],
    alt: 'Portrait de Othniel Charles Marsh',
  },
  {
    notion: 'Franz Nopcsa (1877-1933)',
    explications:
      "Il est le premier paléontologue à mettre en évidence des formes petites et rapides de dinosaures. Nopcsa identifie et nomme également cinq nouvelles espèces de dinosaures. <br /><br /> C'est aussi l'un des premiers scientifiques à avoir fait une étude paléo-écologique du bassin de Hațeg: Nopcsa compare cette faune avec celles de l'Amérique du Nord, et comprend avant l'heure que les continents étaient bien réunis à un moment de l'Histoire, avant de dériver.",
    illustrations: [Nopcsa],
    alt: 'Portrait de Franz Nopcsa',
  },
  {
    notion: 'Charles Doolittle Walcott (1850-1927)',
    explications:
      "Charles Doolittle Walcott devient célèbre pour sa découverte en 1909 de fossiles bien préservés dans les schistes de Burgess en Colombie-Britannique, au Canada. Dans ces schistes, de nombreux fossiles d'invertébrés sont découverts, bon nombre d'entre eux par Walcott lui-même. La plupart datent de la période du Cambrien (moyen), au début de l'ère Paléozoïque.",
    illustrations: [Walcott],
    alt: 'Photo-portrait de Charles Doolittle Walcott',
  },
  {
    notion: 'William Buckland (1784-1856)',
    explications:
      "William Buckland est connu pour être un chercheur excentrique : Il avait chez lui des centaines d'os et de cailloux et possédait de nombreux animaux vivants. Il déclarait aussi qu'il avait mangé de toutes sortes d'animaux et d'insectes, considérant que chacun avait ses valeurs gustatives hormis la taupe et la mouche à viande, qu'il considérait comme immondes. Il donnait même ses cours accompagné de son ours qu'il avait déguisé en professeur pour l'occasion.<br /><br /> Au-delà de sa personnalité, Buckland est aussi connu pour ses travaux. Il s'efforce principalement de corroborer les découvertes de la géologie avec les récits de la Genèse. Sa réputation se base sur ses publications, en particulier 'Reliquiæ diluvianæ, Relics of the Deluge', publié en 1823, où il complète ses observations de restes d'espèces éteintes découvertes dans les cavernes de Kirkdale dans le Yorkshire et expose ses convictions sur le parallèle avec l'histoire biblique du Déluge universel. <br /><br />Pendant les guerres napoléoniennes on apporte à Buckland une moitié de mâchoire dotée encore de quelques dents. <br /><br /> En 1824, Buckland surprend le monde en déclarant que cette mâchoire appartient à un reptile géant, auquel il donne le nom de Megalosaurus. Buckland venait, sans le savoir, de baptiser le premier animal à avoir été identifié comme étant un gigantesque lézard venu d'un passé reculé, un groupe d'animaux qui 18 ans plus tard, en 1842, allaient recevoir de Richard Owen le nom de « dinosaures » (Dinosauria).",
    illustrations: [Buckland],
    alt: 'Portrait de William Buckland',
  },
  {
    notion: 'Richard Owen (1804-1892)',
    explications:
      "Connu pour avoir étudié les invertébrés, les vertébrés et les mammifères, Owen a énormément écrit sur les vertébrés. <br /><br /> Son ouvrage 'Comparative Anatomy and Physiology of Vertebrates' est remarquable, approfondissant non seulement les formes existantes, mais aussi les restes de groupes éteints, suivant ainsi les traces de Cuvier en paléontologie des vertébrés. Il a étudié les dents en détail, publiant le livre illustré 'Odontography' en 1840-1845, et a découvert la structure d'une dent fossile appelée Labyrinthodont. De ses conclusions, Owen s'engage dans une polémique avec Gideon Mantell à propos d'une dent d'Iguanodon, au cours de laquelle Mantell parvient à démontrer son erreur. <br /><br /> Ses contributions couvrent également les poissons, où il a identifié une nouvelle famille, les dipneustes, et a établi une connexion entre les téléostéens et les ganoïdés. <br /><br /> En ce qui concerne les reptiles, il a publié des mémoires importants sur les squelettes fossiles, introduisant le terme 'dinosaures' pour décrire un groupe de reptiles terrestres du Mésozoïque, bien que déjà deux dinosaures aient été déjà découverts et décrits 18 ans auparavant. <br /><br /> Il a également identifié un groupe curieux, les Anomodontia, lié aux amphibiens et aux mammifères.<br /><br /> Ses travaux sur les oiseaux incluent des mémoires sur l'aptéryx, le moa, l'aptornis, le notornis, le dodo et le grand pingouin. Sa monographie sur Archéoptéryx en 1863, un oiseau denté, est également notable.",
    illustrations: [RichardOwen],
    alt: 'Portrait de Richard Owen',
  },
  {
    notion: 'Gideon Mantell (1790-1852)',
    explications:
      "C'est en 1820 que Mantell commence à découvir de très grands os, plus grands que ceux que découvrent Willian Buckland. <br /><br /> En 1822, il découvre plusieurs dents, dont il est possible que ce soit finalement sa femme, aussi paléontologue, qui ait fait cette découverte. <br /><br /> Mantell les montre à d'autres scientifiques qui les rejettent en les considérant comme provenant de poissons ou de mammifères et de couches stratigraphiques plus récentes que celle des autres fossiles de la forêt de Tilgate. <br /><br /> Georges Cuvier les identifie d'abord comme étant celles d'un rhinocéros, puis comme celles d'un 'nouveau reptile herbivore'. Mantell lui est convaincu qu'elles proviennent de strates géologique du Mésozoïque et finalement reconnaît qu'elles ressemblent à celles d'un iguane mais vingt fois plus grandes. À partir de cela, il estime la taille du propriétaire des dents à au moins 20 mètres de longueur. <br /><br /><br /><br /> Il essaye en vain de convaincre ses confrère que les fossiles datent du Mésozoïque en étudiant soigneusement les couches rocheuses d'où elles proviennent. Richard Owen, un des principaux détracteurs de Mantell, affirme que les dents proviennent d'un mammifère. <br /><br /> Des années plus tard, Mantell découvre suffisamment de fossiles pour montrer que les pattes avant de l'animal sont bien plus courtes que les pattes arrière, disqualifiant ainsi toute origine possible d'un mammifère. Il démontre aussi que les fossiles de vertébrés qu'Owen attribue à plusieurs animaux différents proviennent tous d'Iguanodons. <br /><br />Ainsi, en 1825, Mantell devient le deuxième paléontologue à identifier et nommer une espèce distincte de dinosaure. <br /><br />En 1832, il découvre un nouveau dinosaure : Hylaeosaurus. <br /><br /> Jusqu'à la fin de sa vie, Mantell découvrit et décrivit plusiers nouvelles espèces de dinosaures.",
    illustrations: [GideonMantell],
    alt: 'Portrait de Gideon Mantell',
  },
  {
    notion: 'Alick Donald Walker (1925-1999)',
    explications:
      "Il est le premier paléontologue à donner le nom d'Eustreptospondylus, squelette de dinosaure découvert en 1870. Ce dinosaure, autrefois confondu avec un Megalosaurus, a été correctement identifié en 1964.",
    // illustrations: './assets/images_doc/paleontologues/.jpg',
    // alt: 'Portrait de ',
  },
  // {
  //   notion: '',
  //   explications: '',
  //   illustrations: './assets/images_doc/paleontologues/.jpg',
  //   alt: 'Portrait de ',
  // },
  // {
  //   notion: '',
  //   explications: '',
  //   illustrations: './assets/images_doc/paleontologues/.jpg',
  //   alt: 'Portrait de ',
  // },
  // {
  //   notion: '',
  //   explications: '',
  //   illustrations: './assets/images_doc/paleontologues/.jpg',
  //   alt: 'Portrait de ',
  // },
  // {
  //   notion: '',
  //   explications: '',
  //   illustrations: './assets/images_doc/paleontologues/.jpg',
  //   alt: 'Portrait de ',
  // },
  // {
  //   notion: '',
  //   explications: '',
  //   illustrations: './assets/images_doc/paleontologues/.jpg',
  //   alt: 'Portrait de ',
  // },
  // {
  //   notion: '',
  //   explications: '',
  //   illustrations: './assets/images_doc/paleontologues/.jpg',
  //   alt: 'Portrait de ',
  // },
];

export default paleontologuesData;
