const currentYear = new Date().getFullYear();

const timelineData = [
  {
    era: 'Paléozoïque',
    eraInfo:
      "Le Paléozoïque (du grec 'palaios' ancien et 'zôê' vie, signifiant 'Vie ancienne') est la première des trois divisions de l'éon 'Phanérozoïque' et est une ère géologique qui s'étend de −541 à −252,2 Ma, soit sur 288,8 Ma. Elle couvre 6 périodes (Cambrien, Ordovicien, Silurien, Dévonien, Carbonifère, Permien). \n \n Cette ère a longtemps été appelée 'Ère Primaire', ou 'Ère des Poissons' du fait d'une grande période de temps où la vie ne se développait que dans l'eau. \n Le Paléozoïque démarre peu après la fragmentation du supercontinent Rodinia en au moins huit masses continentales. Au cours de cette ère ces continents se rassemblent à nouveau pour former la Pangée. Au début de cette ère, les formes de vie se limitent à des bactéries, des algues, des éponges et une variété de formes encore mal connues apparues avant cette ère (durant l'Édicarien). \n \n La diversité et le nombre d'organismes explosent durant le Cambrien. On pense que les premiers organismes terrestres apparaissent durant le Paléozoïque mais ce phénomène reste mineur avant le Silurien et le Dévonien. Bien que des vertébrés primitifs soient présents dès le début de cette ère, les invertébrés restent dominants jusqu'au milieu du Paléozoïque. La population de poissons explose durant le Dévonien. \n \n Pendant la seconde moitié de cette ère et particulièrement au Carbonifère, de grandes forêts de plantes primitives forment ce qui deviendra des couches de charbon. À la fin du Paléozoïque, les premiers reptiles sophistiqués et les premières plantes modernes (conifères) se sont développés.",
    eraStart: -541,
    eraEnd: -252.17,
    periods: [
      {
        name: 'Cambrien',
        periodInfo:
          "Nous retrouvons des strates géologiques cambriennes partout dans le monde. Le Cambrien, qui s'étend de −541 ± 1,0 à −485,4 ± 1,9 millions d'années, est la première, et la plus ancienne, des six périodes géologiques du Paléozoïque. \n \n Le Cambrien a été introduit par Adam Sedgwick en 1835. Il dérive de Cambria, le nom latin du Pays de Galles, où de nombreux terrains de cette période sont visibles. \n \n Durant cette période, la vie s'y développe uniquement dans l'eau, bien que la terre ferme existe déjà depuis des millions d'années. Comme les plantes n'existent pas encore, le taux de dioxygène dans l'air n'est que de 12.5%, tandis que le taux de dioxyde de carbone avoisine les 4500 ppm, soit 16 fois plus qu'avant la Révolution Industrielle du XIXè siècle. La température moyenne est de 21°C et le niveau des mers est compris entre 30 et 90 mètres de plus qu'aujourd'hui.",
        periodStart: -541,
        periodEnd: -485.4,
        epochs: [
          {
            name: 'Terreneuvien',
            epochStart: -541,
            epochEnd: -521,
            epochInfo:
              "S'étendant sur 20 Ma, l'époque (ou série) du Terreneuvien est divisée en deux étages géologiques. Son nom remplace l'ancienne appellation 'Série 1', et vient du nom de l'Île de Terre-Neuve, au Canada, où a été défini le point stratotypique mondial de cette époque et de l'étage correspondant au Fortunien.",
            stage: [
              {
                name: 'Fortunien',
                stageStart: -541,
                stageEnd: -529,
                stageInfo:
                  "Le Fortunien est le premier étage de la première époque (ou série) du Cambrien. S'étendant sur 12 Ma, le Fortunien est défini par la présence de traces fossiles appelées Treptichnus pedum. Ces traces représentent les premiers comportements complexes d'animaux fouisseurs et marquent la base du Cambrien et du Phanérozoïque.",
              },
              {
                name: 'Étage 2',
                stageStart: -529,
                stageEnd: -521,
                stageInfo:
                  "L'Étage 2 est le second étage du Cambrien. Il n'a pas encore de nom spécifique. C'est durant ces 8 Ma que les premiers conodontes commencent à peupler les océans. On observe également l'apparition des premiers petits fossiles coquilliers et une diversification notable des métazoaires.",
              },
            ],
          },
          {
            name: 'Série 2',
            epochStart: -521,
            epochEnd: -509,
            epochInfo:
              "La série 2 ne porte pas encore de nom établi. Cette deuxième époque (ou série) du Cambrien s'étend sur 12 Ma. C'est au début de cette époque que nous aurions pu y trouver les premiers trilobites. La vie marine connaît une diversification rapide avec l'apparition des premiers arthropodes complexes et une augmentation significative de la biominéralisation.",
            stage: [
              {
                name: 'Étage 3',
                stageStart: -521,
                stageEnd: -514,
                stageInfo:
                  "Durant 6 Ma, la vie dans les océans commence à exister. Les premières espèces de trilobites apparaissent. Cet étage n'a pas encore de nom définitif, mais les géologues travaillant en Sibérie, où les strates de cet étage sont bien présentes, lui donnent le nom d'Adtabanien. On observe également les premiers récifs construits par des archéocyathes.",
              },
              {
                name: 'Étage 4',
                stageStart: -514,
                stageEnd: -509,
                stageInfo:
                  'Ce second étage de la Série 2 dure 6 Ma. De nouvelles espèces de trilobites vivent dans les océans du Cambrien. La faune de Burgess Shale commence à apparaître, avec une extraordinaire diversification des organismes à corps mous. Les premiers prédateurs de taille notable font leur apparition.',
              },
            ],
          },
          {
            name: 'Miaolingien',
            epochStart: -509,
            epochEnd: -497,
            epochInfo:
              "Autrefois appelé 'Acadien', puis 'Série 3' ou 'Cambrien moyen', le Miaolingien est la troisième période du Cambrien. Elle se distingue par l'existence de nouvelles espèces de trilobites. Son nom vient des montagnes de Miaoling situées en Chine où ont été retrouvées des traces de cette époque et des trois étages la composant. Le climat est généralement chaud avec des mers épicontinentales étendues.",
            stage: [
              {
                name: 'Wuliuen',
                stageStart: -509,
                stageEnd: -504.5,
                stageInfo:
                  "Baptisé ainsi en 2018, le Wuliuen est le premier étage du Miaolingien. La 'pointe d'or' qui définit formellement la base de la période est enfoncée dans la section Wuliu-Zengjiayan de la formation de Kaili, près du village de Balang dans les montagnes de Miaoling, en Chine. On y observe une diversification des trilobites et l'apparition de nouveaux groupes d'arthropodes.",
              },
              {
                name: 'Drumien',
                stageStart: -504.5,
                stageEnd: -500.5,
                stageInfo:
                  "Le Drumien (d'une durée de 4 Ma) doit son nom aux Drum Mountains de l'Utah (États-Unis). Cette période est marquée par l'apogée des archéocyathes qui construisent des récifs étendus. Les trilobites atteignent une grande diversité et deviennent les prédateurs dominants des écosystèmes marins.",
              },
              {
                name: 'Guzhangien',
                stageStart: -500.5,
                stageEnd: -497,
                stageInfo:
                  "Le Guzhangien (3,5 Ma) tire son nom du village de Guzhang dans la province du Hunan en Chine. Cette période voit le déclin des archéocyathes et l'émergence de nouveaux types de récifs construits par des microbes et des éponges. Les premiers grands prédateurs, comme Anomalocaris, dominent les chaînes alimentaires marines.",
              },
            ],
          },
          {
            name: 'Furongien',
            epochStart: -497,
            epochEnd: -485.4,
            epochInfo:
              "Le Furongien (11,6 Ma) est la dernière série du Cambrien. Son nom signifie 'âge des lotus' en chinois, faisant référence à la province du Hunan connue comme 'le pays des lotus'. Cette période est marquée par plusieurs événements d'extinction mineurs et une stabilisation des écosystèmes marins. Les trilobites continuent de dominer mais voient leur diversité diminuer vers la fin de la période.",
            stage: [
              {
                name: 'Paibien',
                stageStart: -497,
                stageEnd: -494,
                stageInfo:
                  "Le Paibien (3 Ma) doit son nom à la ville de Paibi dans la province du Hunan, en Chine. Cet étage est caractérisé par l'apparition des trilobites de la famille des Agnostidae et une première extinction mineure qui affecte particulièrement les arthropodes. Les niveaux d'oxygène marin commencent à augmenter.",
              },
              {
                name: 'Jiangshanien',
                stageStart: -494,
                stageEnd: -489.5,
                stageInfo:
                  'Le Jiangshanien (4,5 Ma) tire son nom de la ville de Jiangshan dans la province du Zhejiang, en Chine. Cette période est marquée par une glaciation mineure (appelée glaciation du Jiangshanian) qui cause une baisse du niveau des mers et affecte les écosystèmes marins. La diversité des petits fossiles coquilliers diminue notablement.',
              },
              {
                name: 'Étage 10',
                stageStart: -489.5,
                stageEnd: -485.4,
                stageInfo:
                  "Le dernier étage du Cambrien (4,1 Ma) n'a pas encore reçu de nom officiel. Il est marqué par une extinction significative qui affecte les trilobites, les conodontes et les brachiopodes. Cet événement, appelé extinction cambro-ordovicienne, prépare la transition vers l'Ordovicien et l'explosion de biodiversité qui le caractérisera.",
              },
            ],
          },
        ],
      },
      {
        name: 'Ordovicien',
        periodInfo:
          "S'étendant sur environ 42,0 ± 3,4 Ma, de - 485,4 ± 1,9 à - 443,4 ± 1,5, l'Ordovicien tient son nom des Ordovices, un peuple brittonique de l'actuel Pays de Galles. Il a fallu un moment aux scientifiques pour résoudre un problème de classification géologique entre le Cambrien, la période précédant l'Ordovicien, et le Silurien, période suivante.\n \n Le taux de dioxygène dans l'air est de 13.5%, tandis que le taux de dioxyde de carbone est d'environ 4200 ppm, soit 15 fois plus qu'avant la Révolution Industrielle du XIXè siècle. La température moyenne est de 16°C, soit plus froide que durant le Cambrien. Cette baisse de température permet une explosion de la biodiversité marine. Les scientifiques estiment que le nombre de genres et de familles d'êtres vivants a triplé voire quadruplé.\n \n La fin de l'Ordovicien est marquée par la première des cinq grandes extinctions massives de l'Histoire des temps géologiques, où près de 60 % des espèces marines ont disparu et peut-être 85 % du total des espèces (végétales et animales). Cette extinction de masse s'appelle 'l'extinction Ordovicien-Silurien.'",
        periodStart: -485.4,
        periodEnd: -443.8,
        epochs: [
          {
            name: 'Inférieur',
            epochStart: -485.4,
            epochEnd: -470,
            epochInfo:
              "L'Ordovicien inférieur (15,4 Ma) marque le début de la Grande Biodiversification Ordovicienne. Les continents étaient principalement regroupés dans l'hémisphère sud, avec le supercontinent Gondwana couvrant la région du pôle Sud. Les niveaux marins étaient élevés, créant de vastes mers épicontinentales peu profondes qui favorisaient la diversification de la vie marine.",
            stage: [
              {
                name: 'Trémadocien',
                stageStart: -485.4,
                stageEnd: -477.7,
                stageInfo:
                  "Le Trémadocien (7,7 Ma) doit son nom à la ville de Tremadog au Pays de Galles. Cette période voit la radiation adaptive des graptolites, des conodontes et des brachiopodes. Les récifs, principalement construits par des microbes et des éponges, recommencent à se développer après l'extinction de la fin du Cambrien.",
              },
              {
                name: 'Floien',
                stageStart: -477.7,
                stageEnd: -470,
                stageInfo:
                  "Le Floien (7,7 Ma) tire son nom de Flo, une localité suédoise. Cette période est caractérisée par une diversification rapide des organismes planctoniques comme les graptolites et les chitinozoaires. Les premiers vertébrés à mâchoires (poissons) font leur apparition, ainsi que les principaux groupes d'échinodermes.",
              },
            ],
          },
          {
            name: 'Moyen',
            epochStart: -470,
            epochEnd: -458.4,
            epochInfo:
              "L'Ordovicien moyen (11,6 Ma) représente l'apogée de la biodiversification ordovicienne. Le climat était généralement chaud et stable, avec des températures globales plus élevées qu'aujourd'hui. Les niveaux de CO2 atmosphérique étaient très élevés (environ 4200 ppm). La formation de nouveaux niches écologiques dans les mers peu profondes permit une explosion de la vie marine sans précédent.",
            stage: [
              {
                name: 'Dapingien',
                stageStart: -470,
                stageEnd: -467.3,
                stageInfo:
                  'Le Dapingien (2,7 Ma) doit son nom au village de Daping dans la province du Hubei, en Chine. Cette période est marquée par la diversification des nautiloïdes (mollusques céphalopodes) qui deviennent les prédateurs dominants. Les récifs construits par des stromatoporoides et des tabulés commencent à se développer.',
              },
              {
                name: 'Darriwilien',
                stageStart: -467.3,
                stageEnd: -458.4,
                stageInfo:
                  "Le Darriwilien (8,9 Ma) tire son nom de Darriwil, une localité en Australie. Cette période voit l'apparition des premiers coraux rugueux et l'expansion des communautés récifales. La biodiversité marine atteint son maximum avec une grande variété de trilobites, brachiopodes, bryozoaires et échinodermes.",
              },
            ],
          },
          {
            name: 'Supérieur',
            epochStart: -458.4,
            epochEnd: -443.8,
            epochInfo:
              "L'Ordovicien supérieur (14,6 Ma) est marqué par des chang climatiques dramatiques. Une glaciation majeure se développe sur le Gondwana, entraînant une chute significative du niveau des mers. Ces changements environnementaux culminent avec l'extinction de l'Ordovicien supérieur, l'une des cinq grandes extinctions massives de l'histoire de la Terre.",
            stage: [
              {
                name: 'Sandbien',
                stageStart: -458.4,
                stageEnd: -453,
                stageInfo:
                  'Le Sandbien (5,4 Ma) doit son nom à la région de Sandby en Suède. Le début de cette période est encore favorable à la vie marine, avec une biodiversité élevée. Cependant, vers la fin du Sandbien, les premiers signes de refroidissement global commencent à apparaître, annonçant la crise à venir.',
              },
              {
                name: 'Katien',
                stageStart: -453,
                stageEnd: -445.2,
                stageInfo:
                  "Le Katien (7,8 Ma) tire son nom de la localité de Katy en Russie. Cette période voit le développement maximum de la glaciation gondwanienne, entraînant une baisse importante du niveau marin qui détruit les habitats des plateformes continentales. De nombreux groupes d'organismes marins commencent à décliner.",
              },
              {
                name: 'Hirnantien',
                stageStart: -445.2,
                stageEnd: -443.8,
                stageInfo:
                  "L'Hirnantien (1,4 Ma) doit son nom à Cwm Hirnant au Pays de Galles. Cet étage bref mais crucial est marqué par l'extinction massive de l'Ordovicien supérieur. La glaciation atteint son maximum, le niveau des mers chute brutalement, et les températures globales diminuent considérablement. Environ 85% des espèces marines disparaissent, dont la majorité des brachiopodes, bryozoaires et trilobites.",
              },
            ],
          },
        ],
      },
      {
        name: 'Silurien',
        periodInfo:
          "Durant à peine 24.2 Ma, de -443.4 à -419.2 Ma, le Silurien a été nommé en 1835 d'après une tribu celtique : les Silures. \n \n Le taux de dioxygène dans l'air est de 14%, tandis que le taux de dioxyde de carbone est d'environ 4500 ppm, soit 16 fois plus qu'avant la Révolution Industrielle du XIXè siècle. La température moyenne est de 17°C. Le niveau des mers est 180 mètres plus élevé qu'aujourd'hui.\n \n La vie y est essentiellement marine, mais les premières plantes multicellulaires commencent à apparaître. Cela reste des organismes simples, se reproduisant à l'aide de spores. Les premiers arthropodes commencent à coloniser la Terre.\n \n Le supercontinent Gondwana se forme dans l'hémisphère Sud du globe.",
        periodStart: -443.8,
        periodEnd: -419.2,
        epochs: [
          {
            name: 'Llandovery',
            epochStart: -443.8,
            epochEnd: -433.4,
            epochInfo:
              "Le Llandovery (10,4 Ma) doit son nom à la ville de Llandovery au Pays de Galles. Cette époque marque le rétablissement de la vie après l'extinction de l'Ordovicien supérieur. Le climat se réchauffe, les calottes glaciaires fondent et le niveau des mers remonte. La biodiversité marine se reconstitue progressivement avec l'apparition de nouvelles espèces.",
            stage: [
              {
                name: 'Rhuddanien',
                stageStart: -443.8,
                stageEnd: -440.8,
                stageInfo:
                  "Le Rhuddanien (3 Ma) tire son nom de Cwmrhuddan au Pays de Galles. Cette période post-extinction voit la recolonisation des habitats marins par les survivants. Les graptolites, particulièrement affectés par l'extinction, connaissent une radiation évolutive rapide avec l'apparition de nouvelles formes.",
              },
              {
                name: 'Aéronien',
                stageStart: -440.8,
                stageEnd: -438.5,
                stageInfo:
                  "L'Aéronien (2,3 Ma) doit son nom de la rivière Aeron au Pays de Galles. La vie marine continue de se diversifier avec l'apparition de nouveaux genres de brachiopodes, trilobites et nautiloïdes. Les récifs coralliens commencent à se reformer, bien que moins développés qu'à l'Ordovicien.",
              },
              {
                name: 'Télychien',
                stageStart: -438.5,
                stageEnd: -433.4,
                stageInfo:
                  "Le Télychien (5,1 Ma) tire son nom de la localité de Telych au Pays de Galles. Cette période voit la consolidation de la récupération écologique après l'extinction. Les communautés marines deviennent plus complexes et structurées. Les premiers poissons à mâchoires (gnathostomes) commencent à se diversifier.",
              },
            ],
          },
          {
            name: 'Wenlock',
            epochStart: -433.4,
            epochEnd: -427.4,
            epochInfo:
              "Le Wenlock (6 Ma) doit son nom aux collines de Wenlock Edge en Angleterre. Cette époque est caractérisée par un climat généralement chaud et stable, avec des mers épicontinentales étendues. La biodiversité marine atteint des niveaux comparables à ceux de l'Ordovicien supérieur. Sur terre, les plantes vasculaires primitives continuent leur expansion.",
            stage: [
              {
                name: 'Sheinwoodien',
                stageStart: -433.4,
                stageEnd: -430.5,
                stageInfo:
                  'Le Sheinwoodien (2,9 Ma) tire son nom de la localité de Sheinwood en Angleterre. Cette période est marquée par le développement important des récifs construits par des stromatoporoides, des tabulés et des rugueux. Les euryptérides (scorpions de mer) deviennent des prédateurs importants dans les environnements marins peu profonds.',
              },
              {
                name: 'Homérien',
                stageStart: -430.5,
                stageEnd: -427.4,
                stageInfo:
                  "L'Homérien (3,1 Ma) doit son nom à la localité de Homer en Angleterre. Un événement anoxique océanique (appelé événement du Homérien) se produit, entraînant une extinction mineure qui affecte particulièrement les graptolites et les conodontes. Malgré cela, la vie marine reste globalement diversifiée et abondante.",
              },
            ],
          },
          {
            name: 'Ludlow',
            epochStart: -427.4,
            epochEnd: -423,
            epochInfo:
              'Le Ludlow (4,4 Ma) doit son nom à la ville de Ludlow en Angleterre. Cette époque voit une légère détérioration des conditions environnementales avec un refroidissement climatique modéré. Le niveau des mers commence à baisser, exposant de nouvelles zones côtières qui seront colonisées par les plantes terrestres primitives.',
            stage: [
              {
                name: 'Gorstien',
                stageStart: -427.4,
                stageEnd: -425.6,
                stageInfo:
                  "Le Gorstien (1,8 Ma) tire son nom de la localité de Gorsty dans le Shropshire, Angleterre. Cette période est caractérisée par la diversification des poissons à mâchoires et l'apparition des premiers vertébrés d'eau douce. Les arthropodes terrestres primitifs continuent leur expansion sur les continents.",
              },
              {
                name: 'Ludfordien',
                stageStart: -425.6,
                stageEnd: -423,
                stageInfo:
                  'Le Ludfordien (2,6 Ma) doit son nom de la localité de Ludford dans le Shropshire, Angleterre. Un événement anoxique (appelé événement du Lundgreni) affecte les océans, entraînant une extinction mineure parmi les graptolites. Sur terre, les premières plantes vasculaires développent des tissus conducteurs plus sophistiqués.',
              },
            ],
          },
          {
            name: 'Pridoli',
            epochStart: -423,
            epochEnd: -419.2,
            epochInfo:
              "Le Pridoli (3,8 Ma) doit son nom de la réserve naturelle de Požáry près de Prague, en République tchèque (Pridoli signifie 'brûlis' en tchèque). Cette dernière époque du Silurien est marquée par une stabilisation des conditions environnementales. La vie marine continue de prospérer tandis que les écosystèmes terrestres deviennent plus complexes avec l'apparition des premières forêts primitives.",
            stage: [
              {
                name: 'Pridolien',
                stageStart: -423,
                stageEnd: -419.2,
                stageInfo:
                  "Le Pridolien (3,8 Ma) est le seul étage de cette époque. Il est caractérisé par l'apparition des premiers poissons d'eau douce et le développement des arthropodes terrestres. Les plantes vasculaires évoluent vers des formes plus complexes avec des systèmes racinaires et des tissus conducteurs mieux développés. La transition vers le Dévonien s'annonce avec l'émergence de nouveaux écosystèmes terrestres.",
              },
            ],
          },
        ],
      },

      {
        name: 'Dévonien',
        periodInfo:
          "De −419 à −359 Ma, soit 60 Ma, le Dévonien a été nommé d'après le comté de Devon, en Angleterre. \n \n Le taux de dioxigène dans l'air est de 15%, tandis que le taux de dioxyde de carbone est d'environ 2200 ppm, soit 8 fois plus qu'avant la Révolution Industrielle du XIXè siècle. La température moyenne est de 20°C, mais il y eut des périodes où la température grimpait jusqu'à 30°C. Le niveau des mers est plus élevé qu'aujourd'hui. \n La vie y est majoritairement marine et ce sont les requins qui sont les principaux prédateurs. C'est durant le Dévonien que les premiers amphibiens sont apparus. \n Le Dévonien est aussi connu sous le nom d''âge à effet de serre' ou encore d''âge des fougères', la végétation (boisée comprise) prend de plus en plus de place sur la terre ferme. \n \n Au Dévonien supérieur (entre le Frasnien et le Famennien) a lieu la deuxième extinction massive, qui affecte jusqu'à 70 % des espèces vivantes. La cause de cette extinction reste inconnue.",
        periodStart: -419.2,
        periodEnd: -358.9,
        epochs: [
          {
            name: 'Inférieur',
            epochStart: -419.2,
            epochEnd: -393.3,
            epochInfo:
              'Le Dévonien inférieur (25,9 Ma) est marqué par la continuation des tendances évolutives du Silurien. Le climat est généralement chaud et humide, avec des niveaux de CO2 élevés créant un effet de serre important. Les continents commencent à se rapprocher pour former progressivement la Pangée. La vie marine est diversifiée, avec le développement important des récifs coralliens.',
            stage: [
              {
                name: 'Lochkovien',
                stageStart: -419.2,
                stageEnd: -410.8,
                stageInfo:
                  "Le Lochkovien (8,4 Ma) doit son nom au village de Lochkov près de Prague, République tchèque. Cette période voit l'apogée des récifs dévoniens construits par des stromatoporoides, des coraux et des algues calcaires. Les poissons à armure (placodermes) deviennent les prédateurs dominants des mers. Sur terre, les plantes vasculaires continuent leur diversification.",
              },
              {
                name: 'Praguien',
                stageStart: -410.8,
                stageEnd: -407.6,
                stageInfo:
                  "Le Praguien (3,2 Ma) tire son nom de la ville de Prague. Cette période est caractérisée par une diversification importante des poissons, avec l'apparition des premiers chondrichthyens (requins primitifs) et des actinoptérygiens (poissons à nageoires rayonnées). Les arthropodes terrestres se diversifient avec l'apparition des premiers arachnides et myriapodes.",
              },
              {
                name: 'Emsien',
                stageStart: -407.6,
                stageEnd: -393.3,
                stageInfo:
                  "L'Emsien (14,3 Ma) doit son nom de la rivière Ems en Allemagne. Cette longue période voit le développement des premières forêts primitives composées de plantes comme Archaeopteris. Les poissons continuent leur radiation évolutive, avec l'apparition des premiers sarcoptérygiens (poissons à nageoires charnues) qui mèneront aux tétrapodes. Les récifs atteignent leur extension maximale.",
              },
            ],
          },
          {
            name: 'Moyen',
            epochStart: -393.3,
            epochEnd: -382.7,
            epochInfo:
              "Le Dévonien moyen (10,6 Ma) est une période de transition. Le climat commence à se modifier avec une légère tendance au refroidissement. Les niveaux de CO2 atmosphérique diminuent progressivement. La vie marine continue de prospérer mais montre les premiers signes de stress qui annoncent la crise de la fin du Dévonien. Sur terre, les écosystèmes deviennent plus complexes avec l'apparition des premiers vertébrés terrestres.",
            stage: [
              {
                name: 'Eifélien',
                stageStart: -393.3,
                stageEnd: -387.7,
                stageInfo:
                  "L'Eifélien (5,6 Ma) doit son nom à la région de l'Eifel en Allemagne. Cette période est marquée par un événement anoxique (appelé événement de Kačák) qui cause une extinction mineure affectant particulièrement les coraux et les stromatoporoides. Les récifs déclinent significativement. Les premières forêts d'arbres apparaissent, avec des espèces atteignant plusieurs mètres de hauteur.",
              },
              {
                name: 'Givétien',
                stageStart: -387.7,
                stageEnd: -382.7,
                stageInfo:
                  "Le Givétien (5 Ma) tire son nom de la ville de Givet en France. Après la crise de l'Eifélien, la vie marine se rétablit partiellement. Les poissons atteignent une diversité maximale avec de nombreuses formes spécialisées. Les premiers tétrapodes (animaux à quatre pattes) font leur apparition dans les environnements d'eau douce et les zones côtières.",
              },
            ],
          },
          {
            name: 'Supérieur',
            epochStart: -382.7,
            epochEnd: -358.9,
            epochInfo:
              "Le Dévonien supérieur (23,8 Ma) est marqué par l'une des plus grandes extinctions massives de l'histoire de la Terre. Plusieurs pulses d'extinction, culminant avec l'événement de Hangenberg à la fin du Dévonien, éliminent environ 70% des espèces marines. Les causes probables incluent le refroidissement climatique, la baisse du niveau des mers, l'anoxie océanique et peut-être des impacts météoritiques.",
            stage: [
              {
                name: 'Frasnien',
                stageStart: -382.7,
                stageEnd: -372.2,
                stageInfo:
                  "Le Frasnien (10,5 Ma) doit son nom à la ville de Frasnes en Belgique. Le début de cette période est encore prospère avec une biodiversité marine élevée. Cependant, vers la fin du Frasnien, se produit l'événement de Kellwasser, une extinction massive qui élimine la plupart des récifs, les trilobites, les brachiopodes et les ammonites. Les causes incluent probablement l'anoxie des eaux profondes et le refroidissement climatique.",
              },
              {
                name: 'Famennien',
                stageStart: -372.2,
                stageEnd: -358.9,
                stageInfo:
                  "Le Famennien (13,3 Ma) tire son nom de la région de Famenne en Belgique. Après l'extinction du Frasnien, la vie marine se rétablit partiellement mais reste appauvrie. À la fin du Famennien, l'événement de Hangenberg cause une nouvelle extinction massive qui affecte particulièrement les vertébrés et les invertébrés marins. Sur terre, les plantes à graines font leur apparition et les premiers amniotes (reptiles) évoluent à partir des amphibiens.",
              },
            ],
          },
        ],
      },

      {
        name: 'Carbonifère',
        periodInfo:
          "Le Carbonifère s'étend de −358,9 ± 0,4 à −298,9 ± 0,2 Ma, soit sur une durée de 60 Ma ± 0.6 Ma. Cette période tient son nom des vastes couches de charbon qu'il a laissées en Europe de l'Ouest.\n \n Le taux de dioxigène dans l'air est de 25%, tandis que le taux de dioxyde de carbone est d'environ 450 ppm, soit 2 fois plus qu'avant la Révolution Industrielle du XIXè siècle. La température moyenne est de 15°C. Durant le seconde partie du Carbonifère, le climat se refroidit au point qu'une glaciation dans les latitudes hautes de l'hémisphère sud est couvert de glace. Quand au niveau des mers, il est identique au Dévonien.\n \n La vie sur terre s'y est considérablement développée. Les arbres à écorce composent les forêts. Un taux de dioxyde de carbone relativement élevé a indéniablement encouragé la croissance de la végétation, mais la présence d'un taux élevé de dioxygène a également rendu les forêts plus vulnérables aux incendies, ce qui formait du chabon en grande quantité.\n \n Certains animaux du Carbonifère sont géants, pour ce qu'il sont et comparé aux espèces d'aujourd'hui: Les insectes et arthropodes était de tailles démesurées et cela s'explique aussi par le taux élevé d'dioxygène dans l'air. De plus, ces animaux n'avaient pratiquement pas de prédateurs, et du fait de forêts luxuriantes, ils avaient une nourriture abondante. C'est également à cette période que les premiers animaux à quatre pattes ont été créés.\n \n Le charbon a arrêté de se former à la fin du Carbonifère à cause de l'appartion champignons xylophages capable de dégrader le bois dans intégralité. \n \n Le Carbonifère se termine par une extinction massive, la troisième, qui touche principalement la vie marine.",
        periodStart: -358.9,
        periodEnd: -298.9,
        epochs: [
          {
            name: 'Mississippien',
            epochStart: -358.9,
            epochEnd: -323.2,
            epochInfo:
              "Le Mississippien (35,7 Ma) correspond approximativement au Carbonifère inférieur. Son nom vient du système Mississippi en Amérique du Nord où les roches de cette période sont bien exposées. Le climat est généralement chaud et humide avec des niveaux de CO2 modérés et des niveaux d'O2 élevés. Les continents commencent à se rapprocher pour former la Pangée, créant de vastes bassins sédimentaires où se déposent les premiers dépôts charbonneux.",
            stage: [
              {
                name: 'Tournaisien',
                stageStart: -358.9,
                stageEnd: -346.7,
                stageInfo:
                  "Le Tournaisien (12,2 Ma) doit son nom à la ville de Tournai en Belgique. Cette période marque le rétablissement après l'extinction de la fin du Dévonien. Les forêts tropicales commencent à se développer, formant les premiers grands dépôts de charbon. Les coraux et les brachiopodes se diversifient à nouveau dans les mers. Les premiers reptiles font leur apparition.",
              },
              {
                name: 'Viséen',
                stageStart: -346.7,
                stageEnd: -330.9,
                stageInfo:
                  "Le Viséen (15,8 Ma) tire son nom de la ville de Visé en Belgique. Cette période voit l'apogée des forêts carbonifères avec des arbres géants comme les lépidodendrons et les sigillaires. Les insectes atteignent des tailles gigantesques, avec des libellules comme Meganeura ayant une envergure d'ailes de 70 cm. Les dépôts de charbon deviennent très importants.",
              },
              {
                name: 'Serpukhovien',
                stageStart: -330.9,
                stageEnd: -323.2,
                stageInfo:
                  "Le Serpukhovien (7,7 Ma) doit son nom de la ville de Serpukhov en Russie. Le climat commence à se refroidir légèrement, annonçant la glaciation qui caractérisera le Pennsylvanien. Les niveaux d'O2 atteignent des pics historiques (jusqu'à 35%). Les forêts continuent de prospérer mais montrent les premiers signes de changement dans leur composition.",
              },
            ],
          },
          {
            name: 'Pennsylvanien',
            epochStart: -323.2,
            epochEnd: -298.9,
            epochInfo:
              "Le Pennsylvanien (24,3 Ma) correspond approximativement au Carbonifère supérieur. Son nom vient de l'état de Pennsylvanie où les couches charbonneuses de cette période sont bien exposées. Cette époque est marquée par une glaciation majeure dans l'hémisphère sud (glaciation du Karoo) qui cause des fluctuations importantes du niveau des mers. Les cycles glaciaires-interglaciaires créent des conditions idéales pour la formation de couches de charbon successives.",
            stage: [
              {
                name: 'Bachkirien',
                stageStart: -323.2,
                stageEnd: -315.2,
                stageInfo:
                  "Le Bachkirien (8 Ma) tire son nom de la Bachkirie, une région de Russie. La glaciation du Gondwana s'intensifie, entraînant une baisse générale du niveau des mers. Les forêts de zones humides continuent de prospérer près de l'équateur, formant d'importants dépôts de charbon. Les amphibiens dominent les écosystèmes terrestres, tandis que les reptiles continuent leur diversification.",
              },
              {
                name: 'Moscovien',
                stageStart: -315.2,
                stageEnd: -307,
                stageInfo:
                  "Le Moscovien (8,2 Ma) doit son nom de la ville de Moscou. Cette période représente l'apogée de la formation du charbon avec des dépôts exceptionnels en Europe et en Amérique du Nord. Les insectes géants atteignent leur taille maximale. Les premiers reptiles amniotes se diversifient, permettant une colonisation plus complète des environnements terrestres.",
              },
              {
                name: 'Kasimovien',
                stageStart: -307,
                stageEnd: -303.7,
                stageInfo:
                  "Le Kasimovien (3,3 Ma) tire son nom de la ville de Kasimov en Russie. Le climat continue de se refroidir et les calottes glaciaires gondwaniennes s'étendent. Les forêts tropicales commencent à décliner en raison de l'assèchement du climat. La composition des communautés végétales change avec l'apparition de formes plus adaptées à des conditions plus sèches.",
              },
              {
                name: 'Gzhélien',
                stageStart: -303.7,
                stageEnd: -298.9,
                stageInfo:
                  "Le Gzhélien (4,8 Ma) doit son nom de la ville de Gzhel en Russie. La fin du Carbonifère est marquée par un refroidissement accentué et une aridification croissante. L'événement d'extinction du Carbonifère terminal élimine de nombreuses espèces marines, particulièrement les foraminifères et les coraux. Sur terre, les forêts humides tropicales déclinent fortement, mettant fin à la principale période de formation du charbon.",
              },
            ],
          },
        ],
      },

      {
        name: 'Permien',
        periodInfo:
          "Le Permien est la sixième et dernière période du Paléozoïque. Elle s'étend de −298,9 ± 0,2 à −252,2 ± 0,5 Ma, soit 46,7 Ma. Son nom vient de l'ancien royaume de Perm, en Russie. \n \n Le taux de dioxygène dans l'air est de 23%, tandis que le taux de dioxyde de carbone est d'environ 900 ppm, soit 3 fois plus qu'avant la Révolution Industrielle du XIXè siècle. La température moyenne est de 16°C. Le niveau des mers est plus bas qu'aujourd'hui, car l'eau est stockée dans les calottes glaciaires. \n \n Le Permien est marqué par la formation de la Pangée, un supercontinent qui regroupe la quasi-totalité des terres émergées. Ce regroupement a des conséquences climatiques importantes : le climat est très sec à l'intérieur des terres, avec de vastes déserts, tandis que les côtes connaissent une saison des moussons. \n \n La vie marine est riche et diversifiée, avec de nombreux invertébrés et poissons. Sur terre, les reptiles deviennent dominants, avec l'apparition des premiers reptiles mammaliens (thérapsides) qui sont les ancêtres des mammifères. La végétation est principalement composée de fougères, de prêles et de conifères primitifs. \n \n La fin du Permien est marquée par la plus grande extinction massive de l'histoire de la Terre, l'extinction Permien-Trias, où environ 95 % des espèces marines et 70 % des espèces terrestres disparaissent. Les causes probables incluent des éruptions volcaniques massives en Sibérie (les trapps de Sibérie), qui ont libéré d'énormes quantités de CO2 et de méthane, provoquant un réchauffement climatique brutal, une acidification des océans et une anoxie généralisée.",
        periodStart: -298.9,
        periodEnd: -252.2,
        epochs: [
          {
            name: 'Cisuralien',
            epochStart: -298.9,
            epochEnd: -272.3,
            epochInfo:
              "Le Cisuralien (26,6 Ma) correspond au Permien inférieur. Son nom vient du latin 'cis-' (en deçà) et 'Ural' (montagnes Oural), signifiant 'en deçà des Oural'. Le climat est généralement froid et sec, avec des calottes glaciaires persistantes dans l'hémisphère sud. La Pangée est complètement formée, créant des conditions continentales extrêmes avec de vastes déserts à l'intérieur des terres.",
            stage: [
              {
                name: 'Assélien',
                stageStart: -298.9,
                stageEnd: -295.5,
                stageInfo:
                  "L'Assélien (3,4 Ma) tire son nom de la rivière Assel en Kazakhstan. Cette période est marquée par la continuation des conditions glaciaires de la fin du Carbonifère. Les calottes glaciaires gondwaniennes atteignent leur extension maximale. La vie marine se remet lentement de l'extinction de la fin du Carbonifère, avec une faible diversité mais une abondance relative.",
              },
              {
                name: 'Sakmarien',
                stageStart: -295.5,
                stageEnd: -290.1,
                stageInfo:
                  "Le Sakmarien (5,4 Ma) doit son nom de la rivière Sakmara en Russie. Les conditions glaciaires commencent à s'atténuer avec le retrait progressif des calottes glaciaires. Le niveau des mers remonte légèrement. Sur terre, les reptiles se diversifient rapidement, avec l'apparition des premiers thérapsides (reptiles mammaliens).",
              },
              {
                name: 'Artinskien',
                stageStart: -290.1,
                stageEnd: -283.5,
                stageInfo:
                  "L'Artinskien (6,6 Ma) tire son nom de la ville d'Artinsk en Russie. Le retrait des glaces s'accélère, permettant une remontée significative du niveau des mers. Le climat devient plus chaud et plus humide. La vie marine connaît une radiation évolutive avec la diversification des brachiopodes, ammonites et poissons. Les forêts de conifères se développent sur les continents.",
              },
              {
                name: 'Kungurien',
                stageStart: -283.5,
                stageEnd: -272.3,
                stageInfo:
                  "Le Kungurien (11,2 Ma) doit son nom de la ville de Kungur en Russie. Cette période voit la fin définitive des conditions glaciaires du Paléozoïque. Le climat devient progressivement plus chaud et plus sec. Les évaporites (dépôts salins) se forment dans les bassins continentaux arides. La diversification des thérapsides se poursuit, avec l'apparition de formes herbivores et carnivores.",
              },
            ],
          },
          {
            name: 'Guadalupien',
            epochStart: -272.3,
            epochEnd: -259.8,
            epochInfo:
              'Le Guadalupien (12,5 Ma) correspond au Permien moyen. Son nom vient des montagnes Guadalupe au Texas où les couches de cette période sont bien exposées. Le climat est généralement chaud et sec, avec des déserts étendus sur la Pangée. Les niveaux de CO2 augmentent progressivement. La vie marine et terrestre est diversifiée et abondante, atteignant un pic de biodiversité permienne.',
            stage: [
              {
                name: 'Roadien',
                stageStart: -272.3,
                stageEnd: -268.8,
                stageInfo:
                  'Le Roadien (3,5 Ma) tire son nom de la Route Ridge dans les montagnes Guadalupe, Texas. Les récifs spongio-algaires se développent dans les mers chaudes. Les ammonites et les brachiopodes connaissent une grande diversification. Sur terre, les thérapsides deviennent le groupe dominant, avec des formes de plus en plus spécialisées.',
              },
              {
                name: 'Wordien',
                stageStart: -268.8,
                stageEnd: -265.1,
                stageInfo:
                  "Le Wordien (3,7 Ma) doit son nom de la Word Formation dans les montagnes Guadalupe. Cette période représente l'apogée de la biodiversité permienne. Les récifs sont vastes et complexes. Les communautés terrestres sont dominées par les thérapsides et les reptiles pélycosauriens. La flore est composée principalement de conifères, de ginkgos et de fougères à graines.",
              },
              {
                name: 'Capitanien',
                stageStart: -265.1,
                stageEnd: -259.8,
                stageInfo:
                  'Le Capitanien (5,3 Ma) tire son nom du Capitan Reef dans les montagnes Guadalupe. Vers la fin de cette période, se produit une extinction massive (extinction du Capitanien) qui affecte particulièrement les organismes marins des récifs et les brachiopodes. Les causes incluent probablement des épisodes volcaniques majeurs et une anoxie océanique. Cet événement préfigure la grande extinction de la fin du Permien.',
              },
            ],
          },
          {
            name: 'Lopingien',
            epochStart: -259.8,
            epochEnd: -252.2,
            epochInfo:
              "Le Lopingien (7,6 Ma) correspond au Permien supérieur. Son nom vient de Leping, une localité dans la province du Jiangxi en Chine. Cette courte mais cruciale époque est marquée par la détérioration progressive des conditions environnementales qui culmine avec l'extinction Permien-Trias, la plus grande crise biologique de l'histoire de la Terre. Les températures augmentent, les conditions deviennent arides, et la composition atmosphérique change radicalement.",
            stage: [
              {
                name: 'Wuchiapingien',
                stageStart: -259.8,
                stageEnd: -254.14,
                stageInfo:
                  "Le Wuchiapingien (5,66 Ma) doit son nom de la localité de Wuchiaping dans la province du Hunan, Chine. Après l'extinction du Capitanien, la vie se rétabl partiellement mais reste fragile. Les communautés marines sont dominées by few resilient species. Sur terre, les thérapsides continuent de dominer mais montrent des signes de stress écologique. Les conditions environnementales se détériorent progressivement.",
              },
              {
                name: 'Changhsingien',
                stageStart: -254.14,
                stageEnd: -252.2,
                stageInfo:
                  "Le Changhsingien (1,94 Ma) tire son nom de la localité de Changxing dans la province du Zhejiang, Chine. Cette très courte période est marquée par l'extinction Permien-Trias. Les éruptions volcaniques massives des trapps de Sibérie libèrent d'énormes quantités de CO2, méthane et aerosols toxiques. Le réchauffement climatique brutal, l'anoxie océanique et l'acidification des eaux causent la disparition d'environ 95% des espèces marines et 70% des espèces terrestres. La vie frôle l'annihilation complète.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    era: 'Mésozoïque',
    eraInfo:
      "Le Mésozoïque (du grec 'mesos' moyen et 'zôê' vie, signifiant 'Vie moyenne') est la deuxième des trois divisions de l'éon 'Phanérozoïque' et est une ère géologique qui s'étend de −252,2 à −66,0 Ma, soit sur 186,2 Ma. Elle couvre 3 périodes (Trias, Jurassique, Crétacé). \n \n Cette ère a longtemps été appelée 'Ère Secondaire', ou 'Ère des Reptiles' du fait de la domination des dinosaures sur les continents, des ptérosaures dans les airs et des reptiles marins dans les océans. \n Le Mésozoïque commence après l'extinction massive du Permien-Trias et se termine avec l'extinction Crétacé-Paléogène qui voit la disparition des dinosaures non-aviens. \n \n Le climat du Mésozoïque est généralement plus chaud qu'aujourd'hui, avec peu de glace polaire et des niveaux de CO2 souvent élevés. La Pangée commence à se fragmenter au Jurassique, formant progressivement les continents modernes. \n \n La vie connaît une recovery remarquable après l'extinction du Permien-Trias. Les gymnospermes (conifères, cycas, ginkgos) dominent la flore terrestre jusqu'au Crétacé où les angiospermes (plantes à fleurs) apparaissent et se diversifient rapidement. Les mammifères apparaissent au Trias mais restent de petite taille et nocturnes pendant tout le Mésozoïque, vivant dans l'ombre des dinosaures.",
    eraStart: -252.17,
    eraEnd: -66,
    periods: [
      {
        name: 'Trias',
        periodInfo:
          "Le Trias s'étend de −252,2 ± 0,5 à −201,3 ± 0,2 Ma, soit sur 50,9 Ma. Son nom vient de la division en trois couches caractéristiques (trias) des formations géologiques de cette période en Allemagne. \n \n Le Trias est une période de recovery après l'extinction massive de la fin du Permien. Le climat est généralement chaud et sec, avec des déserts étendus sur la Pangée. Les niveaux de CO2 sont élevés (4-5 fois les niveaux pré-industriels). Il n'y a pas de calottes glaciaires et le niveau des mers est relativement bas. \n \n La vie marine se reconstitue lentement, avec l'apparition de nouveaux groupes comme les ammonites modernes, les brachiopodes, et les reptiles marins (ichtyosaures, plésiosaures). Sur terre, les premiers dinosaures apparaissent vers la fin du Trias, ainsi que les premiers mammifères. La flore est dominée par les conifères, les cycas et les fougères. \n \n La fin du Trias est marquée par une extinction massive (extinction Trias-Jurassique) qui affecte particulièrement les reptiles mammaliens et permet aux dinosaures de devenir les dominateurs des écosystèmes terrestres.",
        periodStart: -252.2,
        periodEnd: -201.3,
        epochs: [
          {
            name: 'Inférieur',
            epochStart: -252.2,
            epochEnd: -247.2,
            epochInfo:
              "Le Trias inférieur (5 Ma) est une période de recovery extrêmement lente après l'extinction Permien-Trias. Les écosystèmes sont simples et appauvris, dominés par quelques espèces opportunistes. Le climat est chaud et aride, avec des températures globales élevées. Les océans souffrent encore d'anoxie et d'acidification. La vie commence timidement à se diversifier avec l'apparition des premiers reptiles archosaures qui deviendront dominants plus tard.",
            stage: [
              {
                name: 'Induen',
                stageStart: -252.2,
                stageEnd: -251.2,
                stageInfo:
                  "L'Induen (1 Ma) doit son nom de la région de Indus en Pakistan. Cette période immédiatement post-extinction est caractérisée par des communautés biologiques extrêmement appauvries. Les 'taxons désastre' (espèces opportunistes) dominent les écosystèmes. Les conditions environnementales restent hostiles avec des températures élevées et une productivité biologique très faible.",
              },
              {
                name: 'Olénékien',
                stageStart: -251.2,
                stageEnd: -247.2,
                stageInfo:
                  "L'Olénékien (4 Ma) tire son nom de la rivière Olenek en Sibérie. La recovery biologique s'accélère progressivement. Les premiers reptiles archosaures se diversifient, annonçant l'ère des dinosaures. Les ammonites et les conodontes commencent à se rediversifier dans les océans. Le climat reste chaud et aride mais montre des signes d'amélioration.",
              },
            ],
          },
          {
            name: 'Moyen',
            epochStart: -247.2,
            epochEnd: -237,
            epochInfo:
              "Le Trias moyen (10,2 Ma) marque une accélération de la recovery biologique. Les écosystèmes deviennent plus complexes et diversifiés. Le climat devient légèrement plus humide, permettant le développement d'une végétation plus abondante. Les reptiles archosaures continuent leur diversification, avec l'apparition des premiers dinosaures et ptérosaures. Les premiers mammifères apparaissent à la fin du Trias moyen.",
            stage: [
              {
                name: 'Anisien',
                stageStart: -247.2,
                stageEnd: -242,
                stageInfo:
                  "L'Anisien (5,2 Ma) doit son nom de la rivière Anisus en Autriche. Cette période voit une diversification significative des reptiles archosaures, avec l'apparition des premiers crocodiliens et des précurseurs des dinosaures. Les récifs coralliens commencent à se reformer, bien que moins développés qu'au Paléozoïque. La flore terrestre est dominée par les conifères et les fougères.",
              },
              {
                name: 'Ladinien',
                stageStart: -242,
                stageEnd: -237,
                stageInfo:
                  "Le Ladinien (5 Ma) tire son nom des Ladins, peuple des Dolomites en Italie. Les premiers dinosaures proprement dits apparaissent, ainsi que les premiers ptérosaures. Les mammifères font leur apparition, évoluant à partir de reptiles mammaliens. Les écosystèmes marins continuent de se diversifier avec l'expansion des reptiles marins (ichtyosaures, nothosaures).",
              },
            ],
          },
          {
            name: 'Supérieur',
            epochStart: -237,
            epochEnd: -201.3,
            epochInfo:
              'Le Trias supérieur (35,7 Ma) est marqué par la domination progressive des dinosaures sur les continents. Le climat devient plus humide, avec une saisonnalité accentuée. La Pangée commence à montrer les premiers signes de fragmentation. La fin du Trias est marquée par une extinction massive (extinction Trias-Jurassique) qui élimine de nombreux groupes de reptiles et permet aux dinosaures de devenir les dominateurs incontestés des écosystèmes terrestres.',
            stage: [
              {
                name: 'Carnien',
                stageStart: -237,
                stageEnd: -227,
                stageInfo:
                  "Le Carnien (10 Ma) doit son nom des Alpes carniques en Italie. Cette période est marquée par un épisode pluvial important (Épisode pluvial carnien) qui rompt l'aridité dominante du Trias. La végétation devient plus luxuriante. Les dinosaures se diversifient rapidement, occupant de nouvelles niches écologiques. Les premiers tortues apparaissent.",
              },
              {
                name: 'Norien',
                stageStart: -227,
                stageEnd: -208.5,
                stageInfo:
                  "Le Norien (18,5 Ma) tire son nom de la Norique, ancienne province romaine. Les dinosaures deviennent le groupe terrestre dominant, avec l'apparition des premiers grands sauropodomorphes et théropodes. Les mammifères restent petits et nocturnes. Les reptiles marins (ichtyosaures, plésiosaures) dominent les océans. La Pangée commence à se fracturer.",
              },
              {
                name: 'Rhétien',
                stageStart: -208.5,
                stageEnd: -201.3,
                stageInfo:
                  "Le Rhétien (7,2 Ma) doit son nom des Rhaeti, peuple ancien des Alpes. La fin du Trias est marquée par l'extinction Trias-Jurassique, probablement causée par des éruptions volcaniques massives et les changements climatiques associés. De nombreux groupes de reptiles disparaissent, mais les dinosaures survivent et se diversifient au Jurassique. Les premiers lézards et salamandres apparaissent.",
              },
            ],
          },
        ],
      },
      {
        name: 'Jurassique',
        periodInfo:
          "Le Jurassique s'étend de −201,3 ± 0,2 à −145,0 Ma, soit sur 56,3 Ma. Son nom vient du Jura, massif montagneux situé entre la France et la Suisse. \n \n Le Jurassique est souvent appelé 'l'âge des dinosaures' car ces animaux dominent tous les écosystèmes terrestres. Le climat est généralement chaud et humide, avec des niveaux de CO2 élevés (4-5 fois les niveaux pré-industriels). Il n'y a pas de glace polaire et le niveau des mers est élevé, inondant une grande partie des continents. \n \n La Pangée continue de se fragmenter, formant deux supercontinents: la Laurasie au nord et le Gondwana au sud. L'Atlantique Nord commence à s'ouvrir. \n \n La vie marine est riche et diversifiée, avec des reptiles marins (ichtyosaures, plésiosaures, pliosaures), des ammonites et des bélemnites. Les premiers oiseaux apparaissent à la fin du Jurassique, évoluant à partir de dinosaures théropodes. La flore est dominée par les gymnospermes (conifères, cycas, ginkgos), avec l'apparition des premières plantes à fleurs à la fin du Jurassique.",
        periodStart: -201.3,
        periodEnd: -145,
        epochs: [
          {
            name: 'Inférieur',
            epochStart: -201.3,
            epochEnd: -174.1,
            epochInfo:
              "Le Jurassique inférieur (27,2 Ma) est marqué par le rétablissement après l'extinction de la fin du Trias. Les dinosaures deviennent les dominateurs incontestés des écosystèmes terrestres. Le climat est chaud et humide, avec des forêts luxuriantes. Les niveaux de CO2 sont élevés, créant un effet de serre important. La fragmentation de la Pangée s'accélère, créant de nouvelles côtes et mers épicontinentales.",
            stage: [
              {
                name: 'Hettangien',
                stageStart: -201.3,
                stageEnd: -199.3,
                stageInfo:
                  "L'Hettangien (2 Ma) doit son nom de Hettange-Grande en France. Cette période post-extinction voit la radiation rapide des dinosaures qui occupent les niches laissées vacantes. Les premiers grands sauropodes apparaissent. Les océans voient la diversification des ammonites et des reptiles marins. Le climat est chaud et humide.",
              },
              {
                name: 'Sinémurien',
                stageStart: -199.3,
                stageEnd: -190.8,
                stageInfo:
                  "Le Sinémurien (8,5 Ma) tire son nom de Semur-en-Auxois en France. Les dinosaures continuent leur diversification avec l'apparition des premiers stégosaures et ornithopodes. Les forêts de conifères et de cycas couvrent une grande partie des continents. Les mers épicontinentales abritent une vie marine abondante.",
              },
              {
                name: 'Pliensbachien',
                stageStart: -190.8,
                stageEnd: -182.7,
                stageInfo:
                  'Le Pliensbachien (8,1 Ma) doit son nom du village de Pliensbach en Allemagne. Cette période est marquée par un refroidissement climatique temporaire. Les dinosaures atteignent des tailles imposantes, avec des sauropodes de plus de 15 mètres. Les ammonites connaissent une grande diversification. Les premiers mammifères multituberculés apparaissent.',
              },
              {
                name: 'Toarcien',
                stageStart: -182.7,
                stageEnd: -174.1,
                stageInfo:
                  'Le Toarcien (8,6 Ma) tire son nom de Thouars en France. Un événement anoxique océanique (événement du Toarcien) cause une extinction mineure qui affecte particulièrement la vie marine. Les températures sont élevées, avec un pic thermique au milieu du Toarcien. Les dinosaures continuent de prospérer sur les continents.',
              },
            ],
          },
          {
            name: 'Moyen',
            epochStart: -174.1,
            epochEnd: -163.5,
            epochInfo:
              "Le Jurassique moyen (10,6 Ma) est une période de climat stable et chaud. Les dinosaures atteignent leur apogée en termes de diversité et de taille. Les sauropodes géants dominent les paysages, accompagnés de divers théropodes et ornithischiens. La fragmentation de la Pangée continue, avec l'ouverture progressive de l'Atlantique central. Les mers épicontinentales sont étendues, abritant une vie marine riche.",
            stage: [
              {
                name: 'Aalénien',
                stageStart: -174.1,
                stageEnd: -170.3,
                stageInfo:
                  "L'Aalénien (3,8 Ma) doit son nom de Aalen en Allemagne. Le début du Jurassique moyen est marqué par une transgression marine importante qui inonde une grande partie des continents. Les dinosaures sauropodes atteignent des tailles gigantesques, avec des espèces comme Patagotitan atteignant plus de 30 mètres de long. Les ammonites continuent leur diversification.",
              },
              {
                name: 'Bajocien',
                stageStart: -170.3,
                stageEnd: -168.3,
                stageInfo:
                  "Le Bajocien (2 Ma) tire son nom de Bayeux en France. Cette période voit le développement de récifs coralliens étendus dans les mers chaudes. Les dinosaures théropodes se diversifient, avec l'apparition des premiers mégalosauridés. Les ptérosaures deviennent plus nombreux et diversifiés. Le climat est chaud et tropical sur une grande partie du globe.",
              },
              {
                name: 'Bathonien',
                stageStart: -168.3,
                stageEnd: -166.1,
                stageInfo:
                  'Le Bathonien (2,2 Ma) doit son nom de Bath en Angleterre. Les dinosaures continuent de dominer les écosystèmes terrestres. Les premiers ankylosaures apparaissent. Dans les océans, les reptiles marins (plésiosaures, ichtyosaures) atteignent leur apogée. Les ammonites présentent une grande variété de formes.',
              },
              {
                name: 'Callovien',
                stageStart: -166.1,
                stageEnd: -163.5,
                stageInfo:
                  'Le Callovien (2,6 Ma) tire son nom de Kellaways en Angleterre. Cette période est marquée par une légère baisse du niveau des mers. Les dinosaures restent diversifiés et abondants. Les premiers ptérosaures à crête apparaissent. Les mammifères continuent leur évolution discrète, restant petits et insectivores.',
              },
            ],
          },
          {
            name: 'Supérieur',
            epochStart: -163.5,
            epochEnd: -145,
            epochInfo:
              "Le Jurassique supérieur (18,5 Ma) est marqué par des changements environnementaux importants. Le climat devient légèrement plus frais et plus saisonnier. Le niveau des mers fluctue, avec des transgressions et régressions marines. La diversification des dinosaures continue, avec l'apparition des premiers cératopsiens et des dinosaures à plumes. La fin du Jurassique voit l'apparition des premiers oiseaux.",
            stage: [
              {
                name: 'Oxfordien',
                stageStart: -163.5,
                stageEnd: -157.3,
                stageInfo:
                  "L'Oxfordien (6,2 Ma) doit son nom d'Oxford en Angleterre. Cette période est caractérisée par des mers épicontinentales étendues et un climat chaud et humide. Les dinosaures sauropodes atteignent leurs tailles maximales. Les premiers dinosaures à plumes apparaissent en Chine. Les ammonites connaissent une nouvelle radiation évolutive.",
              },
              {
                name: 'Kimméridgien',
                stageStart: -157.3,
                stageEnd: -152.1,
                stageInfo:
                  "Le Kimméridgien (5,2 Ma) tire son nom de Kimmeridge en Angleterre. Le niveau des mers baisse légèrement, exposant de nouvelles terres. Les dinosaures diversifient leurs adaptations, avec l'apparition des premiers stégosaures à plaques. Les ptérosaures atteignent des envergures impressionnantes (jusqu'à 10 mètres). Les premiers oiseaux archaïques comme Archaeopteryx apparaissent.",
              },
              {
                name: 'Tithonien',
                stageStart: -152.1,
                stageEnd: -145,
                stageInfo:
                  "Le Tithonien (7,1 Ma) doit son nom de Tithon, personnage de la mythologie grecque. La fin du Jurassique est marquée par des changements environnementaux importants. Le climat devient plus aride et saisonnier. Les dinosaures continuent de dominer, avec l'apparition des premiers tyrannosauridés. Les oiseaux se diversifient rapidement. La transition vers le Crétacé se fait progressivement.",
              },
            ],
          },
        ],
      },
      {
        name: 'Crétacé',
        periodInfo:
          "Le Crétacé s'étend de −145,0 à −66,0 Ma, soit sur 79 Ma. Son nom vient du latin 'creta' qui signifie craie, en référence aux vastes dépôts de craie marine caractéristiques de cette période. \n \n Le Crétacé est la plus longue période du Mésozoïque. Le climat est généralement très chaud, avec des températures globales de 4-8°C plus élevées qu'aujourd'hui. Les niveaux de CO2 sont très élevés (4-10 fois les niveaux pré-industriels). Il n'y a pas de glace polaire et le niveau des mers est exceptionnellement haut, inondant jusqu'à un tiers des surfaces continentales actuelles. \n \n La fragmentation des continents se poursuit, avec l'ouverture de l'Atlantique Sud et la séparation de l'Amérique du Sud et de l'Afrique. L'Inde se détache de l'Antarctique et commence sa migration vers le nord. \n \n La vie connaît des innovations majeures: apparition et radiation des plantes à fleurs (angiospermes) qui deviennent dominantes, diversification des insectes pollinisateurs, apogée des dinosaures avec les plus grandes espèces terrestres de tous les temps, diversification des mammifères placentaires et marsupiaux. \n \n La fin du Crétacé est marquée par l'extinction Crétacé-Paléogène, causée par l'impact d'un astéroïde dans la péninsule du Yucatán et des éruptions volcaniques massives en Inde (trapps du Deccan). Cette extinction élimine les dinosaures non-aviens, les ptérosaures, les reptiles marins et de nombreux autres groupes.",
        periodStart: -145,
        periodEnd: -66,
        epochs: [
          {
            name: 'Inférieur',
            epochStart: -145,
            epochEnd: -100.5,
            epochInfo:
              'Le Crétacé inférieur (44,5 Ma) est une période de transition où les continents continuent de se fragmenter et les écosystèmes se modernisent. Le climat est chaud et humide, avec des températures élevées et peu de variation latitudinale. Les niveaux de CO2 augmentent progressivement. Les angiospermes (plantes à fleurs) apparaissent et commencent leur radiation évolutive, transformant les paysages terrestres.',
            stage: [
              {
                name: 'Berriasien',
                stageStart: -145,
                stageEnd: -139.8,
                stageInfo:
                  'Le Berriasien (5,2 Ma) doit son nom du village de Berrias en France. La transition Jurassique-Crétacé est progressive sans extinction majeure. Les dinosaures continuent de dominer les continents. Les ammonites et les bélemnites dominent les mers. Les premières plantes à fleurs primitives apparaissent mais restent rares.',
              },
              {
                name: 'Valanginien',
                stageStart: -139.8,
                stageEnd: -132.9,
                stageInfo:
                  "Le Valanginien (6,9 Ma) tire son nom de Valangin en Suisse. Un événement anoxique mineur affecte les océans. Les dinosaures se diversifient avec l'apparition des premiers iguanodontidés. Les plantes à fleurs commencent à se répandre, bien que les gymnospermes restent dominants. Le climat est chaud et humide.",
              },
              {
                name: 'Hauterivien',
                stageStart: -132.9,
                stageEnd: -129.4,
                stageInfo:
                  "L'Hauterivien (3,5 Ma) doit son nom de Hauteville en Suisse. Cette période est marquée par une transgression marine importante. Les dinosaures atteignent des tailles imposantes. Les reptiles marins (plésiosaures, ichtyosaures) dominent les océans. Les plantes à fleurs continuent leur expansion discrète.",
              },
              {
                name: 'Barrémien',
                stageStart: -129.4,
                stageEnd: -125,
                stageInfo:
                  'Le Barrémien (4,4 Ma) tire son nom de Barrême en France. Le climat devient légèrement plus frais mais reste globalement chaud. Les dinosaures présentent une grande diversité. Les premiers oiseaux modernes apparaissent. Les plantes à fleurs deviennent plus communes et diversifiées.',
              },
              {
                name: 'Aptien',
                stageStart: -125,
                stageEnd: -113,
                stageInfo:
                  "L'Aptien (12 Ma) doit son nom d'Apt en France. Un événement anoxique océanique (événement de l'Aptien) cause une extinction mineure. Les dinosaures continuent de prospérer. Les angiospermes connaissent une radiation importante, devenant des composants significatifs de la flore. Les premiers insectes sociaux (fourmis, termites) apparaissent.",
              },
              {
                name: 'Albien',
                stageStart: -113,
                stageEnd: -100.5,
                stageInfo:
                  "L'Albien (12,5 Ma) tire son nom de l'Aube en France. Cette période voit la continuation de la radiation des angiospermes qui commencent à dominer certains écosystèmes. Les dinosaures atteignent leur apogée en termes de diversité. Les mers sont chaudes et abritent une vie marine abondante. La fragmentation des continents s'accélère.",
              },
            ],
          },
          {
            name: 'Supérieur',
            epochStart: -100.5,
            epochEnd: -66,
            epochInfo:
              "Le Crétacé supérieur (34,5 Ma) représente l'apogée du monde mésozoïque. Le climat est extrêmement chaud, avec des températures globales parmi les plus élevées de l'histoire de la Terre. Les niveaux de CO2 sont très élevés. Les mers épicontinentales sont étendues, déposant d'immenses quantités de craie. Les dinosaures dominent tous les écosystèmes terrestres avec des formes gigantesques et spécialisées. Les angiospermes deviennent la flore dominante. La fin de cette période est marquée par l'extinction massive du Crétacé-Paléogène.",
            stage: [
              {
                name: 'Cénomanien',
                stageStart: -100.5,
                stageEnd: -93.9,
                stageInfo:
                  "Le Cénomanien (6,6 Ma) doit son nom du Cenomanum, nom latin du Mans en France. Cette période est marquée par une transgression marine majeure (transgression cénomanienne) qui inonde une grande partie des continents. Les dinosaures présentent une grande diversité avec l'apparition des premiers cératopsiens et hadrosaures. Les angiospermes deviennent la flore dominante dans de nombreuses régions.",
              },
              {
                name: 'Turonien',
                stageStart: -93.9,
                stageEnd: -89.8,
                stageInfo:
                  "Le Turonien (4,1 Ma) tire son nom de Tours en France. Un événement anoxique global (événement du Turonien) cause une extinction mineure qui affecte particulièrement la vie marine. Les températures atteignent des niveaux record. Les dinosaures continuent de prospérer avec des formes de plus en plus spécialisées. Les mers déposent d'immenses quantités de craie.",
              },
              {
                name: 'Coniacien',
                stageStart: -89.8,
                stageEnd: -86.3,
                stageInfo:
                  "Le Coniacien (3,5 Ma) doit son nom de Cognac en France. Le niveau des mers baisse légèrement après le maximum du Turonien. Les dinosaures dominent toujours les continents. Les premiers serpents modernes apparaissent. Les écosystèmes marins se rétablissent progressivement après l'événement anoxique.",
              },
              {
                name: 'Santonien',
                stageStart: -86.3,
                stageEnd: -83.6,
                stageInfo:
                  'Le Santonien (2,7 Ma) tire son nom de Saintes en France. Cette période est caractérisée par un climat chaud et stable. Les dinosaures atteignent leurs tailles maximales avec des sauropodes titanosauriens dépassant 30 mètres. Les hadrosaures et cératopsiens se diversifient en Amérique du Nord. Les angiospermes dominent complètement la flore terrestre.',
              },
              {
                name: 'Campanien',
                stageStart: -83.6,
                stageEnd: -72.1,
                stageInfo:
                  "Le Campanien (11,5 Ma) doit son nom de la Champagne en France. Cette longue période représente l'apogée de la diversité des dinosaures. Les célèbres Tyrannosaurus, Triceratops et Ankylosaurus vivent durant cette période. Les mers sont peuplées de mosasaures, plésiosaures et ammonites géantes. Le climat commence à se refroidir légèrement vers la fin du Campanien.",
              },
              {
                name: 'Maastrichtien',
                stageStart: -72.1,
                stageEnd: -66,
                stageInfo:
                  "Le Maastrichtien (6,1 Ma) tire son nom de Maastricht aux Pays-Bas. La fin du Crétacé est marquée par un refroidissement climatique progressif et une baisse du niveau des mers. La diversité des dinosaures décline légèrement mais ils restent dominants. L'impact de l'astéroïde de Chicxulub à la fin du Maastrichtien, combiné aux éruptions volcaniques des trapps du Deccan, cause l'extinction massive du Crétacé-Paléogène, éliminant les dinosaures non-aviens et de nombreux autres groupes.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    era: 'Cénozoïque',
    eraInfo:
      "Le Cénozoïque (du grec 'kainos' nouveau et 'zôê' vie, signifiant 'Vie nouvelle') est la troisième et actuelle division de l'éon 'Phanérozoïque' et est une ère géologique qui s'étend de −66,0 Ma à nos jours, soit sur 66 Ma. Elle couvre 3 périodes (Paléogène, Néogène, Quaternaire). \n \n Cette ère a longtemps été appelée 'Ère Tertiaire', mais cette appellation est maintenant obsolète. Elle est également connue comme 'l'âge des Mammifères' car ces animaux ont connu une radiation évolutive spectaculaire après l'extinction des dinosaures. \n \n Le Cénozoïque est marqué par un refroidissement climatique progressif, passant d'un climat chaud et sans glace polaire au début de l'ère à l'actuelle période glaciaire avec des calottes polaires permanentes. Les continents continuent leur dérive vers leurs positions actuelles. \n \n La vie connaît des transformations majeures: radiation des mammifères qui occupent toutes les niches écologiques, diversification des oiseaux, apparition et expansion des herbes (graminées) qui transforment les paysages, et enfin apparition et évolution des hominidés menant à l'Homme moderne. \n \n Le Cénozoïque est également caractérisé par des événements tectoniques majeurs comme la collision de l'Inde avec l'Asie (formant l'Himalaya) et la fermeture de la Téthys (formant la Méditerranée).",
    eraStart: -66,
    eraEnd: currentYear,
    periods: [
      {
        name: 'Paléogène',
        periodInfo:
          "Le Paléogène s'étend de −66,0 à −23,03 Ma, soit sur 42,97 Ma. Il est divisé en trois époques: le Paléocène, l'Éocène et l'Oligocène. \n \n Le Paléogène commence après l'extinction du Crétacé-Paléogène qui a éliminé les dinosaures non-aviens et de nombreux autres groupes. Le climat est généralement chaud au début, avec un optimum thermique à l'Éocène, puis se refroidit progressivement pour aboutir aux conditions plus fraîches de l'Oligocène. \n \n Les continents continuent de se rapprocher de leurs positions actuelles. L'Atlantique Nord s'élargit, l'Inde entre en collision avec l'Asie, et la Téthys commence à se fermer. \n \n La vie connaît une remarkable recovery après l'extinction. Les mammifères radiationnent rapidement, occupant les niches laissées vacantes par les dinosaures. Les oiseaux se diversifient également. Les plantes à fleurs dominent la flore terrestre, avec l'apparition des premières graminées à la fin du Paléogène.",
        periodStart: -66,
        periodEnd: -23.03,
        epochs: [
          {
            name: 'Paléocène',
            epochStart: -66,
            epochEnd: -56,
            epochInfo:
              "Le Paléocène (10 Ma) est la première époque du Paléogène. Il représente la recovery de la vie après l'extinction du Crétacé-Paléogène. Le climat est chaud et humide, avec des températures globales élevées et peu de glace polaire. Les mammifères connaissent une radiation adaptive rapide, se diversifiant en de nombreuses formes qui occupent les niches écologiques vacantes. Les oiseaux deviennent les vertébrés terrestres dominants en termes de taille.",
            stage: [
              {
                name: 'Danien',
                stageStart: -66,
                stageEnd: -61.6,
                stageInfo:
                  'Le Danien (4,4 Ma) doit son nom du Danemark où les couches de cette période sont bien exposées. Cette période immédiatement post-extinction est caractérisée par des écosystèmes appauvris mais en recovery rapide. Les mammifères restent petits mais se diversifient en de nouveaux groupes. Les forêts tropicales couvrent une grande partie du globe. La vie marine se rétablit lentement.',
              },
              {
                name: 'Sélandien',
                stageStart: -61.6,
                stageEnd: -59.2,
                stageInfo:
                  "Le Sélandien (2,4 Ma) tire son nom de la Zélande au Danemark. La recovery biologique s'accélère. Les mammifères continuent leur diversification avec l'apparition des premiers primates, rongeurs et ongulés primitifs. Le climat reste chaud et humide. Les forêts couvrent la plupart des continents.",
              },
              {
                name: 'Thanétien',
                stageStart: -59.2,
                stageEnd: -56,
                stageInfo:
                  "Le Thanétien (3,2 Ma) doit son nom de Thanet en Angleterre. La fin du Paléocène est marquée par un réchauffement climatique important (Maximum Thermique du Paléocène-Éocène) qui cause une extinction mineure mais accélère l'évolution des mammifères. Les premiers grands mammifères apparaissent. Les forêts tropicales s'étendent jusqu'aux hautes latitudes.",
              },
            ],
          },
          {
            name: 'Éocène',
            epochStart: -56,
            epochEnd: -33.9,
            epochInfo:
              "L'Éocène (22,1 Ma) est marqué par des conditions climatiques extrêmement chaudes au début (optimum climatique de l'Éocène) suivies d'un refroidissement progressif. Les températures globales sont parmi les plus élevées de l'ère Cénozoïque. Les mammifères continuent leur radiation, avec l'apparition des premiers carnivores, chauves-souris, baleines et chevaux. Les oiseaux géants (comme Gastornis) dominent certains écosystèmes.",
            stage: [
              {
                name: 'Yprésien',
                stageStart: -56,
                stageEnd: -47.8,
                stageInfo:
                  "L'Yprésien (8,2 Ma) doit son nom d'Ypres en Belgique. Cette période inclut l'optimum climatique de l'Éocène où les températures globales sont exceptionnellement élevées. Les forêts tropicales s'étendent jusqu'aux pôles. Les mammifères connaissent une radiation explosive, avec l'apparition de tous les ordres modernes. Les premiers primates anthropoïdes apparaissent.",
              },
              {
                name: 'Lutétien',
                stageStart: -47.8,
                stageEnd: -41.2,
                stageInfo:
                  "Le Lutétien (6,6 Ma) tire son nom de Lutèce, nom antique de Paris. Le climat commence à se refroidir légèrement mais reste chaud. Les mammifères continuent de se diversifier avec l'apparition des premiers équidés et cétacés. Les forêts subtropicales couvrent une grande partie de l'Europe et de l'Amérique du Nord. La vie marine est abondante et diversifiée.",
              },
              {
                name: 'Bartonien',
                stageStart: -41.2,
                stageEnd: -37.8,
                stageInfo:
                  "Le Bartonien (3,4 Ma) doit son nom de Barton en Angleterre. Le refroidissement climatique s'accentue. Les forêts tempérées commencent à remplacer les forêts tropicales aux hautes latitudes. Les mammifères développent des adaptations à des climats plus frais. Les premiers grands prédateurs mammaliens apparaissent.",
              },
              {
                name: 'Priabonien',
                stageStart: -37.8,
                stageEnd: -33.9,
                stageInfo:
                  "Le Priabonien (3,9 Ma) tire son nom de Priabona en Italie. La fin de l'Éocène est marquée par un refroidissement significatif qui conduit à la formation des premières calottes glaciaires en Antarctique. Les forêts tempérées deviennent dominantes. De nombreux groupes de mammifères archaïques disparaissent lors de la Grande Coupure Éocène-Oligocène.",
              },
            ],
          },
          {
            name: 'Oligocène',
            epochStart: -33.9,
            epochEnd: -23.03,
            epochInfo:
              "L'Oligocène (10,87 Ma) est une période de transition vers des conditions climatiques plus fraîches. La calotte glaciaire antarctique s'établit de façon permanente, faisant baisser le niveau des mers. Le climat devient plus sec et plus saisonnier. Les forêts ouvertes et les savanes commencent à se développer, favorisant l'évolution de nouveaux types de mammifères adaptés à la course et au pâturage. Les premiers singes catarrhiniens (de l'Ancien Monde) apparaissent.",
            stage: [
              {
                name: 'Rupélien',
                stageStart: -33.9,
                stageEnd: -27.82,
                stageInfo:
                  "Le Rupélien (6,08 Ma) doit son nom de la rivière Rupel en Belgique. Cette période est marquée par un refroidissement global important et l'établissement de la calotte glaciaire antarctique. Le niveau des mers baisse significativement. Les mammifères développent des adaptations aux climats plus frais et plus secs. Les forêts ouvertes et les prairies commencent à se développer.",
              },
              {
                name: 'Chattien',
                stageStart: -27.82,
                stageEnd: -23.03,
                stageInfo:
                  "Le Chattien (4,79 Ma) tire son nom de la région de Chatt en Allemagne. Le climat continue de se refroidir et de s'assécher. Les paysages ouverts deviennent plus communs, favorisant l'évolution des herbivores coureurs. Les premiers singes de l'Ancien Monde apparaissent en Afrique. La vie marine s'adapte aux eaux plus froides.",
              },
            ],
          },
        ],
      },
      {
        name: 'Néogène',
        periodInfo:
          "Le Néogène s'étend de −23,03 à −2,58 Ma, soit sur 20,45 Ma. Il est divisé en deux époques: le Miocène et le Pliocène. \n \n Le Néogène est marqué par un refroidissement climatique continu et l'établissement des conditions menant aux glaciations du Quaternaire. Les calottes glaciaires se développent en Antarctique et commencent à se former en Arctique. Le climat devient plus sec et plus saisonnier, favorisant l'expansion des prairies et des savanes. \n \n Les continents atteignent leurs positions actuelles. La collision de l'Afrique avec l'Europe ferme la Téthys et forme la Méditerranée. L'isthme de Panama se forme, connectant les Amériques et modifiant les courants océaniques. \n \n La vie continue son évolution vers des formes modernes. Les mammifères et les oiseaux dominent les écosystèmes terrestres. Les herbes (graminées) deviennent la végétation dominante dans de nombreuses régions, favorisant l'évolution des herbivores à dents hypsodontes (à couronne haute). Les hominidés apparaissent et se diversifient en Afrique.",
        periodStart: -23.03,
        periodEnd: -2.58,
        epochs: [
          {
            name: 'Miocène',
            epochStart: -23.03,
            epochEnd: -5.333,
            epochInfo:
              "Le Miocène (17,7 Ma) est la plus longue époque du Néogène. Le climat connaît des fluctuations mais tend vers le refroidissement et l'assèchement. Les calottes glaciaires antarctiques s'étendent. Les paysages ouverts (savanes, steppes) se développent aux dépens des forêts. Les mammifères connaissent une importante diversification, avec l'apparition des premiers grands carnivores, des équidés modernes et des primates hominoïdes. Les hominidés se séparent de la lignée des chimpanzés vers la fin du Miocène.",
            stage: [
              {
                name: 'Aquitanien',
                stageStart: -23.03,
                stageEnd: -20.44,
                stageInfo:
                  "L'Aquitanien (2,59 Ma) doit son nom de l'Aquitaine en France. Le début du Miocène est relativement chaud et humide. Les forêts subtropicales couvrent une grande partie de l'Europe. Les mammifères continuent leur diversification avec l'apparition des premiers cerfs et bovidés. Les primates hominoïdes se répandent en Afrique et en Eurasie.",
              },
              {
                name: 'Burdigalien',
                stageStart: -20.44,
                stageEnd: -15.97,
                stageInfo:
                  "Le Burdigalien (4,47 Ma) tire son nom de Bordeaux en France. Un réchauffement climatique temporaire se produit, suivi d'un refroidissement progressif. Les forêts ouvertes et les savanes commencent à se développer. Les mammifères adaptés aux milieux ouverts se diversifient. Les premiers hominoïdes africains apparaissent.",
              },
              {
                name: 'Langhien',
                stageStart: -15.97,
                stageEnd: -13.82,
                stageInfo:
                  'Le Langhien (2,15 Ma) doit son nom de Langhe en Italie. Le climat devient plus frais et plus sec. Les paysages ouverts deviennent dominants dans de nombreuses régions. Les herbivores coureurs (comme les antilopes et les chevaux) se diversifient. Les prédateurs mammaliens deviennent plus grands et plus spécialisés.',
              },
              {
                name: 'Serravalien',
                stageStart: -13.82,
                stageEnd: -11.63,
                stageInfo:
                  "Le Serravalien (2,19 Ma) tire son nom de Serravalle Scrivia en Italie. Le refroidissement climatique s'accentue. La calotte glaciaire antarctique s'étend significativement. Les écosystèmes de prairie et de savane se développent. Les hominoïdes continuent leur évolution en Afrique et en Eurasie.",
              },
              {
                name: 'Tortonien',
                stageStart: -11.63,
                stageEnd: -7.246,
                stageInfo:
                  "Le Tortonien (4,384 Ma) doit son nom de Tortona en Italie. Cette période est marquée par un refroidissement important et l'établissement de conditions glaciaires en Antarctique. Les paysages ouverts dominent. Les mammifères modernes continuent leur diversification. La lignée humaine se sépare de celle des chimpanzés vers la fin du Tortonien (environ 7-8 Ma).",
              },
              {
                name: 'Messinien',
                stageStart: -7.246,
                stageEnd: -5.333,
                stageInfo:
                  "Le Messinien (1,913 Ma) tire son nom de Messine en Italie. La fin du Miocène est marquée par la crise de salinité messinienne où la Méditerranée s'assèche presque complètement, formant d'immenses dépôts de sel. Le climat est frais et sec. Les hominidés primitifs (comme Sahelanthropus) apparaissent en Afrique. Les écosystèmes de savane se développent largement.",
              },
            ],
          },
          {
            name: 'Pliocène',
            epochStart: -5.333,
            epochEnd: -2.58,
            epochInfo:
              "Le Pliocène (2,753 Ma) est marqué par un refroidissement climatique continu menant aux glaciations du Quaternaire. Les calottes glaciaires commencent à se former dans l'hémisphère nord. Le climat devient plus froid et plus sec, avec une accentuation des saisons. Les paysages ouverts (steppes, toundra) se développent aux hautes latitudes. Les hominidés continuent leur évolution en Afrique, avec l'apparition des australopithèques et des premiers représentants du genre Homo.",
            stage: [
              {
                name: 'Zancléen',
                stageStart: -5.333,
                stageEnd: -3.6,
                stageInfo:
                  "Le Zancléen (1,733 Ma) doit son nom de Zancla, ancien nom de Messine en Italie. Le début du Pliocène est relativement chaud mais le refroidissement s'accentue progressivement. Les forêts tempérées reculent au profit des prairies et des savanes. Les hominidés (australopithèques) se diversifient en Afrique. La mégafaune mammaliène se développe.",
              },
              {
                name: 'Plaisancien',
                stageStart: -3.6,
                stageEnd: -2.58,
                stageInfo:
                  "Le Plaisancien (1,02 Ma) tire son nom de Plaisance en Italie. La fin du Pliocène est marquée par un refroidissement accentué qui prépare les glaciations du Quaternaire. Les calottes glaciaires commencent à se former en Arctique et dans les montagnes de l'hémisphère nord. Les premiers représentants du genre Homo apparaissent en Afrique vers la fin du Plaisancien.",
              },
            ],
          },
        ],
      },
      {
        name: 'Quaternaire',
        periodInfo:
          "Le Quaternaire s'étend de −2,58 Ma à nos jours. Il est divisé en deux époques: le Pléistocène et l'Holocène. \n \n Le Quaternaire est caractérisé par des cycles glaciaires-interglaciaires répétés. Les calottes glaciaires couvrent périodiquement une grande partie de l'hémisphère nord durant les glaciations, puis se retirent durant les interglaciaires. Le niveau des mers fluctue considérablement (jusqu'à 120 mètres de différence). \n \n Le climat est généralement froid et instable, avec des changements rapides entre conditions glaciaires et interglaciaires. La dernière glaciation s'est terminée il y a environ 11 700 ans, marquant le début de l'Holocène et des conditions interglaciaires actuelles. \n \n La vie est dominée par la mégafaune mammaliène (mammouths, rhinocéros laineux, tigres à dents de sabre) qui disparaît largement lors de l'extinction de l'Holocène. Le genre Homo se diversifie et se répand sur tous les continents. Homo sapiens apparaît en Afrique il y a environ 300 000 ans et développe l'agriculture, les civilisations et la technologie moderne durant l'Holocène.",
        periodStart: -2.58,
        periodEnd: currentYear,
        epochs: [
          {
            name: 'Pléistocène',
            epochStart: -2.58,
            epochEnd: -0.0117,
            epochInfo:
              "Le Pléistocène (2,5683 Ma) est marqué par des cycles glaciaires répétés. Les calottes glaciaires avancent et reculent périodiquement, sculptant les paysages par l'érosion glaciaire. Le niveau des mers fluctue considérablement, créant des ponts terrestres entre continents (comme la Béringie entre l'Asie et l'Amérique). La mégafaune mammaliène (mammouths, mastodontes, paresseux géants) domine les écosystèmes terrestres. Le genre Homo évolue et se disperse à travers le monde, développant des technologies lithiques de plus en plus sophistiquées.",
            stage: [
              {
                name: 'Gélasien',
                stageStart: -2.58,
                stageEnd: -1.8,
                stageInfo:
                  'Le Gélasien (0,78 Ma) doit son nom de Gela en Sicile. Cette période marque le début officiel du Quaternaire. Les premiers cycles glaciaires commencent, bien que moins intenses que ceux du Pléistocène moyen. Homo habilis et Homo erectus apparaissent en Afrique. Les outils oldowayens se développent.',
              },
              {
                name: 'Calabrien',
                stageStart: -1.8,
                stageEnd: -0.774,
                stageInfo:
                  "Le Calabrien (1,026 Ma) tire son nom de la Calabre en Italie. Les cycles glaciaires deviennent plus intenses et plus longs. Homo erectus se disperse hors d'Afrique et colonise l'Eurasie. Le feu est maîtrisé. Les outils acheuléens se développent.",
              },
              {
                name: 'Pléistocène moyen',
                stageStart: -0.774,
                stageEnd: -0.129,
                stageInfo:
                  'Le Pléistocène moyen (0,645 Ma) est caractérisé par des cycles glaciaires de 100 000 ans très prononcés. Les calottes glaciaires atteignent des extensions maximales durant les glaciations. Homo heidelbergensis apparaît et donne naissance aux Néandertaliens en Europe et aux Denisoviens en Asie. Les techniques de chasse se sophistiquent.',
              },
              {
                name: 'Pléistocène supérieur',
                stageStart: -0.129,
                stageEnd: -0.0117,
                stageInfo:
                  "Le Pléistocène supérieur (0,1173 Ma) couvre la dernière glaciation (glaciation de Würm). Homo sapiens apparaît en Afrique et se disperse à travers le monde, remplaçant progressivement les autres espèces d'Homo. L'art rupestre et les pratiques symboliques se développent. La mégafaune commence à décliner, probablement sous la pression combinée des changements climatiques et de la chasse humaine.",
              },
            ],
          },
          {
            name: 'Holocène',
            epochStart: -0.0117,
            epochEnd: currentYear,
            epochInfo:
              "L'Holocène (11 700 ans à aujourd'hui) est l'époque interglaciaire actuelle. Le climat est généralement stable et chaud, permettant le développement de l'agriculture et des civilisations humaines. Le niveau des mers remonte de plus de 100 mètres après la dernière glaciation, inondant les plateaux continentaux et séparant les continents. \n \n Les humains deviennent la force dominante sur Terre, modifiant profondément les écosystèmes par l'agriculture, l'élevage, l'urbanisation et l'industrialisation. Une extinction massive d'espèces (l'extinction de l'Holocène) est en cours, principalement due aux activités humaines. Les concentrations de CO2 atmosphérique augmentent rapidement depuis la révolution industrielle, causant un réchauffement climatique anthropique.",
            stage: [
              {
                name: 'Greenlandien',
                stageStart: -0.0117,
                stageEnd: -0.0082,
                stageInfo:
                  'Le Greenlandien (3 500 ans) voit la fin de la dernière glaciation et le retrait des calottes glaciaires. Le niveau des mers remonte rapidement, inondant de vastes zones côtières.',
              },
              {
                name: 'Northgrippien',
                stageStart: -0.0082,
                stageEnd: -0.0042,
                stageInfo:
                  "Le Northgrippien (4 000 ans) est une période climatique optimale (optimum climatique de l'Holocène) où les températures sont légèrement plus élevées qu'aujourd'hui. C'est à la toute fin de cet étage que les civilisations se développent et se complexifient (Égypte, Mésopotamie, Indus, Chine). L'écriture est inventée. Les impacts humains sur l'environnement deviennent significatifs.",
              },
              {
                name: 'Méghalayen',
                stageStart: -0.0042,
                stageEnd: currentYear,
                stageInfo:
                  "Le Méghalayen (4 000 ans) voit un léger refroidissement climatique suivie de fluctuations. Les empires se développent et déclinent (Rome, Chine, Perses). La population humaine augmente progressivement. Les impacts environnementaux s'intensifient avec la déforestation et l'expansion agricole.",
              },
            ],
          },
        ],
      },
    ],
  },
];
export default timelineData;
