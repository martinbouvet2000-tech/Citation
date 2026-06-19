/* VÉLOCE — catalogue de repli (fallback hors-ligne).
   Source de vérité = base cloud Supabase. Copie de secours affichée si
   le cloud est injoignable. 'sort' = rang d'affichage (1 = en tête). */
const STOCK = [
 {
  "id": 7,
  "name": "Air Jordan Tatum 2 'Lemonade'",
  "cw": "Rose / Bleu / Jaune",
  "sizes": [
   44.5
  ],
  "price": 35,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-07.jpg"
  ],
  "sort": 1
 },
 {
  "id": 27,
  "name": "Nike Air Max Plus TN",
  "cw": "Orange / Jaune",
  "sizes": [
   47.5
  ],
  "price": 40,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-27.jpg"
  ],
  "sort": 2
 },
 {
  "id": 2,
  "name": "Nike Dunk Low",
  "cw": "Marron / Blanc",
  "sizes": [
   44.5
  ],
  "price": 60,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-02.jpg"
  ],
  "sort": 3
 },
 {
  "id": 38,
  "name": "Nike Shox TL",
  "cw": "Rouge / Jaune",
  "sizes": [
   42.5
  ],
  "price": 65,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-38-b.jpg",
   "pair-38.jpg"
  ],
  "sort": 4
 },
 {
  "id": 18,
  "name": "Nike Air Max Dn",
  "cw": "Violet / Bleu",
  "sizes": [
   42
  ],
  "price": 50,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-18.jpg"
  ],
  "sort": 5
 },
 {
  "id": 69,
  "name": "Nike Air Max Plus TN",
  "cw": "Jaune / Vert",
  "sizes": [
   48.5
  ],
  "price": 70,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-69.jpg"
  ],
  "sort": 6
 },
 {
  "id": 37,
  "name": "Nike Dunk Low",
  "cw": "Noir / Blanc",
  "sizes": [
   44
  ],
  "price": 45,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-37.jpg"
  ],
  "sort": 7
 },
 {
  "id": 50,
  "name": "Jordan",
  "cw": "Jaune / Bleu",
  "sizes": [
   44.5
  ],
  "price": 60,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-50.jpg"
  ],
  "sort": 8
 },
 {
  "id": 20,
  "name": "Nike Shox R4",
  "cw": "Argent / Bleu / Noir",
  "sizes": [
   44
  ],
  "price": 55,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-20.jpg"
  ],
  "sort": 9
 },
 {
  "id": 31,
  "name": "Nike Air Max Dn",
  "cw": "Blanc / Violet",
  "sizes": [
   47.5
  ],
  "price": 70,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-31.jpg"
  ],
  "sort": 10
 },
 {
  "id": 41,
  "name": "Nike Air Max Plus TN",
  "cw": "Noir / Jaune",
  "sizes": [
   40
  ],
  "price": 55,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-41.jpg"
  ],
  "sort": 11
 },
 {
  "id": 5,
  "name": "Nike Air Force 1",
  "cw": "Noir mate / Blanc",
  "sizes": [
   40.5
  ],
  "price": 48,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-05.jpg"
  ],
  "sort": 12
 },
 {
  "id": 10,
  "name": "Nike Shox R4 GS",
  "cw": "Bleu / Gris / Noir",
  "sizes": [
   40
  ],
  "price": 55,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-10.jpg"
  ],
  "sort": 13
 },
 {
  "id": 12,
  "name": "Nike Air Max Dn",
  "cw": "Blanc / Rouge",
  "sizes": [
   42.5
  ],
  "price": 50,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-12.jpg"
  ],
  "sort": 14
 },
 {
  "id": 21,
  "name": "Nike Shox R4",
  "cw": "Blanc / Bleu / Argenté",
  "sizes": [
   40
  ],
  "price": 55,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-21.jpg"
  ],
  "sort": 15
 },
 {
  "id": 39,
  "name": "Nike Air Max Dn",
  "cw": "Blanc / Violet",
  "sizes": [
   47.5
  ],
  "price": 70,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-39.jpg"
  ],
  "sort": 16
 },
 {
  "id": 40,
  "name": "Nike Air Max Dn",
  "cw": "Noir / Orange",
  "sizes": [
   42.5
  ],
  "price": 50,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-40.jpg"
  ],
  "sort": 17
 },
 {
  "id": 46,
  "name": "Nike Shox TL",
  "cw": "Blanc / Argent",
  "sizes": [
   43
  ],
  "price": 55,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-46.jpg"
  ],
  "sort": 18
 },
 {
  "id": 14,
  "name": "Nike Shox TL",
  "cw": "Gris / Noir",
  "sizes": [
   40
  ],
  "price": 55,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-14.jpg"
  ],
  "sort": 19
 },
 {
  "id": 32,
  "name": "Nike Air Max Dn8",
  "cw": "Orange / Noir",
  "sizes": [
   39
  ],
  "price": 40,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-32.jpg"
  ],
  "sort": 20
 },
 {
  "id": 43,
  "name": "Nike Air Max Dn",
  "cw": "Bleu / Violet",
  "sizes": [
   42.5,
   42
  ],
  "price": 30,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-43.jpg"
  ],
  "sort": 21
 },
 {
  "id": 49,
  "name": "Nike Air Force 1 Low",
  "cw": "Blanc / Rouge",
  "sizes": [
   46
  ],
  "price": 50,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-49.jpg"
  ],
  "sort": 22
 },
 {
  "id": 56,
  "name": "Nike Air Max 1",
  "cw": "Blanc / Bleu",
  "sizes": [
   44.5
  ],
  "price": 60,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-56.jpg"
  ],
  "sort": 23
 },
 {
  "id": 25,
  "name": "Nike Shox TL",
  "cw": "Beige / Blanc",
  "sizes": [
   42.5
  ],
  "price": 50,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-25.jpg"
  ],
  "sort": 24
 },
 {
  "id": 59,
  "name": "Nike Shox TL",
  "cw": "Noir / Vert",
  "sizes": [
   43
  ],
  "price": 50,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-59.jpg"
  ],
  "sort": 25
 },
 {
  "id": 8,
  "name": "Nike Air Force 1 '07 LV 8",
  "cw": "Blanc / Gris",
  "sizes": [
   48.5
  ],
  "price": 50,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-08.jpg"
  ],
  "sort": 26
 },
 {
  "id": 15,
  "name": "Nike Shox TL",
  "cw": "Marron / Noir",
  "sizes": [
   43
  ],
  "price": 50,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-15.jpg"
  ],
  "sort": 27
 },
 {
  "id": 45,
  "name": "Nike Air Max Dn",
  "cw": "Blanc / Jaune",
  "sizes": [
   42.5
  ],
  "price": 35,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-45.jpg"
  ],
  "sort": 28
 },
 {
  "id": 19,
  "name": "Nike Zoom Vomero 5",
  "cw": "Blanc / Argent",
  "sizes": [
   44
  ],
  "price": 50,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-19.jpg"
  ],
  "sort": 29
 },
 {
  "id": 51,
  "name": "Nike Zoom Vomero 5",
  "cw": "Blanc / Marron",
  "sizes": [
   43
  ],
  "price": 30,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-51.jpg"
  ],
  "sort": 30
 },
 {
  "id": 22,
  "name": "Nike p6000",
  "cw": "Blanc / Gris",
  "sizes": [
   42.5
  ],
  "price": 50,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-22.jpg"
  ],
  "sort": 31
 },
 {
  "id": 68,
  "name": "Nike P-6000",
  "cw": "Blanc / Gris",
  "sizes": [
   42.5
  ],
  "price": 50,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-68.jpg"
  ],
  "sort": 32
 },
 {
  "id": 47,
  "name": "Nike Air Max 1",
  "cw": "Blanc / Gris",
  "sizes": [
   48.5
  ],
  "price": 35,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-47.jpg"
  ],
  "sort": 33
 },
 {
  "id": 62,
  "name": "Nike Air Max 95",
  "cw": "Blanc",
  "sizes": [
   48.5
  ],
  "price": 45,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-62.jpg"
  ],
  "sort": 34
 },
 {
  "id": 6,
  "name": "Nike Air Max Dn",
  "cw": "Blanc / Marron / Bleu",
  "sizes": [
   42.5
  ],
  "price": 50,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-06.jpg"
  ],
  "sort": 35
 },
 {
  "id": 9,
  "name": "Nike Air Max DN8",
  "cw": "Blanc / Noir / Vert",
  "sizes": [
   47.5
  ],
  "price": 50,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-09.jpg"
  ],
  "sort": 36
 },
 {
  "id": 48,
  "name": "Nike Air Dn8",
  "cw": "Gris / Noir / Rouge",
  "sizes": [
   48.5
  ],
  "price": 50,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-48.jpg"
  ],
  "sort": 37
 },
 {
  "id": 28,
  "name": "Nike Air Max Dn",
  "cw": "Noir / Bleu foncé",
  "sizes": [
   42
  ],
  "price": 50,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-28.jpg"
  ],
  "sort": 38
 },
 {
  "id": 61,
  "name": "Nike Air Max Dn",
  "cw": "Gris / Rose",
  "sizes": [
   43
  ],
  "price": 50,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-61.jpg"
  ],
  "sort": 39
 },
 {
  "id": 66,
  "name": "Nike Air Max Dn",
  "cw": "Gris / Noir / Blanc",
  "sizes": [
   45.5,
   47.5
  ],
  "price": 30,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-66.jpg"
  ],
  "sort": 40
 },
 {
  "id": 67,
  "name": "Nike Air Max Dn",
  "cw": "Noir / Bleu",
  "sizes": [
   45.43
  ],
  "price": 50,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-67.jpg"
  ],
  "sort": 41
 },
 {
  "id": 3,
  "name": "Nike Air Max DN8",
  "cw": "Gris",
  "sizes": [
   40
  ],
  "price": 55,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-03.jpg"
  ],
  "sort": 42
 },
 {
  "id": 29,
  "name": "Nike Air Max Dn",
  "cw": "Gris / Noir",
  "sizes": [
   42
  ],
  "price": 50,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-29.jpg"
  ],
  "sort": 43
 },
 {
  "id": 58,
  "name": "Nike Air Max Dn",
  "cw": "Noir / Gris",
  "sizes": [
   45.5
  ],
  "price": 50,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-58.jpg"
  ],
  "sort": 44
 },
 {
  "id": 64,
  "name": "Nike Shox R4",
  "cw": "Argent / Vert",
  "sizes": [
   42
  ],
  "price": 50,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-64.jpg"
  ],
  "sort": 45
 },
 {
  "id": 33,
  "name": "Nike Shox TL",
  "cw": "Gris",
  "sizes": [
   44
  ],
  "price": 45,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-33.jpg"
  ],
  "sort": 46
 },
 {
  "id": 42,
  "name": "Nike Air Force 1",
  "cw": "Blanc / Beige",
  "sizes": [
   42
  ],
  "price": 50,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-42.jpg"
  ],
  "sort": 47
 },
 {
  "id": 55,
  "name": "Nike Air Force 1 Low",
  "cw": "Blanc / Rose",
  "sizes": [
   42
  ],
  "price": 50,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-55.jpg"
  ],
  "sort": 48
 },
 {
  "id": 53,
  "name": "Nike Air Force 1 Low",
  "cw": "Blanc / Vert",
  "sizes": [
   42
  ],
  "price": 50,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-53.jpg"
  ],
  "sort": 49
 },
 {
  "id": 54,
  "name": "Nike Air Force 1 Low",
  "cw": "Blanc",
  "sizes": [
   42.43
  ],
  "price": 45,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-54.jpg"
  ],
  "sort": 50
 },
 {
  "id": 24,
  "name": "Nike Air Force 1 Low",
  "cw": "Blanc",
  "sizes": [],
  "price": 30,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-24.jpg"
  ],
  "sort": 51
 },
 {
  "id": 60,
  "name": "Nike Air Force 1 Low",
  "cw": "Blanc",
  "sizes": [
   44
  ],
  "price": 30,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-60.jpg"
  ],
  "sort": 52
 },
 {
  "id": 17,
  "name": "Nike ACG Wildwood",
  "cw": "Marron",
  "sizes": [
   42.5
  ],
  "price": 50,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-17.jpg"
  ],
  "sort": 53
 },
 {
  "id": 11,
  "name": "Nike Wmns Air Sunder Max 'Panda'",
  "cw": "Noir / Blanc",
  "sizes": [
   41
  ],
  "price": 50,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-11.jpg"
  ],
  "sort": 54
 },
 {
  "id": 16,
  "name": "Nike Wmns Air Sunder Max 'Panda'",
  "cw": "Noir / Blanc",
  "sizes": [
   40
  ],
  "price": 50,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-16.jpg"
  ],
  "sort": 55
 },
 {
  "id": 52,
  "name": "Nike Air Max SC",
  "cw": "Blanc / Gris / Jaune",
  "sizes": [
   49.5
  ],
  "price": 25,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-52.jpg"
  ],
  "sort": 56
 },
 {
  "id": 63,
  "name": "Nike Field General",
  "cw": "Blanc / Bleu / Beige",
  "sizes": [
   47.5
  ],
  "price": 30,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-63.jpg"
  ],
  "sort": 57
 },
 {
  "id": 26,
  "name": "Nike Initiator",
  "cw": "Blanc / Rose / Rouge",
  "sizes": [
   43
  ],
  "price": 30,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-26.jpg"
  ],
  "sort": 58
 },
 {
  "id": 65,
  "name": "Nike Mak Attack",
  "cw": "Blanc / Violet / Vert",
  "sizes": [
   44
  ],
  "price": 35,
  "sold": false,
  "draft": false,
  "photos": [
   "pair-65.jpg"
  ],
  "sort": 59
 },
 {
  "id": 13,
  "name": "Nike Shox TL",
  "cw": "Orange / Rouge",
  "sizes": [
   43
  ],
  "price": null,
  "sold": false,
  "draft": true,
  "photos": [
   "pair-13.jpg"
  ],
  "sort": 1
 },
 {
  "id": 23,
  "name": "Nike Cortez",
  "cw": "Jaune / Noir",
  "sizes": [],
  "price": null,
  "sold": false,
  "draft": true,
  "photos": [
   "pair-23.jpg"
  ],
  "sort": 2
 },
 {
  "id": 30,
  "name": "Nike Boot montante",
  "cw": "Noir",
  "sizes": [
   46
  ],
  "price": null,
  "sold": false,
  "draft": true,
  "photos": [
   "pair-30.jpg"
  ],
  "sort": 3
 },
 {
  "id": 34,
  "name": "Nike Shox TL",
  "cw": "Blanc / Crème (Sail)",
  "sizes": [],
  "price": null,
  "sold": false,
  "draft": true,
  "photos": [
   "pair-34.jpg"
  ],
  "sort": 4
 },
 {
  "id": 35,
  "name": "Nike Air Max 1",
  "cw": "Blanc / Bleu",
  "sizes": [
   44.5
  ],
  "price": null,
  "sold": false,
  "draft": true,
  "photos": [
   "pair-35.jpg"
  ],
  "sort": 5
 },
 {
  "id": 70,
  "name": "Nike Shox TL",
  "cw": "Blanc / Argent (Metallic)",
  "sizes": [],
  "price": null,
  "sold": false,
  "draft": true,
  "photos": [
   "pair-70.jpg"
  ],
  "sort": 6
 }
];
