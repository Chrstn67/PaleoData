import Brugess from '../../../../public/assets/images_doc/gisements/schistes_de_Brugess.jpg';
import Cabrieres from '../../../../public/assets/images_doc/gisements/Cabrieres.jpg';
import Cherves from '../../../../public/assets/images_doc/gisements/Cherves-de-Cognac.jpeg';
import Guimarota from '../../../../public/assets/images_doc/gisements/Guimarota.jpeg';
import Chengjiang from '../../../../public/assets/images_doc/gisements/Chengjiang.jpeg';
import Dinoplagne from '../../../../public/assets/images_doc/gisements/Dinoplagne.jpeg';

const gisementsData = [
  {
    notion: 'Schistes de Brugess',
    coordinates: [45.26682515344433, -77.69997258069543],
    explications:
      "En 1909, le paléontologue américain Charles Walcott met au jour un riche gisement de fossiles remarquablement bien conservés dans les schistes de Burgess, dans les Montagnes Rocheuses canadiennes. La préservation exceptionnelle des spécimens dans des sédiments à grains fins datant du Cambrien moyen (environ 520 millions d'années) permet l'étude détaillée de nombreuses formes à corps mou jusque-là insoupçonnées. Cette découverte révèle que les faunes du début du Paléozoïque étaient beaucoup plus diversifiées que ne le laissaient soupçonner les fréquents fossiles d'animaux à carapace ou à squelette. Elle démontre ainsi l'importance des gisements à conservation exceptionnelle pour notre connaissance de l'histoire de la vie.",
    illustration: [Brugess],
    alt: 'La carrière de Walcott dans les schistes de Burgess (Cambrien moyen), en Colombie-Britannique.',
  },
  {
    notion: 'Site de Cabrières',
    coordinates: [43.57530131658562, 3.3761822800079875],
    explications:
      "Sylvie et Eric Monceret, un couple de naturalistes amateurs qui sillonne la région depuis près de 30 ans, ont mis au jour le site de Cabrières, à l’ouest de Montpellier. <br /> Ce site concentre plus de 400 fossiles datant de 470 millions d'années et certains fossiles sont typiques des faunes antérieures du Cambrien. <br /> Il est l’un des gisements les plus riches et diversifiés du monde. Le site de Cabrières témoigne de l'environnement le plus proche du pôle Sud à cette époque jamais observé. Il s'agit d'un gisement les plus riches et diversifiés du monde pour la période ordovicienne (d'environ -485.4 à -443.4 millions d'années). <br /> On y retrouve des restes de tous les groupes d'invertébrés marins ainsi que beaucoup d'algues.",
    illustration: [Cabrieres],
    alt: 'Quelques-uns des fossiles mis au jour sur le site des Cabrières',
  },
  {
    notion: 'Gisement de Cherves-de-Cognac',
    coordinates: [45.76659448803703, -0.31601934397914505],
    explications:
      "Exploité pour le gypse depuis l'Antiquité, c'est seulement au milieu du XIXè siècle que Henri Coquand annoncera le premier la découverte de fossiles dans la carrière. Mais il faudra attendre les années 1980 pour que les amateurs et collectionneurs commenceront des fouilles plus poussées. <br /> Les restes trouvés sont principalement des requins, des poissons, des reptiles, et des amphibiens. Quelques mammifères ont également été trouvés. De plus, une dizaines de restes de dinosaures et de ptérosaures ont aussi été mis au jour. <br /> La découverte la plus significative est celle d'un Camarasauridae, car si la bête est bien connue en Amérique du nord, sa présence en Europe est confirmée par la découverte d'un fragment de vertèbre d'un jeune Camarasauridé provenant de cette carrière, déjà publiée 5 ans auparavant. <br /> Pratiquement tous les fossiles du site sont datés du Crétacé",
    illustration: [Cherves],
    alt: 'Gisement de Cherves-de-Cognac',
  },
  {
    notion: 'Mine de Guimarota',
    coordinates: [39.73369928863378, -8.801750238504063],
    explications:
      "Guimarota est une mine de charbon désaffectée qui contient un large éventail d'animaux et de plantes fossiles datant du kimméridgien, au Jurassique supérieur. Les spécialistes ont retrouvés des restes d'une majorité de mammifères. Mais des fossiles d'ambibiens, de dinosaures, de tortues, de crocodiliens et de petits lézards ont aussi été découverts. ",
    illustration: [Guimarota],
    alt: 'Mine de Guimarota',
  },
  {
    notion: 'Site de Chengjiang',
    coordinates: [24.63143453531368, 102.96871646929866],
    explications:
      "Le Site fossilifère de Chengjiang, situé dans la province du Yunnan en Chine, est un site paléontologique exceptionnel qui a permis de faire des découvertes majeures sur l'Explosion cambrienne, période de diversification rapide de la vie il y a environ 520 millions d'années. <br />Le site a été découvert en 1984 sur la colline de Maotianshan, lorsque des fossiles de la faune de Chengjiang ont été mis au jour pour la première fois.<br /><br /> Cette faune est l'une des plus anciennes connues, avec la préservation remarquable des parties molles et de nombreux détails anatomiques des organismes.<br /><br /> Parmi les fossiles découverts, on trouve une grande diversité d'espèces primitives d'arthropodes, de vers, de méduses et d'autres organismes marins, témoignant de l'explosion de la biodiversité à cette époque.<br /> Certains fossiles uniques, comme le prédateur Anomalocaris, ont été identifiés sur ce site.<br /> Le Site fossilifère de Chengjiang a été classé au Patrimoine mondial de l'UNESCO en 2012 en raison de son importance scientifique exceptionnelle pour comprendre l'Explosion cambrienne et l'évolution de la vie.<br /> Des mesures de protection et de gestion ont été mises en place pour préserver ce site paléontologique unique.",
    illustration: [Chengjiang],
    alt: 'Site de Chengjiang',
  },
  {
    notion: 'DinoPlagne',
    coordinates: [46.18943059465189, 5.712786986091006],
    explications:
      "Le site de DinoPlagne, situé à Plagne dans le département de l'Ain en France, abrite la plus longue piste d'empreintes de dinosaures sauropodes au monde. Ces empreintes géantes, datant d'environ 145 millions d'années, ont été découvertes fortuitement en 2009 par deux géologues amateurs, Marie-Hélène Marcaud et Patrice Landry. <br /><br /> Les fouilles menées par des scientifiques du CNRS et de l'Université de Lyon entre 2010 et 2012 ont permis de mettre au jour un site exceptionnel, avec des empreintes de sauropodes (herbivores) et de théropodes (carnivores) sur une superficie de 8,25 hectares. Certaines de ces empreintes mesurent plus d'1,5 mètre de diamètre, en faisant les plus grandes connues au monde",
    illustration: [Dinoplagne],
    alt: 'Empreintes de sauropodes de DinoPlagne',
  },
  // {
  //   notion: '',
  //   coordinates: [],
  //   explications:
  //     "",
  //   illustration: [],
  //   alt: '',
  // },
  // {
  //   notion: '',
  //   coordinates: [],
  //   explications:
  //     "",
  //   illustration: [],
  //   alt: '',
  // },
  // {
  //   notion: '',
  //   coordinates: [],
  //   explications:
  //     "",
  //   illustration: [],
  //   alt: '',
  // },
  // {
  //   notion: '',
  //   coordinates: [],
  //   explications:
  //     "",
  //   illustration: [],
  //   alt: '',
  // },
];

export default gisementsData;
