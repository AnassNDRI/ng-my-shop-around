-- CreateTable
CREATE TABLE `Marques` (
    `marque_id` INTEGER NOT NULL AUTO_INCREMENT,
    `marque_libelle` VARCHAR(191) NOT NULL,
    `marque_actif` BOOLEAN NULL,

    PRIMARY KEY (`marque_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fournisseurs` (
    `fournisseur_id` INTEGER NOT NULL AUTO_INCREMENT,
    `fournisseur_nom` VARCHAR(191) NOT NULL,
    `fournisseur_adresse` VARCHAR(191) NOT NULL,
    `fournisseur_tva` VARCHAR(191) NOT NULL,
    `fournisseur_tel` VARCHAR(191) NOT NULL,
    `fournisseur_email` VARCHAR(191) NOT NULL,
    `fournisseur_actif` BOOLEAN NULL,

    PRIMARY KEY (`fournisseur_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categories` (
    `categorie_id` INTEGER NOT NULL AUTO_INCREMENT,
    `categorie_libelle` VARCHAR(191) NOT NULL,
    `categorie_id_lie` INTEGER NOT NULL,
    `categorie_actif` BOOLEAN NULL,

    PRIMARY KEY (`categorie_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tva` (
    `tva_id` INTEGER NOT NULL AUTO_INCREMENT,
    `tva_pct` DOUBLE NULL,
    `tva_libelle` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`tva_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Articles` (
    `article_id` INTEGER NOT NULL AUTO_INCREMENT,
    `article_intitule` VARCHAR(191) NOT NULL,
    `article_code_barre` VARCHAR(191) NULL,
    `article_tva` INTEGER NOT NULL,
    `article_marque` INTEGER NOT NULL,
    `article_categorie` INTEGER NOT NULL,
    `article_description` VARCHAR(191) NOT NULL,
    `article_poids` VARCHAR(191) NULL,
    `article_longeur` VARCHAR(191) NULL,
    `article_largeur` VARCHAR(191) NULL,
    `article_hauteur` VARCHAR(191) NULL,
    `article_actif` BOOLEAN NULL,
    `article_fournisseur_id` INTEGER NOT NULL,

    PRIMARY KEY (`article_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Article_prix` (
    `article_prix_id` INTEGER NOT NULL AUTO_INCREMENT,
    `article_prix_libelle` VARCHAR(191) NOT NULL,
    `article_prix_actif` BOOLEAN NULL,
    `article_id` INTEGER NOT NULL,

    PRIMARY KEY (`article_prix_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mouvement_stock` (
    `mouvement_id` INTEGER NOT NULL AUTO_INCREMENT,
    `mouvement_libelle` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`mouvement_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Entrepots` (
    `entrepot_id` INTEGER NOT NULL AUTO_INCREMENT,
    `entrepot_libelle` VARCHAR(191) NOT NULL,
    `entreport_actif` BOOLEAN NULL,

    PRIMARY KEY (`entrepot_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stocks` (
    `stock_id` INTEGER NOT NULL AUTO_INCREMENT,
    `stock_article_id` INTEGER NOT NULL,
    `stock_quantite` INTEGER NOT NULL,
    `stock_mouvement` INTEGER NOT NULL,
    `stock_entrepot` INTEGER NOT NULL,
    `stock_date_mouvement` DATETIME(3) NULL,

    PRIMARY KEY (`stock_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Commande_statuts` (
    `commande_statut_id` INTEGER NOT NULL AUTO_INCREMENT,
    `commande_statut_libelle` VARCHAR(191) NOT NULL,
    `commande_statut_actif` BOOLEAN NULL,

    PRIMARY KEY (`commande_statut_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Roles` (
    `role_id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_libelle` VARCHAR(191) NOT NULL,
    `role_actif` BOOLEAN NULL,

    PRIMARY KEY (`role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Utilisateurs` (
    `utilisateur_id` INTEGER NOT NULL AUTO_INCREMENT,
    `utilisateur_nom` VARCHAR(191) NOT NULL,
    `utilisateur_prenom` VARCHAR(191) NOT NULL,
    `utilisateur_date_naissance` DATETIME(3) NOT NULL,
    `utilisateur_email` VARCHAR(191) NOT NULL,
    `utilisateur_mdp` VARCHAR(191) NOT NULL,
    `utilisateur_role_id` INTEGER NOT NULL,
    `utilisateur_gsm` VARCHAR(191) NOT NULL,
    `utilisateur_actif` BOOLEAN NULL,

    PRIMARY KEY (`utilisateur_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Adresse_type` (
    `adresse_type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `adresse_type_libelle` VARCHAR(191) NOT NULL,
    `adresse_type_actif` BOOLEAN NULL,

    PRIMARY KEY (`adresse_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Adresses` (
    `adresse_id` INTEGER NOT NULL AUTO_INCREMENT,
    `utilisateur_id` INTEGER NOT NULL,
    `adresse_rue` VARCHAR(191) NOT NULL,
    `adresse_numero` VARCHAR(191) NOT NULL,
    `adresse_boite` VARCHAR(191) NOT NULL,
    `adresse_cp` VARCHAR(191) NOT NULL,
    `adresse_ville` VARCHAR(191) NOT NULL,
    `adresse_pays` VARCHAR(191) NOT NULL,
    `adresse_type` INTEGER NOT NULL,

    PRIMARY KEY (`adresse_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Livraison_statuts` (
    `livraison_statut_id` INTEGER NOT NULL AUTO_INCREMENT,
    `livraison_statut_libelle` VARCHAR(191) NOT NULL,
    `livraison_statut_actif` BOOLEAN NULL,

    PRIMARY KEY (`livraison_statut_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Livraisons` (
    `livraison_id` INTEGER NOT NULL AUTO_INCREMENT,
    `livraison_date` DATETIME(3) NULL,
    `livraison_statut` INTEGER NOT NULL,
    `livraison_adresse` INTEGER NOT NULL,

    PRIMARY KEY (`livraison_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Commandes` (
    `commande_id` INTEGER NOT NULL AUTO_INCREMENT,
    `commande_utilisateur_id` INTEGER NOT NULL,
    `commande_total` DOUBLE NULL,
    `commande_statut` INTEGER NOT NULL,
    `commande_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `commande_livraison_id` INTEGER NOT NULL,

    PRIMARY KEY (`commande_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Moyens_paiement` (
    `moyen_paiement_id` INTEGER NOT NULL AUTO_INCREMENT,
    `moyen_paiement_libelle` VARCHAR(191) NOT NULL,
    `moyen_paiement_actif` BOOLEAN NULL,

    PRIMARY KEY (`moyen_paiement_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Facture_statuts` (
    `facture_statut_id` INTEGER NOT NULL AUTO_INCREMENT,
    `facture_statut_libelle` VARCHAR(191) NOT NULL,
    `facture_statut_actif` BOOLEAN NULL,

    PRIMARY KEY (`facture_statut_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Factures` (
    `facture_id` INTEGER NOT NULL AUTO_INCREMENT,
    `commande_id` INTEGER NOT NULL,
    `facture_statut_id` INTEGER NOT NULL,
    `facture_adresse_id` INTEGER NOT NULL,
    `date_creation` DATETIME(3) NULL,
    `date_paiement` DATETIME(3) NULL,
    `date_maj` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `facture_moyen_paiement_id` INTEGER NOT NULL,

    PRIMARY KEY (`facture_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Magasins` (
    `magasin_id` INTEGER NOT NULL AUTO_INCREMENT,
    `magasin_nom` VARCHAR(191) NOT NULL,
    `magasin_adresse` VARCHAR(191) NOT NULL,
    `magasin_tel` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`magasin_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ligne` (
    `ligne_id` INTEGER NOT NULL AUTO_INCREMENT,
    `commande_id` INTEGER NOT NULL,
    `article_id` INTEGER NOT NULL,
    `ligne_quantite` INTEGER NOT NULL,
    `ligne_prix_unitaire` DOUBLE NULL,
    `ligne_prix_total` DOUBLE NULL,

    PRIMARY KEY (`ligne_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employes` (
    `employe_id` INTEGER NOT NULL AUTO_INCREMENT,
    `employe_nom` VARCHAR(191) NOT NULL,
    `employe_prenom` VARCHAR(191) NOT NULL,
    `employe_date_naissance` DATETIME(3) NULL,
    `employe_actif` BOOLEAN NULL,
    `employe_magasin` INTEGER NOT NULL,

    PRIMARY KEY (`employe_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contrat_types` (
    `contrat_type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `contrat_type_libelle` VARCHAR(191) NOT NULL,
    `contrat_type_actif` BOOLEAN NULL,

    PRIMARY KEY (`contrat_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contrats` (
    `contrat_id` INTEGER NOT NULL AUTO_INCREMENT,
    `contrat_date_debut` DATETIME(3) NOT NULL,
    `contrat_date_fin` DATETIME(3) NOT NULL,
    `contrat_type` INTEGER NOT NULL,
    `employe_id` INTEGER NOT NULL,
    `contrant_salaire` DOUBLE NULL,

    PRIMARY KEY (`contrat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Categories` ADD CONSTRAINT `Categories_categorie_id_lie_fkey` FOREIGN KEY (`categorie_id_lie`) REFERENCES `Categories`(`categorie_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Articles` ADD CONSTRAINT `Articles_article_fournisseur_id_fkey` FOREIGN KEY (`article_fournisseur_id`) REFERENCES `Fournisseurs`(`fournisseur_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Articles` ADD CONSTRAINT `Articles_article_marque_fkey` FOREIGN KEY (`article_marque`) REFERENCES `Marques`(`marque_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Articles` ADD CONSTRAINT `Articles_article_categorie_fkey` FOREIGN KEY (`article_categorie`) REFERENCES `Categories`(`categorie_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Articles` ADD CONSTRAINT `Articles_article_tva_fkey` FOREIGN KEY (`article_tva`) REFERENCES `Tva`(`tva_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article_prix` ADD CONSTRAINT `Article_prix_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `Articles`(`article_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stocks` ADD CONSTRAINT `Stocks_stock_article_id_fkey` FOREIGN KEY (`stock_article_id`) REFERENCES `Articles`(`article_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stocks` ADD CONSTRAINT `Stocks_stock_mouvement_fkey` FOREIGN KEY (`stock_mouvement`) REFERENCES `Mouvement_stock`(`mouvement_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stocks` ADD CONSTRAINT `Stocks_stock_entrepot_fkey` FOREIGN KEY (`stock_entrepot`) REFERENCES `Entrepots`(`entrepot_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Utilisateurs` ADD CONSTRAINT `Utilisateurs_utilisateur_role_id_fkey` FOREIGN KEY (`utilisateur_role_id`) REFERENCES `Roles`(`role_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Adresses` ADD CONSTRAINT `Adresses_utilisateur_id_fkey` FOREIGN KEY (`utilisateur_id`) REFERENCES `Utilisateurs`(`utilisateur_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Adresses` ADD CONSTRAINT `Adresses_adresse_type_fkey` FOREIGN KEY (`adresse_type`) REFERENCES `Adresse_type`(`adresse_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Livraisons` ADD CONSTRAINT `Livraisons_livraison_adresse_fkey` FOREIGN KEY (`livraison_adresse`) REFERENCES `Adresses`(`adresse_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Livraisons` ADD CONSTRAINT `Livraisons_livraison_statut_fkey` FOREIGN KEY (`livraison_statut`) REFERENCES `Livraison_statuts`(`livraison_statut_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commandes` ADD CONSTRAINT `Commandes_commande_utilisateur_id_fkey` FOREIGN KEY (`commande_utilisateur_id`) REFERENCES `Utilisateurs`(`utilisateur_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commandes` ADD CONSTRAINT `Commandes_commande_statut_fkey` FOREIGN KEY (`commande_statut`) REFERENCES `Commande_statuts`(`commande_statut_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commandes` ADD CONSTRAINT `Commandes_commande_livraison_id_fkey` FOREIGN KEY (`commande_livraison_id`) REFERENCES `Livraisons`(`livraison_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Factures` ADD CONSTRAINT `Factures_commande_id_fkey` FOREIGN KEY (`commande_id`) REFERENCES `Commandes`(`commande_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Factures` ADD CONSTRAINT `Factures_facture_adresse_id_fkey` FOREIGN KEY (`facture_adresse_id`) REFERENCES `Adresses`(`adresse_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Factures` ADD CONSTRAINT `Factures_facture_statut_id_fkey` FOREIGN KEY (`facture_statut_id`) REFERENCES `Facture_statuts`(`facture_statut_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Factures` ADD CONSTRAINT `Factures_facture_moyen_paiement_id_fkey` FOREIGN KEY (`facture_moyen_paiement_id`) REFERENCES `Moyens_paiement`(`moyen_paiement_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ligne` ADD CONSTRAINT `Ligne_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `Articles`(`article_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ligne` ADD CONSTRAINT `Ligne_commande_id_fkey` FOREIGN KEY (`commande_id`) REFERENCES `Commandes`(`commande_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employes` ADD CONSTRAINT `Employes_employe_magasin_fkey` FOREIGN KEY (`employe_magasin`) REFERENCES `Magasins`(`magasin_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contrats` ADD CONSTRAINT `Contrats_employe_id_fkey` FOREIGN KEY (`employe_id`) REFERENCES `Employes`(`employe_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contrats` ADD CONSTRAINT `Contrats_contrat_type_fkey` FOREIGN KEY (`contrat_type`) REFERENCES `Contrat_types`(`contrat_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
