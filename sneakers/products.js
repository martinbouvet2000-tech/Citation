/* =============================================================================
   VÉLOCE v2 — STOCK (photo-first : 1 photo = 1 paire = 1 fiche)
   -----------------------------------------------------------------------------
   • name  : modèle (pré-identifié depuis la photo — corrigez si besoin)
   • cw    : coloris en toutes lettres
   • size  : pointure EU de LA paire (ex. 42.5) — null = à renseigner
   • price : prix en € — null = "Sur demande"
   • sold  : true quand la paire est vendue
   Étiquetage rapide : ouvrir le site → pied de page "Gérer" → code admin.
============================================================================= */
const STOCK = [
 {
  "id": 1,
  "photo": "pair-01.jpg",
  "name": "Nike Shox TL",
  "cw": "Blanc",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 2,
  "photo": "pair-02.jpg",
  "name": "Nike Shox R4",
  "cw": "Beige / Marron",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 3,
  "photo": "pair-03.jpg",
  "name": "Nike Shox TL",
  "cw": "Gris",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 4,
  "photo": "pair-04.jpg",
  "name": "Nike Air Max 1",
  "cw": "Jaune / Bleu",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 5,
  "photo": "pair-05.jpg",
  "name": "Nike Training",
  "cw": "Gris / Jaune",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 6,
  "photo": "pair-06.jpg",
  "name": "Nike Shox TL",
  "cw": "Blanc",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 7,
  "photo": "pair-07.jpg",
  "name": "Nike Air Max Dn",
  "cw": "Rose / Jaune",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 8,
  "photo": "pair-08.jpg",
  "name": "Nike Air Force 1 Low",
  "cw": "Blanc",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 9,
  "photo": "pair-09.jpg",
  "name": "Nike Shox TL",
  "cw": "Blanc / Noir",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 10,
  "photo": "pair-10.jpg",
  "name": "Nike Air Max 1",
  "cw": "Bleu / Blanc",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 11,
  "photo": "pair-11.jpg",
  "name": "Nike Air Max Dn",
  "cw": "Noir / Blanc",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 12,
  "photo": "pair-12.jpg",
  "name": "Nike P-6000",
  "cw": "Blanc / Rouge",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 13,
  "photo": "pair-13.jpg",
  "name": "Nike Shox TL",
  "cw": "Orange / Rouge",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 14,
  "photo": "pair-14.jpg",
  "name": "Nike Shox TL",
  "cw": "Gris",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 15,
  "photo": "pair-15.jpg",
  "name": "Nike Cortez",
  "cw": "Beige",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 16,
  "photo": "pair-16.jpg",
  "name": "Nike Air Max Dn",
  "cw": "Noir / Blanc",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 17,
  "photo": "pair-17.jpg",
  "name": "Nike ACG Wildwood",
  "cw": "Marron",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 18,
  "photo": "pair-18.jpg",
  "name": "Nike Air Max Dn",
  "cw": "Violet / Bleu",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 19,
  "photo": "pair-19.jpg",
  "name": "Nike Zoom Vomero 5",
  "cw": "Blanc / Gris",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 20,
  "photo": "pair-20.jpg",
  "name": "Nike Air Max 1",
  "cw": "Blanc / Bleu",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 21,
  "photo": "pair-21.jpg",
  "name": "Nike Air Max Dn",
  "cw": "Blanc / Bleu",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 22,
  "photo": "pair-22.jpg",
  "name": "Nike Air Max 95",
  "cw": "Blanc / Gris",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 23,
  "photo": "pair-23.jpg",
  "name": "Nike Cortez",
  "cw": "Orange / Jaune",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 24,
  "photo": "pair-24.jpg",
  "name": "Nike Air Force 1 Low",
  "cw": "Blanc",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 25,
  "photo": "pair-25.jpg",
  "name": "Nike Shox TL",
  "cw": "Argent / Gris",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 26,
  "photo": "pair-26.jpg",
  "name": "Nike Air Force 1 Low",
  "cw": "Blanc / Rose",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 27,
  "photo": "pair-27.jpg",
  "name": "Nike Air Max Plus TN",
  "cw": "Orange / Jaune",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 28,
  "photo": "pair-28.jpg",
  "name": "Nike Boot montante",
  "cw": "Noir",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 29,
  "photo": "pair-29.jpg",
  "name": "Nike Air Max Dn",
  "cw": "Gris / Noir",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 30,
  "photo": "pair-30.jpg",
  "name": "Nike Boot montante",
  "cw": "Noir",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 31,
  "photo": "pair-31.jpg",
  "name": "Nike Air Max Dn",
  "cw": "Blanc / Violet",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 32,
  "photo": "pair-32.jpg",
  "name": "Nike Air Max Plus TN",
  "cw": "Orange",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 33,
  "photo": "pair-33.jpg",
  "name": "Nike Shox TL",
  "cw": "Gris",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 34,
  "photo": "pair-34.jpg",
  "name": "Nike Air Max 95",
  "cw": "Blanc",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 35,
  "photo": "pair-35.jpg",
  "name": "Nike Air Max 1",
  "cw": "Blanc / Bleu",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 36,
  "photo": "pair-36.jpg",
  "name": "Nike Shox TL",
  "cw": "Noir / Blanc",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 37,
  "photo": "pair-37.jpg",
  "name": "Nike Shox TL",
  "cw": "Gris / Blanc",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 38,
  "photo": "pair-38.jpg",
  "name": "Nike Shox TL",
  "cw": "Rouge / Jaune",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 39,
  "photo": "pair-39.jpg",
  "name": "Nike Air Max Dn",
  "cw": "Blanc / Violet",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 40,
  "photo": "pair-40.jpg",
  "name": "Nike Air Max Dn",
  "cw": "Noir / Orange",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 41,
  "photo": "pair-41.jpg",
  "name": "Nike Air Max Plus TN",
  "cw": "Noir / Jaune",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 42,
  "photo": "pair-42.jpg",
  "name": "Nike Boot montante",
  "cw": "Blanc",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 43,
  "photo": "pair-43.jpg",
  "name": "Nike Air Max Dn",
  "cw": "Bleu / Violet",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 44,
  "photo": "pair-44.jpg",
  "name": "Nike Dunk Low",
  "cw": "Blanc / Bleu",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 45,
  "photo": "pair-45.jpg",
  "name": "Nike Air Max Dn",
  "cw": "Blanc / Jaune",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 46,
  "photo": "pair-46.jpg",
  "name": "Nike Shox TL",
  "cw": "Blanc / Argent",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 47,
  "photo": "pair-47.jpg",
  "name": "Nike Air Max 1",
  "cw": "Blanc / Gris",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 48,
  "photo": "pair-48.jpg",
  "name": "Nike Zoom Vomero 5",
  "cw": "Gris / Bleu",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 49,
  "photo": "pair-49.jpg",
  "name": "Nike Air Force 1 Low",
  "cw": "Blanc / Rouge",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 50,
  "photo": "pair-50.jpg",
  "name": "Jordan",
  "cw": "Jaune / Bleu",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 51,
  "photo": "pair-51.jpg",
  "name": "Nike Zoom Vomero 5",
  "cw": "Blanc / Marron",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 52,
  "photo": "pair-52.jpg",
  "name": "Nike Air Max SC",
  "cw": "Blanc / Gris / Jaune",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 53,
  "photo": "pair-53.jpg",
  "name": "Nike Air Force 1 Low",
  "cw": "Blanc / Vert",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 54,
  "photo": "pair-54.jpg",
  "name": "Nike Air Force 1 Low",
  "cw": "Blanc",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 55,
  "photo": "pair-55.jpg",
  "name": "Nike Air Force 1 Low",
  "cw": "Blanc / Rose",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 56,
  "photo": "pair-56.jpg",
  "name": "Nike Air Max 1",
  "cw": "Blanc / Bleu",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 57,
  "photo": "pair-57.jpg",
  "name": "Nike Shox TL",
  "cw": "Blanc / Gris",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 58,
  "photo": "pair-58.jpg",
  "name": "Nike Air Max Dn",
  "cw": "Noir / Gris",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 59,
  "photo": "pair-59.jpg",
  "name": "Nike Dunk Low",
  "cw": "Noir / Vert",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 60,
  "photo": "pair-60.jpg",
  "name": "Nike Air Force 1 Low",
  "cw": "Blanc",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 61,
  "photo": "pair-61.jpg",
  "name": "Nike Air Max Dn",
  "cw": "Gris / Rose",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 62,
  "photo": "pair-62.jpg",
  "name": "Nike Air Max 95",
  "cw": "Blanc",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 63,
  "photo": "pair-63.jpg",
  "name": "Nike Dunk Low",
  "cw": "Blanc / Vert / Jaune",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 64,
  "photo": "pair-64.jpg",
  "name": "Nike Shox R4",
  "cw": "Gris",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 65,
  "photo": "pair-65.jpg",
  "name": "Nike Dunk Low",
  "cw": "Blanc / Violet / Vert",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 66,
  "photo": "pair-66.jpg",
  "name": "Nike Air Max Dn",
  "cw": "Gris / Noir",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 67,
  "photo": "pair-67.jpg",
  "name": "Nike Air Max Dn",
  "cw": "Gris",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 68,
  "photo": "pair-68.jpg",
  "name": "Nike P-6000",
  "cw": "Blanc / Gris",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 69,
  "photo": "pair-69.jpg",
  "name": "Nike Air Max Plus TN",
  "cw": "Jaune / Vert",
  "size": null,
  "price": null,
  "sold": false
 },
 {
  "id": 70,
  "photo": "pair-70.jpg",
  "name": "Nike Shox TL",
  "cw": "Blanc / Gris",
  "size": null,
  "price": null,
  "sold": false
 }
];
