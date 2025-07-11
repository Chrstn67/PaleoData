const currentYear = new Date().getFullYear();

const timelineData = [
  {
    era: 'Paléozoïque',
    eraInfo:
      "Le Paléozoïque (ayant pour étymologie 'Vie ancienne') est la première des trois divisions de l'éon 'Phanérozoïque' et est une ère géologique qui s'étend de −541 à −252,2 Ma, soit sur 288,8 Ma. Elle couvre 6 périodes (Cambrien, Ordovicien, Silurien, Dévonien, Carbonifère, Permien). \n \n Cette ère a longtemps été appelée 'Ère Primaire', ou 'Ère des Poissons' du fait d'une grande période de temps où la vie ne développait que dans l'eau. \n Le Paléozoïque démarre peu après la fragmentation du supercontinent Rodinia en au moins huit masses continentales. Au cours de cette ère ces continents se rassemblent à nouveau pour former la Pangée. Au début de cette ère, les formes de vie se limitent à des bactéries, des algues, des éponges et une variété de formes encore mal connues apparues avant cette ère (durant l'Édicarien). \n \n La diversité et le nombre d'organismes explosent durant le Cambrien. On pense que les premiers organismes terrestres apparaissent durant le Paléozoïque mais ce phénomène reste mineur avant le Silurien et le Dévonien. Bien que des vertébrés primitifs soient présents dès le début de cette ère, les invertébrés restent dominants jusqu'au milieu du Paléozoïque. La population de poissons explose durant le Dévonien. \n \n Pendant la seconde moitié de cette ère et particulièrement au Carbonifère, de grandes forêts de plantes primitives forment ce qui deviendra des couches de charbon. À la fin du Paléozoïque, les premiers reptiles sophistiqués et les premières plantes modernes (conifères) se sont développés.",
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
                  "Le Fortunien est le premier étage de la première époque (ou série) du Cambrien. S'étendant sur 12 Ma, le Fortunien est défini par la présence de traces fossiles appelées Treptichnus pedum.",
              },
              {
                name: 'Étage 2',
                stageStart: -529,
                stageEnd: -521,
                stageInfo:
                  "L'Étage 2 est le second étage du Cambrien. Il n'a pas encore de nom spécifique. C'est durant ces 8 Ma que les premiers conodontes commence à peupler les océans.",
              },
            ],
          },
          {
            name: 'Série 2',
            epochStart: -521,
            epochEnd: -509,
            epochInfo:
              "La série 2 ne porte pas encore de nom établit. Mais cette deuxième époque (ou série) du Cambrien s'étend sur 12 Ma. C'est au début de cette époque que nous aurions pu y trouver les premiers trilobites.",
            stage: [
              {
                name: 'Étage 3',
                stageStart: -521,
                stageEnd: -514,
                stageInfo:
                  "Durant 6 Ma, la vie dans les océans commence à exister. Les premières espèces de trilobites existent. Cet étage n'a pas encore de nom définit, mais les géologues travaillant en Sibérie, où les strates de cet étage sont bien présents, lui donnent le nom de Adtabanien.",
              },
              {
                name: 'Étage 4',
                stageStart: -514,
                stageEnd: -509,
                stageInfo:
                  'Ce second étage de la Série 2 dure 6 Ma. De nouvelles espèces de trilobites vivent dans les océans du Cambrien.',
              },
            ],
          },
          {
            name: 'Miaolingien',
            epochStart: -509,
            epochEnd: -497,
            epochInfo:
              "Autrefois appelé 'Acadien', puis 'Série 3' ou 'Cambrien moyen', le Miaolingien est la troisième période du Cambrien. Elle se distingue par l'existence de nouvelles espèces de trilobites. Son nom vient des montagnes de Mioling situées en Chine où ont été retrouvées des traces de cette époque et des trois étages la composant.",
            stage: [
              {
                name: 'Wuliuen',
                stageStart: -509,
                stageEnd: -504.5,
                stageInfo:
                  "Baptisé ainsi en 2018, le Wulien est le premier étage du Miaolingien. La 'pointe d'or' qui définit formellement la base de la période est enfoncée dans la section Wuliu-Zengjiayan de la formation de Kaili, près du village de Balang dans les montagnes de Miaoling, en Chine.",
              },
              {
                name: 'Drumien',
                stageStart: -504.5,
                stageEnd: -500.5,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Guzhangien',
                stageStart: -500.5,
                stageEnd: -497,
                stageInfo: 'Infos à venir :) ',
              },
            ],
          },
          {
            name: 'Furongien',
            epochStart: -497,
            epochEnd: -485.4,
            epochInfo: 'Infos à venir :) ',
            stage: [
              {
                name: 'Paibien',
                stageStart: -497,
                stageEnd: -494,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Jiangshanien',
                stageStart: -494,
                stageEnd: -489.5,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Étage 10',
                stageStart: -489.5,
                stageEnd: -485.4,
                stageInfo: 'Infos à venir :) ',
              },
            ],
          },
        ],
      },
      {
        name: 'Ordovicien',
        periodInfo:
          "S'étendant sur environ 42,0 ± 3,4 Ma, de - 485,4 ± 1,9 à - 443,4 ± 1,5, l'Ordovicien tient son nom des Ordovices, un peuple brittonique de l’actuel Pays de Galles. Il a fallu un moment aux scientifiques pour résoudre un problème de classification géologique entre le Cambrien, la période précédent l'Ordovicien, et le Silurien, période suivante.\n \n Le taux de dioxygène dans l'air est de 13.5%, tandis que le taux de dioxyde de carbone est d'environ 4200 ppm, soit 15 fois plus qu'avant la Révolution Industrielle du XIXè siècle. La température moyenne est de 16°C, soit plus froide que durant le Cambrien. Cette baisse de température permet une explosion de la biodiversité marine. Les scientifiques estiment que le nombre de genres et de familles d'êtres vivants a triplé voire quadruplé.\n \n La fin de l'Ordovicien est marquée par la première des cinq grandes extinctions massives de l'Histoire des temps géologiques, où près de 60 % des espèces marines ont disparu et peut-être 85 % du total des espèces (végétales et animales). Cette extinction de masse s'appelle 'l'extinction Ordovicien-Silurien.'",
        periodStart: -485.4,
        periodEnd: -443.8,
        epochs: [
          {
            name: 'Inférieur',
            epochStart: -485.4,
            epochEnd: -470,
            epochInfo: 'Infos à venir :) ',
            stage: [
              {
                name: 'Trémadocien',
                stageStart: -485.4,
                stageEnd: -477.7,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Floien',
                stageStart: -477.7,
                stageEnd: -470,
                stageInfo: 'Infos à venir :) ',
              },
            ],
          },
          {
            name: 'Moyen',
            epochStart: -470,
            epochEnd: -458.4,
            epochInfo: 'Infos à venir :) ',
            stage: [
              {
                name: 'Dapingien',
                stageStart: -470,
                stageEnd: -467.3,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Darriwilien',
                stageStart: -467.3,
                stageEnd: -458.4,
                stageInfo: 'Infos à venir :) ',
              },
            ],
          },
          {
            name: 'Supérieur',
            epochStart: -458.4,
            epochEnd: -443.8,
            epochInfo: 'Infos à venir :) ',
            stage: [
              {
                name: 'Sandbien',
                stageStart: -458.4,
                stageEnd: -453,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Katien',
                stageStart: -453,
                stageEnd: -445.2,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Hirnantien',
                stageStart: -445.2,
                stageEnd: -443.8,
                stageInfo: 'Infos à venir :) ',
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
            epochInfo: 'Infos à venir :) ',
            stage: [
              {
                name: 'Rhuddanien',
                stageStart: -443.8,
                stageEnd: -440.8,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Aéronien',
                stageStart: -440.8,
                stageEnd: -438.5,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Télychien',
                stageStart: -438.5,
                stageEnd: -433.4,
                stageInfo: 'Infos à venir :) ',
              },
            ],
          },
          {
            name: 'Wenlock',
            epochStart: -433.4,
            epochEnd: -427.4,
            epochInfo: 'Infos à venir :) ',
            stage: [
              {
                name: 'Sheinwoodien',
                stageStart: -433.4,
                stageEnd: -430.5,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Homérien',
                stageStart: -430.5,
                stageEnd: -427.4,
                stageInfo: 'Infos à venir :) ',
              },
            ],
          },
          {
            name: 'Ludlow',
            epochStart: -427.4,
            epochEnd: -423,
            epochInfo: 'Infos à venir :) ',
            stage: [
              {
                name: 'Gorstien',
                stageStart: -427.4,
                stageEnd: -425.6,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Ludfordien',
                stageStart: -425.6,
                stageEnd: -423,
                stageInfo: 'Infos à venir :) ',
              },
            ],
          },
          {
            name: 'Pridoli',
            epochStart: -423,
            epochEnd: -419.2,
            epochInfo: 'Infos à venir :) ',
            stage: [
              {
                name: 'Pridolien',
                stageStart: -423,
                stageEnd: -419.2,
                stageInfo: 'Infos à venir :) ',
              },
            ],
          },
        ],
      },

      {
        name: 'Dévonien',
        periodInfo:
          "De −419 à −359 Ma, soit 60 Ma, le Dévonien a été nommé d'après le comté de Devon, en Angleterre. \n \n Le taux de dioxigène dans l'air est de 15%, tandis que le taux de dioxyde de carbone est d'environ 2200 ppm, soit 8 fois plus qu'avant la Révolution Industrielle du XIXè siècle. La température moyenne est de 20°C, mais il y eut des périodes où la température grimpait jusqu'à 30°C. Le niveau des mers est plus élevé qu'aujourd'hui. \n La vie y est majoritairement marine et ce sont les requins qui sont les principaux prédateurs. D'est durant le Dévonien que les premiers amphibiens sont apparus. \n Le Dévonien est aussi connu sous le nom d’'âge à effet de serre' ou encore d’'âge des fougères', la végétation (boisée comprise) prend de plus en plus de place sur la terre ferme. \n \n Au Dévonien supérieur (entre le Frasnien et le Famennien) a lieu la deuxième extinction massive, qui affecte jusqu’à 70 % des espèces vivantes. La cause de cette extinction reste inconnue.",
        periodStart: -419.2,
        periodEnd: -358.9,
        epochs: [
          {
            name: 'Inférieur',
            epochStart: -419.2,
            epochEnd: -393.3,
            epochInfo: 'Infos à venir :) ',
            stage: [
              {
                name: 'Lochkovien',
                stageStart: -419.2,
                stageEnd: -410.8,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Praguien',
                stageStart: -410.8,
                stageEnd: -407.6,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Emsien',
                stageStart: -407.6,
                stageEnd: -393.3,
                stageInfo: 'Infos à venir :) ',
              },
            ],
          },
          {
            name: 'Moyen',
            epochStart: -393.3,
            epochEnd: -382.7,
            epochInfo: 'Infos à venir :) ',
            stage: [
              {
                name: 'Eifélien',
                stageStart: -393.3,
                stageEnd: -387.7,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Givétien',
                stageStart: -387.7,
                stageEnd: -382.7,
                stageInfo: 'Infos à venir :) ',
              },
            ],
          },
          {
            name: 'Supérieur',
            epochStart: -382.7,
            epochEnd: -358.9,
            epochInfo: 'Infos à venir :) ',
            stage: [
              {
                name: 'Frasnien',
                stageStart: -382.7,
                stageEnd: -372.2,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Famennien',
                stageStart: -372.2,
                stageEnd: -358.9,
                stageInfo: 'Infos à venir :) ',
              },
            ],
          },
        ],
      },

      {
        name: 'Carbonifère',
        periodInfo:
          "Le Carbonifère s'étend de −358,9 ± 0,4 à −298,9 ± 0,2 Ma, soit sur une durée de 60 Ma ± 0.6 Ma. Cette période tient son nom des vastes couches de charbon qu’il a laissées en Europe de l'Ouest.\n \n Le taux de dioxigène dans l'air est de 25%, tandis que le taux de dioxyde de carbone est d'environ 450 ppm, soit 2 fois plus qu'avant la Révolution Industrielle du XIXè siècle. La température moyenne est de 15°C. Durant le seconde partie du Carbonifère, le climat se refroidit au point qu'une glaciation dans les latitudes hautes de l'hémisphère sud est couvert de glace. Quand au niveau des mers, il est identique au Dévonien.\n \n La vie sur terre s'y est considérablement développée. Les arbres à écorce composent les forêts. Un taux de dioxyde de carbone relativement élevé a indéniablement encouragé la croissance de la végétation, mais la présence d'un taux élevé de dioxygène a également rendu les forêts plus vulnérables aux incendies, ce qui formait du chabon en grande quantité.\n \n Certains animaux du Carbonifère sont géants, pour ce qu'il sont et comparé aux espèces d'aujourd'hui: Les insectes et arthropodes était de tailles démesurées et cela s'explique aussi par le taux élevé d'dioxygène dans l'air. De plus, ces animaux n'avaient pratiquement pas de prédateurs, et du fait de forêts luxuriantes, ils avaient une nourriture abondante. C'est également à cette période que les premiers animaux à quatre pattes ont été créés.\n \n Le charbon a arrêté de se former à la fin du Carbonifère à cause de l'appartion champignons xylophages capable de dégrader le bois dans intégralité. \n \n C'est également durant le Carbonifère que se forme le supercontinent appelé 'Pangée' (signifiant 'toutes les terres' en grec) : Toutes les masses continentales se sont agglomérées pour former la plus grande île de l'Histoire de la Terre. Le paléo-océan entourant ce supercontinent est appelé 'Panthalassa'.",
        periodStart: -358.9,
        periodEnd: -298.9,
        epochs: [
          {
            name: 'Mississippien',
            epochStart: -358.9,
            epochEnd: -323.2,
            epochInfo: 'Infos à venir :) ',
            stage: [
              {
                name: 'Tournaisien',
                stageStart: -358.9,
                stageEnd: -346.7,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Viséen',
                stageStart: -346.7,
                stageEnd: -330.9,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Serpukhovien',
                stageStart: -330.9,
                stageEnd: -323.2,
                stageInfo: 'Infos à venir :) ',
              },
            ],
          },
          {
            name: 'Pennsylvanien',
            epochStart: -323.2,
            epochEnd: -298.9,
            epochInfo: 'Infos à venir :) ',
            stage: [
              {
                name: 'Bachkirien',
                stageStart: -323.2,
                stageEnd: -315.2,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Moscovien',
                stageStart: -315.2,
                stageEnd: -307,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Kasimovien',
                stageStart: -307,
                stageEnd: -303.7,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Gzhélien',
                stageStart: -303.7,
                stageEnd: -298.9,
                stageInfo: 'Infos à venir :) ',
              },
            ],
          },
        ],
      },

      {
        name: 'Permien',
        periodInfo:
          "Le Permien s'étend de -298,9 ± 0,2 à -252,2 ± 0,5 Ma, soit sur une durée de 46.4 Ma ± 1 Ma. Le Permien a été nommé d'après la province russe de Perm où se situent des gisements fossilifères de cette période. \n \n Le taux de dioxigène dans l'air est de 23%, tandis que le taux de dioxyde de carbone est d'environ 90 ppm, soit 3 fois plus qu'avant la Révolution Industrielle du XIXè siècle. La température moyenne est de 16°C. Le niveau des mers permienne sont restés assez bas. \n \n Toutes les masses continentales, à l'exception d'une portion de l'Asie du Sud-Est, étaient agglomérées en un seul supercontinent appelé Pangée, qui s'étendait de l'équateur aux pôles, entouré par un océan nommé Panthalassa. Cette période géologique voit le début du processus de rifting qui entraîne le morcellement de la Pangée. Se développe ainsi la Téthys, un paléo-océan qui s'ouvre progressivement à partir du Permien supérieur d'est en ouest à travers la Pangée. \n Ce grand continent crée des conditions climatiques impliquant de grandes variations de température et de précipitations (donc d'érosion) selon les saisons et les moments de la journée. En son centre, la température peut passer de 0 °C à 40 °C dans la journée. De ce fait, certains amimaux (tels Dimétrodon ou Édaphosaurus) survivent grâce à leur célèbres voiles dorsales jouant un rôle de thermorégulateur. \n \n Le règne animal est marqué par les premiers bipèdes, les reptiles mammaliens et la dispartion des trilobites. Quant à la flore, nous y aurions découverts les premières plantes en forme de palmier. \n \n La fin du Permien connait la troisième extinction de masse de l'histoire de la Terre : l'extinction 'Permien-Trias', marquant ainsi la fin du Paléozoïque et le début du Mésozoïque.",
        periodStart: -298.9,
        periodEnd: -252.17,
        epochs: [
          {
            name: 'Cisuralien',
            epochStart: -298.9,
            epochEnd: -272.95,
            epochInfo: 'Infos à venir :) ',
            stage: [
              {
                name: 'Assélien',
                stageStart: -298.9,
                stageEnd: -295,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Sakmarien',
                stageStart: -295,
                stageEnd: -290.1,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Artinskien',
                stageStart: -290.1,
                stageEnd: -283.5,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Kungurien',
                stageStart: -283.5,
                stageEnd: -272.95,
                stageInfo: 'Infos à venir :) ',
              },
            ],
          },
          {
            name: 'Guadalupien',
            epochStart: -272.95,
            epochEnd: -259.8,
            epochInfo: 'Infos à venir :) ',
            stage: [
              {
                name: 'Roadien',
                stageStart: -272.95,
                stageEnd: -268.8,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Wordien',
                stageStart: -268.8,
                stageEnd: -265.1,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Capitanien',
                stageStart: -265.1,
                stageEnd: -259.8,
                stageInfo: 'Infos à venir :) ',
              },
            ],
          },
          {
            name: 'Lopingien',
            epochStart: -259.8,
            epochEnd: -252.17,
            epochInfo: 'Infos à venir :) ',
            stage: [
              {
                name: 'Wuchiapingien',
                stageStart: -259.8,
                stageEnd: -254.14,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Changhsingien',
                stageStart: -254.14,
                stageEnd: -252.17,
                stageInfo: 'Infos à venir :) ',
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
      "Le Mésozoïque est la deuxième des trois divisions de l'éon 'Phanérozoïque' et est une ère géologique qui s'étend de -251 millions d'années à -65,5 millions d'années, soit une durée de 185,5 millions d'années. Il est subdivisé en trois périodes : le Trias (-251 à -199,6 Ma), le Jurassique (-199,6 à -145,5 Ma) et le Crétacé (-145,5 à -65,5 Ma). \n\n Sur le plan géologique, le Mésozoïque est marqué par la dislocation du supercontinent Pangée, qui se fragmente pour former les continents modernes. Cette fragmentation s'accompagne d'une forte activité volcanique, générant des conditions favorables à l'accumulation de CO2 dans l'atmosphère et à l'installation d'un climat globalement chaud et stable. \n\n Sur le plan de la vie, le Mésozoïque est surnommé 'l'ère des reptiles' en raison de la domination des dinosaures sur les milieux terrestres. Outre les dinosaures, on trouve également d'autres reptiles marins comme les ichtyosaures, plésiosaures et mosasaures, ainsi que les premiers oiseaux primitifs dérivés des dinosaures. Dans les océans, les mollusques céphalopodes comme les bélemnites et les ammonites sont très diversifiés et abondants, jouant un rôle majeur pour la datation biostratigraphique. On trouve également des échinides, crinoïdes et autres invertébrés marins. \n\n Sur le plan de la flore, les gymnospermes (conifères, cycadales) dominent largement jusqu'à la fin du Jurassique, avant que les angiospermes (plantes à fleurs) n'apparaissent et ne se diversifient au cours du Crétacé. \n\n Le Mésozoïque est délimité par deux grandes crises biologiques majeures : la crise du Permien-Trias et la crise du Crétacé-Tertiaire, qui a vu la disparition de la grande majorité des dinosaures.",
    eraStart: -252.17,
    eraEnd: -66,
    periods: [
      {
        name: 'Trias',
        periodInfo: 'Infos à venir :) ',
        periodStart: -252.17,
        periodEnd: -201.3,
        epochs: [
          {
            name: 'Inférieur',
            epochStart: -252.17,
            epochEnd: -247.2,
            epochInfo: 'Infos à venir :) ',
            stage: [
              {
                name: 'Indusien',
                stageStart: -252.17,
                stageEnd: -251.2,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Olénékien',
                stageStart: -251.2,
                stageEnd: -247.2,
                stageInfo: 'Infos à venir :) ',
              },
            ],
          },
          {
            name: 'Moyen',
            epochStart: -247.2,
            epochEnd: -237,
            epochInfo: 'Infos à venir :) ',
            stage: [
              {
                name: 'Anisien',
                stageStart: -247.2,
                stageEnd: -242,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Ladinien',
                stageStart: -242,
                stageEnd: -237,
                stageInfo: 'Infos à venir :) ',
              },
            ],
          },
          {
            name: 'Supérieur',
            epochStart: -237,
            epochEnd: -201.3,
            epochInfo: 'Infos à venir :) ',
            stage: [
              {
                name: 'Carnien',
                stageStart: -237,
                stageEnd: -227,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Norien',
                stageStart: -227,
                stageEnd: -208.5,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Rhétien',
                stageStart: -208.5,
                stageEnd: -201.3,
                stageInfo: 'Infos à venir :) ',
              },
            ],
          },
        ],
      },

      {
        name: 'Jurassique',
        periodInfo: 'Infos à venir :) ',
        periodStart: -201.3,
        periodEnd: -145,
        epochs: [
          {
            name: 'Inférieur',
            epochStart: -201.3,
            epochEnd: -247.2,
            epochInfo: 'Infos à venir :) ',
            stage: [
              {
                name: 'Hettangien',
                stageStart: -201.3,
                stageEnd: -199.3,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Sinémurien',
                stageStart: -199.3,
                stageEnd: -190.8,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Pliensbachien',
                stageStart: -190.8,
                stageEnd: -182.7,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Toarcien',
                stageStart: -182.7,
                stageEnd: -174.1,
                stageInfo: 'Infos à venir :) ',
              },
            ],
          },
          {
            name: 'Moyen',
            epochStart: -174.1,
            epochEnd: -163.5,
            epochInfo: 'Infos à venir :) ',
            stage: [
              {
                name: 'Aalénien',
                stageStart: -174.1,
                stageEnd: -170.3,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Bajocien',
                stageStart: -170.3,
                stageEnd: -168.3,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Bathonien',
                stageStart: -168.3,
                stageEnd: -166.1,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Callovien',
                stageStart: -166.1,
                stageEnd: -163.5,
                stageInfo: 'Infos à venir :) ',
              },
            ],
          },
          {
            name: 'Supérieur',
            epochStart: -163.5,
            epochEnd: -145,
            epochInfo: 'Infos à venir :) ',
            stage: [
              {
                name: 'Oxfordien',
                stageStart: -163.5,
                stageEnd: -157.3,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Kimméridgien',
                stageStart: -157.3,
                stageEnd: -152.1,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Tithonien',
                stageStart: -152.1,
                stageEnd: -145,
                stageInfo: 'Infos à venir :) ',
              },
            ],
          },
        ],
      },

      {
        name: 'Crétacé',
        periodInfo: 'Infos à venir :) ',
        periodStart: -145,
        periodEnd: -66,
        epochs: [
          {
            name: 'Inférieur',
            epochStart: -145,
            epochEnd: -100.5,
            epochInfo: 'Infos à venir :) ',
            stage: [
              {
                name: 'Berriasien',
                stageStart: -145,
                stageEnd: -139.8,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Valanginien',
                stageStart: -139.8,
                stageEnd: -132.9,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Hauterivien',
                stageStart: -132.9,
                stageEnd: -129.4,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Barrémien',
                stageStart: -129.4,
                stageEnd: -125,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Aptien',
                stageStart: -125,
                stageEnd: -113,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Albien',
                stageStart: -113,
                stageEnd: -100.5,
                stageInfo: 'Infos à venir :) ',
              },
            ],
          },

          {
            name: 'Supérieur',
            epochStart: -100.5,
            epochEnd: -66,
            epochInfo: 'Infos à venir :) ',
            stage: [
              {
                name: 'Cénomanien',
                stageStart: -100.5,
                stageEnd: -93.9,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Turonien',
                stageStart: -93.9,
                stageEnd: -89.8,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Coniacien',
                stageStart: -89.8,
                stageEnd: -86.3,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Santonien',
                stageStart: -86.3,
                stageEnd: -83.6,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Campanien',
                stageStart: -83.6,
                stageEnd: -72.1,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Maastrichtien',
                stageStart: -72.1,
                stageEnd: -66,
                stageInfo: 'Infos à venir :) ',
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
      "Le Cénozoïque est la troisième et dernière des trois divisions de l'éon 'Phanérozoïque' et est l'ère géologique la plus récente, s'étendant de -66 millions d'années à aujourd'hui. Elle est composée de trois périodes principales : le Paléogène (-66 à -23,03 Ma), le Néogène (-23,03 Ma à -2.58 Ma) et le Quaternaire (-2.58 Ma à aujourd'hui). \n\n Les dinosaures ayant disparus, le Cénozoïque est caractérisé par l'avènement des mammifères et des oiseaux. \n\n Le climat était généralement plus chaud qu'aujourd'hui, avec des forêts denses mais peu diversifiées dans un premier temps, avant que les prairies ne se développent à l'Oligocène. \n\n Au Néogène, le climat se refroidit progressivement, favorisant le développement des prairies. Les continents prennent leur forme actuelle, avec la formation de l'isthme de Panama reliant les Amériques. \n\n Plus près de nous, le Quaternaire est marqué par des cycles de glaciations et de réchauffements climatiques, mais également avec la création de l'Homme.",
    eraStart: -66,
    eraEnd: currentYear,
    periods: [
      {
        name: 'Paléogène',
        periodInfo: 'Infos à venir :) ',
        periodStart: -66,
        periodEnd: -23.03,
        epochs: [
          {
            name: 'Paléocène',
            epochStart: -66,
            epochEnd: -56,
            epochInfo: 'Infos à venir :) ',
            stage: [
              {
                name: 'Danien',
                stageStart: -66,
                stageEnd: -61.6,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Sélandien',
                stageStart: -61.6,
                stageEnd: -59.2,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Thanétien',
                stageStart: -59.2,
                stageEnd: -56,
                stageInfo: 'Infos à venir :) ',
              },
            ],
          },
          {
            name: 'Éocène',
            epochStart: -56,
            epochEnd: -33.9,
            epochInfo: 'Infos à venir :) ',
            stage: [
              {
                name: 'Yprésien',
                stageStart: -56,
                stageEnd: -47.8,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Lutétien',
                stageStart: -47.8,
                stageEnd: -41.2,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Bartonien',
                stageStart: -41.2,
                stageEnd: -37.8,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Priabonien',
                stageStart: -37.8,
                stageEnd: -33.9,
                stageInfo: 'Infos à venir :) ',
              },
            ],
          },
          {
            name: 'Oligocène',
            epochStart: -33.9,
            epochEnd: -23.03,
            epochInfo: 'Infos à venir :) ',
            stage: [
              {
                name: 'Rupélien',
                stageStart: -33.9,
                stageEnd: -28.1,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Chattien',
                stageStart: -28.1,
                stageEnd: -23.03,
                stageInfo: 'Infos à venir :) ',
              },
            ],
          },
        ],
      },

      {
        name: 'Néogène',
        periodInfo: 'Infos à venir :) ',
        periodStart: -23.03,
        periodEnd: -2.58,
        epochs: [
          {
            name: 'Miocène',
            epochStart: -23.03,
            epochEnd: -5.333,
            epochInfo: 'Infos à venir :) ',
            stage: [
              {
                name: 'Aquitanien',
                stageStart: -23.03,
                stageEnd: -20.44,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Burdigalien',
                stageStart: -20.44,
                stageEnd: -15.97,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Langhien',
                stageStart: -15.97,
                stageEnd: -13.82,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Serravallien',
                stageStart: -13.82,
                stageEnd: -11.63,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Tortonien',
                stageStart: -11.63,
                stageEnd: -7.246,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Messinien',
                stageStart: -7.246,
                stageEnd: -5.333,
                stageInfo: 'Infos à venir :) ',
              },
            ],
          },
          {
            name: 'Pliocène',
            epochStart: -5.333,
            epochEnd: -2.58,
            epochInfo: 'Infos à venir :) ',
            stage: [
              {
                name: 'Zancléen',
                stageStart: -5.333,
                stageEnd: -3.6,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Plaisancien',
                stageStart: -3.6,
                stageEnd: -2.58,
                stageInfo: 'Infos à venir :) ',
              },
            ],
          },
        ],
      },

      {
        name: 'Quaternaire',
        periodInfo: 'Infos à venir :) ',
        periodStart: -2.58,
        periodEnd: currentYear,
        epochs: [
          {
            name: 'Pléistocène',
            epochStart: -2.58,
            epochEnd: -0.0117,
            epochInfo: 'Infos à venir :) ',
            stage: [
              {
                name: 'Gélasien',
                stageStart: -2.58,
                stageEnd: -1.8,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Calabrien',
                stageStart: -1.8,
                stageEnd: -0.781,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Pléistocène moyen',
                stageStart: -0.781,
                stageEnd: -0.126,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Pléistocène supérieur',
                stageStart: -0.126,
                stageEnd: -0.0117,
                stageInfo: 'Infos à venir :) ',
              },
            ],
          },
          {
            name: 'Holocène',
            epochStart: -0.0117,
            epochEnd: currentYear,
            epochInfo: 'Infos à venir :) ',
            stage: [
              {
                name: 'Greenlandien',
                stageStart: -0.0117,
                stageEnd: -0.0082,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Northgrippien',
                stageStart: -0.0082,
                stageEnd: -0.0042,
                stageInfo: 'Infos à venir :) ',
              },
              {
                name: 'Méghalayen',
                stageStart: -0.0042,
                stageEnd: currentYear,
                stageInfo: 'Infos à venir :) ',
              },
            ],
          },
        ],
      },
    ],
  },
];
export default timelineData;
