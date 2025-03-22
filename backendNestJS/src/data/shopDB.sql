-- Host: localhost    Database: shop
-- ------------------------------------------------------
-- Server version	8.0.36

-- Table structure for table `_prisma_migrations`
DROP TABLE IF EXISTS `_prisma_migrations`;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `_prisma_migrations`
INSERT INTO `_prisma_migrations` VALUES 
('0e09bed9-a591-49e7-a8a3-2c8bf67cf62b','9ffcf3cd965aa2e194e18063baedc2908f5d989e05e2a48a96d359461140b5e6','2024-07-20 14:40:42.624','20240720144042_init6',NULL,NULL,'2024-07-20 14:40:42.596',1),
('10ba71bc-cfd4-4f4e-a305-737604aa1843','26b6bbd2c01a1b92556c74507ee04343429bd9c030f625d1fb53276eafc8b6a1','2024-07-19 16:32:13.320','20240719163213_init5',NULL,NULL,'2024-07-19 16:32:13.239',1),
('246eabbb-c3a3-40ed-b5a3-9f21eec1fbcd','d77b187d1adb469e3bd405b41e7b3612528d40e65e325b9d736770ae406683b7','2024-07-19 15:33:52.953','20240719153352_init4',NULL,NULL,'2024-07-19 15:33:52.933',1),
('48abe0e5-a08d-4a77-b1b2-4c21d23cbf28','189a35d49fc8cae96d9769141aab9eb28cd39890e071298a6da1301b9c0721fe','2024-07-19 14:57:06.957','20240719145706_init2',NULL,NULL,'2024-07-19 14:57:06.913',1),
('4c5d9a18-5bb4-4d0c-8d37-dcec55c47113','aa75023fc9fb31af2a32b9d66ef949b673566e90fbeda09808ee925d7b7e0480','2024-07-20 14:45:48.220','20240720144548_init8',NULL,NULL,'2024-07-20 14:45:48.188',1),
('a4bf6f51-b582-43af-8284-cc33e05dee55','900e10072d448ad1520499184ea079554bad2c741c4cf281e3523c4eed78f983','2024-07-19 14:50:32.948','20240719145029_init',NULL,NULL,'2024-07-19 14:50:30.020',1),
('b20573f1-8033-4b29-a282-cc3408f44a1f','c5755f8f30c7b523299ad4572eee337829542edaaa4713381e6b605b2ae69446','2024-07-19 14:58:32.238','20240719145832_init3',NULL,NULL,'2024-07-19 14:58:32.199',1),
('e534e472-def4-404f-85f1-e985ed6e614d','5452110b712c251efe98d04228d31735a26a3ae48cbb7b65e2228b41e8a58aa5','2024-07-19 16:42:55.729','20240719164255_init6',NULL,NULL,'2024-07-19 16:42:55.706',1);

