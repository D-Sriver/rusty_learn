export const coursTree = [
  // Chapitre 1
  {
    key: 'chap1',
    label: 'Introduction',
    icon: 'BookOpen',
    children: [
      { key: 'chap1-pourquoi-ce-site-existe', label: 'Pourquoi ce site ?', importKey: 'Chap1PourquoiCeSiteExiste' },
      { key: 'chap1-a-qui-ca-sadresse', label: 'Pour qui ?', importKey: 'Chap1AQuiCaSAdresse' },
      { key: 'chap1-cest-quoi-rust-en-vrai', label: 'Rust, c’est quoi ?', importKey: 'Chap1CestQuoiRustEnVrai' },
      { key: 'chap1-ce-quon-va-apprendre-ensemble', label: 'On va apprendre quoi ?', importKey: 'Chap1CeQuOnVaApprendreEnsemble' },
    ],
  },
  // Chapitre 2
  {
    key: 'chap2',
    label: 'Installer Rust',
    icon: 'BookOpen',
    children: [
      { key: 'chap2-telecharger-et-installer-rust', label: 'Installe Rust (facile !)', importKey: 'Chap2TelechargerEtInstallerRust' },
      { key: 'chap2-verifier-que-tout-fonctionne', label: 'Tout marche ?', importKey: 'Chap2VerifierQueToutFonctionne' },
      { key: 'chap2-creer-son-tout-premier-projet', label: 'Premier projet, let’s go !', importKey: 'Chap2CreerSonToutPremierProjet' },
      { key: 'chap2-utiliser-un-editeur-de-texte', label: 'Ton éditeur préféré', importKey: 'Chap2UtiliserUnEditeurDeTexte' },
      { key: 'chap2-formater-son-code-avec-rustfmt', label: 'Code tout beau', importKey: 'Chap2FormaterSonCodeAvecRustfmt' },
      { key: 'chap2-verifier-son-code-avec-clippy', label: 'Clippy veille au grain', importKey: 'Chap2VerifierSonCodeAvecClippy' },
    ],
  },
  // Chapitre 3
  {
    key: 'chap3',
    label: 'Les bases de Rust',
    icon: 'BookOpen',
    children: [
      { key: 'chap3-les-variables-stocker-des-trucs', label: 'Les variables, c’est la base', importKey: 'Chap3LesVariablesStockerDesTrucs' },
      { key: 'chap3-les-types-de-base-nombres-texte-vrai-faux', label: 'Les types, tout simplement', importKey: 'Chap3LesTypesDeBaseNombresTexteVraiFaux' },
      { key: 'chap3-les-fonctions-decouper-le-code', label: 'Les fonctions, magiques', importKey: 'Chap3LesFonctionsDecouperLeCode' },
      { key: 'chap3-les-conditions-si-ceci-alors-cela', label: 'Les conditions, logique !', importKey: 'Chap3LesConditionsSiCeciAlorsCela' },
      { key: 'chap3-les-boucles-faire-des-trucs-plusieurs-fois', label: 'Les boucles, on tourne !', importKey: 'Chap3LesBouclesFaireDesTrucsPlusieursFois' },
      { key: 'chap3-les-listes-et-les-tableaux-stocker-plusieurs-choses', label: 'Listes & tableaux, on range tout', importKey: 'Chap3LesListesEtLesTableauxStockerPlusieursChoses' },
    ],
  },
  // Chapitre 4
  {
    key: 'chap4',
    label: 'Structurer ses données',
    icon: 'BookOpen',
    children: [
      { key: 'chap4-les-tuples-regrouper-quelques-valeurs', label: 'Les tuples, petits paquets', importKey: 'Chap4LesTuplesRegrouperQuelquesValeurs' },
      { key: 'chap4-les-structs-creer-ses-propres-types', label: 'Les structs, sur-mesure', importKey: 'Chap4LesStructsCreerSesPropresTypes' },
      { key: 'chap4-les-enums-choisir-entre-plusieurs-cas', label: 'Les enums, à toi de choisir', importKey: 'Chap4LesEnumsChoisirEntrePlusieursCas' },
      { key: 'chap4-le-match-reagir-a-chaque-cas', label: 'Match, la baguette magique', importKey: 'Chap4LeMatchReagirAChaqueCas' },
    ],
  },
  // Chapitre 5
  {
    key: 'chap5',
    label: 'Gestion mémoire',
    icon: 'BookOpen',
    children: [
      { key: 'chap5-lownership-qui-possede-quoi', label: 'Ownership, qui garde quoi ?', importKey: 'Chap5LOwnershipQuiPossedeQuoi' },
      { key: 'chap5-les-references-preter-sans-donner', label: 'Références, prêt sans don', importKey: 'Chap5LesReferencesPreterSansDonner' },
      { key: 'chap5-la-mutabilite-quand-on-peut-modifier-ou-pas', label: 'Mutabilité, on change ou pas ?', importKey: 'Chap5LaMutabiliteQuandOnPeutModifierOuPas' },
      { key: 'chap5-les-slices-prendre-un-morceau-dune-valeur', label: 'Slices, une part du gâteau', importKey: 'Chap5LesSlicesPrendreUnMorceauDUneValeur' },
      { key: 'chap5-les-durees-de-vie-lifetimes-combien-de-temps-vivent-les-donnees', label: 'Lifetimes, combien de temps ça vit ?', importKey: 'Chap5LesDureesDeVieLifetimesCombienDeTempsViventLesDonnees' },
    ],
  },
  // Chapitre 6
  {
    key: 'chap6',
    label: 'Outils du langage',
    icon: 'BookOpen',
    children: [
      { key: 'chap6-les-string-les-vec-les-hashmap', label: 'String, Vec & HashMap', importKey: 'Chap6LesStringLesVecLesHashMap' },
      { key: 'chap6-les-iterateurs-parcourir-des-donnees-facilement', label: 'Itérateurs, balade facile', importKey: 'Chap6LesIterateursParcourirDesDonneesFacilement' },
      { key: 'chap6-les-fonctions-anonymes-closures', label: 'Closures, fonctions surprises', importKey: 'Chap6LesFonctionsAnonymesClosures' },
      { key: 'chap6-les-options-gerer-les-valeurs-absentes', label: 'Option, parfois oui parfois non', importKey: 'Chap6LesOptionsGererLesValeursAbsentes' },
      { key: 'chap6-les-erreurs-ce-qui-peut-mal-tourner-et-comment-le-gerer', label: 'Erreurs, pas de panique', importKey: 'Chap6LesErreursCeQuiPeutMalTournerEtCommentLeGerer' },
    ],
  },
  // Chapitre 7
  {
    key: 'chap7',
    label: 'Code souple',
    icon: 'BookOpen',
    children: [
      { key: 'chap7-les-fonctions-generiques-faire-du-code-qui-sadapte', label: 'Fonctions génériques, caméléon', importKey: 'Chap7LesFonctionsGeneriquesFaireDuCodeQuiSAdapte' },
      { key: 'chap7-les-traits-definir-des-comportements-communs', label: 'Traits, le point commun', importKey: 'Chap7LesTraitsDefinirDesComportementsCommuns' },
      { key: 'chap7-les-trait-objects-utiliser-des-types-sans-les-connaitre-davance', label: 'Trait objects, mystère et boule de gomme', importKey: 'Chap7LesTraitObjectsUtiliserDesTypesSansLesConnaitreDAvance' },
    ],
  },
  // Chapitre 8
  {
    key: 'chap8',
    label: 'Projet Rust',
    icon: 'BookOpen',
    children: [
      { key: 'chap8-comprendre-comment-fonctionne-cargo', label: 'Cargo, le chef d’orchestre', importKey: 'Chap8ComprendreCommentFonctionneCargo' },
      { key: 'chap8-ajouter-des-bibliotheques-externes-crates', label: 'Crates, la boîte à outils', importKey: 'Chap8AjouterDesBibliothequesExternesCrates' },
      { key: 'chap8-decouper-son-code-en-modules', label: 'Modules, on range tout', importKey: 'Chap8DecouperSonCodeEnModules' },
      { key: 'chap8-ecrire-des-tests', label: 'Les tests, pour dormir tranquille', importKey: 'Chap8EcrireDesTests' },
      { key: 'chap8-generer-la-documentation-automatiquement', label: 'Doc auto, la classe', importKey: 'Chap8GenererLaDocumentationAutomatiquement' },
    ],
  },
  // Chapitre 9
  {
    key: 'chap9',
    label: 'Multi-tâches',
    icon: 'BookOpen',
    children: [
      { key: 'chap9-lancer-plusieurs-taches-a-la-fois', label: 'Plusieurs tâches, easy', importKey: 'Chap9LancerPlusieursTachesALaFois' },
      { key: 'chap9-partager-des-donnees-entre-taches', label: 'Partage entre tâches', importKey: 'Chap9PartagerDesDonneesEntreTaches' },
      { key: 'chap9-communiquer-entre-threads', label: 'Threads qui papotent', importKey: 'Chap9CommuniquerEntreThreads' },
      { key: 'chap9-comprendre-send-et-sync-sans-se-faire-mal', label: 'Send & Sync, sans prise de tête', importKey: 'Chap9ComprendreSendEtSyncSansSeFaireMal' },
    ],
  },
  // Chapitre 10
  {
    key: 'chap10',
    label: 'Aller plus loin',
    icon: 'BookOpen',
    children: [
      { key: 'chap10-les-macros-ecrire-du-code-qui-ecrit-du-code', label: 'Macros, code qui code', importKey: 'Chap10LesMacrosEcrireDuCodeQuiEcritDuCode' },
      { key: 'chap10-le-code-pas-securise-unsafe-a-manipuler-avec-precaution', label: 'Unsafe, attention les yeux', importKey: 'Chap10LeCodePasSecuriseUnsafeAManipulerAvecPrecaution' },
      { key: 'chap10-parler-a-du-code-en-c-ou-cpp', label: 'Rust & C, main dans la main', importKey: 'Chap10ParlerADuCodeEnCOuCpp' },
      { key: 'chap10-creer-sa-propre-bibliotheque-rust', label: 'Ta bibliothèque à toi', importKey: 'Chap10CreerSaPropreBibliothequeRust' },
    ],
  },
  // Chapitre 11
  {
    key: 'chap11',
    label: 'Projet final',
    icon: 'BookOpen',
    children: [
      { key: 'chap11-choisir-un-petit-projet-simple-mais-complet', label: 'Choisis ton projet', importKey: 'Chap11ChoisirUnPetitProjetSimpleMaisComplet' },
      { key: 'chap11-le-construire-etape-par-etape', label: 'On construit, étape par étape', importKey: 'Chap11LeConstruireEtapeParEtape' },
      { key: 'chap11-ajouter-des-tests-un-readme-une-doc', label: 'Tests, README & doc', importKey: 'Chap11AjouterDesTestsUnReadmeUneDoc' },
      { key: 'chap11-compiler-publier-et-montrer-ce-que-tu-sais-faire', label: 'Montre ce que tu sais faire !', importKey: 'Chap11CompilerPublierEtMontrerCeQueTuSaisFaire' },
    ],
  },
];

export type TypeSubChapter = {
  key: string;
  label: string;
  importKey: string;
};

export type TypeChapter = {
  key: string;
  label: string;
  icon: string;
  children: TypeSubChapter[];
}; 