/* =============================================================================
   VÉLOCE — CATALOGUE PRODUITS
   -----------------------------------------------------------------------------
   👉 POUR AJOUTER UNE CHAUSSURE : copiez le modèle ci-dessous, collez-le dans
      la liste, remplissez les champs, et ajoutez la photo dans le dossier "img/".

   MODÈLE À COPIER (les champs marqués (option) sont facultatifs) :

   {
     name:   'Nike Air Max 90',     // Nom du modèle
     brand:  'Nike',                // Marque  -> crée un filtre automatiquement
     sport:  'Lifestyle',           // Running | Fitness | Football | Basketball | Tennis | Lifestyle
     price:  149,                   // Prix en €
     img:    'air-max-90.jpg',      // (option) nom du fichier photo placé dans img/
     old:    179,                   // (option) ancien prix -> affiche une promo
     tech:   'Amorti Air',          // (option) technologie -> filtre automatique
     colors: ['Blanc','Rouge'],     // (option) Noir Blanc Volt Bleu Rouge Orange Rose Vert Gris
                                    //          (ou un code couleur ex. '#00aaff')
     sizes:  [40,41,42,43,44],      // (option) tailles EU disponibles (sinon 38->46)
     outSizes:[38],                 // (option) tailles en rupture (barrées)
     weight: 280,                   // (option) poids en grammes
     drop:   10,                    // (option) drop en mm
     rating: 4.7,                   // (option) note /5
     reviews:42,                    // (option) nombre d'avis
     new:    true,                  // (option) badge "Nouveau" + mis en avant
     promo:  true,                  // (option) badge promo (nécessite "old")
     pop:    90,                    // (option) popularité 0-100 (tri best-sellers)
     desc:   'Description du modèle.'// (option) texte de la fiche produit
   },

   ⚠️  Ne pas oublier la VIRGULE après chaque accolade } et garder les guillemets.
   Si rien ne s'affiche après une modification, c'est souvent une virgule ou un
   guillemet manquant : vérifiez le dernier produit ajouté.
============================================================================= */