-- Table structure for table `adresse_type`
DROP TABLE IF EXISTS `adresse_type`;
CREATE TABLE `adresse_type` (
  `adresse_type_id` int NOT NULL AUTO_INCREMENT,
  `adresse_type_libelle` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `adresse_type_actif` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`adresse_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `adresse_type`
INSERT INTO `adresse_type` VALUES 
(1,'Livraison',1),
(2,'Facturation',1);

-- Table structure for table `adresses`
DROP TABLE IF EXISTS `adresses`;
CREATE TABLE `adresses` (
  `adresse_id` int NOT NULL AUTO_INCREMENT,
  `utilisateur_id` int NOT NULL,
  `adresse_rue` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `adresse_numero` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `adresse_boite` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `adresse_cp` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `adresse_ville` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `adresse_pays` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `adresse_type` int NOT NULL,
  PRIMARY KEY (`adresse_id`),
  KEY `Adresses_utilisateur_id_fkey` (`utilisateur_id`),
  KEY `Adresses_adresse_type_fkey` (`adresse_type`),
  CONSTRAINT `Adresses_adresse_type_fkey` FOREIGN KEY (`adresse_type`) REFERENCES `adresse_type` (`adresse_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Adresses_utilisateur_id_fkey` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs` (`utilisateur_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `article_prix`
DROP TABLE IF EXISTS `article_prix`;
CREATE TABLE `article_prix` (
  `article_prix_id` int NOT NULL AUTO_INCREMENT,
  `article_prix_libelle` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `article_prix_actif` tinyint(1) DEFAULT NULL,
  `article_id` int NOT NULL,
  PRIMARY KEY (`article_prix_id`),
  KEY `Article_prix_article_id_fkey` (`article_id`),
  CONSTRAINT `Article_prix_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `articles` (`article_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `articles`
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `article_id` int NOT NULL AUTO_INCREMENT,
  `article_intitule` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `article_code_barre` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `article_tva` int NOT NULL,
  `article_marque` int NOT NULL,
  `article_categorie` int NOT NULL,
  `article_description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `article_poids` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `article_longeur` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `article_largeur` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `article_hauteur` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `article_actif` tinyint(1) DEFAULT NULL,
  `article_fournisseur_id` int NOT NULL,
  `article_prix` decimal(10,0) DEFAULT NULL,
  `article_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`article_id`),
  KEY `Articles_article_fournisseur_id_fkey` (`article_fournisseur_id`),
  KEY `Articles_article_marque_fkey` (`article_marque`),
  KEY `Articles_article_categorie_fkey` (`article_categorie`),
  KEY `Articles_article_tva_fkey` (`article_tva`),
  CONSTRAINT `Articles_article_categorie_fkey` FOREIGN KEY (`article_categorie`) REFERENCES `categories` (`categorie_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Articles_article_fournisseur_id_fkey` FOREIGN KEY (`article_fournisseur_id`) REFERENCES `fournisseurs` (`fournisseur_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Articles_article_marque_fkey` FOREIGN KEY (`article_marque`) REFERENCES `marques` (`marque_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Articles_article_tva_fkey` FOREIGN KEY (`article_tva`) REFERENCES `tva` (`tva_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `articles`
INSERT INTO `articles` VALUES 
(1,'ACER','11112121212',1,1,1,'Acer TravelMate P2 TMP215-53-76R9 Azerty',NULL,NULL,NULL,NULL,1,1,1200,'assets/Ordi/acer.jpg'),
(2,'ACER','11112121212',1,1,1,'Acer TravelMate P2 TMP215-53-76R9 Azerty',NULL,NULL,NULL,NULL,1,1,1201,'assets/Ordi/acer.jpg'),
(3,'DELL','11112121212',1,1,1,'Dell Precision 3560 - 3DWXG AZERTY',NULL,NULL,NULL,NULL,1,1,752,'assets/Ordi/dell.jpg'),
(4,'ASUS','11112121212',1,1,1,'Asus TUF Gaming A17 FA707RR-HX006W-BE AZERTY',NULL,NULL,NULL,NULL,1,1,890,'assets/Ordi/isus.jpg'),
(5,'LENOVO','11112121212',1,1,1,'Lenovo ThinkBook 15 G2 - 20VE0048MB AZERTY',NULL,NULL,NULL,NULL,1,1,920,'assets/Ordi/lenov.jpg'),
(6,'MSI','11112121212',1,1,1,'MSI Modern 15 A11M-815BE AZERTY',NULL,NULL,NULL,NULL,1,1,501,'assets/Ordi/msi.jpg'),
(7,'SUMSUNG','11112121212',1,1,1,'Samsung Galaxy Book 10" Core m3 1 GHz - SSD 64 Go - 4 Go AZERTY - Français',NULL,NULL,NULL,NULL,1,1,800,'assets/Ordi/sumsung.jpg'),
(8,'TOSHIBA','11112121212',1,1,1,'Dynabook Satellite Pro L50-G-17Z AZERTY',NULL,NULL,NULL,NULL,1,1,413,'assets/Ordi/toshiba.jpg'),
(9,'HUAWEI BLEU','11112121212',1,1,2,'250 Go de RAM',NULL,NULL,NULL,NULL,1,1,801,'assets/Gsm/GSMHuw1.jpg'),
(10,'HUAWEI NOIR','11112121212',1,1,2,'250 Go de RAM',NULL,NULL,NULL,NULL,1,1,801,'assets/Gsm/GSMHuw2.jpg'),
(11,'IPHONE 13 PRO NOIR','11112121212',1,1,2,'520 Go de RAM',NULL,NULL,NULL,NULL,1,1,852,'assets/Gsm/GSMIpho1.jpg'),
(12,'IPHONE 13 PRO OR','11112121212',1,1,2,'520 Go de RAM',NULL,NULL,NULL,NULL,1,1,458,'assets/Gsm/GSMIpho2.jpg'),
(13,'SUMSUNG S20','11112121212',1,1,2,'128 Go de RAM',NULL,NULL,NULL,NULL,1,1,800,'assets/Gsm/GSMSums1.jpeg'),
(14,'SUMSUNG S21','11112121212',1,1,2,'128 Go de RAM',NULL,NULL,NULL,NULL,1,1,1200,'assets/Gsm/GSMSums1.webp'),
(15,'XIAOMI BLEU','11112121212',1,1,2,'64 Go de RAM',NULL,NULL,NULL,NULL,1,1,1202,'assets/Gsm/GSMXom2.jpg'),
(16,'XIAOMI NOIR','11112121212',1,1,2,'64 Go de RAM',NULL,NULL,NULL,NULL,1,1,1201,'assets/Gsm/GSMXomi1.jpg'),
(17,'Sumsung','11112121212',1,1,3,'TV Crystal 4K UE55AU7100K (2021) - 55 pouces',NULL,NULL,NULL,NULL,1,1,1200,'assets/TV/sumsung1.jpg'),
(18,'Sumsung','11112121212',1,1,3,'TV 4K Crystal UE50TU7020 - 50 pouces',NULL,NULL,NULL,NULL,1,1,145,'assets/TV/sumsung2.jpg'),
(19,'SONY','11112121212',1,1,3,'TV BRAVIA XR-55A80J 4K OLED (2021) - 55 pouces',NULL,NULL,NULL,NULL,1,1,1800,'assets/TV/sony1.jpg'),
(20,'SONY','11112121212',1,1,3,'Sony KD-50X80J (2021)',NULL,NULL,NULL,NULL,1,1,110014,'assets/TV/sony2.jpg'),
(21,'LG','11112121212',1,1,3,'LG 55UP76706LB - LED - 55"- 4K Ultra HD - Smart TV',NULL,NULL,NULL,NULL,1,1,871,'assets/TV/lg1.jpg'),
(22,'LG','11112121212',1,1,3,'TV LG OLED 4K 55 POUCES OLED55A16LA',NULL,NULL,NULL,NULL,1,1,1241,'assets/TV/lg2.jpg'),
(23,'PANASONIC','11112121212',1,1,3,'TV OLED 4K TX-55JZ980E (2021) - 55 pouces',NULL,NULL,NULL,NULL,1,1,742,'assets/TV/panao1.jpg'),
(24,'PANASONIC','11112121212',1,1,3,'TV LED 4K TX-58JX810E - 58 pouces',NULL,NULL,NULL,NULL,1,1,690,'assets/TV/panaos2.jpg'),
(25,'BOSH','11112121212',1,1,4,'Lave-Linge 8 Kg BOSCH WAN28272FG',NULL,NULL,NULL,NULL,1,1,800,'assets/Machine/lvbosh1.jpg'),
(26,'BOSH','11112121212',1,1,4,'Bosch\nMachine à laver WAN280K1FG SpeedPerfect',NULL,NULL,NULL,NULL,1,1,1201,'assets/Machine/lvbosh2.jpeg'),
(27,'SIEMENS','11112121212',1,1,4,'Siemens Wm14y591 Lave-Linge 8kg 1400t',NULL,NULL,NULL,NULL,1,1,487,'assets/Machine/lvsiem.png'),
(28,'SIEMENS','11112121212',1,1,4,'SIEMENS Lave-linge chargeur frontal C (WM14N2M2FG)',NULL,NULL,NULL,NULL,1,1,785,'assets/Machine/lvsiem2.jpg'),
(29,'SUMSUNG','11112121212',1,1,4,'Lave-linge hublot 8 kg SAMSUNG WW80TA046AH/EF',NULL,NULL,NULL,NULL,1,1,920,'assets/Machine/lvsums.jpg'),
(30,'SUMSUNG','11112121212',1,1,4,'Samsung WW90T554ATT Machine à laver 9 kg 1400 tr/min',NULL,NULL,NULL,NULL,1,1,633,'assets/Machine/lvSums2.jpg'),
(31,'WHIRLPOOL','11112121212',1,1,4,'Machine à laver FFBBE 7448 BV F FreshCare+',NULL,NULL,NULL,NULL,1,1,459,'assets/Machine/lvwhi.jpg'),
(32,'WHIRLPOOL','11112121212',1,1,4,'MACHINE À LAVER WHIRLPOOL W8 W846WR BE',NULL,NULL,NULL,NULL,1,1,501,'assets/Machine/lvwhisp.jpg');

-- Table structure for table `categories`
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `categorie_id` int NOT NULL AUTO_INCREMENT,
  `categorie_libelle` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categorie_id_lie` int NOT NULL,
  `categorie_actif` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`categorie_id`),
  KEY `Categories_categorie_id_lie_fkey` (`categorie_id_lie`),
  CONSTRAINT `Categories_categorie_id_lie_fkey` FOREIGN KEY (`categorie_id_lie`) REFERENCES `categories` (`categorie_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `categories`
INSERT INTO `categories` VALUES 
(1,'Ordinateurs',1,1),
(2,'Télephones',2,1),
(3,'Téléviseurs',3,1),
(4,'Lave-linges',4,1);

-- Table structure for table `commande_statuts`
DROP TABLE IF EXISTS `commande_statuts`;
CREATE TABLE `commande_statuts` (
  `commande_statut_id` int NOT NULL AUTO_INCREMENT,
  `commande_statut_libelle` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `commande_statut_actif` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`commande_statut_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `commandes`
DROP TABLE IF EXISTS `commandes`;
CREATE TABLE `commandes` (
  `commande_id` int NOT NULL AUTO_INCREMENT,
  `commande_utilisateur_id` int NOT NULL,
  `commande_total` double DEFAULT NULL,
  `commande_statut` int NOT NULL,
  `commande_date` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `commande_livraison_id` int NOT NULL,
  PRIMARY KEY (`commande_id`),
  KEY `Commandes_commande_utilisateur_id_fkey` (`commande_utilisateur_id`),
  KEY `Commandes_commande_statut_fkey` (`commande_statut`),
  KEY `Commandes_commande_livraison_id_fkey` (`commande_livraison_id`),
  CONSTRAINT `Commandes_commande_livraison_id_fkey` FOREIGN KEY (`commande_livraison_id`) REFERENCES `livraisons` (`livraison_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Commandes_commande_statut_fkey` FOREIGN KEY (`commande_statut`) REFERENCES `commande_statuts` (`commande_statut_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Commandes_commande_utilisateur_id_fkey` FOREIGN KEY (`commande_utilisateur_id`) REFERENCES `utilisateurs` (`utilisateur_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `contrat_types`
DROP TABLE IF EXISTS `contrat_types`;
CREATE TABLE `contrat_types` (
  `contrat_type_id` int NOT NULL AUTO_INCREMENT,
  `contrat_type_libelle` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contrat_type_actif` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`contrat_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `contrats`
DROP TABLE IF EXISTS `contrats`;
CREATE TABLE `contrats` (
  `contrat_id` int NOT NULL AUTO_INCREMENT,
  `contrat_date_debut` datetime(3) NOT NULL,
  `contrat_date_fin` datetime(3) NOT NULL,
  `contrat_type` int NOT NULL,
  `employe_id` int NOT NULL,
  `contrant_salaire` double DEFAULT NULL,
  PRIMARY KEY (`contrat_id`),
  KEY `Contrats_employe_id_fkey` (`employe_id`),
  KEY `Contrats_contrat_type_fkey` (`contrat_type`),
  CONSTRAINT `Contrats_contrat_type_fkey` FOREIGN KEY (`contrat_type`) REFERENCES `contrat_types` (`contrat_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Contrats_employe_id_fkey` FOREIGN KEY (`employe_id`) REFERENCES `employes` (`employe_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `employes`
DROP TABLE IF EXISTS `employes`;
CREATE TABLE `employes` (
  `employe_id` int NOT NULL AUTO_INCREMENT,
  `employe_nom` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `employe_prenom` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `employe_date_naissance` datetime(3) DEFAULT NULL,
  `employe_actif` tinyint(1) DEFAULT NULL,
  `employe_magasin` int NOT NULL,
  PRIMARY KEY (`employe_id`),
  KEY `Employes_employe_magasin_fkey` (`employe_magasin`),
  CONSTRAINT `Employes_employe_magasin_fkey` FOREIGN KEY (`employe_magasin`) REFERENCES `magasins` (`magasin_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `entrepots`
DROP TABLE IF EXISTS `entrepots`;
CREATE TABLE `entrepots` (
  `entrepot_id` int NOT NULL AUTO_INCREMENT,
  `entrepot_libelle` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entreport_actif` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`entrepot_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `facture_statuts`
DROP TABLE IF EXISTS `facture_statuts`;
CREATE TABLE `facture_statuts` (
  `facture_statut_id` int NOT NULL AUTO_INCREMENT,
  `facture_statut_libelle` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `facture_statut_actif` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`facture_statut_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `factures`
DROP TABLE IF EXISTS `factures`;
CREATE TABLE `factures` (
  `facture_id` int NOT NULL AUTO_INCREMENT,
  `commande_id` int NOT NULL,
  `facture_statut_id` int NOT NULL,
  `facture_adresse_id` int NOT NULL,
  `date_creation` datetime(3) DEFAULT NULL,
  `date_paiement` datetime(3) DEFAULT NULL,
  `date_maj` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `facture_moyen_paiement_id` int NOT NULL,
  PRIMARY KEY (`facture_id`),
  KEY `Factures_commande_id_fkey` (`commande_id`),
  KEY `Factures_facture_adresse_id_fkey` (`facture_adresse_id`),
  KEY `Factures_facture_statut_id_fkey` (`facture_statut_id`),
  KEY `Factures_facture_moyen_paiement_id_fkey` (`facture_moyen_paiement_id`),
  CONSTRAINT `Factures_commande_id_fkey` FOREIGN KEY (`commande_id`) REFERENCES `commandes` (`commande_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Factures_facture_adresse_id_fkey` FOREIGN KEY (`facture_adresse_id`) REFERENCES `adresses` (`adresse_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Factures_facture_moyen_paiement_id_fkey` FOREIGN KEY (`facture_moyen_paiement_id`) REFERENCES `moyens_paiement` (`moyen_paiement_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Factures_facture_statut_id_fkey` FOREIGN KEY (`facture_statut_id`) REFERENCES `facture_statuts` (`facture_statut_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `fournisseurs`
DROP TABLE IF EXISTS `fournisseurs`;
CREATE TABLE `fournisseurs` (
  `fournisseur_id` int NOT NULL AUTO_INCREMENT,
  `fournisseur_nom` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fournisseur_adresse` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fournisseur_tva` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fournisseur_tel` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fournisseur_email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fournisseur_actif` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`fournisseur_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `fournisseurs`
INSERT INTO `fournisseurs` VALUES 
(1,'Electro Depot','rue du fournisseurs','3','00000000','f@mail.com',1);

-- Table structure for table `ligne`
DROP TABLE IF EXISTS `ligne`;
CREATE TABLE `ligne` (
  `ligne_id` int NOT NULL AUTO_INCREMENT,
  `commande_id` int NOT NULL,
  `article_id` int NOT NULL,
  `ligne_quantite` int NOT NULL,
  `ligne_prix_unitaire` double DEFAULT NULL,
  `ligne_prix_total` double DEFAULT NULL,
  PRIMARY KEY (`ligne_id`),
  KEY `Ligne_article_id_fkey` (`article_id`),
  KEY `Ligne_commande_id_fkey` (`commande_id`),
  CONSTRAINT `Ligne_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `articles` (`article_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Ligne_commande_id_fkey` FOREIGN KEY (`commande_id`) REFERENCES `commandes` (`commande_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `livraison_statuts`
DROP TABLE IF EXISTS `livraison_statuts`;
CREATE TABLE `livraison_statuts` (
  `livraison_statut_id` int NOT NULL AUTO_INCREMENT,
  `livraison_statut_libelle` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `livraison_statut_actif` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`livraison_statut_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `livraisons`
DROP TABLE IF EXISTS `livraisons`;
CREATE TABLE `livraisons` (
  `livraison_id` int NOT NULL AUTO_INCREMENT,
  `livraison_date` datetime(3) DEFAULT NULL,
  `livraison_statut` int NOT NULL,
  `livraison_adresse` int NOT NULL,
  PRIMARY KEY (`livraison_id`),
  KEY `Livraisons_livraison_adresse_fkey` (`livraison_adresse`),
  KEY `Livraisons_livraison_statut_fkey` (`livraison_statut`),
  CONSTRAINT `Livraisons_livraison_adresse_fkey` FOREIGN KEY (`livraison_adresse`) REFERENCES `adresses` (`adresse_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Livraisons_livraison_statut_fkey` FOREIGN KEY (`livraison_statut`) REFERENCES `livraison_statuts` (`livraison_statut_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `magasins`
DROP TABLE IF EXISTS `magasins`;
CREATE TABLE `magasins` (
  `magasin_id` int NOT NULL AUTO_INCREMENT,
  `magasin_nom` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `magasin_adresse` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `magasin_tel` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`magasin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `marques`
DROP TABLE IF EXISTS `marques`;
CREATE TABLE `marques` (
  `marque_id` int NOT NULL AUTO_INCREMENT,
  `marque_libelle` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `marque_actif` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`marque_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `marques`
INSERT INTO `marques` VALUES 
(1,'Non spécifiée',1);

-- Table structure for table `mouvement_stock`
DROP TABLE IF EXISTS `mouvement_stock`;
CREATE TABLE `mouvement_stock` (
  `mouvement_id` int NOT NULL AUTO_INCREMENT,
  `mouvement_libelle` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`mouvement_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `moyens_paiement`
DROP TABLE IF EXISTS `moyens_paiement`;
CREATE TABLE `moyens_paiement` (
  `moyen_paiement_id` int NOT NULL AUTO_INCREMENT,
  `moyen_paiement_libelle` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `moyen_paiement_actif` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`moyen_paiement_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `roles`
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_libelle` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_actif` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `roles`
INSERT INTO `roles` VALUES 
(1,'Administrator',1),
(2,'Employe',1),
(3,'Customer',1);

-- Table structure for table `stocks`
DROP TABLE IF EXISTS `stocks`;
CREATE TABLE `stocks` (
  `stock_id` int NOT NULL AUTO_INCREMENT,
  `stock_article_id` int NOT NULL,
  `stock_quantite` int NOT NULL,
  `stock_mouvement` int NOT NULL,
  `stock_entrepot` int NOT NULL,
  `stock_date_mouvement` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`stock_id`),
  KEY `Stocks_stock_article_id_fkey` (`stock_article_id`),
  KEY `Stocks_stock_mouvement_fkey` (`stock_mouvement`),
  KEY `Stocks_stock_entrepot_fkey` (`stock_entrepot`),
  CONSTRAINT `Stocks_stock_article_id_fkey` FOREIGN KEY (`stock_article_id`) REFERENCES `articles` (`article_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Stocks_stock_entrepot_fkey` FOREIGN KEY (`stock_entrepot`) REFERENCES `entrepots` (`entrepot_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Stocks_stock_mouvement_fkey` FOREIGN KEY (`stock_mouvement`) REFERENCES `mouvement_stock` (`mouvement_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `tva`
DROP TABLE IF EXISTS `tva`;
CREATE TABLE `tva` (
  `tva_id` int NOT NULL AUTO_INCREMENT,
  `tva_pct` double DEFAULT NULL,
  `tva_libelle` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`tva_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `tva`
INSERT INTO `tva` VALUES 
(1,8.1,'8,1%'),
(2,2.6,'2.6%'),
(3,0,'0%');

-- Table structure for table `utilisateurs`
DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE `utilisateurs` (
  `utilisateur_id` int NOT NULL AUTO_INCREMENT,
  `utilisateur_nom` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `utilisateur_prenom` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `utilisateur_date_naissance` datetime(3) NOT NULL,
  `utilisateur_email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `utilisateur_mdp` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `utilisateur_role_id` int NOT NULL,
  `utilisateur_gsm` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `utilisateur_actif` tinyint(1) DEFAULT NULL,
  `confirmationMailToken` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `confirmationMailTokenExpires` datetime(3) DEFAULT NULL,
  `verifiedMail` tinyint(1) DEFAULT NULL,
  `tokenVersion` int NOT NULL DEFAULT '1',
  `refreshToken` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`utilisateur_id`),
  UNIQUE KEY `Utilisateurs_utilisateur_email_key` (`utilisateur_email`),
  KEY `Utilisateurs_utilisateur_role_id_fkey` (`utilisateur_role_id`),
  CONSTRAINT `Utilisateurs_utilisateur_role_id_fkey` FOREIGN KEY (`utilisateur_role_id`) REFERENCES `roles` (`role_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `utilisateurs`
INSERT INTO `utilisateurs` VALUES 
(6,'TEST','Testeur','2000-05-05 00:00:00.000','ndrianass00@gmail.com','$2b$10$gZBZEtWRFGwdW6DlQstlQON0U0EmZyuFzx8BoswN1V9QB94I1OJqK',3,'+32 123456789',1,NULL,NULL,1,48,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dGlsaXNhdGV1cl9pZCI6NiwidXRpbGlzYXRldXJfbm9tIjoiVEVTVCIsInV0aWxpc2F0ZXVyX3ByZW5vbSI6IlRlc3RldXIiLCJ1dGlsaXNhdGV1cl9lbWFpbCI6Im5kcmlhbmFzczAwQGdtYWlsLmNvbSIsInJvbGVzIjoiQ3VzdG9tZXIiLCJ0b2tlblZlcnNpb24iOjQ4LCJpYXQiOjE3MjE4MTUzODUsImV4cCI6MTcyMjQyMDE4NX0.TtXgA-tlbka77Q-BvHUsx7KIZthiCTf_IPnPraPhJ4s'),
(7,'setrrrrrrrrrrr','fdhhhhhhhhhhhhhhhhhhhh','1990-06-06 00:00:00.000','ndri@gmail.com','$2b$10$UUKnQfI1XauO3xnjWSPku.QJf3SecKTjTkcGuAxZxjo81Jyu/90mK',3,'+41 123456789',0,'2064ea5b-e23a-4158-bc1e-01fa193b16f3','2024-07-22 19:38:50.278',0,1,NULL);