const P = [
  /* ===== Sélection réelle en stock (photos authentiques) ===== */
  {id:101,name:'Nike Shox TL',brand:'Nike',sport:'Lifestyle',tech:'Amorti Shox',price:179,old:199,rating:4.9,reviews:208,weight:430,drop:10,colors:['Blanc'],c:['#e9edf4','#d8dde6','#cfd4dd'],photos:['shox-tl-blanc.jpg']  /* ajoutez d'autres photos ici: ,'shox-tl-blanc-2.jpg' */,new:true,pop:99,promo:true,desc:"L'icône Nike Shox dans un coloris crème intemporel. Ses quatre colonnes Shox restituent l'énergie à chaque pas pour un amorti spectaculaire et un style streetwear inimitable. Pièce authentique en stock."},
  {id:102,name:'Nike Air Max Dn',brand:'Nike',sport:'Lifestyle',tech:'Air Dynamic',price:169,old:null,rating:4.8,reviews:176,weight:360,drop:8,colors:['Noir','Orange'],c:['#1c1f26','#ff5a1f','#8a93a6'],photos:['airmax-dn-noir.jpg']  /* ajoutez d'autres photos ici: ,'airmax-dn-noir-2.jpg' */,new:true,pop:98,desc:"La nouvelle génération Air Max Dn et son unité Dynamic Air à double chambre, pour une sensation de glisse réactive à chaque foulée. Coloris noir rehaussé d'accents orange. Pièce authentique en stock."},
  {id:103,name:'Nike Air Max Dn',brand:'Nike',sport:'Lifestyle',tech:'Air Dynamic',price:169,old:null,rating:4.8,reviews:142,weight:360,drop:8,colors:['Bleu','Noir'],c:['#2e7bff','#1c1f26','#8a93a6'],photos:['airmax-dn-bleu.jpg']  /* ajoutez d'autres photos ici: ,'airmax-dn-bleu-2.jpg' */,new:true,pop:96,desc:"L'Air Max Dn en finition bleu nuit. Tubes Dynamic Air visibles, maintien moderne et look futuriste pour porter la performance Nike au quotidien. Pièce authentique en stock."},
  {id:104,name:'Nike Shox TL',brand:'Nike',sport:'Lifestyle',tech:'Amorti Shox',price:179,old:199,rating:4.9,reviews:154,weight:430,drop:10,colors:['Orange','Rouge'],c:['#ff5a1f','#ff3b3b','#1c1f26'],photos:['shox-tl-orange.jpg']  /* ajoutez d'autres photos ici: ,'shox-tl-orange-2.jpg' */,new:true,pop:94,promo:true,desc:"La Nike Shox TL dans un dégradé orange-rouge feu qui ne passe pas inaperçu. Le système Shox emblématique pour un confort dynamique et une allure résolument sportive. Pièce authentique en stock."},
  {id:105,name:'Nike Air Training',brand:'Nike',sport:'Fitness',tech:'Stabilité Training',price:109,old:129,rating:4.7,reviews:121,weight:330,drop:8,colors:['Gris','Blanc'],c:['#8a93a6','#e9edf4','#1c1f26'],photos:['air-trainer-gris.jpg']  /* ajoutez d'autres photos ici: ,'air-trainer-gris-2.jpg' */,new:true,pop:93,promo:true,desc:"Chaussure de training Nike Air, semelle blanche contrastée et unité Air au talon. Stable et polyvalente pour la salle, le cross-training et le quotidien. Pièce authentique en stock."},

  /* ===== Sélection vitrine ===== */
  {id:1,name:'AeroStride Pro',brand:'Velocity',sport:'Running',tech:'Amorti AirFlux',price:159,old:189,rating:4.8,reviews:312,weight:198,drop:8,colors:['Volt','Noir'],c:['#c6ff00','#1c1f26','#e9edf4'],new:true,pop:91,promo:true,desc:"Conçue pour la vitesse pure, l'AeroStride Pro combine une mousse AirFlux ultra-réactive et une tige en mesh respirant. Idéale pour le fractionné et la compétition sur route."},
  {id:2,name:'CloudRunner 4',brand:'Apex',sport:'Running',tech:'Mousse Réactive',price:139,old:null,rating:4.7,reviews:240,weight:236,drop:10,colors:['Bleu','Blanc'],c:['#2e7bff','#1c1f26','#e9edf4'],new:true,pop:92,desc:"Le confort longue distance par excellence. Un amorti moelleux qui absorbe les chocs kilomètre après kilomètre, pour les sorties longues et la récupération."},
  {id:3,name:'Tempo Elite Carbon',brand:'Velocity',sport:'Running',tech:'Plaque Carbone',price:229,old:null,rating:4.9,reviews:188,weight:205,drop:6,colors:['Orange','Noir'],c:['#ff5a1f','#1c1f26','#e9edf4'],new:true,pop:95,desc:"La plaque carbone propulse chaque foulée vers l'avant. Pensée pour les recordmen, elle transforme votre énergie en vitesse sur le marathon."},
  {id:4,name:'Forge Trainer X',brand:'Titan',sport:'Fitness',tech:'Stabilité Max',price:119,old:139,rating:4.6,reviews:276,weight:280,drop:4,colors:['Noir','Volt'],c:['#1c1f26','#c6ff00','#8a93a6'],new:false,pop:90,promo:true,desc:"La base stable parfaite pour le cross-training, l'haltérophilie et le HIIT. Un maintien latéral renforcé pour les mouvements explosifs en salle."},
  {id:5,name:'Pulse HIIT',brand:'Apex',sport:'Fitness',tech:'Grip Multi-surface',price:99,old:null,rating:4.5,reviews:198,weight:262,drop:6,colors:['Rose','Gris'],c:['#ff2e93','#1c1f26','#8a93a6'],new:false,pop:84,desc:"Légère et polyvalente, la Pulse HIIT vous suit du tapis au rack. Adhérence totale et flexibilité pour enchaîner les circuits sans temps mort."},
  {id:6,name:'PhantomStrike FG',brand:'Striker',sport:'Football',tech:'Crampons FG',price:179,old:199,rating:4.7,reviews:154,weight:210,drop:0,colors:['Volt','Noir'],c:['#c6ff00','#1c1f26','#19c37d'],new:false,pop:88,promo:true,desc:"Pour les terrains secs, la PhantomStrike offre un toucher de balle précis et des crampons FG taillés pour les accélérations et les changements de direction."},
  {id:7,name:'Velocità Mercurial',brand:'Striker',sport:'Football',tech:'Toucher de balle',price:209,old:null,rating:4.8,reviews:131,weight:196,drop:0,colors:['Rouge','Noir'],c:['#ff3b3b','#1c1f26','#e9edf4'],new:true,pop:91,desc:"La chaussure des ailiers rapides. Ultra-légère, seconde peau, elle libère votre explosivité sur les premiers mètres et dans les face-à-face."},
  {id:8,name:'SkyDunk Hi',brand:'Titan',sport:'Basketball',tech:'Amorti Zoom',price:169,old:null,rating:4.7,reviews:203,weight:340,drop:10,colors:['Noir','Orange'],c:['#1c1f26','#ff5a1f','#e9edf4'],new:false,pop:89,desc:"Une tige montante pour un maintien maximal de la cheville et un amorti Zoom réactif sous l'avant-pied. Conçue pour exploser au rebond et au dunk."},
  {id:9,name:'Crossover Elite',brand:'Apex',sport:'Basketball',tech:'Grip Pivot',price:149,old:179,rating:4.6,reviews:167,weight:325,drop:9,colors:['Bleu','Volt'],c:['#2e7bff','#c6ff00','#e9edf4'],new:false,pop:86,promo:true,desc:"Pensée pour les meneurs. Adhérence chirurgicale au pivot et stabilité dans les crossovers les plus serrés pour dribbler sans jamais glisser."},
  {id:10,name:'Court Ace Pro',brand:'Velocity',sport:'Tennis',tech:'Semelle Durable',price:129,old:null,rating:4.6,reviews:142,weight:300,drop:8,colors:['Blanc','Vert'],c:['#e9edf4','#19c37d','#8a93a6'],new:false,pop:83,desc:"Construite pour la terre battue et le dur. Renforts latéraux pour les appuis agressifs et semelle ultra-durable qui résiste aux glissades."},
  {id:11,name:'BaseLine Spin',brand:'Titan',sport:'Tennis',tech:'Stabilité Latérale',price:139,old:159,rating:4.5,reviews:118,weight:312,drop:8,colors:['Orange','Blanc'],c:['#ff5a1f','#e9edf4','#1c1f26'],new:true,pop:80,promo:true,desc:"Le compromis idéal entre confort et réactivité. Un maintien latéral rassurant pour défendre du fond de court et monter au filet en confiance."},
  {id:12,name:'Metro Lifestyle',brand:'Apex',sport:'Lifestyle',tech:'Confort Urbain',price:109,old:null,rating:4.4,reviews:421,weight:290,drop:10,colors:['Blanc','Gris'],c:['#e9edf4','#8a93a6','#1c1f26'],new:false,pop:85,desc:"Le sport au quotidien. Un design épuré et un amorti moelleux pour porter la performance dans la rue, du matin au soir, sans compromis sur le style."},
  {id:13,name:'Trail Blazer GTX',brand:'Velocity',sport:'Running',tech:'Grip Trail',price:169,old:189,rating:4.8,reviews:176,weight:295,drop:6,colors:['Vert','Noir'],c:['#19c37d','#1c1f26','#8a93a6'],new:true,pop:87,promo:true,desc:"Affrontez les sentiers les plus techniques. Une accroche redoutable et une protection imperméable pour la montagne et le trail par tous les temps."},
  {id:14,name:'Recovery Glide',brand:'Apex',sport:'Lifestyle',tech:'Amorti Max',price:99,old:null,rating:4.5,reviews:264,weight:275,drop:11,colors:['Bleu','Blanc'],c:['#2e7bff','#e9edf4','#8a93a6'],new:false,pop:79,desc:"La chaussure de récupération ultime. Un amorti maximal pour soulager les jambes après l'effort et garder un confort nuage toute la journée."},
  {id:15,name:'Sprint Spike 9',brand:'Striker',sport:'Running',tech:'Pointes Piste',price:149,old:null,rating:4.7,reviews:96,weight:165,drop:4,colors:['Rose','Noir'],c:['#ff2e93','#1c1f26','#c6ff00'],new:true,pop:82,desc:"La pointe de sprint pour la piste. Ultra-légère et agressive, elle est conçue pour les départs explosifs et les chronos sur 100 et 200 mètres."},
  {id:16,name:'Guardian High',brand:'Titan',sport:'Basketball',tech:'Maintien Cheville',price:189,old:219,rating:4.8,reviews:148,weight:355,drop:9,colors:['Noir','Volt'],c:['#1c1f26','#c6ff00','#8a93a6'],new:false,pop:88,promo:true,desc:"Protection maximale pour les intérieurs. Un col haut renforcé et un amorti dense qui encaisse les contacts sous le panier match après match."}
];
